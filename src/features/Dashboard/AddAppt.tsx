import useDashboardActions from "@/hooks/useDashboardActions";
import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AlertCircle } from "lucide-react";
import { supabase } from "@/supabase/client.ts";
import type { State } from "@/lib/types.d.ts";

export default function AddAppointment() {
    const { user } = useLoaderData() as { user: any };
    const id = user.id;
    const { createAppointment, loading } = useDashboardActions();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [saved, setSaved] = useState<boolean>(false);
    const [formKey, setFormKey] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const lastname = formData.get("lastname") as string;
        const number = formData.get("number") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;
        const state: State = 'pending';

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
            setSaved(true);
        }
    }

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            setErrorMessage("Error trying to sign out. Please try again.");
            return;
        }
        navigate("/login");
    };

    const inputClass = "w-full px-4 py-3 bg-white border-[1.5px] border-border focus:border-(--teal) rounded-lg text-(--navy) text-sm outline-none font-body transition-colors duration-200";

    if (saved) {
        return (
            <div className="min-h-screen bg-[#F0EDE6] flex items-center justify-center font-body p-6">
                <div className="bg-white rounded-2xl border border-border p-10 text-center max-w-[420px] w-full">
                    <div className="w-14 h-14 rounded-full bg-[rgba(26,92,69,0.1)] flex items-center justify-center mx-auto mb-6 text-2xl text-(--teal)">
                        ✓
                    </div>
                    <h2 className="font-display text-2xl font-normal text-(--navy) mb-6">Appointment saved</h2>
                    <div className="flex gap-3 justify-center">
                        <Link
                            to="/dashboard"
                            className="bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] px-6 py-3 rounded-lg no-underline font-medium text-sm transition-colors duration-200"
                        >
                            Back to dashboard
                        </Link>
                        <button
                            onClick={() => { setSaved(false); setFormKey(prev => prev + 1); }}
                            className="bg-(--cream) hover:bg-[#E6E2D5] border border-border text-(--navy) px-6 py-3 rounded-lg font-medium text-sm cursor-pointer transition-colors duration-200"
                        >
                            Add another
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#F0EDE6] font-body grid grid-cols-[240px_1fr]">
            <div className="bg-(--navy) flex flex-col px-6 py-8 sticky top-0 h-screen">
                <Link to="/" className="font-display text-2xl text-[#F7F5F0] no-underline mb-10 block tracking-tight">
                    naao<span className="text-(--amber)">.</span>
                </Link>
                <nav className="flex-1">
                    <p className="text-[#F7F5F0]/30 text-[10px] uppercase tracking-widest font-medium mb-3">Main</p>
                    {[
                        { label: 'Dashboard', icon: '⊞', active: false, to: '/dashboard' },
                        { label: 'Add appointment', icon: '⊕', active: true, to: '/add-appointment' },
                    ].map(item => (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 no-underline text-[14px] transition-colors duration-200 ${item.active
                                ? 'bg-[#F7F5F0]/8 text-[#F7F5F0]'
                                : 'text-[#F7F5F0]/50 hover:bg-[#F7F5F0]/4 hover:text-[#F7F5F0]'
                                }`}
                        >
                            <span>{item.icon}</span>{item.label}
                        </Link>
                    ))}
                </nav>
                <div className="border-t border-[#F7F5F0]/10 pt-5">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8.5 h-8.5 rounded-full bg-(--teal) flex items-center justify-center text-[12px] text-[#F7F5F0] font-semibold shrink-0">
                            {user.user_metadata.name[0].toUpperCase()}{user.user_metadata.lastName[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[#F7F5F0] text-[13px] font-medium truncate">{user.user_metadata.full_name}</p>
                            <p className="text-[#F7F5F0]/40 text-[11px] truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-[#F7F5F0]/40 hover:text-[#F7F5F0] hover:bg-[#F7F5F0]/6 text-[13px] px-3 py-2 rounded-md transition-all duration-200 cursor-pointer w-full text-left"
                    >
                        <span>→</span> Sign out
                    </button>
                </div>
            </div>

            <div className="px-12 py-10 overflow-y-auto">
                <div className="mb-10">
                    <Link to="/dashboard" className="text-muted-foreground text-[13px] no-underline inline-flex items-center gap-1.5 mb-4 hover:text-(--navy) transition-colors">← Dashboard</Link>
                    <h1 className="font-display text-3xl text-(--navy) tracking-tight">New appointment</h1>
                    <p className="text-muted-foreground text-sm">Fill in client and appointment details below.</p>
                </div>

                <form key={formKey} onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-8 max-w-[900px]">
                        <div className="bg-white rounded-xl p-8 border border-border">
                            <h2 className="font-display text-[18px] text-(--navy) mb-6 pb-3.5 border-b border-border">Client information</h2>

                            <div className="flex flex-col gap-4.5">
                                <div>
                                    <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Name <span className="text-[#E05252]">*</span></label>
                                    <input type="text" name="name" placeholder="James Okafor" required className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Lastname</label>
                                    <input type="text" name="lastname" placeholder="E.g Gómez" className={inputClass} />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Phone number</label>
                                    <input type="tel" name="number" placeholder="+1 (555) 000-0000" className={inputClass} />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-8 border border-border">
                            <h2 className="font-display text-[18px] text-(--navy) mb-6 pb-3.5 border-b border-border">Appointment details</h2>

                            <div className="flex flex-col gap-4.5">
                                <div>
                                    <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Description <span className="text-[#E05252]">*</span></label>
                                    <input type="text" name="description" placeholder="E.g. Haircut, highlights, balayage..." required className={inputClass} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Date <span className="text-[#E05252]">*</span></label>
                                        <input type="date" name="date" required className={inputClass} />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Time <span className="text-[#E05252]">*</span></label>
                                        <input type="time" name="time" required className={inputClass} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="flex items-center gap-2 p-3.5 mb-1 mt-6 bg-[#FDF2F2] border border-[#FDE8E8] rounded-lg justify-center text-[#9B1C1C] font-medium text-[13px] font-body max-w-[900px]">
                            <AlertCircle className="w-4 h-4 text-[#9B1C1C]" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div className="mt-8 flex gap-4 max-w-[900px] items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] px-8 py-3.5 rounded-lg text-[15px] font-medium border-none cursor-pointer font-body transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Saving..." : "Save appointment"}
                        </button>
                        <Link
                            to="/dashboard"
                            className="bg-transparent border border-[#000000]/10 hover:border-border text-muted-foreground hover:text-(--navy) px-6 py-3.5 rounded-lg text-[15px] no-underline font-medium transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}