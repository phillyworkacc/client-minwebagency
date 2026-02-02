'use client'
import { toast } from "sonner";
import { useState } from "react";
import { updateClientPassword } from "../actions/user";
import { useRouter } from "next/navigation";
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import AwaitButton from "@/components/AwaitButton/AwaitButton"

export default function ChangePasswordForm ({ user }: { user: Client }) {
   const router = useRouter();
   const [password, setPassword] = useState('');
   const [password2, setPassword2] = useState('');

   const changePasswordBtn = async (callback: Function) => {
      if (password.trim() == "") {
         toast.error("Please enter a password");
         callback();
         return;
      }
      if (password2.trim() == "") {
         toast.error("Please enter your password again");
         callback();
         return;
      }
      if (password2 !== password) {
         toast.error("Passwords don't match");
         callback();
         return;
      }
      if (password.length < 8) {
         toast.error("Password must be at least 8 characters");
         callback();
         return;
      }
      const updated = await updateClientPassword(user.clientid, password);
      if (updated) {
         toast.success("Password changed successfully");
         router.push("/account");
      } else {
         toast.error("Failed to changed password");
      }
   }

   return (
      <AppWrapper isCustomBuild={(user.websiteBuildType === "custom-build")}>
         <div className="box full pd-1">
            <div className="text-m full bold-500 mb-1">Change Password</div>
            <div className="box full pd-05 dfb column gap-5 mb-1">
               <div className="text-xs full">Password</div>
               <input
                  type="password"
                  className="xxxs pd-12 pdx-2 full"
                  placeholder="Password"
                  value={password} onChange={e => setPassword(e.target.value)}
               />
            </div>
            <div className="box full pd-05 dfb column gap-5">
               <div className="text-xs full">Password (again)</div>
               <input
                  type="password"
                  className="xxxs pd-12 pdx-2 full"
                  placeholder="Password (again)"
                  value={password2} onChange={e => setPassword2(e.target.value)}
               />
            </div>
            <div className="box full pd-15">
               <AwaitButton className="xxxs pd-11 pdx-2" onClick={changePasswordBtn}>
                  Change Password
               </AwaitButton>
            </div>
         </div>
      </AppWrapper>
   )
}
 