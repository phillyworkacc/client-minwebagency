'use client'
import { CSSProperties } from 'react'
import { enableNotifications } from '@/utils/notifications'
import Card from '../Card/Card'

export default function EnableNotificationsCard ({ client }: { client: Client }) {
   const cardStyles: CSSProperties = {
      background: "white", color: "black",
      borderRadius: "15px", border: "1px solid #efefef",
      padding: "15px", boxShadow: "none"
   }

   async function enablePushNotifications () {
      await enableNotifications(client.clientid);
   }

   return (
      <Card styles={cardStyles}>
         <div className="box full dfb column pdx-1 pd-1">
            <div className="text-xs bold-600 full">Enable Message Notifications?</div>
            <div className="text-xxxxs full grey-5">Get notified on your phone once you receive a message from a customer</div>
            <div className="box full mt-1">
               <button className="xxxs pd-1 pdx-2" onClick={enablePushNotifications}>Enable</button>
            </div>
         </div>
      </Card>
   )
}