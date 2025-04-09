import { useEffect, useRef } from "react";
import useAuthContext from "../../../auth/hooks/useAuthContext";
import { TChatMessage } from "../../contexts/ChatContext";
import useChatContext from "../../hooks/useChatContext";
import { format } from "date-fns";

import {
    ChatMessageDateWrapper,
    ChatMessageItemWrapper,
    ChatMessagesFieldSet,
    ChatMessagesFieldSetLegend,
    ChatMessagesWrapper,
    ChatMessageUserNameWrapper,
    ChatMessageWrapper,
    ChatWrapper,
} from "./Chat.styles";
import ChatMessageInput from "./ChatMessageInput/ChatMessageInput";

const Chat = () => {
    const { userName: authUserName } = useAuthContext();
    const { userName, setUserName, chatMessages } = useChatContext();
    const chatMessagesRef = useRef<HTMLDivElement | null>(null);

    const scrollToLastMessage = () => {
        (
            chatMessagesRef.current?.lastChild as HTMLDivElement
        )?.scrollIntoView();
    };

    useEffect(() => {
        setUserName(authUserName);

        console.log(authUserName);
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
                    {chatMessages.map((chatMessage: TChatMessage) => {
                        return (
                            <ChatMessageItemWrapper
                                key={chatMessage.id}
                                className={
                                    userName.toLowerCase() ==
                                    chatMessage.userName.toLowerCase()
                                        ? "me"
                                        : "no-me"
                                }
                            >
                                <ChatMessageUserNameWrapper>
                                    {chatMessage.userName}
                                </ChatMessageUserNameWrapper>
                                <ChatMessageWrapper>
                                    {chatMessage.message}
                                </ChatMessageWrapper>
                                <ChatMessageDateWrapper>
                                    {format(
                                        chatMessage.createdOn,
                                        "yyyy-MM-dd hh:mm:ss"
                                    )}
                                </ChatMessageDateWrapper>
                            </ChatMessageItemWrapper>
                        );
                    })}
                </ChatMessagesWrapper>
            </ChatMessagesFieldSet>
            <ChatMessageInput userName={userName} setUserName={setUserName} />
        </ChatWrapper>
    );
};

export default Chat;
