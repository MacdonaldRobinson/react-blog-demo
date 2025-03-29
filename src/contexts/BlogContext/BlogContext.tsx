import { createContext } from "react";

export type TBlogPostsQueryResponse = {
  posts: TPost[];
  total: number;
  skip: number;
  limit: number;
};

export type TPost = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: TReactions;
  views: number;
  userId: number;
};

export type TReactions = {
  likes: number;
  dislikes: number;
};

export type TBlogContext = {
  blogPosts: TPost[];
  isLoading: boolean;
  isError: boolean;
};

const BlogContext = createContext<TBlogContext>({
  blogPosts: [],
  isLoading: false,
  isError: false,
});

export default BlogContext;
