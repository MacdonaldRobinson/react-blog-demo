import { format } from "date-fns";
import {
    ChatMessageDateWrapper,
    ChatMessageItemWrapper,
    ChatMessageUserNameWrapper,
    ChatMessageWrapper,
} from "./ChatItem.styles";
import { TChatMessageWithMetaInfo } from "../../../contexts/ChatContext";

export type TChatItem = {
    userName: string;
    chatMessage: TChatMessageWithMetaInfo;
};
const ChatItem = ({ userName, chatMessage }: TChatItem) => {
    return (
        <ChatMessageItemWrapper
            className={
                userName.toLowerCase() == chatMessage.userName.toLowerCase()
                    ? "me"
                    : "no-me"
            }
        >
            <ChatMessageUserNameWrapper>
                {chatMessage.userName}
            </ChatMessageUserNameWrapper>
            <ChatMessageWrapper>{chatMessage.message}</ChatMessageWrapper>
            <ChatMessageDateWrapper>
                {format(chatMessage.createdOn, "yyyy-MM-dd hh:mm:ss")}
            </ChatMessageDateWrapper>
        </ChatMessageItemWrapper>
    );
};

export default ChatItem;
