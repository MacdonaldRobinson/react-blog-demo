import { useState } from "react";
import WrapWithBgImage from "../WrapWithBgImage/WrapWithBgImage";
import {
    PopupModalBackDrop,
    PopupModalWindow,
    PopupModalWindowClose,
    PopupModalWindowContent,
    PopupModalWindowTitle,
    PopupWindowContentWrapper,
} from "./PopupModal.styles";
import clsx from "clsx";

export type TPopupModal = {
    title: string;
    content: string;
    bgImageUrl: string;
    onPopupModelCloseCallback: () => void;
};
const PopupModal = ({
    title,
    content,
    bgImageUrl,
    onPopupModelCloseCallback,
}: TPopupModal) => {
    const [showPopupWindow, setShowPopupWindow] = useState<boolean>();

    const handleOnImageLoaded = () => {
        setShowPopupWindow(true);
    };

    return (
        <PopupModalBackDrop>
            {!showPopupWindow && <>Loading...</>}
            <PopupModalWindow className={clsx({ show: showPopupWindow })}>
                <WrapWithBgImage
                    bgImageUrl={bgImageUrl}
                    onImageLoaded={handleOnImageLoaded}
                    altText={title}
                >
                    <PopupModalWindowClose onClick={onPopupModelCloseCallback}>
                        X Close
                    </PopupModalWindowClose>
                    <PopupWindowContentWrapper>
                        <PopupModalWindowTitle>{title}</PopupModalWindowTitle>
                        <PopupModalWindowContent>
                            {content}
                        </PopupModalWindowContent>
                    </PopupWindowContentWrapper>
                </WrapWithBgImage>
            </PopupModalWindow>
        </PopupModalBackDrop>
    );
};

export default PopupModal;
