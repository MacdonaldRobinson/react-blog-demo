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
    sendMessage: (chatMessage:TChatMessage)=>Promise<void>;    
    setUserName: (newUserName: string) => void;
    onListenForUpdates: (newChatMessages: TChatMessageWithMetaInfo[])=>void;
}

export type TUser = {
    id: string;
    userName: string;
    fcmToken: string;
};

const ChatContext = createContext<TChatContext>({
    userName: "",
    chatMessages: [],
    sendMessage: async () => {
        console.error("sendMessage is not implemented");
    },
    setUserName: function (newUserName: string): void {
        console.log(newUserName);
        throw new Error("Function not implemented.");
    },
    onListenForUpdates: function (newChatMessages: TChatMessageWithMetaInfo[]): void {
        console.log(newChatMessages);
        throw new Error("Function not implemented.");
    }
})

export default ChatContext;