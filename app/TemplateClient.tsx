"use client"
import Card from "@/components/Card/Card";
import { CircleCheck, CircleUser, MessageCircle, ThumbsDown, UserStar } from "lucide-react";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

type TemplateClientProps = {
   client: Client;
   conversations: Conversation[];
   jobsCompleted: Job[];
   badReviews: BadReview[];
}

type QuickCardLinksProps = {
   color: string;
   children: React.ReactNode;
   icon: React.ReactNode;
   href: string;
}

function QuickCardLinks ({ color, icon, children, href }: QuickCardLinksProps) {
   const router = useRouter();
   const cardStyles: CSSProperties = {
      width: "100%", maxWidth: "380px", border: "1px solid #ececec", backgroundColor: `${color}60`,
      borderRadius: "20px", boxShadow: "none", padding: "20px", scale: 1, cursor: "pointer",
   }

   const iconStyles: CSSProperties = {
      width: "fit-content", aspectRatio: 1, padding: "8px", backgroundColor: color,
      borderRadius: "100%", display: "flex", alignItems: "center", justifyContent: "center"
   }

   return <Card styles={cardStyles} onClick={() => router.push(href)}>
      <div className="box full" style={iconStyles}>{icon}</div>
      <div className="text-s bold-600 full mt-05">{children}</div>
   </Card>
}

export default function TemplateClient ({ client, conversations, jobsCompleted, badReviews }: TemplateClientProps) {
   if (client.websiteBuildType == "custom-build") return <></>;

   const cardStyles: CSSProperties = {
      boxShadow: "none", width: "100%", maxWidth: "380px",
      borderRadius: "20px", padding: "20px"
   }
   const quickLinks = [
      { name: "Messages", href: "/messages", icon: <MessageCircle size={20} />, color: "#ffaa65" },
      { name: "Bad Reviews", href: "/bad-reviews", icon: <ThumbsDown size={20} />, color: "#ff5050" },
      { name: "Review Minweb", href: "/review-minweb", icon: <UserStar size={20} />, color: "#d261ff" },
   ]
   return (
      <>
         <div className="box full dfb column gap-5 pd-2">
            <div className="text-m full bold-600 pd-05">Quick Links</div>
            <div className="box full dfb wrap gap-10">
               {quickLinks.map(quickLink => (
                  <QuickCardLinks
                     key={quickLink.color}
                     color={quickLink.color}
                     icon={quickLink.icon}
                     href={quickLink.href}
                  >{quickLink.name}</QuickCardLinks>
               ))}

            </div>
         </div>
         <div className="box full mb-1">
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
      </>
   )
}
