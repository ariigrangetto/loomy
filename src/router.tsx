/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, redirect } from "react-router";
import { getUserId } from "./supabase/client.ts";
import RootLayout from "./layout/RouterLayout.tsx";
import { lazy } from "react";
import About from "./pages/app/About/index.tsx";

const ResetPassword = lazy(() => import("./pages/Auth/ResetPassword.tsx"));
const Login = lazy(() => import("./pages/Auth/Login.tsx"));
const Register = lazy(() => import("./pages/Auth/Register.tsx"));
const Dashboard = lazy(() => import("./pages/app/Dashboard/index.tsx"));
const Client = lazy(() => import("./pages/app/Client/index.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));



const getUser = async () => {
    try {
        const { user } = await getUserId();
        return user;
    } catch (error) {
        return null;
    }
}

export const Router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (user) {
                        return redirect("/");
                    }
                    return user;
                }
            },
            {
                path: "/register",
                element: <Register />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (user) {
                        return redirect("/");
                    }
                    return user;
                }
            },
            {
                path: "/",
                element: <Dashboard />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (!user) {
                        return redirect("/login");
                    }
                    return { user };
                }
            },
            {
                path: "/client/:id",
                element: <Client />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (!user) {
                        return redirect("/login");
                    }
                    return { user };
                }
            },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "/resetPassword",
                element: <ResetPassword />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (user) {
                        return redirect("/");
                    }
                    return user;
                },
            },
            {
                path: "/about",
                element: <About />,
                errorElement: <ErrorPage />
            }
        ],
    },
],
    { basename: "/" }
);