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
  const isVIP = false // will come from DB later

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--gray-50)', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>

        {/* Header */}
        <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="container" style={{ padding: '36px 24px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 28 }}>
              {/* Avatar */}
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 700, color: '#fff', flexShrink: 0, border: '3px solid rgba(255,255,255,0.1)' }}>
                {user.name?.[0]?.toUpperCase() ?? '?'}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, color: '#fff' }}>
                    {user.name ?? 'Welcome!'}
                  </h1>
                  {isMember && (
                    <span style={{ background: isVIP ? 'var(--gold)' : 'var(--blue)', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {isVIP ? '⭐ VIP Member' : 'Member'}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{user.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: 500, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Sign out
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 2 }}>
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{ padding: '10px 18px', border: 'none', background: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)', borderBottom: activeTab === tab ? '2px solid var(--blue)' : '2px solid transparent', transition: 'all 0.15s' }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container" style={{ padding: '32px 24px 80px' }}>
          {activeTab === 'Overview' && <OverviewTab isMember={isMember} user={user} />}
          {activeTab === 'Membership Card' && <MembershipCardTab isMember={isMember} user={user} isVIP={isVIP} />}
          {activeTab === 'Purchases' && <PurchasesTab />}
          {activeTab === 'Profile' && <ProfileTab user={user} />}
        </div>
      </div>
      <Footer />
    </>
  )
}

// ── Overview Tab ─────────────────────────────────────
function OverviewTab({ isMember, user }: any) {
  const quickLinks = [
    { icon: '🏪', label: 'Shop Local', desc: 'Browse member deals', href: '/shop-local' },
    { icon: '📦', label: 'Packages', desc: 'Book an experience', href: '/packages' },
    { icon: '📅', label: 'Events', desc: 'See what is on', href: '/events' },
    { icon: '🏆', label: 'Nominations', desc: 'Vote for your faves', href: '/nominations' },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Membership status banner */}
      {!isMember ? (
        <div style={{ background: 'linear-gradient(135deg, #0d1835, #0b2d60)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 18, padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>You don't have a membership yet</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>Join to unlock exclusive deals at 50+ Pacific Beach businesses.</p>
          </div>
          <Link href="/memberships" className="btn btn-primary btn-lg">Get Membership →</Link>
        </div>
      ) : (
        <div style={{ background: 'linear-gradient(135deg, #0d1835, #0b2d60)', border: '1px solid rgba(96,165,250,0.15)', borderRadius: 18, padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#4ADE80', letterSpacing: '0.5px' }}>ACTIVE MEMBERSHIP</span>
            </div>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>PB Member</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Renews annually · Member since 2025</p>
          </div>
          <button
            onClick={() => document.querySelector('[data-tab="Membership Card"]')?.dispatchEvent(new Event('click'))}
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontSize: 13, fontWeight: 600, padding: '10px 20px', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            View My Card
          </button>
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          { icon: '💰', label: 'Saved This Month', value: isMember ? '$142' : '$0', sub: isMember ? 'across 4 businesses' : 'Join to start saving' },
          { icon: '🏪', label: 'Deals Used', value: isMember ? '7' : '0', sub: isMember ? 'this month' : 'No active membership' },
          { icon: '📦', label: 'Packages Booked', value: '0', sub: 'Browse packages' },
        ].map(stat => (
          <div key={stat.label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, padding: 22 }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{stat.icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 4, letterSpacing: '-0.5px' }}>{stat.value}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 2 }}>{stat.label}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Quick Links</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {quickLinks.map(link => (
            <Link key={link.href} href={link.href} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '18px 16px', textDecoration: 'none', transition: 'all 0.2s', display: 'block' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{link.icon}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, fontWeight: 700, color: 'var(--gray-900)', marginBottom: 3 }}>{link.label}</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{link.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Membership Card Tab ───────────────────────────────
function MembershipCardTab({ isMember, user, isVIP }: any) {
  const [flipped, setFlipped] = useState(false)

  if (!isMember) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>💳</div>
        <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 700, marginBottom: 10 }}>No membership yet</h3>
        <p style={{ fontSize: 15, color: 'var(--gray-500)', marginBottom: 28, maxWidth: 380, margin: '0 auto 28px' }}>Join Best of PB to get your digital membership card with QR code and exclusive deals.</p>
        <Link href="/memberships" className="btn btn-primary btn-lg">Get Your Membership Card</Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <div>
        <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 6 }}>Your Membership Card</h2>
        <p style={{ fontSize: 14, color: 'var(--gray-500)', textAlign: 'center' }}>Show this to any partner business to unlock your deals.</p>
      </div>

      {/* Card */}
      <div onClick={() => setFlipped(!flipped)} style={{ cursor: 'pointer', width: 380, perspective: '1000px' }}>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '60%', transition: 'transform 0.6s', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>

          {/* Front */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', background: isVIP ? 'linear-gradient(135deg, #2D1C00, #5a3800)' : 'linear-gradient(135deg, #0d1835, #1a3060)', borderRadius: 20, padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 24 }}>🌊</div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 11, fontWeight: 700, color: isVIP ? '#C8962A' : '#60A5FA', letterSpacing: '2px', textTransform: 'uppercase', marginTop: 4 }}>
                  {isVIP ? 'VIP Member' : 'Member'}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', textTransform: 'uppercase' }}>Best of PB</div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)' }}>Pacific Beach, CA</div>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 3 }}>{user.name}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '2px' }}>BOPB-2025-00142</div>
            </div>
          </div>

          {/* Back */}
          <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: isVIP ? 'linear-gradient(135deg, #2D1C00, #5a3800)' : 'linear-gradient(135deg, #0d1835, #1a3060)', borderRadius: 20, padding: 28, boxShadow: '0 20px 60px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            {/* QR Code placeholder */}
            <div style={{ width: 100, height: 100, background: '#fff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
              <div style={{ width: '100%', height: '100%', background: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0/10px 10px', borderRadius: 4 }} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.6)', letterSpacing: '1px', marginBottom: 3 }}>SCAN TO VERIFY</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>BOPB-2025-00142</div>
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontSize: 13, color: 'var(--gray-400)', textAlign: 'center' }}>👆 Tap card to flip and show QR code</p>

      {/* Card actions */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
          📱 Add to Apple Wallet
        </button>
        <button style={{ background: '#fff', color: 'var(--gray-700)', border: '1.5px solid var(--gray-200)', borderRadius: 10, padding: '11px 22px', fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
          📥 Download Card
        </button>
      </div>

      {/* How to use */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, padding: 24, width: '100%', maxWidth: 480 }}>
        <h4 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 16 }}>How to use your card</h4>
        {[
          ['1', 'Show this screen to the vendor at checkout'],
          ['2', 'They scan your QR code to verify membership'],
          ['3', 'Your discount is applied instantly'],
          ['4', 'Or simply quote your member ID: BOPB-2025-00142'],
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

  return (
    <div style={{ maxWidth: 540 }}>
      <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 24 }}>My Profile</h2>

      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 28 }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Avatar */}
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
            <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', height: 46, padding: '0 14px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, color: 'var(--gray-800)', background: 'var(--gray-50)', outline: 'none', fontFamily: 'inherit' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Email Address</label>
            <input type="email" value={user.email} disabled style={{ width: '100%', height: 46, padding: '0 14px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, color: 'var(--gray-400)', background: 'var(--gray-100)', outline: 'none', fontFamily: 'inherit', cursor: 'not-allowed' }} />
            <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 5 }}>Email cannot be changed.</p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Instagram Handle</label>
            <input type="text" placeholder="@yourhandle" style={{ width: '100%', height: 46, padding: '0 14px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, color: 'var(--gray-800)', background: 'var(--gray-50)', outline: 'none', fontFamily: 'inherit' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 8 }}>Phone Number</label>
            <input type="tel" placeholder="(619) 555-0100" style={{ width: '100%', height: 46, padding: '0 14px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, color: 'var(--gray-800)', background: 'var(--gray-50)', outline: 'none', fontFamily: 'inherit' }} />
          </div>

          <button
            type="submit"
            style={{ height: 48, background: saved ? '#0B7A4B' : 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', transition: 'background 0.3s' }}
          >
            {saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div style={{ background: '#fff', border: '1px solid #FEE2E2', borderRadius: 18, padding: 24, marginTop: 20 }}>
        <h4 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#B91C1C', marginBottom: 8 }}>Danger Zone</h4>
        <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 16 }}>Permanently delete your account and all your data.</p>
        <button style={{ background: '#FEE2E2', color: '#B91C1C', border: '1px solid rgba(185,28,28,0.2)', borderRadius: 8, padding: '9px 18px', fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer' }}>
          Delete Account
        </button>
      </div>
    </div>
  )
}
