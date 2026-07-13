import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router";

interface Props {
    onHandleResetPassword: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
    email: string,
    loading: boolean,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
}

export const ResetPasswordForm: React.FC<Props> = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <form onSubmit={props.onHandleResetPassword} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            aria-label="Email Address"
                            type="email"
                            value={props.email}
                            onChange={(e) => props.setEmail(e.target.value)}
                            required
                            disabled={props.loading}
                            className="w-full pl-10 pr-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 autofill:[box-shadow:0_0_0_1000px_#f3f4f6_inset] dark:autofill:[box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color: #000000] dark:autofill:[-webkit-text-fill-color:#ffffff]"
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={props.loading}
                    className="mt-3 w-full py-3.5 px-4 bg-[#7460ed] hover:bg-[#6250cc] dark:bg-[#6b58dc] dark:hover:bg-[#5a46c8] text-white text-[15px] font-medium rounded-[12px] shadow-[0_4px_12px_rgba(116,96,237,0.2)] hover:shadow-[0_6px_16px_rgba(116,96,237,0.3)] transform transition-all duration-200 active:scale-[0.98] outline-none focus:ring-2 focus:ring-[#7460ed]/50 focus:ring-offset-2 dark:focus:ring-offset-[#15151e] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {props.loading ? (
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
        </>
    )
}