"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper"
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import { useState } from "react";
import { toast } from "sonner";
import { sendReviewForClient } from "../actions/user";

export default function ReviewMinwebForm ({ user }: { user: Client }) {
   const [reviewText, setReviewText] = useState('');

   const submitReviewBtn = async (callback: Function) => {
      if (reviewText.trim() == "") {
         toast.error("Please enter your review");
         callback();
         return;
      }
      const sendReview = await sendReviewForClient(user.clientid, user.review, reviewText);
      if (sendReview) {
         toast.success("Review Sent");
         setReviewText("");
      } else {
         toast.error("Failed to send review");
      }
      callback();
   }

   return (
      <AppWrapper isCustomBuild={(user.websiteBuildType === "custom-build")}>
         <div className="box full pd-2">
            <div className="text-sm bold-600 mb-1">Hi {user.name}</div>
            <div className="text-xl bold-600 mb-1">Write Us A Review</div>
            <div className="box full pd-05">
               <textarea
                  name="review-text"
                  id="review-text"
                  className="xxs full pd-15 pdx-2 h-15"
                  placeholder="Review"
                  value={reviewText} onChange={e => setReviewText(e.target.value)}
               />
            </div>
            <div className="box full pd-05">
               <AwaitButton className="xxs pd-12 pdx-3" onClick={submitReviewBtn}>
                  Submit Review
               </AwaitButton>
            </div>
         </div>
      </AppWrapper>
   )
}
