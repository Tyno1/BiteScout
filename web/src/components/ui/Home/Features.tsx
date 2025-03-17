 import { TrendingUp, Utensils, Camera, MoveRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Camera className="w-12 h-12 text-red-500" />,
    title: "Snap & Share",
    description:
      "Take beautiful photos of your dining experience and share them with the community",
    featureType: "Mobile User",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-red-500" />,
    title: "Discover Trends",
    description:
      "Stay updated with the latest food trends and popular dining spots",
    featureType: "Mobile User",
  },
  {
    icon: <Utensils className="w-12 h-12 text-red-500" />,
    title: "Make Reservations",
    description: "Book your table directly through our platform",
    featureType: "Mobile User",
  },
  {
    icon: <Utensils className="w-12 h-12 text-red-500" />,
    title: "Menu Management",
    description: "Easily update and customize your restaurant's menu items",
    featureType: "Restaurant Admin",
  },
  {
    icon: <Utensils className="w-12 h-12 text-red-500" />,
    title: "Restaurant Analytics",
    description: "Track and manage all your restaurant's reviews in real-time",
    featureType: "Restaurant Admin",
  },
  {
    icon: <Utensils className="w-12 h-12 text-red-500" />,
    title: "Restaurant Profile",
    description:
      "Customize your restaurant details, photos, and special offerings",
    featureType: "Restaurant Admin",
  },
];
export default function Features() {
  return (
    <section className="w-full py-20 flex justify-center bg-gray-50">
      <div className="w-[90%] flex flex-col items-center">
        <h2 className="text-5xl font-bold mb-16">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              {feature.icon}
              <h3 className="text-2xl font-bold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-10">{feature.description}</p>
              <div
                className={`absolute bottom-4 text-xs rounded-lg px-3 py-1 border ${
                  feature.featureType === "Restaurant Admin"
                    ? "border-black text-black"
                    : "border-red text-red"
                }`}
              >
                {feature.featureType}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-8 text-2xls flex items-center text-black hover:text-red transition duration-300 ease-in-out"
        >
          Explore more Bite Scout Features{" "}
          <MoveRight size={30} className="ml-10" />
        </Link>
      </div>
    </section>
  );
}
