'use client'
import { useState } from 'react'
import { createBike, type NewBike, type Bike } from '@/app/services/bike'

export function useCreateBike() {
    const [isCreating, setCreating] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const mutate = async (values: NewBike): Promise<Bike | null> => {
        setCreating(true)
        setError(null)
        try {
            const bike = await createBike(values)
            return bike
        } catch (e: any) {
            setError(e?.message ?? 'Erreur lors de la création')
            return null
        } finally {
            setCreating(false)
        }
    }

    return { mutate, isCreating, error }
}
