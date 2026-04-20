import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../supabase/client.ts";
import { AlertCircle, CheckCircle, Mail, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        setSuccess(false);

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email);

            if (error) {
                throw error;
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
        <main className="flex h-screen items-center justify-center w-full p-6 bg-[#f7f7f9] dark:bg-[#16171d] transition-colors duration-200">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-[#1f2028] rounded-[16px] p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 transition-colors duration-200">
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
                        <div className="flex items-center gap-2 p-3 mb-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg">
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

                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-[#26272e] text-[#1a1a2e] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7460ed] focus:border-transparent transition-all duration-200"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 px-4 bg-[#7460ed] hover:bg-[#6a53d8] text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_12px_rgb(116,96,237,0.2)] hover:shadow-[0_6px_16px_rgb(116,96,237,0.3)]"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Sending...</span>
                                </div>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate("/login")}
                            className="inline-flex items-center gap-2 text-sm text-[#7460ed] hover:text-[#6a53d8] dark:text-[#c084fc] dark:hover:text-[#d8b4fe] font-medium transition-colors duration-200"
                        >
                            <ArrowLeft size={14} /> Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}