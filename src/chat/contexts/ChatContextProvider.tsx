import { useCallback, useEffect, useState } from "react";
import useFirebaseStore from "../../firebase/hooks/useFirebaseStore/useFirebaseStore";
import ChatContext, { TChatContext, TChatMessage } from "./ChatContext";

export type TChatContextProvider = {
    children: React.ReactNode;
};

const ChatContextProvider = ({ children }: TChatContextProvider) => {
    const [userName, setUserName] = useState<string>("");
    const [chatMessages, setChatMessages] = useState<TChatMessage[]>();
    const { useChatStore } = useFirebaseStore();

    const onListenForUpdates = useCallback(
        (newChatMessages: TChatMessage[]) => {
            console.log("ChatContextProvider > onListenForUpdates");

            setChatMessages(newChatMessages);
        },
        []
    );

    const { getChatMessages, sendMessage } = useChatStore({
        onListenForUpdates: onListenForUpdates,
    });

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

    const handleListenForUpdates = () => {};

    const newChatContext: TChatContext = {
        userName: userName,
        setUserName: setUserName,
        chatMessages: chatMessages ?? [],
        sendMessage: handleSendMessage,
        onListenForUpdates: handleListenForUpdates,
    };

    return (
        <ChatContext.Provider value={newChatContext}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
