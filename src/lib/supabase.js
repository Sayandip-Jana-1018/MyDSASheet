import { createClient } from '@supabase/supabase-js'

let supabase = null

try {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
  } else {
    console.warn('[Supabase] Missing env vars - community features disabled')
  }
} catch (err) {
  console.error('[Supabase] Failed to initialize client:', err)
}

export { supabase }
