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
    scrollbar-width: thin;
    scroll-behavior: smooth;
`;
export const ChatMessagesFieldSetLegend = styled.legend``;
export const ChatMessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;
