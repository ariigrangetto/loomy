import { afterEach, describe, expect, test, vi } from "vitest";
import { supabase } from "../src/supabase/client.js";
import MatchMediaMock from "vitest-matchmedia-mock";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import Dashboard from "../src/pages/Dashboard.tsx";
import DashboardProvider from "../src/context/DashboardContext.tsx";
import { ThemeProvider } from "../src/context/ThemeProvider.tsx";
import ListOfAppointments from "../src/components/listOfAppointments.tsx";

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
});

const AllProviders = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="system">
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </ThemeProvider>
    )
}

const mockUser = { id: "123d", email: "test@example.com" }
vi.mocked(supabase.auth.getUser).mockResolvedValue({ data: { user: mockUser }, error: null });
let matchMediaMock = new MatchMediaMock();
matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');

const mockTurno = [{
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
}];

const mockNavigate = vi.fn();

vi.mock("react-router", async (importOriginal) => {
    const router = await importOriginal();
    return {
        ...router,
        useNavigate: () => mockNavigate,
        useLoaderData: () => ({ user: { id: "123d" } }),
    }
})

describe(`Find new appointment button in dashboard and appoitment description`, () => {
    test(`Find button`, async () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <AllProviders>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </AllProviders>
            </MemoryRouter>
        );
        const newButton = screen.getByRole("button", { name: /New Appointment/i });
        expect(newButton).toBeInTheDocument();
    });

    test(`Find mock appointment`, async () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <AllProviders>
                    <Routes>
                        <Route path="/dashboard" element={<ListOfAppointments id={mockUser.id} />} />
                    </Routes>
                </AllProviders>
            </MemoryRouter>
        );

        const select = await screen.findByLabelText("state");
        const h3 = screen.getByLabelText("description");
        const date = screen.getByLabelText("date");
        const time = screen.getByLabelText("time");
        const button = screen.getByRole("link", { name: new RegExp(`${mockTurno[0].client.name} ${mockTurno[0].client.lastname}`, 'i') });

        expect(select).toBeInTheDocument();
        expect(h3).toBeInTheDocument();
        expect(date).toBeInTheDocument();
        expect(time).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    })
});
