export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi } from '@/lib/viewer'
import { planRowForTier } from '@/lib/subscriptions'
import QRCode from 'qrcode'

const TIERS = ['REGULAR', 'VIP'] as const
const STATUSES = ['ACTIVE', 'TRIALING', 'PAST_DUE', 'CANCELED', 'INACTIVE'] as const
const PAID = ['ACTIVE', 'TRIALING']

function parseDate(v: unknown): Date | null | undefined {
  if (v === undefined) return undefined
  if (v === null || v === '') return null
  const d = new Date(String(v))
  return isNaN(d.getTime()) ? undefined : d
}

// Keep the account role in step with the membership (never touches admins or businesses).
async function syncRole(userId: string, paid: boolean) {
  const user = await db.user.findUnique({ where: { id: userId }, select: { role: true } })
  if (!user) return
  if (paid && user.role === 'USER') await db.user.update({ where: { id: userId }, data: { role: 'MEMBER' } })
  if (!paid && user.role === 'MEMBER') await db.user.update({ where: { id: userId }, data: { role: 'USER' } })
}

// Create or edit a user's membership: { tier, status, currentPeriodEnd, cancelAtPeriodEnd }
export async function PATCH(req: NextRequest, { params }: { params: { userId: string } }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  try {
    const { userId } = params
    const body = await req.json()
    const user = await db.user.findUnique({ where: { id: userId }, include: { membership: true } })
    if (!user) return NextResponse.json({ error: 'User not found.' }, { status: 404 })

    const tier = TIERS.includes(body.tier) ? body.tier : (user.membership?.tier ?? 'REGULAR')
    const status = STATUSES.includes(body.status) ? body.status : (user.membership?.status ?? 'ACTIVE')
    const currentPeriodEnd = parseDate(body.currentPeriodEnd)
    const cancelAtPeriodEnd = typeof body.cancelAtPeriodEnd === 'boolean' ? body.cancelAtPeriodEnd : undefined
    const plan = await planRowForTier(tier)

    let membership
    if (user.membership) {
      membership = await db.membership.update({
        where: { userId },
        data: {
          tier, status, planId: plan.id,
          ...(currentPeriodEnd !== undefined ? { currentPeriodEnd } : {}),
          ...(cancelAtPeriodEnd !== undefined ? { cancelAtPeriodEnd } : {}),
        },
      })
    } else {
      const membershipNumber = `SDSC-${Date.now().toString().slice(-8)}`
      const base = (process.env.NEXT_PUBLIC_APP_URL || req.nextUrl.origin).replace(/\/$/, '')
      const qrCode = await QRCode.toDataURL(`${base}/verify/${membershipNumber}`).catch(() => null)
      membership = await db.membership.create({
        data: {
          userId, tier, status, planId: plan.id, membershipNumber, qrCode,
          currentPeriodStart: new Date(),
          currentPeriodEnd: currentPeriodEnd ?? null,
          cancelAtPeriodEnd: cancelAtPeriodEnd ?? false,
        },
      })
    }

    await syncRole(userId, PAID.includes(status))
    return NextResponse.json({ membership })
  } catch (err: any) {
    console.error('Admin membership update error:', err)
    return NextResponse.json({ error: 'Could not save the membership.' }, { status: 500 })
  }
}

// Remove a user's membership completely.
export async function DELETE(_req: NextRequest, { params }: { params: { userId: string } }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  try {
    await db.membership.deleteMany({ where: { userId: params.userId } })
    await syncRole(params.userId, false)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error('Admin membership delete error:', err)
    return NextResponse.json({ error: 'Could not remove the membership.' }, { status: 500 })
  }
}
