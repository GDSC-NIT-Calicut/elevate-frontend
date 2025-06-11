// src/app/api/auth/[...nextauth]/route.ts
import { authConfig } from "@/auth.config";
import NextAuth from "next-auth";

const { auth, handlers } = NextAuth(authConfig);
export const { GET, POST } = handlers;
export { auth }; // or default export if you prefer
