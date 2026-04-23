import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import ResetPassword from "../src/pages/ResetPassword.tsx";
import { MemoryRouter } from "react-router";

afterEach(() => {
    cleanup();
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