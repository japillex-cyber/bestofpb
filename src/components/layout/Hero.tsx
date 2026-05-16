'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUICK_LINKS = [
  { label: 'PB Nights',     href: '/shop-local?cat=pb-nights' },
  { label: 'Get Outside',   href: '/shop-local?cat=get-outside' },
  { label: "I'm Hungry",    href: '/shop-local?cat=hungry' },
  { label: 'Self Care',     href: '/shop-local?cat=self-care' },
  { label: 'Fitness',       href: '/shop-local?cat=fitness' },
  { label: 'Cozy Stays',    href: '/shop-local?cat=cozy-stays' },
]

export default function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/shop-local?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <section className="hero" aria-label="Hero">
      {/* Background image with overlay */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80"
          alt=""
          className="hero__bg-img"
        />
        <div className="hero__bg-overlay" />
      </div>

      <div className="hero__content container">
        {/* Badge */}
        <div className="hero__badge animate-fadeUp" style={{ animationDelay: '0ms' }}>
          <span className="hero__badge-dot" />
          Pacific Beach · San Diego, CA
        </div>

        {/* Headline */}
        <h1 className="hero__headline animate-fadeUp" style={{ animationDelay: '80ms' }}>
          Discover the Best<br />
          <em>Pacific Beach</em> Has to Offer
        </h1>

        <p className="hero__subline animate-fadeUp" style={{ animationDelay: '160ms' }}>
          Exclusive member deals, curated experiences, and your<br className="hero__br" />
          insider guide to everything great in PB.
        </p>

        {/* Search bar - GetYourGuide style */}
        <form className="hero__search animate-fadeUp" onSubmit={handleSearch} style={{ animationDelay: '240ms' }} role="search">
          <div className="hero__search-inner">
            <div className="hero__search-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <input
              type="search"
              className="hero__search-input"
              placeholder="Search restaurants, activities, deals..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search businesses and experiences"
            />
            <button type="submit" className="hero__search-btn btn btn-primary btn-md">
              Search
            </button>
          </div>

          {/* Quick category pills */}
          <div className="hero__quick-links" role="list">
            {QUICK_LINKS.map(link => (
              <a key={link.href} href={link.href} className="hero__quick-pill" role="listitem">
                {link.label}
              </a>
            ))}
          </div>
        </form>

        {/* Stats row */}
        <div className="hero__stats animate-fadeUp" style={{ animationDelay: '320ms' }}>
          <div className="hero__stat">
            <span className="hero__stat-n">50+</span>
            <span className="hero__stat-l">Local Businesses</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-n">2,400+</span>
            <span className="hero__stat-l">Active Members</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-n">$200+</span>
            <span className="hero__stat-l">Avg. Monthly Savings</span>
          </div>
          <div className="hero__stat-divider" aria-hidden="true" />
          <div className="hero__stat">
            <span className="hero__stat-n">4.9 ★</span>
            <span className="hero__stat-l">Member Rating</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 640px;
          display: flex;
          align-items: center;
          padding: calc(var(--nav-height) + 80px) 0 100px;
          overflow: hidden;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero__bg-img {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center 40%;
        }
        .hero__bg-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(
            135deg,
            rgba(4,9,28,0.85) 0%,
            rgba(4,9,28,0.65) 50%,
            rgba(4,9,28,0.45) 100%
          );
        }

        .hero__content {
          position: relative;
          z-index: 1;
          max-width: 740px;
        }

        .hero__badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.9);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          margin-bottom: 24px;
        }
        .hero__badge-dot {
          width: 7px; height: 7px;
          background: #4ADE80;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .hero__headline {
          font-family: var(--font-display);
          font-size: clamp(38px, 5vw, 58px);
          font-weight: 800;
          color: #fff;
          line-height: 1.06;
          letter-spacing: -1.5px;
          margin-bottom: 18px;
        }
        .hero__headline em {
          color: #60A5FA;
          font-style: normal;
        }

        .hero__subline {
          font-size: 17px;
          color: rgba(255,255,255,0.7);
          line-height: 1.7;
          margin-bottom: 36px;
          font-weight: 400;
        }
        .hero__br { display: none; }
        @media (min-width: 768px) { .hero__br { display: block; } }

        /* Search bar */
        .hero__search {
          background: #fff;
          border-radius: var(--radius-xl);
          padding: 8px 8px 14px;
          box-shadow: var(--shadow-xl);
          margin-bottom: 28px;
          max-width: 640px;
        }
        .hero__search-inner {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: 4px;
        }
        .hero__search-icon {
          color: var(--gray-400);
          padding: 0 var(--space-2) 0 var(--space-3);
          flex-shrink: 0;
        }
        .hero__search-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 15px;
          color: var(--gray-800);
          background: transparent;
          min-width: 0;
        }
        .hero__search-input::placeholder { color: var(--gray-400); }
        .hero__search-btn { flex-shrink: 0; }

        .hero__quick-links {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 10px var(--space-3) 0;
        }
        .hero__quick-pill {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--gray-600);
          padding: 5px 12px;
          background: var(--gray-50);
          border: 1px solid var(--gray-200);
          border-radius: var(--radius-full);
          transition: all var(--duration-fast);
          white-space: nowrap;
        }
        .hero__quick-pill:hover {
          background: var(--brand-blue-light);
          border-color: var(--brand-blue);
          color: var(--brand-blue);
        }

        /* Stats */
        .hero__stats {
          display: flex;
          align-items: center;
          gap: var(--space-6);
          flex-wrap: wrap;
        }
        .hero__stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .hero__stat-n {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 800;
          color: #fff;
          line-height: 1;
          letter-spacing: -0.5px;
        }
        .hero__stat-l {
          font-size: 11px;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          letter-spacing: 0.3px;
        }
        .hero__stat-divider {
          width: 1px;
          height: 36px;
          background: rgba(255,255,255,0.15);
        }
      `}</style>
    </section>
  )
}
