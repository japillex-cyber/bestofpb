import Link from 'next/link'

export default function SubmissionBanner() {
  return (
    <section className="section-gray">
      <div className="container">
        <div style={{
          background: 'linear-gradient(135deg, var(--navy) 0%, #0d2244 100%)',
          borderRadius: 24, padding: '60px 56px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 48, alignItems: 'center',
        }}>
          <div>
            <span className="section-eyebrow section-eyebrow-inv">Community</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.5px', marginBottom: 16 }}>
              Know a Local Gem?<br />Share It With PB.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 28 }}>
              Nominate a business, artist, creator, or local brand you love. We feature the best of what the community discovers.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <Link href="/submissions" className="btn btn-primary btn-lg">Submit Now</Link>
              <Link href="/nominations" className="btn btn-outline-white btn-lg">View Nominations</Link>
            </div>
          </div>

          {/* Mini form preview */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 28 }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Share Something Great</h3>
            <p style={{ fontSize: 13, color: 'var(--gray-500)', marginBottom: 22, lineHeight: 1.5 }}>Our team reviews every submission for the monthly spotlight.</p>
            {[['Your Name','e.g. Alex Rivera'],['Business Name','e.g. Shore House Kitchen'],['Instagram','@handle or full URL']].map(([label,ph]) => (
              <div key={label} style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--gray-500)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>{label}</label>
                <input placeholder={ph} style={{ width: '100%', padding: '10px 14px', border: '1.5px solid var(--gray-200)', borderRadius: 9, fontSize: 13.5, color: 'var(--gray-800)', background: 'var(--gray-50)', outline: 'none', fontFamily: 'inherit' }} readOnly />
              </div>
            ))}
            <Link href="/submissions" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex', marginTop: 4 }}>Submit for Review</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
