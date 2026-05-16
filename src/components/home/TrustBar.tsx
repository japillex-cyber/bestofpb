export default function TrustBar() {
  const items = [
    { n: '50+',    l: 'Local Businesses' },
    { n: '2,400+', l: 'Active Members' },
    { n: '$200+',  l: 'Avg. Monthly Savings' },
    { n: '4.9★',   l: 'Member Rating' },
    { n: '3 yrs',  l: 'Serving PB' },
  ]
  return (
    <>
      <div className="trustbar-hide" style={{ background: 'var(--navy2)', padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            {items.map((item, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 34, fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-1px' }}>{item.n}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: 5 }}>{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .trustbar-hide { display: none !important; }
        }
      `}</style>
    </>
  )
}
