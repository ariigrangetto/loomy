import type { Client, History, ServiceResult, State, Turno } from "../lib/types.d.ts";
import { getUserId, supabase } from "../supabase/client.ts";

export const clientService = {
    async createClient(name: string, lastname: string): Promise<ServiceResult<Client>> {
        try {
            const { data, error } = await supabase.from("client").insert({
                name,
                lastname
            }).select();

            if (error) {
                return { success: false, error: error.message, message: null, data: null };
            };

            return { success: true, error: null, message: "Client created successfully.", data: data ? data[0] : null }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error creating client.";
            return { success: false, error: errorMessage, message: null, data: null };
        }
    },

    async findClient(name: string, lastname: string): Promise<ServiceResult<Client[]>> {
        try {
            const { data, error } = await supabase.from("client").select("*")
                .eq("name", name)
                .eq("lastname", lastname);

            if (error) {
                return { success: false, error: error.message, message: null, data: null }
            };

            if (!data || data.length === 0) {
                const { error, data: newClient } = await this.createClient(name, lastname);

                if (error) {
                    return { success: false, error, message: null, data: null }
                }

                return { success: true, error: null, message: "Client created successfully.", data: newClient ? [newClient] : null }
            };

            return { success: true, error: null, message: "Client found successfully.", data: data }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error finding client.";
            return { success: false, error: errorMessage, message: null, data: null }
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
            return { success: false, error: errorMessage, data: null };
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
            return { success: false, error: errorMessage, message: null };
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
            return { success: false, error: errorMessage, data: null };
        }
    },
};

export const appointmentService = {
    async getTurnos(): Promise<ServiceResult<Turno[]>> {
        try {
            const { userId } = await getUserId();
            const { data, error } = await supabase.from(`turnos`).select("*, client (*)").eq("user_id", userId).order("date", { ascending: true }).order("time", { ascending: true });

            if (error) {
                return { success: false, error: error.message, data: null };
            };

            return { success: true, error: null, data: data };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error getting turnos.";
            return { success: false, error: errorMessage, data: null };
        }
    },
    async createAppointment(id: string, name: string, lastname: string, description: string, date: string, time: string, state: State): Promise<ServiceResult> {
        try {
            const { data, error: errorFindingClient } = await clientService.findClient(name, lastname);

            if (errorFindingClient || !data || data.length === 0) {
                return { success: false, error: errorFindingClient || "Client not found.", message: null };
            }
            const clientId = data[0].id;

            const { success, error: errorExistingAppointment } = await this.existingAppointment(date, time);

            if (errorExistingAppointment) {
                return { success: false, error: "Error checking existing appointment.", message: null };
            }

            if (!success) {
                return { success: false, error: "The date and time are already occupied. Please try again.", message: null };
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
                return { success: false, error: error.message, message: null };
            }

            return { success: true, error: null, message: "Appointment created successfully." };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error creating appointment.";
            return { success: false, error: errorMessage, message: null };
        }
    },

    async existingAppointment(date: string, time: string) {
        try {
            const { data, error } = await supabase.from("turnos").select("*")
                .eq("date", date)
                .eq("time", time);

            if (error) {
                return { success: false, error: error.message }
            }

            if (data && data.length > 0) {
                return { success: false, error: null }
            }

            return { success: true, error: null };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error checking appointment existence.";
            return { success: false, error: errorMessage };
        };
    },

    async deleteAppointment(turnoId: number): Promise<ServiceResult> {
        try {
            const { error } = await supabase.from("turnos").delete().eq("id", turnoId);
            if (error) {
                return { success: false, error: error.message, message: null }
            }

            return { success: true, error: null, message: "Appointment deleted successfully." };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error deleting appointment.";
            return { success: false, error: errorMessage, message: null };
        }
    },

    async updateAppointment(turnoId: number, state: State, userId: string, description: string, date: string, clientId: string | number): Promise<ServiceResult> {
        try {
            if (state === "completed") {
                const { error } = await clientService.updateClientHistory(userId, description, date, clientId);
                if (error) {
                    return { success: false, error: "Error updating client history.", message: null }
                }
            }

            if (state === "cancelled") {
                const { error } = await this.deleteAppointment(turnoId);
                if (error) {
                    return { success: false, error: "Error deleting appointment.", message: null }
                }

                return { success: true, error: null, message: "Appointment cancelled and deleted successfully." };
            }

            const { error } = await supabase.from("turnos").update({ state }).eq("id", turnoId);

            if (error) {
                return { success: false, error: error.message, message: null }
            }

            return { success: true, error: null, message: "Appointment state updated successfully." }

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error updating appointment.";
            return { success: false, error: errorMessage, message: null };
        }
    },
}
