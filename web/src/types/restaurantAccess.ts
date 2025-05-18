import { RestaurantData } from "./restaurantData";
import { User } from "./user";

export type AccessStatus =
  | null
  | "pending"
  | "suspended"
  | "approved"
  | "innactive";

export type RestaurantAccess = {
  _id?: string;
  userId: string | User;
  restaurantId: string | RestaurantData;
  role: string;
  status: AccessStatus;
  createdAt?: Date;
  updatedAt?: Date;
};
