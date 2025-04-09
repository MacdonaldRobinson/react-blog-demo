import { TChatMessage } from "../../contexts/ChatContext";
import useChatContext from "../../hooks/useChatContext";
import {
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
    const { userName, setUserName, chatMessages } = useChatContext();

    return (
        <ChatWrapper>
            <ChatMessagesFieldSet>
                <ChatMessagesFieldSetLegend>
                    Chat Messages
                </ChatMessagesFieldSetLegend>
                <ChatMessagesWrapper>
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
