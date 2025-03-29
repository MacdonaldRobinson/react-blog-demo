import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TBlogPostsQueryResponse } from "./BlogContext";

const useFetchBlogPosts = () => {
  const queryResponse = useQuery({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      const response = await axios
        .get("https://dummyjson.com/posts")
        .then((r) => r.data as TBlogPostsQueryResponse);
      return response;
    },
  });

  return queryResponse;
};

export default useFetchBlogPosts;
