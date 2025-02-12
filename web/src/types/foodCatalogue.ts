export interface Allergen {
  _id?: string;
  name: string;
  description: string;
}

export interface Course {
  _id?: string;
  name: string;
  description: string;
}

export interface Cuisine {
  _id?: string;
  name: string;
  description: string;
}

interface price {
  currency: string;
  amount: number;
}

export interface FoodData {
  _id?: string;
  name: string;
  ingredients: string[];
  cuisineType: string;
  course: string;
  price: price;
  allergens: string[];
  images?: string[];
  restaurant: string;
}
