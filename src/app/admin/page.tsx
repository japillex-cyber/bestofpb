'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

const NAV_ITEMS = [
  { icon: '📊', label: 'Overview',    href: '/admin' },
  { icon: '👥', label: 'Users',       href: '/admin/users' },
  { icon: '🏪', label: 'Vendors',     href: '/admin/vendors' },
  { icon: '💳', label: 'Members',     href: '/admin/members' },
  { icon: '📦', label: 'Packages',    href: '/admin/packages' },
  { icon: '📅', label: 'Events',      href: '/admin/events' },
  { icon: '🏆', label: 'Nominations', href: '/admin/nominations' },
  { icon: '🎁', label: 'Giveaways',   href: '/admin/giveaways' },
  { icon: '📝', label: 'Submissions', href: '/admin/submissions' },
  { icon: '🗳️', label: 'Polls',       href: '/admin/polls' },
  { icon: '❓', label: 'FAQ',         href: '/admin/faq' },
  { icon: '✉️', label: 'Messages',    href: '/admin/messages' },
  { icon: '🔑', label: 'Invite Codes',href: '/admin/invite-codes' },
  { icon: '⚙️', label: 'Settings',    href: '/admin/settings' },
]

const STATS = [
  { icon: '👥', label: 'Total Users',     value: '24',  change: '+3 this week',  color: '#0057FF' },
  { icon: '💳', label: 'Active Members',  value: '8',   change: '+1 this week',  color: '#0B7A4B' },
  { icon: '🏪', label: 'Active Vendors',  value: '6',   change: '2 pending',     color: '#C8962A' },
  { icon: '🎁', label: 'Giveaway Entries',value: '847', change: '+12 today',     color: '#8B5CF6' },
  { icon: '📝', label: 'Submissions',     value: '31',  change: '5 pending review', color: '#EF4444' },
  { icon: '🏆', label: 'Nominations',     value: '18',  change: '7 pending approval', color: '#F59E0B' },
]

const RECENT_ACTIVITY = [
  { icon: '👤', text: 'New user registered', sub: 'alex@example.com', time: '2 min ago', color: '#0057FF' },
  { icon: '🎁', text: 'New giveaway entry', sub: 'sarah@example.com', time: '5 min ago', color: '#8B5CF6' },
  { icon: '📝', text: 'New submission received', sub: 'Shore House Kitchen', time: '12 min ago', color: '#0B7A4B' },
  { icon: '🏆', text: 'New nomination', sub: 'Kono Pizza — Food category', time: '24 min ago', color: '#C8962A' },
  { icon: '💳', text: 'Membership purchased', sub: 'Regular — $156/year', time: '1 hr ago', color: '#0B7A4B' },
  { icon: '🏪', text: 'Vendor application', sub: 'Wave Lounge — PB Nights', time: '2 hr ago', color: '#F59E0B' },
]

const PENDING_ITEMS = [
  { type: 'Vendor', name: 'Sunset Tacos', category: 'Hungry', status: 'Awaiting approval', urgent: false },
  { type: 'Vendor', name: 'PB Yoga Studio', category: 'Fitness', status: 'Awaiting approval', urgent: false },
  { type: 'Nomination', name: 'Kono Pizza', category: 'Food', status: 'Needs review', urgent: false },
  { type: 'Nomination', name: 'Local Art Collective', category: 'Arts', status: 'Needs review', urgent: false },
  { type: 'Submission', name: 'Shore House Kitchen', category: 'Business', status: 'Pending', urgent: true },
  { type: 'Event', name: 'PB Block Party', category: 'Social', status: 'Awaiting approval', urgent: true },
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeNav, setActiveNav] = useState('Overview')

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
    if (status === 'authenticated' && (session?.user as any)?.role !== 'ADMIN') router.push('/')
  }, [status, session, router])

  if (status === 'loading') return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#04091C' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading admin panel...</p>
    </div>
  )

  if (!session) return null

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>

      {/* Sidebar */}
      <div style={{ width: 240, background: 'var(--navy)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, background: 'var(--blue)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌊</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Best of PB</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ padding: '12px 10px', flex: 1 }}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setActiveNav(item.label)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, marginBottom: 2, textDecoration: 'none', background: activeNav === item.label ? 'rgba(255,255,255,0.08)' : 'transparent', color: activeNav === item.label ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 13.5, fontWeight: activeNav === item.label ? 600 : 400, transition: 'all 0.15s' }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: '#fff' }}>
              {(session.user?.name?.[0] ?? 'A').toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{session.user?.name ?? 'Admin'}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Administrator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ marginLeft: 240, flex: 1, padding: '32px 36px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px', marginBottom: 4 }}>Dashboard Overview</h1>
            <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Welcome back! Here is what is happening with Best of PB.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{ background: '#fff', border: '1.5px solid var(--gray-200)', color: 'var(--gray-700)', fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit' }}>
              📥 Export CSV
            </button>
            <Link href="/admin/invite-codes" className="btn btn-primary btn-sm">
              + New Invite Code
            </Link>
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
          {STATS.map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{stat.icon}</div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 28, fontWeight: 800, color: 'var(--gray-900)', lineHeight: 1, letterSpacing: '-0.5px' }}>{stat.value}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-600)', margin: '4px 0 3px' }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: stat.color, fontWeight: 500 }}>{stat.change}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>

          {/* Pending items */}
          <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700 }}>Needs Your Attention</h2>
              <span style={{ background: '#FEE2E2', color: '#B91C1C', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>{PENDING_ITEMS.length} pending</span>
            </div>
            <div>
              {PENDING_ITEMS.map((item, i) => (
                <div key={i} style={{ padding: '14px 22px', borderBottom: i < PENDING_ITEMS.length - 1 ? '1px solid var(--gray-100)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.urgent ? '#EF4444' : '#F59E0B', flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)' }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{item.type} · {item.category}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: 'var(--gray-400)', whiteSpace: 'nowrap' }}>{item.status}</span>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Approve</button>
                      <button style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✕ Reject</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--gray-100)' }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700 }}>Recent Activity</h2>
            </div>
            <div style={{ padding: '8px 0' }}>
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} style={{ padding: '12px 22px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--gray-800)', marginBottom: 2 }}>{item.text}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{item.sub}</div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--gray-300)', whiteSpace: 'nowrap', flexShrink: 0 }}>{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div style={{ marginTop: 20, background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: '20px 22px' }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 18 }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { icon: '🔑', label: 'Create Invite Code', href: '/admin/invite-codes', color: '#0057FF' },
              { icon: '📦', label: 'Add Package', href: '/admin/packages', color: '#8B5CF6' },
              { icon: '📅', label: 'Add Event', href: '/admin/events', color: '#0B7A4B' },
              { icon: '🎁', label: 'Manage Giveaway', href: '/admin/giveaways', color: '#C8962A' },
              { icon: '🏪', label: 'Approve Vendors', href: '/admin/vendors', color: '#EF4444' },
              { icon: '🏆', label: 'Review Nominations', href: '/admin/nominations', color: '#F59E0B' },
              { icon: '📝', label: 'Review Submissions', href: '/admin/submissions', color: '#06B6D4' },
              { icon: '📥', label: 'Export All Data', href: '#', color: '#6B7590' },
            ].map(action => (
              <Link key={action.label} href={action.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'var(--gray-50)', border: '1px solid var(--gray-200)', borderRadius: 12, textDecoration: 'none', transition: 'all 0.15s' }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: `${action.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{action.icon}</div>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--gray-700)', lineHeight: 1.3 }}>{action.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
