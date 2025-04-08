import { useCallback, useEffect, useState } from "react";
import useFirebaseStore from "../../firebase/hooks/useFirebaseStore/useFirebaseStore";
import ChatContext, { TChatContext, TChatMessage } from "./ChatContext";

export type TChatContextProvider = {
    children: React.ReactNode;
};

const ChatContextProvider = ({ children }: TChatContextProvider) => {
    const [chatMessages, setChatMessages] = useState<TChatMessage[]>();
    const { getChatMessages, sendMessage } = useFirebaseStore();

    const getMessages = useCallback(async () => {
        const response = await getChatMessages();
        setChatMessages(response);
    }, [getChatMessages]);

    useEffect(() => {
        getMessages();
    }, [getMessages]);

    const handleSendMessage = async (chatMessage: TChatMessage) => {
        await sendMessage(chatMessage);
        await getMessages();
    };

    const newChatContext: TChatContext = {
        chatMessages: chatMessages ?? [],
        sendMessage: handleSendMessage,
    };

    return (
        <ChatContext.Provider value={newChatContext}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
