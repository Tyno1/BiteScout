"use client";

import { motion } from "motion/react";
import Image from "next/image";
import img1 from "@/assets/hero/fabrizio-magoni-boaDpmC-_Xo-unsplash 2.jpg";

export function Hero() {
  return (
    <section className="w-full h-screen flex justify-center">
      <div className="relative w-full h-full flex flex-col justify-center text-white overflow-hidden">
        <Image
          src={img1}
          alt="Delicious local cuisine spread"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col items-start z-10 w-full md:w-[70%] md:ml-10 p-4">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2,
            }}
            className="font-black text-5xl md:text-7xl lg:text-8xl mb-4 leading-[1]"
          >
            Taste Your City&apos;s
            <br />
            Hidden Flavors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4,
            }}
            className="text-lg md:text-lg mb-6 max-w-2xl"
          >
            Embark on a culinary journey through your neighborhood. Discover mouthwatering dishes
            shared by food enthusiasts and local restaurants, brought to life by immersive
            AI-powered audio reviews.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6,
              }}
              aria-label="explore-local-flavors"
              className="border-2 bg-orange-600/70 border-orange-600 text-white focus:outline-none focus:ring-orange-900 focus:ring-2 focus:ring-offset-0 text-white px-3 md:px-6 py-3 rounded-md"
            >
              Explore Local Flavors
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.8,
              }}
              aria-label="listen-to-tasty-reviews"
              className="bg-transparent border-2 border-white hover:bg-orange-600/70 hover:border-orange-600 hover:text-white focus:outline-none focus:ring-orange-900 focus:ring-2 focus:ring-offset-0 text-white px-3 md:px-6 py-3 rounded-md"
            >
              Listen to Tasty Reviews
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
