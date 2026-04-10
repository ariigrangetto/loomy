import { createContext, useEffect } from "react";
import { supabase } from "../supabase/client.ts";
import { redirect } from "react-router";

interface userProviderProps {
    children: React.ReactNode;
}

interface userContextType {
    login: (email: string, password: string) => Promise<Error | undefined>;
    register: (email: string, name: string, password: string, lastName: string) => Promise<Error | undefined>;
}

export const UserContext = createContext<userContextType | undefined>(undefined);

export function UserProvider({ children }: userProviderProps) {

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            console.log(session)
            console.log(event)
            if (event === "SIGNED_IN" && session) {
                redirect("/dashboard");
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

    return (
        <UserContext.Provider value={{ login, register }}>
            {children}
        </UserContext.Provider>
    )

}