import Client from "../src/pages/Client.tsx";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import MatchMediaMock from "vitest-matchmedia-mock";
import DashboardProvider from "../src/context/DashboardContext.tsx";
import { ThemeProvider } from "../src/context/ThemeProvider.tsx";
import StateProvider from "../src/context/StateContext.tsx";
import UserProvider from "../src/context/UserActions.tsx";
import { afterEach, vi } from "vitest";
import { supabase } from "../src/supabase/client.js";

afterEach(() => {
    cleanup();
})

vi.mock(`../src/supabase/client.js`, () => {
    const chain = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
        then: function (resolve) { resolve({ data: [], error: null }) }
    };
    return {
        supabase: {
            auth: {
                getUser: vi.fn(),
                onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe: vi.fn() } } }))
            },
            from: vi.fn(() => chain),
            channel: vi.fn(() => ({
                on: vi.fn().mockReturnThis(),
                subscribe: vi.fn()
            })),
            removeChannel: vi.fn()
        },
    }
})


const mockUser = { id: "123d", email: "test@example.com" }
vi.mocked(supabase.auth.getUser).mockResolvedValue({ data: { user: mockUser }, error: null });
let matchMediaMock = new MatchMediaMock();
matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');

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
    expect(await screen.findByText(/Back to Dashboard/i)).toBeInTheDocument();
})