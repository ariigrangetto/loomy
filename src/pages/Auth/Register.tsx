import { useRef, useState } from "react";
import { supabase } from "@/supabase/client.ts";
import { RegisterForm } from "@/features/Auth/RegisterForm";


export default function Register() {
    const [error, setErrorMessage] = useState<string>("");
    const timeout = useRef<number | null>(null);
    const [successfulMessage, setSuccessfulMessage] = useState<string>("");

    const handleSubmitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const name = formData.get("name") as string;
        const lastname = formData.get("lastname") as string;
        const confirmPassword = formData.get("confirm-password") as string;

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match. Please try again!");
            return;
        };

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
        <main>
            <RegisterForm
                onHandleSubmit={handleSubmitForm}
                errorMessage={error}
                successfulMessage={successfulMessage}
            />
        </main >
    )
}