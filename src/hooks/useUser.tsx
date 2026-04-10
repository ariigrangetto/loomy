import { useContext } from "react";
import { UserContext } from "../context/userActions.tsx";

export default function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within UserProvider");
    }
    return context;
}