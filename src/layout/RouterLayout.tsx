import { Outlet } from "react-router";
import { UserProvider } from "../context/userActions";
import DashboardProvider from "../context/dashboardContext.tsx";
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