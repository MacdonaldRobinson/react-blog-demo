import { useCallback, useState } from "react";
import {auth} from "../../firebase.config"
import {signInWithPopup, GoogleAuthProvider, signOut, UserCredential} from "firebase/auth"

const useFirebaseAuth = ()=>{
    const [user, setUser] = useState<UserCredential | null>(null);
    const login = useCallback(async ()=>{
        try{
            console.log("useFirebaseAuth > login")

            const user = await signInWithPopup(auth, new GoogleAuthProvider())
            setUser(user)
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
            setUser(null)
        }
        catch(e){
            console.error(e);
            throw e;
        }

    },[])

    return {login, logout, user}
}

export default useFirebaseAuth;