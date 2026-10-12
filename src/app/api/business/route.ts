export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getViewer } from '@/lib/viewer'
import { ownerFields, saveDeal } from '@/lib/vendor-input'
import { createBusinessForUser } from '@/lib/business-signup'

export async function GET() {
  const viewer = await getViewer()
  if (!viewer.user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
  const vendor = viewer.vendor
    ? await db.vendor.findUnique({ where: { id: viewer.vendor.id }, include: { category: true, deal: true } })
    : null
  return NextResponse.json({ vendor, hasBilling: !!viewer.user.stripeCustomerId })
}

// Set up a business profile for an existing account (e.g. someone who signed up with Google).
export async function POST(req: NextRequest) {
  const viewer = await getViewer()
  if (!viewer.user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
  if (viewer.vendor) return NextResponse.json({ error: 'You already have a business profile.' }, { status: 400 })
  try {
    const body = await req.json()
    const vendor = await createBusinessForUser(viewer.user.id, { ...body, email: viewer.user.email })
    return NextResponse.json({ vendor })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Could not create your business.' }, { status: 400 })
  }
}

// Business owners can update their own page details and special.
export async function PATCH(req: NextRequest) {
  const viewer = await getViewer()
  if (!viewer.user) return NextResponse.json({ error: 'AUTH_REQUIRED' }, { status: 401 })
  if (!viewer.vendor) return NextResponse.json({ error: 'No business profile.' }, { status: 404 })
  try {
    const body = await req.json()
    await db.vendor.update({ where: { id: viewer.vendor.id }, data: ownerFields(body) as any })
    await saveDeal(viewer.vendor.id, body.deal)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Business update error:', err)
    return NextResponse.json({ error: 'Could not save. Please try again.' }, { status: 500 })
  }
}
