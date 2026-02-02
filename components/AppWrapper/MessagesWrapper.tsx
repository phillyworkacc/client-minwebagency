"use client"
import "./AppWrapper.css"
import "@/styles/app.css"
import { CSSProperties, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CustomUserIcon, MinwebAppLogo } from '../Icons/Icon'
import { ChevronRight, House, Menu, MessageCircle, ThumbsDown, UserStar } from "lucide-react"
import { useModal } from "../Modal/ModalContext"
import userDefaultImage from "@/public/clientdefault.jpg"

type MessagesWrapperProps = {
   children: ReactNode;
   isCustomBuild?: boolean;
   contentWrapperStyles?: CSSProperties;
}

export default function MessagesWrapper ({ children, contentWrapperStyles, isCustomBuild }: MessagesWrapperProps) {
   const { data: session } = useSession();
   const { showModal, close } = useModal();
   const router = useRouter();

   const links = isCustomBuild
      ? [ { name: "Review Minweb", href: "/review-minweb", icon: <UserStar size={17} />, color: "#8100b4" } ]
      : [
         { name: "Home", href: "/", icon: <House size={17} />, color: "#003ba8" },
         { name: "Messages", href: "/messages", icon: <MessageCircle size={17} />, color: "#c05600" },
         { name: "Bad Reviews", href: "/bad-reviews", icon: <ThumbsDown size={17} />, color: "#850202" },
         { name: "Review Minweb", href: "/review-minweb", icon: <UserStar size={17} />, color: "#8100b4" },
      ];

   const showHeaderLinksModalBtn = () => {
      showModal({
         content: <>
            <div className="text-l full bold-600 mb-15">Header Links</div>
            <div className="box full dfb column gap-10">
               {links.map(link => (
                  <div 
                     key={link.href}
                     className="box full dfb align-center gap-10 cursor-pointer pd-1"
                     onClick={() => {
                        router.push(link.href);
                        close();
                     }}
                  >
                     <div
                        className="box fit h-fit pd-1 pdx-1 dfb align-center justify-center"
                        style={{ aspectRatio: '1', borderRadius: "100%", background: `${link.color}`, color: "white" }}
                     >{link.icon}</div>
                     <div className="box full dfb align-center gap-5">
                        <div className="text-xxs bold-600 fit">{link.name}</div>
                        <ChevronRight size={15} />
                     </div>
                  </div>
               ))}
            </div>
            <div className="box full mt-1">
               <button className="xxs pd-1 full outline-black" onClick={close}>Close</button>
            </div>
         </>
      })
   }
   
   return (
      <>
         <div className="account-bar-wrapper">
            <div className="account-bar">
               <div className="app-icon">
                  <div className="app-icon-clickable" onClick={() => router.push("/")}>
                     <MinwebAppLogo size={40} />
                  </div>
               </div>
               <div className="box fit h-full pdx-1">
                  <button className="outline-black no-shadow pdx-05" onClick={showHeaderLinksModalBtn}>
                     <Menu />
                  </button>
               </div>
               <div className="account-image" onClick={() => router.push("/account")}>
                  <CustomUserIcon url={session?.user?.image! || userDefaultImage.src} size={40} round />
               </div>
            </div>
         </div>
         <div className="messages-app">
            <div className="content">
               <div className="content-wrapper" style={contentWrapperStyles}>
                  {children}
               </div>
            </div>
         </div>
      </>
   )
}