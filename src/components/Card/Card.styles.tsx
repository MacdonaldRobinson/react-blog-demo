import styled from "styled-components";

export const BgImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

export const BackFaceContentWrapper = styled.div``;

export const BackFaceWrapper = styled.div`
  transform: rotateY(180deg);
`;

export const FrontFaceContentWrapper = styled.div``;

export const FrontFaceWrapper = styled.div``;

export const FrontFaceHeaderContent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
`;

export const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0;
  perspective: 1000px;
  transition: all 1s;
  cursor: pointer;

  ${FrontFaceContentWrapper} {
    & > div {
      opacity: 0;
    }
  }

  &.show {
    opacity: 1;

    ${FrontFaceContentWrapper} {
      & > div {
        transition: all 1s;
        animation: slideInDown 1s 1s forwards;
      }
    }
  }

  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-100%);
    }
    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  ${FrontFaceWrapper}, ${BackFaceWrapper}, ${FrontFaceContentWrapper}, ${BackFaceContentWrapper} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 1s;
    backface-visibility: hidden;
    border-radius: 10%;
    color: white;
    backdrop-filter: blur(5px);

    ${BgImage} {
      border-radius: 10%;
    }
  }

  ${FrontFaceContentWrapper} {
    text-align: center;
  }

  ${FrontFaceContentWrapper},
  ${BackFaceContentWrapper} {
    padding: 10px;
  }

  ${BackFaceContentWrapper} {
    overflow: auto;
    scrollbar-width: thin;
    align-items: flex-start;
    padding: 20px;
    text-align: center;
  }

  &:hover {
    ${FrontFaceWrapper}, ${BackFaceWrapper} {
      backdrop-filter: blur(10px);
    }

    transform: scale(110%);
    z-index: 10;
  }

  &.flip {
    ${FrontFaceWrapper} {
      transform: rotateY(180deg);
    }

    ${BackFaceWrapper} {
      transform: rotateY(360deg);
    }
  }
`;
