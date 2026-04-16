import { Outlet } from "react-router";
import { UserProvider } from "../context/UserActions.tsx";
import DashboardProvider from "../context/DashboardContext.tsx";
import { ThemeProvider } from "../context/ThemeProvider.tsx";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="system">
            <UserProvider>
                <DashboardProvider>
                    <Outlet />
                </DashboardProvider>
            </UserProvider>
        </ThemeProvider>
    )
}