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

    const { useChatStore, useUsersStore } = useFirebaseStore();
    const { requestToken } = useFirebaseMessaging();
    const { getUserFromLocalStorage, setUserInLocalStorage } = useUsersStore();

    useEffect(() => {
        const handleRequestToken = async () => {
            const user = await requestToken();
            if (user) {
                setUser(user);
            }
        };
        handleRequestToken();
    }, []);

    const onListenForUpdates = useCallback(
        (newChatMessages: TChatMessageWithMetaInfo[]) => {
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
        const user = await getUserFromLocalStorage();

        await sendMessage({
            ...chatMessage,
            userId: user?.id ?? "",
        });
    };

    const handleSetUserName = useCallback(async (userName: string) => {
        const user = await getUserFromLocalStorage();

        if (user) {
            await setUserInLocalStorage({
                ...user,
                userName: userName,
            });
        }
    }, []);

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
