"use client"
import MessagesWrapper from "@/components/AppWrapper/MessagesWrapper";
import ConversationBox from "@/components/ConversationBox/ConversationBox";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

type MessagesPageProps = {
   client: Client;
   contacts: ConversationList[];
}

export default function MessagesPage ({ client, contacts }: MessagesPageProps) {
   const searchParams = useSearchParams();
   const conversationId = searchParams.get("convo");

   return (
      <MessagesWrapper 
         contentWrapperStyles={{ padding: 0 }} 
         isCustomBuild={(client.websiteBuildType === "custom-build")}
      >
         <ConversationBox convos={contacts} selectedConvo={conversationId ?? undefined} />
      </MessagesWrapper>
   )
}
