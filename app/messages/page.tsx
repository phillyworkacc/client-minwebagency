import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { conversationsTable, jobsTable, messagesTable } from "@/db/schemas";
import { and, eq } from "drizzle-orm";
import { getCurrentUser } from "../actions/user";
import MessagesPage from "./MessagesPage";

export async function generateMetadata() {
   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");
   return {
      title: `Messages - ${currentClient.websiteBuildType == "custom-build" ? currentClient.name : currentClient.businessName}`
   };
}

export default async function Messages () {
   await dalRequireAuthRedirect();

   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");

   const serialize = (data: any) => JSON.parse(JSON.stringify(data));


   const allClientConversations = await dalRequireAuth(user =>
      dalDbOperation(async () => {
         const res = await db
            .select({
               conversationId: conversationsTable.conversationId,
               clientId: conversationsTable.clientId,
               customerName: conversationsTable.customerName,
               customerPhone: conversationsTable.customerPhone,
               lastMessage: {
                  body: messagesTable.body, 
                  direction: messagesTable.direction, 
                  date: messagesTable.date
               },
               jobCompletedAt: jobsTable.completedAt
            })
            .from(conversationsTable)
            .innerJoin(messagesTable, and(
               eq(messagesTable.conversationId, conversationsTable.conversationId),
               eq(messagesTable.messageId, conversationsTable.lastMessageId)
            ))
            .leftJoin(jobsTable, and(
               eq(jobsTable.conversationId, conversationsTable.conversationId),
               eq(jobsTable.clientId, conversationsTable.clientId),
               eq(jobsTable.customerPhone, conversationsTable.customerPhone),
            ))
            .where(eq(conversationsTable.clientId, user.clientid!));

         return res;
      })
   )

   if (allClientConversations.success) {
      return <MessagesPage client={serialize(currentClient)} contacts={serialize(allClientConversations.data)} />
   } else {
      return <MessagesPage client={serialize(currentClient)} contacts={serialize([])} />
   }
}
