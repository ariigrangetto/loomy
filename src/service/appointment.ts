import type { ServiceResult, State, Turno } from "../lib/types.d.ts";
import { getUserId, supabase } from "../supabase/client.ts";
import { clientService } from "./client.ts";

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
            throw new Error(errorMessage);
        }
    },

    async updateAppointment(turnoId: number, clientId: string | number, name: string, lastname: string, number: string, description: string, date: string, time: string, clientChange: boolean, appointmentChange: boolean): Promise<ServiceResult> {
        try {
            if (clientChange) {
                const { error: errorUpdateClient } = await supabase.from(`client`).update({
                    name,
                    lastname,
                    number,
                }).eq("id", clientId).select();

                if (errorUpdateClient) {
                    return { success: false, error: errorUpdateClient.message, message: null };
                }
            }

            if (appointmentChange) {
                const { error: errorUpdatingAppointment } = await supabase.from(`turnos`).update({
                    description,
                    date,
                    time,
                }).eq("id", turnoId).select();

                if (errorUpdatingAppointment) {
                    return { success: false, error: errorUpdatingAppointment.message, message: null }
                }
            }

            return { success: true, error: null, message: "Appointment updated successfully." };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error updating appointment.";
            throw new Error(errorMessage);
        }

    },

    async createAppointment(id: string, name: string, lastname: string, description: string, date: string, time: string, state: State, number?: string): Promise<ServiceResult> {
        try {
            const { data, error: errorFindingClient } = await clientService.findClient(name, lastname, number);

            if (errorFindingClient || !data || data.length === 0) {
                return { success: false, error: errorFindingClient || "Error finding or creating client.", message: null };
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
                description,
                date,
                time,
                user_id: id,
                state,
            })

            if (error) {
                return { success: false, error: error.message, message: null };
            }

            return { success: true, error: null, message: "Appointment created successfully." };

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unexpected error creating appointment.";
            throw new Error(errorMessage);
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
            throw new Error(errorMessage)
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
            throw new Error(errorMessage);
        }
    },

    async updateAppointmentState(turnoId: number, state: State, userId: string, description: string, date: string, clientId: string | number): Promise<ServiceResult> {
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
            throw new Error(errorMessage);
        }
    },
}