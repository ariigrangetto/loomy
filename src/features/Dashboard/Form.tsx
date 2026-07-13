import { CalendarIcon, Clock, FileText, Phone, User, X } from "lucide-react";
import { useState } from "react";
import useDashboardActions from "@/hooks/useDashboardActions.tsx";

export default function Form({ id, setIsFormOpen }: { id: string; setIsFormOpen: (value: boolean) => void }) {
    const { createAppointment, loading } = useDashboardActions();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSubmit = async (formData: FormData) => {
        const name = formData.get("name") as string;
        const lastname = formData.get("lastname") as string;
        const number = formData.get("number") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const state = 'pending';

        if (!date || !time) {
            setErrorMessage("Please select a date and time.");
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
            return;
        }

        const { error } = await createAppointment(id, name, lastname, description, date, time, state, number);

        if (error) {
            setErrorMessage(error);
            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        } else {
            setIsFormOpen(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-[#1f2028] dark:border-white/10 rounded-[20px] w-full max-w-[500px] shadow-[0_20px_60px_rgb(0,0,0,0.1)] border border-white/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                    <div>
                        <h3 className="text-[18px] font-bold text-[#1a1a2e] dark:text-white">New Appointment</h3>
                        <p className="text-[12px] text-gray-500 dark:text-gray-400 mt-1">Complete the client and service data.</p>
                    </div>
                    <button
                        onClick={() => setIsFormOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form action={handleSubmit} className="p-6 flex flex-col gap-5">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[11px] font-bold text-[#7460ed] dark:text-[#c084fc] uppercase tracking-widest flex items-center gap-1.5 mt-2">
                            <User size={12} />
                            Client Data
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-[#4a4a5e] dark:text-gray-300" htmlFor="name">name</label>
                                <input
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent rounded-[10px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 dark:focus:ring-[#c084fc]/30 focus:bg-white dark:focus:bg-[#16171d] focus:border-[#6b58dc]/30 dark:focus:border-[#c084fc]/30 transition-all"
                                    placeholder="E.g. María"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-[#4a4a5e] dark:text-gray-300" htmlFor="lastname">lastname</label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    required
                                    className="w-full px-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent rounded-[10px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 dark:focus:ring-[#c084fc]/30 focus:bg-white dark:focus:bg-[#16171d] focus:border-[#6b58dc]/30 dark:focus:border-[#c084fc]/30 transition-all"
                                    placeholder="E.g. Gómez"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-[#4a4a5e] dark:text-gray-300 flex items-center gap-1.5" htmlFor="number">
                                Phone <span className="text-gray-400 dark:text-gray-500 font-normal">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                    <Phone size={14} />
                                </span>
                                <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    className="w-full pl-9 pr-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent rounded-[10px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 dark:focus:ring-[#c084fc]/30 focus:bg-white dark:focus:bg-[#16171d] focus:border-[#6b58dc]/30 dark:focus:border-[#c084fc]/30 transition-all"
                                    placeholder="Number of contact"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100 dark:border-white/5" />

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[11px] font-bold text-[#7460ed] dark:text-[#c084fc] uppercase tracking-widest flex items-center gap-1.5">
                            <CalendarIcon size={12} />
                            Appointment Details
                        </h4>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-semibold text-[#4a4a5e] dark:text-gray-300" htmlFor="description">Service / Description</label>
                            <div className="relative">
                                <span className="absolute left-3 top-[14px] text-gray-400 dark:text-gray-500">
                                    <FileText size={14} />
                                </span>
                                <input
                                    id="description"
                                    name="description"
                                    required
                                    className="w-full pl-9 pr-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent rounded-[10px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 dark:focus:ring-[#c084fc]/30 focus:bg-white dark:focus:bg-[#16171d] focus:border-[#6b58dc]/30 dark:focus:border-[#c084fc]/30 transition-all resize-none"
                                    placeholder="e.g. Haircut, highlights, balayage..."
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-[#4a4a5e] dark:text-gray-300" htmlFor="date">date</label>
                                <div className="relative">
                                    <input
                                        id="date"
                                        name="date"
                                        type="date"
                                        required
                                        className="w-full px-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent rounded-[10px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 dark:focus:ring-[#c084fc]/30 focus:bg-white dark:focus:bg-[#16171d] focus:border-[#6b58dc]/30 dark:focus:border-[#c084fc]/30 transition-all [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-50 dark:[&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[11px] font-semibold text-[#4a4a5e] dark:text-gray-300" htmlFor="time">time</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none">
                                        <Clock size={14} />
                                    </span>
                                    <input
                                        id="time"
                                        name="time"
                                        type="time"
                                        required
                                        className="w-full pl-9 pr-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent rounded-[10px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 dark:focus:ring-[#c084fc]/30 focus:bg-white dark:focus:bg-[#16171d] focus:border-[#6b58dc]/30 dark:focus:border-[#c084fc]/30 transition-all [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:opacity-50 dark:[&::-webkit-calendar-picker-indicator]:invert"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        {loading ? (
                            <button
                                type="submit"
                                className="flex-1 py-3 px-4 bg-[#7460ed] hover:bg-[#6250cc] text-white text-[14px] font-semibold rounded-[10px] shadow-sm hover:shadow-md transform transition-all active:scale-[0.98] outline-none focus:ring-2 focus:ring-[#7460ed]/50 focus:ring-offset-2 flex justify-center items-center gap-2 delay-100"
                            >
                                <span>Saving appointment...</span>
                            </button>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setIsFormOpen(false)}
                                    className="flex-1 py-3 px-4 bg-white dark:bg-[#16171d] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 text-[14px] font-semibold rounded-[10px] transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3 px-4 bg-[#7460ed] hover:bg-[#6250cc] text-white text-[14px] font-semibold rounded-[10px] shadow-sm hover:shadow-md transform transition-all active:scale-[0.98] outline-none focus:ring-2 focus:ring-[#7460ed]/50 focus:ring-offset-2 flex justify-center items-center gap-2"
                                >
                                    <span>Save Appointment</span>
                                </button>
                            </>
                        )}
                    </div>
                    <div>
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}