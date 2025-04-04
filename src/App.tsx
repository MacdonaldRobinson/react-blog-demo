import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
import BlogContextProvider from "./contexts/BlogContext/BlogContextProvider";
import PageLayout from "./pages/PageLayout/PageLayout";

const HomePage = React.lazy(() => import("../src/pages/HomePage/HomePage"));
const BlogPage = React.lazy(() => import("../src/pages/BlogPage/BlogPage"));

const queryClient = new QueryClient();

// Dynamically determine the base path from the environment variable or use '/' by default
const basePath = import.meta.env.VITE_BASE_PATH || "/";

const router = createBrowserRouter(
    [
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
    ],
    { basename: basePath }
);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BlogContextProvider>
                <Suspense fallback={"Loading ..."}>
                    <RouterProvider router={router} />
                </Suspense>
            </BlogContextProvider>
        </QueryClientProvider>
    );
}

export default App;
