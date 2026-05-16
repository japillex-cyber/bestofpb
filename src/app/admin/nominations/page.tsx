'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const NOMINATIONS = [
  { id:'1', businessName:'Kono Pizza', category:'Food', instagramHandle:'@konopizzapb', reason:'Best late night pizza in all of Pacific Beach. Cone-shaped pizza that is absolutely genius.', submittedBy:'Alex Rivera', email:'alex@example.com', status:'PENDING', date:'2025-06-10', upvotes:142 },
  { id:'2', businessName:'Waverly Art Studio', category:'Arts', instagramHandle:'@wavelyartstudio', reason:'Local artist creating stunning ocean-inspired murals all across PB.', submittedBy:'Sarah K', email:'sarah@example.com', status:'PENDING', date:'2025-06-12', upvotes:98 },
  { id:'3', businessName:'PB Surf School', category:'Fitness', instagramHandle:'@pbsurfschool', reason:'Best surf instructors in San Diego. Got my whole family up on boards in one session!', submittedBy:'Mike Chen', email:'mike@example.com', status:'APPROVED', date:'2025-06-08', upvotes:87 },
  { id:'4', businessName:'The Taco Stand', category:'Food', instagramHandle:'@thetacostandpb', reason:'Authentic street tacos right on Mission Blvd. The al pastor is life-changing.', submittedBy:'Jordan Lee', email:'jordan@example.com', status:'FEATURED', date:'2025-06-05', upvotes:203 },
  { id:'5', businessName:'Sandy Paws Rescue', category:'Pets', instagramHandle:'@sandypawsrescue', reason:'Local dog rescue doing incredible work in PB.', submittedBy:'Taylor Kim', email:'taylor@example.com', status:'REJECTED', date:'2025-06-14', upvotes:45 },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  PENDING:  { bg: '#FEF3C7', color: '#92400E' },
  APPROVED: { bg: '#E8F5EE', color: '#0B7A4B' },
  FEATURED: { bg: '#EBF0FF', color: '#0057FF' },
  REJECTED: { bg: '#FEE2E2', color: '#B91C1C' },
}

export default function AdminNominationsPage() {
  const [noms, setNoms] = useState(NOMINATIONS)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')

  const filtered = noms.filter(n => {
    const matchFilter = filter === 'ALL' || n.status === filter
    const matchSearch = n.businessName.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const updateStatus = (id: string, status: string) => {
    setNoms(ns => ns.map(n => n.id === id ? { ...n, status } : n))
  }

  return (
    <AdminLayout title="Nominations" subtitle={`${noms.filter(n => n.status === 'PENDING').length} pending review · ${noms.filter(n => n.status === 'FEATURED').length} featured`}>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 12px', height: 42 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search nominations..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit' }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 12px', fontSize: 13, fontFamily: 'inherit', outline: 'none', height: 42, cursor: 'pointer' }}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="FEATURED">Featured</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(nom => (
          <div key={nom.id} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--gray-900)' }}>{nom.businessName}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: 'var(--blue-light)', color: 'var(--blue)' }}>{nom.category}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: STATUS_STYLE[nom.status]?.bg, color: STATUS_STYLE[nom.status]?.color }}>{nom.status}</span>
                  <span style={{ fontSize: 12, color: 'var(--gray-400)' }}>▲ {nom.upvotes} votes</span>
                </div>
                {nom.instagramHandle && <p style={{ fontSize: 12, color: 'var(--blue)', marginBottom: 6 }}>{nom.instagramHandle}</p>}
                <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 8 }}>{nom.reason}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Submitted by {nom.submittedBy} · {nom.email} · {nom.date}</p>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {nom.status === 'PENDING' && (
                  <>
                    <button onClick={() => updateStatus(nom.id, 'APPROVED')} style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Approve</button>
                    <button onClick={() => updateStatus(nom.id, 'REJECTED')} style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✕ Reject</button>
                  </>
                )}
                {nom.status === 'APPROVED' && (
                  <button onClick={() => updateStatus(nom.id, 'FEATURED')} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>⭐ Feature</button>
                )}
                {(nom.status === 'APPROVED' || nom.status === 'FEATURED') && (
                  <button onClick={() => updateStatus(nom.id, 'REJECTED')} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Remove</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
