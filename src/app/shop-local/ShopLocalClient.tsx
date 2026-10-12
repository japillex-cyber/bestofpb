'use client'
import { useState } from 'react'
import Link from 'next/link'
import BusinessCard from '@/components/vendor/BusinessCard'
import type { BusinessCardData } from '@/lib/vendors'
import { GUIDES } from '@/lib/plans'

type Cat = { slug: string; name: string; icon: string | null }

export default function ShopLocalClient({ businesses, categories, isMember, initialCat, initialQuery }: {
  businesses: BusinessCardData[]
  categories: Cat[]
  isMember: boolean
  initialCat: string
  initialQuery: string
}) {
  const [activeCategory, setActiveCategory] = useState(categories.some(c => c.slug === initialCat) ? initialCat : 'all')
  const [search, setSearch] = useState(initialQuery)

  const q = search.trim().toLowerCase()
  // Order is already set server-side: Premium first, then Community, then Starter.
  const filtered = businesses.filter(b =>
    (activeCategory === 'all' || b.category.slug === activeCategory) &&
    (!q || b.name.toLowerCase().includes(q) || b.blurb.toLowerCase().includes(q) || b.category.name.toLowerCase().includes(q))
  )

  const pills: Cat[] = [{ slug: 'all', name: 'All', icon: '🌊' }, ...categories]

  return (
    <>
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 8 }}>San Diego</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 10 }}>
            Shop Local in San Diego
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>
            {businesses.length} local {businesses.length === 1 ? 'business' : 'businesses'} · Exclusive member deals available
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '0 16px', height: 48, maxWidth: 600 }}>
            <span style={{ fontSize: 16 }}>🔍</span>
            <input
              type="search"
              placeholder="Search businesses..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 14, fontFamily: 'inherit', minWidth: 0 }}
            />
          </div>
        </div>
        {categories.length > 0 && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }}>
            <div className="container">
              <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content' }}>
                {pills.map(cat => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 999, border: 'none', background: activeCategory === cat.slug ? '#0057FF' : 'rgba(255,255,255,0.06)', color: activeCategory === cat.slug ? '#fff' : 'rgba(255,255,255,0.55)', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', whiteSpace: 'nowrap' }}
                  >
                    {cat.icon && <span>{cat.icon}</span>} {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ background: 'var(--gray-50)', minHeight: '60vh' }}>
        <div className="container" style={{ padding: '36px 24px 80px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 14, color: 'var(--gray-600)' }}>
              <strong style={{ color: 'var(--gray-900)' }}>{filtered.length}</strong> {filtered.length === 1 ? 'business' : 'businesses'} found
              {activeCategory !== 'all' && ` in ${categories.find(c => c.slug === activeCategory)?.name}`}
              {q && ` matching "${search}"`}
            </p>
            {!isMember && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--blue-light)', border: '1px solid rgba(0,87,255,0.15)', borderRadius: 999, padding: '7px 16px' }}>
                <span style={{ fontSize: 13 }}>🔒</span>
                <span style={{ fontSize: 13, color: 'var(--blue)' }}>
                  <Link href="/memberships" style={{ fontWeight: 700, color: 'var(--blue)' }}>Join the SD Social Club</Link> to unlock all deals
                </span>
              </div>
            )}
          </div>

          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: 22 }}>
              {filtered.map((b, i) => <BusinessCard key={b.id} v={b} isMember={isMember} index={i} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🏖️</div>
              <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                {businesses.length === 0 ? 'Businesses are on the way' : 'No businesses found'}
              </h3>
              <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 20 }}>
                {businesses.length === 0 ? 'Our first local partners are joining now.' : 'Try a different category or clear your search.'}
              </p>
              {businesses.length === 0 ? (
                <Link href="/memberships?for=business" className="btn btn-primary btn-md">List your business</Link>
              ) : (
                <button onClick={() => { setActiveCategory('all'); setSearch('') }} className="btn btn-primary btn-md">Clear filters</button>
              )}
            </div>
          )}

          <div style={{ marginTop: 56 }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Community Guides</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {GUIDES.map(g => (
                <Link key={g.slug} href={`/guides/${g.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 999, padding: '9px 16px', fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', textDecoration: 'none' }}>
                  <span>{g.icon}</span>{g.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
