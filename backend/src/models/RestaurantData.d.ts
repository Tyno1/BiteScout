import { Restaurant } from "@/src/types/restaurantData";

interface RestaurantModel {
  create(data: Omit<Restaurant, "_id">): Promise<Restaurant>;
  findById(id: string): Promise<Restaurant | null>;
  find(): Promise<Restaurant[]>;
  findByIdAndUpdate(
    id: string,
    data: Partial<Restaurant>,
    options?: { new?: boolean; runValidators?: boolean }
  ): Promise<Restaurant | null>;
  findByIdAndDelete(id: string): Promise<Restaurant | null>;
}

declare const RestaurantData: RestaurantModel;

export default RestaurantData;
