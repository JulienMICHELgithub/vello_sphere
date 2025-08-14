'use client'

import { useEffect, useState } from 'react'
import { listUserBikes, type Bike } from '@/app/services/bike'
import { supabase } from '@/app/lib/supabaseClient'

export function useUserBikes() {
    const [data, setData] = useState<Bike[]>([])
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    async function fetchOnce() {

        setLoading(true)
        try {
            const { data: sessionData } = await supabase.auth.getSession()
            if (!sessionData.session) {
                setData([])
                setError(null)
                return
            }
            const bikes = await listUserBikes()
            setData(bikes)
            setError(null)
        } catch (e: any) {
            setError(e?.message ?? 'Erreur inconnue')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let cancelled = false
        fetchOnce()

        const { data: sub } = supabase.auth.onAuthStateChange(() => {
            if (!cancelled) fetchOnce()
        })

        return () => {
            cancelled = true
            sub?.subscription?.unsubscribe?.()
        }
    }, [])

    return { data, isLoading, error, refetch: fetchOnce }
}
