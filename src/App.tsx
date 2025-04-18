import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
import BlogContextProvider from "./blog/contexts/BlogContext/BlogContextProvider";
import PageLayout from "./pages/PageLayout/PageLayout";
import { HeadProvider } from "react-head";
import AuthContextProvider from "./auth/contexts/AuthContext/AuthContextProvider";
import ChatContextProvider from "./chat/contexts/ChatContextProvider";

const HomePage = React.lazy(() => import("../src/pages/HomePage/HomePage"));
const BlogPage = React.lazy(() => import("../src/pages/BlogPage/BlogPage"));
const ChatPage = React.lazy(() => import("../src/pages/ChatPage/ChatPage"));
const CMSPage = React.lazy(() => import("../src/pages/CMSPage/CMSPage"));

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
        {
            path: "/chat",
            element: (
                <PageLayout>
                    <ChatPage />
                </PageLayout>
            ),
        },
        {
            path: "/cms",
            element: (
                <PageLayout>
                    <CMSPage />
                </PageLayout>
            ),
        },
    ],
    { basename: basePath }
);

function App() {
    return (
        <HeadProvider>
            <AuthContextProvider>
                <ChatContextProvider>
                    <QueryClientProvider client={queryClient}>
                        <BlogContextProvider>
                            <Suspense fallback={"Loading ..."}>
                                <RouterProvider router={router} />
                            </Suspense>
                        </BlogContextProvider>
                    </QueryClientProvider>
                </ChatContextProvider>
            </AuthContextProvider>
        </HeadProvider>
    );
}

export default App;
