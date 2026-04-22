import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import Register from "../src/pages/Register.tsx";
import { MemoryRouter, Route, Routes } from "react-router";
import UserProvider from "../src/context/UserActions.tsx";
import StateProvider from "../src/context/StateContext.tsx";
import { ThemeProvider } from "../src/context/ThemeProvider.tsx";
import MatchMediaMock from "vitest-matchmedia-mock";
import Login from "../src/pages/Login.tsx";

afterEach(() => {
    cleanup();
});

describe("Find register form, with google button and inputs", () => {
    test(`Register page with google button`, async () => {
        let macthMediaMock = new MatchMediaMock();
        macthMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <UserProvider>
                    <StateProvider>
                        <ThemeProvider defaultTheme="system">
                            <Routes>
                                <Route path="/login" element={<Register />} />
                            </Routes>
                        </ThemeProvider>
                    </StateProvider>
                </UserProvider>
            </MemoryRouter>
        );
        const googleBtn = screen.getByRole("button", { name: /Continue with Google/i })
        expect(googleBtn).toBeInTheDocument();
    });

    test("Register form inputs", async () => {
        let matchMediaMock = new MatchMediaMock();
        matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <UserProvider>
                    <StateProvider>
                        <ThemeProvider defaultTheme="system">
                            <Routes>
                                <Route path="/register" element={<Register />} />
                            </Routes>
                        </ThemeProvider>
                    </StateProvider>
                </UserProvider>
            </MemoryRouter>
        );
        const form = document.querySelector("form");
        const nameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/Professional Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const registerBtn = screen.getByRole("button", { name: /Join Loomy/i });
        expect(form).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(registerBtn).toBeInTheDocument();
    })
});


describe("Redirect to login when user is alredy logged in", async () => {
    test("Redirect to login", async () => {
        let matchMediaMock = new MatchMediaMock();
        matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
        render(
            <MemoryRouter initialEntries={["/register"]}>
                <UserProvider>
                    <StateProvider>
                        <ThemeProvider defaultTheme="system">
                            <Routes>
                                <Route path="/register" element={<Register />} />
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </ThemeProvider>
                    </StateProvider>
                </UserProvider>
            </MemoryRouter>
        );
        const link = await screen.findByRole("link", { name: /Already have an account?/i })
        expect(link).toBeInTheDocument();
        fireEvent.click(link);
        expect(screen.getByText(/Welcome back/i)).toBeInTheDocument();
    })
})