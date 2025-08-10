"use client";

import { Card } from "@/components/organisms";
import { MapPin, Star, Volume2 } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

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
      image: "/api/placeholder/200/120",
      location: "Downtown",
    },
    {
      id: 2,
      name: "Truffle Pasta",
      restaurant: "La Cucina",
      rating: 4.8,
      reviews: 289,
      topReview: "The truffle flavor is perfectly balanced.",
      image: "/api/placeholder/200/120",
      location: "West End",
    },
    {
      id: 3,
      name: "Wagyu Burger",
      restaurant: "Gourmet Bites",
      rating: 4.8,
      reviews: 256,
      topReview: "Melts in your mouth! Outstanding quality.",
      image: "/api/placeholder/200/120",
      location: "Central Square",
    },
    {
      id: 4,
      name: "Pad Thai",
      restaurant: "Thai Delight",
      rating: 4.7,
      reviews: 198,
      topReview: "Authentic flavors, perfect spice level!",
      image: "/api/placeholder/200/120",
      location: "East Side",
    },
    {
      id: 5,
      name: "Margherita Pizza",
      restaurant: "Pizza Roma",
      rating: 4.7,
      reviews: 245,
      topReview: "Best Neapolitan pizza in town!",
      image: "/api/placeholder/200/120",
      location: "South District",
    },
    {
      id: 6,
      name: "Beef Rendang",
      restaurant: "Spice Garden",
      rating: 4.6,
      reviews: 167,
      topReview: "Rich flavors, tender meat!",
      image: "/api/placeholder/200/120",
      location: "North End",
    },
    {
      id: 7,
      name: "Fish & Chips",
      restaurant: "Ocean's Best",
      rating: 4.6,
      reviews: 178,
      topReview: "Crispy batter, fresh fish!",
      image: "/api/placeholder/200/120",
      location: "Harbor District",
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
  return (
    <section className="py-10 md:py-20 bg-background w-full">
      <div className="flex flex-col items-center px-2 md:px-20 w-full">
        <h2 className="text-3xl md:text-6xl font-bold mb-16 text-center">
          Top-Rated Dishes Near You
        </h2>

        <div className="p-2 mb-4 border rounded-2xl md:rounded-3xl w-full md:w-[90%] lg:w-[60%] flex justify-between overflow-x-auto">
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
        </div>

        <div className="grid grid-cols-1 gap-4 w-full">
          {topMeals.map((meal) => (
            <Card
              key={meal.id}
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
                      <h3 className="font-semibold text-sm text-card-foreground">{meal.name}</h3>
                      <p className="text-xs text-primary">{meal.restaurant}</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="text-xs italic text-foreground line-clamp-2">
                      {meal.topReview}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-secondary">
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
                    <span className="text-xs font-semibold">{meal.rating}</span>
                  </div>
                  <button type="button" className="flex items-center gap-2">
                    <span className="text-xs font-medium">Listen</span>
                    <Volume2 size={30} className="text-secondary" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
