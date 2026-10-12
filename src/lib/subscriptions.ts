import { db } from '@/lib/db'
import { stripe, appUrl, getOrCreateStripeCustomer } from '@/lib/stripe'
import { MEMBER_PLANS, BUSINESS_PLANS, MEMBER_TRIAL_DAYS, MemberTierKey, BusinessPlanKey } from '@/lib/plans'

const BUSINESS_TRIAL_DAYS = Number(process.env.NEXT_PUBLIC_BUSINESS_TRIAL_DAYS ?? 0)

function monthlyPrice(name: string, dollars: number) {
  return {
    currency: 'usd',
    unit_amount: Math.round(dollars * 100),
    recurring: { interval: 'month' as const },
    product_data: { name },
  }
}

const ACTIVEISH = ['active', 'trialing', 'past_due']

// Switch an existing subscription to a new monthly amount (upgrade/downgrade).
async function switchSubscription(subscriptionId: string, name: string, dollars: number, metadata: Record<string, string>) {
  const sub = await stripe.subscriptions.retrieve(subscriptionId)
  if (!ACTIVEISH.includes(sub.status)) return false
  const price = await stripe.prices.create(monthlyPrice(name, dollars))
  await stripe.subscriptions.update(subscriptionId, {
    items: [{ id: sub.items.data[0].id, price: price.id }],
    proration_behavior: 'create_prorations',
    metadata,
  })
  return true
}

export async function startMemberCheckout(user: { id: string; email: string; name: string | null }, tierKey: MemberTierKey) {
  const plan = MEMBER_PLANS.find(p => p.key === tierKey)!
  const membership = await db.membership.findUnique({ where: { userId: user.id } })
  const metadata = { kind: 'member', userId: user.id, tier: plan.dbTier }

  if (membership?.stripeSubscriptionId && ['ACTIVE', 'TRIALING', 'PAST_DUE'].includes(membership.status)) {
    if (membership.tier === plan.dbTier) return { url: '/dashboard' }
    const ok = await switchSubscription(membership.stripeSubscriptionId, `SD Social Club — ${plan.name}`, plan.price, metadata)
    if (ok) {
      await db.membership.update({ where: { userId: user.id }, data: { tier: plan.dbTier } })
      return { url: '/dashboard?changed=1' }
    }
  }

  const customer = await getOrCreateStripeCustomer(user.id, user.email, user.name)
  // The free trial is for first-time members only.
  const trialDays = membership ? 0 : MEMBER_TRIAL_DAYS
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer,
    line_items: [{ price_data: monthlyPrice(`SD Social Club — ${plan.name}`, plan.price), quantity: 1 }],
    subscription_data: { metadata, ...(trialDays > 0 ? { trial_period_days: trialDays } : {}) },
    metadata,
    allow_promotion_codes: true,
    success_url: `${appUrl()}/memberships/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl()}/memberships`,
  })
  return { url: session.url }
}

export async function startBusinessCheckout(user: { id: string; email: string; name: string | null }, vendorId: string, planKey: BusinessPlanKey) {
  const plan = BUSINESS_PLANS.find(p => p.key === planKey)!
  const vendor = await db.vendor.findUnique({ where: { id: vendorId } })
  if (!vendor) throw new Error('Business not found.')
  const metadata = { kind: 'business', vendorId, userId: user.id, plan: plan.key }

  if (vendor.stripeSubscriptionId && vendor.subscriptionStatus && ACTIVEISH.includes(vendor.subscriptionStatus)) {
    if (vendor.plan === plan.key) return { url: '/business' }
    const ok = await switchSubscription(vendor.stripeSubscriptionId, `Best of PB — ${plan.name}`, plan.price, metadata)
    if (ok) {
      await db.vendor.update({ where: { id: vendorId }, data: { plan: plan.key } })
      return { url: '/business?changed=1' }
    }
  }

  const customer = await getOrCreateStripeCustomer(user.id, user.email, user.name)
  const trialDays = vendor.stripeSubscriptionId ? 0 : BUSINESS_TRIAL_DAYS
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer,
    line_items: [{ price_data: monthlyPrice(`Best of PB — ${plan.name}`, plan.price), quantity: 1 }],
    subscription_data: { metadata, ...(trialDays > 0 ? { trial_period_days: trialDays } : {}) },
    metadata,
    allow_promotion_codes: true,
    success_url: `${appUrl()}/business?welcome=1`,
    cancel_url: `${appUrl()}/business`,
  })
  return { url: session.url }
}

// Makes sure a MembershipPlan row exists for a tier (memberships must point at one).
export async function planRowForTier(tier: 'REGULAR' | 'VIP') {
  const plan = MEMBER_PLANS.find(p => p.dbTier === tier)!
  const key = `sdsc_${tier.toLowerCase()}_monthly`
  return db.membershipPlan.upsert({
    where: { stripePriceId: key },
    update: { name: plan.name, price: plan.price, features: plan.features, isActive: true },
    create: { name: plan.name, tier, price: plan.price, interval: 'month', stripePriceId: key, stripeProductId: 'inline', features: plan.features, isGiftable: false },
  })
}
