'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUICK = ['PB Nights', 'Get Outside', "I'm Hungry", 'Self Care', 'Fitness', 'Cozy Stays']

export default function Hero() {
  const router = useRouter()
  const [q, setQ] = useState('')

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100vw',
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80"
          alt="Pacific Beach"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,9,28,0.88) 0%, rgba(4,9,28,0.65) 60%, rgba(4,9,28,0.5) 100%)' }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 1200,
        margin: '0 auto',
        padding: 'calc(var(--nav-height) + 48px) 16px 60px',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999,
          padding: '6px 14px', marginBottom: 22,
        }}>
          <span style={{ width: 7, height: 7, background: '#4ADE80', borderRadius: '50%', flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.3px' }}>Pacific Beach · San Diego, CA</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 'clamp(32px, 6vw, 64px)',
          fontWeight: 800, color: '#fff',
          lineHeight: 1.05, letterSpacing: '-1.5px',
          marginBottom: 16, maxWidth: 700,
        }}>
          Discover the Best<br />
          <span style={{ color: '#60A5FA' }}>Pacific Beach</span><br />
          Has to Offer
        </h1>

        <p style={{
          fontSize: 'clamp(14px, 2vw, 17px)',
          color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.75, marginBottom: 28,
          maxWidth: 480, fontWeight: 400,
        }}>
          Exclusive member deals, curated experiences, and your insider guide to everything great in PB.
        </p>

        {/* Search bar */}
        <div style={{
          background: '#fff', borderRadius: 16,
          padding: '8px 8px 12px',
          maxWidth: 600, width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          marginBottom: 22,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 4px 4px 14px' }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>🔍</span>
            <input
              type="search"
              placeholder="Search restaurants, activities, deals..."
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && router.push(`/shop-local?q=${q}`)}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 15, color: '#1a1f30',
                background: 'transparent', minWidth: 0,
              }}
            />
            <button
              onClick={() => router.push(`/shop-local?q=${q}`)}
              style={{
                background: '#0057FF', color: '#fff',
                border: 'none', borderRadius: 10,
                padding: '10px 18px', fontSize: 14,
                fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >Search</button>
          </div>
          {/* Quick links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '8px 10px 0' }}>
            {QUICK.map(item => (
              <a key={item} href={`/shop-local?cat=${item.toLowerCase().replace(/\s+/g, '-').replace("'", '')}`} style={{
                fontSize: 12, fontWeight: 500, padding: '4px 11px',
                background: '#f1f3f7', border: '1px solid #e4e7ef',
                borderRadius: 999, color: '#4a5268', textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}>{item}</a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          {[['50+', 'Local Businesses'], ['2,400+', 'Active Members'], ['$200+', 'Avg. Monthly Savings'], ['4.9★', 'Member Rating']].map(([n, l], i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />}
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.5px' }}>{n}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginTop: 2 }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1, overflow: 'hidden' }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
          <path fill="#ffffff" d="M0 80L0 40C120 10 240 0 360 15C480 30 600 60 720 65C840 70 960 50 1080 35C1200 20 1320 15 1440 30L1440 80Z"/>
        </svg>
      </div>
    </section>
  )
}
