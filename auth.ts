import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { SignInSchema } from "./lib/zod"
import { compareSync } from "bcrypt-ts"
import Google from "next-auth/providers/google"
import { NextResponse } from "next/server"

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
   session: { strategy: "jwt" },
   pages: {
      signIn: "/login"
   },
   providers: [
      Google,
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            const validatedFields = SignInSchema.safeParse(credentials)

            if (!validatedFields.success) {
               return null
            }

            const { email, password } = validatedFields.data
            const user = await prisma.user.findUnique({
               where: { email }
            })
            if (!user || !user.password) {
               throw new Error("User not found")
            }
            const passwordMatch = compareSync(password, user.password)
            if (!passwordMatch) return null

            return user
         }
      })
   ],
   callbacks: {
      async authorized({ auth, request }) {
         const isLoggedIn = !!auth?.user
         const ProtectedRoutes = ["/dashboard", "/user"]

         if (!isLoggedIn && ProtectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
            return NextResponse.redirect(new URL("/login", request.nextUrl))
         }

         if (isLoggedIn && request.nextUrl.pathname.startsWith("/login")) {
            return NextResponse.redirect(new URL(`/dashboard/${auth.user.id}`, request.nextUrl))
         }
         return true
      },
      jwt({ token, user }) {
         if (user) {
            token.role = user.role; // Menyimpan role user ke token
            token.id = user.id;     // Menyimpan ID user ke token
          }
          return token;
      },
      session({ session, token }) {
         session.user.id = token.id || token.sub; // Gunakan `sub` sebagai fallback
         session.user.role = token.role;
         return session;
      },
   }
})