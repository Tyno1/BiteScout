import Image from "next/image";
import React from "react";
import RestImg from "@/assets/hero/mgg-vitchakorn-DDn9I5V1ubE-unsplash.jpg";

export default function PopularDestinations() {
  return (
    <section className="w-screen py-20 flex justify-center">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-4">Popular Destinations</h2>
        <p className="text-gray-600 mb-16 text-center max-w-2xl">
          Explore the most sought-after dining experiences in your area,
          carefully curated by our community of food enthusiasts
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative group cursor-pointer">
              <div className="relative h-80 w-full rounded-xl overflow-hidden">
                <Image
                  src={RestImg}
                  alt={`Restaurant ${item}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  Restaurant Name {item}
                </h3>
                <p className="text-sm opacity-90">
                  Location • $$$ • Cuisine Type
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
