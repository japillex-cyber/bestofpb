import { db } from '@/lib/db'
import { slugify } from '@/lib/viewer'

export function postFields(body: any) {
  const s = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
  const tags = (Array.isArray(body.tags) ? body.tags : String(body.tags ?? '').split(','))
    .map((t: string) => t.trim().replace(/^#/, '').toLowerCase())
    .filter(Boolean)
  return {
    title: s(body.title, 200),
    excerpt: s(body.excerpt, 300) || null,
    coverImage: s(body.coverImage, 1000) || null,
    content: typeof body.content === 'string' ? body.content.slice(0, 100000) : '',
    tags: Array.from(new Set<string>(tags)).slice(0, 12),
    published: !!body.published,
  }
}

export async function uniquePostSlug(input: string, excludeId?: string) {
  const base = slugify(input) || 'post'
  let slug = base
  for (let i = 2; ; i++) {
    const hit = await db.post.findUnique({ where: { slug } })
    if (!hit || hit.id === excludeId) return slug
    slug = `${base}-${i}`
  }
}
