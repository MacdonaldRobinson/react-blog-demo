import {store} from "../../../../firebase.config"
import { query, getDocs, collection, orderBy, addDoc} from "firebase/firestore"
import { useCallback } from "react";
import {v4 as newGuid} from "uuid"

type TChatMessage = {    
    userName: string;
    message: string;
}

type TChatMessageWithId = TChatMessage & {
    id:string;
    createdOn: Date;    
}

const chatMessagesRef = collection(store, "ChatMessages")

const useChatStore = ()=>{
    const getChatMessages = useCallback(async ()=> {
        try{
            console.log("useChatStore > getChatMessages")
            const queryRef = query(chatMessagesRef, orderBy("createdOn"))
            const querySnapShot = await getDocs(queryRef)

            const chatMessages = querySnapShot.docs.map((docSnapShot)=>{                
                return docSnapShot.data() as TChatMessageWithId
            })

            return chatMessages as TChatMessageWithId[]
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[])

    const sendMessage = useCallback(async (message: TChatMessage)=>{
        try{
            console.log("useChatStore > sendMessage")

            const updatedMessage:TChatMessageWithId = {                
                ...message,
                id: newGuid(),
                createdOn: new Date(),                
            }

            await addDoc(chatMessagesRef, updatedMessage)
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[])

    return {getChatMessages, sendMessage}
}

export default useChatStore;