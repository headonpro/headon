# Supabase Migrations

## Calculator Leads Schema

### Files

- `migrations/20251120_calculator_leads_schema.sql` - Main migration for calculator feature

### How to Apply Migration

#### Option 1: Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy the contents of `20251120_calculator_leads_schema.sql`
5. Execute the SQL
6. Verify tables were created in **Database** → **Tables**

#### Option 2: Supabase CLI

```bash
# Link to your project (if not already linked)
supabase link --project-ref YOUR_PROJECT_REF

# Apply migration
supabase db push

# Or run the specific migration file
psql $DATABASE_URL -f supabase/migrations/20251120_calculator_leads_schema.sql
```

### Schema Overview

#### Tables Created

1. **calculator_leads** - Main table for lead submissions
   - Stores contact info (name, email, phone, company, message)
   - Complete calculator state (JSONB)
   - 3-way comparison result (JSONB)
   - Lead scoring and estimated value
   - UTM tracking fields
   - Status tracking (new, contacted, qualified, converted, lost)

2. **calculator_sessions** (Optional) - Anonymous session tracking
   - Session ID for URL sharing
   - Progress tracking
   - Auto-cleanup after 30 days

#### Indexes Created

Performance indexes on:
- `email` - Fast lead lookup
- `created_at` - Chronological queries
- `status` - Filter by status
- `lead_score` - Sort by quality
- `preferred_provider` - Filter by provider choice
- `session_id` - Session lookup
- `expires_at` - Cleanup queries

#### Row Level Security (RLS)

- ✅ RLS enabled on `calculator_leads`
- 🔒 Only service role can access (backend API only)
- 🚫 No public access (prevents direct client queries)

### Verification

After applying the migration, verify:

```sql
-- Check tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name LIKE 'calculator_%';

-- Check indexes
SELECT indexname FROM pg_indexes
WHERE tablename LIKE 'calculator_%';

-- Check RLS policies
SELECT tablename, policyname FROM pg_policies
WHERE tablename LIKE 'calculator_%';

-- Test insert (should work with service role key)
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
);
```

### Rollback (if needed)

```sql
-- Drop tables and policies
DROP TABLE IF EXISTS calculator_sessions CASCADE;
DROP TABLE IF EXISTS calculator_leads CASCADE;
DROP FUNCTION IF EXISTS delete_expired_calculator_sessions();
```

### Environment Variables

Ensure your `.env.local` has the Supabase service role key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Required for API routes
```

### Security Notes

⚠️ **Important Security Considerations:**

1. **Never use the anon key** for calculator_leads operations
2. **Always use service role key** in API routes only (never expose to client)
3. **RLS policies prevent direct client access** - all operations must go through `/api/calculator`
4. **Email validation** enforced at database level with CHECK constraint
5. **ENUM constraints** on status and preferred_provider prevent invalid data

### Data Model

```typescript
// TypeScript interfaces match database schema
interface CalculatorLead {
  id: string
  created_at: string
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  calculator_data: CalculatorState  // JSONB
  comparison_result: ComparisonResult  // JSONB
  preferred_provider: 'freelancer' | 'agency' | 'headon'
  lead_score?: number
  estimated_value?: number  // cents
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
  user_agent?: string
}
```

### Next Steps

After applying migration:
1. ✅ Verify tables created
2. ✅ Test RLS policies
3. ✅ Implement API route (`app/api/calculator/route.ts`)
4. ✅ Test lead submission end-to-end
5. ✅ Set up monitoring/alerts for new leads
