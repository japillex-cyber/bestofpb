-- Adds what the code expects but the original database was created without.
-- Run once in Supabase → SQL Editor. Safe to run more than once.
DO $$ BEGIN
  CREATE TYPE "EventSource" AS ENUM ('ADMIN', 'VENDOR', 'PUBLIC');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "state" TEXT;
ALTER TABLE "events"  ADD COLUMN IF NOT EXISTS "source" "EventSource" NOT NULL DEFAULT 'ADMIN';
