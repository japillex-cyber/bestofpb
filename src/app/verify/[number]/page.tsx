import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Verify membership — Best of PB', robots: { index: false } }

// Businesses scan a member's QR code and land here to check the membership is valid.
export default async function VerifyPage({ params }: { params: { number: string } }) {
  const m = await db.membership.findUnique({ where: { membershipNumber: params.number }, include: { user: { select: { name: true } } } })
  const valid = !!m && (m.status === 'ACTIVE' || m.status === 'TRIALING')
  const firstName = m?.user.name?.split(' ')[0] ?? 'Member'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: valid ? '#0B7A4B' : '#B91C1C', padding: 24 }}>
      <div style={{ background: '#fff', borderRadius: 24, padding: '36px 28px', textAlign: 'center', maxWidth: 380, width: '100%' }}>
        <div style={{ fontSize: 56 }}>{valid ? '✅' : '❌'}</div>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 26, fontWeight: 800, margin: '10px 0 6px' }}>{valid ? 'Valid member' : 'Not an active member'}</h1>
        {m && <p style={{ fontSize: 16, color: '#4a5268' }}>{firstName} · {m.tier === 'VIP' ? 'VIP Local Pass' : 'Local Insider'}</p>}
        <p style={{ fontSize: 13, color: '#9AA3B8', marginTop: 14 }}>SD Social Club · #{params.number}</p>
      </div>
    </div>
  )
}
