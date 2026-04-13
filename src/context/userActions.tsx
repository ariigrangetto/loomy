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
}

export const UserContext = createContext<userContextType | undefined>(undefined);

export function UserProvider({ children }: userProviderProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(session)
            console.log(event)
            if (event === "SIGNED_IN" && session) {
                navigate("/");
            }
            if (event === "SIGNED_OUT" && session === null) {
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
            throw new Error(error.message);
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
            throw new Error(error.message);
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
            throw new Error(error.message);
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
            throw new Error(error.message);
        }


    }

    return (
        <UserContext.Provider value={{ login, resetPassword, signOut, register }}>
            {children}
        </UserContext.Provider>
    )

}