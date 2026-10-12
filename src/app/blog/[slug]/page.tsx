import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PostBody from '@/components/blog/PostBody'
import { db } from '@/lib/db'
import { getViewer } from '@/lib/viewer'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await db.post.findUnique({ where: { slug: params.slug }, select: { title: true, excerpt: true, coverImage: true, published: true } })
  if (!p || !p.published) return { title: 'Post not found — Best of PB' }
  return {
    title: `${p.title} — Best of PB San Diego`,
    description: p.excerpt ?? undefined,
    openGraph: { title: p.title, description: p.excerpt ?? undefined, images: p.coverImage ? [p.coverImage] : [] },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, viewer] = await Promise.all([db.post.findUnique({ where: { slug: params.slug } }), getViewer()])
  if (!post || (!post.published && !viewer.isAdmin)) notFound()

  const more = await db.post.findMany({
    where: { published: true, id: { not: post.id } },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: { slug: true, title: true, coverImage: true },
  })
  const date = post.publishedAt ?? post.createdAt

  return (
    <>
      <Navbar />
      {!post.published && (
        <div style={{ marginTop: 'var(--nav-height)', background: '#FEF3C7', color: '#92400E', fontSize: 13, fontWeight: 600, padding: '10px 16px', textAlign: 'center' }}>
          Draft preview — only admins can see this post.
        </div>
      )}
      <article style={{ background: '#fff', paddingTop: post.published ? 'var(--nav-height)' : 0 }}>
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '44px 16px 0' }}>
          <Link href="/blog" style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-500)', textDecoration: 'none' }}>← All posts</Link>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(30px,5vw,46px)', fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1.1, letterSpacing: '-0.5px', margin: '16px 0 12px' }}>{post.title}</h1>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', fontSize: 13, color: 'var(--gray-500)', marginBottom: 24 }}>
            <span>{date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' })}</span>
            {post.tags.map(t => (
              <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} style={{ fontSize: 12, fontWeight: 600, background: 'var(--gray-100)', color: 'var(--gray-600)', padding: '3px 10px', borderRadius: 999, textDecoration: 'none' }}>#{t}</Link>
            ))}
          </div>
        </div>
        {post.coverImage && (
          <div style={{ maxWidth: 980, margin: '0 auto', padding: '0 16px' }}>
            <img src={post.coverImage} alt="" style={{ width: '100%', maxHeight: 520, objectFit: 'cover', borderRadius: 20, display: 'block' }} />
          </div>
        )}
        <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 16px 64px' }}>
          <PostBody content={post.content} />

          <div style={{ marginTop: 48, background: 'var(--navy)', borderRadius: 18, padding: 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Follow along on Instagram</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>@pacific.beach · @sandiegofree</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="https://www.instagram.com/pacific.beach/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-md">@pacific.beach</a>
              <a href="https://www.instagram.com/sandiegofree/" target="_blank" rel="noopener noreferrer" className="btn btn-outline-white btn-md">@sandiegofree</a>
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <div style={{ background: 'var(--gray-50)' }}>
          <div className="container" style={{ padding: '44px 16px 70px' }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 18 }}>More from the blog</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))', gap: 18 }}>
              {more.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden', textDecoration: 'none' }}>
                  <div style={{ height: 140, background: p.coverImage ? `#0b2d60 url("${p.coverImage}") center/cover` : 'linear-gradient(145deg,#0b2d60,#1557c0)' }} />
                  <div style={{ padding: '14px 16px', fontSize: 16, fontWeight: 700, color: 'var(--gray-900)' }}>{p.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}
