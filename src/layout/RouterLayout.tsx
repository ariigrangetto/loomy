import { Outlet, } from "react-router";
import { UserProvider } from "../context/UserActions";
import DashboardProvider from "../context/dashboardContext";
import { ThemeProvider } from "../context/ThemeProvider";
import { Suspense } from "react";
import StateProvider from "../context/StateContext";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="system">
            <StateProvider>
                <UserProvider>
                    <DashboardProvider>
                        <Suspense fallback={<div className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7460ed]"></div></div>}>
                            <Outlet />
                        </Suspense>
                    </DashboardProvider>
                </UserProvider>
            </StateProvider>
        </ThemeProvider>
    )
}