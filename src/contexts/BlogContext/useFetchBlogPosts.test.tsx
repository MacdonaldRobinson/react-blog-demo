import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { TBlogPostsQueryResponse } from "./BlogContext";
import { afterAll, beforeAll, expect, test } from "vitest";
import { afterEach } from "node:test";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchBlogPosts from "./useFetchBlogPosts";

const handlers = [
  http.get("https://dummyjson.com/posts", () => {
    return HttpResponse.json<TBlogPostsQueryResponse>({
      posts: [
        {
          id: 0,
          title: "Test1",
          body: "Test Body",
          tags: [],
          reactions: {
            likes: 0,
            dislikes: 0,
          },
          views: 0,
          userId: 0,
        },
      ],
      total: 0,
      skip: 0,
      limit: 0,
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test("useFetchBlogPosts request make request", async () => {
  const { result } = renderHook(() => useFetchBlogPosts(), {
    wrapper: wrapper,
  });

  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  expect(result.current.data?.posts.length).toBe(1);
  expect(result.current.data?.posts[0].title).toBe("Test1");
});
