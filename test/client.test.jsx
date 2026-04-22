import Client from "../src/pages/Client.tsx";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useParams } from "react-router";
import MatchMediaMock from "vitest-matchmedia-mock";
import DashboardProvider from "../src/context/DashboardContext.tsx";
import { ThemeProvider } from "../src/context/ThemeProvider.tsx";
import StateProvider from "../src/context/StateContext.tsx";
import UserProvider from "../src/context/UserActions.tsx";
import { afterEach, vi } from "vitest";
import { supabase } from "../src/supabase/client.js";
import useDashboard from "../src/hooks/useDashboard.tsx";

afterEach(() => {
    cleanup();
})

vi.mock(`../src/supabase/client.js`, () => {
    const chain = {
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: null, error: null }),
        then: function (resolve) {
            resolve({
                data: [{
                    id: "1",
                    description: "Reflejos y mechas",
                    date: "2022-01-01",
                    cliente: "1",
                    time: "10:00",
                    client: {
                        id: "1",
                        name: "test",
                        phone: "123456789",
                        lastname: "test2",
                        email: "test@example.com"
                    },
                    state: "pending",
                    created_at: "2022-01-01",
                    user_id: "12230a"
                }], error: null
            })
        }
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

const mockHistory =
{
    id: 1,
    name: "test",
    lastname: "testTest",
};

const mockClient = {
    id: "1",
    name: "test",
    lastname: "testTest",
    phone: "123456789",
    email: "test@example.com",
    created_at: "2022-01-01"
};

vi.mock("../src/hooks/useDashboard.tsx");

vi.mock("react-router", async (importOriginal) => {
    const router = await importOriginal();
    return {
        ...router,
        useParams: () => ({ id: "1" }),
    }
})

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
    vi.mocked(useDashboard).mockReturnValue({
        getClientHistory: vi.fn().mockResolvedValue([mockHistory]),
        getClientById: vi.fn().mockResolvedValue(mockClient),
    });
    render(
        <MemoryRouter initialEntries={[`/client/${mockClient.id}`]}>
            <AllProviders>
                <Routes>
                    <Route path="/client/:id" element={<Client />} />
                </Routes>
            </AllProviders>
        </MemoryRouter>
    );
    expect(await screen.findByText(/Back to Dashboard/i)).toBeInTheDocument();
    expect(await screen.findByText(/testTest/i)).toBeInTheDocument();
    expect(await screen.findByText(/test/i)).toBeInTheDocument();
})