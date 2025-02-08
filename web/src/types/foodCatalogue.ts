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

export interface FoodCatalogue {
  _id?: string;
  name: string;
  ingredients: string[];
  cuisineType: string;
  course: string;
  price: string;
  allergens: string[];
  images?: string[];
}
