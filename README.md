# Best of PB (BOPB) — Starter Kit

A community-driven local discovery and membership platform for Pacific Beach, San Diego.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Database | PostgreSQL via Supabase |
| ORM | Prisma |
| Auth | NextAuth.js v4 |
| Payments | Stripe |
| Styling | Tailwind CSS + shadcn/ui |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone & Install

```bash
git clone <your-repo>
cd best-of-pb
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`:

- **Supabase**: Create a project at [supabase.com](https://supabase.com), get your DB URL from Settings → Database
- **NextAuth**: Run `openssl rand -base64 32` to generate `NEXTAUTH_SECRET`
- **Google OAuth**: Create credentials at [console.cloud.google.com](https://console.cloud.google.com)
- **Facebook OAuth**: Create an app at [developers.facebook.com](https://developers.facebook.com)
- **Stripe**: Get keys from [dashboard.stripe.com](https://dashboard.stripe.com)

### 3. Set Up Database

```bash
# Push schema to your database
npm run db:push

# Or run migrations (preferred for production)
npm run db:migrate

# Seed initial data (admin user, categories, plans)
npm run db:seed

# Open Prisma Studio (optional, visual DB browser)
npm run db:studio
```

### 4. Set Up Stripe Products

In your Stripe dashboard, create:

**Membership Products:**
- Regular Membership → Monthly ($9.99/mo) and Annual ($99.99/yr)
- VIP Membership → Monthly ($24.99/mo) and Annual ($249.99/yr)

Copy each **Price ID** into your `.env.local`.

**Vendor Subscription:**
- Basic Vendor Plan → Monthly
- Pro Vendor Plan → Monthly

### 5. Set Up Stripe Webhook

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Admin login:** `admin@bestofpb.com` / `admin123!`

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, Register pages
│   ├── (dashboard)/      # User dashboard, profile, membership card
│   ├── (admin)/          # Admin panel
│   ├── api/
│   │   ├── auth/         # NextAuth handler
│   │   └── webhooks/
│   │       └── stripe/   # Stripe webhook handler
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Navbar, footer, providers
│   ├── auth/             # Login/register forms
│   ├── membership/       # Membership card, plans
│   └── vendor/           # Vendor directory, cards
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── db.ts             # Prisma client
│   ├── stripe.ts         # Stripe helpers
│   └── session.ts        # Auth guards & helpers
├── hooks/                # Custom React hooks
├── types/                # TypeScript declarations
└── styles/
prisma/
├── schema.prisma         # Full database schema
└── seed.ts               # Seed data
middleware.ts             # Route protection
```

---

## MVP Build Order

| Phase | Feature | Status |
|---|---|---|
| 1 | ✅ Project scaffold | Done |
| 2 | ✅ Database schema | Done |
| 3 | ✅ Auth (email + OAuth) | Done |
| 4 | ✅ Stripe webhooks | Done |
| 5 | 🔲 Login/Register UI | Next |
| 6 | 🔲 Membership plans page | Next |
| 7 | 🔲 Digital membership card | Next |
| 8 | 🔲 Vendor directory | Next |
| 9 | 🔲 Vendor profiles & deals | Next |
| 10 | 🔲 Events calendar | Next |
| 11 | 🔲 Packages marketplace | Next |
| 12 | 🔲 Nominations form | Next |
| 13 | 🔲 Admin dashboard | Next |

---

## Key Design Decisions

- **Supabase** instead of raw Postgres — gives you a DB, storage, and a nice web UI for free
- **NextAuth v4** over Clerk — more control, no vendor lock-in, free
- **Prisma** for type-safe DB access — schema-first, great DX
- **Single webhook handler** — all Stripe events flow through one endpoint, easy to extend
- **Role-based middleware** — all route protection happens at the edge, no per-page guards needed

---

## Commands Reference

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run db:push      # Sync schema without migrations
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio
```
