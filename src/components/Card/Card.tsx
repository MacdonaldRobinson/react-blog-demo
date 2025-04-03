import React, { useState } from "react";
import {
    BackFaceContentWrapper,
    BgImage,
    FrontFaceContentWrapper,
    CardWrapper,
    FrontFaceWrapper,
    BackFaceWrapper,
    FrontFaceHeaderContent,
    LoadingWrapper,
} from "./Card.styles";
import clsx from "clsx";

export type TCard = {
    bgImageUrl: string;
    children: React.ReactNode;
    backFaceContent?: React.ReactNode;
    frontFaceHeaderContent?: React.ReactNode;
};

const Card = React.memo(
    ({
        bgImageUrl,
        children,
        backFaceContent,
        frontFaceHeaderContent,
    }: TCard) => {
        const [flip, setFlip] = useState<boolean>(false);
        const [show, setShow] = useState<boolean>(false);

        const handleBgImageLoad = () => {
            setShow(true);
        };

        const handleClick = () => {
            if (backFaceContent) {
                setFlip(!flip);
            }
        };

        return (
            <CardWrapper
                className={clsx({ show: show, flip: flip })}
                onClick={handleClick}
            >
                <FrontFaceWrapper>
                    {!show && <LoadingWrapper>Loading...</LoadingWrapper>}
                    <BgImage
                        src={bgImageUrl}
                        onLoad={handleBgImageLoad}
                        loading="lazy"
                    />
                    <FrontFaceContentWrapper>
                        {frontFaceHeaderContent && (
                            <FrontFaceHeaderContent>
                                {frontFaceHeaderContent}
                            </FrontFaceHeaderContent>
                        )}
                        <div>{children}</div>
                    </FrontFaceContentWrapper>
                </FrontFaceWrapper>
                {backFaceContent && (
                    <BackFaceWrapper>
                        <BgImage
                            src={bgImageUrl}
                            onLoad={handleBgImageLoad}
                            loading="lazy"
                        />
                        <BackFaceContentWrapper>
                            <div>{backFaceContent}</div>
                        </BackFaceContentWrapper>
                    </BackFaceWrapper>
                )}
            </CardWrapper>
        );
    }
);

export default Card;
