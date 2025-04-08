import BlogContext, { TBlogContext } from "./BlogContext";
import useFetchBlogPosts from "../../hooks/useFetchBlogPosts";

export type TBlogContextProvider = {
    children: React.ReactNode;
};

const BlogContextProvider = ({ children }: TBlogContextProvider) => {
    const blogPostResponse = useFetchBlogPosts();
    const newBlogContext: TBlogContext = {
        blogPosts: blogPostResponse.data?.posts ?? [],
        isLoading: blogPostResponse.isLoading,
        isError: blogPostResponse.isError,
    };

    return (
        <BlogContext.Provider value={newBlogContext}>
            {children}
        </BlogContext.Provider>
    );
};

export default BlogContextProvider;
