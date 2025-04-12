import {store, auth } from "../../../../firebase.config"
import {collection, getDocs, query, orderBy, addDoc, doc, getDoc, where, updateDoc} from "firebase/firestore"
import { useCallback } from "react";
import useFirebaseStore from "../../useFirebaseStore";


type TUserStoreData = {
    fcmToken: string;
    authUserId: string;
    updatedOn:Date;
    createdOn: Date;
}

export type TUser = TUserStoreData & {
    id: string;
}

const collectionName = "Users";
const useStorageKey = "User";
const usersRef = collection(store, collectionName)

const useUsersStore = ()=>{        
    const {convertTimestampToDate} = useFirebaseStore()

    const clearUsersLocalStorage = ()=>{
        console.log("useUsersStore > clearUsersLocalStorage")

        const foundItem = localStorage.getItem(useStorageKey);

        if (foundItem) {
            localStorage.removeItem(useStorageKey)            
        }        
    }

    const getUserFromLocalStorage = useCallback(async () => {
        console.log("useUsersStore > getUserFromLocalStorage")

        const foundItem = localStorage.getItem(useStorageKey);

        if (foundItem) {
            const storedUser: TUser = JSON.parse(foundItem);            
            return storedUser;
        }

        return null;
    },[]);    
    
    const setUserInLocalStorage = useCallback(async (user: TUser) => {
        try{            
            console.log("useUsersStore > setUserInLocalStorage", user)
    
            if(user.fcmToken == "") {
                throw new Error("fcmToken is empty")                
            }                

            const updateData:TUser = {
                ...user,
                authUserId: auth.currentUser?.uid ?? ""
            }
                
            const userData = JSON.stringify(updateData);

            localStorage.setItem(
                useStorageKey,
                userData
            );
    
            const foundItem = localStorage.getItem(useStorageKey);
    
            return JSON.parse(foundItem!) as TUser;
        }
        catch(e){
            console.error(e)
            throw e
        }
    },[]);
    
    const getUsers = async ()=>{
        try{
            console.log("useUsersStore > getUsers")

            const queryRef = query(usersRef, orderBy("userName"));
            const response = await getDocs(queryRef)
            const users = response.docs.map((docSnapShot)=>{
                const docData = docSnapShot.data() as TUserStoreData
                const user:TUser = {
                    ...docData,
                    id: docSnapShot.id,
                    authUserId: auth.currentUser?.uid ?? "",
                    createdOn: convertTimestampToDate(docData.createdOn),
                    updatedOn: convertTimestampToDate(docData.updatedOn),                    
                }
                return user;
            })

            console.log("useUsersStore > getUsers", users)

            return users;
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }
    
    const getUserById = useCallback(async (id: string)=>{

        try{
            console.log("useUsersStore > getUserById")        
            
            const docRef = doc(store, collectionName, id);
            const docSnap = await getDoc(docRef);                        
    
            if(docSnap.exists())
            {
                const docData = docSnap.data() as TUserStoreData
                
                const user: TUser = {
                    ...docData,
                    id: id,
                    authUserId: auth.currentUser?.uid ?? "",
                    createdOn: convertTimestampToDate(docData.createdOn),
                    updatedOn: convertTimestampToDate(docData.updatedOn),
                
                }

                return user;
            }
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[convertTimestampToDate])

    const getUsersByToken = async (fcmToken: string)=>{

        try{
            console.log("useUsersStore > getUserByToken")        
            
            const queryRef = query(usersRef, where("fcmToken", "==", fcmToken));
            const response = await getDocs(queryRef);

            const users: TUser[] = response.docs.map((docSnapshot)=>{
                const docData = docSnapshot.data() as TUserStoreData
                const user:TUser = {
                    ...docData,
                    id: docSnapshot.id,
                    createdOn: convertTimestampToDate(docData.createdOn),
                    updatedOn: convertTimestampToDate(docData.updatedOn),                    
                }

                return user
            })

            return users;                
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }

    const createUser = async (user: TUser) =>{
        try{
            console.log("useUsersStore > createUser")

            const foundByToken = await getUsersByToken(user.fcmToken);

            if(foundByToken.length > 1)
            {
                throw new Error("Found multiple users with the same token")
            }
            
            if(foundByToken.length == 1)
            {
                const foundUser = foundByToken[0];

                console.warn("Found user with the same token")
                
                const newStoredUser = await setUserInLocalStorage(foundUser)

                return newStoredUser;
            }

            const docData: TUserStoreData = {                
                authUserId: auth.currentUser?.uid ?? "",
                fcmToken: user.fcmToken,
                createdOn: new Date(),
                updatedOn: new Date()                
            }
            
            const userRef = await addDoc(usersRef,docData)            
            
            const updatedUser: TUser = {
                ...docData,
                id: userRef.id
            }

            const newStoredUser = await setUserInLocalStorage(updatedUser)

            if(newStoredUser)
            {
                return newStoredUser;
            }

            return null;
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }    

    const updateUser = useCallback(async (user:TUser, updateFirestore=false)=>{
        try{
            console.log("useUsersStore > updateUser")
            await setUserInLocalStorage(user)

            if(!updateFirestore) return

            
            const docRef = doc(store, collectionName, user.id)
            
            const updateData:TUserStoreData = {
                authUserId: auth.currentUser?.uid?? "",
                fcmToken: user.fcmToken,
                createdOn: user.createdOn,
                updatedOn: new Date()
            }

            await updateDoc(docRef, {    
                ...updateData                            
            })

            const fetchUser = await getUserById(user.id);

            if(fetchUser)
            {
                await setUserInLocalStorage(fetchUser)
            }

            return fetchUser;
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[getUserById, setUserInLocalStorage])    

    return {getUsers, getUserById, createUser, updateUser, getUserFromLocalStorage, clearUsersLocalStorage}
}

export default useUsersStore;