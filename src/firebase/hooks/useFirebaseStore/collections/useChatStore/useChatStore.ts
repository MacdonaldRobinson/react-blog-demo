import {store} from "../../../../firebase.config"
import { query, getDocs, collection, orderBy, addDoc, onSnapshot, Timestamp} from "firebase/firestore"
import { useCallback, useEffect } from "react";
import {v4 as newGuid} from "uuid"

type TChatMessage = {    
    userName: string;
    message: string;
}

type TChatMessageWithId = TChatMessage & {
    id:string;
    createdOn: Date;    
}

export type TChatStore = {
    onListenForUpdates:(newChatMessages:TChatMessageWithId[])=>void
}

const chatMessagesRef = collection(store, "ChatMessages")

const useChatStore = ({onListenForUpdates}:TChatStore)=>{

    const convertTimestampToDate = (date: Date) =>{
        return date instanceof Timestamp 
                ? date.toDate() 
                : new Date(date);
    }

    const listenForUpdates = useCallback(()=>{
        const queryRef = query(chatMessagesRef, orderBy("createdOn"))

        try{
            const unsubscribe = onSnapshot(queryRef, (snapshot)=>{
                const newMessages: TChatMessageWithId[] =  snapshot.docs.map((docSnapShot)=>{
                const snapshotData = docSnapShot.data() as TChatMessageWithId;
                    return {
                        ...snapshotData,
                        createdOn: convertTimestampToDate(snapshotData.createdOn)
                    } as TChatMessageWithId
                    
                })

                onListenForUpdates(newMessages)

            })

            return unsubscribe;
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[onListenForUpdates])

    useEffect(()=>{
        const unsubscribe = listenForUpdates()

        return ()=> {
            unsubscribe()
        }
    },[listenForUpdates])

    const getChatMessages = useCallback(async ()=> {
        try{
            console.log("useChatStore > getChatMessages")
            const queryRef = query(chatMessagesRef, orderBy("createdOn"))
            const querySnapShot = await getDocs(queryRef)

            const chatMessages = querySnapShot.docs.map((docSnapShot)=>{                
                const snapshotData = docSnapShot.data() as TChatMessageWithId;
                return {
                    ...snapshotData,
                    createdOn: convertTimestampToDate(snapshotData.createdOn)
                } as TChatMessageWithId
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