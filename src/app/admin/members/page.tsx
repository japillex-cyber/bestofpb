'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const MEMBERS = [
  { id:'1', name:'Sarah Johnson', email:'sarah@example.com', tier:'VIP', status:'ACTIVE', memberNumber:'BOPB-2025-001', joined:'2025-03-15', expires:'2026-03-15' },
  { id:'2', name:'Mike Chen', email:'mike@example.com', tier:'REGULAR', status:'ACTIVE', memberNumber:'BOPB-2025-002', joined:'2025-04-02', expires:'2026-04-02' },
  { id:'3', name:'Jordan Lee', email:'jordan@example.com', tier:'REGULAR', status:'ACTIVE', memberNumber:'BOPB-2025-003', joined:'2025-04-20', expires:'2026-04-20' },
  { id:'4', name:'Taylor Kim', email:'taylor@example.com', tier:'VIP', status:'CANCELED', memberNumber:'BOPB-2025-004', joined:'2025-02-10', expires:'2026-02-10' },
  { id:'5', name:'Alex Rivera', email:'alex@example.com', tier:'REGULAR', status:'PAST_DUE', memberNumber:'BOPB-2025-005', joined:'2025-05-01', expires:'2026-05-01' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ACTIVE:   { bg: '#E8F5EE', color: '#0B7A4B' },
  CANCELED: { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
  PAST_DUE: { bg: '#FEE2E2', color: '#B91C1C' },
  INACTIVE: { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
}

const TIER_STYLE: Record<string, { bg: string; color: string }> = {
  VIP:     { bg: '#FFF4DC', color: '#C8962A' },
  REGULAR: { bg: 'var(--blue-light)', color: 'var(--blue)' },
}

export default function AdminMembersPage() {
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = MEMBERS.filter(m => {
    const matchFilter = filter === 'ALL' || m.status === filter || m.tier === filter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const active = MEMBERS.filter(m => m.status === 'ACTIVE').length
  const vip = MEMBERS.filter(m => m.tier === 'VIP').length

  return (
    <AdminLayout title="Members" subtitle={`${active} active members · ${vip} VIP · ${MEMBERS.length} total`}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label:'Total Members', value: MEMBERS.length, icon:'💳', color:'#0057FF' },
          { label:'Active', value: active, icon:'✅', color:'#0B7A4B' },
          { label:'VIP Members', value: vip, icon:'⭐', color:'#C8962A' },
          { label:'Past Due', value: MEMBERS.filter(m => m.status === 'PAST_DUE').length, icon:'⚠️', color:'#B91C1C' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 12px', height: 42 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit' }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', height: 42, cursor: 'pointer' }}>
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="VIP">VIP Only</option>
          <option value="REGULAR">Regular Only</option>
          <option value="PAST_DUE">Past Due</option>
          <option value="CANCELED">Canceled</option>
        </select>
        <button style={{ background: '#fff', border: '1.5px solid var(--gray-200)', color: 'var(--gray-700)', fontSize: 13, fontWeight: 600, padding: '0 16px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', height: 42 }}>📥 Export CSV</button>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
              {['Member', 'Tier', 'Member #', 'Status', 'Joined', 'Expires', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--blue)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                      {m.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--gray-900)' }}>{m.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{m.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: TIER_STYLE[m.tier]?.bg, color: TIER_STYLE[m.tier]?.color }}>{m.tier}</span>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, fontFamily: 'monospace', color: 'var(--gray-600)' }}>{m.memberNumber}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[m.status]?.bg, color: STATUS_STYLE[m.status]?.color }}>{m.status}</span>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--gray-400)' }}>{m.joined}</td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--gray-400)' }}>{m.expires}</td>
                <td style={{ padding: '13px 16px' }}>
                  <button style={{ background: 'var(--blue-light)', color: 'var(--blue)', border: 'none', borderRadius: 6, padding: '5px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
