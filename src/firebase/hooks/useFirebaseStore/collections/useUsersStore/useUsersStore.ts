import {store} from "../../../../firebase.config"
import {collection, getDocs, query, orderBy, addDoc, doc, getDoc, where} from "firebase/firestore"

type TUserWithId = {
    id: string;
    userName: string;
    fcmToken: string;
}

type TUser = {
    userName: string;
    fcmToken: string;
}

const collectionName = "Users";
const usersRef = collection(store, collectionName)

const useUsersStore = ()=>{    
    const useStorageKey = "User";

    const getUserFromLocalStorage = async () => {
        const foundItem = localStorage.getItem(useStorageKey);

        if (foundItem) {
            const foundUser: TUserWithId = JSON.parse(foundItem);

            await getUserById(foundUser.id)

            return foundUser;
        }

        return null;
    };

    const clearUserLocalStorage = async () => {
        localStorage.removeItem(useStorageKey);
    };

    const setUserInLocalStorage = async (user: TUserWithId) => {
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

            const foundByToken = await getUsersByToken(user.fcmToken);

            if(foundByToken.length > 1)
            {
                throw new Error("Found multiple users with the same token")
            }
            
            if(foundByToken.length == 1)
            {
                console.warn("Found user with the same token")
                return foundByToken[0]
            }
            
            const userRef = await addDoc(usersRef, user)            
            
            const updatedUser = {
                ...user,
                id: userRef.id
            }

            return updatedUser;
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }

    return {getUsers, getUserById, createUser, getUserFromLocalStorage, setUserInLocalStorage, clearUserLocalStorage}
}

export default useUsersStore;