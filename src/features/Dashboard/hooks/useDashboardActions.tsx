import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/supabase/client.ts";
import type { State, Turno } from "@/lib/types";
import { appointmentService } from "@/service/appointmentService.ts";
import useLoading from "@/hooks/useLoading.tsx";

export default function useDashboardActions() {
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const { loading, startLoading, stopLoading } = useLoading();

    const getTurnos = useCallback(async () => {
        startLoading();
        try {
            const result = await appointmentService.getTurnos();
            if (result.error) {
                console.error("Error getting turnos", result.error);
                return;
            };

            setTurnos(result.data || []);

        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const updateAppoitment = async (turnoId: number, clientId: string | number, name: string, lastname: string, number: string, description: string, date: string, time: string, clientChange: boolean, appointmentChange: boolean) => {

        startLoading();

        try {
            return await appointmentService.updateAppointment(turnoId, clientId, name, lastname, number, description, date, time, clientChange, appointmentChange);
        } finally {
            stopLoading();
        }
    };

    useEffect(() => {
        getTurnos();
        const channelId = `dashboard-channel-${Math.random().toString(36).substring(2, 9)}`;
        const turnoChannel = supabase.channel(channelId)
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "turnos"
            },
                async () => {
                    await getTurnos();
                })
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "client"
            },
                async () => {
                    await getTurnos();
                })
            .subscribe();

        return () => {
            supabase.removeChannel(turnoChannel);
        };
    }, [getTurnos]);

    const createAppointment = async (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State, number: string) => {
        startLoading()
        try {
            return await appointmentService.createAppointment(id, name, lastname, description, date, time, state, number);
        } finally {
            stopLoading();
        }
    };

    const updateAppoitmentState = async (turnoId: number, state: State, userId: string, description: string, date: string, clientId: string | number) => {
        startLoading()
        try {
            return await appointmentService.updateAppointmentState(turnoId, state, userId, description, date, clientId);
        } finally {
            stopLoading();
        }
    };

    const deleteAppointment = async (turnoId: number) => {
        startLoading()
        try {
            return await appointmentService.deleteAppointment(turnoId);
        } finally {
            stopLoading();
        }
    };

    return {
        getTurnos,
        turnos,
        createAppointment,
        loading,
        updateAppoitmentState,
        deleteAppointment,
        updateAppoitment,
    }
}