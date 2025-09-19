import Image from "next/image";
import { Button } from "@/components/ui/button";
import imageHeroCar from '@/public/all_image_cars/hero_section_model.png'


export default function Home() {
  return (
    <main className="relative bg-gradient-to-br from-[#0d1b2a] via-[#1b263b] to-[#415a77] text-white overflow-hidden -z-0 h-auto">
      <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row items-center">
        
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
            Find your <span className="text-blue-400">dream car</span> with ease
          </h1>
          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            Browse new & used cars, compare models, and make smarter choices.  
            Start your journey today!
          </p>

          <div className="flex gap-4 justify-center lg:justify-start">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
              Search Cars
            </Button>
            <Button variant="outline" className="border-white text-white px-6 py-3 rounded-lg">
              Compare Now
            </Button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 mt-10 lg:mt-0 lg:ml-10">
          <Image
            src={imageHeroCar}
            alt="Sports Car"
            width={600}
            height={undefined}
            className="drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </main>


  );
}
