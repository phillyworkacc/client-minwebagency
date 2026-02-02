"use client"
import AppWrapper from "@/components/AppWrapper/AppWrapper";
import ListView from "@/components/ListView/ListView";
import { formatMilliseconds } from "@/utils/date";

type BadReviewsPageProps = {
   user: Client;
   badReviews: BadReview[];
}

export default function BadReviewsPage ({ user, badReviews }: BadReviewsPageProps) {

   const badReviewsTest: BadReview[] = [
      {
         id: 1,
         clientId: "client_001",
         name: "John Smith",
         email: "john.smith@example.com",
         review: "Very disappointed with the service. Took far longer than promised and communication was poor.",
         createdAt: "1768212900000",
      },
      {
         id: 2,
         clientId: "client_002",
         name: "Sarah Johnson",
         email: "sarah.johnson@example.com",
         review: "Not happy at all. The final result was not what was agreed and I had to chase for updates.",
         createdAt: "1768747320000",
      },
      {
         id: 3,
         clientId: "client_003",
         name: "Mark Davies",
         email: "mark.davies@example.com",
         review: "Poor experience. Bugs were left unfixed and support was slow to respond.",
         createdAt: "1769072700000",
      },
      {
         id: 4,
         clientId: "client_004",
         name: "Emily Carter",
         email: "emily.carter@example.com",
         review: "Really frustrating. Missed deadlines and no clear ownership of issues.",
         createdAt: "1769531400000",
      },
      {
         id: 5,
         clientId: "client_005",
         name: "Tom Wilson",
         email: "tom.wilson@example.com",
         review: "Would not recommend. Quality was below expectations and fixes took too long.",
         createdAt: "1769773800000",
      },
      ];


   return (
      <AppWrapper isCustomBuild={(user.websiteBuildType === "custom-build")}>
         <div className="text-xl bold-600 full mt-15">Bad Reviews</div>
         <div className="box full pd-15">
            <ListView 
               items={badReviewsTest}
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
