export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getViewer } from '@/lib/viewer'
import { stripe, stripeConfigured, appUrl } from '@/lib/stripe'

// Opens Stripe's billing page where people can update their card or cancel.
export async function POST(req: NextRequest) {
  const viewer = await getViewer()
  if (!viewer.user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
  const customer = viewer.user.stripeCustomerId
  if (!stripeConfigured() || !customer) return NextResponse.json({ error: 'No billing account yet.' }, { status: 400 })
  const { returnTo } = await req.json().catch(() => ({}))
  const path = typeof returnTo === 'string' && returnTo.startsWith('/') ? returnTo : '/dashboard'
  try {
    const session = await stripe.billingPortal.sessions.create({ customer, return_url: `${appUrl()}${path}` })
    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Billing portal error:', err)
    return NextResponse.json({ error: 'Could not open billing. Turn on the customer portal in Stripe settings.' }, { status: 500 })
  }
}
