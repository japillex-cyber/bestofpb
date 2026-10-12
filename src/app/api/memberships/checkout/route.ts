export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getViewer } from '@/lib/viewer'
import { stripeConfigured } from '@/lib/stripe'
import { startMemberCheckout } from '@/lib/subscriptions'

export async function POST(req: NextRequest) {
  try {
    const viewer = await getViewer()
    if (!viewer.user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })

    const { tier } = await req.json()
    const key = tier === 'VIP' ? 'VIP' : tier === 'INSIDER' ? 'INSIDER' : null
    if (!key) return NextResponse.json({ error: 'Unknown membership.' }, { status: 400 })

    if (!stripeConfigured()) return NextResponse.json({ url: `/memberships/coming-soon?tier=${key}` })

    const result = await startMemberCheckout({ id: viewer.user.id, email: viewer.user.email, name: viewer.user.name }, key)
    return NextResponse.json(result)
  } catch (err: any) {
    console.error('Member checkout error:', err)
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 500 })
  }
}
