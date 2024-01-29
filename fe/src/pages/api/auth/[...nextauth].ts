import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { Login } from "@/services/user_service";
import type { LoginUserCredentials } from "@/models/user";
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "foo@bar.com" },
        password: { label: "Password", type: "password", placeholder: "password" }
      },
      async authorize(credentials, req) {
        const loginCredentials: LoginUserCredentials = {
          email: credentials?.email as string,
          password: credentials?.password as string,
        }
        const userSession = await Login(loginCredentials)
        if (userSession) {
          return userSession;
        } else {
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 day
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      const filterdSession: Session = {
        user: {
          id: token.sub as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
        },
        expires: session.expires,
      };

      return filterdSession;
    },
  },
  pages: {
    signIn: "/login"
  },
});
