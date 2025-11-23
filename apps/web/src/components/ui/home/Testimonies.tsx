"use client";

import { motion } from "motion/react";
import { Card } from "@/components/organisms";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function Testimonials() {
  return (
    <section className="w-full py-20 px-4 flex justify-center">
      <div className="w-[90%] flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="text-3xl md:text-6xl font-bold mb-16 text-center"
        >
          What Our Users Say
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              quote:
                "This platform has completely transformed how I discover new restaurants. The photo-first approach helps me make better dining choices.",
              author: "Sarah Johnson",
              role: "Food Blogger",
            },
            {
              quote:
                "As a restaurant owner, this platform has helped us reach more customers and showcase our dishes in the best possible way.",
              author: "Michael Chen",
              role: "Restaurant Owner",
            },
            {
              quote:
                "I love how easy it is to find and book restaurants. The recommendations are always spot-on!",
              author: "Emma Davis",
              role: "Regular User",
            },
          ].map((testimonial) => (
            <motion.div key={testimonial.author} variants={itemVariants}>
              <Card
                padding="lg"
                containerClassName="shadow-sm h-full"
                className="flex flex-col justify-between h-full"
              >
                <p className="mb-6 italic text-card-foreground text-sm">
                  &quot;{testimonial.quote}&quot;
                </p>
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
