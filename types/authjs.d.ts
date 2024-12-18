import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "@auth/core/adapters"; 

declare module "@auth/core/adapters" {
   interface AdapterUser {
     role: string;  // Menambahkan properti 'role' pada tipe AdapterUser
   }
 }

declare module "next-auth" {
   interface Session{
      user: User & DefaultSession["user"]
   }
   interface User {
      id?: string;
      role: string;
   }
}

declare module "next-auth/jwt" {
   interface JWT { 
      sub: string;
      role: string;
      id? : string;
   } 
}