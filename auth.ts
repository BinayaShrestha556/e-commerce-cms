import NextAuth, { DefaultSession } from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import db from "./lib/prismadb"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"

export type ExtendedUser=DefaultSession["user"]&{
  role:UserRole
}
declare module "next-auth"{
  interface Session{
    user:ExtendedUser;
  }
}

export const {
  handlers:{GET,POST}, auth,signIn,signOut
}=NextAuth({
  pages:{
    signIn:"/auth/login",
  error:"/auth/error"
  },
  events:{
    async linkAccount({user,account}){
      const role=account.provider === "github" ? "ADMIN" : "USER";
   await db.user.update({
    where:{id:user.id},
    data:{emailVerified:new Date(),role}
   })
    }
  },
  callbacks:{
    async redirect({ url, baseUrl }) {
      // Step 1: Define a list of allowed domains to which users can be redirected
      const allowedDomains = ["http://localhost:3001"];
  
      // Step 2: Check if the `url` starts with any of the allowed domains
      const isAllowed = allowedDomains.some((domain) => url.startsWith(domain));
     

 

      return isAllowed ? url : baseUrl;
    },
    async signIn({user,account}){
      if (account?.provider!=="credentials") return true
      if(!user.id) return false
      const existingUser = await getUserById(user.id);
      if(!existingUser?.emailVerified) return false;
      return true
    },
    async session({token,session}){
     
      if( token.sub&&session.user){
        session.user.id=token.sub;
      }
      if(token.role&&session.user){
        session.user.role=token.role as UserRole
      }
      return session
    },
    async jwt({token}){
      if(!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token;
      token.role=existingUser.role;
      return token
    }
  },
  adapter:PrismaAdapter(db),
    session:{strategy:"jwt"},
    ...authConfig
  
})