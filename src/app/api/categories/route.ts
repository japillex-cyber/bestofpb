export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const categories = await db.category.findMany({ orderBy: [{ order: 'asc' }, { name: 'asc' }], select: { id: true, name: true, icon: true, slug: true } })
  return NextResponse.json({ categories })
}
