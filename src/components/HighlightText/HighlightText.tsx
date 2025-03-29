import React from "react";

export type THighlightText = {
  fullText: string;
  highlightText: string;
};

const HighlightText = React.memo(
  ({ fullText, highlightText }: THighlightText) => {
    if (!fullText) {
      return fullText;
    }
    const regEx = new RegExp(`(${highlightText})`, "gi");

    const newText = fullText.split(regEx).map((part, index) => {
      if (part.toLowerCase() == highlightText.toLowerCase()) {
        return <mark key={index}>{part}</mark>;
      }

      return part;
    });

    return newText;
  }
);

export default HighlightText;
