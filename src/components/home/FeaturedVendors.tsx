'use client'
import Link from 'next/link'

const VENDORS = [
  { name: 'Shore House Kitchen', cat: "I'm Hungry", catIcon: '🍽️', desc: 'Fresh coastal bites steps from the sand. Breakfast, brunch & lunch crafted daily.', deal: '20% off your entire order', color: 'linear-gradient(145deg,#0b2d60,#1557c0)', slug: 'shore-house-kitchen' },
  { name: 'Wave Lounge', cat: 'PB Nights', catIcon: '🌙', desc: "PB's hottest rooftop bar with live music every weekend and panoramic ocean views.", deal: 'Free entry + 2-for-1 cocktails', color: 'linear-gradient(145deg,#170d35,#3b1e80)', slug: 'wave-lounge' },
  { name: 'Pacific Fit Studio', cat: 'Healthy & Fit', catIcon: '💪', desc: 'Premium surf training, yoga, and HIIT classes for every fitness level in PB.', deal: 'First month 50% off', color: 'linear-gradient(145deg,#062d1e,#0a6040)', slug: 'pacific-fit-studio' },
  { name: 'Glow Beauty Bar', cat: 'Self Care', catIcon: '✨', desc: 'Full-service beauty bar offering nails, lashes, brows, and facials in PB.', deal: '15% off all services', color: 'linear-gradient(145deg,#3a0a3a,#7c1e7c)', slug: 'glow-beauty-bar' },
]

export default function FeaturedVendors() {
  return (
    <section style={{ padding: '64px 0', background: '#F8F9FB' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 6 }}>Members Save</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>Featured Local Businesses</h2>
          </div>
          <Link href="/shop-local" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>View all businesses →</Link>
        </div>

        {/* Desktop: 3 column grid */}
        <div className="vendors-desktop" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {VENDORS.slice(0, 3).map(v => <VendorCard key={v.slug} v={v} />)}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="vendors-mobile" style={{ display: 'none' }}>
          <div style={{
            display: 'flex', gap: 14,
            overflowX: 'auto', scrollbarWidth: 'none',
            scrollSnapType: 'x mandatory',
            paddingBottom: 12,
            margin: '0 -16px', paddingLeft: 16, paddingRight: 16,
          }}>
            {VENDORS.map(v => (
              <div key={v.slug} style={{ minWidth: '78vw', flex: '0 0 auto', scrollSnapAlign: 'start' }}>
                <VendorCard v={v} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>← Swipe to see more →</span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .vendors-desktop { display: none !important; }
          .vendors-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

function VendorCard({ v }: { v: typeof VENDORS[0] }) {
  return (
    <Link href={`/shop-local/${v.slug}`} style={{ display: 'block', borderRadius: 18, overflow: 'hidden', background: '#fff', border: '1px solid var(--gray-200)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ height: 150, background: v.color, position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 14 }}>
        <span style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>
          {v.catIcon} {v.cat}
        </span>
      </div>
      <div style={{ padding: '16px 18px 18px' }}>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 6, color: 'var(--gray-900)' }}>{v.name}</h3>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 14 }}>{v.desc}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--blue-light)', borderRadius: 10, padding: '10px 12px' }}>
          <div style={{ width: 28, height: 28, background: 'var(--blue)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>🏷️</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue)' }}>Members: {v.deal}</span>
        </div>
      </div>
    </Link>
  )
}
