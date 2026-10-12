'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin/AdminLayout'
import BusinessForm, { toFormValues, BusinessFormValues } from '@/components/vendor/BusinessForm'
import { BUSINESS_PLAN_LABEL } from '@/lib/plans'

const PLAN_STYLE: Record<string, { bg: string; color: string }> = {
  PREMIUM:   { bg: '#FEF3C7', color: '#92400E' },
  COMMUNITY: { bg: '#FFF1F2', color: '#BE123C' },
  STARTER:   { bg: 'var(--blue-light)', color: 'var(--blue)' },
  FREE:      { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
}
const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  ACTIVE:    { bg: '#E8F5EE', color: '#0B7A4B' },
  PENDING:   { bg: '#FEF3C7', color: '#92400E' },
  SUSPENDED: { bg: '#FEE2E2', color: '#B91C1C' },
  INACTIVE:  { bg: 'var(--gray-100)', color: 'var(--gray-500)' },
}

const pill = (s: { bg: string; color: string }): React.CSSProperties => ({ background: s.bg, color: s.color, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 999, whiteSpace: 'nowrap' })

export default function AdminVendorsPage() {
  const [vendors, setVendors] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<any | null>(null) // {} = new

  const load = async () => {
    setLoading(true)
    const res = await fetch('/api/admin/vendors', { cache: 'no-store' })
    if (res.ok) {
      const data = await res.json()
      setVendors(data.vendors); setCategories(data.categories); setLoadError('')
    } else setLoadError('Could not load businesses. Are you signed in as an admin?')
    setLoading(false)
  }
  useEffect(() => { load() }, [])

  const save = async (values: BusinessFormValues) => {
    const isNew = !editing?.id
    const res = await fetch(isNew ? '/api/admin/vendors' : `/api/admin/vendors/${editing.id}`, {
      method: isNew ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) return data.error ?? 'Save failed.'
    await load()
    if (isNew) setEditing(null)
    return null
  }

  const remove = async (v: any) => {
    if (!confirm(`Delete ${v.name}? This removes their page and special. This can't be undone.`)) return
    const res = await fetch(`/api/admin/vendors/${v.id}`, { method: 'DELETE' })
    if (res.ok) load(); else alert('Delete failed.')
  }

  const q = search.toLowerCase()
  const shown = vendors.filter(v =>
    (filter === 'ALL' || v.plan === filter || v.status === filter) &&
    (!q || v.name.toLowerCase().includes(q) || v.user?.email?.toLowerCase().includes(q))
  )
  const count = (k: string) => vendors.filter(v => v.plan === k || v.status === k).length

  return (
    <AdminLayout title="Businesses" subtitle="Business pages, plans, specials and Instagram posts">
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginBottom: 18 }}>
        {['ALL', 'PREMIUM', 'COMMUNITY', 'STARTER', 'FREE', 'PENDING'].map(k => (
          <button key={k} onClick={() => setFilter(k)} style={{ fontSize: 12, fontWeight: 700, padding: '7px 13px', borderRadius: 999, border: '1px solid var(--gray-200)', background: filter === k ? 'var(--navy)' : '#fff', color: filter === k ? '#fff' : 'var(--gray-600)', cursor: 'pointer', fontFamily: 'inherit' }}>
            {k === 'ALL' ? `All (${vendors.length})` : `${k === 'PENDING' ? 'Pending' : BUSINESS_PLAN_LABEL[k].replace(' (not listed)', '')} (${count(k)})`}
          </button>
        ))}
        <input placeholder="Search name or email…" value={search} onChange={e => setSearch(e.target.value)} style={{ marginLeft: 'auto', padding: '8px 12px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 13, fontFamily: 'inherit', minWidth: 200 }} />
        <button onClick={() => setEditing({})} className="btn btn-primary btn-md">+ Add business</button>
      </div>

      {loadError && <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: 14, borderRadius: 12, fontSize: 14, marginBottom: 14 }}>{loadError}</div>}

      <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 16, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
          <thead>
            <tr style={{ background: 'var(--gray-50)', textAlign: 'left' }}>
              {['Business', 'Plan', 'Status', 'Special', 'IG posts', 'Owner', ''].map(h => (
                <th key={h} style={{ padding: '11px 14px', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ padding: 30, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>Loading…</td></tr>
            ) : shown.length === 0 ? (
              <tr><td colSpan={7} style={{ padding: 30, textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>No businesses yet.</td></tr>
            ) : shown.map(v => (
              <tr key={v.id} style={{ borderTop: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '12px 14px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--gray-900)' }}>{v.name}{v.foundingMember && <span title="Founding partner"> ⭐</span>}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{v.category?.icon} {v.category?.name}</div>
                </td>
                <td style={{ padding: '12px 14px' }}><span style={pill(PLAN_STYLE[v.plan])}>{BUSINESS_PLAN_LABEL[v.plan]}</span></td>
                <td style={{ padding: '12px 14px' }}><span style={pill(STATUS_STYLE[v.status])}>{v.status.toLowerCase()}</span></td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--gray-600)', maxWidth: 180 }}>{v.deal?.isActive ? v.deal.title : <span style={{ color: 'var(--gray-300)' }}>—</span>}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: 'var(--gray-600)' }}>{v.instagramPosts?.length ?? 0}</td>
                <td style={{ padding: '12px 14px', fontSize: 12, color: 'var(--gray-500)' }}>{v.user?.email ?? 'Added by admin'}</td>
                <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                  <button onClick={() => setEditing(v)} style={btn}>Edit</button>
                  <Link href={`/shop-local/${v.slug}`} target="_blank" style={{ ...btn, textDecoration: 'none', display: 'inline-block' }}>View</Link>
                  <button onClick={() => remove(v)} style={{ ...btn, color: '#B91C1C' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div onClick={() => setEditing(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.55)', zIndex: 2000, display: 'flex', justifyContent: 'flex-end' }}>
          <div onClick={e => e.stopPropagation()} style={{ width: 'min(720px, 100%)', height: '100%', background: '#fff', overflowY: 'auto', padding: '24px 28px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800 }}>{editing.id ? `Edit ${editing.name}` : 'Add a business'}</h2>
              <button onClick={() => setEditing(null)} style={{ ...btn, fontSize: 18 }} aria-label="Close">✕</button>
            </div>
            {categories.length === 0 ? (
              <p style={{ fontSize: 14, color: '#B91C1C' }}>No categories in the database yet. Run the setup SQL first.</p>
            ) : (
              <BusinessForm key={editing.id ?? 'new'} mode="admin" categories={categories} initial={toFormValues(editing.id ? editing : null)} onSubmit={save} submitLabel={editing.id ? 'Save changes' : 'Create business'} />
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

const btn: React.CSSProperties = { background: 'none', border: 'none', color: 'var(--blue)', fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: '4px 8px', fontFamily: 'inherit' }
