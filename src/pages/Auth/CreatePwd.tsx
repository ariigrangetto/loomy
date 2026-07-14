import { AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../supabase/client.ts";
import { Link, useNavigate } from "react-router";

export default function CreateNewPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);

    const handleUpdatePassword = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            setLoading(false);
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        };

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            setLoading(false);
            setTimeout(() => {
                setError("");
            }, 3000);
            return;
        };

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

    const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
    const strengthColorClass = ['bg-transparent', 'bg-[#E05252]', 'bg-(--amber)', 'bg-(--teal)'][strength];
    const strengthTextColorClass = ['text-transparent', 'text-[#E05252]', 'text-(--amber)', 'text-(--teal)'][strength];
    const strengthLabel = ['', 'Weak', 'Fair', 'Strong'][strength];

    const inputClass = "w-full px-4 py-3 bg-(--cream) border-[1.5px] border-border focus:border-(--teal) rounded-lg text-(--navy) text-[15px] outline-none font-body transition-colors duration-200";

    return (
        <div className="min-h-screen bg-(--cream) flex items-center justify-center font-body p-6">
            <div className="w-full max-w-[440px]">
                <div className="text-center mb-10">
                    <Link to="/" className="font-display text-3xl text-(--navy) no-underline">
                        naao<span className="text-(--amber)">.</span>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-border p-10">
                    <h1 className="font-display text-3xl text-(--navy) mb-2">Create new password</h1>
                    <p className="text-muted-foreground text-sm leading-[1.6] mb-8">
                        Your new password must be at least 8 characters and different from your previous password.
                    </p>

                    <form onSubmit={handleUpdatePassword}>
                        <div className="mb-5">
                            <label className="block text-[13px] font-medium text-(--navy) mb-2">New password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Min. 8 characters"
                                required
                                minLength={8}
                                className={inputClass}
                            />

                            {password.length > 0 && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[1, 2, 3].map(l => (
                                            <div
                                                key={l}
                                                className={`flex-1 h-[3px] rounded-[2px] transition-all duration-300 ${strength >= l ? strengthColorClass : 'bg-border'}`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-[12px] font-medium ${strengthTextColorClass}`}>{strengthLabel}</p>
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <label className="block text-[13px] font-medium text-(--navy) mb-2">Confirm new password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className={`${inputClass} ${confirmPassword && confirmPassword !== password ? 'border-[#E05252] focus:border-[#E05252]' : 'border-border focus:border-(--teal)'}`}
                            />
                            {confirmPassword && confirmPassword !== password && (
                                <p className="text-[12px] text-[#E05252] mt-1.5">Passwords do not match</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={password !== confirmPassword || password.length < 8 || loading}
                            className={`w-full py-3.5 border-none rounded-lg text-[15px] font-medium font-body transition-colors duration-200 ${
                                password === confirmPassword && password.length >= 8 && !loading
                                    ? 'bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] cursor-pointer'
                                    : 'bg-border text-muted-foreground cursor-not-allowed'
                            }`}
                        >
                            {loading ? "Updating..." : "Update password"}
                        </button>
                    </form>
                </div>

                {error && (
                    <div className="flex items-center gap-2 p-3.5 mb-1 mt-10 bg-[#FDF2F2] border border-[#FDE8E8] rounded-lg justify-center text-[#9B1C1C] font-medium text-[13px] font-body">
                        <AlertCircle className="w-4 h-4 text-[#9B1C1C]" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="flex items-center gap-2 p-3.5 mb-1 mt-10 bg-[#EDFDF5] border border-[#DEF7EC] rounded-lg justify-center text-[#03543F] font-medium text-[13px] font-body">
                        <CheckCircle className="w-4 h-4 text-[#03543F]" />
                        <span>{message}</span>
                    </div>
                )}
            </div>
        </div>
    )
}