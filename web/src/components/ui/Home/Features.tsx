import Link from "next/link";
import featuresData, { FeaturesProp } from "./FeaturesData";
import { MoveRight } from "lucide-react";

export default function Features() {
  return (
    <section className="w-full py-10 md:py-20 px-4 flex justify-center bg-gray-50">
      <div className="w-[90%] flex flex-col items-center">
        <h2 className="text-3xl md:text-6xl font-bold mb-16 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuresData.map((feature: FeaturesProp, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span>{feature.icon}</span>
              <h3 className="text-2xl font-bold mt-4 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-10">{feature.description}</p>
              <div
                className={`absolute bottom-4 text-xs rounded-lg px-3 py-1 border ${
                  feature.featureType === "Restaurant Admin"
                    ? "border-black text-black"
                    : "border-orange-500 text-orange-600"
                }`}
              >
                {feature.featureType}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-8 text-lg flex items-center text-black hover:text-orange-600 transition duration-300 ease-in-out"
        >
          Explore more Bite Scout Features{" "}
          <MoveRight size={30} className="ml-10" />
        </Link>
      </div>
    </section>
  );
}
