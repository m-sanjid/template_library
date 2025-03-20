import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions, User as NextAuthUser } from "next-auth";

interface CustomUser extends NextAuthUser {
  isAdmin?: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.username },
        });

        if (!user || !user.password) {
          throw new Error("User not found or password missing");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValidPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          isAdmin: user.isAdmin || false,
        } as CustomUser;
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("Google profile missing email");
        }

        const existingUser = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: profile.email,
              name: profile?.name || "",
              image: profile?.image || "",
              provider: "google",
            },
          });
        }
      }
      return true;
    },

    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.id = user.id;
        token.isAdmin = (user as CustomUser).isAdmin;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.id || "";
        session.user.isAdmin = token.isAdmin ?? false;
      }
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};
