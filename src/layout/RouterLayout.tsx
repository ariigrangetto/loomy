import { Outlet } from "react-router";
import { UserProvider } from "../context/userActions";

export default function RootLayout() {
    return (
        <UserProvider>
            <Outlet />
        </UserProvider>
    )
}