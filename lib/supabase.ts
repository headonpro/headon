import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Provide fallback values for build time
  // These will be replaced with actual values at runtime
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client for build time
    // This prevents build errors when env vars are not available
    console.warn('Supabase environment variables not found. Using placeholder values for build.')
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}