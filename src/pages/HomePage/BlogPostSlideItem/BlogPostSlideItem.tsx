import React from "react";
import { TPost } from "../../../blog/contexts/BlogContext/BlogContext";
import {
    BlogPostSlideItemContent,
    BlogPostSlideItemTitle,
    BlogPostSlideItemWrapper,
} from "./BlogPostSlideItem.style";
import WrapWithBgImage from "../../../components/WrapWithBgImage/WrapWithBgImage";

export type TBlogPostSlideItem = {
    bgImageUrl: string;
    blogPost: TPost;
};

const BlogPostSlideItem = React.memo(
    ({ blogPost, bgImageUrl }: TBlogPostSlideItem) => {
        return (
            <WrapWithBgImage bgImageUrl={bgImageUrl} altText={blogPost.title}>
                <BlogPostSlideItemWrapper>
                    <BlogPostSlideItemTitle>
                        {blogPost.title}
                    </BlogPostSlideItemTitle>
                    <BlogPostSlideItemContent>
                        {blogPost.body}
                    </BlogPostSlideItemContent>
                </BlogPostSlideItemWrapper>
            </WrapWithBgImage>
        );
    }
);

export default BlogPostSlideItem;
