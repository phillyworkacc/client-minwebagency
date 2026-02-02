import { dalRequireAuthRedirect } from "@/dal/helpers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/user";
import ReviewMinwebForm from "./ReviewMinwebForm";

export async function generateMetadata() {
   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");
   return {
      title: `Review Minweb - ${currentClient.websiteBuildType == "custom-build" ? currentClient.name : currentClient.businessName}`
   };
}

export default async function ReviewMinweb () {
   await dalRequireAuthRedirect();

   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");

   const serialize = (data: any) => JSON.parse(JSON.stringify(data));

   return <ReviewMinwebForm user={serialize(currentClient)} />
}
