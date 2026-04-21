import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import ResetPassword from "../src/pages/ResetPassword.tsx";
import { MemoryRouter } from "react-router";

afterEach(() => {
    cleanup();
})


describe("Find reset password elements", () => {
    test("Find reset password form", async () => {
        render(
            <MemoryRouter initialEntries={["/reset-password"]}>
                <ResetPassword />
            </MemoryRouter>
        );
        expect(await screen.findByText(/Reset Password/i)).toBeInTheDocument();
        expect(await screen.findByText(/Enter your email address and we'll send you instructions to reset it./i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(await screen.getByRole("button", { name: /Send Reset Link/i })).toBeInTheDocument();
        expect(await screen.getByRole("button", { name: /Back to Login/i })).toBeInTheDocument();
    })
})