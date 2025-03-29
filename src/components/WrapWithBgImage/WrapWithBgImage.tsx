import { useState } from "react";
import {
  WrapBgImage,
  WrapWithBgImageContent,
  WrapWithBgImageWrappper,
} from "./WrapWithBgImage.styles";
import clsx from "clsx";

export type TWrapWtthBgImage = {
  children: React.ReactNode;
  bgImageUrl: string;
  onImageLoaded?: () => void;
};
const WrapWithBgImage = ({
  children,
  bgImageUrl,
  onImageLoaded,
}: TWrapWtthBgImage) => {
  const [isImageLoaded, setImageLoaded] = useState<boolean>(false);
  const handleImageLoaded = () => {
    setImageLoaded(true);
    if (onImageLoaded) {
      onImageLoaded();
    }
  };

  return (
    <WrapWithBgImageWrappper className={clsx({ show: isImageLoaded })}>
      <WrapBgImage src={bgImageUrl} loading="lazy" onLoad={handleImageLoaded} />
      <WrapWithBgImageContent>{children}</WrapWithBgImageContent>
    </WrapWithBgImageWrappper>
  );
};

export default WrapWithBgImage;
