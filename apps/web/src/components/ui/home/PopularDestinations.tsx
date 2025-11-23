"use client";

import { motion } from "motion/react";
import { PopularDestinationCard } from "./PopularDestinationCard";
import {
	type PopularDestinationProp,
	popularDestinationsData,
} from "./PopularDestinationData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function PopularDestinations() {
  return (
    <section className="w-full py-10 md:py-20 px-4 flex justify-center">
      <div className="w-full flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-3xl md:text-6xl font-bold mb-6 md:mb-10 text-center"
        >
          Popular Destinations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
          className="text-foreground mb-16 text-center max-w-2xl"
        >
          Explore the most sought-after dining experiences in your area, carefully curated by our
          community of food enthusiasts
        </motion.p>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
        >
          {popularDestinationsData.map((destination: PopularDestinationProp) => (
            <motion.div key={destination.id} variants={itemVariants}>
              <PopularDestinationCard destination={destination} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
