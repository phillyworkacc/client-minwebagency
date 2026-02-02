"use client"
import Card from "@/components/Card/Card";
import { CircleCheck, CircleUser, ThumbsDown } from "lucide-react";
import { CSSProperties } from "react";

type TemplateClientProps = {
   client: Client;
   conversations: Conversation[];
   jobsCompleted: Job[];
   badReviews: BadReview[];
}

export default function TemplateClient ({ client, conversations, jobsCompleted, badReviews }: TemplateClientProps) {
   if (client.websiteBuildType == "custom-build") return <></>;

   const cardStyles: CSSProperties = {
      boxShadow: "none", width: "100%", maxWidth: "380px",
      borderRadius: "20px", padding: "20px"
   }

   return (
      <div className="box full pd-2">
         <div className="box dfb full wrap gap-10">
            <Card styles={cardStyles}>
               <div className="text-xxxs grey-4 dfb align-center gap-5">Total Leads <CircleUser size={15} /></div>
               <div className="text-xl bold-700">{conversations.length}</div>
            </Card>
            <Card styles={cardStyles}>
               <div className="text-xxxs grey-4 dfb align-center gap-5">Jobs Completed <CircleCheck size={15} /></div>
               <div className="text-xl bold-700">{jobsCompleted.length}</div>
            </Card>
            <Card styles={cardStyles}>
               <div className="text-xxxs grey-4 dfb align-center gap-5">Bad Reviews <ThumbsDown size={15} /></div>
               <div className="text-xl bold-700">{badReviews.length}</div>
            </Card>
         </div>
      </div>
   )
}
