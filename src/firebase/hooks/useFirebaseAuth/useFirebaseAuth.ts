import { useCallback, useEffect, useState } from "react";
import {auth} from "../../firebase.config"
import {signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User} from "firebase/auth"
import useFirebaseStore from "../useFirebaseStore/useFirebaseStore";

const useFirebaseAuth = ()=>{    
    const [authUser, setAuthUser] = useState<User | null>()

    const {useUsersStore} = useFirebaseStore()
    const {getUserFromLocalStorage, updateUser} = useUsersStore()

    const login = useCallback(async ()=>{
        try{
            console.log("useFirebaseAuth > login")
            await signInWithPopup(auth, new GoogleAuthProvider())
        }
        catch(e){
            console.error(e);
            throw e;
        }
    },[])

    const logout = useCallback(async ()=>{
        try{
            console.log("useFirebaseAuth > logout")

            await signOut(auth)
        }
        catch(e){
            console.error(e);
            throw e;
        }

    },[])
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user: User | null)=>{
            setAuthUser(user)

            const userInStorage = await getUserFromLocalStorage()

            if(userInStorage){
                console.log("useFirebaseAuth > onAuthStateChanged")    
                
                updateUser({
                    ...userInStorage,
                    authUserId: user?.uid ?? ""
                })
            }
        })

        return ()=> unsubscribe()
    },[getUserFromLocalStorage, updateUser])
    
    return {login, logout, authUser}
}

export default useFirebaseAuth;