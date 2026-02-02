"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import Spacing from "@/components/Spacing/Spacing"
import { House } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFoundPage () {
   const router = useRouter();

   return (
      <AppWrapper>
         <div className="text-xl bold-600">Page Not Found</div>
         <Spacing />
         <button className="xxs pd-11 pdx-2" onClick={() => router.push("/")}>
            <House size={17} /> Back to Home
         </button>
      </AppWrapper>
   )
}
