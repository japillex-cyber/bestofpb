import { NextRequest, NextResponse } from "next/server"
import { constructWebhookEvent } from "@/lib/stripe"
import { db } from "@/lib/db"
import { MembershipStatus, VendorStatus } from "@prisma/client"
import QRCode from "qrcode"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")!

  let event: ReturnType<typeof constructWebhookEvent>

  try {
    event = constructWebhookEvent(body, sig)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      // ─── Checkout completed ───────────────────────
      case "checkout.session.completed": {
        const session = event.data.object as any
        const { userId, isGift, giftEmail, packageId, vendorId } = session.metadata

        if (session.mode === "subscription") {
          if (vendorId) {
            // Vendor subscription activated
            await db.vendor.update({
              where: { id: vendorId },
              data: {
                stripeSubscriptionId: session.subscription,
                subscriptionStatus: "active",
                status: VendorStatus.ACTIVE,
              },
            })
          } else {
            // Membership purchase
            const targetUserId = isGift === "true"
              ? await resolveGiftRecipient(giftEmail)
              : userId

            if (targetUserId) {
              await activateMembership(targetUserId, session)
            }
          }
        }

        if (session.mode === "payment" && packageId) {
          // Package purchase
          await db.package.update({
            where: { id: packageId },
            data: { soldCount: { increment: 1 } },
          })
          // TODO: create order record, send confirmation email
        }

        break
      }

      // ─── Subscription updated ─────────────────────
      case "customer.subscription.updated": {
        const sub = event.data.object as any
        const { userId, vendorId } = sub.metadata

        if (vendorId) {
          await db.vendor.update({
            where: { id: vendorId },
            data: { subscriptionStatus: sub.status },
          })
        } else if (userId) {
          await db.membership.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: {
              status: mapStripeStatus(sub.status),
              currentPeriodStart: new Date(sub.current_period_start * 1000),
              currentPeriodEnd: new Date(sub.current_period_end * 1000),
              cancelAtPeriodEnd: sub.cancel_at_period_end,
            },
          })
        }

        break
      }

      // ─── Subscription deleted/canceled ───────────
      case "customer.subscription.deleted": {
        const sub = event.data.object as any
        const { userId, vendorId } = sub.metadata

        if (vendorId) {
          await db.vendor.update({
            where: { id: vendorId },
            data: {
              subscriptionStatus: "canceled",
              status: VendorStatus.INACTIVE,
            },
          })
        } else if (userId) {
          await db.membership.updateMany({
            where: { stripeSubscriptionId: sub.id },
            data: { status: MembershipStatus.CANCELED },
          })

          // Downgrade user role
          const membership = await db.membership.findFirst({
            where: { stripeSubscriptionId: sub.id },
          })
          if (membership) {
            await db.user.update({
              where: { id: membership.userId },
              data: { role: "USER" },
            })
          }
        }

        break
      }

      // ─── Payment failed ───────────────────────────
      case "invoice.payment_failed": {
        const invoice = event.data.object as any
        const sub = await import("@/lib/stripe").then((m) =>
          m.stripe.subscriptions.retrieve(invoice.subscription)
        )
        const { userId } = sub.metadata

        if (userId) {
          await db.membership.updateMany({
            where: { stripeSubscriptionId: invoice.subscription },
            data: { status: MembershipStatus.PAST_DUE },
          })
          // TODO: send payment failed email
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error("Webhook handler error:", err)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

async function activateMembership(userId: string, session: any) {
  // Retrieve subscription details
  const { stripe } = await import("@/lib/stripe")
  const subscription = await stripe.subscriptions.retrieve(session.subscription)

  // Get plan from price
  const priceId = subscription.items.data[0].price.id
  const plan = await db.membershipPlan.findUnique({
    where: { stripePriceId: priceId },
  })

  if (!plan) {
    console.error("Plan not found for priceId:", priceId)
    return
  }

  // Generate QR code
  const membershipNumber = `BOPB-${Date.now()}`
  const qrCode = await QRCode.toDataURL(
    `${process.env.NEXT_PUBLIC_APP_URL}/verify/${membershipNumber}`
  )

  // Upsert membership
  await db.membership.upsert({
    where: { userId },
    update: {
      planId: plan.id,
      tier: plan.tier,
      status: MembershipStatus.ACTIVE,
      stripeSubscriptionId: subscription.id,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      qrCode,
    },
    create: {
      userId,
      planId: plan.id,
      tier: plan.tier,
      status: MembershipStatus.ACTIVE,
      membershipNumber,
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: session.customer,
      currentPeriodStart: new Date(subscription.current_period_start * 1000),
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      qrCode,
    },
  })

  // Upgrade user role
  await db.user.update({
    where: { id: userId },
    data: { role: "MEMBER" },
  })
}

async function resolveGiftRecipient(giftEmail: string): Promise<string | null> {
  if (!giftEmail) return null

  let user = await db.user.findUnique({ where: { email: giftEmail } })

  if (!user) {
    // Create a stub account for the gift recipient
    user = await db.user.create({
      data: {
        email: giftEmail,
        role: "USER",
      },
    })
    // TODO: send gift notification email with account setup link
  }

  return user.id
}

function mapStripeStatus(stripeStatus: string): MembershipStatus {
  const map: Record<string, MembershipStatus> = {
    active: MembershipStatus.ACTIVE,
    canceled: MembershipStatus.CANCELED,
    past_due: MembershipStatus.PAST_DUE,
    trialing: MembershipStatus.TRIALING,
    incomplete: MembershipStatus.INACTIVE,
    incomplete_expired: MembershipStatus.INACTIVE,
    unpaid: MembershipStatus.PAST_DUE,
  }
  return map[stripeStatus] ?? MembershipStatus.INACTIVE
}
