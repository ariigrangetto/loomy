import { useRef, useState } from "react"
import { useNavigate } from "react-router"
import { supabase } from "../../supabase/client.ts"
import NavBar from "../../components/ui/NavbarForms.tsx"
import { LoginForm } from "../../components/Event/LoginForm.tsx"
import Footer from "../../components/ui/Footer.tsx"

interface State {
    email: string
    password: string
}

export default function Login() {
    const [state, setState] = useState<State>({ email: "", password: "" })
    const [error, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();
    const timeout = useRef<number | null>(null);

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (state.email.trim() === "") {
            setErrorMessage("Email is required");
        }
        const { error } = await supabase.auth.signInWithPassword({
            email: state.email, password: state.password
        });

        if (error) {
            setErrorMessage(error.status === 400 ? "The email is not registered" : "Something went wrong. Please try again!");
            return;
        }

        if (timeout.current) {
            clearTimeout(timeout.current);
        }

        timeout.current = setTimeout(() => {
            setErrorMessage("");
        }, 3000);

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
        <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f7f7f9] dark:bg-[#0f0f13] relative font-sans transition-colors duration-300">
            <NavBar />
            <LoginForm onHandleBtn={handleBtn} onSubmit={handleSubmitForm} onLoginWithGoogle={handleLoginWithGoogle} errorMessage={error} />
            <Footer />
        </main >
    )
}