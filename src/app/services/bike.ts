import { supabase } from '@/app/lib/supabaseClient'

export type Bike = {
    id: number
    name: string
    type_id: number | null
    created_at: string
}

export type NewBike = {
    name: string
    type_id?: number | null
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

export async function createBike(input: NewBike): Promise<Bike> {
    const { data: sess } = await supabase.auth.getSession()
    const user = sess.session?.user
    if (!user) throw new Error('Vous devez être connecté.')

    const payload = {
        user_id: user.id,
        name: input.name,
        type_id: input.type_id,
    }

    const { data, error } = await supabase
        .from('bike')
        .insert(payload)
        .select('id, name, type_id, created_at')
        .single()

    if (error) throw new Error(error.message)
    return data as Bike
}

/** (Optionnel) Pour alimenter un Select de types */
export type BikeType = { id: number; name: string }
export async function listBikeTypes(): Promise<BikeType[]> {
    const { data, error } = await supabase
        .from('bike_type')
        .select('id, name')
        .order('name', { ascending: true })

    if (error) throw new Error(error.message)
    return data ?? []
}
