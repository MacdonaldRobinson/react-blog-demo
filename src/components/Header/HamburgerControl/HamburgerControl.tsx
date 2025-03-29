import { HamburgerControlWrapper } from "./HamburgerControl.styles";

export type THamburgerControl = {
  onClick: () => void;
};

const HamburgerControl = ({ onClick }: THamburgerControl) => {
  return (
    <HamburgerControlWrapper onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </HamburgerControlWrapper>
  );
};

export default HamburgerControl;
