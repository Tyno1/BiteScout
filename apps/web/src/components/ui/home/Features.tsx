"use client";

import { MoveRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Card } from "@/components/organisms";
import { type FeaturesProp, featuresData } from "./FeaturesData";

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

export function Features() {
	return (
		<section className="w-full py-10 md:py-20 px-4 flex justify-center bg-background">
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
					How It Works
				</motion.h2>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
				>
					{featuresData.map((feature: FeaturesProp) => (
						<motion.div key={feature.title} variants={itemVariants}>
							<Card
								className="flex flex-col items-center justify-between text-center h-full"
								containerClassName="border-1 border-primary/30 h-full"
							>
								<div className="flex flex-col items-center">
									<span>{feature.icon}</span>
									<h3 className="text-2xl font-bold mt-4 mb-2 text-card-foreground">
										{feature.title}
									</h3>
									<p className="text-card-foreground mb-6">
										{feature.description}
									</p>
								</div>
								<div
									className={`text-xs rounded-lg px-3 py-1 border ${
										feature.featureType === "Restaurant Admin"
											? "border-foreground text-foreground"
											: "border-primary text-primary"
									}`}
								>
									{feature.featureType}
								</div>
							</Card>
						</motion.div>
					))}
				</motion.div>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{
						duration: 0.6,
						ease: [0.25, 0.46, 0.45, 0.94],
						delay: 0.3,
					}}
				>
					<Link
						href="/about"
						className="mt-8 text-lg flex items-center text-foreground hover:text-primary transition-colors duration-300"
					>
						Explore more Bite Scout Features{" "}
						<MoveRight size={30} className="ml-10" />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
