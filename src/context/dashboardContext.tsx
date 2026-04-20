import { createContext, useCallback, useEffect, useMemo } from "react";
import { supabase } from "../supabase/client.ts";
import type { Client, State, History } from "../types";
import useStateContext from "../hooks/useStateContext.tsx";

interface DashboardContextType {
    findClient: (name: string, lastname: string) => Promise<Client[] | undefined>;
    createTurno: (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State) => Promise<boolean>
    getTurnos: () => Promise<void>
    updateTurnoState: (turnoId: number, state: State, userId: string, description: string, date: string, clientId: string | number) => Promise<boolean | void>
    deleteFromDashboard: (turnoId: number) => Promise<boolean>;
    getClientHistory: (clientId: string | number) => Promise<History[] | undefined>;
    getClientById: (clientId: string | number) => Promise<Client | undefined>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    const { setTurnos, setLoading } = useStateContext();

    const getUserId = useCallback(async () => {
        try {
            const { data: userData, error: userError } = await supabase.auth.getUser();
            if (userError || !userData.user) {
                throw new Error("No user authenticated");
            }
            const userId = userData.user.id;
            return userId;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error getting user id: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }, [])

    const getTurnos = useCallback(async () => {
        setLoading(true);
        try {
            const userId = await getUserId();
            const { data, error } = await supabase.from("turnos").select("*, client (*)").eq("user_id", userId).order("date", { ascending: true }).order("time", { ascending: true });
            if (error) {
                console.error("Error getting turnos", error.message);
                throw new Error(error.message);
            }
            setTurnos(data);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error getting turnos: ${error.message}`);
            }
            throw new Error("Unexpected error");
        } finally {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        getTurnos();
        const turnoChnnael = supabase.channel("dashboard-channel")
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "turnos"
            }, () => {
                getTurnos();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(turnoChnnael);
        };
    }, [getTurnos]);

    const createClient = useCallback(async (name: string, lastname: string): Promise<Client | null> => {
        try {
            const { data, error } = await supabase.from("client").insert({
                name,
                lastname
            }).select();
            if (error) {
                console.error("Error creating client", error.message);
                throw new Error(error.message);
            }
            return data ? (data[0] as Client) : null;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error creating client: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }, []);

    const findClient = useCallback(async (name: string, lastname: string) => {
        try {
            const { data, error } = await supabase.from("client").select("*")
                .eq("name", name)
                .eq("lastname", lastname);
            if (error) {
                console.error("Error finding client", error.message);
                throw new Error(error.message);
            }
            if (!data || data.length === 0) {
                const newClient = await createClient(name, lastname);
                return newClient ? [newClient] : [];
            }
            return (data as Client[]);

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error finding client: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }, [createClient]);

    const createTurno = useCallback(async (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State): Promise<boolean> => {
        setLoading(true);
        try {
            const data = await findClient(name, lastname);
            if (!data || data.length === 0) {
                return false;
            }
            const clientId = data[0].id;
            const { data: existingTurno, error: existingError } = await supabase.from("turnos").select("*")
                .eq("date", date)
                .eq("time", time);
            if (existingError) {
                console.error("Error creating turno", existingError.message);
                throw new Error(existingError.message);
            }
            if (existingTurno && existingTurno.length > 0) {
                return false;
            }
            const { error } = await supabase.from("turnos").insert({
                cliente: clientId,
                description: description,
                date: date,
                time: time,
                user_id: id,
                state: state
            })
            if (error) {
                console.error("Error creating appointment", error.message);
                throw new Error(error.message);
            }
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error creating appointment: ${error.message}`);
            }
            throw new Error("Unexpected error");
        } finally {
            setLoading(false);
        }
    }, [findClient]);

    const updateTurnoState = useCallback(async (turnoId: number, state: State, userId: string, description: string, date: string, clientId: string | number): Promise<boolean | void> => {
        try {
            if (state === "completed") {
                await updateClientHistory(userId, description, date, clientId);
            }

            if (state === "cancelled") {
                const { error: deleteError } = await supabase.from("turnos").delete().eq("id", turnoId);
                if (deleteError) {
                    console.error("Error deleting turno", deleteError.message);
                    throw new Error(deleteError.message);
                }
                return;
            }

            const { error } = await supabase.from("turnos").update({ state }).eq("id", turnoId);
            if (error) {
                console.error("Error updating turno state", error.message);
                throw new Error(error.message);
            }
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error updating turno: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }, []);

    const updateClientHistory = useCallback(async (userId: string, description: string, date: string, clientId: string | number) => {
        try {
            const { data, error } = await supabase.from("history").insert({
                client_id: clientId,
                user_id: userId,
                description: description,
                last_date: date
            })

            if (error) {
                console.error("Error updating client history", error.message);
                throw new Error(error.message);
            }
            return data;

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error updating client history: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }, []);

    const deleteFromDashboard = useCallback(async (turnoId: number) => {
        try {
            const { error } = await supabase.from("turnos").delete().eq("id", turnoId);
            if (error) {
                console.error("Error deleting turno", error.message);
                throw new Error(error.message);
            }
            return true;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error deleting turno: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }, []);

    const getClientHistory = useCallback(async (clientId: string | number) => {
        try {
            const userId = await getUserId();
            const parsedClientId = !isNaN(Number(clientId)) ? Number(clientId) : clientId;
            const { data, error } = await supabase.from("history").select("*, client(*)")
                .eq("client_id", parsedClientId)
                .eq("user_id", userId)
                .order("last_date", { ascending: false });
            if (error) {
                console.error("Error getting user history", error.message);
                throw new Error(error.message);
            }
            return data;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error getting user history: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }, [getUserId]);

    const getClientById = useCallback(async (clientId: string | number): Promise<Client | undefined> => {
        try {
            const parsedClientId = !isNaN(Number(clientId)) ? Number(clientId) : clientId;
            const { data, error } = await supabase.from("client").select("*").eq("id", parsedClientId).single();
            if (error) {
                console.error("Error getting client", error.message);
                throw new Error(error.message);
            }
            return data as Client;
        } catch (error) {
            console.error("Error getting client details:", error);
            return undefined;
        }
    }, []);

    const value = useMemo(() => ({
        createTurno,
        findClient,
        getTurnos,
        updateTurnoState,
        getClientHistory,
        getClientById,
        deleteFromDashboard
    }), [createTurno, findClient, getClientHistory, getClientById, getTurnos, updateTurnoState, deleteFromDashboard]);

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}