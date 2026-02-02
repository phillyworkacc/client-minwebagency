import { db } from "@/db";
import { clientsTable } from "@/db/schemas";
import { hashPwd } from "@/utils/uuid";
import { and, eq } from "drizzle-orm";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
   session: {
      strategy: "jwt"
   },
   providers: [
      CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {},
				password: {}
			},
         async authorize (credentials, req) {
            if (credentials?.email == "" || credentials?.password == "") {
               return null;
            } else {
               const results = await db
                  .select().from(clientsTable)
                  .where(and(
                     eq(clientsTable.email, credentials?.email!),
                     eq(clientsTable.password, hashPwd(credentials?.password!))
                  )).limit(1);
               if (results.length > 0) {
                  return {
                     id: results[0].clientid!,
                     email: results[0].email!,
                     name: results[0].name!,
                     image: results[0].image!,
                  }
               } else {
                  return null;
               }
            }
         }
      })
   ],
   callbacks: {
      jwt: async ({ user, token, trigger, session }) => {
         if (trigger == "update") {
            return { ...token, ...session.user }
         }
         return { ...token, ...user }
      }
   }
}