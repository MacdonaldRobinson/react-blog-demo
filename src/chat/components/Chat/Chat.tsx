import { useCallback, useEffect, useRef } from "react";
import useAuthContext from "../../../auth/hooks/useAuthContext";
import { TChatMessageWithMetaInfo } from "../../contexts/ChatContext";
import useChatContext from "../../hooks/useChatContext";
import {
    ChatWrapper,
    ChatMessagesFieldSet,
    ChatMessagesFieldSetLegend,
    ChatMessagesWrapper,
} from "./Chat.styles";
import ChatItem from "./ChatItem/ChatItem";
import ChatMessageInput from "./ChatMessageInput/ChatMessageInput";
import useFirebaseMessaging from "../../../firebase/hooks/useFirebaseMessaging/useFirebaseMessaging";

const Chat = () => {
    const { userName: authUserName } = useAuthContext();
    const { userName, setUserName, chatMessages } = useChatContext();
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);
    const { registerServiceWorker } = useFirebaseMessaging();
    const notificationRef = useRef<HTMLAudioElement | null>(null);

    const notify = useCallback(
        async (chatMessage: TChatMessageWithMetaInfo) => {
            const showNotification = () => {
                const notification = new Notification(chatMessage.userName, {
                    body: chatMessage.message,
                });

                console.log(notification);
            };

            await notificationRef.current?.play();

            if (Notification.permission !== "granted") {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        showNotification();
                    }
                });
            } else {
                showNotification();
            }
        },
        []
    );

    const scrollToLastMessage = useCallback(async () => {
        const lastElement = chatMessagesRef.current
            ?.lastChild as HTMLDivElement;
        lastElement.scrollIntoView();

        await notify(chatMessages[chatMessages.length - 1]);
    }, []);

    useEffect(() => {
        const register = async () => {
            try {
                await registerServiceWorker();
            } catch (error) {
                console.error("Failed to register service worker:", error);
            }
        };
        register();
    }, []);

    useEffect(() => {
        setUserName(authUserName);
    }, [authUserName, setUserName]);

    useEffect(() => {
        const scroll = async () => {
            await scrollToLastMessage();
        };
        scroll();
    }, [chatMessages]);

    return (
        <ChatWrapper>
            <audio ref={notificationRef}>
                <source src="notification.mp3" />
            </audio>
            <ChatMessagesFieldSet>
                <ChatMessagesFieldSetLegend>
                    Chat Messages
                </ChatMessagesFieldSetLegend>
                <ChatMessagesWrapper ref={chatMessagesRef}>
                    {chatMessages.map(
                        (chatMessage: TChatMessageWithMetaInfo) => {
                            return (
                                <ChatItem
                                    key={chatMessage.id}
                                    userName={userName}
                                    chatMessage={chatMessage}
                                />
                            );
                        }
                    )}
                </ChatMessagesWrapper>
            </ChatMessagesFieldSet>
            <ChatMessageInput userName={userName} setUserName={setUserName} />
        </ChatWrapper>
    );
};

export default Chat;
