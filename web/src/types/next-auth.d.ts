// types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
    userType?: string; // Add the userType property
    restaurantCount?: number; // Add the restaurantCount property
  }

  interface Session {
    user: {
      id: string;
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
    id: string;
    role?: string;
    userType?: string; // Add the userType property
  }
}
