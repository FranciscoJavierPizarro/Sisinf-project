import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
      })
    // ...add more providers here
  ],
  secret:process.env.JWT_SECRET,
//   jwt: {
//     encryption: true,
//   },
//   callbacks : {
//     async jwt ( token , account ) {
//         if ( account?.accessToken ) {
//             token.accessToken = account.accessToken
//         }
//         return token
//     } ,
//     redirect : async(url , _baseUrl) =>{
//         if ( url === '/' ) {
//             return Promise.resolve ( '/' ) ;
//         }
//         return Promise.resolve ( '/' ) ;
//     }
//   }

  
})


// const GOOGLE_AUTHORIZATION_URL =
//   "https://accounts.google.com/o/oauth2/v2/auth?" +
//   new URLSearchParams({
//     prompt: "consent",
//     access_type: "offline",
//     response_type: "code",
//   })

// /**
//  * Takes a token, and returns a new token with updated
//  * `accessToken` and `accessTokenExpires`. If an error occurs,
//  * returns the old token and an error property
//  */
// async function refreshAccessToken(token) {
//   try {
//     const url =
//       "https://oauth2.googleapis.com/token?" +
//       new URLSearchParams({
//         client_id: process.env.GOOGLE_CLIENT_ID,
//         client_secret: process.env.GOOGLE_CLIENT_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       })

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     })

//     const refreshedTokens = await response.json()

//     if (!response.ok) {
//       throw refreshedTokens
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_at * 10000000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     }
//   } catch (error) {
//     console.log(error)

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     }
//   }
// }

// export default NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: GOOGLE_AUTHORIZATION_URL,
//     }),
//     GithubProvider({
//         clientId: process.env.GITHUB_ID,
//         clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       // Initial sign in
//       if (account && user) {
//         return {
//           accessToken: account.access_token,
//           accessTokenExpires: Date.now() + account.expires_at * 1000,
//           refreshToken: account.refresh_token,
//           user,
//         }
//       }

//       // Return previous token if the access token has not expired yet
//       if (Date.now() < token.accessTokenExpires) {
//         return token
//       }

//       // Access token has expired, try to update it
//       return refreshAccessToken(token)
//     },
//     async session({ session, token }) {
//       session.user = token.user
//       session.accessToken = token.accessToken
//       session.error = token.error

//       return session
//     },
//   },
// })