import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BusinessCard from '@/components/vendor/BusinessCard'
import { GUIDES } from '@/lib/plans'
import { getListedBusinesses } from '@/lib/vendors'
import { getViewer } from '@/lib/viewer'

export const dynamic = 'force-dynamic'

export function generateMetadata({ params }: { params: { slug: string } }) {
  const g = GUIDES.find(x => x.slug === params.slug)
  return { title: g ? `${g.title} — San Diego | Best of PB` : 'Guide — Best of PB', description: g?.blurb }
}

export default async function GuidePage({ params }: { params: { slug: string } }) {
  const guide = GUIDES.find(g => g.slug === params.slug)
  if (!guide) notFound()

  const viewer = await getViewer()
  const businesses = await getListedBusinesses(viewer.isPaidMember, { guides: { has: guide.slug } })

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ padding: '44px 16px 36px' }}>
          <Link href="/shop-local" style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>← Shop Local</Link>
          <div style={{ fontSize: 40, margin: '14px 0 6px' }}>{guide.icon}</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#fff' }}>{guide.title}</h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', marginTop: 8 }}>{guide.blurb}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 22 }}>
            {GUIDES.filter(g => g.slug !== guide.slug).map(g => (
              <Link key={g.slug} href={`/guides/${g.slug}`} style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.75)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: 999, textDecoration: 'none' }}>
                {g.icon} {g.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--gray-50)', minHeight: '50vh' }}>
        <div className="container" style={{ padding: '36px 16px 80px' }}>
          {businesses.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 22 }}>
              {businesses.map((b, i) => <BusinessCard key={b.id} v={b} isMember={viewer.isPaidMember} index={i} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray-500)', fontSize: 15 }}>
              This guide is being put together. Check back soon.
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
