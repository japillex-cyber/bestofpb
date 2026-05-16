import Link from 'next/link'

const REGULAR_FEATURES = [
  'Exclusive member discounts at 50+ businesses',
  'Digital membership card with QR code',
  'Physical card mailed to your door',
  'Two names on one card (like Costco)',
  'Access to member-only events',
  'Community polls & nominations',
  'Giftable to friends & family',
]

const VIP_FEATURES = [
  'Everything in Regular membership',
  'VIP line status at select venues',
  'Exclusive VIP-only offers & deals',
  'Gold VIP membership card',
  'Priority event access',
  'Exclusive giveaway entries',
  'Limited availability — only 200 spots',
]

export default function MembershipSection() {
  return (
    <section className="mem" aria-labelledby="mem-heading">
      <div className="container">
        <div className="mem__header">
          <span className="section-eyebrow">Membership</span>
          <h2 className="section-title" id="mem-heading">
            Join the Best of PB Club
          </h2>
          <p className="mem__sub">
            One membership. Hundreds of dollars saved every month. Your insider pass to Pacific Beach.
          </p>
        </div>

        <div className="mem__grid">
          {/* Regular card */}
          <div className="mem__card mem__card--regular">
            <div className="mem__card-badge mem__card-badge--regular">Regular</div>
            <div className="mem__price">
              <span className="mem__price-currency">$</span>
              <span className="mem__price-amount">156</span>
              <span className="mem__price-period">/year</span>
            </div>
            <div className="mem__price-monthly">~$13/month · cancel anytime</div>
            <div className="mem__card-name">PB Member</div>
            <ul className="mem__features" aria-label="Regular membership features">
              {REGULAR_FEATURES.map((f) => (
                <li key={f} className="mem__feature">
                  <svg className="mem__feature-check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="rgba(96,165,250,0.2)"/>
                    <path d="M5 8L7 10L11 6" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/memberships?tier=regular" className="btn btn-white btn-lg mem__cta">
              Get Regular Membership
            </Link>
            <p className="mem__gift-link">
              Want to gift this?{' '}
              <Link href="/memberships?gift=true&tier=regular" className="mem__gift-a">
                Buy as a gift →
              </Link>
            </p>
          </div>

          {/* VIP card */}
          <div className="mem__card mem__card--vip">
            <div className="mem__popular-pill" aria-label="Most popular">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z" fill="#C8962A"/>
              </svg>
              Most Popular
            </div>
            <div className="mem__card-badge mem__card-badge--vip">VIP</div>
            <div className="mem__price">
              <span className="mem__price-currency" style={{color:'#F0D98A'}}>$</span>
              <span className="mem__price-amount" style={{color:'#F0D98A'}}>350</span>
              <span className="mem__price-period" style={{color:'rgba(201,168,76,0.6)'}}>/year</span>
            </div>
            <div className="mem__price-monthly" style={{color:'rgba(201,168,76,0.5)'}}>~$29/month · limited to 200 members</div>
            <div className="mem__card-name" style={{color:'#F0D98A'}}>PB VIP Member</div>
            <ul className="mem__features" aria-label="VIP membership features">
              {VIP_FEATURES.map((f) => (
                <li key={f} className="mem__feature" style={{color:'rgba(201,168,76,0.75)'}}>
                  <svg className="mem__feature-check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="rgba(201,168,76,0.2)"/>
                    <path d="M5 8L7 10L11 6" stroke="#C8962A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/memberships?tier=vip" className="btn btn-gold btn-lg mem__cta">
              Get VIP Membership
            </Link>
            <p className="mem__gift-link" style={{color:'rgba(201,168,76,0.4)'}}>
              Want to gift this?{' '}
              <Link href="/memberships?gift=true&tier=vip" className="mem__gift-a" style={{color:'rgba(201,168,76,0.7)'}}>
                Buy as a gift →
              </Link>
            </p>
          </div>
        </div>

        {/* Trust signals */}
        <div className="mem__trust">
          <div className="mem__trust-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2L12.5 7H18L13.5 10.5L15.5 16L10 12.5L4.5 16L6.5 10.5L2 7H7.5L10 2Z" stroke="#60A5FA" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <span>Stripe-secured payments</span>
          </div>
          <div className="mem__trust-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2C7 2 5 5 5 8.5C5 13 10 18 10 18C10 18 15 13 15 8.5C15 5 13 2 10 2Z" stroke="#60A5FA" strokeWidth="1.5"/>
              <circle cx="10" cy="8.5" r="2" stroke="#60A5FA" strokeWidth="1.5"/>
            </svg>
            <span>Physical card mailed to you</span>
          </div>
          <div className="mem__trust-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2L12 7.5H18L13 11L15 17L10 13.5L5 17L7 11L2 7.5H8L10 2Z" stroke="#60A5FA" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <span>Cancel anytime, no hassle</span>
          </div>
          <div className="mem__trust-item">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <rect x="3" y="6" width="14" height="11" rx="2" stroke="#60A5FA" strokeWidth="1.5"/>
              <path d="M7 6V5C7 3.34 8.34 2 10 2C11.66 2 13 3.34 13 5V6" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Gift to anyone, anywhere</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mem {
          padding: var(--space-20) 0;
          background: var(--brand-navy);
        }

        .mem__header {
          text-align: center;
          margin-bottom: var(--space-12);
        }
        .mem__header .section-eyebrow { color: #60A5FA; }
        .mem__header .section-title {
          color: #fff;
          font-size: clamp(28px, 3vw, 38px);
          letter-spacing: -0.5px;
          margin-bottom: 14px;
        }
        .mem__sub {
          font-size: 16px;
          color: rgba(255,255,255,0.45);
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .mem__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-6);
          max-width: 820px;
          margin: 0 auto var(--space-12);
        }
        @media (max-width: 700px) {
          .mem__grid { grid-template-columns: 1fr; }
        }

        .mem__card {
          border-radius: var(--radius-xl);
          padding: 36px;
          position: relative;
        }
        .mem__card--regular {
          background: linear-gradient(145deg, #1A2744 0%, #0D1835 100%);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .mem__card--vip {
          background: linear-gradient(145deg, #2D1C00 0%, #1A0E00 100%);
          border: 1px solid rgba(201,168,76,0.2);
        }

        .mem__popular-pill {
          position: absolute;
          top: -14px; left: 50%; transform: translateX(-50%);
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--brand-gold);
          color: #fff;
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.5px;
          padding: 5px 14px;
          border-radius: var(--radius-full);
          white-space: nowrap;
        }

        .mem__card-badge {
          display: inline-block;
          font-size: 10px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          margin-bottom: 20px;
        }
        .mem__card-badge--regular { color: rgba(96,165,250,0.6); }
        .mem__card-badge--vip { color: rgba(201,168,76,0.6); }

        .mem__price {
          display: flex;
          align-items: baseline;
          gap: 2px;
          margin-bottom: 4px;
          line-height: 1;
        }
        .mem__price-currency {
          font-family: var(--font-display);
          font-size: 24px; font-weight: 600;
          color: rgba(255,255,255,0.7);
          align-self: flex-start;
          margin-top: 8px;
        }
        .mem__price-amount {
          font-family: var(--font-display);
          font-size: 56px; font-weight: 800;
          color: #fff;
          letter-spacing: -2px;
        }
        .mem__price-period {
          font-size: 18px; font-weight: 400;
          color: rgba(255,255,255,0.4);
          margin-left: 2px;
        }

        .mem__price-monthly {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 20px;
        }

        .mem__card-name {
          font-family: var(--font-display);
          font-size: 20px; font-weight: 700;
          color: #fff;
          margin-bottom: 20px;
        }

        .mem__features {
          list-style: none;
          margin-bottom: 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .mem__feature {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13.5px;
          color: rgba(255,255,255,0.55);
          line-height: 1.4;
        }
        .mem__feature-check { flex-shrink: 0; margin-top: 1px; }

        .mem__cta { width: 100%; justify-content: center; margin-bottom: 14px; }

        .mem__gift-link { font-size: 12px; color: rgba(255,255,255,0.3); text-align: center; }
        .mem__gift-a { color: rgba(255,255,255,0.5); text-decoration: underline; }
        .mem__gift-a:hover { color: rgba(255,255,255,0.8); }

        .mem__trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: var(--space-8);
          max-width: 700px;
          margin: 0 auto;
        }
        .mem__trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          font-weight: 500;
        }
      `}</style>
    </section>
  )
}
