import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

const SECTIONS = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide directly to us, including your name, email address, phone number, and payment information when you create an account or purchase a membership. We also collect usage data such as pages visited, features used, and interactions with our platform to improve our Service.'
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use your information to: provide and improve the Service, process membership payments, send you account notifications and updates, feature community submissions (with your permission), contact you about promotions or giveaways you have entered, and respond to your inquiries and support requests.'
  },
  {
    title: '3. Membership Card Data',
    content: 'Your membership card contains your name and a unique QR code. This QR code is scanned by partner vendors to verify your active membership. We do not share your personal details with vendors beyond what is necessary to verify membership status.'
  },
  {
    title: '4. Payment Information',
    content: 'All payments are processed securely by Stripe. Best of PB does not store your credit card number, CVV, or full payment details on our servers. Stripe handles all payment processing in accordance with PCI DSS compliance standards.'
  },
  {
    title: '5. Sharing of Information',
    content: 'We do not sell your personal information to third parties. We may share your information with: service providers who help us operate our platform (such as Stripe for payments and Supabase for data storage), when required by law, or with your explicit consent. Partner vendors only receive confirmation of your active membership status when you present your QR code.'
  },
  {
    title: '6. Giveaway and Community Data',
    content: 'When you enter a giveaway or submit nominations and content, we collect the information you provide. This information is used to administer the giveaway or feature your submission. We may contact you via email or phone if you are selected as a winner.'
  },
  {
    title: '7. Cookies and Tracking',
    content: 'We use cookies and similar technologies to maintain your session, remember your preferences, and analyze platform usage. You can control cookie settings through your browser. Disabling cookies may affect some features of the Service.'
  },
  {
    title: '8. Data Retention',
    content: 'We retain your personal information for as long as your account is active or as needed to provide the Service. If you delete your account, we will delete or anonymize your personal data within 30 days, unless retention is required by law.'
  },
  {
    title: '9. Your Rights',
    content: 'You have the right to access, correct, or delete your personal information. You may do so through your account dashboard or by contacting us. California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect and the right to opt out of any sale of personal information (we do not sell personal information).'
  },
  {
    title: '10. Security',
    content: 'We implement industry-standard security measures to protect your personal information. This includes encryption in transit (HTTPS), secure password hashing, and access controls. However, no method of transmission over the Internet is 100% secure.'
  },
  {
    title: '11. Children\'s Privacy',
    content: 'Best of PB is not intended for users under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 18, we will take steps to delete that information promptly.'
  },
  {
    title: '12. Changes to This Policy',
    content: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the Service after any changes constitutes your acceptance of the updated policy.'
  },
  {
    title: '13. Contact Us',
    content: 'If you have any questions about this Privacy Policy or how we handle your data, please contact us through our Contact page or reach out on Instagram at @thebestofpb. We take your privacy seriously and will respond to all inquiries promptly.'
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <div style={{ background: 'var(--navy)', paddingTop: 'var(--nav-height)' }}>
        <div className="container" style={{ textAlign: 'center', padding: '56px 24px 48px' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#60A5FA', display: 'block', marginBottom: 12 }}>Legal</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', marginBottom: 14 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>Last updated: June 17, 2025</p>
        </div>
      </div>

      <div style={{ background: 'var(--gray-50)', padding: '56px 0 80px' }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{ background: '#fff', border: '1px solid var(--gray-200)', borderRadius: 18, padding: '40px 48px' }}>
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 36, padding: '16px 20px', background: '#E8F5EE', borderRadius: 12, borderLeft: '3px solid #0B7A4B', color: '#0B7A4B' }}>
              Your privacy matters to us. We do not sell your data. We do not share your information without your consent. This policy explains exactly what we collect and why.
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
              <Link href="/terms" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>Terms of Use →</Link>
              <Link href="/contact" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 14 }}>Contact Us →</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
