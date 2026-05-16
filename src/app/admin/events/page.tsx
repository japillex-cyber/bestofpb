'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const EVENTS = [
  { id:'1', title:'PB Night Market', date:'2025-06-22', time:'7:00 PM', location:'Garnet Ave', isFree:true, status:'APPROVED', source:'ADMIN', submittedBy:'Admin' },
  { id:'2', title:'Sunrise Surf Competition', date:'2025-06-28', time:'9:00 AM', location:'Crystal Pier', isFree:false, price:25, status:'APPROVED', source:'VENDOR', submittedBy:'Pacific Fit Studio' },
  { id:'3', title:'4th of July Beach Bash', date:'2025-07-04', time:'5:00 PM', location:'Mission Bay', isFree:false, price:45, status:'APPROVED', source:'ADMIN', submittedBy:'Admin' },
  { id:'4', title:'PB Block Party', date:'2025-07-15', time:'3:00 PM', location:'Garnet Ave', isFree:true, status:'PENDING', source:'PUBLIC', submittedBy:'taylor@example.com' },
  { id:'5', title:'Sunset Yoga on the Beach', date:'2025-07-10', time:'6:00 AM', location:'Crystal Pier Beach', isFree:false, price:20, status:'PENDING', source:'PUBLIC', submittedBy:'alex@example.com' },
  { id:'6', title:'Cancelled Event', date:'2025-06-01', time:'8:00 PM', location:'Wave Lounge', isFree:false, price:30, status:'CANCELLED', source:'VENDOR', submittedBy:'Wave Lounge' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  PENDING:   { bg: '#FEF3C7', color: '#92400E' },
  APPROVED:  { bg: '#E8F5EE', color: '#0B7A4B' },
  REJECTED:  { bg: '#FEE2E2', color: '#B91C1C' },
  CANCELLED: { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState(EVENTS)
  const [filter, setFilter] = useState('ALL')

  const filtered = events.filter(e => filter === 'ALL' || e.status === filter)

  const updateStatus = (id: string, status: string) => {
    setEvents(es => es.map(e => e.id === id ? { ...e, status } : e))
  }

  return (
    <AdminLayout title="Events" subtitle={`${events.filter(e => e.status === 'PENDING').length} pending approval`}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['ALL','PENDING','APPROVED','REJECTED','CANCELLED'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '7px 14px', borderRadius: 999, border: '1px solid var(--gray-200)', background: filter === f ? 'var(--blue)' : '#fff', color: filter === f ? '#fff' : 'var(--gray-600)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' } as any}>{f}</button>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
              {['Event', 'Date & Time', 'Location', 'Price', 'Source', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev, i) => (
              <tr key={ev.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 2 }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>by {ev.submittedBy}</div>
                </td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--gray-600)' }}>{ev.date}<br/><span style={{ fontSize: 11, color: 'var(--gray-400)' }}>{ev.time}</span></td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--gray-500)' }}>{ev.location}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, fontWeight: 600, color: ev.isFree ? '#0B7A4B' : 'var(--gray-700)' }}>{ev.isFree ? 'Free' : `$${ev.price}`}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999, background: ev.source === 'PUBLIC' ? '#FEF3C7' : ev.source === 'VENDOR' ? 'var(--blue-light)' : 'var(--gray-100)', color: ev.source === 'PUBLIC' ? '#92400E' : ev.source === 'VENDOR' ? 'var(--blue)' : 'var(--gray-500)' }}>{ev.source}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[ev.status]?.bg, color: STATUS_STYLE[ev.status]?.color }}>{ev.status}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    {ev.status === 'PENDING' && (
                      <>
                        <button onClick={() => updateStatus(ev.id, 'APPROVED')} style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✓</button>
                        <button onClick={() => updateStatus(ev.id, 'REJECTED')} style={{ background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>✕</button>
                      </>
                    )}
                    {ev.status === 'APPROVED' && (
                      <button onClick={() => updateStatus(ev.id, 'CANCELLED')} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
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
