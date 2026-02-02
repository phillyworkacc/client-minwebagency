'use client'
import "@/styles/auth.css"
import { MinwebAppLogo } from "@/components/Icons/Icon"
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import AwaitButton from "@/components/AwaitButton/AwaitButton";

export default function LoginForm () {
   const router = useRouter();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const onSubmitForm = async (callback: Function) => {
      if (email == "") {
         toast.error("Please enter your email");
         callback();
         return;
      }
      if (password == "") {
         toast.error("Please enter your password");
         callback();
         return;
      }
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
         toast.error("Incorrect Email or Password");
         callback();
      } else {
         router.push("/");
      }
   }

   return (
      <div className="auth">
         <div className="auth-container">

            <div className="box full dfb align-center justify-center">
               <MinwebAppLogo size={50} />
            </div>
            <div className="text-l bold-600 pd-05 full text-center">Login to your account</div>
            <div className="box full pd-1">
               <div className="form-content">
                  <input 
                     type="text" 
                     className="xxs full pd-15 pdx-2" 
                     placeholder="Email"
                     value={email} onChange={e => setEmail(e.target.value)}
                  />
               </div>
               <div className="form-content">
                  <input 
                     type="password" 
                     className="xxs full pd-15 pdx-2" 
                     placeholder="Password"
                     value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <div className="text-xxxs full text-left pd-15 bold-600 accent-color">Forgot Password?</div>
               </div>
               <div className="form-content">
                  <AwaitButton className="xxs pd-15 full" onClick={onSubmitForm}>
                     Login
                  </AwaitButton>
               </div>
            </div>
            <div className="text-xxxs full text-center pd-15">
               By signing in you agree to our <b className="accent-color cursor-pointer">Terms and Conditions</b>
            </div>

         </div>
      </div>
   )
}
