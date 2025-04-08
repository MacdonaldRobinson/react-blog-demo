import styled from "styled-components";

export const ChatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`;
export const ChatMessagesFieldSet = styled.fieldset`
    padding: 10px;
    height: 50vh;
    overflow: auto;
`;
export const ChatMessagesFieldSetLegend = styled.legend``;
export const ChatMessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
export const ChatMessaageWrapper = styled.div``;

export const ChatMessageUserNameWrapper = styled.div`
    font-size: 0.7rem;
    font-weight: bold;
    text-transform: uppercase;
    color: gray;
`;
export const ChatMessageWrapper = styled.div`
    font-size: 1rem;
`;
export const ChatMessageItemWrapper = styled.div`
    border: 1px outset black;
    background-color: lightgray;
    border-radius: 10px;
    padding: 10px;
    white-space: pre-wrap;
`;
