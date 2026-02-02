import { dalRequireAuthRedirect } from "@/dal/helpers";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../actions/user";
import AccountPage from "./Account";

export async function generateMetadata() {
   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");
   return {
      title: `Account Settings - ${currentClient.websiteBuildType == "custom-build" ? currentClient.name : currentClient.businessName}`
   };
}

export default async function Account () {
   await dalRequireAuthRedirect();

   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");

   return <AccountPage client={JSON.parse(JSON.stringify(currentClient))} />
}
