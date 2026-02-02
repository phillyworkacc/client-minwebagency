"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import ListView from "@/components/ListView/ListView";
import { formatMilliseconds } from "@/utils/date";

type BadReviewsPageProps = {
   user: Client;
   badReviews: BadReview[];
}

export default function BadReviewsPage ({ user, badReviews }: BadReviewsPageProps) {
   return (
      <AppWrapper isCustomBuild={(user.websiteBuildType === "custom-build")}>
         <div className="text-xl bold-600 full mt-15">Bad Reviews</div>
         <div className="box full pd-15">
            <ListView 
               items={badReviews}
               itemDisplayComponent={(badReview: BadReview) => (
                  <div className="box full dfb column gap-5">
                     <div className="text-xxs full bold-500">{badReview.name}</div>
                     <div className="text-xxxs full grey-5 bold-500 mb-2">{badReview.email}</div>
                     <div className="text-xs full pd-05">{badReview.review}</div>
                     <div className="text-xxxs full grey-5">Sent review on {formatMilliseconds(parseInt(badReview.createdAt))}</div>
                  </div>
               )}
            />
         </div>
      </AppWrapper>
   )
}
