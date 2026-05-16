'use client'
import { useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

const INIT_PACKAGES = [
  { id:'1', title:'Ultimate Bachelorette Package', category:'bachelorette', price:149, status:'ACTIVE', bookings:12, spots:8, slug:'pb-bachelorette-ultimate', desc:'The perfect send-off for the bride-to-be. Full day of pampering, drinks, dinner, and dancing.' },
  { id:'2', title:'VIP Birthday Experience', category:'birthday', price:89, status:'ACTIVE', bookings:8, spots:12, slug:'pb-birthday-vip', desc:'Make your birthday unforgettable in Pacific Beach. VIP treatment all day.' },
  { id:'3', title:'PB Bar Crawl Night', category:'barcrawl', price:45, status:'ACTIVE', bookings:34, spots:30, slug:'pb-bar-crawl', desc:'Hit the best bars in Pacific Beach with VIP entry and drink specials.' },
  { id:'4', title:'Weekend Surf Getaway', category:'weekend', price:299, status:'ACTIVE', bookings:3, spots:4, slug:'pb-weekend-surf-getaway', desc:'The ultimate PB weekend — surf lessons, beach bonfires, and boutique hotel stay.' },
  { id:'5', title:'Epic Bachelor Package', category:'bachelor', price:199, status:'DRAFT', bookings:0, spots:6, slug:'pb-bachelor-party', desc:'Deep sea fishing, beach games, steakhouse dinner, and VIP nightlife.' },
  { id:'6', title:'PB Staycation Package', category:'staycation', price:179, status:'ACTIVE', bookings:5, spots:10, slug:'pb-staycation', desc:'Recharge without leaving Pacific Beach. Spa, yoga, amazing food, and total relaxation.' },
]

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ACTIVE:   { bg: '#E8F5EE', color: '#0B7A4B' },
  DRAFT:    { bg: '#FEF3C7', color: '#92400E' },
  ARCHIVED: { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
}

type Package = typeof INIT_PACKAGES[0]

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState(INIT_PACKAGES)
  const [editPkg, setEditPkg] = useState<Package | null>(null)
  const [editForm, setEditForm] = useState<Package | null>(null)
  const [showNew, setShowNew] = useState(false)
  const [newForm, setNewForm] = useState({ title:'', category:'birthday', price:'', spots:'', desc:'' })

  const totalRevenue = packages.reduce((sum, p) => sum + (p.price * p.bookings), 0)

  const openEdit = (pkg: Package) => {
    setEditPkg(pkg)
    setEditForm({ ...pkg })
  }

  const saveEdit = () => {
    if (!editForm) return
    setPackages(ps => ps.map(p => p.id === editForm.id ? editForm : p))
    setEditPkg(null)
    setEditForm(null)
  }

  const updateStatus = (id: string, status: string) => {
    setPackages(ps => ps.map(p => p.id === id ? { ...p, status } : p))
  }

  const createPackage = () => {
    const pkg: Package = {
      id: String(Date.now()),
      title: newForm.title,
      category: newForm.category,
      price: Number(newForm.price),
      status: 'DRAFT',
      bookings: 0,
      spots: Number(newForm.spots),
      slug: newForm.title.toLowerCase().replace(/\s+/g, '-'),
      desc: newForm.desc,
    }
    setPackages(ps => [...ps, pkg])
    setShowNew(false)
    setNewForm({ title:'', category:'birthday', price:'', spots:'', desc:'' })
  }

  const inputStyle = { width: '100%', height: 44, padding: '0 12px', border: '1.5px solid var(--gray-200)', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--gray-50)', color: 'var(--gray-800)' }
  const labelStyle = { display: 'block' as const, fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase' as const, marginBottom: 7 }

  return (
    <AdminLayout title="Packages" subtitle={`${packages.length} packages · ${packages.reduce((s,p) => s + p.bookings, 0)} bookings`}>

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

      {/* Table header */}
      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700 }}>All Packages</h3>
          <button onClick={() => setShowNew(true)} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>+ New Package</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-100)', background: 'var(--gray-50)' }}>
              {['Package', 'Category', 'Price', 'Bookings', 'Spots', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg, i) => (
              <tr key={pkg.id} style={{ borderBottom: i < packages.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                <td style={{ padding: '13px 16px' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--gray-900)', marginBottom: 2 }}>{pkg.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{pkg.desc.slice(0, 50)}...</div>
                </td>
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
                    <button onClick={() => openEdit(pkg)} style={{ background: 'var(--blue-light)', color: 'var(--blue)', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>✏️ Edit</button>
                    {pkg.status === 'DRAFT' && (
                      <button onClick={() => updateStatus(pkg.id, 'ACTIVE')} style={{ background: '#E8F5EE', color: '#0B7A4B', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Publish</button>
                    )}
                    {pkg.status === 'ACTIVE' && (
                      <button onClick={() => updateStatus(pkg.id, 'ARCHIVED')} style={{ background: 'var(--gray-100)', color: 'var(--gray-600)', border: 'none', borderRadius: 6, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Archive</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editPkg && editForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.7)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, padding: 28, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={() => setEditPkg(null)} style={{ position: 'absolute', top: 20, right: 20, width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Edit Package</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label style={labelStyle}>Package Title</label><input type="text" value={editForm.title} onChange={e => setEditForm(f => f ? { ...f, title: e.target.value } : f)} style={inputStyle} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={labelStyle}>Category</label>
                  <select value={editForm.category} onChange={e => setEditForm(f => f ? { ...f, category: e.target.value } : f)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['bachelorette','bachelor','birthday','barcrawl','weekend','staycation','holiday','valentines'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Price / Person ($)</label><input type="number" value={editForm.price} onChange={e => setEditForm(f => f ? { ...f, price: Number(e.target.value) } : f)} style={inputStyle} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={labelStyle}>Spots Available</label><input type="number" value={editForm.spots} onChange={e => setEditForm(f => f ? { ...f, spots: Number(e.target.value) } : f)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Status</label>
                  <select value={editForm.status} onChange={e => setEditForm(f => f ? { ...f, status: e.target.value } : f)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="DRAFT">DRAFT</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="ARCHIVED">ARCHIVED</option>
                  </select>
                </div>
              </div>
              <div><label style={labelStyle}>Description</label>
                <textarea value={editForm.desc} onChange={e => setEditForm(f => f ? { ...f, desc: e.target.value } : f)} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--gray-200)', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--gray-50)', minHeight: 90, resize: 'vertical', color: 'var(--gray-800)' }} />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={saveEdit} style={{ flex: 1, height: 46, background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Save Changes</button>
                <button onClick={() => setEditPkg(null)} style={{ height: 46, background: 'var(--gray-100)', color: 'var(--gray-700)', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: '0 20px' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Package Modal */}
      {showNew && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.7)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, padding: 28, position: 'relative' }}>
            <button onClick={() => setShowNew(false)} style={{ position: 'absolute', top: 20, right: 20, width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>New Package</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div><label style={labelStyle}>Package Title</label><input type="text" placeholder="e.g. VIP Birthday Experience" value={newForm.title} onChange={e => setNewForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><label style={labelStyle}>Category</label>
                  <select value={newForm.category} onChange={e => setNewForm(f => ({ ...f, category: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['bachelorette','bachelor','birthday','barcrawl','weekend','staycation','holiday','valentines'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Price / Person ($)</label><input type="number" placeholder="149" value={newForm.price} onChange={e => setNewForm(f => ({ ...f, price: e.target.value }))} style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Spots Available</label><input type="number" placeholder="10" value={newForm.spots} onChange={e => setNewForm(f => ({ ...f, spots: e.target.value }))} style={inputStyle} /></div>
              <div><label style={labelStyle}>Description</label>
                <textarea placeholder="Describe the package..." value={newForm.desc} onChange={e => setNewForm(f => ({ ...f, desc: e.target.value }))} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid var(--gray-200)', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--gray-50)', minHeight: 90, resize: 'vertical', color: 'var(--gray-800)' }} />
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={createPackage} disabled={!newForm.title || !newForm.price} style={{ flex: 1, height: 46, background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Create Package</button>
                <button onClick={() => setShowNew(false)} style={{ height: 46, background: 'var(--gray-100)', color: 'var(--gray-700)', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', padding: '0 20px' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
