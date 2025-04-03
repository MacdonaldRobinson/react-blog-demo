import React from "react";
import Card from "../../../components/Card/Card";
import HighlightText from "../../../components/HighlightText/HighlightText";
import { TPost } from "../../../contexts/BlogContext/BlogContext";
import {
    BlogPageItemWrapper,
    BlogPostPopupWrapper,
} from "./BlogPageItem.styles";

export type TBlogPostItem = {
    blogPost: TPost;
    filterText: string;
    popupBlogPost: (blogPost: TPost) => void;
};

const BlogPageItem = React.memo(
    ({ blogPost, filterText, popupBlogPost }: TBlogPostItem) => {
        return (
            <BlogPageItemWrapper>
                <Card
                    bgImageUrl={`https://via.assets.so/game.png?id=${blogPost.id}&q=95&w=360&h=360&fit=fill`}
                    backFaceContent={
                        filterText ? (
                            <HighlightText
                                fullText={blogPost.body}
                                highlightText={filterText}
                            />
                        ) : (
                            blogPost.body
                        )
                    }
                    frontFaceHeaderContent={
                        <BlogPostPopupWrapper
                            onClick={() => popupBlogPost(blogPost)}
                        >
                            Popup
                        </BlogPostPopupWrapper>
                    }
                >
                    {blogPost.title}
                </Card>
            </BlogPageItemWrapper>
        );
    }
);

export default BlogPageItem;
