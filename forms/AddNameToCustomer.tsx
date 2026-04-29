'use client'
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import { updateConversationCustomerName } from "@/app/actions/user";
import { useModal } from "@/components/Modal/ModalContext";
import { useState } from "react";
import { toast } from "sonner";

type AddNameToCustomerProps = {
   conversation: ConversationList;
   onChangedName: (name: string) => void;
}

export default function AddNameToCustomer ({ conversation, onChangedName }: AddNameToCustomerProps) {
   const [newName, setNewName] = useState("");
   const { close } = useModal();

   const handleUpdateName = async (callback: Function) => {
      if (newName.trim() == "") {
         toast.error("Please enter a name for the customer");
         callback();
         return;
      }
      const updated = await updateConversationCustomerName(conversation.conversationId, newName);
      if (updated) {
         toast.success(`Changed name to ${newName}`);
         onChangedName(newName);
         close();
      } else {
         toast.error("Failed to update name, please try again later");
      }
      callback();
   }

   return (
      <div className="box full dfb column gap-5">
         <div className="text-sm full bold-700">Add name</div>
         <div className="text-xxs full grey-5">Enter a name for the the customer below, <b>{conversation.customerName}</b></div>
         <div className="box full">
            <input 
               type="text" 
               className="xxs pd-1 pdx-15 full" 
               placeholder="New Name"
               value={newName}
               onChange={e => setNewName(e.target.value)}
            />
         </div>
         <div className="box full mt-05">
            <AwaitButton className="xxxs pd-1 pdx-2" onClick={handleUpdateName}>Add</AwaitButton>
         </div>
      </div>
   )
}
