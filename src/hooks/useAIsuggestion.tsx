import { useEffect, useState } from "react";
import type { Turno } from "../lib/types";
import ollama from "ollama";

export default function useAISuggestion({ turnos }: { turnos: Turno[] }) {
    const [IAMessage, setIAMessage] = useState("");
    const turnosData = JSON.stringify(turnos);
    const currentDate = new Date().toLocaleString("es-AR", { dateStyle: "full", timeStyle: "short" });
    const prompt = `Actúa como recepcionista de peluquería. 
    Busca el próximo horario libre según estos datos:
    - Horario: 14:00 a 20:00, martes a sábados.
    - Fecha actual: ${currentDate}
    - Turnos ocupados: ${turnosData}
    
    REGLA: Responde ÚNICAMENTE con un objeto JSON válido que contenga la clave "suggestion" con el mensaje en ESPAÑOL.
    
    Ejemplo exacto de la salida:
    {
        "suggestion": "¡El próximo turno disponible es hoy a las 15:00 hs!"
    }`;

    useEffect(() => {
        async function getSuggestion() {
            try {
                const response = await ollama.chat({
                    model: "tinyllama",
                    messages: [
                        { role: "system", content: "You are a receptionist. Respond only with valid JSON containing a 'suggestion' key in Spanish." },
                        { role: "user", content: prompt }
                    ],
                    format: "json",
                });

                if (!response.message.content) throw new Error("Error al generar la respuesta");
                const parsedResponse = JSON.parse(response.message.content);

                if (parsedResponse.suggestion) {
                    let msg = parsedResponse.suggestion;
                    if (typeof msg === "object") {
                        msg = msg.suggestion || msg.mensaje || JSON.stringify(msg);
                    }
                    setIAMessage(String(msg));
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