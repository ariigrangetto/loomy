import { useRef, useState } from "react";
import { supabase } from "../../supabase/client.ts";
import { AlertCircle, CheckCircle, Mail } from "lucide-react";
import ButtonTheme from "../../components/Event/toggleTheme.tsx";
import { ResetPasswordForm } from "../../components/Event/ResetPasswordForm.tsx";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const timeoutId = useRef<number | null>(null);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        setSuccess(false);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/update-password`
            });

            if (error) {
                setError(error.status === 429 ? `Too many requests. Please wait a few minutes before trying to reset your password again. ` : `Oops, something went wrong! Try again later`);
                setSuccess(false);
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current);
                }

                timeoutId.current = setTimeout(() => {
                    setError("");
                }, 4000);

                return;
            }

            setSuccess(true);
            setMessage("Check your email for instructions to reset your password.");

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-full p-6 bg-[#f7f7f9] dark:bg-[#0f0f13] relative font-sans transition-colors duration-300">
            <div className="absolute top-6 right-6">
                <ButtonTheme />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white dark:bg-[#15151e] rounded-[16px] p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 transition-colors duration-300">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 bg-[#e2dfff] dark:bg-[#7460ed]/20 rounded-full mb-4 shadow-inner">
                            <Mail className="w-8 h-8 text-[#7460ed] dark:text-[#c084fc]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Reset Password</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Enter your email address and we'll send you instructions to reset it.
                        </p>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg justify-center">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="flex items-center gap-2 p-3 mb-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600 dark:text-green-400">{message}</span>
                        </div>
                    )}

                    <ResetPasswordForm onHandleResetPassword={handleResetPassword} email={email} loading={loading} setEmail={setEmail} />
                </div>
            </div>
        </main>
    );
}