'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const QUICK = ['PB Nights','Get Outside',"I'm Hungry",'Self Care','Fitness','Cozy Stays']

export default function Hero() {
  const router = useRouter()
  const [q, setQ] = useState('')

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1800&q=80"
          alt="Pacific Beach"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(4,9,28,0.88) 0%, rgba(4,9,28,0.65) 60%, rgba(4,9,28,0.5) 100%)' }} />
      </div>

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 'var(--nav-height)', paddingBottom: 60 }}>
        {/* Badge */}
        <div className="fade-up fade-up-1" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.18)', borderRadius: 999,
          padding: '6px 16px', marginBottom: 28,
        }}>
          <span style={{ width: 7, height: 7, background: '#4ADE80', borderRadius: '50%', flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.5px' }}>Pacific Beach · San Diego, CA</span>
        </div>

        {/* Headline */}
        <h1 className="fade-up fade-up-2" style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 'clamp(38px, 6vw, 68px)',
          fontWeight: 800, color: '#fff',
          lineHeight: 1.05, letterSpacing: '-2px',
          marginBottom: 20, maxWidth: 700,
        }}>
          Discover the Best<br />
          <span style={{ color: '#60A5FA' }}>Pacific Beach</span><br />
          Has to Offer
        </h1>

        <p className="fade-up fade-up-3" style={{
          fontSize: 17, color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.75, marginBottom: 36, maxWidth: 480, fontWeight: 400,
        }}>
          Exclusive member deals, curated experiences, and your insider guide to everything great in PB.
        </p>

        {/* Search bar */}
        <div className="fade-up fade-up-4" style={{
          background: '#fff', borderRadius: 20,
          padding: '8px 8px 14px', maxWidth: 600,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)', marginBottom: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 4px 4px 16px' }}>
            <span style={{ fontSize: 18 }}>🔍</span>
            <input
              type="search"
              placeholder="Search restaurants, activities, deals..."
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && router.push(`/shop-local?q=${q}`)}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 15, color: '#1a1f30', background: 'transparent',
              }}
            />
            <button
              className="btn btn-primary btn-md"
              onClick={() => router.push(`/shop-local?q=${q}`)}
            >Search</button>
          </div>
          {/* Quick links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '10px 12px 0' }}>
            {QUICK.map(item => (
              <a key={item} href={`/shop-local?cat=${item.toLowerCase().replace(/\s+/g,'-').replace("'","")}`} style={{
                fontSize: 12, fontWeight: 500, padding: '5px 12px',
                background: '#f1f3f7', border: '1px solid #e4e7ef',
                borderRadius: 999, color: '#4a5268', transition: 'all 0.15s',
              }}>{item}</a>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="fade-up fade-up-4" style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
          {[['50+','Local Businesses'],['2,400+','Active Members'],['$200+','Avg. Monthly Savings'],['4.9★','Member Rating']].map(([n,l],i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.15)' }} />}
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.5px' }}>{n}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginTop: 3 }}>{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 80 }}>
          <path fill="#ffffff" d="M0 80L0 40C120 10 240 0 360 15C480 30 600 60 720 65C840 70 960 50 1080 35C1200 20 1320 15 1440 30L1440 80Z"/>
        </svg>
      </div>
    </section>
  )
}
