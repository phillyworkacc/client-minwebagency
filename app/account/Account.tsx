'use client'
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import Spacing from "@/components/Spacing/Spacing";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import { CustomUserIcon } from "@/components/Icons/Icon";
import { formatMilliseconds } from "@/utils/date";
import { KeyRound, LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateClientAccount } from "../actions/user";
import { signOut, useSession } from "next-auth/react";
import { reloadSession } from "@/lib/reloadSession";
import { useRouter } from "next/navigation";

type AccountPageProps = {
   client: Client;
}

export default function AccountPage ({ client }: AccountPageProps) {
   const router = useRouter();
   const { data: session, update } = useSession();
   const [name, setName] = useState(client.name);
   const [businessName, setBusinessName] = useState(client.businessName);
   const [email, setEmail] = useState(client.email);
   const [phoneNumber, setPhoneNumber] = useState(client.phoneNumber);
   
   const saveChangesBtn = async (callback: Function) => {
      if (name.trim() == "") {
         toast.error("Please enter your name");
         callback();
         return;
      }
      if (businessName.trim() == "") {
         toast.error("Please enter your business name");
         callback();
         return;
      }
      if (email.trim() == "") {
         toast.error("Please enter your email");
         callback();
         return;
      }
      if (phoneNumber.trim() == "") {
         toast.error("Please enter your phone number");
         callback();
         return;
      }
      const saved = await updateClientAccount(client.clientid, { name, businessName, phoneNumber, email });
      if (saved) {
         update({
            ...session,
            user: { ...session?.user, email }
         })
         reloadSession();
         toast.success("Saved Changes");
      } else {
         toast.error("Failed to save changes");
      }
      callback();
   }

   return (
      <AppWrapper isCustomBuild={(client.websiteBuildType === "custom-build")}>
         <div className="box full pd-1">
            <CustomUserIcon url={client.image} size={70} round />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-500">Name</div>
            <input 
               type="text" 
               className="xxs pd-12 pdx-2 full" 
               placeholder="Your Name" 
               value={name}
               onChange={e => setName(e.target.value)}
            />
         </div>
         {(client.websiteBuildType == "template-build-site") && (<div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-500">Business Name</div>
            <input 
               type="text" 
               className="xxs pd-12 pdx-2 full" 
               placeholder="Your Business Name" 
               value={businessName}
               onChange={e => setBusinessName(e.target.value)}
            />
         </div>)}
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-500">Email</div>
            <input 
               type="text" 
               className="xxs pd-12 pdx-2 full" 
               placeholder="Your Email" 
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
         </div>
         <div className="box full pd-1 dfb column gap-5">
            <div className="text-s full bold-500">Phone Number</div>
            <input 
               type="text" 
               className="xxs pd-12 pdx-2 full" 
               placeholder="Your Phone Number" 
               value={phoneNumber}
               onChange={e => setPhoneNumber(e.target.value)}
            />
         </div>
         <div className="box full pd-05">
            <AwaitButton className="xxxs pd-1 pdx-2" onClick={saveChangesBtn}>
               Save Changes
            </AwaitButton>
         </div>
         <Spacing size={3} />
         <div className="box full pd-1">
            <div className="text-m mb-1 bold-600">Account Security</div>
            <div className="box full pd-1">
               <button className="xxxs pd-1 pdx-2" onClick={() => router.push('/change-password')}>
                  <KeyRound size={16} /> Change Password
               </button>
            </div>
            <div className="box full pd-1">
               <button className="xxxs pd-1 pdx-2 outline-black" onClick={() => signOut()}>
                  <LogOut size={16} /> Sign Out
               </button>
            </div>
         </div>
         <Spacing />
         <div className="text-xxxs grey-4 full">Onboarded on {formatMilliseconds(parseInt(client.createdat))}</div>
         <Spacing size={3} />
      </AppWrapper>
   )
}
