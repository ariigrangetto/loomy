import { ThemeProvider } from "../src/context/ThemeProvider.tsx";
import { UserProvider } from "../src/context/UserActions.tsx";
import StateProvider from "../src/context/StateContext.tsx";
import DashboardProvider from "../src/context/DashboardContext.tsx";
import Client from "../src/pages/Client.tsx";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";

const AllProviders = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="system">
            <UserProvider>
                <StateProvider>
                    <DashboardProvider>
                        {children}
                    </DashboardProvider>
                </StateProvider>
            </UserProvider>
        </ThemeProvider>
    )
}

test(`Find "Back to Dashboard" text`, async () => {
    render(
        <MemoryRouter initialEntries={["/client/3"]}>
            <AllProviders>
                <Routes>
                    <Route path="/client/:id" element={<Client />} />
                </Routes>
            </AllProviders>
        </MemoryRouter>
    );
    expect(screen.getByText(/Back to Dashboard/i)).toBeInTheDocument();
})