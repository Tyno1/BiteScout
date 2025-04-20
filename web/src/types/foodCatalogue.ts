export type Allergen = {
  _id?: string;
  name: string;
  description: string;
}

export type Course = {
  _id?: string;
  name: string;
  description: string;
}

export type Cuisine = {
  _id?: string;
  name: string;
  description: string;
}

type Price = {
  currency: string;
  amount: number;
}

export type FoodData = {
  _id?: string;
  name: string;
  ingredients: string[];
  cuisineType: string;
  course: string;
  price: Price;
  allergens: string[];
  images?: string[];
  restaurant: string;
}

export type FoodDataReceived = {
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
  price: Price;
  allergens: Allergen[];
  images?: string[];
  restaurant: string;
}