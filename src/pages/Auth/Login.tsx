import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { supabase } from "@/supabase/client.ts"
import { LoginForm } from "@/features/Auth/LoginForm"

interface State {
    email: string
    password: string
}

export default function Login() {
    const [state, setState] = useState<State>({ email: "", password: "" })
    const [error, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();
    const timeout = useRef<number | null>(null);

    const handleSubmitForm = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (state.email.trim() === "") {
            setErrorMessage("Email is required");

        }

        const { error } = await supabase.auth.signInWithPassword({
            email: state.email, password: state.password
        });

        if (error) {
            setErrorMessage(error.status === 400 ? "Either the email is not registered or the password is incorrect" : "Something went wrong. Please try again!");
            setState((prev) => ({
                ...prev,
                email: "",
                password: ""
            }));

            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = setTimeout(() => {
                setErrorMessage("");
            }, 3000);


            return;
        }

        navigate("/");
    }

    const handleBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleLoginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: window.location.origin
            }
        });

        if (error) {
            setErrorMessage("Something went wrong. Please try again!");
        }

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            setErrorMessage("");
        }, 3000);

    }

    return (
        <main>
            <LoginForm onHandleBtn={handleBtn} onSubmit={handleSubmitForm} onLoginWithGoogle={handleLoginWithGoogle} errorMessage={error} state={state} />
        </main >
    )
}