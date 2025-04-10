import useChatStore from "./collections/useChatStore/useChatStore";
import useUsersStore from "./collections/useUsersStore/useUsersStore";

const useFirebaseStore = ()=>{    
    return {useChatStore, useUsersStore}
}

 export default useFirebaseStore;