'use client'
import { toast } from "sonner";
import { useState } from "react";
import { sendReviewForClient } from "./actions/user";
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import ClientBanner from "@/components/ClientBanner/ClientBanner";
import ListView from "@/components/ListView/ListView";
import ClientWebsite from "@/components/ClientWebsite/ClientWebsite";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import TemplateClient from "./TemplateClient";

type HomePageProps = {
   user: Client;
   websites: Website[];
   conversations: Conversation[];
   jobsCompleted: Job[];
   badReviews: BadReview[];
}

export default function HomePage ({ user, websites, conversations, jobsCompleted, badReviews }: HomePageProps) {
   return (
      <AppWrapper isCustomBuild={(user.websiteBuildType === "custom-build")}>
         <div className="box full pd-1">
            <ClientBanner client={user} />
         </div>

         <TemplateClient
            client={user} 
            conversations={conversations} 
            jobsCompleted={jobsCompleted} 
            badReviews={badReviews}
         />
         
         {(websites.length > 0) && (<>
            <div className="box full pd-1">
               <div className="box full dfb column gap-10">
                  <ListView 
                     items={websites}
                     itemDisplayComponent={(item: Website) => (
                        <ClientWebsite clientInfo={user} website={item} />
                     )}
                  />
               </div>
            </div>
         </>)}
      </AppWrapper>
   )
}
