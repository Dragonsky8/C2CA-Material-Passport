import NextAuth, { NextAuthOptions, Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter";


// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        role: { label: 'Role', type: 'text' }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        // const res = await fetch("/your/endpoint", {
        //   method: 'POST',
        //   body: JSON.stringify(credentials),
        //   headers: { "Content-Type": "application/json" }
        // })
        // const user = await res.json()
  
        // If no error and we have user data, return it
        // if (res.ok && user) {
        //   return user
        // }

        console.log(credentials.username ==="jan")
        if (credentials.username ==="hank") {
            return {
                id: '1',
                username: "hank",
                role: "admin"
            }
        } if (credentials.username ==="jan") {
          return {
              id: '1',
              username: "viewer",
              role: "viewer"
          }
      }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }: { session: Session; token: any }) {
			return { ...session, user: token };
		},
	},
  session: {
		strategy: "jwt",
	},
  pages: {
    signIn: '/logintest'
  }
}

export default NextAuth(authOptions)