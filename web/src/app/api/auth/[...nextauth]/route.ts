import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Github from "next-auth/providers/github";


export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Github({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
