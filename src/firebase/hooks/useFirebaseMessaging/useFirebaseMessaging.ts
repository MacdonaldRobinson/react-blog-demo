import { messaging} from "../../firebase.config"
import {getToken} from "firebase/messaging"
import useFirebaseStore from "../useFirebaseStore/useFirebaseStore"
import useFirebaseAuth from "../useFirebaseAuth/useFirebaseAuth"

const useFirebaseMessaging = ()=>{
    const {useUsersStore} = useFirebaseStore()
    const {createUser} = useUsersStore()
    const {authUser} = useFirebaseAuth()

    const requestToken = async ()=>{

        try{
            const permission = await Notification.requestPermission();

            if(permission == "granted"){
                const token = await getToken(messaging, {
                    vapidKey: "BD4GRPfP3ESQ1wy3IjwQaz9nGsF-sfAn6pamO6GPGW5-uUYS2kAh28_leoxjRd8GWav6e7WHi2Ac8BmL7iCQ8HU"
                })

                console.log("requestToken > token", token)

                console.log("requestToken > createUser")

                const user = await createUser({
                    fcmToken: token,
                    userName: "",
                    authUserId:authUser?.uid ?? ""                    
                })

                return user;
            }
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }

    const clearServiceWorkers = ()=>{
        const basePath = import.meta.env.VITE_BASE_PATH || "/"; // Default to '/' if not set

        console.log("import.meta.env.VITE_BASE_PATH", import.meta.env.VITE_BASE_PATH)

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
                registrations.forEach((registration) => {
                // Check if the service worker scope matches your app's base path
                if (registration.scope.includes(basePath)) {
                    registration.unregister();
                    console.log(`Unregistered service worker with scope: ${registration.scope}`);
                }
                });
            });
        }        
    }

    const registerServiceWorker = async ()=>{
            clearServiceWorkers()
            if("serviceWorker" in navigator){
                const basePath = import.meta.env.VITE_BASE_PATH || "/"; // Default to '/' if not set

                console.log("registerServiceWorker at scope > ", basePath)
                await navigator.serviceWorker.register(`${basePath}firebase-messaging-sw.js`,{
                    scope:basePath
                })
                .then((registration) => {
                    console.log("Service Worker registered:", registration);
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error);
                });                
            }
            else{
                console.error("serviceWorker not supported")
            }
    }

    return {requestToken, registerServiceWorker}
}

export default useFirebaseMessaging;