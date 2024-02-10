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
                    id: user.id,
                    username: user.username
                }
        }
    })]
})

export { handler as GET, handler as POST}