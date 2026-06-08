import { useRef, useState } from "react";
import Footer from "@/components/ui/Footer.tsx";
import { supabase } from "@/supabase/client.ts";
import NavBar from "@/features/Auth/ui/NavbarForms.tsx";
import { RegisterForm } from "@/features/Auth/Components/RegisterForm.tsx";


export default function Register() {
    const [error, setErrorMessage] = useState<string>("");
    const timeout = useRef<number | null>(null);
    const [successfulMessage, setSuccessfulMessage] = useState<string>("");

    const handleSubmitForm = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        const lastname = formData.get("lastname") as string;

        console.log(Object.fromEntries(formData));

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin,
                data: {
                    name,
                    lastname
                }
            }
        })

        if (error) {
            setErrorMessage(`Oops, it looks like there's been an error. Please try again!`);
        } else if (data?.user?.identities && data.user.identities.length === 0) {
            setErrorMessage(`Email already in use. Please try again!`);
        } else {
            setSuccessfulMessage("Email sent successfully. Please check your inbox to confirm your email.")
        }


        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            setErrorMessage("");
            setSuccessfulMessage("");
        }, 3000);

    }


    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f7f7f9] dark:bg-[#0f0f13] relative font-sans transition-colors duration-300">
            <NavBar />

            <RegisterForm
                onHandleSubmit={handleSubmitForm}
                errorMessage={error}
                successfulMessage={successfulMessage}
            />

            <Footer />
        </main >
    )
}