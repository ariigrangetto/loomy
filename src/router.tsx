import { createBrowserRouter, redirect } from "react-router";
import { supabase } from "./supabase/client.ts";
import RootLayout from "./layout/RouterLayout.tsx";
import { lazy } from "react";

const ResetPassword = lazy(() => import("./pages/ResetPassword.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const Register = lazy(() => import("./pages/Register.tsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Client = lazy(() => import("./pages/Client.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));



const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
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
                path: "/client/:name/:lastname",
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

        ],
    },
],
    { basename: "/" }
);