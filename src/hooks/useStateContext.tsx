import { useContext } from "react";
import { StateContext } from "../context/StateContext.tsx";

export default function useStateContext() {
    const context = useContext(StateContext)
    if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
    return context;
}