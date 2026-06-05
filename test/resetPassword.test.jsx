import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import ResetPassword from "../src/pages/ResetPassword.tsx";
import { MemoryRouter } from "react-router";
import { ThemeProvider } from "../src/context/ThemeProvider.tsx";
import DashboardProvider from "../src/context/DashboardContext.tsx";
import MatchMediaMock from "vitest-matchmedia-mock";
import { supabase } from "../src/supabase/client.ts";

afterEach(() => {
    cleanup();
});

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

const mockUser = { id: "123d", email: "test@example.com" }
vi.mocked(supabase.auth.getUser).mockResolvedValue({ data: { user: mockUser }, error: null });

let macthMediaMock = new MatchMediaMock();
macthMediaMock.useMediaQuery('(prefers-color-scheme: dark)');

const AllProviders = ({ children }) => {
    return (
        <ThemeProvider defaultTheme="system">
            <DashboardProvider>
                {children}
            </DashboardProvider>
        </ThemeProvider>
    )
}



describe("Find reset password elements", () => {
    test("Find reset password form", async () => {
        render(
            <MemoryRouter initialEntries={["/reset-password"]}>
                <AllProviders>
                    <ResetPassword />
                </AllProviders>
            </MemoryRouter>
        );
        expect(await screen.findByText(/Reset Password/i)).toBeInTheDocument();
        expect(await screen.findByText(/Enter your email address and we'll send you instructions to reset it./i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(await screen.getByRole("button", { name: /Send Reset Link/i })).toBeInTheDocument();
        expect(await screen.getByRole("button", { name: /Back to Login/i })).toBeInTheDocument();
    })
})