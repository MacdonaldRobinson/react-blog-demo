import { Timestamp } from "firebase/firestore";
import useChatStore from "./collections/useChatStore/useChatStore";
import useUsersStore from "./collections/useUsersStore/useUsersStore";

const useFirebaseStore = ()=>{    
    const convertTimestampToDate = (date: Date) =>{
        return date instanceof Timestamp 
                ? date.toDate() 
                : new Date(date);
    }

    return {useChatStore, useUsersStore, convertTimestampToDate}
}

 export default useFirebaseStore;