export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireAdminApi } from '@/lib/viewer'
import { postFields, uniquePostSlug } from '@/lib/post-input'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  try {
    const existing = await db.post.findUnique({ where: { id: params.id } })
    if (!existing) return NextResponse.json({ error: 'Post not found.' }, { status: 404 })
    const body = await req.json()
    const data = postFields(body)
    if (!data.title) return NextResponse.json({ error: 'A title is required.' }, { status: 400 })
    const slug = body.slug && body.slug !== existing.slug ? await uniquePostSlug(body.slug, existing.id) : existing.slug
    const publishedAt = data.published ? existing.publishedAt ?? new Date() : existing.publishedAt
    const post = await db.post.update({ where: { id: params.id }, data: { ...data, slug, publishedAt } })
    return NextResponse.json({ post })
  } catch (err) {
    console.error('Post update error:', err)
    return NextResponse.json({ error: 'Could not save the post.' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await requireAdminApi())) return NextResponse.json({ error: 'Not allowed' }, { status: 403 })
  await db.post.delete({ where: { id: params.id } }).catch(() => null)
  return NextResponse.json({ ok: true })
}
