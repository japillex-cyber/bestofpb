-- Adds two columns the code expects but the original database was created without.
-- Run once in Supabase → SQL Editor. Safe to run twice.
ALTER TABLE "vendors" ADD COLUMN IF NOT EXISTS "state" TEXT;
ALTER TABLE "events"  ADD COLUMN IF NOT EXISTS "source" "EventSource" NOT NULL DEFAULT 'ADMIN';
