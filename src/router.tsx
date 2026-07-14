/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, redirect } from "react-router";
import { getUserId } from "./supabase/client.ts";
import RootLayout from "./layout/RouterLayout.tsx";
import { lazy } from "react";
import Landing from "./pages/Landing.tsx";
import CreateNewPassword from "./pages/Auth/CreatePwd.tsx";
import ResetPassword from "./pages/Auth/ResetPwd.tsx";
import AddAppointment from "./features/Dashboard/AddAppt.tsx";
import Dashboard from "./pages/app/Dashboard/Index.tsx";

const Login = lazy(() => import("./pages/Auth/Login.tsx"));
const Register = lazy(() => import("./pages/Auth/Register.tsx"));
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
                path: "/",
                element: <Landing />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (user) {
                        return redirect("/dashboard");
                    }
                }
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (user) {
                        return redirect("/");
                    }
                    return { user };
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
                    return { user };
                }
            },
            {
                path: "/dashboard",
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
                path: "/add-appointment",
                element: <AddAppointment />,
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
                path: "/create-new-password",
                element: <CreateNewPassword />,
                errorElement: <ErrorPage />,

            },
            {
                path: "/reset-password",
                element: <ResetPassword />,
                errorElement: <ErrorPage />
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
],
    { basename: "/" }
);