import { createBrowserRouter, redirect } from "react-router";
import { supabase } from "./supabase/client.ts";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import RootLayout from "./layout/RouterLayout.tsx";
import Client from "./pages/Client.tsx";

const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export const Router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (!user) {
                        return redirect("/login");
                    }
                    redirect("/dashboard");
                    return user;
                }
            },
            {
                path: "/login",
                element: <Login />,
                errorElement: <ErrorPage />,
                loader: async () => {
                    const user = await getUser();
                    if (user) {
                        return redirect("/dashboard");
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
                        return redirect("/dashboard");
                    }
                    return user;
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
                    return user;
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
                    return user;
                }
            },
            {
                path: "*",
                element: <NotFound />,
            }
        ]
    }
],
    { basename: "/" }
);