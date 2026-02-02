"use server"
import { dalDbOperation } from "@/dal/helpers";
import { db } from "@/db";
import { clientsTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function getClientFromClientId (clientId: string) {
   try {
      const res = await db.select()
         .from(clientsTable)
         .where(eq(clientsTable.clientid, clientId))
         .limit(1);
      return (res.length > 0) ? res[0] : undefined;
   } catch (e) {
      return undefined;
   }
}

export async function sendReviewForClient (clientId: string, review: string) {
   const result: any = await dalDbOperation(async () => {
      const client = await db.select()
         .from(clientsTable)
         .where(eq(clientsTable.clientid, clientId));
      
      const reviews = [review, ...client[0]?.review?.split("@@!!@@")!].join("@@!!@@");
      const now = `${Date.now()}`;

      const res = await db.update(clientsTable)
         .set({
            review: reviews,
            latestupdate: now
         })
         .where(eq(clientsTable.clientid, clientId));
      
      return (res.rowCount > 0);
   })
   return result;
}