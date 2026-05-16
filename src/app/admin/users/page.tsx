'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const SAMPLE_USERS = [
  { id:'1', name:'BOPB Admin', email:'admin@bestofpb.com', role:'ADMIN', createdAt:'2025-01-01', membership:null, phone:'(619) 555-0001', instagram:'@thebestofpb' },
  { id:'2', name:'Sarah Johnson', email:'sarah@example.com', role:'MEMBER', createdAt:'2025-03-15', membership:'VIP', phone:'(619) 555-0202', instagram:'@sarahjpb' },
  { id:'3', name:'Mike Chen', email:'mike@example.com', role:'MEMBER', createdAt:'2025-04-02', membership:'Regular', phone:'(619) 555-0303', instagram:'@mikeinpb' },
  { id:'4', name:'Alex Rivera', email:'alex@example.com', role:'USER', createdAt:'2025-05-10', membership:null, phone:'(619) 555-0404', instagram:'@alexr' },
  { id:'5', name:'Jordan Lee', email:'jordan@example.com', role:'VENDOR', createdAt:'2025-04-20', membership:null, phone:'(619) 555-0505', instagram:'@jordanlee' },
  { id:'6', name:'Taylor Kim', email:'taylor@example.com', role:'USER', createdAt:'2025-06-01', membership:null, phone:'(619) 555-0606', instagram:'@taylork' },
]

const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
  ADMIN:  { bg: '#FEE2E2', color: '#B91C1C' },
  MEMBER: { bg: '#E8F5EE', color: '#0B7A4B' },
  VENDOR: { bg: '#FEF3C7', color: '#92400E' },
  USER:   { bg: '#F1F3F7', color: '#4A5268' },
}

type User = typeof SAMPLE_USERS[0]

export default function AdminUsersPage() {
  const [users, setUsers] = useState(SAMPLE_USERS)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [viewUser, setViewUser] = useState<User | null>(null)
  const [editUser, setEditUser] = useState<User | null>(null)
  const [editForm, setEditForm] = useState<Partial<User>>({})

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'ALL' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const openEdit = (user: User) => {
    setEditForm({ ...user })
    setEditUser(user)
    setViewUser(null)
  }

  const saveEdit = () => {
    setUsers(us => us.map(u => u.id === editForm.id ? { ...u, ...editForm } as User : u))
    setEditUser(null)
    setEditForm({})
  }

  const deleteUser = (id: string) => {
    if (window.confirm('Delete this user?')) {
      setUsers(us => us.filter(u => u.id !== id))
      setViewUser(null)
    }
  }

  const inp = {
    width: '100%', height: 44, padding: '0 12px',
    border: '1.5px solid #E4E7EF', borderRadius: 9,
    fontSize: 14, fontFamily: 'inherit', outline: 'none',
    background: '#F8F9FB', color: '#1A1F30',
  }

  return (
    <>
      <AdminLayout title="Users" subtitle={`${users.length} total users`}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 9, padding: '0 12px', height: 42 }}>
            <span>🔍</span>
            <input type="text" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit', background: 'transparent' }} />
          </div>
          <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 9, padding: '0 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', cursor: 'pointer', height: 42, color: '#1A1F30' }}>
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admin</option>
            <option value="MEMBER">Member</option>
            <option value="VENDOR">Vendor</option>
            <option value="USER">User</option>
          </select>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: '1px solid #E4E7EF', borderRadius: 16, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #F1F3F7', background: '#F8F9FB' }}>
                {['User', 'Email', 'Role', 'Membership', 'Joined', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9AA3B8', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <tr key={user.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F3F7' : 'none' }}>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                        {user.name[0].toUpperCase()}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1A1F30' }}>{user.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 13, color: '#6B7590' }}>{user.email}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: ROLE_COLORS[user.role]?.bg, color: ROLE_COLORS[user.role]?.color }}>{user.role}</span>
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 13, color: user.membership ? '#0B7A4B' : '#9AA3B8', fontWeight: user.membership ? 600 : 400 }}>
                    {user.membership ?? 'None'}
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 13, color: '#9AA3B8' }}>{user.createdAt}</td>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => { setViewUser(user); setEditUser(null) }}
                        style={{ background: '#EBF0FF', color: '#0057FF', border: 'none', borderRadius: 7, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >View</button>
                      <button
                        type="button"
                        onClick={() => openEdit(user)}
                        style={{ background: '#F1F3F7', color: '#2E3448', border: 'none', borderRadius: 7, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >Edit</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>

      {/* VIEW MODAL — rendered outside AdminLayout */}
      {viewUser && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(4,9,28,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setViewUser(null) }}
        >
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 460, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
            <div style={{ background: 'linear-gradient(135deg,#0d1835,#0b2d60)', padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700 }}>{viewUser.name[0]}</div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{viewUser.name}</div>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: ROLE_COLORS[viewUser.role]?.bg, color: ROLE_COLORS[viewUser.role]?.color }}>{viewUser.role}</span>
              </div>
              <button type="button" onClick={() => setViewUser(null)} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: 28 }}>
              {[
                { label: 'Email', value: viewUser.email, icon: '✉️' },
                { label: 'Phone', value: viewUser.phone, icon: '📞' },
                { label: 'Instagram', value: viewUser.instagram, icon: '📸' },
                { label: 'Membership', value: viewUser.membership ?? 'No membership', icon: '💳' },
                { label: 'Joined', value: viewUser.createdAt, icon: '📅' },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid #F1F3F7' }}>
                  <span style={{ fontSize: 16, flexShrink: 0 }}>{row.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#9AA3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 3 }}>{row.label}</div>
                    <div style={{ fontSize: 14, color: '#1A1F30' }}>{row.value}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button type="button" onClick={() => openEdit(viewUser)} style={{ flex: 1, height: 42, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✏️ Edit User</button>
                <button type="button" onClick={() => deleteUser(viewUser.id)} style={{ height: 42, background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 16px' }}>🗑</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT MODAL — rendered outside AdminLayout */}
      {editUser && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(4,9,28,0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setEditUser(null) }}
        >
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 460, padding: 28, boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800 }}>Edit User</h2>
              <button type="button" onClick={() => setEditUser(null)} style={{ width: 32, height: 32, borderRadius: '50%', background: '#F1F3F7', border: 'none', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', lineHeight: 1 }}>×</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Full Name</label>
                <input type="text" value={editForm.name ?? ''} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Email</label>
                <input type="email" value={editForm.email ?? ''} onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))} style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Phone</label>
                <input type="text" value={editForm.phone ?? ''} onChange={e => setEditForm(f => ({ ...f, phone: e.target.value }))} style={inp} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Role</label>
                <select value={editForm.role ?? 'USER'} onChange={e => setEditForm(f => ({ ...f, role: e.target.value }))} style={{ ...inp, cursor: 'pointer' }}>
                  <option value="USER">USER</option>
                  <option value="MEMBER">MEMBER</option>
                  <option value="VENDOR">VENDOR</option>
                  <option value="ADMIN">ADMIN</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
                <button type="button" onClick={saveEdit} style={{ flex: 1, height: 46, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save Changes</button>
                <button type="button" onClick={() => setEditUser(null)} style={{ height: 46, background: '#F1F3F7', color: '#2E3448', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: '0 20px' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
