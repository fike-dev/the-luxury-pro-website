import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { createGuest, getGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],

  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ fullName: user.name, email: user.email });

        return true;
      } catch {
        return false;
      }
    },
    async jwt({ token, user }) {
      // Runs ONLY at sign-in
      // case 1. initial signin
      if (user?.email) {
        const guest = await getGuest(user.email);
        if (guest) {
          token.guestId = guest.id;
        }
      }
      // Case 2: token already exists but guestId is missing
      if (!token.guestId && token.email) {
        const guest = await getGuest(token.email);
        if (guest) {
          token.guestId = guest.id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Runs on EVERY request
      if (session.user && token.guestId) {
        session.user.guestId = token.guestId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
