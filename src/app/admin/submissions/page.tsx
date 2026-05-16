'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const SUBMISSIONS = [
  { id:'1', name:'Alex Rivera', contentName:'Shore House Kitchen', instagramHandle:'@shorehousepb', description:'Amazing breakfast spot right on the beach. Fresh local ingredients, incredible views. A must-visit for any PB local.', status:'PENDING', date:'2025-06-15' },
  { id:'2', name:'Sarah Johnson', contentName:'PB Mural Project', instagramHandle:'@pbmuralproject', description:'Local artists are transforming the walls of Pacific Beach into stunning murals. Check out the one on Garnet Ave!', status:'PENDING', date:'2025-06-14' },
  { id:'3', name:'Mike Chen', contentName:'Sunday Farmers Market', instagramHandle:'@pbfarmersmarket', description:'Every Sunday morning on Bayard St. Best farmers market in San Diego. Fresh produce, amazing vendors.', status:'APPROVED', date:'2025-06-10' },
  { id:'4', name:'Jordan Lee', contentName:'Crystal Pier Hotel', instagramHandle:'@crystalpierhotel', description:'The most iconic place to stay in Pacific Beach. Rooms literally on the pier over the ocean.', status:'FEATURED', date:'2025-06-08' },
  { id:'5', name:'Taylor Kim', contentName:'Random Business', instagramHandle:'', description:'Just some random submission that is not relevant to PB at all.', status:'REJECTED', date:'2025-06-12' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  PENDING:  { bg: '#FEF3C7', color: '#92400E' },
  APPROVED: { bg: '#E8F5EE', color: '#0B7A4B' },
  FEATURED: { bg: '#EBF0FF', color: '#0057FF' },
  REJECTED: { bg: '#FEE2E2', color: '#B91C1C' },
}

export default function AdminSubmissionsPage() {
  const [subs, setSubs] = useState(SUBMISSIONS)
  const [filter, setFilter] = useState('ALL')

  const filtered = subs.filter(s => filter === 'ALL' || s.status === filter)

  const updateStatus = (id: string, status: string) => {
    setSubs(ss => ss.map(s => s.id === id ? { ...s, status } : s))
  }

  return (
    <AdminLayout title="Submissions" subtitle={`${subs.filter(s => s.status === 'PENDING').length} pending review`}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['ALL','PENDING','APPROVED','FEATURED','REJECTED'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 14px', borderRadius: 999, border: 'none', background: filter === f ? 'var(--blue)' : '#fff', color: filter === f ? '#fff' : 'var(--gray-600)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', border: '1px solid var(--gray-200)' } as any}>{f}</button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filtered.map(sub => (
          <div key={sub.id} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 14, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: 'var(--gray-900)' }}>{sub.contentName}</h3>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 9px', borderRadius: 999, background: STATUS_STYLE[sub.status]?.bg, color: STATUS_STYLE[sub.status]?.color }}>{sub.status}</span>
                </div>
                {sub.instagramHandle && <p style={{ fontSize: 12, color: 'var(--blue)', marginBottom: 6 }}>{sub.instagramHandle}</p>}
                <p style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: 8 }}>{sub.description}</p>
                <p style={{ fontSize: 12, color: 'var(--gray-400)' }}>Submitted by {sub.name} · {sub.date}</p>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {sub.status === 'PENDING' && (
                  <>
                    <button onClick={() => updateStatus(sub.id, 'APPROVED')} style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✓ Approve</button>
                    <button onClick={() => updateStatus(sub.id, 'REJECTED')} style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✕ Reject</button>
                  </>
                )}
                {sub.status === 'APPROVED' && (
                  <button onClick={() => updateStatus(sub.id, 'FEATURED')} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>⭐ Feature</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
