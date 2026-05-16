import { PrismaClient, Role, MembershipTier } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // ── Admin user ─────────────────────────────
  const adminPassword = await hash("admin123!", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@bestofpb.com" },
    update: {},
    create: {
      email: "admin@bestofpb.com",
      name: "BOPB Admin",
      role: Role.ADMIN,
      password: adminPassword,
    },
  })
  console.log("✅ Admin user created:", admin.email)

  // ── Categories ─────────────────────────────
  const categories = [
    { name: "Food", slug: "food", icon: "🍔", order: 1 },
    { name: "Drinks", slug: "drinks", icon: "🍹", order: 2 },
    { name: "Nightlife", slug: "nightlife", icon: "🎉", order: 3 },
    { name: "Fitness", slug: "fitness", icon: "💪", order: 4 },
    { name: "Self Care", slug: "self-care", icon: "🧘", order: 5 },
    { name: "Services", slug: "services", icon: "🛠️", order: 6 },
    { name: "Apparel", slug: "apparel", icon: "👗", order: 7 },
    { name: "Pets", slug: "pets", icon: "🐾", order: 8 },
    { name: "Events", slug: "events", icon: "🎪", order: 9 },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    })
  }
  console.log("✅ Categories seeded")

  // ── Membership Plans ───────────────────────
  // Note: You must create matching products/prices in your Stripe dashboard
  // and set these env vars before running the seed
  const plans = [
    {
      name: "Regular Monthly",
      tier: MembershipTier.REGULAR,
      description: "Access to member discounts and exclusive deals",
      price: 9.99,
      interval: "month",
      stripePriceId: process.env.STRIPE_REGULAR_MONTHLY_PRICE_ID ?? "price_regular_monthly_placeholder",
      stripeProductId: "prod_regular_placeholder",
      features: [
        "Exclusive member discounts",
        "Digital membership card",
        "Access to member deals",
        "Community events access",
      ],
    },
    {
      name: "Regular Annual",
      tier: MembershipTier.REGULAR,
      description: "Save 2 months with annual billing",
      price: 99.99,
      interval: "year",
      stripePriceId: process.env.STRIPE_REGULAR_YEARLY_PRICE_ID ?? "price_regular_yearly_placeholder",
      stripeProductId: "prod_regular_placeholder",
      features: [
        "Exclusive member discounts",
        "Digital membership card",
        "Access to member deals",
        "Community events access",
        "2 months free",
      ],
    },
    {
      name: "VIP Monthly",
      tier: MembershipTier.VIP,
      description: "Premium perks and VIP access to everything",
      price: 24.99,
      interval: "month",
      stripePriceId: process.env.STRIPE_VIP_MONTHLY_PRICE_ID ?? "price_vip_monthly_placeholder",
      stripeProductId: "prod_vip_placeholder",
      features: [
        "Everything in Regular",
        "VIP-only deals & discounts",
        "Priority event access",
        "VIP membership card",
        "Exclusive giveaway entries",
        "Early access to packages",
      ],
    },
    {
      name: "VIP Annual",
      tier: MembershipTier.VIP,
      description: "Best value — 2 months free with VIP access",
      price: 249.99,
      interval: "year",
      stripePriceId: process.env.STRIPE_VIP_YEARLY_PRICE_ID ?? "price_vip_yearly_placeholder",
      stripeProductId: "prod_vip_placeholder",
      features: [
        "Everything in VIP Monthly",
        "2 months free",
        "Exclusive annual member badge",
      ],
    },
  ]

  for (const plan of plans) {
    await prisma.membershipPlan.upsert({
      where: { stripePriceId: plan.stripePriceId },
      update: {},
      create: plan,
    })
  }
  console.log("✅ Membership plans seeded")

  // ── Sample FAQ ─────────────────────────────
  const faqs = [
    {
      question: "How do I use my membership discount?",
      answer: "Show your digital membership card (QR code) to the vendor at checkout. They'll scan it to verify your membership and apply your discount.",
      order: 1,
    },
    {
      question: "Can I gift a membership to someone?",
      answer: "Yes! During checkout, select 'Gift Membership' and enter the recipient's email. They'll receive an email with instructions to activate their membership.",
      order: 2,
    },
    {
      question: "How do I become a vendor on Best of PB?",
      answer: "Vendors are invited by the BOPB team. If you're a local business interested in joining, reach out to us through the contact form and we'll be in touch.",
      order: 3,
    },
    {
      question: "What's the difference between Regular and VIP membership?",
      answer: "Regular members get access to standard discounts and deals. VIP members unlock additional exclusive offers, priority event access, VIP-only deals, and more perks from participating businesses.",
      order: 4,
    },
  ]

  for (const faq of faqs) {
    await prisma.fAQ.create({ data: faq }).catch(() => {}) // skip if exists
  }
  console.log("✅ FAQs seeded")

  console.log("🎉 Seeding complete!")
}

main()
  .catch((e) => {
    console.error("Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
