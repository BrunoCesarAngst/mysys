import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth"
import Auth0Provider from "next-auth/providers/auth0";
import prisma from "../../../../lib/prisma";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Auth0Provider({
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        issuer: process.env.AUTH0_ISSUER,
        profile(profile) {
          return {
            id: profile.sub,
            name: profile.nickname || profile.login,
            username: profile.login,
            email: profile.email,
            image: profile.picture,
          }
        },
      }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
        username: user.name
      }
    })
  }
})