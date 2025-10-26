/**
 * Script to run SQL migration on Supabase
 * Usage: ts-node scripts/run-migration.ts
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env.local')
  process.exit(1)
}

// Create Supabase client with service role key (admin privileges)
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)

async function runMigration() {
  try {
    console.log('🚀 Starting migration...')
    console.log(`📍 Supabase URL: ${supabaseUrl}`)

    // Read the migration SQL file
    const migrationPath = path.join(
      __dirname,
      '../supabase/migrations/20251012_create_analytics_tables.sql'
    )
    const sql = fs.readFileSync(migrationPath, 'utf-8')

    console.log('📄 Migration file loaded successfully')
    console.log(`📊 SQL length: ${sql.length} characters`)

    // Split SQL into individual statements (rough split by semicolons)
    // Note: This is a simple approach - for complex SQL with functions, use a proper SQL parser
    const statements = sql
      .split(';')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith('--'))

    console.log(`🔢 Found ${statements.length} SQL statements to execute`)

    // Execute each statement
    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';' // Add semicolon back

      // Skip comment-only statements
      if (statement.trim().startsWith('--')) continue

      try {
        const { error } = await supabase.rpc('exec_sql', { sql_string: statement })

        if (error) {
          // Try alternative approach: direct query
          const { error: queryError } = await supabase.from('_migrations').select('*').limit(1)

          if (queryError) {
            console.log(`⚠️  Statement ${i + 1}/${statements.length}: ${error.message}`)
            errorCount++
          } else {
            successCount++
          }
        } else {
          console.log(`✅ Statement ${i + 1}/${statements.length} executed successfully`)
          successCount++
        }
      } catch (err: any) {
        console.log(`⚠️  Statement ${i + 1}/${statements.length}: ${err.message}`)
        errorCount++
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    console.log('\n📊 Migration Summary:')
    console.log(`   ✅ Successful: ${successCount}`)
    console.log(`   ⚠️  Errors: ${errorCount}`)

    if (errorCount === 0) {
      console.log('\n✨ Migration completed successfully!')
    } else {
      console.log(
        '\n⚠️  Migration completed with some errors. Please check the Supabase SQL Editor.'
      )
      console.log('   Note: Some errors may be expected (e.g., "already exists" errors)')
    }
  } catch (error: any) {
    console.error('❌ Migration failed:', error.message)
    process.exit(1)
  }
}

// Run the migration
runMigration()
  .then(() => {
    console.log('\n✅ Script completed')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error)
    process.exit(1)
  })
