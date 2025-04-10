// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    userType?: string; // Add the userType property
    restaurantCount?: number; // Add the restaurantCount property
    accessToken?: string; // Add the accessToken property
  }

  interface Session {
    user: {
      _id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      userType?: string; // Add the userType property
      userTypeDetails?: {
        name: string;
        level: number;
      };
      restaurantCount?: number; // Add the restaurantCount property
    };
    accessToken?: string; // Add the accessToken property
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    userType?: string; // Add the userType property
    restaurantCount?: number; // Add the restaurantCount property
    accessToken?: string; // Add the accessToken property
  }
}
