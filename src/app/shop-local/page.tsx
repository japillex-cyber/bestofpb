import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ShopLocalClient from './ShopLocalClient'
import { getListedBusinesses } from '@/lib/vendors'
import { getViewer } from '@/lib/viewer'

export const dynamic = 'force-dynamic'
export const metadata = {
  title: 'Shop Local in San Diego — Best of PB',
  description: 'Discover local San Diego businesses, member deals and specials.',
}

export default async function ShopLocalPage({ searchParams }: { searchParams: { cat?: string; q?: string } }) {
  const viewer = await getViewer()
  const businesses = await getListedBusinesses(viewer.isPaidMember)

  // Only show categories that actually have businesses in them.
  const seen = new Map<string, { slug: string; name: string; icon: string | null }>()
  for (const b of businesses) seen.set(b.category.slug, b.category)
  const categories = Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      <Navbar />
      <ShopLocalClient
        businesses={businesses}
        categories={categories}
        isMember={viewer.isPaidMember}
        initialCat={searchParams.cat ?? 'all'}
        initialQuery={searchParams.q ?? ''}
      />
      <Footer />
    </>
  )
}
