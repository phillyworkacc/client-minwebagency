"use server"
import { db } from "@/db";
import { automationRunsTable, automationsTable } from "@/db/schemas";
import { and, eq } from "drizzle-orm";

export async function logAutomationExecution (automationId: string, clientId: string, conversationId: string, customerPhone: string, delay: number) {
   try {
      const runAt = Date.now() + delay;
      await db.insert(automationRunsTable).values({
         automationId, clientId, conversationId, customerPhone, runAt,
         status: "pending"
      });
   } catch (e) {
      console.log(e);
   }
}

export async function runAutomation (clientId: string, conversationId: string, customerPhone: string, type: "review" | "referral") {
   try {
      const automations = await db.select().from(automationsTable)
         .where(and(
            eq(automationsTable.clientId, clientId),
            eq(automationsTable.type, type),
            eq(automationsTable.enabled, true)
         )).limit(1);
      
      if (automations.length > 0) {
         await logAutomationExecution(automations[0].automationId!, clientId, conversationId, customerPhone, automations[0].delay!);
      } else {
         return false;
      }
   } catch (err) {
      console.error(err);
      return false;
   }
}