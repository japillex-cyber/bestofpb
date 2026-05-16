import Link from 'next/link'
import { Vendor } from '@prisma/client'

interface VendorCardProps {
  vendor: {
    id: string
    name: string
    slug: string
    description?: string | null
    photos: string[]
    category: { name: string; icon?: string | null }
    deal?: { title: string; memberOnly: boolean } | null
    averageRating?: number
    reviewCount?: number
  }
  isMember?: boolean
  priority?: boolean
}

export default function VendorCard({ vendor, isMember = false, priority = false }: VendorCardProps) {
  const photo = vendor.photos[0] ?? 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=70'
  const hasDeal = !!vendor.deal

  return (
    <Link href={`/shop-local/${vendor.slug}`} className="vcard" aria-label={vendor.name}>
      {/* Photo */}
      <div className="vcard__photo-wrap">
        <img
          src={photo}
          alt={vendor.name}
          className="vcard__photo"
          loading={priority ? 'eager' : 'lazy'}
        />
        {/* Category badge */}
        <div className="vcard__cat-badge">
          {vendor.category.icon && <span aria-hidden="true">{vendor.category.icon}</span>}
          {vendor.category.name}
        </div>
        {/* Deal badge */}
        {hasDeal && (
          <div className={`vcard__deal-badge ${!isMember && vendor.deal?.memberOnly ? 'vcard__deal-badge--locked' : ''}`}>
            {!isMember && vendor.deal?.memberOnly ? (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <rect x="2" y="5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4 5V3.5C4 2.12 4.89 1 6 1C7.11 1 8 2.12 8 3.5V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Member deal
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
                </svg>
                {vendor.deal?.title}
              </>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="vcard__body">
        <h3 className="vcard__name">{vendor.name}</h3>

        {vendor.averageRating && (
          <div className="vcard__rating" aria-label={`Rating: ${vendor.averageRating} out of 5`}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1L8 4.5L12 5L9.5 7.5L10 11L6.5 9.5L3 11L3.5 7.5L1 5L5 4.5L6.5 1Z" fill="#F59E0B"/>
            </svg>
            <span className="vcard__rating-n">{vendor.averageRating.toFixed(1)}</span>
            <span className="vcard__rating-c">({vendor.reviewCount})</span>
          </div>
        )}

        {vendor.description && (
          <p className="vcard__desc">{vendor.description}</p>
        )}

        {/* Deal teaser */}
        {hasDeal && (
          <div className={`vcard__deal ${!isMember && vendor.deal?.memberOnly ? 'vcard__deal--locked' : 'vcard__deal--visible'}`}>
            {!isMember && vendor.deal?.memberOnly ? (
              <span>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{display:'inline',verticalAlign:'-2px',marginRight:4}} aria-hidden="true">
                  <rect x="2.5" y="5.5" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4.5 5.5V4C4.5 2.62 5.39 1.5 6.5 1.5C7.61 1.5 8.5 2.62 8.5 4V5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Join to unlock member deals
              </span>
            ) : (
              <span>{vendor.deal?.title}</span>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .vcard {
          display: block;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #fff;
          border: 1px solid var(--gray-100);
          text-decoration: none;
          transition: all var(--duration-base) var(--ease-out);
          box-shadow: var(--shadow-xs);
        }
        .vcard:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-lg);
          border-color: var(--gray-200);
        }

        .vcard__photo-wrap {
          position: relative;
          aspect-ratio: 4/3;
          overflow: hidden;
          background: var(--gray-100);
        }
        .vcard__photo {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.5s var(--ease-out);
        }
        .vcard:hover .vcard__photo { transform: scale(1.04); }

        .vcard__cat-badge {
          position: absolute;
          top: 12px; left: 12px;
          display: flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(6px);
          font-size: 11px; font-weight: 700;
          color: var(--gray-700);
          padding: 4px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.3px;
        }

        .vcard__deal-badge {
          position: absolute;
          bottom: 12px; left: 12px;
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 700;
          padding: 5px 11px;
          border-radius: var(--radius-full);
          letter-spacing: 0.2px;
        }
        .vcard__deal-badge--locked {
          background: rgba(4,9,28,0.75);
          backdrop-filter: blur(6px);
          color: rgba(255,255,255,0.85);
        }
        .vcard__deal-badge:not(.vcard__deal-badge--locked) {
          background: var(--brand-blue);
          color: #fff;
        }

        .vcard__body {
          padding: 14px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .vcard__name {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 700;
          color: var(--gray-900);
          letter-spacing: -0.3px;
          line-height: 1.25;
        }

        .vcard__rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .vcard__rating-n { font-size: 13px; font-weight: 700; color: var(--gray-800); }
        .vcard__rating-c { font-size: 12px; color: var(--gray-400); }

        .vcard__desc {
          font-size: 13px;
          color: var(--gray-500);
          line-height: 1.55;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .vcard__deal {
          font-size: 13px;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: var(--radius-md);
          display: flex; align-items: center;
        }
        .vcard__deal--visible {
          background: var(--brand-blue-light);
          color: var(--brand-blue);
        }
        .vcard__deal--locked {
          background: var(--gray-50);
          color: var(--gray-500);
          border: 1px dashed var(--gray-200);
        }
      `}</style>
    </Link>
  )
}
