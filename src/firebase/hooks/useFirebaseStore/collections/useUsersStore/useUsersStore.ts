import {store} from "../../../../firebase.config"
import {collection, getDocs, query, orderBy, addDoc, doc, getDoc, where, updateDoc} from "firebase/firestore"
import useFirebaseAuth from "../../../useFirebaseAuth/useFirebaseAuth";
import { useCallback, useEffect } from "react";


type TUser = {
    userName: string;
    fcmToken: string;
    authUserId: string;
}

type TUserWithId = TUser & {
    id: string;
}

const collectionName = "Users";
const usersRef = collection(store, collectionName)

const useUsersStore = ()=>{    

    const {authUser} = useFirebaseAuth()

    const updateUser = useCallback(async (user:TUserWithId, updateFirestore=false)=>{
        try{
            setUserInLocalStorage(user)
            
            if(!updateFirestore) return

            console.log("useUsersStore > updateUser")
            
            const docRef = doc(store, collectionName, user.id)
            
            const updateData:TUser = {
                authUserId: authUser?.uid ?? "",
                userName: user.userName,
                fcmToken: user.fcmToken
            }

            console.log(docRef)

            await updateDoc(docRef, {    
                ...updateData                            
            })

            const fetchUser = await getUserById(user.id);

            if(fetchUser)
            {
                setUserInLocalStorage(fetchUser)
            }

            return fetchUser;
        }
        catch(e){
            console.error(e)
            throw e;
        }
    },[])

    const getUserFromLocalStorage = useCallback(async () => {
        const foundItem = localStorage.getItem(useStorageKey);

        if (foundItem) {
            const storedUser: TUserWithId = JSON.parse(foundItem);

            if(storedUser) {
                console.log("useUsersStore > getUserFromLocalStorage > foundInStorage", storedUser)
                const user = await getUserById(storedUser.id);    
                
                if(!user){
                    await clearUserFromLocalStorage()
                    return null;
                }

                if(user.id == storedUser.id)
                {
                    return user;                    
                }
                else
                {
                    return updateUser(user)
                }
            }            

            return null;
        }

        return null;
    },[updateUser]);    
    
    const handleOnAuthStateChanged = useCallback(async ()=>{
        
        console.log("useUsersStore > handleOnAuthStateChanged", authUser)

        if(!authUser){
            clearUserFromLocalStorage()
            return
        }

        const storedUser = await getUserFromLocalStorage()

        if(storedUser)
        {
            const data:TUserWithId = {
                ...storedUser,
                userName: authUser?.displayName ?? "",
                id: storedUser.id,
                authUserId: authUser.uid
            }
            await setUserInLocalStorage(data)

            return
        }
        
        console.error("useUsersStore > onAuthStateChangedHandler > no localStorage for user found")
    },[authUser, getUserFromLocalStorage])    

    const useStorageKey = "User";



    const clearUserFromLocalStorage = async () => {
        localStorage.removeItem(useStorageKey);
    };

    const setUserInLocalStorage = async (user: TUserWithId) => {
        console.log("useUsersStore > setUserInLocalStorage", user)

        if(user.fcmToken == "" || user.id=="") 
            return;        

        localStorage.setItem(
            useStorageKey,
            JSON.stringify(user)
        );

        const foundItem = localStorage.getItem(useStorageKey);

        return JSON.parse(foundItem!) as TUserWithId;
    };
    
    const getUsers = async ()=>{
        try{
            console.log("useUsersStore > getUsers")

            const queryRef = query(usersRef, orderBy("userName"));
            const response = await getDocs(queryRef)
            const users = response.docs.map((docSnapShot)=>{
                const data = docSnapShot.data() as TUser
                const user:TUserWithId = {
                    ...data,
                    id: docSnapShot.id
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
    
    const getUserById = async (id: string)=>{

        try{
            console.log("useUsersStore > getUserById")        
            
            const docRef = doc(store, collectionName, id);
            const docSnap = await getDoc(docRef);                        
    
            if(docSnap.exists())
            {
                const docData = docSnap.data() as TUser
                
                const user: TUserWithId = {
                    ...docData,
                    id: id                
                }

                return user;
            }
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }

    const getUsersByToken = async (fcmToken: string)=>{

        try{
            console.log("useUsersStore > getUserByToken")        
            
            const queryRef = query(usersRef, where("fcmToken", "==", fcmToken));
            const response = await getDocs(queryRef);

            const users: TUserWithId[] = response.docs.map((docSnapshot)=>{
                const data = docSnapshot.data() as TUser
                const user:TUserWithId = {
                    ...data,
                    id: docSnapshot.id
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

            const storedUser = await getUserFromLocalStorage();

            if(storedUser && storedUser.fcmToken == user.fcmToken) {
                console.log("useUsersStore > createUser > foundInStorage", storedUser)
                const foundByToken = await getUsersByToken(storedUser.fcmToken);     

                if(foundByToken.length == 1)
                {
                    return foundByToken[0]
                }
                {
                    await clearUserFromLocalStorage()
                }
            }

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
            
            const userRef = await addDoc(usersRef, user)            
            
            const updatedUser: TUserWithId = {
                ...user,
                id: userRef.id,
                authUserId: authUser?.uid ?? ""
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

    useEffect(()=>{
        console.log("useUsersStore > useEffect > onAuthChange")
        const onAuthChange = async ()=>{
            await handleOnAuthStateChanged()
        }
        onAuthChange()

    }, [handleOnAuthStateChanged])

    return {getUsers, getUserById, createUser, updateUser, getUserFromLocalStorage, handleOnAuthStateChanged}
}

export default useUsersStore;