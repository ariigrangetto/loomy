import { supabase, getUserId } from "@/supabase/client.ts";
import type { Client, History, ServiceResult } from "../lib/types.d.ts";

export const clientService = {
    async createClient(name: string, lastname: string, number?: string): Promise<ServiceResult<Client>> {
        try {
            const { data, error } = await supabase.from("client").insert({
                name,
                lastname,
                number
            }).select();

            if (error) {
                return { success: false, error: error.message, message: null, data: null };
            };

            return { success: true, error: null, message: "Client created successfully.", data: data ? data[0] : null }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error creating client.";
            throw new Error(errorMessage);
        }
    },

    async findClient(name: string, lastname: string, number?: string): Promise<ServiceResult<Client[]>> {
        try {
            const { data, error } = await supabase.from("client").select("*")
                .eq("name", name)
                .eq("lastname", lastname)

            if (error) {
                return { success: false, error: error.message, message: null, data: null }
            };

            if (!data || data.length === 0) {
                const { error, data: newClient } = await this.createClient(name, lastname, number);

                if (error) {
                    return { success: false, error, message: null, data: null }
                }

                return { success: true, error: null, message: "Client created successfully.", data: newClient ? [newClient] : null }
            };

            const existingClient = data[0];

            if (number && (!existingClient.number || existingClient.number.trim() === "")) {
                const { data: updatedData, error: updateError } = await supabase
                    .from("client")
                    .update({ number })
                    .eq("id", existingClient.id)
                    .select();

                if (!updateError && updatedData && updatedData.length > 0) {
                    data[0] = updatedData[0];
                }
            };
            return { success: true, error: null, message: "Client found successfully.", data }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error finding client.";
            throw new Error(errorMessage);
        }
    },

    async getClientHistory(clientId: string | number): Promise<ServiceResult<History[]>> {
        try {
            const { userId } = await getUserId();
            const parsedClientId = !isNaN(Number(clientId)) ? Number(clientId) : clientId;

            const { data, error } = await supabase.from("history").select("*, client(*)")
                .eq("client_id", parsedClientId)
                .eq("user_id", userId)
                .order("last_date", { ascending: false });

            if (error) {
                return { success: false, error: error.message, data: null }
            }

            return { success: true, error: null, data };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error getting client history.";
            throw new Error(errorMessage);
        }
    },

    async updateClientHistory(userId: string, description: string, date: string, clientId: string | number): Promise<ServiceResult> {
        try {
            const parsedClientId = !isNaN(Number(clientId)) ? Number(clientId) : clientId;
            const { error } = await supabase.from("history").insert({
                user_id: userId,
                client_id: parsedClientId,
                description: description,
                last_date: date
            });
            if (error) {
                return { success: false, error: error.message, message: null }
            }
            return { success: true, error: null, message: "Client history updated successfully." };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error updating client history.";
            throw new Error(errorMessage);
        }
    },

    async getClientData(clientId: string | number): Promise<ServiceResult<Client>> {
        try {
            const parsedClientId = !isNaN(Number(clientId)) ? Number(clientId) : clientId;
            const { data, error } = await supabase.from("client").select("*").eq("id", parsedClientId).single();

            if (error) {
                return { success: false, error: error.message, data: null }
            }

            return { success: true, error: null, data };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error getting client details.";
            throw new Error(errorMessage);
        }
    },
};