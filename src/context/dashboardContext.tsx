import { createContext, useState } from "react";
import { supabase } from "../supabase/client.ts";
import type { Client, State } from "../types.d.ts";

interface DashboardContextType {
    findClient: (name: string, lastname: string) => Promise<Client[] | undefined>;
    loading: boolean;
    createTurno: (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State) => Promise<boolean>
}

export const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);

    const createTurno = async (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State): Promise<boolean> => {
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
    }

    const findClient = async (name: string, lastname: string) => {
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
    }


    const createClient = async (name: string, lastname: string): Promise<Client | null> => {
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
    }

    return (
        <DashboardContext.Provider value={{ createTurno, findClient, loading }}>
            {children}
        </DashboardContext.Provider>
    )
}