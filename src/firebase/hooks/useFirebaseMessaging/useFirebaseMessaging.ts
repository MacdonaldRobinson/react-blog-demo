import { messaging, auth} from "../../firebase.config"
import {getToken} from "firebase/messaging"
import useFirebaseStore from "../useFirebaseStore/useFirebaseStore"
import { TUser } from "../useFirebaseStore/collections/useUsersStore/useUsersStore"
import { useEffect, useState } from "react"

const useFirebaseMessaging = ()=>{
    const {useUsersStore} = useFirebaseStore()
    const {createUser,  getUserFromLocalStorage} = useUsersStore()
    const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<ServiceWorkerRegistration | undefined>()
    
    const requestToken = async ()=>{
        try{            
            await navigator.serviceWorker.ready;
            
            console.log("RAN")
            
            const storedUser = await getUserFromLocalStorage();

            if(!storedUser || storedUser.fcmToken == "")
            {
                const permission = await Notification.requestPermission();

                if(permission == "granted"){
                    const token = await getToken(messaging, {
                        vapidKey: "BD4GRPfP3ESQ1wy3IjwQaz9nGsF-sfAn6pamO6GPGW5-uUYS2kAh28_leoxjRd8GWav6e7WHi2Ac8BmL7iCQ8HU",
                        serviceWorkerRegistration: serviceWorkerRegistration
                    })

                    console.log("requestToken > token", token)

                    const newUser: TUser = {
                        id: "",
                        fcmToken: token,
                        authUserId:auth.currentUser?.uid ?? "",
                        createdOn: new Date(),
                        updatedOn: new Date()
                    }
                    
                    const user = await createUser(newUser)

                    return user;
                }

                return storedUser;
            }
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }

    const registerServiceWorker = async ()=>{
            if("serviceWorker" in navigator){
                const basePath = import.meta.env.VITE_BASE_PATH || "/"; // Default to '/' if not set

                console.log("registerServiceWorker at scope > ", basePath)
                await navigator.serviceWorker.register(`${basePath}firebase-messaging-sw.js`)
                .then((registration) => {
                    console.log("Service Worker registered:", );
                    setServiceWorkerRegistration(registration)
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);                    
                });                
            }
            else{
                console.error("serviceWorker not supported")
            }

    }

    useEffect(()=>{
        const register = async ()=>{
            await registerServiceWorker()            
            await requestToken()
        }
        register()
    }, [])

    return {requestToken, registerServiceWorker}
}

export default useFirebaseMessaging;