import { useCallback, useContext, useEffect, useState } from "react";
import BlogContext, { TPost } from "../../contexts/BlogContext/BlogContext";
import {
    BlogFilterWrapper,
    BlogPagePostsWrapper,
    BlogPageWrapper,
} from "./BlogPage.styles";
import BlogPageItem from "./BlogPageItem/BlogPageItem";
import PopupModal from "../../components/PopupModal/PopupModal";
import { debounce } from "lodash";
const BlogPage = () => {
    const blogContext = useContext(BlogContext);
    const [filterText, setFilterText] = useState<string>("");
    const [popupBlogPost, setPopupBlogPost] = useState<TPost | null>(null);
    const [filteredBlogPosts, setFilteredBlogPosts] = useState<TPost[]>(
        blogContext.blogPosts
    );

    const filterBlogPosts = useCallback(
        (blogPosts: TPost[]) => {
            return blogPosts.filter((blogPosts: TPost) => {
                if (
                    blogPosts.body
                        .toLowerCase()
                        .includes(filterText.toLowerCase())
                ) {
                    return true;
                }
                return false;
            });
        },
        [filterText]
    );

    // UseEffect to debounce filtering
    useEffect(() => {
        // Debounced filter logic
        const debouncedFilter = debounce(() => {
            const filtered = filterBlogPosts(blogContext.blogPosts);
            setFilteredBlogPosts(filtered);
        }, 100);

        debouncedFilter(); // Trigger the filter immediately after filterText change

        // Cleanup debounce on component unmount or when dependencies change
        return () => debouncedFilter.cancel();
    }, [filterText, blogContext.blogPosts, filterBlogPosts]); // Dependency array for filterText and blogContext.blogPosts

    const handleFilterTextChanged = (
        e: React.FormEvent<HTMLInputElement> | undefined
    ) => {
        setFilterText(e?.currentTarget.value ?? "");
    };

    const handlePopupBlogPost = useCallback((blogPost: TPost) => {
        setPopupBlogPost(blogPost);
    }, []);

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
                <label>Blog Posts: {filteredBlogPosts.length}</label>
                <BlogPagePostsWrapper>
                    {blogContext.isLoading && <>Loading ...</>}
                    {blogContext.isError && <>Error Loading</>}
                    {!blogContext.isLoading &&
                        filteredBlogPosts.length == 0 && (
                            <>No blog posts found</>
                        )}
                    {filteredBlogPosts.map((blogPost: TPost) => {
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
