import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using bestofpb.com and any associated services (collectively, the "Service"), you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our Service. Best of PB reserves the right to update these terms at any time, and continued use of the Service constitutes acceptance of any changes.'
  },
  {
    title: '2. Membership',
    content: 'Best of PB memberships are available to individuals aged 18 and older. Memberships are personal and non-transferable, except as explicitly permitted (such as adding a second name to a card). Membership benefits are subject to change at any time. Annual memberships auto-renew unless canceled before the renewal date. You may cancel at any time through your account dashboard.'
  },
  {
    title: '3. Invite-Only Registration',
    content: 'Account registration on Best of PB requires a valid invite code. Invite codes are non-transferable and may only be used once. Best of PB reserves the right to revoke access to any account created with an invalid or misused invite code.'
  },
  {
    title: '4. Member Deals and Discounts',
    content: 'Member deals and discounts are provided through partnerships with local businesses. Best of PB does not guarantee the availability of any specific deal or discount. Partner businesses reserve the right to modify or discontinue their offers. Deals are subject to each individual business\'s terms and conditions.'
  },
  {
    title: '5. User Conduct',
    content: 'You agree not to use the Service for any unlawful purpose or in a way that could harm Best of PB or other users. This includes but is not limited to: sharing your membership credentials, misusing invite codes, submitting false nominations or reviews, or engaging in any fraudulent activity.'
  },
  {
    title: '6. Content Submissions',
    content: 'By submitting content to Best of PB (nominations, event submissions, reviews, etc.), you grant Best of PB a non-exclusive, royalty-free license to use, display, and distribute that content. You represent that you have the right to submit such content and that it does not violate any third-party rights.'
  },
  {
    title: '7. Intellectual Property',
    content: 'All content on bestofpb.com, including but not limited to text, graphics, logos, and software, is the property of Best of PB and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without express written permission.'
  },
  {
    title: '8. Limitation of Liability',
    content: 'Best of PB is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Best of PB shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service or any member deals.'
  },
  {
    title: '9. Giveaways and Promotions',
    content: 'Giveaways and promotions hosted by Best of PB are subject to their own specific terms. One entry per person unless otherwise stated. Winners are selected at random and Best of PB\'s decisions are final. Prizes cannot be exchanged for cash.'
  },
  {
    title: '10. Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to conflict of law provisions. Any disputes arising under these Terms shall be resolved in the courts of San Diego County, California.'
  },
  {
    title: '11. Contact',
    content: 'If you have any questions about these Terms of Use, please contact us through our Contact page or by reaching out on Instagram at @thebestofpb.'
  },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />

      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '56px 24px 48px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Legal</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 14 }}>Terms of Use</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Last updated: June 17, 2025</p>
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)', padding: '56px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: '40px 48px' }}>
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 36, padding: '16px 20px', background: 'var(--blue-light)', borderRadius: 12, borderLeft: '3px solid var(--blue)' }}>
              Please read these Terms of Use carefully before using Best of PB. By using our platform, you agree to these terms.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              {SECTIONS.map(section => (
                <div key={section.title}>
                  <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 12, color: 'var(--gray-900)' }}>{section.title}</h2>
                  <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.85 }}>{section.content}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--gray-200)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link href="/privacy" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>Privacy Policy →</Link>
              <Link href="/contact" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>Contact Us →</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
