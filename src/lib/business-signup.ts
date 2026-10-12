import { db } from '@/lib/db'
import { uniqueVendorSlug } from '@/lib/viewer'

// Creates the (free, unlisted) business profile for a user and marks them as a business account.
export async function createBusinessForUser(userId: string, input: { businessName: string; categoryId: string; instagramHandle?: string; website?: string; phone?: string; email?: string }) {
  const name = input.businessName.trim().slice(0, 120)
  const category = await db.category.findUnique({ where: { id: input.categoryId } })
  if (!name) throw new Error('Business name is required.')
  if (!category) throw new Error('Please pick a category.')
  const slug = await uniqueVendorSlug(name)
  const website = input.website?.trim() ? (/^https?:\/\//i.test(input.website.trim()) ? input.website.trim() : `https://${input.website.trim()}`) : null
  return db.$transaction(async tx => {
    const vendor = await tx.vendor.create({
      data: {
        userId, name, slug, categoryId: category.id,
        instagramHandle: input.instagramHandle?.trim() || null,
        website, phone: input.phone?.trim() || null, email: input.email?.trim() || null,
        city: 'San Diego', state: 'CA', plan: 'FREE', status: 'PENDING',
      },
    })
    const user = await tx.user.findUnique({ where: { id: userId } })
    if (user && user.role !== 'ADMIN') await tx.user.update({ where: { id: userId }, data: { role: 'VENDOR' } })
    return vendor
  })
}
