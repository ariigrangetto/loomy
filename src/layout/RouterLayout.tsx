import { Outlet, } from "react-router";
import { UserProvider } from "../context/UserActions.tsx";
import DashboardProvider from "../context/DashboardContext.tsx";
import { ThemeProvider } from "../context/ThemeProvider.tsx";

export default function RootLayout({ id }: { id: string }) {
    return (
        <ThemeProvider defaultTheme="system">
            <UserProvider>
                <DashboardProvider id={id}>
                    <Outlet />
                </DashboardProvider>
            </UserProvider>
        </ThemeProvider>
    )
}