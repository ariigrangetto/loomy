import { createContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderState {
    children: React.ReactNode;
    defaultTheme?: "system"
}

interface ThemeContextState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme }: ThemeProviderState) {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme") as Theme;
        return savedTheme ? savedTheme : defaultTheme;
    })

    useEffect(() => {
        const root = window.document.documentElement;

        root.classList.remove("light", "dark");

        if (theme === defaultTheme) {
            const systemMatch = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";
            root.classList.add(systemMatch);
            return;
        }

        root.classList.add(theme);
    }, [theme])

    const value = useMemo(() => ({
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem("theme", theme);
            setTheme(theme);
        }
    }), [theme, setTheme]);

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}