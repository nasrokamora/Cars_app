import Image from "next/image";
import bmwPng from '@/public/all_image_cars/bmwPng.png'
import symbole from '@/public/all_image_cars/symboleCar.png'
import truckImage from '@/public/all_image_cars/trucksPng.png'
import motoPng from '@/public/all_image_cars/motoPng.png'
import busesImage from '@/public/all_image_cars/busesPng.png'

export const componentsLink: {
  title: string;
  href: string;
  description: string;
  image?: React.ReactNode;
}[] = [
  {
    title: "New Cars",
    href: "/new-cars",
    description: "Find the latest cars on the market",
    image: <Image src={bmwPng} alt="bmw" width={48} height={48} />,
  },
  {
    title: "Used Cars",
    href: "/used-cars",
    description: "Find the latest cars on the market",
    image: <Image src={symbole} alt="bmw" width={48} height={48} />,
  },
];

export const componentsVihicles: {
  title: string;
  href: string;
  description: string;
  image?: React.ReactNode;
}[] = [
  {
    title: "Trucks",
    href: "/trucks",
    description: "Find the latest trucks on the market",
    image: <Image src={truckImage} alt="bmw" width={48} height={48} />,
  },
  {
    title: "Motorcycles",
    href: "/motorcycles",
    description: "Find the latest motorcycles on the market",
    image: <Image src={motoPng} alt="bmw" width={48} height={48} />,
  },
  {
    title: "Buses",
    href: "/buses",
    description: "Find the latest buses on the market",
    image: <Image src={busesImage} alt="bmw" width={48} height={48} />,
  },
];
