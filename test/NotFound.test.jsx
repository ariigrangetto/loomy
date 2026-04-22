import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import NotFound from "../src/pages/NotFound.tsx";
import { MemoryRouter } from "react-router";

afterEach(() => {
    cleanup();
});

describe(`Find "Not Found" message`, () => {
    test("Find 404 message", async () => {
        render(
            <MemoryRouter initialEntries={["/not-found"]}>
                <NotFound />
            </MemoryRouter>
        );
        expect(await screen.findByText(/404/i)).toBeInTheDocument();
        expect(await screen.findByText(/Page Not Found/i)).toBeInTheDocument();
        expect(await screen.findByText(/The page you are looking for might have been removed, had its name changed, or is temporarily unavailable./i)).toBeInTheDocument();
        expect(await screen.findByText(/Back to Home/i)).toBeInTheDocument();
    })
})