"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { PopularDestinationProp } from "./PopularDestinationData";

type DestinationCardType = {
	destination: PopularDestinationProp;
};

export function PopularDestinationCard({ destination }: DestinationCardType) {
	return (
		<motion.div
			key={destination.id}
			className="relative group cursor-pointer"
			whileHover={{ y: -8 }}
			transition={{
				duration: 0.3,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
		>
		<div className="relative h-80 w-full rounded-xl overflow-hidden">
			<motion.div
				className="relative w-full h-full"
				whileHover={{ scale: 1.05 }}
				transition={{
					duration: 0.4,
					ease: [0.25, 0.46, 0.45, 0.94],
				}}
			>
				<Image
					src={destination.image}
					alt={destination.name}
					fill
					className="object-cover object-center"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</motion.div>

			<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
		</div>
			<div className="absolute bottom-0 p-6 text-white">
				<h3 className="text-2xl font-bold mb-2">{destination.name}</h3>
				<p className="text-sm opacity-90">
					{destination.location} • {destination.priceRange} • {destination.cuisineType}
				</p>
			</div>
		</motion.div>
	);
}
