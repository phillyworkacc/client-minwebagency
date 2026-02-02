"use client"
import { getWebsiteMetadata } from "@/app/actions/extras";
import { SquareArrowOutUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { CustomUserIcon, WebsiteIcon } from "../Icons/Icon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DefaultWebsiteIcon from "@/public/loading-site.png";

type ClientWebsiteProps = {
   website: Website;
   clientInfo: Client;
}

export default function ClientWebsite ({ website, clientInfo }: ClientWebsiteProps) {
   const router = useRouter();
   const [metadata, setMetadata] = useState({
      websiteTitle: website.url, icon: DefaultWebsiteIcon.src
   })

   const loadMetadata = async () => {
      const siteMetadata = await getWebsiteMetadata(`https://${website.url}`);
      if (siteMetadata !== null) setMetadata(siteMetadata);
   }

   useEffect(() => {
      const load = () => loadMetadata();
      load();
   }, [])

   return (
      <div className="box full dfb align-center gap-10">
         <div className="box h-full fit">
            <WebsiteIcon url={metadata.icon} size={40} round />
         </div>
         <div className="box full dfb column">
            <div className="text-s full bold-600">{metadata.websiteTitle}</div>
            <div className="box fit dfb align-center justify-center gap-10">
               <Link className="text-xxxs fit" href={`https://${website.url}`} target="_blank">
                  <div className="text-xxxs fit dfb align-center gap-5 visible-link grey-5">
                     Visit Website <SquareArrowOutUpRight size={13} />
                  </div>
               </Link>
            </div>
         </div>
      </div>
   )
}