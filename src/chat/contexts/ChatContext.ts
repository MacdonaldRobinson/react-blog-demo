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
    chatMessages: TChatMessage[],
    sendMessage: (chatMessage:TChatMessage)=>Promise<void>;
}

const ChatContext = createContext<TChatContext>({
    chatMessages: [],
    sendMessage: async ()=>{
        console.error("sendMessage is not implemented")
    }
})

export default ChatContext;