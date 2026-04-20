import { createContext, useState } from "react";
import type { Turno } from "../types.d";

interface StateContextProvider {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    turnos: Turno[],
    setTurnos: React.Dispatch<React.SetStateAction<Turno[]>>
}

export const StateContext = createContext<StateContextProvider | undefined>(undefined);

export default function StateProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(false);
    const [turnos, setTurnos] = useState<Turno[]>([]);

    return (
        <StateContext.Provider value={{ loading, turnos, setLoading, setTurnos }}>
            {children}
        </StateContext.Provider>
    )
}