import { Outlet, } from "react-router";
import { ThemeProvider } from "../hooks/useThemeProvider.tsx";
import { Suspense } from "react";

export default function RootLayout() {
    return (
        <ThemeProvider defaultTheme="system">
            <Suspense fallback={<div className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] flex items-center justify-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7460ed]"></div></div>}>
                <Outlet />
            </Suspense>
        </ThemeProvider>
    )
}