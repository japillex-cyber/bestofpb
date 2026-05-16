import Link from 'next/link'

const VENDORS = [
  { name: 'Shore House Kitchen', cat: "🍽️ I'm Hungry", desc: 'Fresh coastal bites steps from the sand. Breakfast, brunch & lunch daily.', deal: '20% off your entire order', color: 'linear-gradient(145deg,#0b2d60,#1557c0)', slug: 'shore-house-kitchen' },
  { name: 'Wave Lounge', cat: '🌙 PB Nights', desc: "PB's hottest rooftop bar with live music every weekend and ocean views.", deal: 'Free entry + 2-for-1 cocktails', color: 'linear-gradient(145deg,#170d35,#3b1e80)', slug: 'wave-lounge' },
  { name: 'Pacific Fit Studio', cat: '💪 Healthy & Fit', desc: 'Premium surf training, yoga, and HIIT classes for every fitness level.', deal: 'First month 50% off', color: 'linear-gradient(145deg,#062d1e,#0a6040)', slug: 'pacific-fit-studio' },
]

export default function FeaturedVendors() {
  return (
    <section className="section-gray">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Members Save</span>
            <h2 className="section-title">Featured Local Businesses</h2>
          </div>
          <Link href="/shop-local" className="view-all">View all businesses →</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 22 }}>
          {VENDORS.map(v => (
            <Link key={v.slug} href={`/shop-local/${v.slug}`} style={{
              display: 'block', borderRadius: 18, overflow: 'hidden',
              background: '#fff', border: '1px solid var(--gray-200)',
              textDecoration: 'none', transition: 'all 0.2s ease',
              boxShadow: 'var(--shadow-sm)',
            }}>
              {/* Photo */}
              <div style={{ height: 160, background: v.color, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 14 }}>
                <span style={{
                  background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.15)', color: '#fff',
                  fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999,
                  letterSpacing: '0.5px',
                }}>{v.cat}</span>
              </div>
              {/* Body */}
              <div style={{ padding: '18px 18px 20px' }}>
                <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, marginBottom: 6, color: 'var(--gray-900)' }}>{v.name}</h3>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 14 }}>{v.desc}</p>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  background: 'var(--blue-light)', borderRadius: 10, padding: '10px 14px',
                }}>
                  <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>🏷️</div>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--blue)' }}>Members: {v.deal}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
