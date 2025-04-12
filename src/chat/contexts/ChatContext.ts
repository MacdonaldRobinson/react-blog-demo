import { createContext } from "react";


export type TChatMessage = {    
    userName: string;
    message: string;
    userId:string;
    authUserId: string;
}

export type TChatMessageWithMetaInfo = TChatMessage & {
    id?:string;
    createdOn: Date;
}

export type TChatContext = {
    userName: string;
    chatMessages: TChatMessageWithMetaInfo[],
    showNotifications: boolean;
    sendMessage: (chatMessage:TChatMessage)=>Promise<void>;    
    setUserName: (newUserName: string) => void;
    onListenForUpdates: (newChatMessages: TChatMessageWithMetaInfo[])=>void;
    setShowNotifications: (newNotificationStatus: boolean)=>void
}

export type TUser = {
    id: string;
    fcmToken: string;
    authUserId: string;
    createdOn: Date;
    updatedOn: Date;
};

const ChatContext = createContext<TChatContext>({
    userName: "",
    chatMessages: [],
    showNotifications: true,
    sendMessage: async () => {
        console.error("sendMessage is not implemented");
    },
    setUserName: function (): void {        
        throw new Error("Function not implemented.");
    },
    onListenForUpdates: (function (): void {        
        throw new Error("Function not implemented.");
    }),
    setShowNotifications: function (): void {
        throw new Error("Function not implemented.");
    }
})

export default ChatContext;