import {store, auth} from "../../../../firebase.config"
import { query, getDocs, collection, orderBy, addDoc, onSnapshot} from "firebase/firestore"
import { useCallback, useEffect } from "react";
import useFirebaseStore from "../../useFirebaseStore";
import useFirebaseMessaging from "../../../useFirebaseMessaging/useFirebaseMessaging";

type TChatMessage = {    
    userName: string;
    message: string;
    userId:string;
    authUserId:string;
}

type TChatMessageWithMetaInfo = TChatMessage & {
    id?: string;
    createdOn: Date;
}

export type TChatStore = {
    onListenForUpdates:(newChatMessages:TChatMessageWithMetaInfo[])=>void
}

const chatMessagesRef = collection(store, "ChatMessages")

const useChatStore = ({onListenForUpdates}:TChatStore)=>{
    const {useUsersStore, convertTimestampToDate} = useFirebaseStore()
    const {getUserFromLocalStorage,getUserById, clearUsersLocalStorage} = useUsersStore()    
    const {requestToken} = useFirebaseMessaging()

    const listenForUpdates = useCallback(()=>{
        const queryRef = query(chatMessagesRef, orderBy("createdOn"))

        try{
            const unsubscribe = onSnapshot(queryRef, (snapshot)=>{
                const newMessages: TChatMessageWithMetaInfo[] =  snapshot.docs.map((docSnapShot)=>{
                const snapshotData = docSnapShot.data() as TChatMessageWithMetaInfo;
                    return {
                        ...snapshotData,
                        id: docSnapShot.id,
                        createdOn: convertTimestampToDate(snapshotData.createdOn)
                    } as TChatMessageWithMetaInfo
                    
                })

                onListenForUpdates(newMessages)

            })

            return unsubscribe;
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[])

    const getChatMessages = useCallback(async ()=> {
        try{
            console.log("useChatStore > getChatMessages")
            const queryRef = query(chatMessagesRef, orderBy("createdOn"))
            const querySnapShot = await getDocs(queryRef)

            const chatMessages = querySnapShot.docs.map((docSnapShot)=>{                
                const snapshotData = docSnapShot.data() as TChatMessageWithMetaInfo;
                return {
                    ...snapshotData,
                    id: snapshotData.id,
                    createdOn: convertTimestampToDate(snapshotData.createdOn)
                } as TChatMessageWithMetaInfo
            })

            return chatMessages as TChatMessageWithMetaInfo[]
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[])

    const reCreateLocalStorage = async ()=>{

        clearUsersLocalStorage()
        
        const userInStorage = await requestToken()

        if(!userInStorage)
        {
            console.error("Error creating storage");            
        }      
        
        return userInStorage;
    }

    const sendMessage = useCallback(async (message: TChatMessage)=>{
        try{
            console.log("useChatStore > sendMessage")

            let userInStorage = await getUserFromLocalStorage()
            
            if(!userInStorage){
                userInStorage = await reCreateLocalStorage() ?? userInStorage

                if(!userInStorage)
                {
                    console.error("Error creating storage");
                    return
                }
            }

            const userInDb = await getUserById(userInStorage.id)

            if(!userInDb)
            {
                console.error("Cannot find user id in db, clearing local storage")                
                await reCreateLocalStorage()
            }

            const updatedMessage:TChatMessageWithMetaInfo = {                
                ...message,
                createdOn: new Date(),                
                userId: userInDb?.id  ?? "",
                authUserId: auth.currentUser?.uid?? ""
            }

            await addDoc(chatMessagesRef, updatedMessage)
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[])

    useEffect(()=>{
        const unsubscribe = listenForUpdates()

        return ()=> {
            unsubscribe()
        }
    },[])

    return {getChatMessages, sendMessage}
}

export default useChatStore;