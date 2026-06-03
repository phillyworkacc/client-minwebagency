import { db } from "@/db";
import { pushNotificationsTable } from "@/db/schemas";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
   try {
      const pushNotificationBody = await req.json();

      console.log(pushNotificationBody);

      // find old subscription and delete it
      await db.delete(pushNotificationsTable).where(eq(pushNotificationsTable.clientId, pushNotificationBody.clientId));
   
      // insert new subscription
      await db.insert(pushNotificationsTable).values({
         clientId: pushNotificationBody.clientId,
         subscription: pushNotificationBody.subscription,
         createdAt: Date.now().toString(),
         updatedAt: Date.now().toString()
      });
      return Response.json({ success: true }, { status: 200 });
   } catch (err) {
      return Response.json({ success: false }, { status: 500 });
   }
}