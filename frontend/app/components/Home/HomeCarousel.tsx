import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"





export default function HomeCarousel() {
    return (
        <div className="w-full flex justify-center items-center">
            <Carousel opts={{
                align: 'start',
                loop: true,
            }} className="w-full max-w-4xl ">
                <CarouselContent>
                    {Array.from({ length: 10 }).map((_, index) => (

                        <CarouselItem key={index} className="xs:basis-1/2 md:basis-1/3 lg:basis-1/3 basis-1/6">
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}

                </CarouselContent>
                <div className="flex xs:hidden">
                <CarouselPrevious />
                <CarouselNext />

                </div>
            </Carousel>
        </div>
    )
}