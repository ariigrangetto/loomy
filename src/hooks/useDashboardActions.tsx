import { useCallback, useEffect, useState } from "react";
import { supabase } from "../supabase/client.ts";
import type { State, Turno } from "../lib/types";
import { clientService, appointmentService } from "../service/appointmentService.ts";
import useLoading from "./useLoading.tsx";

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

            setTurnos(result.data);

        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

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
            .subscribe();

        return () => {
            supabase.removeChannel(turnoChannel);
        };
    }, [getTurnos]);

    const createClient = useCallback(async (name: string, lastname: string) => {
        startLoading()
        try {
            return await clientService.createClient(name, lastname);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const findClient = useCallback(async (name: string, lastname: string) => {
        startLoading()
        try {
            return await clientService.findClient(name, lastname);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const createAppointment = useCallback(async (id: string, name: string, lastname: string, description: string, date: string, time: string, state: State) => {
        startLoading()
        try {
            return await appointmentService.createAppointment(id, name, lastname, description, date, time, state);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const updateAppoitmentState = useCallback(async (turnoId: number, state: State, userId: string, description: string, date: string, clientId: string | number) => {
        startLoading()
        try {
            return await appointmentService.updateAppointment(turnoId, state, userId, description, date, clientId);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const getClientHistory = useCallback(async (clientId: string | number) => {
        startLoading()
        try {
            return await clientService.getClientHistory(clientId);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const deleteAppointment = useCallback(async (turnoId: number) => {
        startLoading()
        try {
            return await appointmentService.deleteAppointment(turnoId);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);

    const getClientData = useCallback(async (clientId: string | number) => {
        startLoading();
        try {
            return await clientService.getClientData(clientId);
        } finally {
            stopLoading();
        }
    }, [startLoading, stopLoading]);



    return {
        getTurnos,
        turnos,
        createClient,
        findClient,
        createAppointment,
        loading,
        updateAppoitmentState,
        getClientHistory,
        deleteAppointment,
        getClientData
    }
}