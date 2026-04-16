import { createContext, useCallback, useMemo, useState } from "react";
import { supabase } from "../supabase/client.ts";
import type { Client, State, Turno } from "../types.d.ts";

interface DashboardContextType {
    findClient: (name: string, lastname: string) => Promise<Client[] | undefined>;
    loading: boolean;
    createTurno: (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State) => Promise<boolean>
    getTurnos: (id: string) => Promise<Turno[] | undefined>
    updateTurnoState: (turnoId: number, state: State, userId: string, description: string, date: string) => Promise<boolean>
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [clientId, setClientId] = useState<string | number | null>(null);

    const createClient = useCallback(async (name: string, lastname: string): Promise<Client | null> => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }, []);

    const findClient = useCallback(async (name: string, lastname: string) => {
        setLoading(true);
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
        } finally {
            setLoading(false);
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
            setClientId(clientId);
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


    const getTurnos = useCallback(async (id: string) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from("turnos").select("*, client (*)").eq("user_id", id).order("date", { ascending: true }).order("time", { ascending: true });
            if (error) {
                console.error("Error getting turnos", error.message);
                throw new Error(error.message);
            }
            return data as Turno[];
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error getting turnos: ${error.message}`);
            }
            throw new Error("Unexpected error");
        } finally {
            setLoading(false);
        }
    }, []);

    const updateTurnoState = useCallback(async (turnoId: number, state: State, userId: string, description: string, date: string): Promise<boolean> => {
        setLoading(true);
        try {
            if (state === "completed") {
                await updateClientHistory(userId, description, date);
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
        } finally {
            setLoading(false);
        }
    }, []);

    const updateClientHistory = async (userId: string, description: string, date: string) => {
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
    }

    const value = useMemo(() => ({
        createTurno,
        findClient,
        loading,
        getTurnos,
        updateTurnoState
    }), [createTurno, findClient, loading, getTurnos, updateTurnoState]);

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}