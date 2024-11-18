import React from "react";
import { TrendingUp, Utensils, Camera } from "lucide-react";


export default function Features () {
  return (
    <section className="w-screen py-20 flex justify-center bg-gray-50">
      <div className="w-[90%] flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Camera className="w-12 h-12 text-red-500" />,
              title: "Snap & Share",
              description:
                "Take beautiful photos of your dining experience and share them with the community",
            },
            {
              icon: <TrendingUp className="w-12 h-12 text-red-500" />,
              title: "Discover Trends",
              description:
                "Stay updated with the latest food trends and popular dining spots",
            },
            {
              icon: <Utensils className="w-12 h-12 text-red-500" />,
              title: "Make Reservations",
              description: "Book your table directly through our platform",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {feature.icon}
              <h3 className="text-2xl font-bold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

