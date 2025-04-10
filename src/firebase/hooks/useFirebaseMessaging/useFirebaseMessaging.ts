import {messaging} from "../../firebase.config"
import {getToken} from "firebase/messaging"
import useFirebaseStore from "../useFirebaseStore/useFirebaseStore"

const useFirebaseMessaging = ()=>{
    const {useUsersStore} = useFirebaseStore()
    const {createUser, setUserInLocalStorage, getUserFromLocalStorage, getUserById, clearUserLocalStorage} = useUsersStore()

    const requestToken = async ()=>{
        console.log("useFirebaseMessaging > requestToken")

        try{
            const storedUser = await getUserFromLocalStorage();

            if(storedUser){
                const found = await getUserById(storedUser.id)

                if(found)
                {
                    return found;
                }

                clearUserLocalStorage()
            }

            const permission = await Notification.requestPermission();

            if(permission == "granted"){
                const token = await getToken(messaging, {
                    vapidKey: "BD4GRPfP3ESQ1wy3IjwQaz9nGsF-sfAn6pamO6GPGW5-uUYS2kAh28_leoxjRd8GWav6e7WHi2Ac8BmL7iCQ8HU"
                })

                console.log("requestToken > token", token)


                console.log("requestToken > createUser")

                const user = await createUser({
                    fcmToken: token,
                    userName: ""                    
                })

                setUserInLocalStorage(user)

                return user;
            }
        }
        catch(e){
            console.error(e)
            throw e;
        }
    }

    const registerServiceWorker = ()=>{
            if("serviceWorker" in navigator){
                navigator.serviceWorker.register("/firebase-messaging-sw.js")
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

    return {requestToken: requestToken, registerServiceWorker}
}

export default useFirebaseMessaging;