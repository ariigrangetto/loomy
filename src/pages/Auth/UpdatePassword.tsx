import { AlertCircle, CheckCircle, Lock } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../supabase/client.ts";
import { useNavigate } from "react-router";
import ButtonTheme from "../../components/Event/toggleTheme.tsx";

export default function UpdatePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const { error } = await supabase.auth.updateUser({
                password
            });

            if (error) {
                setSuccess(false);
                setError(`Error updating password: ${error.message}`);
                return;
            }

            setMessage("Password updated successfully");
            setSuccess(true);

            setTimeout(() => {
                navigate("/");
            }, 3000);

        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="min-h-screen flex flex-col items-center justify-center w-full p-6 bg-[#f7f7f9] dark:bg-[#0f0f13] relative font-sans transition-colors duration-300">
            <div className="absolute top-6 right-6 z-20">
                <ButtonTheme />
            </div>
            <div className="relative z-10 w-full max-w-md">
                <div className="bg-white dark:bg-[#15151e] rounded-[16px] p-8 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 transition-colors duration-300">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 bg-[#e2dfff] dark:bg-[#7460ed]/20 rounded-full mb-4 shadow-inner">
                            <Lock className="w-8 h-8 text-[#7460ed] dark:text-[#c084fc]" />
                        </div>
                        <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white mb-2">Update Password</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                            Enter your new password to reset it.
                        </p>
                        <form onSubmit={handleUpdatePassword} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 mt-5">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        aria-label="New Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full pl-10 pr-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 autofill:[box-shadow:0_0_0_1000px_#f3f4f6_inset] dark:autofill:[box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color: #000000] dark:autofill:[-webkit-text-fill-color:#ffffff]"
                                        placeholder="**********"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        aria-label="Confirm Password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="w-full pl-10 pr-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 autofill:[box-shadow:0_0_0_1000px_#f3f4f6_inset] dark:autofill:[box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color: #000000] dark:autofill:[-webkit-text-fill-color:#ffffff]"
                                        placeholder="************"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="mt-3 w-full py-3.5 px-4 bg-[#7460ed] hover:bg-[#6250cc] dark:bg-[#6b58dc] dark:hover:bg-[#5a46c8] text-white text-[15px] font-medium rounded-[12px] shadow-[0_4px_12px_rgba(116,96,237,0.2)] hover:shadow-[0_6px_16px_rgba(116,96,237,0.3)] transform transition-all duration-200 active:scale-[0.98] outline-none focus:ring-2 focus:ring-[#7460ed]/50 focus:ring-offset-2 dark:focus:ring-offset-[#15151e] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        <span>Updating...</span>
                                    </div>
                                ) : (
                                    "Update Password"
                                )}
                            </button>
                        </form>

                        {error && (
                            <div className="flex items-center gap-2 p-3 mb-1 mt-10 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg justify-center">
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
                    </div>
                </div>
            </div>
        </main>
    )

}