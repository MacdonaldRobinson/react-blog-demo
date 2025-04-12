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
    const {
        userName,
        setUserName,
        chatMessages,
        showNotifications,
        setShowNotifications,
    } = useChatContext();
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);
    const { registerServiceWorker } = useFirebaseMessaging();
    const notificationRef = useRef<HTMLAudioElement | null>(null);

    const notify = useCallback(
        async (title: string, body: string) => {
            const tag = new Date().getTime().toString();

            const showNotification = async () => {
                console.log("showNotifications", showNotifications);
                if (showNotifications) {
                    await notificationRef.current?.play();

                    if (
                        title.trim().toLowerCase() !=
                        userName.trim().toLowerCase()
                    ) {
                        new Notification(title, {
                            body: body,
                            tag: tag,
                            requireInteraction: false,
                        });
                    }
                }
            };

            if (Notification.permission !== "granted") {
                Notification.requestPermission().then(async (permission) => {
                    if (permission === "granted") {
                        await showNotification();
                    }
                });
            } else {
                await showNotification();
            }
        },
        [showNotifications, userName]
    );

    const scrollToLastMessage = useCallback(async () => {
        const lastElement = chatMessagesRef.current
            ?.lastChild as HTMLDivElement;
        lastElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });

        if (!lastElement.classList.contains("notification-showed")) {
            const userName = lastElement.childNodes[0]?.textContent?.trim();
            const message = lastElement.childNodes[1]?.textContent?.trim();

            if (userName && message) {
                await notify(userName, message);

                lastElement.classList.add("notification-showed");
            }
        }
    }, [notify]);

    useEffect(() => {
        const register = async () => {
            try {
                await registerServiceWorker();
            } catch (error) {
                console.error("Failed to register service worker:", error);
            }
        };
        register();
    }, [registerServiceWorker]);

    useEffect(() => {
        setUserName(authUserName);
    }, [authUserName, setUserName]);

    useEffect(() => {
        const scroll = async () => {
            await scrollToLastMessage();
        };
        scroll();
    }, [chatMessages, scrollToLastMessage]);

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
            <ChatMessageInput
                userName={userName}
                setUserName={setUserName}
                showNotifications={showNotifications}
                setShowNotifications={setShowNotifications}
            />
        </ChatWrapper>
    );
};

export default Chat;
