import {store} from "../../../../firebase.config"
import { query, getDocs, collection, orderBy, addDoc, onSnapshot, Timestamp} from "firebase/firestore"
import { useCallback, useEffect } from "react";
import useFirebaseStore from "../../useFirebaseStore";
import useFirebaseAuth from "../../../useFirebaseAuth/useFirebaseAuth";

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
    const {authUser} = useFirebaseAuth()
    const {useUsersStore} = useFirebaseStore()
    const {getUserFromLocalStorage, updateUser} = useUsersStore()

    const convertTimestampToDate = (date: Date) =>{
        return date instanceof Timestamp 
                ? date.toDate() 
                : new Date(date);
    }

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
    },[onListenForUpdates])

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

    const sendMessage = useCallback(async (message: TChatMessage)=>{
        try{
            console.log("useChatStore > sendMessage")

            const user = await getUserFromLocalStorage()

            const updatedMessage:TChatMessageWithMetaInfo = {                
                ...message,
                createdOn: new Date(),                
                userId: user?.id  ?? "",
                authUserId: authUser?.uid?? ""
            }

            await addDoc(chatMessagesRef, updatedMessage)
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[authUser?.uid, getUserFromLocalStorage])

    const updateUserName = async (newUserName: string)=>{
        const userInStorage = await getUserFromLocalStorage()

        if(userInStorage){
            return await updateUser({
                ...userInStorage,
                userName: newUserName
            })
        }

        return userInStorage;
    }

    useEffect(()=>{
        const unsubscribe = listenForUpdates()

        return ()=> {
            unsubscribe()
        }
    },[listenForUpdates])

    return {getChatMessages, sendMessage, updateUserName}
}

export default useChatStore;