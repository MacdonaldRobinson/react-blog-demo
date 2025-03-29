import styled from "styled-components";

export const BlogPostSlideItemTitle = styled.h3`
  font-size: 2rem;
`;
export const BlogPostSlideItemContent = styled.div``;

export const BlogPostSlideItemWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  gap: 20px;
  padding: 20px;
  scroll-snap-align: center;

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

  @keyframes slideOutUp {
    from {
      opacity: 1;
      transform: translateY(0%);
    }
    to {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  ${BlogPostSlideItemTitle}, ${BlogPostSlideItemContent} {
    opacity: 0;
    animation: slideInDown 1s 0.5s forwards;
  }
`;
