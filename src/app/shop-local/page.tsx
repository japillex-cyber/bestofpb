'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const CATEGORIES = [
  { slug: 'all',          label: 'All',            icon: '🌊' },
  { slug: 'pb-nights',    label: 'PB Nights',      icon: '🌙' },
  { slug: 'get-outside',  label: 'Get Outside',    icon: '🏄' },
  { slug: 'hungry',       label: "I'm Hungry",     icon: '🍽️' },
  { slug: 'fitness',      label: 'Healthy & Fit',  icon: '💪' },
  { slug: 'self-care',    label: 'Self Care',      icon: '✨' },
  { slug: 'services',     label: 'Services',       icon: '🔧' },
  { slug: 'pets',         label: 'I Love My Pet',  icon: '🐾' },
  { slug: 'cozy-stays',   label: 'Cozy Stays',     icon: '🏨' },
  { slug: 'event-planning', label: 'Event Planning', icon: '🎉' },
  { slug: 'around-town',  label: 'Around Town',    icon: '🗺️' },
  { slug: 'apparel',      label: 'Apparel',        icon: '👗' },
  { slug: 'cool-shit',    label: 'Cool Shit',      icon: '🔥' },
  { slug: 'drinks',       label: 'Drinks',         icon: '🍹' },
]

const VENDORS = [
  { id: '1', name: 'Shore House Kitchen', slug: 'shore-house-kitchen', cat: 'hungry', catLabel: "I'm Hungry", catIcon: '🍽️', desc: 'Fresh coastal bites steps from the sand. Breakfast, brunch & lunch crafted from local ingredients daily.', deal: '20% off your entire order', dealLocked: true, rating: 4.9, reviews: 128, color: 'linear-gradient(145deg,#0b2d60,#1557c0)', tags: ['Breakfast','Brunch','Lunch'] },
  { id: '2', name: 'Wave Lounge',         slug: 'wave-lounge',         cat: 'pb-nights', catLabel: 'PB Nights', catIcon: '🌙', desc: "PB's hottest rooftop bar with live music every weekend and panoramic ocean views at golden hour.", deal: 'Free entry + 2-for-1 cocktails', dealLocked: true, rating: 4.8, reviews: 94, color: 'linear-gradient(145deg,#170d35,#3b1e80)', tags: ['Bar','Rooftop','Live Music'] },
  { id: '3', name: 'Pacific Fit Studio',  slug: 'pacific-fit-studio',  cat: 'fitness', catLabel: 'Healthy & Fit', catIcon: '💪', desc: 'Premium surf training, yoga, and HIIT classes designed for every fitness level right in PB.', deal: 'First month 50% off', dealLocked: true, rating: 5.0, reviews: 61, color: 'linear-gradient(145deg,#062d1e,#0a6040)', tags: ['Yoga','HIIT','Surf Training'] },
  { id: '4', name: 'Glow Beauty Bar',     slug: 'glow-beauty-bar',     cat: 'self-care', catLabel: 'Self Care', catIcon: '✨', desc: 'Full-service beauty bar offering nails, lashes, brows, facials and massage in a luxe PB setting.', deal: '15% off all services', dealLocked: true, rating: 4.9, reviews: 203, color: 'linear-gradient(145deg,#3a0a3a,#7c1e7c)', tags: ['Nails','Lashes','Facials'] },
  { id: '5', name: 'PB Paddle Co.',       slug: 'pb-paddle-co',        cat: 'get-outside', catLabel: 'Get Outside', catIcon: '🏄', desc: 'Paddleboard and kayak rentals right on the bay. Sunset tours and beginner lessons available daily.', deal: 'Free rental upgrade for members', dealLocked: true, rating: 4.7, reviews: 87, color: 'linear-gradient(145deg,#0a3a5a,#0d6ea8)', tags: ['Paddleboard','Kayak','Tours'] },
  { id: '6', name: 'The Bungalow Hotel',  slug: 'the-bungalow-hotel',  cat: 'cozy-stays', catLabel: 'Cozy Stays', catIcon: '🏨', desc: 'Boutique beachside hotel steps from Crystal Pier. Ocean-view rooms, rooftop pool, and beachside bar.', deal: '10% off nightly rate', dealLocked: true, rating: 4.8, reviews: 312, color: 'linear-gradient(145deg,#1a2a1a,#2d5a2d)', tags: ['Hotel','Pool','Ocean View'] },
  { id: '7', name: 'Craft & Pint',        slug: 'craft-and-pint',      cat: 'drinks', catLabel: 'Drinks', catIcon: '🍹', desc: 'PB\'s finest craft beer bar with 40 taps, a full cocktail menu, and the best happy hour on Garnet Ave.', deal: 'Buy 1 get 1 happy hour', dealLocked: true, rating: 4.6, reviews: 178, color: 'linear-gradient(145deg,#2a1500,#6b3a00)', tags: ['Craft Beer','Cocktails','Happy Hour'] },
  { id: '8', name: 'Paws & Play',         slug: 'paws-and-play',       cat: 'pets', catLabel: 'I Love My Pet', catIcon: '🐾', desc: 'Premium pet daycare, grooming, and boarding for your fur babies. Voted PB\'s best pet care 3 years running.', deal: 'Free first day of daycare', dealLocked: true, rating: 4.9, reviews: 145, color: 'linear-gradient(145deg,#3a2a0a,#8b6914)', tags: ['Daycare','Grooming','Boarding'] },
  { id: '9', name: 'ThreadsPB',           slug: 'threads-pb',           cat: 'apparel', catLabel: 'Apparel', catIcon: '👗', desc: 'Local surf-inspired streetwear brand born in Pacific Beach. Exclusive drops, limited runs, all made local.', deal: '20% off all full-price items', dealLocked: true, rating: 4.7, reviews: 56, color: 'linear-gradient(145deg,#2a1a3a,#5a3a8a)', tags: ['Streetwear','Surf','Local Brand'] },
]

export default function ShopLocalPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('featured')

  const filtered = VENDORS.filter(v => {
    const matchCat = activeCategory === 'all' || v.cat === activeCategory
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'rating') return b.rating - a.rating
    if (sort === 'reviews') return b.reviews - a.reviews
    return 0
  })

  return (
    <>
      <Navbar />

      {/* Page hero */}
      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)', paddingBottom: 0 }}>
        <div className="container" style={{ paddingTop: 40, paddingBottom: 32 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 8 }}>Pacific Beach</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 10 }}>
            Shop Local in Pacific Beach
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>
            {VENDORS.length} local businesses · Exclusive member deals available
          </p>

          {/* Search bar */}
          <div style={{ display: 'flex', gap: 12, maxWidth: 600 }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '0 16px', height: 48 }}>
              <span style={{ fontSize: 16 }}>🔍</span>
              <input
                type="text"
                placeholder="Search businesses..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 14, fontFamily: 'inherit' }}
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, padding: '0 16px', color: '#fff', fontSize: 13, fontFamily: 'inherit', outline: 'none', cursor: 'pointer', height: 48 }}
            >
              <option value="featured" style={{ background: '#04091C' }}>Featured</option>
              <option value="rating"   style={{ background: '#04091C' }}>Top Rated</option>
              <option value="reviews"  style={{ background: '#04091C' }}>Most Reviewed</option>
            </select>
          </div>
        </div>

        {/* Category pills scroll */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '8px 16px', borderRadius: 999, border: 'none',
                    background: activeCategory === cat.slug ? '#0057FF' : 'rgba(255,255,255,0.06)',
                    color: activeCategory === cat.slug ? '#fff' : 'rgba(255,255,255,0.55)',
                    fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
                    transition: 'all 0.15s', whiteSpace: 'nowrap',
                  }}
                >
                  <span>{cat.icon}</span> {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ background: 'var(--gray-50)', minHeight: '60vh' }}>
        <div className="container" style={{ padding: '36px 24px 80px' }}>

          {/* Results bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 14, color: 'var(--gray-600)' }}>
              <strong style={{ color: 'var(--gray-900)' }}>{sorted.length}</strong> businesses found
              {activeCategory !== 'all' && ` in ${CATEGORIES.find(c => c.slug === activeCategory)?.label}`}
              {search && ` matching "${search}"`}
            </p>

            {/* Member teaser */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--blue-light)', border: '1px solid rgba(0,87,255,0.15)', borderRadius: 999, padding: '7px 16px' }}>
              <span style={{ fontSize: 13 }}>🔒</span>
              <span style={{ fontSize: 13, color: 'var(--blue)' }}>
                <Link href="/memberships" style={{ fontWeight: 700, color: 'var(--blue)' }}>Join as a member</Link>
                {' '}to unlock all deals
              </span>
            </div>
          </div>

          {/* Vendor grid */}
          {sorted.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
              {sorted.map((vendor, i) => (
                <VendorCard key={vendor.id} vendor={vendor} index={i} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🏖️</div>
              <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>No businesses found</h3>
              <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 20 }}>Try a different category or clear your search.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearch('') }}
                className="btn btn-primary btn-md"
              >Clear filters</button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}

function VendorCard({ vendor, index }: { vendor: typeof VENDORS[0], index: number }) {
  return (
    <Link
      href={`/shop-local/${vendor.slug}`}
      style={{
        display: 'block', borderRadius: 18, overflow: 'hidden',
        background: '#fff', border: '1px solid var(--gray-200)',
        textDecoration: 'none', boxShadow: 'var(--shadow-sm)',
        transition: 'all 0.2s ease',
        animation: `fadeUp 0.5s ease ${index * 60}ms both`,
      }}
    >
      {/* Photo area */}
      <div style={{ height: 160, background: vendor.color, position: 'relative', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '12px 14px' }}>
        {/* Category badge */}
        <span style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 999 }}>
          {vendor.catIcon} {vendor.catLabel}
        </span>
        {/* Rating */}
        <span style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, display: 'flex', alignItems: 'center', gap: 4 }}>
          ⭐ {vendor.rating}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 18px 20px' }}>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 5, letterSpacing: '-0.2px' }}>{vendor.name}</h3>

        {/* Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 1 }}>
            {[1,2,3,4,5].map(s => (
              <span key={s} style={{ fontSize: 11, color: s <= Math.round(vendor.rating) ? '#F59E0B' : '#E4E7EF' }}>★</span>
            ))}
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-700)' }}>{vendor.rating}</span>
          <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>({vendor.reviews} reviews)</span>
        </div>

        <p style={{ fontSize: 13, color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{vendor.desc}</p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
          {vendor.tags.map(tag => (
            <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', background: 'var(--gray-100)', color: 'var(--gray-600)', borderRadius: 999 }}>{tag}</span>
          ))}
        </div>

        {/* Deal */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: vendor.dealLocked ? 'var(--gray-50)' : 'var(--blue-light)',
          border: `1px ${vendor.dealLocked ? 'dashed var(--gray-200)' : 'solid rgba(0,87,255,0.15)'}`,
          borderRadius: 10, padding: '10px 14px',
        }}>
          <span style={{ fontSize: 15 }}>{vendor.dealLocked ? '🔒' : '🏷️'}</span>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: vendor.dealLocked ? 'var(--gray-500)' : 'var(--blue)', filter: vendor.dealLocked ? 'blur(3.5px)' : 'none', userSelect: vendor.dealLocked ? 'none' : 'auto' }}>
            {vendor.dealLocked ? 'Members: ' : ''}{vendor.deal}
          </span>
          {vendor.dealLocked && (
            <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: 'var(--blue)', whiteSpace: 'nowrap' }}>Join →</span>
          )}
        </div>
      </div>
    </Link>
  )
}
