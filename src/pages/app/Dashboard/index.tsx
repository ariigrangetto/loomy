import { useLoaderData, useNavigate } from "react-router";
import List from "@/features/Dashboard/List";
import { useState } from "react";
import Form from "@/features/Dashboard/Form.tsx";
import { supabase } from "@/supabase/client.ts";
import { NavBarDashboard } from "@/components/ui/Navbar";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user: { id } } = useLoaderData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            setErrorMessage("Error trying to sign out. Please try again.");
            return;
        }
        navigate("/login");
    };

    if (errorMessage) {
        return (
            <main className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] p-6 font-sans relative transition-colors duration-200">
                <div className="flex items-center justify-center">
                    <p className="text-red-500">{errorMessage}</p>
                </div>
            </main>
        )
    };

    return (
        <main className="min-h-screen bg-[#f7f7f9] dark:bg-[#16171d] p-6 font-sans relative transition-colors duration-200">
            <NavBarDashboard onHandleSignOut={handleSignOut} setIsFormOpen={setIsFormOpen} />
            {isFormOpen && <Form id={id} setIsFormOpen={setIsFormOpen} />}
            <List userId={id} />
        </main>
    );
}