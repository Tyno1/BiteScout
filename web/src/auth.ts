import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import refreshAccessToken from "./utils/refreshAccessToken";

const BACKEND_SERVER = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getUserTypeDetails(userType: string) {
  try {
    const response = await axios.get(
      `${BACKEND_SERVER}/user-types/${userType}`
    );

    if (response.data) {
      return {
        name: response.data.name,
        level: response.data.level,
      };
    }

    return { name: "guest", level: 4 };
  } catch (error) {
    console.error("Error fetching user type details:", error);
    return { name: "guest", level: 4 };
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
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

          if (response.data && response.data.accessToken) {
            const { user, accessToken, refreshToken, expiresIn } =
              response.data;

            return {
              _id: user._id,
              name: user.name,
              email: user.email,
              accessToken,
              refreshToken,
              expiresIn,
              userType: user.userType,
            };
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error: any) {
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        // Only update token when user is provided (on sign in)
        if (user) {
          token._id = user._id;
          token.userType = user.userType;
          token.accessToken = user.accessToken;
          token.refreshToken = user.refreshToken;
          token.expiresIn = user.expiresIn; // Set expiration time
        }
        if (Date.now() < (token.expiresIn as number)) {
          return token;
        }

        // If the token is expired, try to refresh it
        return await refreshAccessToken(token);
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },

    async session({ session, token }) {
      try {
        if (token.accessToken) {
          session.user.accessToken = token.accessToken as string;
          session.user.refreshToken = token.refreshToken as string;
        }
        // Add token data to session
        session.user._id = token._id as string;

        // assign userType and Get User Type Details
        if (token.userType) {
          session.user.userType = token.userType as string;
          session.user.userTypeDetails = await getUserTypeDetails(
            token.userType as string
          );
        } else {
          // Set default values when userType is missing
          session.user.userType = "guest";
          session.user.userTypeDetails = { name: "guest", level: 4 };
        }

        if (token._id) {
          const restaurant = await axios.get(
            `${BACKEND_SERVER}/restaurants/owner-restaurants/${token._id}`,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );
          const restaurantCount = restaurant.data.length;

          session.user.restaurantCount = restaurantCount;
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
