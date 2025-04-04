import React from "react";
import { HamburgerControlWrapper } from "./HamburgerControl.styles";

export type THamburgerControl = {
    onClick: () => void;
};

const HamburgerControl = React.memo(({ onClick }: THamburgerControl) => {
    return (
        <HamburgerControlWrapper onClick={onClick}>
            <span></span>
            <span></span>
            <span></span>
        </HamburgerControlWrapper>
    );
});

export default HamburgerControl;
