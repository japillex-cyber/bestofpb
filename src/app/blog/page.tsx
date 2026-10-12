import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Blog — Best of PB San Diego',
  description: 'Local stories, guides and spotlights from the team behind @pacific.beach and @sandiegofree.',
}

function formatPostDate(d: Date | null) {
  return d ? d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'America/Los_Angeles' }) : ''
}

export default async function BlogPage({ searchParams }: { searchParams: { tag?: string } }) {
  const tag = searchParams.tag
  const posts = await db.post.findMany({
    where: { published: true, ...(tag ? { tags: { has: tag } } : {}) },
    orderBy: { publishedAt: 'desc' },
    take: 60,
  })
  const [lead, ...rest] = posts

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ padding: '44px 16px 36px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 8 }}>The Blog</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#fff' }}>
            {tag ? `Posts tagged “${tag}”` : 'Stories from San Diego'}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            Local spotlights, guides and what&apos;s happening — straight from our Instagram to your inbox.
            {tag && <> <Link href="/blog" style={{ color: '#60A5FA', fontWeight: 600 }}>See all posts</Link></>}
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)', minHeight: '50vh' }}>
        <div className="container" style={{ padding: '36px 16px 80px' }}>
          {posts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-500)', fontSize: 15 }}>No posts yet — check back soon.</div>
          ) : (
            <>
              <Link href={`/blog/${lead.slug}`} className="blog-lead" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', marginBottom: 28 }}>
                <div className="blog-lead-cover" style={{ minHeight: 280, background: lead.coverImage ? `#0b2d60 url("${lead.coverImage}") center/cover` : 'linear-gradient(145deg,#0b2d60,#1557c0)' }} />
                <div style={{ padding: 30, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-400)', marginBottom: 10 }}>{formatPostDate(lead.publishedAt)}</div>
                  <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(22px,3vw,30px)', fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1.15, marginBottom: 12 }}>{lead.title}</h2>
                  {lead.excerpt && <p style={{ fontSize: 15, color: 'var(--gray-500)', lineHeight: 1.7 }}>{lead.excerpt}</p>}
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--blue)', marginTop: 16 }}>Read more →</span>
                </div>
              </Link>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 22 }}>
                {rest.map(p => (
                  <Link key={p.id} href={`/blog/${p.slug}`} style={{ display: 'block', background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden', textDecoration: 'none' }}>
                    <div style={{ height: 180, background: p.coverImage ? `#0b2d60 url("${p.coverImage}") center/cover` : 'linear-gradient(145deg,#0b2d60,#1557c0)' }} />
                    <div style={{ padding: '16px 18px 20px' }}>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)', marginBottom: 6 }}>{formatPostDate(p.publishedAt)}</div>
                      <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--gray-900)', lineHeight: 1.25, marginBottom: 6 }}>{p.title}</h3>
                      {p.excerpt && <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6 }}>{p.excerpt}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`@media (max-width: 760px) { .blog-lead { grid-template-columns: 1fr !important; } .blog-lead-cover { min-height: 200px !important; } }`}</style>
      <Footer />
    </>
  )
}
