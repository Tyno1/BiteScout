// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    userType?: string; // Add the userType property
    restaurantCount?: number; // Add the restaurantCount property
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
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    role?: string;
    userType?: string; // Add the userType property
  }
}
