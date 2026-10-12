export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi } from '@/lib/viewer'
import { postFields, uniquePostSlug } from '@/lib/post-input'

export async function GET() {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  const posts = await db.post.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ posts })
}

export async function POST(req: NextRequest) {
  const admin = await requireAdminApi()
  if (!admin) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  try {
    const body = await req.json()
    const data = postFields(body)
    if (!data.title) return NextResponse.json({ error: 'A title is required.' }, { status: 400 })
    const slug = await uniquePostSlug(body.slug || data.title)
    const post = await db.post.create({
      data: { ...data, slug, authorId: admin.user!.id, publishedAt: data.published ? new Date() : null },
    })
    return NextResponse.json({ post })
  } catch (err) {
    console.error('Post create error:', err)
    return NextResponse.json({ error: 'Could not save the post.' }, { status: 500 })
  }
}
