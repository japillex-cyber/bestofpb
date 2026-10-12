'use client'
import { useState } from 'react'
import { GUIDES, BUSINESS_PLAN_LABEL } from '@/lib/plans'

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export type BusinessFormValues = {
  name: string; slug: string; categoryId: string; tagline: string; description: string; neighborhood: string
  address: string; city: string; state: string; zip: string; phone: string; email: string; website: string
  instagramHandle: string; bookingUrl: string; reservationUrl: string; orderUrl: string; mapsUrl: string
  hours: Record<string, string>; photos: string; logoUrl: string; instagramPosts: string; guides: string[]
  plan: string; status: string; priority: number; foundingMember: boolean
  deal: { title: string; description: string; terms: string; memberOnly: boolean; isActive: boolean }
}

export function toFormValues(v: any): BusinessFormValues {
  return {
    name: v?.name ?? '', slug: v?.slug ?? '', categoryId: v?.categoryId ?? '', tagline: v?.tagline ?? '',
    description: v?.description ?? '', neighborhood: v?.neighborhood ?? '', address: v?.address ?? '',
    city: v?.city ?? 'San Diego', state: v?.state ?? 'CA', zip: v?.zip ?? '', phone: v?.phone ?? '', email: v?.email ?? '',
    website: v?.website ?? '', instagramHandle: v?.instagramHandle ?? '', bookingUrl: v?.bookingUrl ?? '',
    reservationUrl: v?.reservationUrl ?? '', orderUrl: v?.orderUrl ?? '', mapsUrl: v?.mapsUrl ?? '',
    hours: (v?.hours as Record<string, string>) ?? {}, photos: (v?.photos ?? []).join('\n'), logoUrl: v?.logoUrl ?? '',
    instagramPosts: (v?.instagramPosts ?? []).join('\n'), guides: v?.guides ?? [],
    plan: v?.plan ?? 'STARTER', status: v?.status ?? 'ACTIVE', priority: v?.priority ?? 0, foundingMember: !!v?.foundingMember,
    deal: {
      title: v?.deal?.title ?? '', description: v?.deal?.description ?? '', terms: v?.deal?.terms ?? '',
      memberOnly: v?.deal ? v.deal.memberOnly : true, isActive: v?.deal ? v.deal.isActive : true,
    },
  }
}

const label: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--gray-600)', marginBottom: 5 }
const input: React.CSSProperties = { width: '100%', padding: '10px 12px', border: '1.5px solid var(--gray-200)', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', background: '#fff', color: 'var(--gray-900)', outline: 'none' }
const section: React.CSSProperties = { borderTop: '1px solid var(--gray-100)', paddingTop: 18, marginTop: 18 }
const sectionTitle: React.CSSProperties = { fontSize: 14, fontWeight: 800, color: 'var(--gray-900)', marginBottom: 12 }
const grid2: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }

export default function BusinessForm({ mode, initial, categories, onSubmit, submitLabel = 'Save' }: {
  mode: 'admin' | 'owner'
  initial: BusinessFormValues
  categories?: { id: string; name: string; icon?: string | null }[]
  onSubmit: (values: BusinessFormValues) => Promise<string | null> // returns an error message or null
  submitLabel?: string
}) {
  const [v, setV] = useState<BusinessFormValues>(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const admin = mode === 'admin'

  const set = <K extends keyof BusinessFormValues>(k: K, val: BusinessFormValues[K]) => { setV(p => ({ ...p, [k]: val })); setSaved(false) }
  const setDeal = (k: keyof BusinessFormValues['deal'], val: any) => { setV(p => ({ ...p, deal: { ...p.deal, [k]: val } })); setSaved(false) }
  const field = (k: keyof BusinessFormValues, text: string, placeholder = '', type = 'text') => (
    <div>
      <label style={label}>{text}</label>
      <input type={type} value={(v[k] as string) ?? ''} placeholder={placeholder} onChange={e => set(k, e.target.value as any)} style={input} />
    </div>
  )

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError('')
    const err = await onSubmit(v)
    setSaving(false)
    if (err) setError(err); else setSaved(true)
  }

  return (
    <form onSubmit={submit}>
      {admin && (
        <div style={grid2}>
          {field('name', 'Business name *')}
          <div>
            <label style={label}>Category *</label>
            <select value={v.categoryId} onChange={e => set('categoryId', e.target.value)} style={input} required>
              <option value="">Choose…</option>
              {categories?.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
            </select>
          </div>
          {field('slug', 'Page address (bestofpb.com/shop-local/…)', 'auto from name')}
        </div>
      )}

      <div style={admin ? section : undefined}>
        <div style={sectionTitle}>About</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {field('tagline', 'Short tagline', 'e.g. Coastal brunch steps from the sand')}
          <div>
            <label style={label}>Bio</label>
            <textarea value={v.description} onChange={e => set('description', e.target.value)} rows={5} style={{ ...input, resize: 'vertical' }} placeholder="Tell locals what makes you special. Leave a blank line between paragraphs." />
          </div>
          <div>
            <label style={label}>Photo links (one per line — the first one is the cover photo)</label>
            <textarea value={v.photos} onChange={e => set('photos', e.target.value)} rows={3} style={{ ...input, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }} placeholder="https://…" />
          </div>
          {field('logoUrl', 'Logo link', 'https://…')}
        </div>
      </div>

      <div style={section}>
        <div style={sectionTitle}>Special / offer of the month</div>
        <div style={grid2}>
          <div>
            <label style={label}>Offer (leave empty for no special)</label>
            <input value={v.deal.title} onChange={e => setDeal('title', e.target.value)} placeholder="e.g. 10% off your order" style={input} />
          </div>
          <div>
            <label style={label}>Who can see it</label>
            <select value={v.deal.memberOnly ? 'members' : 'everyone'} onChange={e => setDeal('memberOnly', e.target.value === 'members')} style={input}>
              <option value="members">SD Social Club members only</option>
              <option value="everyone">Everyone ("show this page")</option>
            </select>
          </div>
        </div>
        <div style={{ ...grid2, marginTop: 12 }}>
          <div>
            <label style={label}>Details</label>
            <input value={v.deal.description} onChange={e => setDeal('description', e.target.value)} placeholder="How to redeem, what's included" style={input} />
          </div>
          <div>
            <label style={label}>Fine print</label>
            <input value={v.deal.terms} onChange={e => setDeal('terms', e.target.value)} placeholder="e.g. Dine-in only, not valid on holidays" style={input} />
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 10, color: 'var(--gray-700)' }}>
          <input type="checkbox" checked={v.deal.isActive} onChange={e => setDeal('isActive', e.target.checked)} /> Special is live
        </label>
      </div>

      <div style={section}>
        <div style={sectionTitle}>Links</div>
        <div style={grid2}>
          {field('website', 'Website', 'yourbusiness.com')}
          {field('instagramHandle', 'Business Instagram', '@yourbusiness')}
          {field('bookingUrl', 'Booking link', 'https://…')}
          {field('reservationUrl', 'Reservation link', 'OpenTable, Resy…')}
          {field('orderUrl', 'Online ordering link', 'https://…')}
          {field('mapsUrl', 'Google Maps link (optional)', 'auto from address')}
        </div>
      </div>

      {admin && (
        <div style={section}>
          <div style={sectionTitle}>Instagram posts we&apos;ve made for them</div>
          <label style={label}>Post or reel links, one per line — they show on the business page</label>
          <textarea value={v.instagramPosts} onChange={e => set('instagramPosts', e.target.value)} rows={4} style={{ ...input, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }} placeholder="https://www.instagram.com/p/…" />
        </div>
      )}

      <div style={section}>
        <div style={sectionTitle}>Contact & location</div>
        <div style={grid2}>
          {field('address', 'Street address')}
          {field('neighborhood', 'Neighborhood', 'e.g. Pacific Beach, North Park')}
          {field('city', 'City')}
          {field('state', 'State')}
          {field('zip', 'ZIP')}
          {field('phone', 'Phone', '', 'tel')}
          {field('email', 'Public email', '', 'email')}
        </div>
      </div>

      <div style={section}>
        <div style={sectionTitle}>Hours</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
          {DAYS.map(d => (
            <div key={d}>
              <label style={label}>{d}</label>
              <input value={v.hours[d] ?? ''} placeholder="9am–5pm or Closed" onChange={e => set('hours', { ...v.hours, [d]: e.target.value })} style={input} />
            </div>
          ))}
        </div>
      </div>

      {admin && (
        <div style={section}>
          <div style={sectionTitle}>Plan & placement</div>
          <div style={grid2}>
            <div>
              <label style={label}>Plan</label>
              <select value={v.plan} onChange={e => set('plan', e.target.value)} style={input}>
                {Object.entries(BUSINESS_PLAN_LABEL).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Status</label>
              <select value={v.status} onChange={e => set('status', e.target.value)} style={input}>
                {['ACTIVE', 'PENDING', 'SUSPENDED', 'INACTIVE'].map(s => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
              </select>
            </div>
            <div>
              <label style={label}>Priority (higher shows first within its plan)</label>
              <input type="number" value={v.priority} onChange={e => set('priority', Number(e.target.value))} style={input} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, marginTop: 12, color: 'var(--gray-700)' }}>
            <input type="checkbox" checked={v.foundingMember} onChange={e => set('foundingMember', e.target.checked)} /> Founding partner badge
          </label>
          <div style={{ marginTop: 14 }}>
            <label style={label}>Community guides</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {GUIDES.map(g => {
                const on = v.guides.includes(g.slug)
                return (
                  <button type="button" key={g.slug} onClick={() => set('guides', on ? v.guides.filter(x => x !== g.slug) : [...v.guides, g.slug])}
                    style={{ fontSize: 12, fontWeight: 600, padding: '6px 12px', borderRadius: 999, border: `1.5px solid ${on ? 'var(--blue)' : 'var(--gray-200)'}`, background: on ? 'var(--blue-light)' : '#fff', color: on ? 'var(--blue)' : 'var(--gray-600)', cursor: 'pointer', fontFamily: 'inherit' }}>
                    {g.icon} {g.title}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22, position: 'sticky', bottom: 0, background: '#fff', padding: '12px 0' }}>
        <button type="submit" disabled={saving} className="btn btn-primary btn-md" style={{ minWidth: 120, justifyContent: 'center' }}>{saving ? 'Saving…' : submitLabel}</button>
        {error && <span style={{ fontSize: 13, color: '#B91C1C', fontWeight: 600 }}>{error}</span>}
        {saved && !error && <span style={{ fontSize: 13, color: '#0B7A4B', fontWeight: 600 }}>Saved ✓</span>}
      </div>
    </form>
  )
}
