import { useLoaderData } from "react-router";
import { useState } from "react";
import { type Filter, type State, type Turno } from "@/lib/types.d";
import { Link, useNavigate } from "react-router";
import { supabase } from "@/supabase/client.ts";
import useDashboardActions from "@/hooks/useDashboardActions";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import EditForm from "@/features/Dashboard/EditForm";
import useAISuggestion from "@/hooks/useAIsuggestion.tsx";

export default function Dashboard() {
    const { user } = useLoaderData();
    const userId = user?.id;
    const { turnos, loading, deleteAppointment, updateAppoitmentState, updateAppoitment } = useDashboardActions();
    const [filter, setFilter] = useState<Filter>("All");
    const [search, setSearch] = useState<string>("");
    const [error, setErrorMessage] = useState<string>("");
    const [editingTurno, setEditingTurno] = useState<Turno | null>(null);
    const [openEditForm, setOpenEditForm] = useState<boolean>(false);
    const navigate = useNavigate();
    const { IAMessage } = useAISuggestion({ turnos });

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    async function handleUpdateState(turnoId: number, state: State, userId: string, description: string, date: string, clientId: string | number) {
        const { error } = await updateAppoitmentState(turnoId, state, userId, description, date, clientId);
        if (error) {
            setErrorMessage("Error trying to update appointment. Please try again.");
            return;
        }
    };

    const classMap: Record<string, string> = {
        pending: "text-(--amber) bg-[#D4973A]/10 border border-[#D4973A]/25",
        completed: "text-(--teal) bg-[#1A5C45]/10 border border-[#1A5C45]/25",
    };

    const handleDelete = async (id: number) => {
        const { error } = await deleteAppointment(id);
        if (error) {
            setErrorMessage("Error trying to delete appointment. Please try again.");
            return;
        }
    };

    const handleUpdate = async (turnoId: number, clientId: string | number, formData: FormData) => {
        const name = formData.get("name") as string;
        const lastname = formData.get("lastname") as string;
        const number = formData.get("number") as string;
        const description = formData.get("description") as string;
        const date = formData.get("date") as string;
        const time = formData.get("time") as string;

        const currentTurno = turnos.find(t => t.id === turnoId);
        if (!currentTurno) return;

        const clientChange = name !== currentTurno.client.name || lastname !== currentTurno.client.lastname || number !== currentTurno.client.number?.toString();
        const appointmentChange = description !== currentTurno.description || date !== currentTurno.date || time !== currentTurno.time;

        const { error } = await updateAppoitment(turnoId, clientId, name, lastname, number, description, date, time, clientChange, appointmentChange);
        if (error) {
            setErrorMessage(error);
        } else {
            setOpenEditForm(false);
            setEditingTurno(null);
        }
    };

    const filtered = turnos?.filter((turno) => {
        const matchState = filter === "All" ? turno : turno.state === filter;
        const matchSearch = search === "" || turno.client.name.toLowerCase().includes(search.toLowerCase()) || turno.client.lastname.toLowerCase().includes(search.toLowerCase());
        return matchState && matchSearch;
    });

    const expired = turnos?.filter((turno) => turno.date < todayStr) || [];
    const expiredLength = expired.length || 0;

    const stats = {
        total: turnos.length,
        pending: turnos.filter((t) => t.state === "pending").length,
        completed: turnos.filter((t) => t.state === "completed").length,
        expired: expiredLength,
    }

    if (loading && turnos.length === 0) {
        return (
            <div className="min-h-screen bg-[#F0EDE6] flex flex-col items-center justify-center font-body">
                <div className="flex flex-col items-center gap-5">
                    <div className="font-display text-4xl text-(--navy) tracking-tight animate-pulse select-none">
                        naao<span className="text-(--amber)">.</span>
                    </div>
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 rounded-full border-[3px] border-(--navy)/8"></div>
                        <div className="absolute inset-0 rounded-full border-[3px] border-t-(--teal) border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    </div>
                </div>
            </div>
        );
    }

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            setErrorMessage("Error trying to sign out. Please try again.");
            return;
        }
        navigate("/login");
    };

    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const dayOfWeek = daysOfWeek[today.getDay()];
    const monthStr = months[month];

    const dateStr = `${dayOfWeek}, ${monthStr} ${day}, ${year}`;

    return (
        <>
            <div className="min-h-screen bg-[#F0EDE6] font-body flex flex-col">
                <div className="grid grid-cols-[240px_1fr] min-h-screen">
                    <div className="bg-(--navy) flex flex-col px-6 py-8 sticky top-0 h-screen overflow-y-auto">
                        <Link to="/" className="font-display text-2xl text-[#F7F5F0] no-underline mb-10 block tracking-tight">
                            naao<span className="text-(--amber)">.</span>
                        </Link>

                        <nav className="flex-1">
                            <p className="text-[#F7F5F0]/30 text-[10px] uppercase tracking-widest font-medium mb-3">Main</p>
                            {[
                                { label: 'Dashboard', icon: '⊞', active: true, to: '/dashboard' },
                                { label: 'Add appointment', icon: '⊕', active: false, to: '/add-appointment' },
                            ].map(item => (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 no-underline text-[14px] transition-colors duration-200 ${item.active
                                        ? 'bg-[#F7F5F0]/8 text-[#F7F5F0]'
                                        : 'text-[#F7F5F0]/50 hover:bg-[#F7F5F0]/4 hover:text-[#F7F5F0]'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    {item.label}
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
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                    </div>

                    <div className="px-12 py-10 overflow-y-auto">
                        <div className="flex items-start justify-between mb-10">
                            <div>
                                <h1 className="font-display text-3xl text-(--navy) mb-1 tracking-tight">Appointments</h1>
                                <p className="text-muted-foreground text-sm">{dateStr}</p>
                            </div>
                            <Link
                                to="/add-appointment"
                                className="inline-flex items-center gap-2 bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] px-6 py-3 rounded-lg no-underline text-sm font-medium transition-colors duration-200"
                            >
                                <span className="text-[17px] leading-none">+</span>
                                New appointment
                            </Link>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mb-8">
                            {[
                                { label: 'Total', value: stats.total, colorClass: 'text-(--navy)' },
                                { label: 'Pending', value: stats.pending, colorClass: 'text-(--amber)' },
                                { label: 'Completed', value: stats.completed, colorClass: 'text-(--teal)' },
                                { label: 'Expired', value: stats.expired, colorClass: 'text-gray-500' },
                            ].map(s => (
                                <div key={s.label} className="bg-white rounded-xl p-5 border border-border">
                                    <p className={`font-display text-3xl font-light ${s.colorClass} tracking-tighter leading-none`}>{s.value}</p>
                                    <p className="text-muted-foreground text-[12px] uppercase tracking-wider mt-1.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-(--navy) rounded-xl px-6 py-5 mb-7 flex items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-[rgba(26,92,69,0.35)] flex items-center justify-center shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                </div>
                                <div>
                                    <p className="text-[#F7F5F0]/45 text-[11px] uppercase tracking-wider font-medium mb-0.5">AI suggestion</p>
                                    <p className="text-[#F7F5F0] text-[14.5px]">
                                        Next optimal slot: <strong>{IAMessage ? IAMessage : "Loading..."}</strong>
                                        <span className="text-[#F7F5F0]/45 ml-2 font-normal">— based on your scheduling patterns and client availability</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {expiredLength > 0 && (
                            <div className="bg-gray-500/6 rounded-xl px-6 py-4 mb-7 border border-gray-500/15">
                                <div className="flex items-center gap-2 mb-2.5">
                                    <span className="text-sm">⚠</span>
                                    <p className="text-gray-500 text-[13px] font-medium">
                                        {expiredLength} past appointment{expiredLength > 1 ? 's' : ''} pending deletion
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {expired.map(a => (
                                        <div
                                            key={a.id}
                                            className={`flex items-center gap-2 bg-gray-500/8 rounded-md px-3 py-1 text-[13px] text-gray-500 transition-all duration-300`}
                                        >
                                            <span>{a.client.name + " " + a.client.lastname} · {a.date}</span>
                                            <button
                                                onClick={() => handleDelete(a.id)}
                                                className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-red-500 text-sm leading-none px-0.5"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between mb-4 gap-4">
                            <div className="flex gap-1.5 bg-white rounded-lg p-1 border border-border">
                                {(['All', 'pending', 'completed', 'cancelled'] as const).map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        className={`px-3.5 py-1.5 rounded-md border-none cursor-pointer font-body text-[13px] transition-all duration-200 capitalize ${filter === f
                                            ? 'bg-(--navy) text-[#F7F5F0] font-medium'
                                            : 'bg-transparent text-muted-foreground hover:text-(--navy)'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search client"
                                className="px-4 py-2 rounded-lg border-[1.5px] border-border bg-white text-(--navy) text-sm outline-none font-body min-w-[240px] focus:border-(--teal) transition-colors duration-200"
                            />
                        </div>

                        <div className="bg-white rounded-xl border border-border overflow-hidden">
                            <table className="w-full border-collapse font-body">
                                <thead>
                                    <tr className="border-b border-border bg-(--cream)">
                                        {['Description', 'Client', 'Time', 'Date', 'Status', ''].map((h, i) => (
                                            <th
                                                key={i}
                                                className="px-5 py-3.5 text-left text-[11px] font-semibold text-muted-foreground uppercase tracking-widest whitespace-nowrap"
                                            >
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length === 0 ? (
                                        <tr><td colSpan={6} className="p-12 text-center text-muted-foreground text-sm">No appointments found.</td></tr>
                                    ) : filtered.map((appt, i) => (
                                        <tr
                                            key={appt.id}
                                            className={`hover:bg-(--cream)/50 transition-all duration-300 ${i < filtered.length - 1 ? 'border-b border-border' : ''
                                                }`}
                                        >
                                            <td className="px-5 py-4 text-sm text-(--navy) font-medium">{appt.description}</td>
                                            <td className="px-5 py-4">
                                                <Link
                                                    to={`/client/${appt.client.id}`}
                                                    className="bg-transparent border-none cursor-pointer text-(--teal) font-body text-sm font-medium p-0 underline decoration-[rgba(26,92,69,0.3)] underline-offset-2 hover:text-(--teal-light)"
                                                >
                                                    {appt.client.name} {appt.client.lastname}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-4 font-mono text-[13px] text-muted-foreground">{appt.time}</td>
                                            <td className="px-5 py-4 font-mono text-[13px] text-muted-foreground">
                                                <span>{appt.date}</span>
                                                {appt.date < todayStr && (
                                                    <span className="block text-[10px] text-gray-400 mt-0.5">Expired — action needed</span>
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <select
                                                    value={appt.state}
                                                    onChange={(e) => handleUpdateState(appt.id, e.target.value as State, userId, appt.description, appt.date, appt.client.id)}
                                                    className={`font-mono text-[11px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap ${classMap[appt.state]}`}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingTurno(appt);
                                                            setOpenEditForm(true);
                                                        }}
                                                        className="p-2 text-muted-foreground hover:text-(--teal) hover:bg-(--teal)/10 border border-transparent rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center"
                                                        title="Edit Appointment"
                                                    >
                                                        <Edit2Icon size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(appt.id)}
                                                        className="p-2 text-muted-foreground hover:text-[#E05252] hover:bg-[#E05252]/10 border border-transparent rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center"
                                                        title="Delete Appointment"
                                                    >
                                                        <Trash2Icon size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="text-muted-foreground text-[12px] mt-3.5 font-mono">
                            {filtered.length} of {turnos.length} appointments
                        </p>
                    </div>
                </div>
            </div>
            {openEditForm && editingTurno && (
                <EditForm
                    turno={editingTurno}
                    setOpenEditForm={setOpenEditForm}
                    update={handleUpdate}
                    loading={loading}
                    errorMessage={error}
                />
            )}
        </>
    );
}