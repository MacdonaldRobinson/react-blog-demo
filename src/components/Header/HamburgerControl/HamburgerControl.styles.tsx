import styled from "styled-components";

export const HamburgerControlWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 30px;
  height: 30px;
  cursor: pointer;

  span {
    width: 100%;
    height: 2px;
    background-color: white;
  }
`;
