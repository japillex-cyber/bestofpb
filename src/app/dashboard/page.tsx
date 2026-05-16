'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const TABS = ['Overview', 'Membership Card', 'Purchases', 'Profile']

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('Overview')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login?callbackUrl=/dashboard')
  }, [status, router])

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--navy)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🌊</div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 15 }}>Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  const user = session.user as any
  const isMember = user.role === 'MEMBER' || user.role === 'ADMIN'
  const isVIP = user.role === 'ADMIN' // treat admin as VIP for demo

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--gray-50)', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container" style={{ padding: '32px 24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: isVIP ? 'linear-gradient(135deg,#C8962A,#F0D98A)' : 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#fff', flexShrink: 0, border: '3px solid rgba(255,255,255,0.15)' }}>
                {user.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4, flexWrap: 'wrap' }}>
                  <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff' }}>{user.name ?? 'Welcome!'}</h1>
                  {isMember && (
                    <span style={{ background: isVIP ? 'linear-gradient(135deg,#92400e,#C8962A)' : 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {isVIP ? '⭐ VIP Member' : '💳 Member'}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{user.email}</p>
              </div>
              <button onClick={() => signOut({ callbackUrl: '/' })} style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}>
                Sign out
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)', borderBottom: activeTab === tab ? '2px solid var(--blue)' : '2px solid transparent', transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container" style={{ padding: '32px 24px 80px' }}>
          {activeTab === 'Overview'        && <OverviewTab isMember={isMember} isVIP={isVIP} />}
          {activeTab === 'Membership Card' && <MembershipCardTab isMember={isMember} user={user} isVIP={isVIP} />}
          {activeTab === 'Purchases'       && <PurchasesTab />}
          {activeTab === 'Profile'         && <ProfileTab user={user} />}
        </div>
      </div>
      <Footer />
    </>
  )
}

// ── Overview Tab ─────────────────────────────────────
function OverviewTab({ isMember, isVIP }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
      {!isMember ? (
        <div style={{ background: 'linear-gradient(135deg,#0d1835,#0b2d60)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 18, padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>You don't have a membership yet</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Join to unlock exclusive deals at 50+ Pacific Beach businesses.</p>
          </div>
          <Link href="/memberships" className="btn btn-primary btn-lg">Get Membership →</Link>
        </div>
      ) : (
        <div style={{ background: isVIP ? 'linear-gradient(135deg,#2D1C00,#3a2500)' : 'linear-gradient(135deg,#0d1835,#0b2d60)', border: `1px solid ${isVIP ? 'rgba(201,168,76,0.3)' : 'rgba(96,165,250,0.15)'}`, borderRadius: 18, padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#4ADE80', letterSpacing: '0.5px' }}>ACTIVE MEMBERSHIP</span>
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: isVIP ? '#F0D98A' : '#fff', marginBottom: 4 }}>{isVIP ? 'VIP Member' : 'PB Member'}</h3>
            <p style={{ fontSize: 13, color: isVIP ? 'rgba(201,168,76,0.5)' : 'rgba(255,255,255,0.4)' }}>Renews annually · Active since 2025</p>
          </div>
          <Link href="/dashboard" onClick={() => {}} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontWeight: 600, padding: '10px 20px', borderRadius: 10, textDecoration: 'none' }}>
            View My Card →
          </Link>
        </div>
      )}

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { icon:'💰', label:'Saved This Month', value: isMember ? '$142' : '$0', sub: isMember ? 'across 4 businesses' : 'Join to start saving' },
          { icon:'🏪', label:'Deals Used', value: isMember ? '7' : '0', sub: isMember ? 'this month' : 'No active membership' },
          { icon:'📦', label:'Packages Booked', value:'0', sub:'Browse packages' },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, padding: '20px 18px' }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>{stat.icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 3, letterSpacing: '-0.5px' }}>{stat.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Quick Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
          {[
            { icon:'🏪', label:'Shop Local', desc:'Browse member deals', href:'/shop-local' },
            { icon:'📦', label:'Packages', desc:'Book an experience', href:'/packages' },
            { icon:'📅', label:'Events', desc:'See what is on', href:'/events' },
            { icon:'🏆', label:'Nominations', desc:'Vote for your faves', href:'/nominations' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '16px 14px', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{link.icon}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 3 }}>{link.label}</div>
              <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{link.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Premium Membership Card Tab ───────────────────────
function MembershipCardTab({ isMember, user, isVIP }: any) {
  const [flipped, setFlipped] = useState(false)

  // Generate member number from user id or fallback
  const memberNumber = 'BOPB-2025-' + String(Math.floor(Math.random() * 90000) + 10000).slice(0, 5)
  const cardHolder = user?.name?.toUpperCase() ?? 'MEMBER NAME'
  const secondLine = 'PACIFIC BEACH, CA'
  const validThru = '12/26'

  if (!isMember) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>💳</div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 10 }}>No membership yet</h3>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>Join Best of PB to get your premium membership card with QR code and exclusive deals.</p>
        <Link href="/memberships" className="btn btn-primary btn-lg">Get Your Membership Card</Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Your Membership Card</h2>
        <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Show this to any partner business to unlock your exclusive deals.</p>
      </div>

      {/* Card container */}
      <div onClick={() => setFlipped(!flipped)} style={{ cursor: 'pointer', width: '100%', maxWidth: 420, perspective: '1200px' }}>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '58%', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>

          {/* ── FRONT ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            borderRadius: 20,
            background: isVIP
              ? 'linear-gradient(135deg, #1a0e00 0%, #3d2200 30%, #6b3d00 60%, #3d2200 80%, #1a0e00 100%)'
              : 'linear-gradient(135deg, #0a1628 0%, #0d2040 40%, #0a3060 70%, #0d2040 100%)',
            boxShadow: isVIP
              ? '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,150,42,0.3), inset 0 1px 0 rgba(240,217,138,0.2)'
              : '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(96,165,250,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
            overflow: 'hidden',
            padding: '28px 30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            {/* Holographic shimmer overlay */}
            <div style={{ position: 'absolute', inset: 0, background: isVIP ? 'linear-gradient(105deg, transparent 40%, rgba(201,150,42,0.08) 50%, transparent 60%)' : 'linear-gradient(105deg, transparent 40%, rgba(96,165,250,0.06) 50%, transparent 60%)', pointerEvents: 'none' }} />

            {/* Decorative circles */}
            <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: isVIP ? 'rgba(201,150,42,0.08)' : 'rgba(0,87,255,0.1)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', right: -10, top: -10, width: 100, height: 100, borderRadius: '50%', background: isVIP ? 'rgba(201,150,42,0.06)' : 'rgba(0,87,255,0.08)', pointerEvents: 'none' }} />

            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
              <div>
                {/* Chip */}
                <div style={{ width: 44, height: 34, borderRadius: 6, background: isVIP ? 'linear-gradient(135deg,#C8962A,#F0D98A,#C8962A)' : 'linear-gradient(135deg,#4a6fa5,#7aa0d4,#4a6fa5)', marginBottom: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 32, height: 24, borderRadius: 4, border: `1px solid ${isVIP ? 'rgba(139,90,10,0.5)' : 'rgba(30,60,100,0.5)'}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, padding: 3 }}>
                    {[0,1,2,3].map(i => <div key={i} style={{ background: isVIP ? 'rgba(139,90,10,0.4)' : 'rgba(30,60,100,0.4)', borderRadius: 1 }} />)}
                  </div>
                </div>
                {/* Contactless symbol */}
                <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  {[8,12,16].map((s,i) => <div key={i} style={{ width: s, height: s, borderRadius: '50%', border: `1.5px solid ${isVIP ? 'rgba(201,150,42,0.5)' : 'rgba(96,165,250,0.4)'}`, borderLeft: 'none', borderBottom: 'none' }} />)}
                </div>
              </div>

              {/* Logo area */}
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 800, color: isVIP ? '#F0D98A' : '#60A5FA', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 2 }}>BEST OF PB</div>
                <div style={{ fontSize: 9, color: isVIP ? 'rgba(240,217,138,0.5)' : 'rgba(96,165,250,0.5)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Pacific Beach, CA</div>
                {isVIP && <div style={{ marginTop: 4, fontSize: 9, fontWeight: 700, color: '#C8962A', letterSpacing: '2px', textTransform: 'uppercase' }}>⭐ VIP</div>}
              </div>
            </div>

            {/* Card number */}
            <div style={{ position: 'relative' }}>
              <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 600, color: isVIP ? 'rgba(240,217,138,0.9)' : 'rgba(255,255,255,0.8)', letterSpacing: '3px', marginBottom: 16, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                BOPB •••• •••• {memberNumber.slice(-4)}
              </div>

              {/* Bottom info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>Card Holder</div>
                  <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, fontWeight: 700, color: isVIP ? '#F0D98A' : '#fff', letterSpacing: '1px', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{cardHolder}</div>
                  <div style={{ fontSize: 10, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '1px' }}>{secondLine}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>Valid Thru</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: isVIP ? '#F0D98A' : '#fff' }}>{validThru}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BACK ── */}
          <div style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 20,
            background: isVIP
              ? 'linear-gradient(135deg,#1a0e00,#3d2200,#1a0e00)'
              : 'linear-gradient(135deg,#0a1628,#0d2040,#0a1628)',
            boxShadow: isVIP
              ? '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,150,42,0.3)'
              : '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(96,165,250,0.2)',
            overflow: 'hidden',
          }}>
            {/* Magnetic stripe */}
            <div style={{ height: 44, background: '#000', margin: '28px 0 20px' }} />

            {/* Signature strip + QR */}
            <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1, background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 4px, #f0f0f0 4px, #f0f0f0 8px)', height: 44, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 12px' }}>
                <span style={{ fontFamily: 'cursive', fontSize: 18, color: '#333', opacity: 0.7 }}>{user?.name}</span>
              </div>

              {/* QR Code placeholder */}
              <div style={{ width: 70, height: 70, background: '#fff', borderRadius: 8, padding: 6, flexShrink: 0 }}>
                <div style={{ width: '100%', height: '100%', background: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0/8px 8px', borderRadius: 2 }} />
              </div>
            </div>

            {/* Member details */}
            <div style={{ padding: '16px 24px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3 }}>Member ID</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: isVIP ? '#F0D98A' : '#60A5FA', letterSpacing: '1px' }}>{memberNumber}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3 }}>Tier</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: isVIP ? '#F0D98A' : '#60A5FA' }}>{isVIP ? '⭐ VIP' : 'REGULAR'}</div>
                </div>
              </div>
              <div style={{ fontSize: 9, color: isVIP ? 'rgba(240,217,138,0.3)' : 'rgba(255,255,255,0.2)', lineHeight: 1.5, marginTop: 8 }}>
                Scan QR code to verify membership. This card is non-transferable. bestofpb.com
              </div>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center' }}>👆 Tap card to flip and reveal QR code</p>

      {/* Card actions */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
          📱 Add to Apple Wallet
        </button>
        <button style={{ background: '#fff', color: 'var(--gray-700)', border: '1.5px solid var(--gray-200)', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
          📥 Download Card
        </button>
      </div>

      {/* How to use */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, padding: 24, width: '100%', maxWidth: 480 }}>
        <h4 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>How to use your card</h4>
        {[
          ['1','Show this card to the vendor at checkout'],
          ['2','They scan your QR code to verify membership'],
          ['3','Your discount is applied instantly'],
          ['4','Or quote your Member ID: ' + memberNumber],
        ].map(([num, text]) => (
          <div key={num} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{num}</span>
            <span style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.5 }}>{text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Purchases Tab ─────────────────────────────────────
function PurchasesTab() {
  return (
    <div>
      <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>My Purchases</h2>
      <div style={{ textAlign: 'center', padding: '60px 0', background: '#fff', borderRadius: 18, border: '1px solid var(--gray-200)' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🛍️</div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No purchases yet</h3>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 24 }}>Your membership and package purchases will appear here.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/memberships" className="btn btn-primary btn-md">Get a Membership</Link>
          <Link href="/packages" className="btn btn-ghost btn-md">Browse Packages</Link>
        </div>
      </div>
    </div>
  )
}

// ── Profile Tab ───────────────────────────────────────
function ProfileTab({ user }: any) {
  const [name, setName] = useState(user.name ?? '')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', height: 46, padding: '0 14px',
    border: '1.5px solid var(--gray-200)', borderRadius: 10,
    fontSize: 14, color: 'var(--gray-800)', background: 'var(--gray-50)',
    outline: 'none', fontFamily: 'inherit',
  }

  return (
    <div style={{ maxWidth: 540 }}>
      <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>My Profile</h2>
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28, marginBottom: 20 }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 20, borderBottom: '1px solid var(--gray-100)' }}>
            <div style={{ width: 68, height: 68, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff' }}>
              {name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 4 }}>{name || 'Your Name'}</p>
              <button type="button" style={{ fontSize: 13, color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>Change photo</button>
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Email Address</label>
            <input type="email" value={user.email} disabled style={{ ...inputStyle, color: 'var(--gray-400)', background: 'var(--gray-100)', cursor: 'not-allowed' }} />
            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 5 }}>Email cannot be changed.</p>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Instagram Handle</label>
            <input type="text" placeholder="@yourhandle" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Phone Number</label>
            <input type="tel" placeholder="(619) 555-0100" style={inputStyle} />
          </div>
          <button type="submit" style={{ height: 48, background: saved ? '#0B7A4B' : 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', transition: 'background 0.3s' }}>
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </form>
      </div>
      <div style={{ background: '#fff', border: '1px solid #FEE2E2', borderRadius: 18, padding: 24 }}>
        <h4 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#B91C1C', marginBottom: 8 }}>Danger Zone</h4>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>Permanently delete your account and all your data.</p>
        <button style={{ background: '#FEE2E2', color: '#B91C1C', border: '1px solid rgba(185,28,28,0.2)', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>Delete Account</button>
      </div>
    </div>
  )
}
