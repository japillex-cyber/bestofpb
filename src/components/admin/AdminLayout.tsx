'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const NAV = [
  { icon: '📊', label: 'Overview',     href: '/admin' },
  { icon: '👥', label: 'Users',        href: '/admin/users' },
  { icon: '🏪', label: 'Vendors',      href: '/admin/vendors' },
  { icon: '💳', label: 'Members',      href: '/admin/members' },
  { icon: '📦', label: 'Packages',     href: '/admin/packages' },
  { icon: '📅', label: 'Events',       href: '/admin/events' },
  { icon: '🏆', label: 'Nominations',  href: '/admin/nominations' },
  { icon: '🎁', label: 'Giveaways',    href: '/admin/giveaways' },
  { icon: '📝', label: 'Submissions',  href: '/admin/submissions' },
  { icon: '✉️', label: 'Messages',     href: '/admin/messages' },
  { icon: '🔑', label: 'Invite Codes', href: '/admin/invite-codes' },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const user = session?.user as any

  return (
    <div style={{ width: 220, background: 'var(--navy)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 34, height: 34, background: 'var(--blue)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🌊</div>
          <div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Best of PB</div>
            <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ padding: '10px 8px', flex: 1 }}>
        {NAV.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 8, marginBottom: 2, textDecoration: 'none', background: active ? 'rgba(255,255,255,0.1)' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: active ? 600 : 400, transition: 'all 0.15s' }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom user */}
      <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
            {user?.name?.[0]?.toUpperCase() ?? 'A'}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{user?.name ?? 'Admin'}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Administrator</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <Link href="/" style={{ flex: 1, textAlign: 'center', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 600, padding: '6px', borderRadius: 7, textDecoration: 'none' }}>← Site</Link>
          <button onClick={() => signOut({ callbackUrl: '/' })} style={{ flex: 1, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: 'none', fontSize: 11, fontWeight: 600, padding: '6px', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
        </div>
      </div>
    </div>
  )
}

export function AdminLayout({ children, title, subtitle }: { children: React.ReactNode, title: string, subtitle?: string }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
      <AdminSidebar />
      <div style={{ marginLeft: 220, flex: 1, padding: '28px 32px', minWidth: 0 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.3px' }}>{title}</h1>
          {subtitle && <p style={{ fontSize: 13, color: 'var(--gray-500)', marginTop: 4 }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  )
}
