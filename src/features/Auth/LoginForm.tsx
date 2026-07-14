import { Eye, EyeClosedIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface Props {
    onLoginWithGoogle: () => Promise<void>;
    onSubmit: (e: React.SubmitEvent) => Promise<void>;
    onHandleBtn: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errorMessage: string;
    state: { email: string; password: string };
}

export const LoginForm: React.FC<Props> = (props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputClass = "w-full px-4 py-3 bg-white border-[1.5px] border-border focus:border-(--teal) rounded-lg text-(--navy) text-[15px] outline-none font-body transition-colors duration-200";

    return (
        <div className="grid grid-cols-2 min-h-screen font-body">
            <div className="bg-(--navy) flex flex-col p-12 relative overflow-hidden">
                <div className="absolute bottom-[-10%] left-[-15%] w-[500px] h-[500px] rounded-full [background:radial-gradient(circle,rgba(26,92,69,0.4)_0%,transparent_70%)] pointer-events-none" />
                <div className="absolute top-[30%] right-[-5%] w-[200px] h-[200px] rounded-full [background:radial-gradient(circle,rgba(212,151,58,0.15)_0%,transparent_70%)] pointer-events-none" />

                <Link to="/" className="font-display text-2xl text-[#F7F5F0] no-underline tracking-tight">
                    naao<span className="text-(--amber)">.</span>
                </Link>

                <div className="flex-1 flex flex-col justify-center pb-16">
                    <h2 className="font-display text-4xl font-light text-[#F7F5F0] leading-[1.15] mb-5 tracking-tight">
                        Your practice,<br /><em className="not-italic">beautifully organized.</em>
                    </h2>
                    <p className="text-[#F7F5F0]/50 text-sm leading-[1.7] max-w-[32ch]">
                        Sign in to access your dashboard and manage all your appointments in one place.
                    </p>
                </div>
            </div>

            <div className="bg-(--cream) flex flex-col items-center justify-center p-12">
                <div className="w-full max-w-[400px]">
                    <h1 className="font-display text-3xl text-(--navy) mb-2 tracking-tight">Welcome back</h1>
                    <p className="text-muted-foreground text-sm mb-10">
                        Don't have an account? <Link to="/register" className="text-(--teal) no-underline font-medium">Sign up</Link>
                    </p>

                    <form onSubmit={props.onSubmit}>
                        <div className="mb-5">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border-[1.5px] border-border rounded-lg text-(--navy) text-[15px] font-medium font-body cursor-pointer transition-all duration-200 hover:bg-(--cream) hover:border-(--teal)"
                                onClick={() => props.onLoginWithGoogle()}
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    className="w-5 h-5"
                                />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="flex items-center my-6">
                            <div className="flex-1 h-[1.5px] bg-border opacity-50" />
                            <span className="px-4 text-[12px] text-muted-foreground uppercase tracking-wider font-medium">or</span>
                            <div className="flex-1 h-[1.5px] bg-border opacity-50" />
                        </div>

                        <div className="mb-5">
                            <label className="block text-[13px] font-medium text-(--navy) mb-2">Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={props.state.email}
                                onChange={props.onHandleBtn}
                                placeholder="sarah@clinic.com"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-[13px] font-medium text-(--navy) mb-2">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={props.state.password}
                                    onChange={props.onHandleBtn}
                                    placeholder="••••••••"
                                    required
                                    className={`${inputClass} pr-12`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 bg-transparent border-none cursor-pointer flex items-center justify-center text-muted-foreground hover:text-(--teal) transition-colors duration-200 p-0 outline-none"
                                >
                                    {showPassword ? <EyeClosedIcon size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="text-right mb-8">
                            <Link to="/reset-password" className="text-muted-foreground text-[13px] no-underline hover:text-(--teal) transition-colors">Forgot password?</Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] border-none rounded-lg text-[15px] font-medium cursor-pointer font-body transition-colors duration-200 tracking-wide"
                        >
                            Sign in
                        </button>
                    </form>

                    {props.errorMessage && (
                        <div className="mt-5 p-3.5 bg-[#FDF2F2] border-[1.5px] border-[#FDE8E8] rounded-lg text-[#9B1C1C] text-[13px] text-center font-medium font-body w-full max-w-[400px]">
                            {props.errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}