import WrapWithBgImage from "../WrapWithBgImage/WrapWithBgImage";
import {
  PopupModalBackDrop,
  PopupModalWindow,
  PopupModalWindowClose,
  PopupModalWindowContent,
  PopupModalWindowTitle,
} from "./PopupModal.styles";

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
  return (
    <PopupModalBackDrop>
      <PopupModalWindow>
        <WrapWithBgImage bgImageUrl={bgImageUrl}>
          <PopupModalWindowClose onClick={onPopupModelCloseCallback}>
            X Close
          </PopupModalWindowClose>
          <PopupModalWindowTitle>{title}</PopupModalWindowTitle>
          <PopupModalWindowContent>{content}</PopupModalWindowContent>
        </WrapWithBgImage>
      </PopupModalWindow>
    </PopupModalBackDrop>
  );
};

export default PopupModal;
