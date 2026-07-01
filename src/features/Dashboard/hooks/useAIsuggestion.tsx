import { useEffect, useState } from "react";
import type { Turno } from "@/lib/types.d.ts";
import { supabase } from "@/supabase/client";

export default function useAISuggestion({ turnos }: { turnos: Turno[] }) {
    const [IAMessage, setIAMessage] = useState("");
    useEffect(() => {
        async function getSuggestion() {
            if (!turnos || turnos.length === 0) return;

            try {
                const currentDate = new Date().toLocaleString(undefined, { timeZoneName: "shortOffset" });

                const { data, error } = await supabase.functions.invoke("bright-processor", {
                    body: { turnos, currentDate }
                });
                if (error) throw error;

                const text = data.text;
                const parsedAnswer = JSON.parse(text);

                if (parsedAnswer) {
                    setIAMessage(parsedAnswer.suggestion);
                }
            } catch (error) {
                console.error("Error obtaining AI suggestion:", error);
                setIAMessage("I have not been able to generate the suggestion at the moment, please try again later");
            }
        }
        getSuggestion();
    }, [turnos]);

    return { IAMessage }
}