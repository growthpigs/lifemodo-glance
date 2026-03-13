import { createClient } from '@supabase/supabase-js'

// Add your Supabase credentials to .env.local:
// NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface HealthContext {
  id: string
  user_id: string
  hrv_ms: number | null
  sleep_hours: number | null
  resting_hr: number | null
  step_count: number | null
  readiness_pct: number | null
  wine_glasses_today: number | null
  wine_glasses_week: number | null
  last_updated: string
}

export const FALLBACK_DATA: HealthContext = {
  id: 'fallback',
  user_id: 'roderic',
  hrv_ms: 58,
  sleep_hours: 7.2,
  resting_hr: 62,
  step_count: 4821,
  readiness_pct: 89,
  wine_glasses_today: 1,
  wine_glasses_week: 2,
  last_updated: new Date().toISOString(),
}

export async function getHealthContext(): Promise<HealthContext> {
  try {
    const { data, error } = await supabase
      .from('health_context')
      .select('*')
      .eq('user_id', 'roderic')
      .order('last_updated', { ascending: false })
      .limit(1)
      .single()

    if (error || !data) {
      console.warn('Using fallback health data:', error?.message)
      return FALLBACK_DATA
    }

    return data as HealthContext
  } catch {
    return FALLBACK_DATA
  }
}
