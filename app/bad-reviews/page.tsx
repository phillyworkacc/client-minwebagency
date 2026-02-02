import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { badReviewsTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../actions/user";
import BadReviewsPage from "./BadReviews";

export async function generateMetadata() {
   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");
   return {
      title: `Bad Reviews - ${currentClient.websiteBuildType == "custom-build" ? currentClient.name : currentClient.businessName}`
   };
}

export default async function BadReviews () {
   await dalRequireAuthRedirect();

   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");

   const serialize = (data: any) => JSON.parse(JSON.stringify(data));

   const badReviews = await dalRequireAuth(user => 
      dalDbOperation(async () => {
         const res = (user.websiteBuildType !== "custom-build")
            ? await db.select().from(badReviewsTable).where(eq(badReviewsTable.clientId, user.clientid!))
            : [];
         
         return res;
      })
   );

   if (badReviews.success) {
      return <BadReviewsPage user={serialize(currentClient)} badReviews={serialize(badReviews.data)} />
   } else {
      return <BadReviewsPage user={serialize(currentClient)} badReviews={serialize([])} />
   }
}
