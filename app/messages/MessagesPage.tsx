"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import ConversationBox from "@/components/ConversationBox/ConversationBox";

type MessagesPageProps = {
   client: Client;
   contacts: ConversationList[];
}

export default function MessagesPage ({ client, contacts }: MessagesPageProps) {
   return (
      <AppWrapper contentWrapperStyles={{ padding: 0 }} isCustomBuild={(client.websiteBuildType === "custom-build")}>
         <ConversationBox convos={contacts} />
      </AppWrapper>
   )
}
