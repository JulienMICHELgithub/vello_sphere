'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabaseClient'

export function useRedirectIfAuthed(redirectTo = '/dashboard') {
    const router = useRouter()

    useEffect(() => {
        let cancelled = false

        supabase.auth.getSession().then(({ data }) => {
            if (!cancelled && data.session) router.replace(redirectTo)
        })

        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!cancelled && session) router.replace(redirectTo)
        })

        return () => {
            cancelled = true
            sub?.subscription?.unsubscribe?.()
        }
    }, [redirectTo, router])
}
