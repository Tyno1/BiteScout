"use client";

import { motion } from "motion/react";
import { Button } from "@/components/atoms";

export function CallToAction() {
  return (
    <section className="w-full py-20 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-[90%] flex flex-col items-center text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.1,
          }}
          className="text-3xl md:text-6xl font-bold mb-6 md:mb-16 text-center"
        >
          Ready to Start Your Food Journey?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2,
          }}
          className="text-foreground mb-8 max-w-2xl"
        >
          Join thousands of food enthusiasts and discover the best dining experiences in your area.
          Download our app today and start exploring!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.3,
          }}
          className="flex gap-4"
        >
          <Button text="Download iOS App" variant="glass" color="primary" size="sm" />
          <Button text="Download Android App" variant="glass" color="primary" size="lg" />
        </motion.div>
      </motion.div>
    </section>
  );
}
