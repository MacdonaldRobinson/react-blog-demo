import styled from "styled-components";

export const ChatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
`;
export const ChatMessagesFieldSet = styled.fieldset`
    border: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    max-height: 50vh; /* or whatever you want */
    overflow: hidden; /* important */
    border: 1px solid black;
`;
export const ChatMessagesFieldSetLegend = styled.legend``;
export const ChatMessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    overflow-y: auto;
    scrollbar-width: thin;
    scroll-behavior: smooth;
    padding: 10px;
    flex: 1;
    min-height: 0; /* important! allows flex scroll */
`;
