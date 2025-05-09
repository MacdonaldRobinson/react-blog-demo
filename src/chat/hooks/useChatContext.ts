import { useContext } from "react"
import ChatContext from "../contexts/ChatContext"

const useChatContext = ()=>{
    const chatContext = useContext(ChatContext)
    return chatContext;
}

export default useChatContext;