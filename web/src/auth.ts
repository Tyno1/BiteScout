import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import User from "@/app/api/models/User";
import dbConnect from "@/utils/db";
import userType from "@/app/api/models/UserType";
import restaurantData from "@/app/api/models/RestaurantData";
import UserType from "@/app/api/models/UserType";
import RestaurantData from "@/app/api/models/RestaurantData";

// Provider configurations
const providers = [
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
          _id: user._id.toString(),
          name: user.name,
          email: user.email,
          userType: user.userType,
        };
      } catch (error: any) {
        throw new Error(error.message || "Authentication failed");
      }
    },
  }),
];

// Helper functions
async function getDefaultUserType() {
  await dbConnect();
  const defaultUserType = await UserType.findOne({ name: "user" });

  if (!defaultUserType) {
    throw new Error("Default user type not found");
  }

  return defaultUserType;
}

async function findOrCreateOAuthUser(profile: any) {
  await dbConnect();

  const existingUser = await User.findOne({ email: profile?.email });

  if (existingUser) {
    return {
      user: existingUser,
      isNewUser: false,
    };
  }

  const defaultUserType = await getDefaultUserType();

  const newUser = await User.create({
    email: profile?.email,
    name: profile?.name,
    image: profile?.image,
    userType: defaultUserType._id,
    loginMethod: "oauth",
  });

  return {
    user: newUser,
    isNewUser: true,
  };
}

async function getUserTypeDetails(userTypeId: string) {
  try {
    await dbConnect();
    const userTypeDetails = await UserType.findById(userTypeId);

    if (userTypeDetails) {
      return {
        name: userTypeDetails.name,
        level: userTypeDetails.level,
      };
    }

    return { name: "user", level: 1 };
  } catch (error) {
    console.error("Error fetching user type details:", error);
    return { name: "user", level: 1 };
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers,
  callbacks: {
    async signIn({ account, profile, user }) {
      // Skip for credential login
      if (!account || account.provider === "credentials") {
        return true;
      }

      try {
        const { user: dbUser, isNewUser } = await findOrCreateOAuthUser(
          profile
        );

        // Update the user object with database values
        if (user) {
          user.userType = dbUser.userType;
          user._id = dbUser._id;
        }

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // Only update token when user is provided (on sign in)
      if (user) {
        token._id = user._id;
        token.userType = user.userType;
      }
      if (account && account.access_token) {
        token.accessToken = account.access_token;
        console.log(account);
        
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
          await dbConnect();
          const restaurantCount = await RestaurantData.countDocuments({
            ownerId: token._id,
          });

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
