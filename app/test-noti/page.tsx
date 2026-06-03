import webpush from "@/utils/webpush";
import { getSubscriptionsForClient } from "../actions/notifications";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/user";
import { dalRequireAuthRedirect } from "@/dal/helpers";

export default async function page() {
   await dalRequireAuthRedirect();

   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");

   const userSubscriptions: any[] = await getSubscriptionsForClient(currentClient.clientid);

   for (const userSubscription of userSubscriptions) {
      await webpush.sendNotification(
         userSubscription.subscription as any,
         JSON.stringify({
            title: "New SMS",
            body: "John Smith sent a message",
            url: "/messages/123",
         })
      );
   }


   return (
      <div>
         testing notification
      </div>
   )
}
