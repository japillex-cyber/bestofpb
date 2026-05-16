'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const VENDORS = [
  { id:'1', name:'Shore House Kitchen', category:'Hungry', email:'shore@example.com', status:'ACTIVE', plan:'Gold', createdAt:'2025-03-10' },
  { id:'2', name:'Wave Lounge', category:'PB Nights', email:'wave@example.com', status:'ACTIVE', plan:'Silver', createdAt:'2025-03-15' },
  { id:'3', name:'Pacific Fit Studio', category:'Fitness', email:'fit@example.com', status:'ACTIVE', plan:'Bronze', createdAt:'2025-04-01' },
  { id:'4', name:'Sunset Tacos', category:'Hungry', email:'tacos@example.com', status:'PENDING', plan:'None', createdAt:'2025-06-10' },
  { id:'5', name:'PB Yoga Studio', category:'Fitness', email:'yoga@example.com', status:'PENDING', plan:'None', createdAt:'2025-06-12' },
  { id:'6', name:'Glow Beauty Bar', category:'Self Care', email:'glow@example.com', status:'ACTIVE', plan:'Gold', createdAt:'2025-04-20' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ACTIVE:    { bg: '#E8F5EE', color: '#0B7A4B' },
  PENDING:   { bg: '#FEF3C7', color: '#92400E' },
  SUSPENDED: { bg: '#FEE2E2', color: '#B91C1C' },
  INACTIVE:  { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
}

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState(VENDORS)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = vendors.filter(v => {
    const matchFilter = filter === 'ALL' || v.status === filter
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const updateStatus = (id: string, status: string) => {
    setVendors(vs => vs.map(v => v.id === id ? { ...v, status } : v))
  }

  return (
    <AdminLayout title="Vendors" subtitle={`${vendors.length} total vendors · ${vendors.filter(v => v.status === 'PENDING').length} pending approval`}>
      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 12px', height: 42 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit' }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', height: 42, cursor: 'pointer' }}>
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="PENDING">Pending</option>
          <option value="SUSPENDED">Suspended</option>
        </select>
        <button style={{ background: '#fff', border: '1.5px solid var(--gray-200)', color: 'var(--gray-700)', fontSize: 13, fontWeight: 600, padding: '0 16px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit', height: 42 }}>📥 Export CSV</button>
      </div>

      {/* Pending banner */}
      {vendors.filter(v => v.status === 'PENDING').length > 0 && (
        <div style={{ background: '#FEF3C7', border: '1px solid rgba(146,64,14,0.2)', borderRadius: 12, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: '#92400E' }}>{vendors.filter(v => v.status === 'PENDING').length} vendor{vendors.filter(v => v.status === 'PENDING').length > 1 ? 's' : ''} waiting for approval</span>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
              {['Business', 'Category', 'Email', 'Plan', 'Status', 'Joined', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((vendor, i) => (
              <tr key={vendor.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🏪</div>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--gray-900)' }}>{vendor.name}</span>
                  </div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--gray-500)' }}>{vendor.category}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--gray-500)' }}>{vendor.email}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--gray-600)', fontWeight: 500 }}>{vendor.plan}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[vendor.status]?.bg, color: STATUS_STYLE[vendor.status]?.color }}>
                    {vendor.status}
                  </span>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 12, color: 'var(--gray-400)' }}>{vendor.createdAt}</td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {vendor.status === 'PENDING' && (
                      <>
                        <button onClick={() => updateStatus(vendor.id, 'ACTIVE')} style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Approve</button>
                        <button onClick={() => updateStatus(vendor.id, 'SUSPENDED')} style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✕ Reject</button>
                      </>
                    )}
                    {vendor.status === 'ACTIVE' && (
                      <button onClick={() => updateStatus(vendor.id, 'SUSPENDED')} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Suspend</button>
                    )}
                    {vendor.status === 'SUSPENDED' && (
                      <button onClick={() => updateStatus(vendor.id, 'ACTIVE')} style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Reactivate</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
