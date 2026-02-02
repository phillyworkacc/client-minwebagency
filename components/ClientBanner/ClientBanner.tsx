'use client'
import Card from '../Card/Card'
import { CSSProperties } from 'react'
import { CustomUserIcon } from '../Icons/Icon'

export default function ClientBanner ({ client }: { client: Client }) {
   const cardStyles: CSSProperties = {
      background: "white", color: "black",
      borderRadius: "15px", border: "1px solid #efefef",
      padding: "15px", boxShadow: "none"
   }

   return (
      <Card styles={cardStyles}>
         <div className="horizontal-convertible full gap-20">
            <div className="box fit h-full dfb align-center justify-center">
               <CustomUserIcon url={client.image} size={70} round />
            </div>
            <div className="box full f-full dfb justify-center column gap-5">
               <div className="text-s full bold-500">{(client.websiteBuildType == "custom-build") ? client.name : client.businessName}</div>
               <div className="text-xxs grey-4 full">
                  {(client.websiteBuildType == "template-build-site") && (<>{client.name} - </>)} {client.email}
               </div>
            </div>
         </div>
      </Card>
   )
}
