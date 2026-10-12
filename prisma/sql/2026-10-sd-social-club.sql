-- SD Social Club update (October 2026)
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.
-- It only ADDS things; it does not delete any existing data. Safe to run twice.

-- 1) Business plans
DO $$ BEGIN
  CREATE TYPE "BusinessPlan" AS ENUM ('FREE', 'STARTER', 'COMMUNITY', 'PREMIUM');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- 2) New business page fields
ALTER TABLE "vendors" ALTER COLUMN "userId" DROP NOT NULL;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "tagline"        TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "neighborhood"   TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "bookingUrl"     TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "reservationUrl" TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "orderUrl"       TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "mapsUrl"        TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "instagramPosts" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "guides"         TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "plan"           "BusinessPlan" NOT NULL DEFAULT 'FREE';
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "priority"       INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "foundingMember" BOOLEAN NOT NULL DEFAULT false;

-- 3) Directory categories (updates names/icons if they already exist)
INSERT INTO "categories" ("id", "name", "slug", "icon", "order", "createdAt") VALUES
  (gen_random_uuid()::text, 'SD Nights',      'sd-nights',      '🌙',  1, now()),
  (gen_random_uuid()::text, 'Get Outside',    'get-outside',    '🏄',  2, now()),
  (gen_random_uuid()::text, 'I''m Hungry',    'hungry',         '🍽️',  3, now()),
  (gen_random_uuid()::text, 'Drinks',         'drinks',         '🍹',  4, now()),
  (gen_random_uuid()::text, 'Healthy & Fit',  'fitness',        '💪',  5, now()),
  (gen_random_uuid()::text, 'Self Care',      'self-care',      '✨',  6, now()),
  (gen_random_uuid()::text, 'Services',       'services',       '🔧',  7, now()),
  (gen_random_uuid()::text, 'I Love My Pet',  'pets',           '🐾',  8, now()),
  (gen_random_uuid()::text, 'Cozy Stays',     'cozy-stays',     '🏨',  9, now()),
  (gen_random_uuid()::text, 'Event Planning', 'event-planning', '🎉', 10, now()),
  (gen_random_uuid()::text, 'Around Town',    'around-town',    '🗺️', 11, now()),
  (gen_random_uuid()::text, 'Apparel',        'apparel',        '👗', 12, now())
ON CONFLICT ("slug") DO UPDATE SET "name" = EXCLUDED."name", "icon" = EXCLUDED."icon", "order" = EXCLUDED."order";
