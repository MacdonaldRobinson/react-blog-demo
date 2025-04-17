import styled from "styled-components";

export const CMSPageWrapper = styled.section`
    overflow: auto;
    height: 94vh;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    & div {
        align-self: stretch;
    }
`;
