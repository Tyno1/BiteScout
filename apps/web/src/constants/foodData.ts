import type { FoodCatalogue } from "shared/types/api/schemas";
import type { Currency } from "shared/types/common";

export const DEFAULT_FOOD_DATA: FoodCatalogue = {
  _id: "",
  name: "",
  ingredients: [],
  cuisineType: { _id: "", name: "", description: "" },
  course: { _id: "", name: "", description: "" },
  price: {
    currency: "GBP" as Currency,
    amount: 0,
  },
  allergens: [],
  images: [],
  restaurant: "",
  isAvailable: true,
  isFeatured: false,
};
