import { useContext, useState } from "react";
import BlogContext, { TPost } from "../../contexts/BlogContext/BlogContext";
import {
    BlogFilterWrapper,
    BlogPagePostsWrapper,
    BlogPageWrapper,
} from "./BlogPage.styles";
import BlogPageItem from "./BlogPageItem/BlogPageItem";
import PopupModal from "../../components/PopupModal/PopupModal";

const BlogPage = () => {
    const blogContext = useContext(BlogContext);
    const [filterText, setFilterText] = useState<string>("");
    const [popupBlogPost, setPopupBlogPost] = useState<TPost | null>(null);

    const blogPosts = blogContext.blogPosts.filter((blogPosts: TPost) => {
        if (blogPosts.body.toLowerCase().includes(filterText.toLowerCase())) {
            return true;
        }
        return false;
    });

    const handleFilterTextChanged = (
        e: React.FormEvent<HTMLInputElement> | undefined
    ) => {
        setFilterText(e?.currentTarget.value ?? "");
    };

    const handlePopupBlogPost = (blogPost: TPost) => {
        setPopupBlogPost(blogPost);
    };

    const handlePopupModelCloseCallback = () => {
        setPopupBlogPost(null);
    };

    return (
        <BlogPageWrapper>
            <BlogFilterWrapper>
                <label htmlFor="BlogFilter">Filter Blog Posts</label>
                <input
                    id="BlogFilter"
                    value={filterText}
                    onInput={handleFilterTextChanged}
                />
            </BlogFilterWrapper>
            <fieldset>
                <label>Blog Posts: {blogPosts.length}</label>
                <BlogPagePostsWrapper>
                    {blogContext.isLoading && <>Loading ...</>}
                    {blogContext.isError && <>Error Loading</>}
                    {!blogContext.isLoading && blogPosts.length == 0 && (
                        <>No blog posts found</>
                    )}
                    {blogPosts.map((blogPost: TPost) => {
                        return (
                            <BlogPageItem
                                key={blogPost.id}
                                blogPost={blogPost}
                                filterText={filterText}
                                popupBlogPost={handlePopupBlogPost}
                            />
                        );
                    })}
                </BlogPagePostsWrapper>
            </fieldset>
            {popupBlogPost && (
                <PopupModal
                    bgImageUrl={`https://via.assets.so/album.png?id=${popupBlogPost.id}&q=95&w=360&h=360&fit=fill`}
                    title={popupBlogPost.title}
                    content={popupBlogPost.body}
                    onPopupModelCloseCallback={handlePopupModelCloseCallback}
                />
            )}
        </BlogPageWrapper>
    );
};

export default BlogPage;
