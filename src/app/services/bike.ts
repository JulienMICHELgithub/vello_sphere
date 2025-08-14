import { supabase } from '@/app/lib/supabaseClient'

export type Bike = {
    id: number
    name: string
    type_id: number | null
    created_at: string
}

export async function listUserBikes(): Promise<Bike[]> {
    const { data, error, status } = await supabase
        .from('bike')
        .select('id, name, type_id, created_at')
        .order('created_at', { ascending: false })

    if (error) {
        if (status === 401 || status === 403) return []
        throw error
    }
    return data ?? []
}
