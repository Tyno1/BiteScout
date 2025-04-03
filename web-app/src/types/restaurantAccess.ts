export interface IRestaurantAccess {
  _id?: string;
  userId: string;
  restaurantId: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
