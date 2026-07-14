import { Calendar, Clock, FileText, Phone, UserIcon } from "lucide-react";
import type { Client, History } from "@/lib/types.d.ts";

export default function ClientHistory({ history, client }: { history: History[], client: Client }) {
    return (
        <>

            <div className="md:col-span-1">
                <div className="bg-white dark:bg-[#1f2028] rounded-[16px] p-6 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 transition-colors duration-200 md:sticky md:top-6">
                    <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100 dark:border-white/10">
                        <div className="w-20 h-20 bg-[#e2dfff] dark:bg-[#7460ed]/20 rounded-full flex items-center justify-center text-[#7460ed] dark:text-[#c084fc] mb-4 shadow-inner">
                            <UserIcon size={32} />
                        </div>
                        <h2 className="text-[22px] font-bold text-[#1a1a2e] dark:text-white capitalize leading-tight mb-1">
                            {client.name} {client.lastname}
                        </h2>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 uppercase tracking-widest font-bold mt-1">Client Profile</p>
                    </div>

                    <div className="pt-6 flex flex-col gap-5">
                        {client.number && (
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500 shrink-0">
                                    <Phone size={16} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Phone</span>
                                    <span className="font-semibold text-[#1a1a2e] dark:text-gray-200">{client.number}</span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-gray-500 shrink-0">
                                <Calendar size={16} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Joined</span>
                                <span className="font-semibold text-[#1a1a2e] dark:text-gray-200">{new Date(client.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:col-span-2">
                <div className="bg-white dark:bg-[#1f2028] rounded-[16px] p-6 sm:p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 transition-colors duration-200 min-h-full">
                    <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100 dark:border-white/5">
                        <div className="p-2.5 bg-[#7460ed]/10 dark:bg-[#c084fc]/10 rounded-xl text-[#7460ed] dark:text-[#c084fc]">
                            <Clock size={22} />
                        </div>
                        <div>
                            <h3 className="text-[20px] font-bold text-[#1a1a2e] dark:text-white">Appointment History</h3>
                            <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-0.5">Record of past completed assignments</p>
                        </div>
                    </div>

                    {!history || history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-[#1a1b23] rounded-2xl border border-dashed border-gray-200 dark:border-white/10">
                            <FileText size={48} className="mb-4 opacity-30" />
                            <p className="font-bold text-[16px] text-gray-500 dark:text-gray-400">No completed appointments yet.</p>
                            <p className="text-[13px] mt-1.5 max-w-[250px]">Any appointments marked as completed will be archived here.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {history.map((item, index) => (
                                <div key={item.id} className={`group relative pl-8 pb-8 ${index === history.length - 1 ? 'pb-0' : 'border-l-2 border-gray-100 dark:border-white/10'}`}>
                                    <div className="absolute left-[-5px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#7460ed] dark:bg-[#c084fc] shadow-[0_0_0_4px_white] dark:shadow-[0_0_0_4px_#1f2028] transition-transform group-hover:scale-125 z-10"></div>

                                    <div className="bg-[#f7f7f9] dark:bg-white/5 rounded-[14px] p-5 border border-transparent dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all duration-200 hover:shadow-sm">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                                            <h4 className="font-bold text-[#1a1a2e] dark:text-white text-[16px] capitalize">
                                                {item.description}
                                            </h4>
                                            <span className="self-start sm:self-auto shrink-0 text-[12px] font-bold text-[#7460ed] dark:text-[#c084fc] bg-[#7460ed]/10 dark:bg-[#c084fc]/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                                                <Calendar size={13} />
                                                {item.last_date}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-gray-500 dark:text-gray-400 bg-white dark:bg-[#1a1b23] p-3 rounded-lg border border-gray-100 dark:border-white/5 italic">
                                            Successfully attended and completed.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}