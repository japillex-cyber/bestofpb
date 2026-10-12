'use client'
import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BusinessForm, { toFormValues, BusinessFormValues } from '@/components/vendor/BusinessForm'
import { BUSINESS_PLANS, BUSINESS_PLAN_LABEL, PLAN_RANK } from '@/lib/plans'

const card: React.CSSProperties = { background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: 26 }
const input: React.CSSProperties = { width: '100%', padding: '11px 12px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit' }

export default function BusinessDashboard() {
  const { status } = useSession()
  const [data, setData] = useState<{ vendor: any; hasBilling: boolean } | null>(null)
  const [params, setParams] = useState<{ plan?: string; welcome?: boolean; changed?: boolean }>({})
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    const res = await fetch('/api/business', { cache: 'no-store' })
    if (res.ok) setData(await res.json())
  }, [])

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search)
    setParams({ plan: sp.get('plan') ?? undefined, welcome: sp.has('welcome'), changed: sp.has('changed') })
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated') window.location.href = '/login?callbackUrl=/business'
    if (status === 'authenticated') load()
  }, [status, load])

  // After paying, Stripe tells us in the background; check again for a few seconds.
  useEffect(() => {
    if (!params.welcome || !data?.vendor || data.vendor.plan !== 'FREE') return
    const t = setTimeout(load, 3000)
    return () => clearTimeout(t)
  }, [params.welcome, data, load])

  const choosePlan = async (plan: string) => {
    setBusy(plan); setError('')
    const res = await fetch('/api/business/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan }) })
    const d = await res.json().catch(() => ({}))
    if (d.url) { window.location.href = d.url; return }
    setBusy(''); setError(d.error ?? 'Something went wrong.')
  }

  const openBilling = async () => {
    setBusy('billing'); setError('')
    const res = await fetch('/api/billing/portal', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ returnTo: '/business' }) })
    const d = await res.json().catch(() => ({}))
    if (d.url) { window.location.href = d.url; return }
    setBusy(''); setError(d.error ?? 'Could not open billing.')
  }

  const saveProfile = async (values: BusinessFormValues) => {
    const res = await fetch('/api/business', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) })
    const d = await res.json().catch(() => ({}))
    if (!res.ok) return d.error ?? 'Save failed.'
    load()
    return null
  }

  if (status !== 'authenticated' || !data) {
    return (<><Navbar /><div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>Loading…</div></>)
  }

  const v = data.vendor
  const live = v && v.status === 'ACTIVE' && v.plan !== 'FREE'

  return (
    <>
      <Navbar />
      <div style={{ background: 'var(--gray-50)', minHeight: '100vh', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ padding: '32px 16px 80px', maxWidth: 980 }}>
          {!v ? (
            <SetupBusiness onDone={load} />
          ) : (
            <>
              {params.welcome && (
                <div style={{ background: '#E8F5EE', color: '#0B7A4B', borderRadius: 14, padding: '14px 18px', fontSize: 14, fontWeight: 600, marginBottom: 18 }}>
                  🎉 Thanks for joining! {v.plan === 'FREE' ? 'We’re confirming your payment — this page will update in a moment.' : `You’re on ${BUSINESS_PLAN_LABEL[v.plan]}.`}
                </div>
              )}
              {params.changed && <div style={{ background: 'var(--blue-light)', color: 'var(--blue)', borderRadius: 14, padding: '14px 18px', fontSize: 14, fontWeight: 600, marginBottom: 18 }}>Your plan has been changed.</div>}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap', marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--gray-400)' }}>My business</div>
                  <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 30, fontWeight: 800, color: 'var(--gray-900)' }}>{v.name}</h1>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 6, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: live ? '#E8F5EE' : '#FEF3C7', color: live ? '#0B7A4B' : '#92400E' }}>{live ? '● Live on Best of PB' : v.status === 'SUSPENDED' ? 'Suspended' : 'Not public yet'}</span>
                    <span style={{ fontSize: 13, color: 'var(--gray-500)' }}>{BUSINESS_PLAN_LABEL[v.plan]}</span>
                    {v.foundingMember && <span style={{ fontSize: 12, fontWeight: 700, color: '#92400E' }}>⭐ Founding partner</span>}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <Link href={`/shop-local/${v.slug}`} target="_blank" className="btn btn-ghost btn-md">{live ? 'View my page' : 'Preview my page'}</Link>
                  {data.hasBilling && <button onClick={openBilling} disabled={busy === 'billing'} className="btn btn-ghost btn-md">Billing & cancel</button>}
                </div>
              </div>

              {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', borderRadius: 12, padding: '12px 16px', fontSize: 14, marginBottom: 16 }}>{error}</div>}

              <div style={{ ...card, marginBottom: 22 }}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{v.plan === 'FREE' ? 'Choose a plan to go live' : 'Your plan'}</h2>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 18 }}>Monthly, cancel anytime. Founding businesses keep their launch price for as long as they stay.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
                  {BUSINESS_PLANS.map(p => {
                    const current = v.plan === p.key
                    const suggested = params.plan === p.key && !current
                    return (
                      <div key={p.key} style={{ border: `2px solid ${current ? '#0B7A4B' : suggested || p.highlight ? 'var(--blue)' : 'var(--gray-200)'}`, borderRadius: 14, padding: 18, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--gray-900)' }}>{p.name}</div>
                        <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--gray-900)', margin: '4px 0 10px' }}>${p.price}<span style={{ fontSize: 13, fontWeight: 500, color: 'var(--gray-500)' }}>/mo</span></div>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14, flex: 1 }}>
                          {p.features.map(f => <li key={f} style={{ fontSize: 12.5, color: 'var(--gray-600)', lineHeight: 1.4 }}>✓ {f}</li>)}
                        </ul>
                        {current ? (
                          <div style={{ textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#0B7A4B', padding: 10 }}>Current plan</div>
                        ) : (
                          <button onClick={() => choosePlan(p.key)} disabled={!!busy} className="btn btn-primary btn-md" style={{ justifyContent: 'center' }}>
                            {busy === p.key ? 'One moment…' : v.plan === 'FREE' ? `Choose ${p.name}` : PLAN_RANK[p.key] > PLAN_RANK[v.plan] ? 'Upgrade' : 'Switch'}
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div style={card}>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Your business page</h2>
                <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 18 }}>Update your special, hours and links any time. Our team adds the Instagram posts we create for you.</p>
                <BusinessForm key={v.id} mode="owner" initial={toFormValues(v)} onSubmit={saveProfile} submitLabel="Save my page" />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}

function SetupBusiness({ onDone }: { onDone: () => void }) {
  const [categories, setCategories] = useState<any[]>([])
  const [form, setForm] = useState({ businessName: '', categoryId: '', instagramHandle: '', website: '' })
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories ?? [])) }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    const res = await fetch('/api/business', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const d = await res.json().catch(() => ({}))
    setSaving(false)
    if (!res.ok) return setError(d.error ?? 'Something went wrong.')
    onDone()
  }

  return (
    <div style={{ ...card, maxWidth: 520, margin: '20px auto' }}>
      <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Set up your business</h1>
      <p style={{ fontSize: 14, color: 'var(--gray-500)', marginBottom: 20 }}>Free to set up. Pick a plan when you&apos;re ready to go live.</p>
      {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', borderRadius: 10, padding: '10px 14px', fontSize: 13, marginBottom: 14 }}>{error}</div>}
      <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input required placeholder="Business name" value={form.businessName} onChange={e => setForm({ ...form, businessName: e.target.value })} style={input} />
        <select required value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })} style={input}>
          <option value="">Category…</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
        </select>
        <input placeholder="Instagram (@yourbiz)" value={form.instagramHandle} onChange={e => setForm({ ...form, instagramHandle: e.target.value })} style={input} />
        <input placeholder="Website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} style={input} />
        <button disabled={saving} className="btn btn-primary btn-md" style={{ justifyContent: 'center' }}>{saving ? 'Setting up…' : 'Create my business'}</button>
      </form>
    </div>
  )
}
