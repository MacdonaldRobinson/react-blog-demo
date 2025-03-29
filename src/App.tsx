import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import BlogContextProvider from "./contexts/BlogContext/BlogContextProvider";
import PageLayout from "./pages/PageLayout/PageLayout";

const HomePage = React.lazy(() => import("../src/pages/HomePage/HomePage"));
const BlogPage = React.lazy(() => import("../src/pages/BlogPage/BlogPage"));

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PageLayout>
        <HomePage />
      </PageLayout>
    ),
  },
  {
    path: "/blog",
    element: (
      <PageLayout>
        <BlogPage />
      </PageLayout>
    ),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BlogContextProvider>
        <RouterProvider router={router} />
      </BlogContextProvider>
    </QueryClientProvider>
  );
}

export default App;
