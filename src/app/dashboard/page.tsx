'use client'

import { CarouselComponent } from './carousel'

type Bike = {
    id: number
    nom: string
    type_id: number | null
    created_at: string
}

export default function MyBikes() {

    return (
        <div className="p-4">

            <CarouselComponent />

        </div>
    )
}
