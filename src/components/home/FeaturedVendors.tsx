import Link from 'next/link'
import BusinessCard from '@/components/vendor/BusinessCard'
import { getSpotlightBusinesses } from '@/lib/vendors'
import { getViewer } from '@/lib/viewer'

// Homepage spotlight. Premium Exposure businesses rotate on every visit.
export default async function FeaturedVendors() {
  let viewer: Awaited<ReturnType<typeof getViewer>>
  let spotlight: Awaited<ReturnType<typeof getSpotlightBusinesses>>
  try {
    viewer = await getViewer()
    spotlight = await getSpotlightBusinesses(viewer.isPaidMember, 4)
  } catch (err) {
    // Never take the homepage down because of this section.
    console.error('Spotlight failed:', err)
    return null
  }
  if (spotlight.length === 0) return null

  return (
    <section style={{ padding: '64px 0', background: '#F8F9FB' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 6 }}>Business Spotlight</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>Featured Local Businesses</h2>
          </div>
          <Link href="/shop-local" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>View all businesses →</Link>
        </div>

        <div className="spot-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(spotlight.length, 4)}, minmax(0, 1fr))`, gap: 20 }}>
          {spotlight.map((v, i) => (
            <div key={v.id} className="spot-item"><BusinessCard v={v} isMember={viewer.isPaidMember} index={i} /></div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .spot-row { display: flex !important; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; margin: 0 -16px; padding: 0 16px 12px; gap: 14px !important; }
          .spot-item { min-width: 78vw; max-width: 340px; flex: 0 0 auto; scroll-snap-align: start; }
        }
      `}</style>
    </section>
  )
}
