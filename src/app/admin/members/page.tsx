'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const MEMBERS = [
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

type Member = typeof MEMBERS[0]

export default function AdminMembersPage() {
  const [members, setMembers] = useState(MEMBERS)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [viewMember, setViewMember] = useState<Member | null>(null)

  const filtered = members.filter(m => {
    const matchFilter = filter === 'ALL' || m.status === filter || m.tier === filter
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const cancelMembership = (id: string) => {
    setMembers(ms => ms.map(m => m.id === id ? { ...m, status: 'CANCELED' } : m))
    setViewMember(prev => prev?.id === id ? { ...prev, status: 'CANCELED' } : prev)
  }

  const active = members.filter(m => m.status === 'ACTIVE').length
  const vip = members.filter(m => m.tier === 'VIP').length

  return (
    <>
      <AdminLayout title="Members" subtitle={`${active} active · ${vip} VIP · ${members.length} total`}>

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
          <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 9, padding: '0 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', height: 42, cursor: 'pointer', color: '#1A1F30' }}>
            <option value="ALL">All</option>
            <option value="ACTIVE">Active</option>
            <option value="VIP">VIP Only</option>
            <option value="REGULAR">Regular Only</option>
            <option value="PAST_DUE">Past Due</option>
            <option value="CANCELED">Canceled</option>
          </select>
          <button style={{ background: '#fff', border: '1.5px solid #E4E7EF', color: '#2E3448', fontSize: 13, fontWeight: 600, padding: '0 16px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', height: 42 }}>📥 Export CSV</button>
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
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: m.tier === 'VIP' ? 'linear-gradient(135deg,#C8962A,#F0D98A)' : '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                        {m.name[0]}
                      </div>
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
                      type="button"
                      onClick={() => setViewMember(m)}
                      style={{ background: '#EBF0FF', color: '#0057FF', border: 'none', borderRadius: 7, padding: '6px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                    >View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>

      {/* MEMBER DETAIL MODAL — outside AdminLayout so z-index works */}
      {viewMember && (
        <div
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(4,9,28,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
          onClick={(e) => { if (e.target === e.currentTarget) setViewMember(null) }}
        >
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.3)' }}>
            {/* Card header */}
            <div style={{ background: viewMember.tier === 'VIP' ? 'linear-gradient(135deg,#2D1C00,#6b3d00)' : 'linear-gradient(135deg,#0d1835,#0b2d60)', padding: '28px', display: 'flex', alignItems: 'center', gap: 16, position: 'relative' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: viewMember.tier === 'VIP' ? 'linear-gradient(135deg,#C8962A,#F0D98A)' : '#0057FF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700 }}>
                {viewMember.name[0]}
              </div>
              <div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{viewMember.name}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: TIER_STYLE[viewMember.tier]?.bg, color: TIER_STYLE[viewMember.tier]?.color }}>{viewMember.tier}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 10px', borderRadius: 999, background: STATUS_STYLE[viewMember.status]?.bg, color: STATUS_STYLE[viewMember.status]?.color }}>{viewMember.status}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewMember(null)}
                style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit', lineHeight: 1 }}
              >×</button>
            </div>

            {/* Details grid */}
            <div style={{ padding: 28 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
                {[
                  { label: 'Email', value: viewMember.email },
                  { label: 'Phone', value: viewMember.phone },
                  { label: 'Instagram', value: viewMember.instagram },
                  { label: 'Member #', value: viewMember.memberNumber },
                  { label: 'Member Since', value: viewMember.joined },
                  { label: 'Expires', value: viewMember.expires },
                  { label: 'Total Savings', value: viewMember.savings },
                  { label: 'Tier', value: viewMember.tier },
                ].map(row => (
                  <div key={row.label} style={{ padding: '10px 14px', background: '#F8F9FB', borderRadius: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#9AA3B8', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: 4 }}>{row.label}</div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1A1F30' }}>{row.value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  style={{ flex: 1, height: 44, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                >✉️ Email Member</button>
                {viewMember.status === 'ACTIVE' && (
                  <button
                    type="button"
                    onClick={() => cancelMembership(viewMember.id)}
                    style={{ height: 44, background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 16px', whiteSpace: 'nowrap' }}
                  >Cancel Membership</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
