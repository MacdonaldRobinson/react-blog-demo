import styled from "styled-components";
import { WrapWithBgImageContent } from "../WrapWithBgImage/WrapWithBgImage.styles";

export const PopupModalBackDrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
`;

export const PopupModalWindow = styled.div`
    width: 80vw;
    height: 30vh;
    transform: scale(0);
    display: flex;
    flex-direction: column;
    gap: 20px;
    color: white;
    transition: all 1s;

    @keyframes PopShow {
        to {
            transform: scale(100%);
        }
    }

    &.show {
        animation: PopShow 1s forwards;
    }

    ${WrapWithBgImageContent} {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
`;

export const PopupModalWindowTitle = styled.div`
    font-size: 2rem;
`;
export const PopupModalWindowContent = styled.div``;

export const PopupModalWindowClose = styled.div`
    position: absolute;
    right: 10px;
    top: 10px;
    color: red;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    padding: 5px;
`;
