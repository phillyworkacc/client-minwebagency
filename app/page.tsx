import { dalDbOperation, dalRequireAuth, dalRequireAuthRedirect } from "@/dal/helpers";
import { getCurrentUser } from "./actions/user";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { badReviewsTable, conversationsTable, jobsTable, websitesTable } from "@/db/schemas";
import { eq } from "drizzle-orm";
import HomePage from "./HomePage";

export async function generateMetadata() {
   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");
   return {
      title: `${currentClient.websiteBuildType == "custom-build" ? currentClient.name : currentClient.businessName} - Client Dashboard`
   };
}

export default async function Home () {
	await dalRequireAuthRedirect();

	const currentClient: any = await getCurrentUser();
	if (currentClient == null) redirect("/login");

	const serialize = (data: any) => JSON.parse(JSON.stringify(data));

	const homePageInfo = await dalRequireAuth(user => 
		dalDbOperation(async () => {
			const websites = await db.select().from(websitesTable)
				.where(eq(websitesTable.clientid, user.clientid!));
			
			const conversations = (user.websiteBuildType !== "custom-build")
				? await db.select().from(conversationsTable).where(eq(conversationsTable.clientId, user.clientid!))
				: [];
			
			const jobsCompleted = (user.websiteBuildType !== "custom-build")
				? await db.select().from(jobsTable).where(eq(jobsTable.clientId, user.clientid!))
				: [];
			
			const badReviews = (user.websiteBuildType !== "custom-build")
				? await db.select().from(badReviewsTable).where(eq(badReviewsTable.clientId, user.clientid!))
				: [];
			
			return { websites, conversations, jobsCompleted, badReviews };
		})
	);

	if (homePageInfo.success) {
		return <HomePage 
			user={serialize(currentClient)} 
			websites={serialize(homePageInfo.data.websites)}
			conversations={serialize(homePageInfo.data.conversations)}
			jobsCompleted={serialize(homePageInfo.data.jobsCompleted)}
			badReviews={serialize(homePageInfo.data.badReviews)}
		/>
	} else {
		return <HomePage 
			user={serialize(currentClient)}
			websites={serialize([])}
			conversations={serialize([])}
			jobsCompleted={serialize([])}
			badReviews={serialize([])}
		/>
	}
}
