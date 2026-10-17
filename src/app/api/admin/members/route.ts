export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi } from '@/lib/viewer'

// Every account with its membership (if any), so admins can edit or grant one.
export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  const users = await db.user.findMany({
    select: {
      id: true, name: true, email: true, phone: true, role: true, createdAt: true,
      membership: {
        select: {
          tier: true, status: true, membershipNumber: true, qrCode: true, currentPeriodStart: true,
          currentPeriodEnd: true, cancelAtPeriodEnd: true, stripeSubscriptionId: true, createdAt: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ users })
}
