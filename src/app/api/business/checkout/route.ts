export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getViewer } from '@/lib/viewer'
import { stripeConfigured } from '@/lib/stripe'
import { startBusinessCheckout } from '@/lib/subscriptions'

export async function POST(req: NextRequest) {
  try {
    const viewer = await getViewer()
    if (!viewer.user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
    if (!viewer.vendor) return NextResponse.json({ error: 'NO_BUSINESS' }, { status: 400 })

    const { plan } = await req.json()
    if (!['STARTER', 'COMMUNITY', 'PREMIUM'].includes(plan)) return NextResponse.json({ error: 'Unknown plan.' }, { status: 400 })

    if (!stripeConfigured()) return NextResponse.json({ url: `/memberships/coming-soon?plan=${plan}` })

    const result = await startBusinessCheckout({ id: viewer.user.id, email: viewer.user.email, name: viewer.user.name }, viewer.vendor.id, plan)
    return NextResponse.json(result)
  } catch (err: any) {
    console.error('Business checkout error:', err)
    return NextResponse.json({ error: 'Could not start checkout. Please try again.' }, { status: 500 })
  }
}
