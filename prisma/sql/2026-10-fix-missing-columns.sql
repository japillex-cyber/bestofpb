-- Adds what the code expects but the original database was created without.
-- Run once in Supabase → SQL Editor. Safe to run more than once.
DO $$ BEGIN
  CREATE TYPE "EventSource" AS ENUM ('ADMIN', 'VENDOR', 'PUBLIC');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "state" TEXT;
ALTER TABLE "events"  ADD COLUMN IF NOT EXISTS "source" "EventSource" NOT NULL DEFAULT 'ADMIN';

-- Second batch found by /api/health
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "zip" TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "facebookUrl" TEXT;
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "subscriptionPlanId" TEXT;

ALTER TYPE "MembershipStatus" ADD VALUE IF NOT EXISTS 'TRIALING';
ALTER TYPE "EventStatus"      ADD VALUE IF NOT EXISTS 'CANCELLED';
ALTER TYPE "NominationStatus" ADD VALUE IF NOT EXISTS 'REJECTED';

DO $$ BEGIN
  CREATE TYPE "OrderItemType" AS ENUM ('MEMBERSHIP', 'PACKAGE', 'GIFT_MEMBERSHIP');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;
