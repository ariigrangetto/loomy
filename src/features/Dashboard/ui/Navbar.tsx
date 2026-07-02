import { LogOut, Plus } from "lucide-react";
import ButtonTheme from "@/components/Event/toggleTheme.tsx";
import { Link } from "react-router";

interface Props {
    onHandleSignOut: () => void;
    setIsFormOpen: (open: boolean) => void;
}

export const NavBarDashboard: React.FC<Props> = (props) => {
    return (
        <header className="flex justify-between items-center mb-10 pb-4 border-b border-gray-200 dark:border-white/10 relative">
            <div className="flex items-center gap-3">
                <img src="/icon.png" alt="Naao Icon" className="w-12 h-12" />
                <div>
                    <h1 className="text-[20px] font-extrabold text-[#1a1a2e] dark:text-white tracking-tight">Naao</h1>
                    <p className="text-[9px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.2em] uppercase">Dashboard</p>
                </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2">
                <Link to="/about" className="text-black dark:text-white font-semibold px-4 rounded-[10px] transition-colors hover:text-[#7460ed] dark:hover:text-[#c084fc]">About</Link>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <ButtonTheme />
                <button
                    onClick={() => props.setIsFormOpen(true)}
                    className="py-2.5 px-3 sm:px-5 bg-[#7460ed] hover:bg-[#6250cc] text-white text-[14px] font-semibold rounded-[10px] shadow-sm hover:shadow-md transform transition-all active:scale-[0.98] outline-none flex items-center gap-2"
                >
                    <Plus size={18} />
                    <span className="hidden sm:inline">New Appointment</span>
                </button>
                <button
                    onClick={() => props.onHandleSignOut()}
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-[10px] transition-colors"
                    title="Cerrar Sessión"
                >
                    <LogOut size={20} />
                </button>
            </div>
        </header>
    )
}