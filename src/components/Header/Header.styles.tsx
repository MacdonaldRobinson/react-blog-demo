import styled from "styled-components";
import { MainMenuWrapper } from "./MainMenu/MainMenu.styles";

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  background-color: black;
  padding: 10px;

  ${MainMenuWrapper} {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;

    a {
      color: white;
      font-size: 1.2rem;
      text-decoration: none;
      transition: all 1s;

      &::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: white;
        opacity: 0;
        transition: all 1s;
      }

      &:hover {
        &::after {
          opacity: 1;
        }
      }

      &.active {
        font-weight: bold;
        &::after {
          opacity: 1;
        }
      }
    }
  }
`;
