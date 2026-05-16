'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

// ── Inline sidebar (no import to avoid z-index issues) ──
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
  { icon: '🗳️', label: 'Polls',        href: '/admin/polls' },
]

const INIT_MEMBERS = [
  { id:'1', name:'Sarah Johnson', email:'sarah@example.com', phone:'(619) 555-0202', tier:'VIP', status:'ACTIVE', memberNumber:'BOPB-2025-00001', joined:'2025-03-15', expires:'2026-03-15', instagram:'@sarahjpb', savings:'$342' },
  { id:'2', name:'Mike Chen', email:'mike@example.com', phone:'(619) 555-0303', tier:'REGULAR', status:'ACTIVE', memberNumber:'BOPB-2025-00002', joined:'2025-04-02', expires:'2026-04-02', instagram:'@mikeinpb', savings:'$198' },
  { id:'3', name:'Jordan Lee', email:'jordan@example.com', phone:'(619) 555-0404', tier:'REGULAR', status:'ACTIVE', memberNumber:'BOPB-2025-00003', joined:'2025-04-20', expires:'2026-04-20', instagram:'@jordanlee', savings:'$124' },
  { id:'4', name:'Taylor Kim', email:'taylor@example.com', phone:'(619) 555-0505', tier:'VIP', status:'CANCELED', memberNumber:'BOPB-2025-00004', joined:'2025-02-10', expires:'2026-02-10', instagram:'@taylork', savings:'$89' },
  { id:'5', name:'Alex Rivera', email:'alex@example.com', phone:'(619) 555-0606', tier:'REGULAR', status:'PAST_DUE', memberNumber:'BOPB-2025-00005', joined:'2025-05-01', expires:'2026-05-01', instagram:'@alexr', savings:'$0' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ACTIVE:   { bg: '#E8F5EE', color: '#0B7A4B' },
  CANCELED: { bg: '#F1F3F7', color: '#6B7590' },
  PAST_DUE: { bg: '#FEE2E2', color: '#B91C1C' },
}

const TIER_STYLE: Record<string, { bg: string; color: string }> = {
  VIP:     { bg: '#FFF4DC', color: '#C8962A' },
  REGULAR: { bg: '#EBF0FF', color: '#0057FF' },
}

type Member = typeof INIT_MEMBERS[0]

export default function AdminMembersPage() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const user = session?.user as any

  const [members, setMembers] = useState(INIT_MEMBERS)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [viewMember, setViewMember] = useState<Member | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({ name:'', email:'', phone:'', instagram:'', tier:'REGULAR', status:'ACTIVE' })
  const [saved, setSaved] = useState(false)

  const filtered = members.filter(m => {
    const matchFilter = filter === 'ALL' || m.status === filter || m.tier === filter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const cancelMembership = (id: string) => {
    setMembers(ms => ms.map(m => m.id === id ? { ...m, status: 'CANCELED' } : m))
    setViewMember(prev => prev?.id === id ? { ...prev, status: 'CANCELED' } : prev)
  }

  const reactivate = (id: string) => {
    setMembers(ms => ms.map(m => m.id === id ? { ...m, status: 'ACTIVE' } : m))
    setViewMember(prev => prev?.id === id ? { ...prev, status: 'ACTIVE' } : prev)
  }

  const changeTier = (id: string, tier: string) => {
    setMembers(ms => ms.map(m => m.id === id ? { ...m, tier } : m))
    setViewMember(prev => prev?.id === id ? { ...prev, tier } : prev)
  }

  const addMember = () => {
    if (!addForm.name || !addForm.email) return
    const num = 'BOPB-2025-' + String(members.length + 10).padStart(5, '0')
    const today = new Date().toISOString().split('T')[0]
    const nextYear = new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]
    const newMember: Member = {
      id: String(Date.now()),
      name: addForm.name,
      email: addForm.email,
      phone: addForm.phone || 'N/A',
      instagram: addForm.instagram || 'N/A',
      tier: addForm.tier,
      status: addForm.status,
      memberNumber: num,
      joined: today,
      expires: nextYear,
      savings: '$0',
    }
    setMembers(ms => [newMember, ...ms])
    setShowAdd(false)
    setAddForm({ name:'', email:'', phone:'', instagram:'', tier:'REGULAR', status:'ACTIVE' })
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inp = { width:'100%', height:44, padding:'0 12px', border:'1.5px solid #E4E7EF', borderRadius:9, fontSize:14, fontFamily:'inherit', outline:'none', background:'#F8F9FB', color:'#1A1F30' }
  const lbl = { display:'block' as const, fontSize:11, fontWeight:700, color:'#6B7590', letterSpacing:'1px', textTransform:'uppercase' as const, marginBottom:7 }

  const active = members.filter(m => m.status === 'ACTIVE').length
  const vip = members.filter(m => m.tier === 'VIP').length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F9FB' }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: '#04091C', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50, overflowY: 'auto' }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{ width: 34, height: 34, background: '#0057FF', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🌊</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1 }}>Best of PB</div>
              <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 2 }}>Admin Panel</div>
            </div>
          </Link>
        </div>
        <nav style={{ padding: '10px 8px', flex: 1 }}>
          {NAV.map(item => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 8, marginBottom: 2, textDecoration: 'none', background: pathname === item.href ? 'rgba(255,255,255,0.1)' : 'transparent', color: pathname === item.href ? '#fff' : 'rgba(255,255,255,0.45)', fontSize: 13, fontWeight: pathname === item.href ? 600 : 400 }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '14px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>
              {user?.name?.[0]?.toUpperCase() ?? 'A'}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff', lineHeight: 1 }}>{user?.name ?? 'Admin'}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Administrator</div>
            </div>
          </div>
          <button onClick={() => signOut({ callbackUrl: '/' })} style={{ width: '100%', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: 'none', fontSize: 11, fontWeight: 600, padding: '7px', borderRadius: 7, cursor: 'pointer', fontFamily: 'inherit' }}>Sign out</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 220, flex: 1, padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, color: '#1A1F30' }}>Members</h1>
            <p style={{ fontSize: 13, color: '#6B7590', marginTop: 4 }}>{active} active · {vip} VIP · {members.length} total</p>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            + Add Member Manually
          </button>
        </div>

        {/* Success banner */}
        {saved && (
          <div style={{ background: '#E8F5EE', border: '1px solid rgba(11,122,75,0.2)', color: '#0B7A4B', padding: '12px 16px', borderRadius: 10, marginBottom: 16, fontSize: 14, fontWeight: 600 }}>
            ✅ Member added successfully!
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
          {[
            { label:'Total Members', value: members.length, icon:'💳' },
            { label:'Active', value: active, icon:'✅' },
            { label:'VIP Members', value: vip, icon:'⭐' },
            { label:'Past Due', value: members.filter(m => m.status === 'PAST_DUE').length, icon:'⚠️' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', border: '1px solid #E4E7EF', borderRadius: 12, padding: '16px 18px' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, color: '#1A1F30' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#6B7590', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 9, padding: '0 12px', height: 42 }}>
            <span>🔍</span>
            <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit', background: 'transparent' }} />
          </div>
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 9, padding: '0 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none', height: 42, cursor: 'pointer', color: '#1A1F30' }}>
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="VIP">VIP Only</option>
            <option value="REGULAR">Regular Only</option>
            <option value="PAST_DUE">Past Due</option>
            <option value="CANCELED">Canceled</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #E4E7EF', borderRadius: 16, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F3F7', background: '#F8F9FB' }}>
                {['Member', 'Tier', 'Member #', 'Status', 'Joined', 'Expires', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9AA3B8', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F3F7' : 'none' }}>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: m.tier === 'VIP' ? 'linear-gradient(135deg,#C8962A,#F0D98A)' : '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{m.name[0]}</div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1A1F30' }}>{m.name}</div>
                        <div style={{ fontSize: 11, color: '#9AA3B8' }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: TIER_STYLE[m.tier]?.bg, color: TIER_STYLE[m.tier]?.color }}>{m.tier}</span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, fontFamily: 'monospace', color: '#6B7590' }}>{m.memberNumber}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[m.status]?.bg, color: STATUS_STYLE[m.status]?.color }}>{m.status}</span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#9AA3B8' }}>{m.joined}</td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#9AA3B8' }}>{m.expires}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <button
                      onClick={() => setViewMember(m)}
                      style={{ background: '#EBF0FF', color: '#0057FF', border: 'none', borderRadius: 7, padding: '7px 16px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── VIEW MODAL ── */}
      {viewMember && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setViewMember(null) }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
            <div style={{ background: viewMember.tier === 'VIP' ? 'linear-gradient(135deg,#2D1C00,#6b3d00)' : 'linear-gradient(135deg,#0d1835,#0b2d60)', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: viewMember.tier === 'VIP' ? 'linear-gradient(135deg,#C8962A,#F0D98A)' : '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>{viewMember.name[0]}</div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{viewMember.name}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: TIER_STYLE[viewMember.tier]?.bg, color: TIER_STYLE[viewMember.tier]?.color }}>{viewMember.tier}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: STATUS_STYLE[viewMember.status]?.bg, color: STATUS_STYLE[viewMember.status]?.color }}>{viewMember.status}</span>
                </div>
              </div>
              <button onClick={() => setViewMember(null)} style={{ position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {[
                  { label: 'Email', value: viewMember.email },
                  { label: 'Phone', value: viewMember.phone },
                  { label: 'Instagram', value: viewMember.instagram },
                  { label: 'Member #', value: viewMember.memberNumber },
                  { label: 'Member Since', value: viewMember.joined },
                  { label: 'Expires', value: viewMember.expires },
                  { label: 'Total Savings', value: viewMember.savings },
                ].map(row => (
                  <div key={row.label} style={{ padding: '10px 12px', background: '#F8F9FB', borderRadius: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#9AA3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>{row.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1A1F30' }}>{row.value}</div>
                  </div>
                ))}
              </div>

              {/* Tier switcher */}
              <div style={{ marginBottom: 16, padding: '14px 16px', background: '#F8F9FB', borderRadius: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#9AA3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 10 }}>Change Membership Tier</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => changeTier(viewMember.id, 'REGULAR')} style={{ flex: 1, height: 38, background: viewMember.tier === 'REGULAR' ? '#EBF0FF' : '#fff', color: viewMember.tier === 'REGULAR' ? '#0057FF' : '#6B7590', border: `1.5px solid ${viewMember.tier === 'REGULAR' ? '#0057FF' : '#E4E7EF'}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Regular</button>
                  <button onClick={() => changeTier(viewMember.id, 'VIP')} style={{ flex: 1, height: 38, background: viewMember.tier === 'VIP' ? '#FFF4DC' : '#fff', color: viewMember.tier === 'VIP' ? '#C8962A' : '#6B7590', border: `1.5px solid ${viewMember.tier === 'VIP' ? '#C8962A' : '#E4E7EF'}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>⭐ VIP</button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button style={{ flex: 1, height: 44, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✉️ Email Member</button>
                {viewMember.status === 'ACTIVE' ? (
                  <button onClick={() => cancelMembership(viewMember.id)} style={{ height: 44, background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 14px', whiteSpace: 'nowrap' }}>Cancel</button>
                ) : (
                  <button onClick={() => reactivate(viewMember.id)} style={{ height: 44, background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 14px', whiteSpace: 'nowrap' }}>Reactivate</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ADD MEMBER MODAL ── */}
      {showAdd && (
        <div onClick={(e) => { if (e.target === e.currentTarget) setShowAdd(false) }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 480, padding: 28, boxShadow: '0 24px 64px rgba(0,0,0,0.4)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, color: '#1A1F30' }}>Add Member Manually</h2>
              <button onClick={() => setShowAdd(false)} style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F3F7', border: 'none', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><label style={lbl}>Full Name *</label><input type="text" placeholder="Alex Rivera" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} style={inp} /></div>
              <div><label style={lbl}>Email Address *</label><input type="email" placeholder="alex@example.com" value={addForm.email} onChange={e => setAddForm(f => ({ ...f, email: e.target.value }))} style={inp} /></div>
              <div><label style={lbl}>Phone Number</label><input type="tel" placeholder="(619) 555-0100" value={addForm.phone} onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))} style={inp} /></div>
              <div><label style={lbl}>Instagram Handle</label><input type="text" placeholder="@handle" value={addForm.instagram} onChange={e => setAddForm(f => ({ ...f, instagram: e.target.value }))} style={inp} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={lbl}>Membership Tier</label>
                  <select value={addForm.tier} onChange={e => setAddForm(f => ({ ...f, tier: e.target.value }))} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="REGULAR">Regular ($156/yr)</option>
                    <option value="VIP">VIP ($350/yr)</option>
                  </select>
                </div>
                <div>
                  <label style={lbl}>Status</label>
                  <select value={addForm.status} onChange={e => setAddForm(f => ({ ...f, status: e.target.value }))} style={{ ...inp, cursor: 'pointer' }}>
                    <option value="ACTIVE">Active</option>
                    <option value="CANCELED">Canceled</option>
                    <option value="PAST_DUE">Past Due</option>
                  </select>
                </div>
              </div>
              <div style={{ background: '#EBF0FF', borderRadius: 10, padding: '12px 14px', fontSize: 13, color: '#0057FF', lineHeight: 1.6 }}>
                💡 A member number will be auto-generated. Membership starts today and expires in 1 year.
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={addMember} disabled={!addForm.name || !addForm.email} style={{ flex: 1, height: 48, background: !addForm.name || !addForm.email ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: !addForm.name || !addForm.email ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}>
                  Add Member
                </button>
                <button onClick={() => setShowAdd(false)} style={{ height: 48, background: '#F1F3F7', color: '#2E3448', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: '0 20px' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
