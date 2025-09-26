import Image from "next/image"
import bmwPng from '@/public/all_image_cars/bmwPng.png'
import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

let TestLIst: { id: number, image: React.ReactNode, name: string }[] = []





TestLIst = [
    {
        id: 1,
        image: <Image src={bmwPng} alt="bmw" width={48} height={48} />,
        name: 'BMW',
    },
    {
        id: 2,
        image: <Image src={bmwPng} alt="bmw" width={48} height={48} />,
        name: 'BMW',
    },
    {
        id: 3,
        image: <Image src={bmwPng} alt="bmw" width={48} height={48} />,
        name: 'BMW',
    }
];





export default function CarouselTest() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="w-full max-w-sm bg-gray-950 text-white"
        >
            <CarouselContent>
                {TestLIst.map((_item) => (
                    <CarouselItem key={_item.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card>
                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                    {_item.image}
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}