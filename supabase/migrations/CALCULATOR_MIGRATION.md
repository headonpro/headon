# Calculator Leads Migration Guide

## Migration File

`20251120_calculator_leads_schema.sql`

## Overview

This migration creates the database schema for the Kostenrechner (Cost Calculator) feature, including:
- `calculator_leads` table for storing lead submissions
- `calculator_sessions` table for anonymous session tracking (optional)
- Indexes for performance optimization
- Row Level Security (RLS) policies

## How to Apply

### Option 1: Supabase Dashboard (Recommended)

1. Open your Supabase project dashboard
2. Go to **SQL Editor**
3. Create a new query
4. Copy entire contents of `20251120_calculator_leads_schema.sql`
5. Click **Run** to execute
6. Verify success in **Database** → **Tables**

### Option 2: Supabase CLI

```bash
supabase db push
```

Or directly with psql:
```bash
psql $DATABASE_URL -f supabase/migrations/20251120_calculator_leads_schema.sql
```

## Schema Details

### calculator_leads Table

Primary table for storing lead submissions from the cost calculator.

**Columns:**
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `name`, `email`, `phone`, `company`, `message` (Contact info)
- `calculator_data` (JSONB) - Complete calculator state
- `comparison_result` (JSONB) - 3-way provider comparison
- `preferred_provider` (ENUM: freelancer/agency/headon)
- `lead_score` (Integer) - Quality score
- `estimated_value` (Integer) - Project value in cents
- `status` (ENUM: new/contacted/qualified/converted/lost)
- `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `user_agent` (Tracking)

**Indexes:**
- `idx_calculator_leads_email` - Fast email lookup
- `idx_calculator_leads_created_at` - Chronological sorting
- `idx_calculator_leads_status` - Status filtering
- `idx_calculator_leads_lead_score` - Quality sorting
- `idx_calculator_leads_preferred_provider` - Provider filtering

**Security:**
- ✅ RLS enabled
- 🔒 Only service role can access
- 🚫 No public/anon access

### calculator_sessions Table (Optional)

Anonymous session tracking for analytics and URL sharing.

**Columns:**
- `id` (UUID, Primary Key)
- `session_id` (TEXT, Unique) - For URL sharing
- `calculator_data`, `comparison_result` (JSONB)
- `completed` (Boolean), `step_reached` (Integer)
- `expires_at` (Timestamp) - Auto-cleanup after 30 days

**Auto-cleanup:**
- Function `delete_expired_calculator_sessions()` removes expired sessions

## Verification Queries

After migration, run these queries to verify:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'calculator_%';

-- Expected: calculator_leads, calculator_sessions

-- Check indexes
SELECT indexname, tablename FROM pg_indexes
WHERE tablename LIKE 'calculator_%'
ORDER BY tablename, indexname;

-- Expected: 8 indexes total

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables
WHERE tablename LIKE 'calculator_%';

-- Expected: rowsecurity = true for calculator_leads

-- Check policies
SELECT tablename, policyname, cmd FROM pg_policies
WHERE tablename LIKE 'calculator_%';

-- Expected: "Service role can access all calculator_leads" policy

-- Test insert (requires service role key)
INSERT INTO calculator_leads (
  name,
  email,
  calculator_data,
  comparison_result,
  preferred_provider
) VALUES (
  'Test User',
  'test@example.com',
  '{"projectType": "web-app", "currentStep": 6}'::jsonb,
  '{"freelancer": {}, "agency": {}, "headon": {}}'::jsonb,
  'headon'
) RETURNING id;

-- Should succeed with service role, fail with anon key
```

## Security Configuration

### Required Environment Variables

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # ⚠️ Backend only!
```

### API Route Pattern

```typescript
// app/api/calculator/route.ts
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // ⚠️ Use service role key
)

// Insert lead
const { data, error } = await supabase
  .from('calculator_leads')
  .insert({
    name: 'John Doe',
    email: 'john@example.com',
    calculator_data: calculatorState,
    comparison_result: comparisonResult,
    preferred_provider: 'headon',
    lead_score: 45,
    estimated_value: 1250000, // 12500 EUR in cents
    status: 'new'
  })
```

## Rollback Instructions

If you need to remove the calculator tables:

```sql
-- Drop in reverse order of dependencies
DROP TABLE IF EXISTS calculator_sessions CASCADE;
DROP TABLE IF EXISTS calculator_leads CASCADE;
DROP FUNCTION IF EXISTS delete_expired_calculator_sessions();
```

## Next Steps

1. ✅ Apply migration in Supabase Dashboard
2. ✅ Verify tables and indexes created
3. ✅ Test RLS policies with service role key
4. ✅ Implement API route (`app/api/calculator/route.ts`)
5. ✅ Test end-to-end lead submission
6. ✅ Set up email notifications for new leads
7. ✅ Configure monitoring/alerts

## Troubleshooting

### "relation calculator_leads does not exist"
- Migration not applied yet. Run the SQL in Supabase Dashboard.

### "permission denied for table calculator_leads"
- Using anon key instead of service role key. Check API route uses `SUPABASE_SERVICE_ROLE_KEY`.

### "new row violates check constraint"
- Invalid enum value for `status` or `preferred_provider`. Check allowed values.

### JSONB validation errors
- Ensure `calculator_data` and `comparison_result` are valid JSON objects.
