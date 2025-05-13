export type RestaurantAccess = {
  _id?: string;
  userId: string;
  restaurantId: string;
  role: string;
  status: "pending" | "approved" | "suspended" | "innactive";
  createdAt?: Date;
  updatedAt?: Date;
};
