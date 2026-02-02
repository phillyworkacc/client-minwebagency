"use server"
import { dalDbOperation, dalRequireAuth } from "@/dal/helpers";
import { db } from "@/db";
import { clientsTable } from "@/db/schemas";
import { authOptions } from "@/lib/authOptions";
import { hashPwd } from "@/utils/uuid";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";


export async function getCurrentUser () {
   try {
      const session = await getServerSession(authOptions);
      if (!session) return null;
      if (!session.user) return null;

      const user = await db.select().from(clientsTable)
         .where(eq(clientsTable.email, session.user.email!))
         .limit(1);

      return user.length > 0 ? user[0] : null;
   } catch (err) {
      return null;
   }
}

export async function logUserIn (email: string, password: string) {
   try {
      const user = await db.select().from(clientsTable)
         .where(and(
            eq(clientsTable.email, email),
            eq(clientsTable.password, hashPwd(password)),
         ))
         .limit(1);
         
      return user.length > 0 ? user[0] : false;
   } catch (err) {
      console.log(err);
      return false;
   }
}

type ClientNewInfo = {
   name: string;
   businessName: string;
   email: string;
   phoneNumber: string;
}

export async function updateClientAccount (clientId: string, newInfo: ClientNewInfo) {
   try {
      const { name, businessName, phoneNumber, email }  = newInfo;
      const latestupdate = Date.now().toString();
      const updatedClientAccount = await dalRequireAuth(user => 
         dalDbOperation(async () => {
            const result = await db.update(clientsTable)
               .set({ name, businessName, phoneNumber, email, latestupdate })
               .where(eq(clientsTable.clientid, clientId));
            
            return (result.rowCount > 0)
         })
      );
      return updatedClientAccount.success ? updatedClientAccount.data : false;
   } catch (err) {
      console.log(err);
      return false;
   }
}

export async function updateClientPassword (clientId: string, newPassword: string) {
   try {
      const password = hashPwd(newPassword);
      const updatedClientPwd = await dalRequireAuth(user => 
         dalDbOperation(async () => {
            const result = await db.update(clientsTable)
               .set({ password })
               .where(eq(clientsTable.clientid, clientId));
            
            return (result.rowCount > 0)
         })
      );
      return updatedClientPwd.success ? updatedClientPwd.data : false;
   } catch (err) {
      console.log(err);
      return false;
   }
}

export async function sendReviewForClient (clientId: string, clientReviews: string, review: string) {
   const sent = await dalRequireAuth(user => 
      dalDbOperation(async () => {
         const reviews = [review, ...clientReviews.split("@@!!@@")!].join("@@!!@@");
         const latestupdate = Date.now().toString();
   
         const res = await db.update(clientsTable)
            .set({ review: reviews, latestupdate })
            .where(eq(clientsTable.clientid, clientId));
         
         return (res.rowCount > 0);
      })
   )
   return sent.success ? sent.data : false;
}