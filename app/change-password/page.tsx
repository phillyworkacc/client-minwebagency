import { dalRequireAuthRedirect } from "@/dal/helpers";
import { getCurrentUser } from "../actions/user";
import { redirect } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";

export async function generateMetadata() {
   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");
   return {
      title: `Change Password - ${currentClient.websiteBuildType == "custom-build" ? currentClient.name : currentClient.businessName}`
   };
}

export default async function ChangePassword () {
   await dalRequireAuthRedirect();
   
   const currentClient: any = await getCurrentUser();
   if (currentClient == null) redirect("/login");

   return <ChangePasswordForm user={JSON.parse(JSON.stringify(currentClient))} />
}
