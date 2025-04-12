import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/utils/db";
import UserType from "@/app/api/models/UserType";
import axios from "axios";

const BACKEND_SERVER = process.env.NEXT_PUBLIC_BACKEND_URL;

// Provider configurations
const providers = [
  Credentials({
    name: "credentials",
    credentials: {
      email: { label: "email", type: "text", placeholder: "email@email.com" },
      password: { label: "password", type: "password" },
    },

    async authorize(credentials) {
      if (!credentials?.email || !credentials?.password) {
        throw new Error("Missing credentials");
      }

      try {
        const response = await axios.post(`${BACKEND_SERVER}/auth/login`, {
          email: credentials.email,
          password: credentials.password,
        });
        console.log(response.headers);

        const user = response.data.user;
        return user;
      } catch (error: any) {
        throw new Error(error.message || "Authentication failed");
      }
    },
  }),
];

async function getUserTypeDetails(userTypeId: string) {
  try {
    const response = await axios.get(
      `${BACKEND_SERVER}/user-types/${userTypeId}`
    );

    if (response.data) {
      return {
        name: response.data.name,
        level: response.data.level,
      };
    }

    return { name: "user", level: 1 };
  } catch (error) {
    console.error("Error fetching user type details:", error);
    return { name: "user", level: 1 };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    async jwt({ token, user, account }) {
      // Only update token when user is provided (on sign in)
      if (user) {
        token._id = user._id;
        token.userType = user.userType;
        token.accessToken = account?.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      try {        
        // Add token data to session
        session.user._id = token._id as string;

        // Get User Type Details
        if (token.userType) {
          session.user.userTypeDetails = await getUserTypeDetails(
            token.userType as string
          );
        } else {
          console.log("No userType in token, setting default");
          // Set default values when userType is missing
          session.user.userType = "user";
          session.user.userTypeDetails = { name: "user", level: 3 };
        }

        if (token._id) {
          const restaurant = await axios.get(
            `${BACKEND_SERVER}/restaurants/owner-restaurants/${token._id}`
          );

          const restaurantCount = restaurant.data.length;

          session.user.restaurantCount = restaurantCount;
        }

        if (typeof token.accessToken === "string") {
          session.accessToken = token.accessToken;
        }

        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});
