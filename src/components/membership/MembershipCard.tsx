'use client'
import { useState } from 'react'

// The member card (front + flip-to-back with QR). Used on the member dashboard
// and as a live preview in Admin → Members, so both always look identical.
export function formatValidThru(d: string | Date | null | undefined) {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date.getTime())) return '—'
  return `${String(date.getUTCMonth() + 1).padStart(2, '0')}/${String(date.getUTCFullYear()).slice(-2)}`
}

export function MembershipCard({
  isVIP,
  holderName,
  memberNumber,
  qrCode,
  validThru,
  locationLine = 'SAN DIEGO, CA',
  maxWidth = 420,
}: {
  isVIP: boolean
  holderName?: string | null
  memberNumber: string
  qrCode?: string | null
  validThru?: string | Date | null
  locationLine?: string
  maxWidth?: number
}) {
  const [flipped, setFlipped] = useState(false)
  const cardHolder = holderName?.toUpperCase() || 'MEMBER NAME'
  const thru = formatValidThru(validThru)

  return (
    <div onClick={() => setFlipped(!flipped)} style={{ cursor: 'pointer', width: '100%', maxWidth, perspective: '1200px' }}>
      <div style={{ position: 'relative', width: '100%', paddingBottom: '58%', transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1)', transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'none' }}>

        {/* ── FRONT ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          borderRadius: 20,
          background: isVIP
            ? 'linear-gradient(135deg, #1a0e00 0%, #3d2200 30%, #6b3d00 60%, #3d2200 80%, #1a0e00 100%)'
            : 'linear-gradient(135deg, #0a1628 0%, #0d2040 40%, #0a3060 70%, #0d2040 100%)',
          boxShadow: isVIP
            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,150,42,0.3), inset 0 1px 0 rgba(240,217,138,0.2)'
            : '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(96,165,250,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
          overflow: 'hidden',
          padding: '28px 30px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          {/* Holographic shimmer overlay */}
          <div style={{ position: 'absolute', inset: 0, background: isVIP ? 'linear-gradient(105deg, transparent 40%, rgba(201,150,42,0.08) 50%, transparent 60%)' : 'linear-gradient(105deg, transparent 40%, rgba(96,165,250,0.06) 50%, transparent 60%)', pointerEvents: 'none' }} />

          {/* Decorative circles */}
          <div style={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: isVIP ? 'rgba(201,150,42,0.08)' : 'rgba(0,87,255,0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: -10, top: -10, width: 100, height: 100, borderRadius: '50%', background: isVIP ? 'rgba(201,150,42,0.06)' : 'rgba(0,87,255,0.08)', pointerEvents: 'none' }} />

          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative' }}>
            <div>
              {/* Chip */}
              <div style={{ width: 44, height: 34, borderRadius: 6, background: isVIP ? 'linear-gradient(135deg,#C8962A,#F0D98A,#C8962A)' : 'linear-gradient(135deg,#4a6fa5,#7aa0d4,#4a6fa5)', marginBottom: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 32, height: 24, borderRadius: 4, border: `1px solid ${isVIP ? 'rgba(139,90,10,0.5)' : 'rgba(30,60,100,0.5)'}`, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, padding: 3 }}>
                  {[0, 1, 2, 3].map(i => <div key={i} style={{ background: isVIP ? 'rgba(139,90,10,0.4)' : 'rgba(30,60,100,0.4)', borderRadius: 1 }} />)}
                </div>
              </div>
              {/* Contactless symbol */}
              <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {[8, 12, 16].map((s, i) => <div key={i} style={{ width: s, height: s, borderRadius: '50%', border: `1.5px solid ${isVIP ? 'rgba(201,150,42,0.5)' : 'rgba(96,165,250,0.4)'}`, borderLeft: 'none', borderBottom: 'none' }} />)}
              </div>
            </div>

            {/* Logo area */}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 13, fontWeight: 800, color: isVIP ? '#F0D98A' : '#60A5FA', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 2 }}>BEST OF PB</div>
              <div style={{ fontSize: 9, color: isVIP ? 'rgba(240,217,138,0.5)' : 'rgba(96,165,250,0.5)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>San Diego, CA</div>
              {isVIP && <div style={{ marginTop: 4, fontSize: 9, fontWeight: 700, color: '#C8962A', letterSpacing: '2px', textTransform: 'uppercase' }}>⭐ VIP</div>}
            </div>
          </div>

          {/* Card number */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 600, color: isVIP ? 'rgba(240,217,138,0.9)' : 'rgba(255,255,255,0.8)', letterSpacing: '3px', marginBottom: 16, textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
              BOPB •••• •••• {memberNumber.slice(-4)}
            </div>

            {/* Bottom info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>Card Holder</div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 15, fontWeight: 700, color: isVIP ? '#F0D98A' : '#fff', letterSpacing: '1px', textShadow: '0 1px 3px rgba(0,0,0,0.5)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cardHolder}</div>
                <div style={{ fontSize: 10, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', marginTop: 2, letterSpacing: '1px' }}>{locationLine}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>Valid Thru</div>
                <div style={{ fontFamily: 'monospace', fontSize: 14, fontWeight: 700, color: isVIP ? '#F0D98A' : '#fff' }}>{thru}</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 20,
          background: isVIP
            ? 'linear-gradient(135deg,#1a0e00,#3d2200,#1a0e00)'
            : 'linear-gradient(135deg,#0a1628,#0d2040,#0a1628)',
          boxShadow: isVIP
            ? '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,150,42,0.3)'
            : '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(96,165,250,0.2)',
          overflow: 'hidden',
        }}>
          {/* Magnetic stripe */}
          <div style={{ height: 44, background: '#000', margin: '28px 0 20px' }} />

          {/* Signature strip + QR */}
          <div style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, minWidth: 0, background: 'repeating-linear-gradient(90deg, #fff 0px, #fff 4px, #f0f0f0 4px, #f0f0f0 8px)', height: 44, borderRadius: 4, display: 'flex', alignItems: 'center', padding: '0 12px', overflow: 'hidden' }}>
              <span style={{ fontFamily: 'cursive', fontSize: 18, color: '#333', opacity: 0.7, whiteSpace: 'nowrap' }}>{holderName}</span>
            </div>

            <div style={{ width: 70, height: 70, background: '#fff', borderRadius: 8, padding: 6, flexShrink: 0 }}>
              {qrCode
                ? <img src={qrCode} alt="Membership QR code" style={{ width: '100%', height: '100%', display: 'block' }} />
                : <div style={{ width: '100%', height: '100%', background: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0/8px 8px', borderRadius: 2 }} />}
            </div>
          </div>

          {/* Member details */}
          <div style={{ padding: '16px 24px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3 }}>Member ID</div>
                <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: isVIP ? '#F0D98A' : '#60A5FA', letterSpacing: '1px' }}>{memberNumber}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 8, color: isVIP ? 'rgba(240,217,138,0.4)' : 'rgba(255,255,255,0.3)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 3 }}>Tier</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: isVIP ? '#F0D98A' : '#60A5FA' }}>{isVIP ? '⭐ VIP' : 'REGULAR'}</div>
              </div>
            </div>
            <div style={{ fontSize: 9, color: isVIP ? 'rgba(240,217,138,0.3)' : 'rgba(255,255,255,0.2)', lineHeight: 1.5, marginTop: 8 }}>
              Scan QR code to verify membership. This card is non-transferable. bestofpb.com
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
