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
})
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

  


// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers/credentials';
// import dbConnect from '@/models/dbConnect';
// import { compare } from 'bcryptjs';
// import User from '@/models/User';
// export default NextAuth({
//     //Configure JWT
//     session: {
//         jwt: true,
//     },
//     //Specify Provider
//     providers: [
//         Providers({
//             async authorize(credentials) {
//                 //Connect to DB
                
//                 //Get all the users
//                 await dbConnect()
//                 //Find user with the email  
//                 const result = await User.findOne({
//                     gmail: credentials.gmail,
//                 });
//                 //Not found - send error res
//                 if (!result) {
             
//                     throw new Error('No user found with the gmail');
//                 }
//                 //Check hased password with DB password
//                 const checkPassword = await compare(credentials.passowrd, result.passowrd);
//                 //Incorrect password - send response
//                 if (!checkPassword) {
             
//                     throw new Error('Password doesnt match');
//                 }
//                 //Else send success response
         
//                 // return { gmail: result.gmail };
//                 return session
//             },
//         }),
//     ],
// pages: {
//   signIn: "/login",
//   error: "/login",
// },
// });
