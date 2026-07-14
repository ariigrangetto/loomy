import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import type { History, Client } from "@/lib/types.d.ts";
import { ArrowLeft } from "lucide-react";
import ClientHistory from "@/features/Client/History.tsx";
import useClientActions from "@/hooks/useClientActions.tsx";

export default function Client() {
    const { getClientHistory, getClientData } = useClientActions();
    const { id } = useParams();
    const [history, setHistory] = useState<History[]>([]);
    const [client, setClient] = useState<Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const { data: clientData, error: clientError } = await getClientData(id);

                if (clientError) {
                    setErrorMessage(clientError);
                    return;
                }

                if (clientData) setClient(clientData);

                const { data: historyData, error: historyError } = await getClientHistory(id);
                if (historyError) {
                    setErrorMessage(historyError);
                    return;
                }

                if (historyData) setHistory(historyData);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) {
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

    if (!client) {
        return (
            <div className="min-h-screen bg-[#F0EDE6] flex flex-col items-center justify-center p-6 text-center font-body">
                <h2 className="font-display text-2xl text-(--navy) mb-4">Client not found</h2>
                <Link to="/dashboard" className="text-(--teal) hover:text-(--teal-light) font-medium text-sm flex items-center gap-2 no-underline">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="min-h-screen bg-[#F0EDE6] flex flex-col items-center justify-center p-6 text-center font-body">
                <h2 className="font-display text-2xl text-(--navy) mb-4">Error</h2>
                <p className="text-muted-foreground text-sm mb-6">{errorMessage}</p>
                <Link to="/dashboard" className="text-(--teal) hover:text-(--teal-light) font-medium text-sm flex items-center gap-2 no-underline">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F0EDE6] p-6 md:p-10 font-body relative">
            <div className="absolute top-6 right-6 z-10">
            </div>

            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-(--navy) text-[13px] no-underline transition-colors mb-8 font-medium">
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ClientHistory history={history} client={client} />
                </div>
            </div>
        </main >
    );
}