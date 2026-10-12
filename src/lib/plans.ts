// Pricing and plan details shared by the memberships page, checkout and admin.
// Prices are in US dollars per month. Stripe charges these amounts directly,
// so no products or price IDs need to be created in the Stripe dashboard.

export const MEMBER_TRIAL_DAYS = Number(process.env.NEXT_PUBLIC_MEMBER_TRIAL_DAYS ?? 90)

export type MemberTierKey = 'INSIDER' | 'VIP'

export const MEMBER_PLANS: {
  key: MemberTierKey
  dbTier: 'REGULAR' | 'VIP'
  name: string
  price: number
  tagline: string
  features: string[]
}[] = [
  {
    key: 'INSIDER',
    dbTier: 'REGULAR',
    name: 'Local Insider',
    price: 10,
    tagline: 'For locals who want discounts, giveaways, and insider perks.',
    features: [
      'Exclusive local discounts & specials',
      'Member-only promo codes',
      'Nominate businesses for Best Of, Community Spotlights & Features',
      '3 giveaway entries per month',
      'Early access to local event announcements',
      'Hidden local recommendations',
      'Birthday month perk from participating businesses',
      '"Members Only" email with local specials & events',
    ],
  },
  {
    key: 'VIP',
    dbTier: 'VIP',
    name: 'VIP Local Pass',
    price: 25,
    tagline: 'The best deals, exclusive experiences, and premium perks.',
    features: [
      'Everything in Local Insider',
      'Premium discounts from local businesses',
      '10 giveaway entries per month + priority access',
      'VIP invites & early RSVP to member events',
      'Exclusive merch drops & discounts',
      'Vote on featured businesses & content',
      'Quarterly members-only giveaway',
      'Bring-a-friend perks at select events',
      '1 skip-the-line bar pass',
    ],
  },
]

export type BusinessPlanKey = 'STARTER' | 'COMMUNITY' | 'PREMIUM'

export const BUSINESS_PLANS: {
  key: BusinessPlanKey
  name: string
  price: number
  tagline: string
  features: string[]
  highlight?: boolean
}[] = [
  {
    key: 'STARTER',
    name: 'Starter Listing',
    price: 99,
    tagline: 'Get found before you are ready for social posts.',
    features: [
      'Your own business landing page',
      'Bio, photos, hours & contact info',
      'Listed in the business category directory',
      'Google Maps, booking & reservation links',
      'Member special or offer on your page',
    ],
  },
  {
    key: 'COMMUNITY',
    name: 'Community Visibility',
    price: 175,
    tagline: 'Business Spotlight Program',
    features: [
      'Everything in Starter Listing',
      'Featured special/offer of the month (update anytime)',
      '"Locals Love" featured badge',
      '3 event promotions per year',
      '1 monthly feed post on @pacific.beach or @sandiegofree',
      '2 monthly story reshares',
      'Instagram collabs shown on your page',
    ],
  },
  {
    key: 'PREMIUM',
    name: 'Premium Exposure',
    price: 275,
    tagline: 'Local Partner Program',
    highlight: true,
    features: [
      'Everything in Community Visibility',
      '2 monthly feed posts + 4 story reshares',
      '6 promoted events per year',
      'Priority placement on category pages',
      'Homepage featured spotlight rotation',
      'Event calendar priority placement',
      'Monthly collab/reel opportunity',
      'Seasonal guides (summer, holiday, best patios, taco week…)',
    ],
  },
]

export const BUSINESS_PLAN_LABEL: Record<string, string> = {
  FREE: 'Free (not listed)',
  STARTER: 'Starter Listing',
  COMMUNITY: 'Community Visibility',
  PREMIUM: 'Premium Exposure',
}

// Sort order for directory placement: Premium first.
export const PLAN_RANK: Record<string, number> = { PREMIUM: 3, COMMUNITY: 2, STARTER: 1, FREE: 0 }

export function hasLocalsLoveBadge(plan: string) {
  return plan === 'COMMUNITY' || plan === 'PREMIUM'
}

// Community guides a business can be included in.
export const GUIDES: { slug: string; title: string; icon: string; blurb: string }[] = [
  { slug: 'happy-hour',          title: 'Best Happy Hour',     icon: '🍻', blurb: 'Where locals go when the clock hits happy hour.' },
  { slug: 'dog-friendly-patios', title: 'Dog Friendly Patios', icon: '🐶', blurb: 'Patios that welcome your four-legged plus-one.' },
  { slug: 'date-night',          title: 'Date Night',          icon: '🌹', blurb: 'Spots that make an evening feel special.' },
  { slug: 'family-friendly',     title: 'Family Friendly',     icon: '👨‍👩‍👧', blurb: 'Places the whole family will enjoy.' },
  { slug: 'brunch',              title: 'Brunch Guide',        icon: '🥞', blurb: 'Bottomless, boozy or just really good eggs.' },
  { slug: 'summer-events',       title: 'Summer Events',       icon: '☀️', blurb: 'What to do when the sun is out.' },
  { slug: 'locals-guide',        title: 'Locals Guide to SD',  icon: '🌊', blurb: 'The places San Diego locals actually love.' },
]
