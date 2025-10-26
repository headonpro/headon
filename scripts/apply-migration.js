/**
 * Script to apply SQL migration to Supabase using PostgreSQL connection
 * Usage: node scripts/apply-migration.js
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

console.log('✨ Supabase Analytics Tables Migration\n')
console.log('📋 This script will create the following tables:')
console.log('   1. keyword_rankings')
console.log('   2. conversion_events')
console.log('   3. page_performance')
console.log('')

// Read the migration SQL file
const migrationPath = path.join(
  __dirname,
  '../supabase/migrations/20251012_create_analytics_tables.sql'
)
const sql = fs.readFileSync(migrationPath, 'utf-8')

console.log('📄 Migration SQL file loaded successfully')
console.log(`📊 SQL size: ${(sql.length / 1024).toFixed(2)} KB\n`)

console.log('⚠️  MANUAL EXECUTION REQUIRED:\n')
console.log("Since Supabase client doesn't support direct SQL execution,")
console.log('please follow these steps:\n')
console.log('1. Go to your Supabase Dashboard:')
console.log(
  `   ${supabaseUrl.replace('.supabase.co', '.supabase.co').replace('https://', 'https://app.supabase.com/project/')}/sql`
)
console.log('')
console.log('2. Create a new query')
console.log('')
console.log('3. Copy and paste the contents of:')
console.log(`   ${migrationPath}`)
console.log('')
console.log('4. Click "Run" to execute the migration')
console.log('')
console.log('Alternatively, the SQL has been prepared in the file above.')
console.log('Opening the SQL file location...\n')

// Open the directory containing the SQL file
const { exec } = require('child_process')
exec(
  `xdg-open "${path.dirname(migrationPath)}" 2>/dev/null || open "${path.dirname(migrationPath)}" 2>/dev/null || echo "Please navigate to: ${migrationPath}"`
)

console.log('✅ Ready for manual execution')
console.log('')
console.log('💡 After executing in Supabase SQL Editor, run:')
console.log('   node scripts/test-tables.js')
console.log('')
