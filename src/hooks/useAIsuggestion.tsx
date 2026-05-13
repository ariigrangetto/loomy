import { useEffect, useState } from "react";
import type { Turno } from "../types.d";
import ollama from "ollama";

export default function useAISuggestion({ turnos }: { turnos: Turno[] }) {
    console.log("hello");
    const [IAMessage, setIAMessage] = useState("");
    const turnosData = JSON.stringify(turnos);
    const currentDate = new Date().toLocaleString("es-AR", { dateStyle: "full", timeStyle: "short" });
    const prompt = `Eres un asistente virtual experto para un salón de peluquería.
    Tu tarea es analizar la siguiente lista de turnos agendados y encontrar el próximo horario libre más cercano para un nuevo cliente.
    Asume que el horario de atención es de 14:00 a 20:00. De martes a sábados.
    Ten en cuenta en que si no encuentras turno para el día actual, (${currentDate}), ofrécelo al usuario.
    Dale el turno más cercano posible y disponible.

    Fecha y hora actual: ${currentDate}

    Turnos actuales agendados:
    ${turnosData}

    Debes responder ÚNICAMENTE con un objeto JSON válido que contenga una única clave "suggestion".
    El valor de "suggestion" debe ser un mensaje amigable, directo y ya formateado para ser leído por el peluquero.
    Si el turno es el mismo día de hoy, usa la palabra "hoy". Si es al día siguiente, usa "mañana".

    Ejemplos de formato de respuesta:
    {
        "suggestion": "¡El próximo turno disponible es hoy a las 15:00 hs!"
    }
    o
    {
        "suggestion": "¡El próximo turno disponible es mañana a las 10:00 hs!"
    }
    o
    {
        "suggestion": "¡El próximo turno disponible es el jueves 16 de mayo a las 11:30 hs!"
    }`;

    useEffect(() => {
        async function getSuggestion() {
            try {
                const response = await ollama.chat({
                    model: "tinyllama",
                    messages: [{ role: "system", content: prompt }],
                    format: "json",
                });

                if (!response.message.content) throw new Error("Error al generar la respuesta");

                console.log("working")
                const parsedResponse = JSON.parse(response.message.content);
                if (parsedResponse.suggestion) {
                    setIAMessage(parsedResponse.suggestion);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error("Unexpected error", error.message);
                } else {
                    console.error("Unexpected error", error);
                }
            }

        }
        getSuggestion();
    }, [turnos]);

    return { IAMessage }
}