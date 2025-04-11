import { useCallback, useEffect, useState } from "react";
import useFirebaseStore from "../../firebase/hooks/useFirebaseStore/useFirebaseStore";
import ChatContext, {
    TChatContext,
    TChatMessage,
    TChatMessageWithMetaInfo,
    TUser,
} from "./ChatContext";
import useFirebaseMessaging from "../../firebase/hooks/useFirebaseMessaging/useFirebaseMessaging";

export type TChatContextProvider = {
    children: React.ReactNode;
};

const ChatContextProvider = ({ children }: TChatContextProvider) => {
    const [user, setUser] = useState<TUser>({
        id: "",
        fcmToken: "",
        userName: "",
    });

    const [chatMessages, setChatMessages] =
        useState<TChatMessageWithMetaInfo[]>();

    const { useChatStore } = useFirebaseStore();
    const { requestToken } = useFirebaseMessaging();

    const handleRequestToken = useCallback(async () => {
        const user = await requestToken();
        if (user) {
            setUser(user);
        }
    }, []);

    useEffect(() => {
        handleRequestToken();
    }, []);

    const onListenForUpdates = useCallback(
        (newChatMessages: TChatMessageWithMetaInfo[]) => {
            console.log("ChatContextProvider > onListenForUpdates");

            setChatMessages(newChatMessages);
        },
        []
    );

    const { getChatMessages, sendMessage, updateUserName } = useChatStore({
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
    };

    const handleSetUserName = useCallback(
        async (userName: string) => {
            const user = await updateUserName(userName);
            return user?.userName ?? "";
        },
        [updateUserName]
    );

    const handleListenForUpdates = () => {};

    const newChatContext: TChatContext = {
        userName: user.userName,
        setUserName: handleSetUserName,
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
