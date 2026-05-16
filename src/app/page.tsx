import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Categories from '@/components/home/Categories'
import TrustBar from '@/components/home/TrustBar'
import FeaturedVendors from '@/components/home/FeaturedVendors'
import MembershipSection from '@/components/home/MembershipSection'
import EventsPreview from '@/components/home/EventsPreview'
import SubmissionBanner from '@/components/home/SubmissionBanner'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Categories />
        <TrustBar />
        <FeaturedVendors />
        <MembershipSection />
        <EventsPreview />
        <SubmissionBanner />
      </main>
      <Footer />
    </>
  )
}
