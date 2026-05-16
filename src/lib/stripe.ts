import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10",
  typescript: true,
})

// ─────────────────────────────────────────────
// Customer helpers
// ─────────────────────────────────────────────

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name?: string | null
): Promise<string> {
  const { db } = await import("@/lib/db")

  const user = await db.user.findUnique({ where: { id: userId } })

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId
  }

  const customer = await stripe.customers.create({
    email,
    name: name ?? undefined,
    metadata: { userId },
  })

  await db.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  })

  return customer.id
}

// ─────────────────────────────────────────────
// Membership checkout
// ─────────────────────────────────────────────

export async function createMembershipCheckoutSession({
  userId,
  email,
  name,
  priceId,
  isGift,
  giftEmail,
}: {
  userId: string
  email: string
  name?: string | null
  priceId: string
  isGift?: boolean
  giftEmail?: string
}) {
  const customerId = await getOrCreateStripeCustomer(userId, email, name)

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/membership`,
    metadata: {
      userId,
      isGift: isGift ? "true" : "false",
      giftEmail: giftEmail ?? "",
    },
    subscription_data: {
      metadata: {
        userId,
        isGift: isGift ? "true" : "false",
        giftEmail: giftEmail ?? "",
      },
    },
  })

  return session
}

// ─────────────────────────────────────────────
// Package checkout
// ─────────────────────────────────────────────

export async function createPackageCheckoutSession({
  userId,
  email,
  name,
  packageId,
  packageTitle,
  amount,
  groupSize,
}: {
  userId: string
  email: string
  name?: string | null
  packageId: string
  packageTitle: string
  amount: number // in cents
  groupSize?: number
}) {
  const customerId = await getOrCreateStripeCustomer(userId, email, name)

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: packageTitle,
            metadata: { packageId },
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/packages/${packageId}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/packages/${packageId}`,
    metadata: {
      userId,
      packageId,
      groupSize: groupSize?.toString() ?? "",
    },
  })

  return session
}

// ─────────────────────────────────────────────
// Vendor subscription checkout
// ─────────────────────────────────────────────

export async function createVendorCheckoutSession({
  vendorId,
  userId,
  email,
  name,
  priceId,
}: {
  vendorId: string
  userId: string
  email: string
  name?: string | null
  priceId: string
}) {
  const customerId = await getOrCreateStripeCustomer(userId, email, name)

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/vendor/subscribe`,
    metadata: { vendorId, userId },
    subscription_data: {
      metadata: { vendorId, userId },
    },
  })

  return session
}

// ─────────────────────────────────────────────
// Webhook helper
// ─────────────────────────────────────────────

export function constructWebhookEvent(payload: string, sig: string) {
  return stripe.webhooks.constructEvent(
    payload,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
}
