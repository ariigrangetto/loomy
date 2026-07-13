import { Moon, Sun } from "lucide-react";
import { useThemeProvider } from "../../hooks/useThemeProvider.tsx";

export default function ButtonTheme() {
    const { theme, setTheme } = useThemeProvider();

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-[10px] transition-colors"
            title="Cambiar Tema"
        >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
    )
}