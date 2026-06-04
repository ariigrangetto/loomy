import { Calendar, Phone, UserIcon } from "lucide-react";
import type { Client } from "../../../lib/types.d.ts";

export default function ClientInfo({ client }: { client: Client }) {
    return (
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
    )
}