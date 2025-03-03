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

export interface FoodDataSent {
  _id?: string;
  name: string;
  ingredients: string[];
  cuisineType: string;
  course: string
  price: price;
  allergens: string[];
  images?: string[];
  restaurant: string;
}

export interface FoodDataReceived {
  _id?: string;
  name: string;
  ingredients: string[];
  cuisineType: {
    _id?: string;
    name: string;
    description: string;
  };
  course: {
    _id?: string;
    name: string;
    description: string;
  };
  price: price;
  allergens: Allergen[];
  images?: string[];
  restaurant: string;
}
