'use client'

import { NavigationBar } from './navbar'
import AddBikeButton from './add_bike_button'
import { CarouselComponent } from './carousel'
import { useUserBikes } from '@/app/hooks/useUserBikes'
import { Separator } from "@/components/ui/separator"

export default function MyBikes() {
    const { data: bikes, isLoading, error, refetch } = useUserBikes()

    return (
        <div className="p-4 space-y-6">
            <div className="space-y-1">
                <NavigationBar />
                <Separator className="mx-auto h-px w-1/2" />
            </div>

            <div className="grid grid-cols-3 items-center">
                <div />
                <h1 className="justify-self-center text-xl font-semibold text-white">Garage</h1>
                <div className="justify-self-end">
                    <AddBikeButton onCreated={refetch} />
                </div>
            </div>


            {isLoading && (
                <div className="px-12 py-8 text-sm text-gray-500">Chargement…</div>
            )}

            {error && (
                <div className="px-12 py-8 text-sm text-red-600">{error}</div>
            )}

            {!isLoading && !error && (
                bikes.length ? (
                    <CarouselComponent bikes={bikes} />
                ) : (
                    <div className="px-12 py-8 text-sm text-gray-500">
                        Aucun vélo pour le moment.
                    </div>
                )
            )}
        </div>
    )
}
