export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { constructWebhookEvent, stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import { MembershipStatus } from '@prisma/client'
import QRCode from 'qrcode'
import { planRowForTier } from '@/lib/subscriptions'

const PAID_BUSINESS_PLANS = ['STARTER', 'COMMUNITY', 'PREMIUM']

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: ReturnType<typeof constructWebhookEvent>
  try {
    event = constructWebhookEvent(body, sig)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const meta = session.metadata ?? {}

        if (session.mode === 'subscription' && session.subscription) {
          const sub = await stripe.subscriptions.retrieve(session.subscription)
          if (meta.kind === 'business' || meta.vendorId) await syncBusiness(sub, meta)
          else if (meta.kind === 'member' || meta.userId) await syncMember(sub, { ...meta, customer: session.customer })
        }

        if (session.mode === 'payment' && meta.packageId) {
          await db.package.update({ where: { id: meta.packageId }, data: { soldCount: { increment: 1 } } }).catch(() => null)
        }
        break
      }

      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any
        const meta = sub.metadata ?? {}
        if (meta.kind === 'business' || meta.vendorId) await syncBusiness(sub, meta)
        else if (meta.kind === 'member' || meta.userId) await syncMember(sub, { ...meta, customer: sub.customer })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as any
        if (invoice.subscription) {
          await db.membership.updateMany({ where: { stripeSubscriptionId: invoice.subscription }, data: { status: MembershipStatus.PAST_DUE } })
          await db.vendor.updateMany({ where: { stripeSubscriptionId: invoice.subscription }, data: { subscriptionStatus: 'past_due' } })
        }
        break
      }

      default:
        break
    }
    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}

function mapStatus(s: string): MembershipStatus {
  const map: Record<string, MembershipStatus> = {
    active: MembershipStatus.ACTIVE,
    trialing: MembershipStatus.TRIALING,
    past_due: MembershipStatus.PAST_DUE,
    unpaid: MembershipStatus.PAST_DUE,
    canceled: MembershipStatus.CANCELED,
    incomplete: MembershipStatus.INACTIVE,
    incomplete_expired: MembershipStatus.INACTIVE,
    paused: MembershipStatus.INACTIVE,
  }
  return map[s] ?? MembershipStatus.INACTIVE
}

async function syncMember(sub: any, meta: Record<string, any>) {
  const userId = meta.userId
  if (!userId) return
  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) return

  const tier = meta.tier === 'VIP' ? 'VIP' : 'REGULAR'
  const status = mapStatus(sub.status)
  const plan = await planRowForTier(tier)
  const period = {
    currentPeriodStart: sub.current_period_start ? new Date(sub.current_period_start * 1000) : null,
    currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
    cancelAtPeriodEnd: !!sub.cancel_at_period_end,
  }

  const existing = await db.membership.findUnique({ where: { userId } })
  // Ignore events from an older subscription that has been replaced.
  if (existing?.stripeSubscriptionId && existing.stripeSubscriptionId !== sub.id && ['ACTIVE', 'TRIALING'].includes(existing.status) && status === MembershipStatus.CANCELED) return

  if (existing) {
    await db.membership.update({
      where: { userId },
      data: { planId: plan.id, tier, status, stripeSubscriptionId: sub.id, stripeCustomerId: meta.customer ?? existing.stripeCustomerId, ...period },
    })
  } else {
    const membershipNumber = `SDSC-${Date.now().toString().slice(-8)}`
    const qrCode = await QRCode.toDataURL(`${process.env.NEXT_PUBLIC_APP_URL ?? ''}/verify/${membershipNumber}`).catch(() => null)
    await db.membership.create({
      data: { userId, planId: plan.id, tier, status, membershipNumber, qrCode, stripeSubscriptionId: sub.id, stripeCustomerId: meta.customer ?? null, ...period },
    })
  }

  const isPaid = status === MembershipStatus.ACTIVE || status === MembershipStatus.TRIALING
  if (user.role === 'USER' && isPaid) await db.user.update({ where: { id: userId }, data: { role: 'MEMBER' } })
  if (user.role === 'MEMBER' && status === MembershipStatus.CANCELED) await db.user.update({ where: { id: userId }, data: { role: 'USER' } })
}

async function syncBusiness(sub: any, meta: Record<string, any>) {
  const vendorId = meta.vendorId
  if (!vendorId) return
  const vendor = await db.vendor.findUnique({ where: { id: vendorId } })
  if (!vendor) return
  if (vendor.stripeSubscriptionId && vendor.stripeSubscriptionId !== sub.id && sub.status === 'canceled') return

  const live = ['active', 'trialing', 'past_due'].includes(sub.status)
  const plan = PAID_BUSINESS_PLANS.includes(meta.plan) ? meta.plan : vendor.plan
  const foundingOpen = process.env.FOUNDING_PRICING_OPEN !== 'false'

  await db.vendor.update({
    where: { id: vendorId },
    data: {
      stripeSubscriptionId: sub.id,
      stripeCustomerId: typeof sub.customer === 'string' ? sub.customer : vendor.stripeCustomerId,
      subscriptionStatus: sub.status,
      subscriptionPlanId: live ? plan : vendor.subscriptionPlanId,
      plan: live ? plan : 'FREE',
      // Paying businesses go live straight away; admins can still suspend them.
      ...(live && vendor.status !== 'SUSPENDED' ? { status: 'ACTIVE' as const } : {}),
      ...(live && foundingOpen && !vendor.stripeSubscriptionId ? { foundingMember: true } : {}),
    },
  })
}
