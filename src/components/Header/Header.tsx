import { useState } from "react";
import HamburgerControl from "./HamburgerControl/HamburgerControl";
import { HeaderWrapper } from "./Header.styles";
import MainMenu from "./MainMenu/MainMenu";

const Header = () => {
  const [isOpened, setIsOpened] = useState<boolean>(true);

  const handleClick = () => {
    setIsOpened(!isOpened);
  };

  return (
    <HeaderWrapper>
      <HamburgerControl onClick={handleClick} />
      {isOpened && <MainMenu />}
    </HeaderWrapper>
  );
};

export default Header;
