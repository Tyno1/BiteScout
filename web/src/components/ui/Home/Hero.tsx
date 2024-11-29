"use client";
import React from "react";
import Image from "next/image";
import img1 from "@/assets/hero/lum3n-cHc5H3_FKhs-unsplash.jpg";
import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="w-screen h-screen flex justify-center">
      <div className="relative w-[95%] h-[85%] flex flex-col justify-center text-white rounded-3xl overflow-hidden">
        <Image
          src={img1}
          alt="Delicious local cuisine spread"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative flex flex-col items-start z-10 w-full md:w-[60%] md:ml-10 p-4">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 1, type: "spring", bounce: 0.6 }}
            className="font-black text-6xl md:text-7xl lg:text-8xl mb-4 leading-tight"
          >
            Taste Your City's
            <br />
            Hidden Flavors
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ delay: 0.1, duration: 1, ease: "easeInOut" }}
            className="text-lg md:text-lg mb-6 max-w-2xl "
          >
            Embark on a culinary journey through your neighborhood. Discover
            mouthwatering dishes shared by food enthusiasts and local
            restaurants, brought to life by immersive AI-powered audio reviews.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{ delay: 0.1, duration: 1, ease: "easeInOut" }}
              aria-label="explore-local-flavors"
              className="bg-transparent border-2 border-white hover:border-red hover:text-white text-white px-6 py-3 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:bg-red focus:border-none"
            >
              Explore Local Flavors
            </motion.button>
            <motion.button
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1, ease: "easeInOut" }}
              aria-label="listen-to-tasty-reviews"
              className="bg-transparent border-2 border-white hover:border-red hover:text-white text-white px-6 py-3 rounded-md transition duration-300 ease-in-out"
            >
              Listen to Tasty Reviews
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
