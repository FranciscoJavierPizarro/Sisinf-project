import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CryptoJS from "crypto-js"

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: { label: "Username", type: "text", placeholder: "jsmith" },
    //     password: { label: "Password", type: "password" }
    //   },
    //   async authorize(credentials, req) {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/login`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(credentials.username),
    //     }).then((res) => res.json())

    //     let user = null
    //     const { id, userName, email, salt, passwd } = res.user
    //     if (
    //       CryptoJS.SHA512(salt + credentials.password).toString() === passwd
    //     ) {
    //       user = {
    //         id: id,
    //         name: userName,
    //         email: email,
    //       }
    //     }
  
    //     if (user) {
    //       return user
    //     } else {
    //       return null
    //     }
    //   }
    // })
  ],
  // callbacks: {
  //   // jwt: ({ token, user }) => {
  //   //   if (user) token.id = user.id
  //   //   return token
  //   // },
  //   session: (session, token) => {
  //     if (token) session.id = token.id
  //     return session
  //   },
  // },
  // secret: process.env.SECRET,
  // jwt: {
  //   secret: process.env.SECRET,
  //   encryption: true,
  // },
  // session: {
  //   jwt: true,
  //   // Seconds - How long until an idle session expires and is no longer valid.
  //   maxAge: 24 * 60 * 60, // 1 day
  // },
  // pages: {
  //   signIn: "/login",
  //   error: "/login",
  // },
}

export default NextAuth(authOptions)
