'use client'
import { useState } from 'react'
import Link from 'next/link'

const SAMPLE_USERS = [
  { id: '1', name: 'BOPB Admin', email: 'admin@bestofpb.com', role: 'ADMIN', createdAt: '2025-01-01', membership: null },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'MEMBER', createdAt: '2025-03-15', membership: 'VIP' },
  { id: '3', name: 'Mike Chen', email: 'mike@example.com', role: 'MEMBER', createdAt: '2025-04-02', membership: 'Regular' },
  { id: '4', name: 'Alex Rivera', email: 'alex@example.com', role: 'USER', createdAt: '2025-05-10', membership: null },
  { id: '5', name: 'Jordan Lee', email: 'jordan@example.com', role: 'VENDOR', createdAt: '2025-04-20', membership: null },
  { id: '6', name: 'Taylor Kim', email: 'taylor@example.com', role: 'USER', createdAt: '2025-06-01', membership: null },
]

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  ADMIN:  { bg: '#FEE2E2', color: '#B91C1C' },
  MEMBER: { bg: '#E8F5EE', color: '#0B7A4B' },
  VENDOR: { bg: '#FEF3C7', color: '#92400E' },
  USER:   { bg: 'var(--gray-100)', color: 'var(--gray-600)' },
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')

  const filtered = SAMPLE_USERS.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
      <AdminSidebar active="Users" />
      <div style={{ marginLeft: 240, flex: 1, padding: '32px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Users</h1>
            <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>{SAMPLE_USERS.length} total users</p>
          </div>
          <button style={{ background: '#fff', border: '1.5px solid var(--gray-200)', color: 'var(--gray-700)', fontSize: 13, fontWeight: 600, padding: '9px 18px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit' }}>📥 Export CSV</button>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 10, padding: '0 14px', height: 44 }}>
            <span>🔍</span>
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, fontFamily: 'inherit' }} />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 10, padding: '0 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none', cursor: 'pointer', height: 44 }}>
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MEMBER">Member</option>
            <option value="VENDOR">Vendor</option>
            <option value="USER">User</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                {['User', 'Email', 'Role', 'Membership', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                        {user.name[0].toUpperCase()}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gray-900)' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--gray-500)' }}>{user.email}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: ROLE_COLORS[user.role]?.bg, color: ROLE_COLORS[user.role]?.color }}>
                      {user.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: user.membership ? '#0B7A4B' : 'var(--gray-400)', fontWeight: user.membership ? 600 : 400 }}>
                    {user.membership ?? 'None'}
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--gray-400)' }}>{user.createdAt}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button style={{ background: 'var(--blue-light)', color: 'var(--blue)', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>View</button>
                      <button style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export function AdminSidebar({ active }: { active: string }) {
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
    { icon: '🗳️', label: 'Polls',        href: '/admin/polls' },
    { icon: '❓', label: 'FAQ',          href: '/admin/faq' },
    { icon: '✉️', label: 'Messages',     href: '/admin/messages' },
    { icon: '🔑', label: 'Invite Codes', href: '/admin/invite-codes' },
    { icon: '⚙️', label: 'Settings',     href: '/admin/settings' },
  ]
  return (
    <div style={{ width: 240, background: 'var(--navy)', borderRight: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 36, height: 36, background: 'var(--blue)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🌊</div>
          <div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Best of PB</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
          </div>
        </Link>
      </div>
      <nav style={{ padding: '12px 10px', flex: 1 }}>
        {NAV.map(item => (
          <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 9, marginBottom: 2, textDecoration: 'none', background: active === item.label ? 'rgba(255,255,255,0.08)' : 'transparent', color: active === item.label ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 13.5, fontWeight: active === item.label ? 600 : 400 }}>
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}
