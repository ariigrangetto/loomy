import type { Turno } from "@/lib/types.d.ts";
import { CalendarIcon, Clock, FileText, Phone, User, X, AlertCircle } from "lucide-react";

interface EditFormProps {
    turno: Turno;
    setOpenEditForm: (open: boolean) => void;
    update: (turnoId: number, clientId: string | number, formData: FormData) => void;
    loading: boolean;
    errorMessage: string | null;
}

export default function EditForm({ turno, setOpenEditForm, update, loading, errorMessage }: EditFormProps) {
    const inputClass = "w-full px-4 py-3 bg-white border-[1.5px] border-border focus:border-(--teal) rounded-lg text-(--navy) text-sm outline-none font-body transition-colors duration-200";
    const inputWithIconClass = "w-full pl-10 pr-4 py-3 bg-white border-[1.5px] border-border focus:border-(--teal) rounded-lg text-(--navy) text-sm outline-none font-body transition-colors duration-200";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-[500px] shadow-[0_20px_60px_rgba(15,23,42,0.15)] border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-body">

                <div className="flex justify-between items-center p-6 border-b border-border bg-(--cream)/50">
                    <div>
                        <h3 className="font-display text-[18px] text-(--navy) font-semibold leading-none">Edit Appointment</h3>
                        <p className="text-[12px] text-muted-foreground mt-1.5">Modify the client and service details.</p>
                    </div>
                    <button
                        onClick={() => setOpenEditForm(false)}
                        className="p-2 text-muted-foreground hover:text-(--navy) hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                        type="button"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form action={(formData) => update(turno.id, turno.client.id, formData)} className="p-6 flex flex-col gap-5">

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[12px] font-semibold text-(--teal) uppercase tracking-wider flex items-center gap-1.5">
                            <User size={14} className="text-(--teal)" />
                            Client Data
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="block text-[12px] font-medium text-(--navy)" htmlFor="name">
                                    Name <span className="text-[#E05252]">*</span>
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    defaultValue={turno.client.name}
                                    className={inputClass}
                                    placeholder="James"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="block text-[12px] font-medium text-(--navy)" htmlFor="lastname">
                                    Lastname
                                </label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    defaultValue={turno.client.lastname}
                                    className={inputClass}
                                    placeholder="Okafor"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="block text-[12px] font-medium text-(--navy)" htmlFor="number">
                                Phone number
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                    <Phone size={14} />
                                </span>
                                <input
                                    id="number"
                                    name="number"
                                    type="tel"
                                    defaultValue={turno.client.number ? turno.client.number.toString() : ""}
                                    className={inputWithIconClass}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>
                    </div>

                    <hr className="border-border opacity-60" />

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[12px] font-semibold text-(--teal) uppercase tracking-wider flex items-center gap-1.5">
                            <CalendarIcon size={14} className="text-(--teal)" />
                            Appointment Details
                        </h4>

                        <div className="flex flex-col gap-1.5">
                            <label className="block text-[12px] font-medium text-(--navy)" htmlFor="description">
                                Service / Description <span className="text-[#E05252]">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                    <FileText size={14} />
                                </span>
                                <input
                                    id="description"
                                    name="description"
                                    type="text"
                                    defaultValue={turno.description}
                                    required
                                    className={inputWithIconClass}
                                    placeholder="E.g. Haircut, highlights..."
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="block text-[12px] font-medium text-(--navy)" htmlFor="date">
                                    Date <span className="text-[#E05252]">*</span>
                                </label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    defaultValue={turno.date.toString()}
                                    required
                                    className={inputClass}
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="block text-[12px] font-medium text-(--navy)" htmlFor="time">
                                    Time <span className="text-[#E05252]">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                        <Clock size={14} />
                                    </span>
                                    <input
                                        id="time"
                                        name="time"
                                        type="time"
                                        required
                                        defaultValue={turno.time}
                                        className={inputWithIconClass}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="flex items-center gap-2 p-3.5 bg-[#FDF2F2] border border-[#FDE8E8] rounded-lg justify-center text-[#9B1C1C] font-medium text-[13px]">
                            <AlertCircle className="w-4 h-4 text-[#9B1C1C]" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <div className="mt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setOpenEditForm(false)}
                            className="flex-1 py-3 px-4 bg-transparent border border-border hover:border-gray-300 hover:bg-gray-50 text-muted-foreground hover:text-(--navy) text-[14px] font-medium rounded-lg transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 px-4 bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] text-[14px] font-medium rounded-lg shadow-sm border-none transition-colors flex justify-center items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span>Saving...</span>
                            ) : (
                                <span>Save changes</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}