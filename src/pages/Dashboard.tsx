import { LogOut, Plus, Moon, Sun } from "lucide-react";
import useUser from "../hooks/useUser.tsx";
import { useLoaderData, useNavigate } from "react-router";
import useTheme from "../hooks/useTheme.tsx";
import List from "../components/listOfAppointments.tsx";
import { useState } from "react";
import Form from "../components/Form.tsx";

export default function Dashboard() {
    const { signOut } = useUser();
    const navigate = useNavigate();
    const { user: { id } } = useLoaderData();
    const { theme, setTheme } = useTheme();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleSignOut = async () => {
        const error = await signOut();
        if (!error) navigate("/login");
    };

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
        <main className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] p-6 font-sans relative transition-colors duration-200">
            <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-3">
                    <img src="/icon.png" alt="Loomy Icon" className="w-12 h-12" />
                    <div>
                        <h1 className="text-[20px] font-extrabold text-[#1a1a2e] dark:text-white tracking-tight">Loomy</h1>
                        <p className="text-[9px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase">Dashboard</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-[10px] transition-colors"
                        title="Cambiar Tema"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="py-2.5 px-5 bg-[#7460ed] hover:bg-[#6250cc] text-white text-[14px] font-semibold rounded-[10px] shadow-sm hover:shadow-md transform transition-all active:scale-[0.98] outline-none flex items-center gap-2"
                    >
                        <Plus size={18} />
                        New Appointment
                    </button>
                    <button
                        onClick={() => handleSignOut()}
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-[10px] transition-colors"
                        title="Cerrar Sessión"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </header>
            {isFormOpen && <Form id={id} setIsFormOpen={setIsFormOpen} />}
            <List id={id} />
        </main>
    );
}