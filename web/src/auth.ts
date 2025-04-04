import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/api/models/User";
import dbConnect from "./utils/db";
import userType from "./app/api/models/UserType";
import restaurantData from "./app/api/models/RestaurantData";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        if (credentials === null) return null;
        try {
          await dbConnect();
          const queryUser = { email: credentials.email };
          const user = await User.findOne(queryUser);
          console.log(user);

          if (user) {
            const isMatch = user.comparePassword(credentials.password);

            if (isMatch) {
              return {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                userType: user.userType,
              };
            } else {
              throw new Error("Check your password");
            }
          } else {
            throw new Error("User not found. Please sign up");
          }
        } catch (error: any) {
          throw new Error(error);
        }
      },
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "email@email.com" },
        password: { label: "password", type: "password" },
      },
    }),
  ],
  callbacks: {
    
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
      const restaurant = await restaurantData.find({
        ownerId: session.user.id,
      });
      const restaurantCount = restaurant.length;

      session.user.restaurantCount = restaurantCount;
      return session;
    },
    async signIn(data) {
      const { profile } = data;

      // if login method is oauth
      if (!profile) {
        return true;
      }
      try {
        await dbConnect();
        // get default userType - lowest priviledge - highest number
        const lowestPrivilegeType = await userType
          .findOne()
          .sort({ level: -1 })
          .limit(1);
        const userExists = await User.findOne({ email: profile?.email });
        if (!userExists) {
          const newUser = new User({
            email: profile?.email,
            name: profile?.name,
            image: profile?.image,
            userType: lowestPrivilegeType._id,
            loginMethod: "oauth",
          });
          await newUser.save();
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
  },
});