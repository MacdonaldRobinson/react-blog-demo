import { createContext } from "react";
import { z } from "zod";

export const ChatMessageSchema = z.object({
    id: z.string(),
    userName: z.string(),
    message: z.string(),
    createdOn: z.date()
})

export type TChatMessage = z.infer<typeof ChatMessageSchema>;

export type TChatContext = {
    userName: string;
    chatMessages: TChatMessage[],
    sendMessage: (chatMessage:TChatMessage)=>Promise<void>;    
    setUserName: (newUserName: string) => void;
}

const ChatContext = createContext<TChatContext>({
    userName: "",
    chatMessages: [],
    sendMessage: async () => {
        console.error("sendMessage is not implemented");
    },
    setUserName: function (newUserName: string): void {
        console.log(newUserName)
        throw new Error("Function not implemented.");
    }
})

export default ChatContext;