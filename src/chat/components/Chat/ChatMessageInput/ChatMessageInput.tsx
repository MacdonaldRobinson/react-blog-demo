import { useEffect, useState } from "react";
import { TChatMessage } from "../../../contexts/ChatContext";
import {
    ChatMessageInputItemWrapper,
    ChatMessageInputWrapper,
} from "./ChatMessageInput.styles";
import useChatContext from "../../../hooks/useChatContext";
import useAuthContext from "../../../../auth/hooks/useAuthContext";

export type TChatMessageInput = {
    userName: string;
    setUserName: (newUserName: string) => void;
};

const ChatMessageInput = ({ userName, setUserName }: TChatMessageInput) => {
    const { isAuthenticated } = useAuthContext();
    const { sendMessage } = useChatContext();

    const [chatMessage, setChatMessage] = useState<TChatMessage>({
        message: "",
        userName: userName,
        userId: "",
        authUserId: "",
    });

    useEffect(() => {
        setChatMessage((currentMessage) => {
            return {
                ...currentMessage,
                userName: userName,
            };
        });
    }, [userName]);

    const handleUserNameInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (!e) return;

        const text = e.currentTarget.value;

        const newMessage: TChatMessage = {
            ...chatMessage,
            userName: text,
        };

        setChatMessage(newMessage);
        setUserName(newMessage.userName);
    };

    const handleMessageInput = (
        e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (!e) return;

        const text = e.currentTarget.value;

        const newMessage: TChatMessage = {
            ...chatMessage,
            message: text,
        };

        setChatMessage(newMessage);
    };

    const handleSendClick = async () => {
        await sendMessage(chatMessage);
    };

    return (
        <>
            {isAuthenticated && (
                <ChatMessageInputWrapper>
                    <ChatMessageInputItemWrapper>
                        <label htmlFor="userName">User Name</label>
                        <input
                            name="userName"
                            id="userName"
                            value={chatMessage.userName}
                            onInput={handleUserNameInput}
                            maxLength={100}
                        />
                    </ChatMessageInputItemWrapper>
                    <ChatMessageInputItemWrapper>
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            value={chatMessage.message}
                            onInput={handleMessageInput}
                            maxLength={100}
                        ></textarea>
                    </ChatMessageInputItemWrapper>
                    <ChatMessageInputItemWrapper>
                        <button onClick={handleSendClick}>Send</button>
                    </ChatMessageInputItemWrapper>
                </ChatMessageInputWrapper>
            )}

            {!isAuthenticated && (
                <>You need to be logged in to send chat messages</>
            )}
        </>
    );
};

export default ChatMessageInput;
