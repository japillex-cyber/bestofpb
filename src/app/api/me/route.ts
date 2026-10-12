export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { getViewer } from '@/lib/viewer'

export async function GET() {
  const v = await getViewer()
  if (!v.user) return NextResponse.json({ user: null }, { status: 401 })
  const m = v.user.membership
  return NextResponse.json({
    user: { id: v.user.id, name: v.user.name, email: v.user.email, role: v.user.role, hasBilling: !!v.user.stripeCustomerId },
    isPaidMember: v.isPaidMember,
    membership: m ? {
      tier: m.tier, status: m.status, membershipNumber: m.membershipNumber, qrCode: m.qrCode,
      currentPeriodEnd: m.currentPeriodEnd, cancelAtPeriodEnd: m.cancelAtPeriodEnd, createdAt: m.createdAt,
    } : null,
    vendor: v.vendor ? { name: v.vendor.name, slug: v.vendor.slug, plan: v.vendor.plan, status: v.vendor.status } : null,
  })
}
