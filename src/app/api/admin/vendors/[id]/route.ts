export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi, uniqueVendorSlug } from '@/lib/viewer'
import { adminFields, saveDeal } from '@/lib/vendor-input'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  try {
    const body = await req.json()
    const data = adminFields(body)
    if (!data.name) return NextResponse.json({ error: 'Business name is required.' }, { status: 400 })
    if (!data.categoryId) return NextResponse.json({ error: 'Pick a category.' }, { status: 400 })
    const slug = body.slug ? await uniqueVendorSlug(body.slug, params.id) : undefined
    const vendor = await db.vendor.update({ where: { id: params.id }, data: { ...data, ...(slug ? { slug } : {}) } as any })
    await saveDeal(vendor.id, body.deal)
    return NextResponse.json({ vendor })
  } catch (err: any) {
    console.error('Admin vendor update error:', err)
    return NextResponse.json({ error: 'Could not save the business.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  try {
    await db.$transaction([
      db.deal.deleteMany({ where: { vendorId: params.id } }),
      db.event.updateMany({ where: { vendorId: params.id }, data: { vendorId: null } }),
      db.vendor.delete({ where: { id: params.id } }),
    ])
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin vendor delete error:', err)
    return NextResponse.json({ error: 'Could not delete the business.' }, { status: 500 })
  }
}
