import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabase/client.ts";
import type { Client, State, Turno } from "../types.d.ts";

interface DashboardContextType {
    findClient: (name: string, lastname: string) => Promise<Client[] | undefined>;
    loading: boolean;
    createTurno: (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State) => Promise<boolean>
    getTurnos: () => Promise<void>
    updateTurnoState: (turnoId: number, state: State, userId: string, description: string, date: string) => Promise<boolean>
    turnos: Turno[] | undefined;
    deleteFromDashboard: (turnoId: number) => Promise<boolean>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export default function DashboardProvider({ children, id }: { children: React.ReactNode, id: string }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [clientId, setClientId] = useState<string | number | null>(null);
    const [turnos, setTurnos] = useState<Turno[] | undefined>(undefined);

    const getTurnos = useCallback(async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from("turnos").select("*, client (*)").eq("user_id", id).order("date", { ascending: true }).order("time", { ascending: true });
            if (error) {
                console.error("Error getting turnos", error.message);
                throw new Error(error.message);
            }
            console.log(data);
            setTurnos(data);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error getting turnos: ${error.message}`);
            }
            throw new Error("Unexpected error");
        } finally {
            setLoading(false);
        }
    }, [id]);


    useEffect(() => {
        // Obtenemos los turnos inicialmente cuando el componente carga
        getTurnos();

        const turnoChnnael = supabase.channel("dashboard-channel")
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "turnos" // Limitamos a la tabla de turnos
            }, (payload) => {
                console.log("Cambio detectado:", payload);
                getTurnos();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(turnoChnnael);
        };
    }, [getTurnos]);

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

    const deleteFromDashboard = useCallback(async (turnoId: number) => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }, []);

    const value = useMemo(() => ({
        createTurno,
        findClient,
        loading,
        getTurnos,
        updateTurnoState,
        turnos,
        deleteFromDashboard
    }), [createTurno, findClient, loading, getTurnos, turnos, updateTurnoState, deleteFromDashboard]);

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    )
}