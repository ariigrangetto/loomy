import { Info, History, Palette, Mail, CheckCircle2, CalendarDays } from "lucide-react";
import ButtonTheme from "../../../components/Event/toggleTheme.tsx";

export default function About() {

    return (
        <div className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] p-6 md:p-12 transition-colors duration-200">
            <div className="absolute top-6 right-6 z-10">
                <ButtonTheme />
            </div>
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

                <div className="bg-white dark:bg-[#1f2028] rounded-[24px] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 text-center">
                    <div className="bg-[#e2dfff] dark:bg-[#7460ed]/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Info size={40} className="text-[#7460ed] dark:text-[#c084fc]" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] dark:text-white mb-4">
                        About the App
                    </h1>
                    <p className="text-[16px] md:text-[18px] text-gray-500 dark:text-gray-400 mx-auto leading-relaxed">
                        Your all-in-one professional appointment and client management tool.
                        Designed to keep your schedule organized and your client records perfectly detailed.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-[#1f2028] rounded-[20px] p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 hover:border-[#7460ed]/30 dark:hover:border-[#c084fc]/30 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-[#e2dfff] dark:bg-[#7460ed]/20 p-3 rounded-[12px]">
                                <CalendarDays size={24} className="text-[#7460ed] dark:text-[#c084fc]" />
                            </div>
                            <h2 className="text-xl font-bold text-[#1a1a2e] dark:text-white">How to Use</h2>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            Start by creating clients and scheduling appointments. You can easily manage the status of each appointment from your dashboard. Keep track of upcoming, pending, or cancelled sessions effortlessly.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#1f2028] rounded-[20px] p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 hover:border-[#7460ed]/30 dark:hover:border-[#c084fc]/30 transition-all hover:shadow-md">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-green-100 dark:bg-green-500/20 p-3 rounded-[12px]">
                                <History size={24} className="text-green-600 dark:text-green-400" />
                            </div>
                            <h2 className="text-xl font-bold text-[#1a1a2e] dark:text-white">Client History</h2>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            <strong className="text-[#1a1a2e] dark:text-gray-200">Important:</strong> A client's history is only saved if the appointment is marked as <span className="inline-flex items-center gap-1 font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-md"><CheckCircle2 size={14} /> Completed</span>. You can view their full history by clicking directly on their name.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#1f2028] rounded-[20px] p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 hover:border-[#7460ed]/30 dark:hover:border-[#c084fc]/30 transition-all hover:shadow-md md:col-span-2">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-[#fff4e6] dark:bg-orange-500/20 p-3 rounded-[12px]">
                                <Palette size={24} className="text-orange-600 dark:text-orange-400" />
                            </div>
                            <h2 className="text-xl font-bold text-[#1a1a2e] dark:text-white">Detailed Descriptions</h2>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed max-w-3xl">
                            When creating or updating an appointment, take advantage of the description field. You can include specific details about the service provided, such as <strong className="text-[#1a1a2e] dark:text-gray-200">hair colors used, specific formulas, techniques, or any other procedure details</strong>. This keeps an organized and reliable record for future reference!
                        </p>
                    </div>
                </div>

                <div className="bg-linear-to-br from-[#7460ed] to-[#9b8bfc] rounded-[24px] p-8 md:p-12 text-center text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                        <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                            <Mail size={32} className="text-white" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help or Have Doubts?</h2>
                        <p className="text-white/80 items-center justify-center mx-auto mb-8 text-center text-[16px]">
                            If you encounter any errors, have questions about a feature, or need assistance, please don't hesitate to reach out to me.
                        </p>
                        <a
                            href="mailto:ariigrangetto5@gmail.com"
                            className="inline-flex items-center gap-2 bg-white text-[#7460ed] px-8 py-3 mt-5 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-sm"
                        >
                            <Mail size={18} />
                            Contact Me
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}