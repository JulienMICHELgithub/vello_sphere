'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/app/lib/supabaseClient'
import { CarouselComponent } from './carousel'

type Bike = {
    id: number
    nom: string
    created_at: string
}

export default function MyBikes() {
    const [bikes, setBikes] = useState<Bike[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBikes = async () => {
            const supabase = getSupabaseClient()

            const sessionRes = await supabase.auth.getSession()
            const user = sessionRes.data.session?.user

            if (!user) {
                setLoading(false)
                return
            }

            const { data, error } = await supabase
                .from('bike')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Erreur chargement des bikes :', error.message)
            } else {
                setBikes(data as Bike[])
            }

            setLoading(false)
        }

        fetchBikes()
    }, [])

    if (loading) return <p>Chargement...</p>

    return (
        <div className="p-4">

            <CarouselComponent />

            <h1 className="text-2xl text-white font-semibold mb-4">Mes vélos</h1>
            {bikes.length === 0 ? (
                <p>Vous n’avez pas encore de vélo.</p>
            ) : (
                <ul className="space-y-2">
                    {bikes.map(bike => (
                        <li key={bike.id} className="border p-2 rounded">
                            🚲 {bike.nom}{' '}
                            <span className="text-gray-400 text-sm">({bike.created_at})</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
