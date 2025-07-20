export type User = {
  _id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  userType?: string;
  userTypeDetails?: {
    name: string;
    level: number;
  };
  restaurantCount?: number;
  accessToken?: string;
  refreshToken?: string;
};
