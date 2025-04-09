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
    const { chatMessages } = useChatContext();

    return (
        <ChatWrapper>
            <ChatMessagesFieldSet>
                <ChatMessagesFieldSetLegend>
                    Chat Messages:
                </ChatMessagesFieldSetLegend>
                <ChatMessagesWrapper>
                    {chatMessages.map((chatMessage: TChatMessage) => {
                        return (
                            <ChatMessageItemWrapper key={chatMessage.id}>
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
            <ChatMessageInput />
        </ChatWrapper>
    );
};

export default Chat;
