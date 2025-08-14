'use client'

import * as React from 'react'
import { useUserBikes } from '@/app/hooks/useUserBikes'

import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'

export function CarouselComponent() {
    const { data: bikes, isLoading, error } = useUserBikes()

    if (isLoading) return <div className="px-12 py-8 text-sm text-gray-500">Chargement…</div>
    if (error)     return <div className="px-12 py-8 text-sm text-red-600">{error}</div>
    if (!bikes.length) return <div className="px-12 py-8 text-sm text-gray-500">Aucun vélo pour le moment.</div>

    return (
        <Carousel opts={{ align: 'start', loop: true }} className="w-full px-12">
            <CarouselContent>
                {bikes.map((bike, index) => (
                    <CarouselItem key={bike.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex items-center justify-center p-6 h-48 md:h-56 lg:h-25">
                                    <div className="text-center">
                                        <div className="text-3xl font-semibold">{index + 1}</div>
                                        <div className="mt-2 text-sm opacity-75">{bike.name ?? 'Vélo'}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
    )
}
