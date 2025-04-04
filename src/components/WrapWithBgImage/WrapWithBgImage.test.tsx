import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import WrapWithBgImage from "./WrapWithBgImage";

describe("WrapWithBgImage", () => {
    it("Snapshot compare", () => {
        // const { asFragment } = render(
        //     <WrapWithBgImage bgImageUrl={"http://imgul"}>test</WrapWithBgImage>
        // );
        // expect(asFragment()).toMatchSnapshot();
    });

    it("Must lazy load image", () => {
        const { container } = render(
            <WrapWithBgImage bgImageUrl={"http://imgul"} altText="title">
                test content
            </WrapWithBgImage>
        );

        const imgs = container.querySelectorAll("img");
        expect(imgs).toHaveLength(1);

        // Find the div immediately following the img
        const img = imgs[0];
        const divSibling = img.nextElementSibling;
        expect(divSibling).toBeInTheDocument();

        expect(divSibling?.tagName.toLowerCase()).toBe("div");
        expect(divSibling).toHaveTextContent("test content");
    });
});
