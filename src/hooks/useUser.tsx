import { supabase } from "../supabase/client.ts"

interface useUserFunctions {
    login: (email: string, password: string) => Promise<Error | undefined>;
    register: (email: string, name: string, password: string, lastName: string) => Promise<Error | undefined>;
}

export default function useUser(): useUserFunctions {

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


    return { login, register }

}