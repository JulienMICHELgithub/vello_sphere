import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

declare global {
    var __supabase__: SupabaseClient | undefined
}

export const supabase: SupabaseClient =
    globalThis.__supabase__ ??
    createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            storageKey: 'sb-myapp-auth',
        },
    })

if (process.env.NODE_ENV !== 'production') {
    globalThis.__supabase__ = supabase
}
