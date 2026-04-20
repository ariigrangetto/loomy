import useDashboard from "../hooks/useDashboard.tsx";
import type { State } from "../types.d.ts";
import { CalendarIcon, Clock, Phone, User, X } from "lucide-react";
import { Link } from "react-router";
import useStateContext from "../hooks/useStateContext.tsx";

export default function List({ id }: { id: string }) {
    const { updateTurnoState, deleteFromDashboard } = useDashboard();
    const { turnos, loading } = useStateContext();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] flex items-center justify-center transition-colors duration-200">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7460ed]"></div>
            </div>
        );
    }


    const getStateStyles = (state: string) => {
        switch (state) {
            case "pending":
                return "bg-[#fef9c3] text-[#a16207] dark:bg-yellow-500/20 dark:text-yellow-400";
            case "completed":
                return "bg-[#dcfce3] text-[#15803d] dark:bg-green-500/20 dark:text-green-400";
            case "cancelled":
                return "bg-[#fee2e2] text-[#b91c1c] dark:bg-red-500/20 dark:text-red-400";
            default:
                return "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
        }
    };

    return (
        <>
            {!turnos || turnos.length === 0 ? (
                <>

                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white dark:bg-[#1f2028] rounded-[16px] p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center min-h-[400px] text-center transition-colors duration-200">
                            <CalendarIcon size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
                            <h2 className="text-[20px] font-bold text-[#1a1a2e] dark:text-white mb-2">No appointments scheduled</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-[14px] mb-6">Start organizing your schedule by adding a new appointment.</p>
                        </div>
                    </div>
                </>

            ) : (
                <div className="max-w-5xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-[18px] font-bold text-[#1a1a2e] dark:text-white mb-6">Upcoming Appointments</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {turnos.map((turno) => (

                            <div
                                key={turno.id}
                                className="bg-white dark:bg-[#1f2028] rounded-[16px] p-6 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 flex flex-col gap-4 relative overflow-hidden transition-all hover:border-[#7460ed]/30 dark:hover:border-[#c084fc]/30 hover:shadow-md"
                            >
                                <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-2 relative">
                                    <select
                                        value={turno.state}
                                        onChange={async (e) => {
                                            const newState = e.target.value as State;
                                            await updateTurnoState(turno.id, newState, id, turno.description, turno.date, turno.client.id);

                                        }}
                                        className={`text-[12px] font-semibold px-2 py-1 rounded-full appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-[#7460ed]/30 border-none transition-colors ${getStateStyles(turno.state)}`}
                                    >
                                        {turno.state !== "completed" ? (
                                            <>
                                                <option value="pending" className="bg-white text-gray-900 dark:bg-[#1a1a2e] dark:text-gray-300 font-medium">Pending</option>
                                                <option value="completed" className="bg-white text-gray-900 dark:bg-[#1a1a2e] dark:text-gray-300 font-medium">Completed</option>
                                                <option value="cancelled" className="bg-white text-gray-900 dark:bg-[#1a1a2e] dark:text-gray-300 font-medium">Cancelled</option>
                                            </>
                                        ) : (
                                            <option value="completed" className="bg-white text-gray-900 dark:bg-[#1a1a2e] dark:text-gray-300 font-medium">Completed</option>
                                        )}
                                    </select>

                                    <span className="text-[11px] sm:text-[12px] text-gray-400 dark:text-gray-500 font-medium sm:absolute sm:left-1/2 sm:-translate-x-1/2 order-3 sm:order-none w-full sm:w-auto text-center sm:text-left mt-1 sm:mt-0">
                                        Created: {new Date(turno.created_at).toLocaleDateString()}
                                    </span>

                                    <button
                                        onClick={() => deleteFromDashboard(turno.id)}
                                        className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-500/10"
                                        aria-label="Delete appointment"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>

                                <div>
                                    <h3 className="text-[17px] font-bold text-[#1a1a2e] dark:text-white capitalize leading-tight">
                                        {turno.description}
                                    </h3>
                                </div>

                                <hr className="border-gray-100 dark:border-white/5 my-1" />

                                <div className="flex items-center gap-5 text-[14px] text-gray-600 dark:text-gray-300 font-medium">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon size={16} className="text-[#7460ed] dark:text-[#c084fc]" />
                                        <span>{turno.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-[#7460ed] dark:text-[#c084fc]" />
                                        <span>{turno.time}</span>
                                    </div>
                                </div>

                                <div className="bg-[#f7f7f9] dark:bg-white/5 rounded-[12px] p-3.5 flex items-center gap-3.5 mt-auto border border-transparent dark:border-white/5">
                                    <div className="bg-[#e2dfff] dark:bg-[#7460ed]/20 p-2.5 rounded-full text-[#7460ed] dark:text-[#c084fc]">
                                        <User size={18} />
                                    </div>
                                    <div className="flex flex-col">
                                        <Link to={`/client/${turno.client.id}`} className="text-[14px] font-semibold text-[#1a1a2e] dark:text-white capitalize">
                                            {turno.client?.name} {turno.client?.lastname}
                                        </Link>
                                        {turno.client?.number && (
                                            <span className="text-[12px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                                                <Phone size={11} className="text-gray-400" /> {turno.client.number}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}