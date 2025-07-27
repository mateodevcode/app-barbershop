"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const banners = [
  {
    imagen: "/banner-promocional/banner-1.png",
    buttonText: "Reservar ahora",
  },
  {
    imagen: "/banner-promocional/banner-2.png",
    buttonText: "Ver más",
  },
];

export default function BannerPromocional() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 w-full">
      <h2 className="italic font-sans text-lg">Blessed by God</h2>
      <div className="w-full bg-gradient-to-r h-72 rounded-lg flex items-center justify-between relative shadow-lg overflow-hidden transition-all duration-700">
        <div className="h-full w-full relative">
          <Image
            src={banners[index].imagen}
            alt={`Banner ${index + 1}`}
            width={500}
            height={200}
            priority
            className="w-full absolute right-0 top-0 transition-all duration-500"
          />

          <button className="absolute bottom-6 md:bottom-12 left-10 md:left-32 text-xs bg-blue-800/80 rounded-full px-4 py-2 text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer select-none active:scale-95">
            {banners[index].buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
