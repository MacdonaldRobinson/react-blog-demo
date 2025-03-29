import styled from "styled-components";

export const WrapBgImage = styled.img`
  z-index: -1;
`;
export const WrapWithBgImageContent = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
`;

export const WrapWithBgImageWrappper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0;
  transition: all 1s;

  &.show {
    opacity: 1;
  }

  ${WrapBgImage}, ${WrapWithBgImageContent} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
