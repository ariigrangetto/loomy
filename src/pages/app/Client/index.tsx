import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import type { History, Client as ClientType } from "../../../lib/types.d.ts";
import { ArrowLeft } from "lucide-react";
import ButtonTheme from "../../../components/Event/toggleTheme.tsx";
import ClientInfo from "../../../components/App/Client/ClientInfo.tsx";
import ClientHistory from "../../../components/App/Client/ClientHistory.tsx";
import useDashboardActions from "../../../hooks/useDashboardActions.tsx";

export default function Client() {
    const { getClientHistory, getClientData } = useDashboardActions();
    const { id } = useParams();
    const [history, setHistory] = useState<History[]>([]);
    const [client, setClient] = useState<ClientType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const clientData = await getClientData(id);
                if (clientData) setClient(clientData);

                const historyData = await getClientHistory(id);
                if (historyData) setHistory(historyData as History[]);
            } catch (error) {
                throw new Error("Error fetching client data and client histor:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [getClientHistory, getClientData, id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] flex items-center justify-center transition-colors duration-200">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#7460ed]"></div>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] flex flex-col items-center justify-center p-6 text-center transition-colors duration-200">
                <h2 className="text-[22px] font-bold text-[#1a1a2e] dark:text-white mb-4">Client not found</h2>
                <Link to="/" className="text-[#6b58dc] hover:text-[#5a46c8] dark:text-[#8271eb] font-semibold flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] p-6 md:p-10 font-sans transition-colors duration-200 relative">
            <div className="absolute top-6 right-6 z-10">
                <ButtonTheme />
            </div>

            <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Link to="/" className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-[#1a1a2e] dark:hover:text-white transition-colors mb-8 font-medium">
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ClientInfo client={client} />
                    <ClientHistory history={history} />
                </div>
            </div>
        </main >
    );
}