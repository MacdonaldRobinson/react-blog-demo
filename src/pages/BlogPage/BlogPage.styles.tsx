import styled from "styled-components";

export const BlogPageWrapper = styled.div`
    padding: 10px;
`;
export const BlogFilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    margin-bottom: 10px;
`;

export const BlogPagePostsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    height: 85vh;
    overflow: auto;
    padding: 20px;
`;
