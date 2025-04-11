import { useEffect, useRef } from "react";
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

    const scrollToLastMessage = () => {
        (
            chatMessagesRef.current?.lastChild as HTMLDivElement
        )?.scrollIntoView();
    };

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
        scrollToLastMessage();
    }, [chatMessages]);

    return (
        <ChatWrapper>
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
                                ></ChatItem>
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
