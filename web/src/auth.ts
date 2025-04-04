import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import User from "@/app/api/models/User";
import dbConnect from "@/utils/db";
import userType from "@/app/api/models/UserType";
import restaurantData from "@/app/api/models/RestaurantData";

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
    Google({
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
          await dbConnect();
          const queryUser = { email: credentials.email };
          const user = await User.findOne(queryUser);

          if (!user) {
            throw new Error("User not found. Please sign up");
          }

          const isMatch = await user.comparePassword(credentials.password);

          if (!isMatch) {
            throw new Error("Check your email and password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            userType: user.userType,
          };
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      // if login method is oauth
      if (!account || account.provider === "credentials") {
        return true;
      }

      try {
        await dbConnect();
        // get default userType - lowest priviledge
        const lowestPrivilegeType = await userType.findOne({ name: "user" });

        if (!lowestPrivilegeType) {
          console.error("Default user type not found");
          return false;
        }

        const userExists = await User.findOne({ email: profile?.email });

        if (!userExists) {
          const newUser = await User.create({
            email: profile?.email,
            name: profile?.name,
            image: profile?.image,
            userType: lowestPrivilegeType._id,
            loginMethod: "oauth",
          });

          // Merge the userType into the user object that's passed to callbacks
          if (user) {
            user.userType = lowestPrivilegeType._id;
          }
        } else {
          console.log(
            "Existing user found with userType:",
            userExists.userType
          );
          // Merge the userType into the user object that's passed to callbacks
          if (user) {
            user.userType = userExists.userType;
          }
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      console.log("user", user);

      if (user) {
        token.id = user.id;
        token.userType = user.userType;
      }

      return token;
    },

    async session({ session, token }) {
      try {
        // Add token data to session
        session.user.id = token.id as string;

        if (token.userType) {
          session.user.userType = token.userType as string;

          await dbConnect();

          // Fetch additional user data if needed
          const userTypeDetails = await userType.findById(token.userType);

          if (userTypeDetails) {
            session.user.userTypeDetails = {
              name: userTypeDetails.name,
              level: userTypeDetails.level,
            };
          } else {
            console.log("No userTypeDetails found for ID:", token.userType);
            // Set a default or fallback value
            session.user.userTypeDetails = { name: "user", level: 1 };
          }
        } else {
          console.log("No userType in token, setting default");
          // Set default values when userType is missing
          session.user.userType = "default";
          session.user.userTypeDetails = { name: "user", level: 1 };
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
