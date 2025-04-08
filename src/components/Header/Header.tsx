import { useCallback, useState } from "react";
import HamburgerControl from "./HamburgerControl/HamburgerControl";
import { HeaderWrapper } from "./Header.styles";
import MainMenu from "./MainMenu/MainMenu";
import AuthButton from "../../auth/components/AuthButton/AuthButton";

const Header = () => {
    const [isOpened, setIsOpened] = useState<boolean>(true);

    const handleClick = useCallback(() => {
        setIsOpened(!isOpened);
    }, [isOpened]);

    return (
        <HeaderWrapper>
            <HamburgerControl onClick={handleClick} />
            {isOpened && <MainMenu />}
            <AuthButton />
        </HeaderWrapper>
    );
};

export default Header;
