import useLoading from "@/hooks/useLoading.tsx";
import { clientService } from "@/service/appointmentService.ts";


export default function useClientActions() {
    const { startLoading, stopLoading } = useLoading();

    const createClient = async (name: string, lastname: string) => {
        startLoading()
        try {
            return await clientService.createClient(name, lastname);
        } finally {
            stopLoading();
        }
    };

    const findClient = async (name: string, lastname: string) => {
        startLoading()
        try {
            return await clientService.findClient(name, lastname);
        } finally {
            stopLoading();
        }
    };

    const getClientHistory = async (clientId: string | number) => {
        startLoading()
        try {
            return await clientService.getClientHistory(clientId);
        } finally {
            stopLoading();
        }
    };

    const getClientData = async (clientId: string | number) => {
        startLoading();
        try {
            return await clientService.getClientData(clientId);
        } finally {
            stopLoading();
        }
    };
    return { createClient, findClient, getClientHistory, getClientData }
}