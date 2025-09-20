"use client";


import Image from "next/image";
import React, { useEffect } from "react";
import symboleCar from '@/public/all_image_cars/symboleCar.png';
import busesPng from '@/public/all_image_cars/busesPng.png';
import truck_png from '@/public/all_image_cars/truck_png.png';
import pp from '@/public/all_image_cars/207_png.png';


const imageAnimate = [
    pp,
    symboleCar,
    busesPng,
    truck_png
]




export default function ImageAnimateHome() {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageAnimate.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [])



    return (
        <>

            <Image
                src={imageAnimate[currentIndex]}
                alt="Sports Car"
                width={600}
                height={undefined}
                className={`drop-shadow-2xl ${currentIndex === 0 ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000 ease-in-out`}
                priority
            />
        </>
    )
}