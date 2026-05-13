import { createContext, useEffect } from "react";
import { supabase } from "../supabase/client.ts";
import { useNavigate } from "react-router";

interface userProviderProps {
    children: React.ReactNode;
}

interface userContextType {
    login: (email: string, password: string) => Promise<Error | undefined>;
    register: (email: string, name: string, password: string, lastName: string) => Promise<Error | undefined>;
    signOut: () => Promise<Error | undefined>;
    resetPassword: (email: string) => Promise<Error | undefined>;
    loginWithGoogle: () => Promise<Error | undefined>;
}

export const UserContext = createContext<userContextType | undefined>(undefined);

export default function UserProvider({ children }: userProviderProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session && window.location.pathname === "/client") {
                navigate("/");
            }
            if (event === "SIGNED_IN" && session && window.location.pathname !== "/about") {
                navigate("/");
            }
            if (event === "SIGNED_OUT" && session === null && window.location.pathname !== "/login") {
                navigate("/login");
            }
        })

        return () => {
            data.subscription.unsubscribe();
        }
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                console.error(error.message);
                return error;
            }
            return;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error logging in: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }

    const register = async (email: string, name: string, password: string, lastName: string) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        lastName
                    }
                }
            })

            if (error) {
                console.error(error.message);
                return error;
            }
            return;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error registering: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }

    }

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error(error.message);
                return error;
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error signing out: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }

    const resetPassword = async (email: string) => {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) {
                console.error(error.message);
                return error;
            }

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error resetting password: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }


    }

    const loginWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
            })
            if (error) {
                console.error(error.message);
                return error;
            }
            return;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Unexpected error logging in with Google: ${error.message}`);
            }
            throw new Error("Unexpected error");
        }
    }

    return (
        <UserContext.Provider value={{ login, resetPassword, signOut, register, loginWithGoogle }}>
            {children}
        </UserContext.Provider>
    )

}