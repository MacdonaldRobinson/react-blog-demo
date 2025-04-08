import styled from "styled-components";

export const ChatMessageInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 35vw;
`;

export const ChatMessageInputItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;

    textarea {
        height: 10vh;
        white-space: pre-wrap;
    }
`;
