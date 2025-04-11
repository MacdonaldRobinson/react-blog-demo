import { useCallback, useEffect, useState } from "react";
import {auth} from "../../firebase.config"
import {signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth"

const useFirebaseAuth = ()=>{
    const [authUser, setAuthUser] = useState<User | null>(null);
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user)=>{

            console.log("useFirebaseAuth > useEffect > onAuthStateChanged", user)
            await setAuthUser(user)

        })
        
        setAuthUser(auth.currentUser)
        return ()=> unsubscribe()
    },[])

    const login = useCallback(async ()=>{
        try{
            console.log("useFirebaseAuth > login")

            const response = await signInWithPopup(auth, new GoogleAuthProvider())
            setAuthUser(response.user)
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
            setAuthUser(null)
        }
        catch(e){
            console.error(e);
            throw e;
        }

    },[])

    return {login, logout, authUser}
}

export default useFirebaseAuth;