import { useContext } from "react";
import BlogContext, { TPost } from "../../contexts/BlogContext/BlogContext";
import { BlogPostSlidesWrapper, HomePageWrapper } from "./HomePage.styles";
import BlogPostSlideItem from "./BlogPostSlideItem/BlogPostSlideItem";
import { Meta, Title } from "react-head";

const HomePage = () => {
    const blogContext = useContext(BlogContext);
    const blogPosts = blogContext.blogPosts;

    return (
        <HomePageWrapper>
            <Title>Home Page Title</Title>
            <Meta name="description" content="Home Page" />
            <BlogPostSlidesWrapper>
                {blogPosts.map((blogPost: TPost) => {
                    return (
                        <BlogPostSlideItem
                            key={blogPost.id}
                            blogPost={blogPost}
                            bgImageUrl={`https://via.assets.so/game.png?id=${blogPost.id}&q=95&w=360&h=360&fit=fill`}
                        />
                    );
                })}
            </BlogPostSlidesWrapper>
        </HomePageWrapper>
    );
};

export default HomePage;
