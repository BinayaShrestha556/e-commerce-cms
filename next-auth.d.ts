import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role?: string; // Add role to the Session's user
    } & DefaultUser;
  }

  interface User {
    role?: string; // Add role to the User object
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Add role to the JWT token
  }
}
