'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const PACKAGES = [
  { id:'1', title:'Ultimate Bachelorette Package', category:'bachelorette', price:149, status:'ACTIVE', bookings:12, spots:8, slug:'pb-bachelorette-ultimate' },
  { id:'2', title:'VIP Birthday Experience', category:'birthday', price:89, status:'ACTIVE', bookings:8, spots:12, slug:'pb-birthday-vip' },
  { id:'3', title:'PB Bar Crawl Night', category:'barcrawl', price:45, status:'ACTIVE', bookings:34, spots:30, slug:'pb-bar-crawl' },
  { id:'4', title:'Weekend Surf Getaway', category:'weekend', price:299, status:'ACTIVE', bookings:3, spots:4, slug:'pb-weekend-surf-getaway' },
  { id:'5', title:'Epic Bachelor Package', category:'bachelor', price:199, status:'DRAFT', bookings:0, spots:6, slug:'pb-bachelor-party' },
  { id:'6', title:'PB Staycation Package', category:'staycation', price:179, status:'ACTIVE', bookings:5, spots:10, slug:'pb-staycation' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ACTIVE:   { bg: '#E8F5EE', color: '#0B7A4B' },
  DRAFT:    { bg: '#FEF3C7', color: '#92400E' },
  ARCHIVED: { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
}

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState(PACKAGES)

  const updateStatus = (id: string, status: string) => {
    setPackages(ps => ps.map(p => p.id === id ? { ...p, status } : p))
  }

  const totalRevenue = packages.reduce((sum, p) => sum + (p.price * p.bookings), 0)

  return (
    <AdminLayout title="Packages" subtitle={`${packages.length} packages · ${packages.reduce((s,p) => s + p.bookings, 0)} total bookings`}>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label:'Total Packages', value: packages.length, icon:'📦' },
          { label:'Active', value: packages.filter(p => p.status === 'ACTIVE').length, icon:'✅' },
          { label:'Total Bookings', value: packages.reduce((s,p) => s + p.bookings, 0), icon:'📅' },
          { label:'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon:'💰' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, color: 'var(--gray-900)', letterSpacing: '-0.5px' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--gray-500)', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700 }}>All Packages</h3>
          <button style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ New Package</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
              {['Package', 'Category', 'Price/Person', 'Bookings', 'Spots Left', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, i) => (
              <tr key={pkg.id} style={{ borderBottom: i < packages.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                <td style={{ padding: '13px 16px', fontSize: 13.5, fontWeight: 600, color: 'var(--gray-900)' }}>{pkg.title}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--gray-500)', textTransform: 'capitalize' }}>{pkg.category}</td>
                <td style={{ padding: '13px 16px', fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>${pkg.price}</td>
                <td style={{ padding: '13px 16px', fontSize: 13, color: 'var(--gray-700)', fontWeight: 600 }}>{pkg.bookings}</td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: pkg.spots <= 3 ? '#B91C1C' : '#0B7A4B' }}>{pkg.spots} left</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: STATUS_STYLE[pkg.status]?.bg, color: STATUS_STYLE[pkg.status]?.color }}>{pkg.status}</span>
                </td>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ display: 'flex', gap: 5 }}>
                    <button style={{ background: 'var(--blue-light)', color: 'var(--blue)', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                    {pkg.status === 'DRAFT' && (
                      <button onClick={() => updateStatus(pkg.id, 'ACTIVE')} style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Publish</button>
                    )}
                    {pkg.status === 'ACTIVE' && (
                      <button onClick={() => updateStatus(pkg.id, 'ARCHIVED')} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Archive</button>
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
