import { CalendarIcon, } from "lucide-react";
//import useAISuggestion from "../../../hooks/useAIsuggestion.tsx";
import AppointmentDetails from "./AppointmentDetails.tsx";
import useDashboardActions from "../../../hooks/useDashboardActions.tsx";

export default function List({ userId }: { userId: string }) {
    const { turnos, loading } = useDashboardActions();
    // const { IAMessage } = useAISuggestion({ turnos });

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] flex items-center justify-center transition-colors duration-200">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7460ed]"></div>
            </div>
        );
    }

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
                    {/* {IAMessage ? (
                        <div className="mb-6 p-4 bg-[#7460ed]/10 border border-[#7460ed]/20 rounded-[12px] flex items-start gap-3">
                            <span className="text-xl">✨</span>
                            <p className="text-[#3b2d82] dark:text-indigo-300 font-medium text-[14px] leading-relaxed">{IAMessage}</p>
                        </div>
                    ) : (
                        <div className="mb-6 p-4 bg-[#7460ed]/10 border border-[#7460ed]/20 rounded-[12px] flex items-start gap-3">
                            <span className="text-xl">✨</span>
                            <p className="text-[#3b2d82] dark:text-indigo-300 font-medium text-[14px] leading-relaxed">Generating suggestion...</p>
                        </div>

                    )} */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {turnos.map((turno) => (
                            <AppointmentDetails key={turno.id} turno={turno} userId={userId} />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}