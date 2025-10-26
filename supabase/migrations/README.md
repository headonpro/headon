# Supabase Analytics Tables Migration

## Overview

This directory contains the SQL migration for creating analytics tables needed for the SEO/GEO strategy implementation.

## Tables Created

1. **keyword_rankings** - Tracks keyword ranking positions over time
2. **conversion_events** - Tracks user conversion events and interactions
3. **page_performance** - Tracks Core Web Vitals and performance metrics

## Migration File

- **File**: `20251012_create_analytics_tables.sql`
- **Date**: 2025-10-12
- **Purpose**: Setup database tables for keyword rankings, conversion events, and page performance tracking

## How to Apply the Migration

### Option 1: Supabase SQL Editor (Recommended)

1. Open the Supabase SQL Editor:

   ```
   https://supabase.com/dashboard/project/rvzksxbjzqouvobwwwcq/sql/new
   ```

2. Copy the entire content of `20251012_create_analytics_tables.sql`

3. Paste it into the SQL Editor

4. Click "Run" to execute the migration

5. Verify the tables were created by running:
   ```bash
   node scripts/setup-analytics-tables.js
   ```

### Option 2: Command Line (Using psql)

If you have the PostgreSQL connection string:

```bash
psql "postgresql://postgres.[PROJECT_REF]:[PASSWORD]@[HOST]:5432/postgres" < supabase/migrations/20251012_create_analytics_tables.sql
```

## Verification

After applying the migration, run the setup script to verify:

```bash
node scripts/setup-analytics-tables.js
```

Expected output:

```
✅ keyword_rankings - Table exists and is accessible
✅ conversion_events - Table exists and is accessible
✅ page_performance - Table exists and is accessible
```

## Testing

Run the test script to verify inserts work correctly:

```bash
node scripts/test-analytics-inserts.js
```

This will:

- Insert test data into each table
- Query the data back to verify it worked
- Display sample records from each table

## Schema Details

### keyword_rankings

| Column        | Type        | Description                         |
| ------------- | ----------- | ----------------------------------- |
| id            | UUID        | Primary key                         |
| keyword       | TEXT        | The keyword being tracked           |
| position      | INTEGER     | Search engine ranking (1-100)       |
| url           | TEXT        | URL appearing in search results     |
| search_volume | INTEGER     | Monthly search volume               |
| competition   | TEXT        | Competition level (low/medium/high) |
| category      | TEXT        | Keyword category                    |
| tracked_at    | TIMESTAMPTZ | When the ranking was recorded       |
| created_at    | TIMESTAMPTZ | Record creation time                |

**Indexes:**

- `idx_keyword_rankings_keyword` on keyword
- `idx_keyword_rankings_tracked_at` on tracked_at DESC
- `idx_keyword_rankings_category` on category

### conversion_events

| Column         | Type        | Description                                       |
| -------------- | ----------- | ------------------------------------------------- |
| id             | UUID        | Primary key                                       |
| event_type     | TEXT        | Event type (contact_form, fastlane_inquiry, etc.) |
| source_url     | TEXT        | Page URL where conversion occurred                |
| source_keyword | TEXT        | Keyword that brought the user                     |
| utm_source     | TEXT        | UTM source parameter                              |
| utm_medium     | TEXT        | UTM medium parameter                              |
| utm_campaign   | TEXT        | UTM campaign parameter                            |
| user_agent     | TEXT        | User agent string                                 |
| metadata       | JSONB       | Additional event metadata                         |
| created_at     | TIMESTAMPTZ | Event timestamp                                   |

**Indexes:**

- `idx_conversion_events_type` on event_type
- `idx_conversion_events_created_at` on created_at DESC
- `idx_conversion_events_source_keyword` on source_keyword
- `idx_conversion_events_source_url` on source_url

### page_performance

| Column          | Type        | Description                         |
| --------------- | ----------- | ----------------------------------- |
| id              | UUID        | Primary key                         |
| metric_name     | TEXT        | Metric name (LCP, FID, CLS, etc.)   |
| metric_value    | NUMERIC     | Numeric value of the metric         |
| page_url        | TEXT        | URL of the page measured            |
| user_agent      | TEXT        | User agent string                   |
| device_type     | TEXT        | Device type (mobile/tablet/desktop) |
| connection_type | TEXT        | Connection type                     |
| created_at      | TIMESTAMPTZ | Measurement timestamp               |

**Indexes:**

- `idx_page_performance_metric_name` on metric_name
- `idx_page_performance_page_url` on page_url
- `idx_page_performance_created_at` on created_at DESC
- `idx_page_performance_metric_page` on (metric_name, page_url)

## Row Level Security (RLS)

All tables have RLS enabled with the following policies:

### For authenticated users:

- ✅ Can INSERT records
- ✅ Can SELECT (read) records

### For anonymous users (anon role):

- ✅ Can INSERT into conversion_events (for public tracking)
- ✅ Can INSERT into page_performance (for public tracking)
- ❌ Cannot INSERT into keyword_rankings (admin only)

### For service role:

- ✅ Full access (SELECT, INSERT, UPDATE, DELETE) to all tables

## Next Steps

After the migration is complete:

1. ✅ Verify tables exist: `node scripts/setup-analytics-tables.js`
2. ✅ Test inserts: `node scripts/test-analytics-inserts.js`
3. ⏭️ Implement `lib/analytics/tracker.ts` (Task 43)
4. ⏭️ Create analytics components (Task 44)
5. ⏭️ Integrate with landing pages

## Troubleshooting

### Tables already exist error

If you see "relation already exists" errors, this is normal. The SQL uses `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS` so it's safe to run multiple times.

### Permission denied errors

Make sure you're logged in to Supabase with the correct account and have admin access to the project.

### RLS policy errors

If you get RLS policy errors when testing, verify that:

1. RLS is enabled on all tables
2. The correct policies were created
3. You're using the service role key for admin operations

## Related Files

- **Migration SQL**: `supabase/migrations/20251012_create_analytics_tables.sql`
- **Setup Script**: `scripts/setup-analytics-tables.js`
- **Test Script**: `scripts/test-analytics-inserts.js`
- **Design Spec**: `.spec-workflow/specs/seo-geo-strategy/design.md`
- **Tasks**: `.spec-workflow/specs/seo-geo-strategy/tasks.md` (Task #42)

## Support

If you encounter issues:

1. Check the Supabase Dashboard logs
2. Verify your service role key in `.env.local`
3. Ensure you have the latest schema changes
4. Consult the design.md for schema requirements
