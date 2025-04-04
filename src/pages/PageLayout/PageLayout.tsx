import React from "react";
import Header from "../../components/Header/Header";

export type TPageLayout = {
    children: React.ReactNode;
};
const PageLayout = React.memo(({ children }: TPageLayout) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
});

export default PageLayout;
