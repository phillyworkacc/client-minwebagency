"use client"
import MessagesWrapper from "@/components/AppWrapper/MessagesWrapper";
import ConversationBox from "@/components/ConversationBox/ConversationBox";

type MessagesPageProps = {
   client: Client;
   contacts: ConversationList[];
}

export default function MessagesPage ({ client, contacts }: MessagesPageProps) {
   return (
      <MessagesWrapper 
         contentWrapperStyles={{ padding: 0 }} 
         isCustomBuild={(client.websiteBuildType === "custom-build")}
      >
         <ConversationBox convos={contacts} />
      </MessagesWrapper>
   )
}
