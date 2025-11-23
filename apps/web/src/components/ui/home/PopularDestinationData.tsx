export type PopularDestinationProp = {
  id: number;
  name: string;
  location: string;
  priceRange: string;
  cuisineType: string;
  image: string;
};

export const popularDestinationsData: PopularDestinationProp[] = [
  {
    id: 1,
    name: "The Library Restaurant",
    location: "Cardiff",
    priceRange: "$$$",
    cuisineType: "Fine Dining",
    image:
      "https://res.cloudinary.com/dr9md8vbd/image/upload/v1763932764/restaurants/nimal-mathew-7Z_tuvBUKME-unsplash_iyk4yt.jpg",
  },
  {
    id: 2,
    name: "Sushi Master",
    location: "Downtown",
    priceRange: "$$",
    cuisineType: "Japanese",
    image:
      "https://res.cloudinary.com/dr9md8vbd/image/upload/v1763932763/restaurants/zooey-li-9CdHIWA1NWQ-unsplash_tupczu.jpg",
  },
  {
    id: 3,
    name: "La Cucina",
    location: "West End",
    priceRange: "$$$",
    cuisineType: "Italian",
    image:
      "https://res.cloudinary.com/dr9md8vbd/image/upload/v1763932758/restaurants/metin-ozer-iG9LZNnP8wk-unsplash_vhpzf4.jpg",
  },
  {
    id: 4,
    name: "The Red Lion",
    location: "Cardiff",
    priceRange: "$$",
    cuisineType: "British Pub",
    image:
"https://res.cloudinary.com/dr9md8vbd/image/upload/v1763933204/restaurants/yanhao-fang-MwOP9Yk3tXo-unsplash_wselsp.jpg"  },
  {
    id: 5,
    name: "Spice Garden",
    location: "North End",
    priceRange: "$$",
    cuisineType: "Indian",
    image:
      "https://res.cloudinary.com/dr9md8vbd/image/upload/v1763932758/restaurants/tanya-prodaan-b-cn3JA_nBw-unsplash_ndjbed.jpg",
  },
  {
    id: 6,
    name: "Ocean's Best",
    location: "Harbor District",
    priceRange: "$$$",
    cuisineType: "Seafood",
    image:
"https://res.cloudinary.com/dr9md8vbd/image/upload/v1763933199/restaurants/nicholas-ng-MMnNratXuZc-unsplash_ds9un0.jpg"},
];
