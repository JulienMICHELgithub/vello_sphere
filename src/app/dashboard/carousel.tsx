'use client'

import * as React from 'react'
import type { Bike } from '@/app/services/bike'
import { Card, CardContent } from '@/components/ui/card'
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
} from '@/components/ui/carousel'

type Props = { bikes: Bike[] }

export function CarouselComponent({ bikes }: Props) {
    if (!bikes.length) {
        return <div className="px-12 py-8 text-sm text-gray-500">Aucun vélo pour le moment.</div>
    }

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
            <CarouselPrevious aria-label="Précédent" className="left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext aria-label="Suivant" className="right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
    )
}
