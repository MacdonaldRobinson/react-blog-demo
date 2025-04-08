import useChatStore from "./collections/useChatStore/useChatStore";

const useFirebaseStore = ()=>{    
    const {getChatMessages, sendMessage} = useChatStore();

    return {getChatMessages, sendMessage}
}

 export default useFirebaseStore;