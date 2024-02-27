import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"
import { db } from "../../../lib/db"

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            credentials: {
            username: {},
            password: {},
            }, 
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) {
                    return null
                }
                const user = await db.user.findUnique({
                    where: {
                        username: credentials.username,
                    }
                })
                if (!user) {
                    return null
                }
                const validatePassword = await compare(
                    credentials.password,
                    user.password
                )
                if (!validatePassword) {
                    return null
                }
                return {
                    ...user,
                    id: user.id,
                    username: user.username
                }
        }
    })],
    callbacks: {
        async jwt({ token, user, session }) {
            try {
              console.log("jwt", { token, user, session })
              token.id = user?.id
              if (user) {
                return {
                  ...token,
                  id: user.id,
                }
              }
      
              return token
            } catch (error) {
              console.error("Error in jwt:", error)
              throw error
            }
          },
          async session({ session, token, user }) {
            try {
              console.log("session", { session, token, user })
              return {
                ...session,
                user: {
                  ...session.user,
                  id: token.id
                }
              }
            } catch (error) {
              console.error("Error in session:", error)
              throw error
            }
          },
    }
})

export { handler as GET, handler as POST}