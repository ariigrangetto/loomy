import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getUserId() {
    try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
            throw new Error("No user authenticated");
        }
        const userId = user.id;
        return { userId, user };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Unexpected error getting user id: ${error.message}`);
        }
        throw new Error("Unexpected error");
    }
};