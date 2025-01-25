import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/api/models/user";
import dbConnect from "./utils/db";

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
            // const isMatch = user?.password === credentials?.password;
            const isMatch = user.comparePassword(credentials);

            if (isMatch) {
              return {
                id: user._id.toString(),
                name: user.username,
                email: user.email,
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
});
