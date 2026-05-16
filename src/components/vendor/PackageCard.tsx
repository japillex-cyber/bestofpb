import Link from 'next/link'

interface PackageCardProps {
  pkg: {
    id: string
    title: string
    slug: string
    category: string
    basePrice: number
    pricePerPerson?: number | null
    minGroupSize?: number | null
    maxGroupSize?: number | null
    images: string[]
    includes: string[]
    soldCount: number
    quantity?: number | null
  }
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  bachelorette: { bg: '#FF6B9D', text: '#fff', label: 'Bachelorette' },
  bachelor:     { bg: '#3B82F6', text: '#fff', label: 'Bachelor' },
  birthday:     { bg: '#F59E0B', text: '#fff', label: 'Birthday' },
  weekend:      { bg: '#10B981', text: '#fff', label: 'Weekend Getaway' },
  barcrawl:     { bg: '#8B5CF6', text: '#fff', label: 'Bar Crawl' },
  staycation:   { bg: '#06B6D4', text: '#fff', label: 'Staycation' },
  holiday:      { bg: '#EF4444', text: '#fff', label: 'Holiday' },
  valentines:   { bg: '#EC4899', text: '#fff', label: "Valentine's" },
  fathersday:   { bg: '#6B7280', text: '#fff', label: "Father's Day" },
  mothersday:   { bg: '#F97316', text: '#fff', label: "Mother's Day" },
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const photo = pkg.images[0] ?? 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=70'
  const catInfo = CATEGORY_COLORS[pkg.category] ?? { bg: '#0057FF', text: '#fff', label: pkg.category }
  const spotsLeft = pkg.quantity ? pkg.quantity - pkg.soldCount : null
  const almostGone = spotsLeft !== null && spotsLeft <= 5

  return (
    <Link href={`/packages/${pkg.slug}`} className="pkgcard" aria-label={pkg.title}>
      {/* Photo */}
      <div className="pkgcard__photo-wrap">
        <img src={photo} alt={pkg.title} className="pkgcard__photo" loading="lazy" />
        <div className="pkgcard__overlay" aria-hidden="true" />

        {/* Category pill */}
        <div
          className="pkgcard__cat"
          style={{ background: catInfo.bg, color: catInfo.text }}
          aria-label={`Category: ${catInfo.label}`}
        >
          {catInfo.label}
        </div>

        {/* Spots badge */}
        {spotsLeft !== null && (
          <div className={`pkgcard__spots ${almostGone ? 'pkgcard__spots--urgent' : ''}`}>
            {almostGone
              ? `Only ${spotsLeft} spots left!`
              : `${spotsLeft} spots available`}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="pkgcard__body">
        <h3 className="pkgcard__title">{pkg.title}</h3>

        {/* Includes preview */}
        {pkg.includes.length > 0 && (
          <ul className="pkgcard__includes" aria-label="What's included">
            {pkg.includes.slice(0, 3).map((item, i) => (
              <li key={i} className="pkgcard__include-item">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="6.5" fill="#E8F5EE"/>
                  <path d="M4 6.5L6 8.5L9.5 5" stroke="#0B7A4B" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {item}
              </li>
            ))}
            {pkg.includes.length > 3 && (
              <li className="pkgcard__include-more">+{pkg.includes.length - 3} more included</li>
            )}
          </ul>
        )}

        {/* Group size */}
        {pkg.minGroupSize && (
          <div className="pkgcard__group">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="9.5" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M1 12C1 9.79 2.79 8 5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M7 10C7 8.34 8.34 7 10 7C11.66 7 13 8.34 13 10V12H7V10Z" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            {pkg.minGroupSize}
            {pkg.maxGroupSize && pkg.maxGroupSize !== pkg.minGroupSize ? `–${pkg.maxGroupSize}` : '+'} people
          </div>
        )}

        {/* Pricing */}
        <div className="pkgcard__pricing">
          <div className="pkgcard__from">from</div>
          <div className="pkgcard__price">
            ${pkg.pricePerPerson ?? pkg.basePrice}
          </div>
          <div className="pkgcard__per">
            {pkg.pricePerPerson ? '/ person' : '/ group'}
          </div>
        </div>
      </div>

      <style jsx>{`
        .pkgcard {
          display: block;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #fff;
          border: 1px solid var(--gray-100);
          text-decoration: none;
          transition: all var(--duration-base) var(--ease-out);
          box-shadow: var(--shadow-xs);
        }
        .pkgcard:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
        }

        .pkgcard__photo-wrap {
          position: relative;
          aspect-ratio: 16/10;
          overflow: hidden;
          background: var(--gray-100);
        }
        .pkgcard__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s var(--ease-out);
        }
        .pkgcard:hover .pkgcard__photo { transform: scale(1.05); }
        .pkgcard__overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to bottom, transparent 50%, rgba(4,9,28,0.5) 100%);
        }

        .pkgcard__cat {
          position: absolute;
          top: 12px; left: 12px;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.5px; text-transform: uppercase;
          padding: 4px 11px;
          border-radius: var(--radius-full);
        }

        .pkgcard__spots {
          position: absolute;
          bottom: 12px; right: 12px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(4px);
          font-size: 11px; font-weight: 700;
          color: var(--gray-700);
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }
        .pkgcard__spots--urgent {
          background: #FEE2E2;
          color: var(--error);
        }

        .pkgcard__body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pkgcard__title {
          font-family: var(--font-display);
          font-size: 18px; font-weight: 700;
          color: var(--gray-900);
          letter-spacing: -0.3px;
          line-height: 1.25;
        }

        .pkgcard__includes {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .pkgcard__include-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          color: var(--gray-600);
        }
        .pkgcard__include-more {
          font-size: 12px;
          color: var(--gray-400);
          font-weight: 500;
          padding-left: 19px;
        }

        .pkgcard__group {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12.5px;
          color: var(--gray-500);
          font-weight: 500;
        }

        .pkgcard__pricing {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-top: 2px;
          padding-top: 10px;
          border-top: 1px solid var(--gray-100);
        }
        .pkgcard__from { font-size: 12px; color: var(--gray-400); }
        .pkgcard__price {
          font-family: var(--font-display);
          font-size: 22px; font-weight: 800;
          color: var(--gray-900);
          letter-spacing: -0.5px;
        }
        .pkgcard__per { font-size: 12px; color: var(--gray-400); }
      `}</style>
    </Link>
  )
}
