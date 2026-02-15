// import { loginUser } from "@/actions/server/auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { collections, dbConnect } from "./dbConnect";
// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",

//       credentials: {
//         // username: { label: "Username", type: "text", placeholder: "jsmith" },
//         // password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         console.log(credentials);

//         const user = await loginUser({
//           email: credentials.email,
//           password: credentials.password,
//         });

//         // Return null if user data could not be retrieved
//         return user;
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       console.log({ user, account, profile, email, credentials });

//       const isExist = await dbConnect(collections.USERS).findOne({
//         email: user.email,
//         // provider: account?.provider,
//       });
//       if (isExist) {
//         return true;
//       }

//       const newUser = {
//         provider: account?.provider,
//         email: user.email,
//         name: user.name,
//         image: user.image,
//         role: "user",
//       };
//       const result = await dbConnect(collections.USERS).insertOne(newUser);

//       return result.acknowledged;
//       // return true
//     },
//     // async redirect({ url, baseUrl }) {
//     //   return baseUrl;
//     // },
//     async session({ session, token, user }) {
//       if (token) {
//         session.role = token?.role;
//         session.email = token?.email;
//       }
//       return session;
//     },
//     async jwt({ token, user, account, profile, isNewUser }) {
//       console.log("account data in token", token);
//       if (user) {
//         if (account.provider == "google") {
//           const dbUser = await dbConnect(collections.USERS).findOne({
//             email: user.email,
//           });
//           token.role = dbUser?.role;
//           token.email = dbUser?.email;
//         } else {
//           token.role = user?.role;
//           token.email = user?.email;
//         }
//       }
//       return token;
//     },
//   },
// };

import { loginUser } from "@/actions/server/auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          if (!user) return null;

          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Credentials provider users are already verified in authorize()
      // so we only need to handle Google (OAuth) users here
      if (account?.provider === "credentials") {
        return true;
      }

      try {
        const db = await dbConnect(collections.USERS);

        const isExist = await db.findOne({ email: user.email });

        if (isExist) {
          return true;
        }

        const newUser = {
          provider: account?.provider,
          email: user.email,
          name: user.name,
          image: user.image,
          role: "user",
          createdAt: new Date(),
        };

        const result = await db.insertOne(newUser);
        return result.acknowledged;
      } catch (error) {
        console.error("signIn callback error:", error);
        return false;
      }
    },

    async jwt({ token, user, account }) {
      // This runs on login â€” attach extra fields to token
      if (user && account) {
        try {
          if (account.provider === "google") {
            const db = await dbConnect(collections.USERS);
            const dbUser = await db.findOne({ email: user.email });
            token.role = dbUser?.role ?? "user";
            token.email = dbUser?.email ?? user.email;
          } else {
            // Credentials provider
            token.role = user?.role ?? "user";
            token.email = user?.email;
          }
        } catch (error) {
          console.error("JWT callback error:", error);
          // Fallback so token is never empty
          token.role = token.role ?? "user";
          token.email = token.email ?? user?.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.email = token.email;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // your custom login page route
    error: "/login", // redirect auth errors to login page
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
};
