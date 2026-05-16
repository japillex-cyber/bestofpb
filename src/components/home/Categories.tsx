import Link from 'next/link'

const CATS = [
  { slug: 'pb-nights',      label: 'PB Nights',      img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=200&q=80' },
  { slug: 'get-outside',    label: 'Get Outside',     img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=200&q=80' },
  { slug: 'hungry',         label: "I'm Hungry",      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&q=80' },
  { slug: 'fitness',        label: 'Healthy & Fit',   img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&q=80' },
  { slug: 'self-care',      label: 'Self Care',       img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=80' },
  { slug: 'services',       label: 'Services',        img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&q=80' },
  { slug: 'pets',           label: 'I Love My Pet',   img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&q=80' },
  { slug: 'cozy-stays',     label: 'Cozy Stays',      img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=200&q=80' },
  { slug: 'event-planning', label: 'Event Planning',  img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=200&q=80' },
  { slug: 'around-town',    label: 'Around Town',     img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80' },
  { slug: 'apparel',        label: 'Apparel',         img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200&q=80' },
  { slug: 'drinks',         label: 'Drinks',          img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=200&q=80' },
]

export default function Categories() {
  return (
    <section style={{ padding: '60px 0 48px', background: '#fff' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--blue)', display: 'block', marginBottom: 6 }}>Explore</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(22px,3vw,28px)', fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>Shop Local by Category</h2>
          </div>
          <Link href="/shop-local" style={{ fontSize: 14, fontWeight: 600, color: 'var(--blue)', textDecoration: 'none' }}>View all →</Link>
        </div>

        {/* Scrollable row */}
        <div style={{
          display: 'flex', gap: 14,
          overflowX: 'auto', scrollbarWidth: 'none',
          margin: '0 -16px', padding: '4px 16px 12px',
          scrollSnapType: 'x mandatory',
        }}>
          {CATS.map(cat => (
            <Link
              key={cat.slug}
              href={`/shop-local?cat=${cat.slug}`}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 10, minWidth: 88, flexShrink: 0, textDecoration: 'none',
                scrollSnapAlign: 'start',
              }}
            >
              {/* Photo circle */}
              <div style={{
                width: 76, height: 76, borderRadius: 20,
                overflow: 'hidden', position: 'relative',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                flexShrink: 0,
              }}>
                <img
                  src={cat.img}
                  alt={cat.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Dark overlay for depth */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.25) 100%)' }} />
              </div>

              <span style={{
                fontSize: 12, fontWeight: 600,
                color: 'var(--gray-700)', textAlign: 'center',
                lineHeight: 1.3, maxWidth: 80,
              }}>
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        a:hover > div {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.18) !important;
        }
      `}</style>
    </section>
  )
}
