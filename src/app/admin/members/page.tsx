'use client'
import { useEffect, useMemo, useState } from 'react'
import { AdminLayout } from '@/components/admin/AdminLayout'

type Membership = {
  tier: 'REGULAR' | 'VIP'
  status: 'ACTIVE' | 'TRIALING' | 'PAST_DUE' | 'CANCELED' | 'INACTIVE'
  membershipNumber: string
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  cancelAtPeriodEnd: boolean
  stripeSubscriptionId: string | null
  createdAt: string
}
type Row = { id: string; name: string | null; email: string; phone: string | null; role: string; createdAt: string; membership: Membership | null }
type Form = { tier: 'REGULAR' | 'VIP'; status: Membership['status']; currentPeriodEnd: string; cancelAtPeriodEnd: boolean }

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  ACTIVE:   { bg: '#E8F5EE', color: '#0B7A4B', label: 'Active' },
  TRIALING: { bg: '#E0F2FE', color: '#0369A1', label: 'Free trial' },
  PAST_DUE: { bg: '#FEE2E2', color: '#B91C1C', label: 'Past due' },
  CANCELED: { bg: '#F1F3F7', color: '#6B7590', label: 'Canceled' },
  INACTIVE: { bg: '#F1F3F7', color: '#6B7590', label: 'Inactive' },
}
const TIER_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  VIP:     { bg: '#FFF4DC', color: '#C8962A', label: 'VIP Local Pass' },
  REGULAR: { bg: '#EBF0FF', color: '#0057FF', label: 'Local Insider' },
}
const PAID = ['ACTIVE', 'TRIALING']

const fmt = (d: string | null) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'
const toInput = (d: string | null) => d ? new Date(d).toISOString().slice(0, 10) : ''
const plusDays = (n: number) => new Date(Date.now() + n * 86400000).toISOString().slice(0, 10)

function Pill({ s }: { s?: { bg: string; color: string; label: string } }) {
  if (!s) return null
  return <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: s.bg, color: s.color, whiteSpace: 'nowrap' }}>{s.label}</span>
}

export default function AdminMembersPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [filter, setFilter] = useState('MEMBERS')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Row | null>(null)
  const [form, setForm] = useState<Form>({ tier: 'REGULAR', status: 'ACTIVE', currentPeriodEnd: '', cancelAtPeriodEnd: false })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  const load = async () => {
    setLoadError('')
    try {
      const res = await fetch('/api/admin/members', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not load members.')
      setRows(data.users)
    } catch (e: any) {
      setLoadError(e.message || 'Could not load members.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => { load() }, [])

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const filtered = useMemo(() => rows.filter(r => {
    const m = r.membership
    const q = search.trim().toLowerCase()
    const matchSearch = !q || (r.name ?? '').toLowerCase().includes(q) || r.email.toLowerCase().includes(q) || (m?.membershipNumber ?? '').toLowerCase().includes(q)
    const matchFilter =
      filter === 'ALL' ? true :
      filter === 'MEMBERS' ? !!m :
      filter === 'NONE' ? !m :
      filter === 'VIP' || filter === 'REGULAR' ? m?.tier === filter :
      m?.status === filter
    return matchSearch && matchFilter
  }), [rows, filter, search])

  const members = rows.filter(r => r.membership)
  const stats = [
    { label: 'Total Members', value: members.length, icon: '💳' },
    { label: 'Active (incl. trial)', value: members.filter(r => PAID.includes(r.membership!.status)).length, icon: '✅' },
    { label: 'VIP Local Pass', value: members.filter(r => r.membership!.tier === 'VIP').length, icon: '⭐' },
    { label: 'Past Due', value: members.filter(r => r.membership!.status === 'PAST_DUE').length, icon: '⚠️' },
  ]

  const openEdit = (r: Row) => {
    const m = r.membership
    setForm(m
      ? { tier: m.tier, status: m.status, currentPeriodEnd: toInput(m.currentPeriodEnd), cancelAtPeriodEnd: m.cancelAtPeriodEnd }
      : { tier: 'REGULAR', status: 'ACTIVE', currentPeriodEnd: plusDays(30), cancelAtPeriodEnd: false })
    setError('')
    setEditing(r)
  }

  const save = async () => {
    if (!editing) return
    setSaving(true); setError('')
    try {
      const res = await fetch(`/api/admin/members/${editing.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, currentPeriodEnd: form.currentPeriodEnd || null }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not save.')
      const hadOne = !!editing.membership
      setEditing(null)
      await load()
      flash(hadOne ? 'Membership updated.' : 'Membership added.')
    } catch (e: any) {
      setError(e.message || 'Could not save.')
    } finally {
      setSaving(false)
    }
  }

  const remove = async () => {
    if (!editing) return
    if (!window.confirm(`Remove ${editing.name || editing.email}'s membership completely? Their card and member number will be deleted.`)) return
    setSaving(true); setError('')
    try {
      const res = await fetch(`/api/admin/members/${editing.id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Could not remove.')
      setEditing(null)
      await load()
      flash('Membership removed.')
    } catch (e: any) {
      setError(e.message || 'Could not remove.')
    } finally {
      setSaving(false)
    }
  }

  const inp: React.CSSProperties = { width: '100%', height: 44, padding: '0 12px', border: '1.5px solid #E4E7EF', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: '#F8F9FB', color: '#1A1F30' }
  const lbl: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#6B7590', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }
  const choice = (on: boolean, color: string, bg: string): React.CSSProperties => ({
    flex: 1, minWidth: 0, height: 40, background: on ? bg : '#fff', color: on ? color : '#6B7590',
    border: `1.5px solid ${on ? color : '#E4E7EF'}`, borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
  })

  return (
    <AdminLayout title="Members" subtitle="Edit anyone's membership, or give one to an account that doesn't have it.">
      {toast && (
        <div style={{ background: '#E8F5EE', border: '1px solid rgba(11,122,75,0.2)', color: '#0B7A4B', padding: '12px 16px', borderRadius: 10, marginBottom: 16, fontSize: 14, fontWeight: 600 }}>✅ {toast}</div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E4E7EF', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, color: '#1A1F30' }}>{loading ? '…' : s.value}</div>
            <div style={{ fontSize: 12, color: '#6B7590', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200, display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 9, padding: '0 12px', height: 42 }}>
          <span>🔍</span>
          <input type="text" placeholder="Search name, email or member #" value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit', background: 'transparent' }} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background: '#fff', border: '1.5px solid #E4E7EF', borderRadius: 9, padding: '0 14px', fontSize: 13, fontFamily: 'inherit', outline: 'none', height: 42, cursor: 'pointer', color: '#1A1F30' }}>
          <option value="MEMBERS">Members</option>
          <option value="ALL">All accounts</option>
          <option value="NONE">No membership</option>
          <option value="VIP">VIP Local Pass</option>
          <option value="REGULAR">Local Insider</option>
          <option value="ACTIVE">Active</option>
          <option value="TRIALING">Free trial</option>
          <option value="PAST_DUE">Past due</option>
          <option value="CANCELED">Canceled</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E4E7EF', borderRadius: 16, overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F1F3F7', background: '#F8F9FB' }}>
              {['Account', 'Membership', 'Member #', 'Status', 'Renews / Expires', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#9AA3B8', letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: '#9AA3B8', fontSize: 14 }}>Loading…</td></tr>}
            {!loading && loadError && <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: '#B91C1C', fontSize: 14 }}>{loadError} <button onClick={load} style={{ marginLeft: 8, border: 'none', background: 'none', color: '#0057FF', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Retry</button></td></tr>}
            {!loading && !loadError && filtered.length === 0 && (
              <tr><td colSpan={6} style={{ padding: 32, textAlign: 'center', color: '#9AA3B8', fontSize: 14 }}>
                {filter === 'MEMBERS' && !search ? <>No members yet. Switch the filter to <b>All accounts</b> to give someone a membership.</> : 'No one matches.'}
              </td></tr>
            )}
            {!loading && filtered.map((r, i) => {
              const m = r.membership
              return (
                <tr key={r.id} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F3F7' : 'none' }}>
                  <td style={{ padding: '13px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 34, height: 34, borderRadius: '50%', background: m?.tier === 'VIP' ? 'linear-gradient(135deg,#C8962A,#F0D98A)' : m ? '#0057FF' : '#CBD2E0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{(r.name || r.email)[0].toUpperCase()}</div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: '#1A1F30' }}>{r.name || '—'}{r.role === 'ADMIN' && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: '#B91C1C' }}>ADMIN</span>}{r.role === 'VENDOR' && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: '#92400E' }}>BUSINESS</span>}</div>
                        <div style={{ fontSize: 11, color: '#9AA3B8' }}>{r.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '13px 16px' }}>{m ? <Pill s={TIER_STYLE[m.tier]} /> : <span style={{ fontSize: 12, color: '#9AA3B8' }}>None</span>}</td>
                  <td style={{ padding: '13px 16px', fontSize: 12, fontFamily: 'monospace', color: '#6B7590' }}>{m?.membershipNumber ?? '—'}</td>
                  <td style={{ padding: '13px 16px' }}>
                    {m ? <><Pill s={STATUS_STYLE[m.status]} />{m.cancelAtPeriodEnd && <div style={{ fontSize: 10, color: '#B91C1C', marginTop: 4 }}>Cancels at period end</div>}</> : null}
                  </td>
                  <td style={{ padding: '13px 16px', fontSize: 12, color: '#6B7590' }}>{m ? fmt(m.currentPeriodEnd) : '—'}</td>
                  <td style={{ padding: '13px 16px', textAlign: 'right' }}>
                    <button onClick={() => openEdit(r)} style={{ background: m ? '#EBF0FF' : '#0057FF', color: m ? '#0057FF' : '#fff', border: 'none', borderRadius: 7, padding: '7px 14px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                      {m ? 'Edit' : '+ Give membership'}
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {editing && (
        <div onClick={e => { if (e.target === e.currentTarget && !saving) setEditing(null) }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 20, width: '100%', maxWidth: 500, maxHeight: '92vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}>
            <div style={{ background: form.tier === 'VIP' ? 'linear-gradient(135deg,#2D1C00,#6b3d00)' : 'linear-gradient(135deg,#0d1835,#0b2d60)', padding: '22px 24px', position: 'relative' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 6 }}>{editing.membership ? 'Edit membership' : 'Give membership'}</div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 19, fontWeight: 700, color: '#fff' }}>{editing.name || editing.email}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{editing.email}{editing.membership && <> · {editing.membership.membershipNumber}</>}</div>
              <button onClick={() => !saving && setEditing(null)} aria-label="Close" style={{ position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', fontFamily: 'inherit', lineHeight: 1 }}>×</button>
            </div>

            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {editing.membership?.stripeSubscriptionId && (
                <div style={{ background: '#FFF7E6', border: '1px solid #F5D9A8', borderRadius: 10, padding: '10px 12px', fontSize: 12.5, color: '#8A5A00', lineHeight: 1.55 }}>
                  This person pays through Stripe. Changes here update the site right away, but their Stripe billing isn&apos;t changed, and the next Stripe renewal or payment can overwrite the tier, status and dates. To change what they&apos;re charged, change it in Stripe too.
                </div>
              )}

              <div>
                <label style={lbl}>Plan</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => setForm(f => ({ ...f, tier: 'REGULAR' }))} style={choice(form.tier === 'REGULAR', '#0057FF', '#EBF0FF')}>Local Insider</button>
                  <button onClick={() => setForm(f => ({ ...f, tier: 'VIP' }))} style={choice(form.tier === 'VIP', '#C8962A', '#FFF4DC')}>⭐ VIP Local Pass</button>
                </div>
              </div>

              <div>
                <label style={lbl}>Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Form['status'] }))} style={{ ...inp, cursor: 'pointer' }}>
                  <option value="ACTIVE">Active: has full member access</option>
                  <option value="TRIALING">Free trial: has full member access</option>
                  <option value="PAST_DUE">Past due: no access until paid</option>
                  <option value="CANCELED">Canceled: no access</option>
                  <option value="INACTIVE">Inactive: no access</option>
                </select>
              </div>

              <div>
                <label style={lbl}>Renews / expires on</label>
                <input type="date" value={form.currentPeriodEnd} onChange={e => setForm(f => ({ ...f, currentPeriodEnd: e.target.value }))} style={inp} />
                <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                  {[['+1 month', 30], ['+3 months', 90], ['+1 year', 365]].map(([l, n]) => (
                    <button key={l} onClick={() => setForm(f => ({ ...f, currentPeriodEnd: plusDays(n as number) }))} style={{ background: '#F1F3F7', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, fontWeight: 600, color: '#4A5268', cursor: 'pointer', fontFamily: 'inherit' }}>{l} from today</button>
                  ))}
                  <button onClick={() => setForm(f => ({ ...f, currentPeriodEnd: '' }))} style={{ background: '#F1F3F7', border: 'none', borderRadius: 6, padding: '5px 10px', fontSize: 12, fontWeight: 600, color: '#4A5268', cursor: 'pointer', fontFamily: 'inherit' }}>No end date</button>
                </div>
                <div style={{ fontSize: 11.5, color: '#9AA3B8', marginTop: 6 }}>Shown to the member. Access is controlled by the status above.</div>
              </div>

              {editing.membership && (
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#2E3448', cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.cancelAtPeriodEnd} onChange={e => setForm(f => ({ ...f, cancelAtPeriodEnd: e.target.checked }))} />
                  Marked to cancel at the end of the period
                </label>
              )}

              {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', borderRadius: 10, padding: '10px 12px', fontSize: 13, fontWeight: 600 }}>{error}</div>}

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={save} disabled={saving} style={{ flex: 1, minWidth: 140, height: 46, background: saving ? '#9AA3B8' : '#0057FF', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: saving ? 'wait' : 'pointer', fontFamily: 'inherit' }}>
                  {saving ? 'Saving…' : editing.membership ? 'Save changes' : 'Give membership'}
                </button>
                {editing.membership && (
                  <button onClick={remove} disabled={saving} style={{ height: 46, background: '#FEE2E2', color: '#B91C1C', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', padding: '0 16px' }}>Remove</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
