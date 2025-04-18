import { useCallback, useState } from "react";
import useFirebaseStore from "../../firebase/hooks/useFirebaseStore/useFirebaseStore";
import ChatContext, {
    TChatContext,
    TChatMessage,
    TChatMessageWithMetaInfo,
} from "./ChatContext";

export type TChatContextProvider = {
    children: React.ReactNode;
};

const ChatContextProvider = ({ children }: TChatContextProvider) => {
    const [userName, setUserName] = useState<string>("");
    const [showNotifications, setShowNotifications] = useState<boolean>(true);

    const [chatMessages, setChatMessages] =
        useState<TChatMessageWithMetaInfo[]>();

    const { useChatStore } = useFirebaseStore();

    const onListenForUpdates = useCallback(
        (newChatMessages: TChatMessageWithMetaInfo[]) => {
            console.log("ChatContextProvider > onListenForUpdates");

            setChatMessages(newChatMessages);
        },
        []
    );

    const { sendMessage } = useChatStore({
        onListenForUpdates: onListenForUpdates,
    });

    const handleSendMessage = useCallback(
        async (chatMessage: TChatMessage) => {
            await sendMessage(chatMessage);
        },
        [sendMessage]
    );

    const handleListenForUpdates = () => {};

    const newChatContext: TChatContext = {
        userName: userName,
        setUserName: setUserName,
        chatMessages: chatMessages ?? [],
        sendMessage: handleSendMessage,
        onListenForUpdates: handleListenForUpdates,
        showNotifications: showNotifications,
        setShowNotifications: setShowNotifications,
    };

    return (
        <ChatContext.Provider value={newChatContext}>
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContextProvider;
