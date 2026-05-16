import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
    }

    const { tier, isGift } = await req.json()

    // Get the right Stripe price ID
    const priceId = tier === 'VIP'
      ? process.env.STRIPE_VIP_YEARLY_PRICE_ID
      : process.env.STRIPE_REGULAR_YEARLY_PRICE_ID

    // If Stripe not configured yet, redirect to a coming soon page
    if (!priceId || priceId === 'price_placeholder' || !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_placeholder') {
      return NextResponse.json({
        url: `/memberships/coming-soon?tier=${tier}`
      })
    }

    // Real Stripe checkout
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

    const session_stripe = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/memberships/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/memberships`,
      customer_email: session.user.email ?? undefined,
      metadata: {
        userId: (session.user as any).id,
        tier,
        isGift: isGift ? 'true' : 'false',
      },
    })

    return NextResponse.json({ url: session_stripe.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
