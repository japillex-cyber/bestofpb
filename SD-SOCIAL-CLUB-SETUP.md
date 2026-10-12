# SD Social Club update — setup steps

## 1. Update the database (once)
Supabase → SQL Editor → New query → paste `prisma/sql/2026-10-sd-social-club.sql` → Run.
It only adds columns and categories; nothing is deleted. Do this **before** deploying.

## 2. Stripe (when ready to take payments)
Until these are set, paid buttons show the "Payments are almost ready" page and free sign-up still works.

Vercel → Project → Settings → Environment Variables:

| Name | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` (test) or `sk_live_…` (live) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from the webhook below |
| `NEXT_PUBLIC_APP_URL` | `https://bestofpb.com` (or the Vercel URL) |

Optional:
- `NEXT_PUBLIC_MEMBER_TRIAL_DAYS` — free days for members (default `90`)
- `NEXT_PUBLIC_BUSINESS_TRIAL_DAYS` — free days for businesses (default `0`; set `30` for "first month free")
- `FOUNDING_PRICING_OPEN` — set to `false` to stop giving new businesses the Founding Partner badge

No products or prices need to be created in Stripe — the site charges $10 / $25 / $99 / $175 / $275 monthly directly.

Stripe dashboard:
1. Developers → Webhooks → Add endpoint → `https://<your-site>/api/webhooks/stripe`
   Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
2. Settings → Billing → Customer portal → turn it on (this powers "Billing & cancel").

## 3. Adding businesses
Admin → Businesses → Add business. A business shows publicly only when its plan is Starter or higher and status is Active.
Paste Instagram post/reel links (one per line) in "Instagram posts we've made for them".
Businesses can also sign up themselves (free), then pick a plan from **My Business**; paying puts them live automatically.

## 4. Blog
Admin → Blog → New post. Paste an Instagram post link on its own line to show the post inside the article.
