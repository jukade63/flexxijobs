import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { BACKEND_URL } from "./constants";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT) {
    const resp = await fetch(BACKEND_URL + "/auth/refresh", {
      method: "POST",
      headers: {
        authorization: "Refresh " + token.refreshToken,
      },
    });
    
    const data = await resp.json();
      
    return {
      ...token,
      ...data,
    }
  }

export const authOptions: NextAuthOptions = {

    pages: {
      signIn: '/sign-in', 
    },
    providers: [
      Credentials({
        id: "email-password",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        authorize: async (credentials) => {
            if(!credentials?.email || !credentials?.password) {
              throw new Error('Invalid credentials');
            }
            const resp = await fetch(BACKEND_URL + "/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(credentials),
            })
            const result = await resp.json();
            if(!resp.ok ) {
              throw new Error(result.message);
            }
           
            return result;
        },           
      })
       
    ],
   
  
    callbacks: {
      jwt: async ({ token, user, trigger, session }) => {
  
        if (trigger === "update") {
          return {
            ...token,
            user: {
              ...user,
              ...session.user
            }
          }
        }      
        if (user) return {...token, ...user}      
        if(new Date().getTime() < (new Date(token.expiresIn).getTime())) {
          return token;
        }
        return await refreshToken(token);
      },
      session: async ({ token, session }) => {
        session.user = token.user
        session.accessToken = token.accessToken
        session.refreshToken = token.refreshToken
        
        return session;
      },
    
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
  
  }
  