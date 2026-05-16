import Link from 'next/link'

const CATEGORIES = [
  { slug: 'pb-nights',    label: 'PB Nights',       emoji: '🌙', count: 12, color: '#1A1A4E', light: '#E8E8FF' },
  { slug: 'get-outside',  label: 'Get Outside',      emoji: '🏄', count: 18, color: '#0D4A2E', light: '#E6F5EE' },
  { slug: 'hungry',       label: "I'm Hungry",       emoji: '🍽️', count: 22, color: '#4A1A00', light: '#FFF0E6' },
  { slug: 'fitness',      label: 'Healthy & Fit',    emoji: '💪', count: 9,  color: '#0A3A2A', light: '#E6F5F0' },
  { slug: 'self-care',    label: 'Self Care',        emoji: '✨', count: 14, color: '#3A0A3A', light: '#F5E6F5' },
  { slug: 'services',     label: 'Needed Services',  emoji: '🔧', count: 8,  color: '#1A2A4A', light: '#E6EEF5' },
  { slug: 'pets',         label: 'I Love My Pet',    emoji: '🐾', count: 6,  color: '#3A2A0A', light: '#F5F0E6' },
  { slug: 'cozy-stays',   label: 'Cozy Stays',       emoji: '🏨', count: 5,  color: '#0A1A3A', light: '#E6EAF5' },
  { slug: 'event-planning', label: 'Event Planning', emoji: '🎉', count: 7,  color: '#3A0A1A', light: '#F5E6EA' },
  { slug: 'around-town',  label: 'Around Town',      emoji: '🗺️', count: 11, color: '#1A3A0A', light: '#EEF5E6' },
  { slug: 'apparel',      label: 'Apparel',          emoji: '👗', count: 4,  color: '#2A1A3A', light: '#F0E6F5' },
  { slug: 'cool-shit',    label: 'Cool Shit',        emoji: '🔥', count: 8,  color: '#3A1A00', light: '#F5EAE6' },
]

export default function CategoryGrid() {
  return (
    <section className="cats" aria-labelledby="cats-heading">
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">Explore</span>
            <h2 className="section-title" id="cats-heading">Shop Local by Category</h2>
          </div>
          <Link href="/shop-local" className="section-link">
            View all
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </Link>
        </div>

        {/* Scroll container */}
        <div className="cats__scroll" role="list">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop-local?cat=${cat.slug}`}
              className="cats__item"
              role="listitem"
              aria-label={`${cat.label} — ${cat.count} businesses`}
            >
              <div className="cats__icon" style={{ background: cat.color }} aria-hidden="true">
                {cat.emoji}
              </div>
              <span className="cats__label">{cat.label}</span>
              <span className="cats__count">{cat.count} spots</span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .cats { padding: var(--space-20) 0; }

        .cats__scroll {
          display: flex;
          gap: var(--space-4);
          overflow-x: auto;
          scrollbar-width: none;
          padding-bottom: var(--space-2);
          margin: 0 calc(-1 * var(--space-6));
          padding-inline: var(--space-6);
        }
        .cats__scroll::-webkit-scrollbar { display: none; }

        .cats__item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          min-width: 100px;
          flex-shrink: 0;
          text-decoration: none;
          transition: transform var(--duration-base) var(--ease-out);
        }
        .cats__item:hover { transform: translateY(-4px); }
        .cats__item:hover .cats__icon { box-shadow: var(--shadow-lg); }

        .cats__icon {
          width: 72px; height: 72px;
          border-radius: var(--radius-xl);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          transition: box-shadow var(--duration-base) var(--ease-out);
          box-shadow: var(--shadow-sm);
        }

        .cats__label {
          font-size: 13px;
          font-weight: 600;
          color: var(--gray-800);
          text-align: center;
          line-height: 1.3;
        }

        .cats__count {
          font-size: 11px;
          color: var(--gray-400);
          font-weight: 500;
        }
      `}</style>
    </section>
  )
}
