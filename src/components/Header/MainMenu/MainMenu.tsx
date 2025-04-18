import { NavLink } from "react-router-dom";
import { MainMenuWrapper } from "./MainMenu.styles";

const MainMenu = () => {
    return (
        <MainMenuWrapper>
            <ul>
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/blog"}>Blog</NavLink>
                </li>
                <li>
                    <NavLink to={"/chat"}>Chat</NavLink>
                </li>
                <li>
                    <NavLink to={"/cms"}>CMS</NavLink>
                </li>
            </ul>
        </MainMenuWrapper>
    );
};

export default MainMenu;
