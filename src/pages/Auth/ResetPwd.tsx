import { useRef, useState } from "react";
import { supabase } from "../../supabase/client.ts";
import { Link } from "react-router";
import { AlertCircle } from "lucide-react";

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const timeoutId = useRef<number | null>(null);

    const handleResetPassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/create-new-password`
            });

            if (error) {
                setError(error.status === 429 ? `Too many requests. Please wait a few minutes before trying to reset your password again. ` : `Oops, something went wrong! Try again later`);
                setSent(false);
                if (timeoutId.current) {
                    clearTimeout(timeoutId.current);
                }

                timeoutId.current = setTimeout(() => {
                    setError("");
                }, 4000);

                return;
            }

            setSent(true);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full px-4 py-3 bg-(--cream) border-[1.5px] border-border focus:border-(--teal) rounded-lg text-(--navy) text-[15px] outline-none font-body transition-colors duration-200";

    if (sent) {
        return (
            <div className="min-h-screen bg-(--cream) flex items-center justify-center font-body p-6">
                <div className="w-full max-w-[420px] p-10 bg-white rounded-2xl border border-border text-center">
                    <div className="w-14 h-14 rounded-full bg-[rgba(26,92,69,0.1)] flex items-center justify-center mx-auto mb-6 text-2xl text-(--teal)">✉</div>
                    <h2 className="font-display text-2xl font-normal text-(--navy) mb-3">Check your inbox</h2>
                    <p className="text-muted-foreground text-[15px] leading-[1.7] mb-8">
                        We sent a password reset link to <strong className="text-(--navy)">{email}</strong>. It expires in 15 minutes.
                    </p>
                    <Link to="/login" className="inline-block text-(--teal) hover:text-(--teal-light) text-sm no-underline font-medium transition-colors">← Back to sign in</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-(--cream) flex items-center justify-center font-body p-6">
            <div className="w-full max-w-[440px]">
                <div className="text-center mb-10">
                    <Link to="/" className="font-display text-3xl text-(--navy) no-underline tracking-tight">
                        naao<span className="text-(--amber)">.</span>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-border p-10">
                    <div className="mb-8">
                        <h1 className="font-display text-3xl text-(--navy) mb-2">Reset password</h1>
                        <p className="text-muted-foreground text-sm leading-[1.6]">
                            Enter the email address associated with your account and we'll send you a link to reset your password.
                        </p>
                    </div>

                    <form onSubmit={handleResetPassword}>
                        <div className="mb-6">
                            <label className="block text-[13px] font-medium text-(--navy) mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="sarah@clinic.com"
                                required
                                className={inputClass}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] border-none rounded-lg text-[15px] font-medium cursor-pointer font-body transition-colors duration-200 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Sending..." : "Send reset link"}
                        </button>

                        <div className="text-center">
                            <Link to="/login" className="text-muted-foreground text-sm no-underline hover:text-(--teal) transition-colors">← Back to sign in</Link>
                        </div>
                    </form>

                    {error && (
                        <div className="flex items-center gap-2 p-3.5 mb-1 mt-6 bg-[#FDF2F2] border border-[#FDE8E8] rounded-lg justify-center text-[#9B1C1C] font-medium text-[13px] font-body w-full">
                            <AlertCircle className="w-4 h-4 text-[#9B1C1C]" />
                            <span>{error}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}