import { Camera, TrendingUp, Utensils } from "lucide-react";
import { ReactNode } from "react";

export type FeaturesProp = {
  icon: ReactNode;
  title: string;
  description: string;
  featureType: string;
};

export const featuresData: FeaturesProp[] = [
  {
    icon: <Camera className="w-12 h-12 text-orange-600" />,
    title: "Snap & Share",
    description:
      "Take beautiful photos of your dining experience and share them with the community",
    featureType: "Mobile User",
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
    title: "Discover Trends",
    description: "Stay updated with the latest food trends and popular dining spots",
    featureType: "Mobile User",
  },
  {
    icon: <Utensils className="w-12 h-12 text-orange-600" />,
    title: "Make Reservations",
    description: "Book your table directly through our platform",
    featureType: "Mobile User",
  },
  {
    icon: <Utensils className="w-12 h-12 text-orange-600" />,
    title: "Menu Management",
    description: "Easily update and customize your restaurant's menu items",
    featureType: "Restaurant Admin",
  },
  {
    icon: <Utensils className="w-12 h-12 text-orange-600" />,
    title: "Restaurant Analytics",
    description: "Track and manage all your restaurant's reviews in real-time",
    featureType: "Restaurant Admin",
  },
  {
    icon: <Utensils className="w-12 h-12 text-orange-600" />,
    title: "Restaurant Profile",
    description: "Customize your restaurant details, photos, and special offerings",
    featureType: "Restaurant Admin",
  },
];
