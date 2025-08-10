import { Card } from "@/components/organisms";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { type FeaturesProp, featuresData } from "./FeaturesData";

export function Features() {
  return (
    <section className="w-full py-10 md:py-20 px-4 flex justify-center bg-background">
      <div className="w-[90%] flex flex-col items-center">
        <h2 className="text-3xl md:text-6xl font-bold mb-16 text-center">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuresData.map((feature: FeaturesProp) => (
            <Card
              key={feature.title}
              className="flex flex-col items-center justify-between text-center h-full"
              containerClassName="border-1 border-primary/30"
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
          ))}
        </div>
        <Link
          href="/about"
          className="mt-8 text-lg flex items-center text-foreground hover:text-primary transition-colors duration-300"
        >
          Explore more Bite Scout Features{" "}
          <MoveRight size={30} className="ml-10" />
        </Link>
      </div>
    </section>
  );
}
