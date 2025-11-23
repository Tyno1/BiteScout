"use client";

import { MapPin, Star, Volume2 } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/organisms";

export function TopMeals() {
	const [selectedType, setSelectedType] = useState<string>("Fine Dinning");

	const handleTypeChange = (type: string) => {
		setSelectedType(type);
	};
	const topMeals = [
		{
			id: 1,
			name: "Spicy Tuna Roll",
			restaurant: "Sushi Master",
			rating: 4.9,
			reviews: 342,
			topReview: "The freshest fish I've ever tasted!",
			image: "https://res.cloudinary.com/dr9md8vbd/image/upload/v1760090022/assets/mgg-vitchakorn-DDn9I5V1ubE-unsplash_nljmjt.jpg",
			location: "Downtown",
		},
		{
			id: 2,
			name: "Fillet Stake",
			restaurant: "La Cucina",
			rating: 4.8,
			reviews: 289,
			topReview: "The fillet steak is perfectly cooked.",
			image: "https://res.cloudinary.com/dr9md8vbd/image/upload/v1756622928/restaurant-images/restaurant-images/1756622920383_original_large.jpg",
			location: "Cardiff",
		},
		{
			id: 3,
			name: "Wagyu Burger",
			restaurant: "The Library Restaurant",
			rating: 4.8,
			reviews: 256,
			topReview: "Melts in your mouth! Outstanding quality.",
			image: "https://res.cloudinary.com/dr9md8vbd/image/upload/v1756416555/food-images/food-images/1756416552106_original_large.jpg",
			location: "Central Square",
		},
		{
			id: 4,
			name: "Chicken goujons",
			restaurant: "The Red Lion",
			rating: 4.7,
			reviews: 198,
			topReview: "The chicken goujons are crispy and delicious.",
			image: "https://res.cloudinary.com/dr9md8vbd/image/upload/v1756622511/food-images/food-images/1756622509202_original_large.jpg",
			location: "Cardiff",
		},
		{
			id: 5,
			name: "Chicken shreds",
			restaurant: "Pizza Roma",
			rating: 4.7,
			reviews: 245,
			topReview: "The chicken shreds are juicy and delicious.",
			image: "https://res.cloudinary.com/dr9md8vbd/image/upload/v1756622464/gallery-images/1756622462841_original.jpg",
			location: "South District",
		},
		{
			id: 6,
			name: "Tomahawk steak",
			restaurant: "Spice Garden",
			rating: 4.6,
			reviews: 167,
			topReview: "Rich flavors, tender meat!",
			image: "https://res.cloudinary.com/dr9md8vbd/image/upload/v1756411155/food-images/food-images/1756411148840_original_small.jpg",
			location: "North End",
		},
		{
			id: 7,
			name: "Beef Medallions",
			restaurant: "Ocean's Best",
			rating: 4.6,
			reviews: 178,
			topReview: "Tender and juicy.",
			image: "https://res.cloudinary.com/dr9md8vbd/image/upload/v1756409129/user-profile-images/1756409126248_original.jpg",
			location: "Cardiff",
		},
	];
	const restaurantType = [
		"Fine Dinning",
		"Casual",
		"Cafe",
		"Pub",
		"Lounge",
		"Bar",
	];
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.5,
				ease: [0.25, 0.46, 0.45, 0.94],
			},
		},
	};

	return (
		<section className="py-10 md:py-20 bg-background w-full">
			<div className="flex flex-col items-center px-2 md:px-20 w-full">
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
					Top-Rated Dishes Near You
				</motion.h2>

				<motion.div
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-50px" }}
					transition={{
						duration: 0.5,
						ease: [0.25, 0.46, 0.45, 0.94],
					}}
					className="p-2 mb-4 border rounded-2xl md:rounded-3xl w-full md:w-[90%] lg:w-[60%] flex justify-between overflow-x-auto"
				>
					{restaurantType.map((type) => (
						<button
							type="button"
							onClick={() => handleTypeChange(type)}
							key={type}
							className={`px-3 py-2 text-xs md:text-sm font-medium text-medium rounded-xl md:rounded-2xl ${
								selectedType === type
									? "bg-primary text-primary-foreground transition duration-600 ease-in-out"
									: "text-foreground"
							}`}
						>
							{type}
						</button>
					))}
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-50px" }}
					className="grid grid-cols-1 gap-4 w-full"
				>
					{topMeals.map((meal) => (
						<motion.div key={meal.id} variants={itemVariants}>
							<Card
								containerClassName="hover:shadow-md transition-shadow overflow-hidden"
								className="flex gap-2"
							>
								<Image
									src={meal.image}
									alt={meal.name}
									width={96}
									height={96}
									className="w-24 h-24 object-cover"
								/>
								<div className=" px-4 flex-1 flex justify-between">
									<div className="flex flex-col justify-between">
										<div className="flex items-start">
											<div>
												<h3 className="font-semibold text-sm text-card-foreground">
													{meal.name}
												</h3>
												<p className="text-xs text-primary">
													{meal.restaurant}
												</p>
											</div>
										</div>

										<div className="mt-2">
											<p className="text-xs italic text-foreground line-clamp-2">
												{meal.topReview}
											</p>
											<div className="flex items-center mt-1 text-xs text-muted-foreground">
												<MapPin className="w-3 h-3 mr-1" />
												{meal.location}
											</div>
										</div>
									</div>
									<div className="flex flex-col justify-between">
										<div className="flex items-center bg-primary/10 px-1.5 py-0.5 rounded">
											<Star
												className="w-3 h-3 text-primary mr-0.5"
												fill="currentColor"
											/>
											<span className="text-xs font-semibold">
												{meal.rating}
											</span>
										</div>
										<button type="button" className="flex items-center gap-2">
											<span className="text-xs font-medium">Listen</span>
											<Volume2 size={30} className="text-primary" />
										</button>
									</div>
								</div>
							</Card>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}
