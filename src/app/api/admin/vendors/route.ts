export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi, uniqueVendorSlug } from '@/lib/viewer'
import { adminFields, saveDeal } from '@/lib/vendor-input'

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  const [vendors, categories] = await Promise.all([
    db.vendor.findMany({
      include: { category: true, deal: true, user: { select: { email: true, name: true } } },
      orderBy: { createdAt: 'desc' },
    }),
    db.category.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }] }),
  ])
  return NextResponse.json({ vendors, categories })
}

export async function POST(req: NextRequest) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  try {
    const body = await req.json()
    const data = adminFields(body)
    if (!data.name) return NextResponse.json({ error: 'Business name is required.' }, { status: 400 })
    if (!data.categoryId) return NextResponse.json({ error: 'Pick a category.' }, { status: 400 })
    const slug = await uniqueVendorSlug(body.slug || data.name)
    const vendor = await db.vendor.create({ data: { ...data, slug } as any })
    await saveDeal(vendor.id, body.deal)
    return NextResponse.json({ vendor })
  } catch (err: any) {
    console.error('Admin vendor create error:', err)
    return NextResponse.json({ error: 'Could not save the business.' }, { status: 500 })
  }
}
