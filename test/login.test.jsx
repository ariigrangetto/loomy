import { afterEach, describe, expect, test } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import { render, screen } from "@testing-library/react";
import Login from "../src/pages/Login.tsx"
import { ThemeProvider } from "../src/context/ThemeProvider.tsx";
import StateProvider from "../src/context/StateContext.tsx";
import UserProvider from "../src/context/UserActions.tsx";
import MatchMediaMock from "vitest-matchmedia-mock";

afterEach(() => {
    cleanup();
})

describe("Find login form with inputs and google button", () => {
    test(`Login page with google button`, async () => {
        let macthMediaMock = new MatchMediaMock();
        macthMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <UserProvider>
                    <StateProvider>
                        <ThemeProvider defaultTheme="system">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </ThemeProvider>
                    </StateProvider>
                </UserProvider>
            </MemoryRouter>
        );
        const googleBtn = screen.getByRole("button", { name: /Continue with Google/i })
        expect(googleBtn).toBeInTheDocument();
    });

    test("Login page form inputs", async () => {
        let matchMediaMock = new MatchMediaMock();
        matchMediaMock.useMediaQuery('(prefers-color-scheme: dark)');
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <UserProvider>
                    <StateProvider>
                        <ThemeProvider defaultTheme="system">
                            <Routes>
                                <Route path="/login" element={<Login />} />
                            </Routes>
                        </ThemeProvider>
                    </StateProvider>
                </UserProvider>
            </MemoryRouter>
        );
        const form = document.querySelector("form");
        const emailInput = screen.getByLabelText(/Professional Email/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const newInPlatformLink = screen.getByRole("link", { name: /Join Loomy/i })
        expect(form).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(newInPlatformLink).toBeInTheDocument();
    });
});

