'use client'
import { useState } from 'react'
import { AdminSidebar } from '../users/page'

const SAMPLE_CODES = [
  { id: '1', code: 'BOPB-2024-LAUNCH', maxUses: 100, usedCount: 23, isActive: true, expiresAt: null, note: 'Launch invite code' },
  { id: '2', code: 'BOPB-VIP-FRIENDS', maxUses: 20, usedCount: 8, isActive: true, expiresAt: '2025-12-31', note: 'Friends and family' },
  { id: '3', code: 'BOPB-PROMO-50', maxUses: 50, usedCount: 50, isActive: false, expiresAt: null, note: 'Promo — maxed out' },
]

export default function AdminInviteCodesPage() {
  const [codes, setCodes] = useState(SAMPLE_CODES)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ code: '', maxUses: '', note: '', expiresAt: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const generateCode = () => {
    const rand = Math.random().toString(36).substring(2, 8).toUpperCase()
    setForm(f => ({ ...f, code: `BOPB-${rand}` }))
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/admin/invite-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSuccess(true)
        setShowForm(false)
        setForm({ code: '', maxUses: '', note: '', expiresAt: '' })
        setTimeout(() => setSuccess(false), 3000)
      }
    } catch (err) { console.error(err) }
    setLoading(false)
  }

  const inputStyle = { width: '100%', height: 44, padding: '0 12px', border: '1.5px solid var(--gray-200)', borderRadius: 9, fontSize: 14, fontFamily: 'inherit', outline: 'none', background: 'var(--gray-50)', color: 'var(--gray-800)' }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--gray-50)' }}>
      <AdminSidebar active="Invite Codes" />
      <div style={{ marginLeft: 240, flex: 1, padding: '32px 36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Invite Codes</h1>
            <p style={{ fontSize: 14, color: 'var(--gray-500)' }}>Manage who can register on Best of PB</p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn btn-primary btn-md">+ Create Invite Code</button>
        </div>

        {success && (
          <div style={{ background: '#E8F5EE', border: '1px solid rgba(11,122,75,0.2)', color: '#0B7A4B', padding: '12px 16px', borderRadius: 10, marginBottom: 20, fontSize: 14, fontWeight: 600 }}>
            ✅ Invite code created successfully!
          </div>
        )}

        {/* Codes table */}
        <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                {['Code', 'Uses', 'Status', 'Expires', 'Note', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: 'var(--gray-400)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {codes.map((code, i) => (
                <tr key={code.id} style={{ borderBottom: i < codes.length - 1 ? '1px solid var(--gray-100)' : 'none' }}>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: 'var(--gray-900)', background: 'var(--gray-100)', padding: '4px 10px', borderRadius: 6 }}>{code.code}</span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ fontSize: 13, color: 'var(--gray-700)', fontWeight: 600 }}>{code.usedCount} / {code.maxUses ?? '∞'}</div>
                    <div style={{ height: 4, background: 'var(--gray-100)', borderRadius: 2, marginTop: 5, width: 80 }}>
                      <div style={{ height: 4, background: code.usedCount >= (code.maxUses ?? 999) ? '#EF4444' : 'var(--blue)', borderRadius: 2, width: `${Math.min(100, (code.usedCount / (code.maxUses ?? 100)) * 100)}%` }} />
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: code.isActive ? '#E8F5EE' : 'var(--gray-100)', color: code.isActive ? '#0B7A4B' : 'var(--gray-500)' }}>
                      {code.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--gray-400)' }}>{code.expiresAt ?? 'Never'}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: 'var(--gray-500)' }}>{code.note}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        onClick={() => setCodes(c => c.map(x => x.id === code.id ? { ...x, isActive: !x.isActive } : x))}
                        style={{ background: code.isActive ? '#FEE2E2' : '#E8F5EE', color: code.isActive ? '#B91C1C' : '#0B7A4B', border: 'none', borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                      >
                        {code.isActive ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(4,9,28,0.8)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <div style={{ background: '#fff', borderRadius: 20, padding: 36, width: '100%', maxWidth: 440, position: 'relative' }}>
              <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: 16, right: 16, width: 32, height: 32, borderRadius: '50%', background: 'var(--gray-100)', border: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>✕</button>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Create Invite Code</h2>
              <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Code</label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input type="text" placeholder="BOPB-XXXX" required value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value.toUpperCase() }))} style={{ ...inputStyle, flex: 1 }} />
                    <button type="button" onClick={generateCode} style={{ background: 'var(--gray-100)', border: '1.5px solid var(--gray-200)', borderRadius: 9, padding: '0 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: 'var(--gray-700)', whiteSpace: 'nowrap' }}>Generate</button>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Max Uses (leave blank for unlimited)</label>
                  <input type="number" placeholder="e.g. 50" value={form.maxUses} onChange={e => setForm(f => ({ ...f, maxUses: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Expires At (optional)</label>
                  <input type="date" value={form.expiresAt} onChange={e => setForm(f => ({ ...f, expiresAt: e.target.value }))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 7 }}>Note</label>
                  <input type="text" placeholder="e.g. Friends and family" value={form.note} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} style={inputStyle} />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', height: 48, background: '#0057FF', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', marginTop: 4 }}>
                  {loading ? 'Creating...' : 'Create Invite Code'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
