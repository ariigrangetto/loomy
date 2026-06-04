import { useRef, useState } from "react"
import useUser from "../hooks/useUser.tsx"
import { Link, useNavigate } from "react-router"
import useTheme from "../hooks/useTheme.tsx"
import { Moon, Sun } from "lucide-react"

interface State {
    email: string
    password: string
}

export default function Login() {
    const [state, setState] = useState<State>({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setErrorMessage] = useState<string>("");
    const { login, loginWithGoogle } = useUser();
    const navigate = useNavigate();
    const timeout = useRef<number | null>(null);
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        if (state.email.trim() === "") {
            setErrorMessage("Email is required");
        }
        const error = await login(state.email, state.password);
        if (error) {
            setErrorMessage(error && "status" in error && (error as any).status === 400 ? "The email is not registered" : "Something went wrong. Please try again!");
        }

        if (timeout.current) {
            clearTimeout(timeout.current);
        }
        timeout.current = setTimeout(() => {
            setErrorMessage("");
        }, 3000);

    }

    const handleResetPassword = () => {
        navigate("/resetPassword");
    }

    const handleBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f7f7f9] dark:bg-[#0f0f13] relative font-sans transition-colors duration-300">
            <div className="absolute top-6 right-6">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-200/50 dark:hover:bg-white/10 rounded-[12px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/30"
                    title="Change Theme"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>


            <div className="relative z-10 w-full max-w-[420px]">
                <div className="text-center mb-10">
                    <img src="/icon.png" alt="Loomy Icon" className="w-16 h-16 mx-auto mb-4 drop-shadow-sm" />
                    <h1 className="text-[36px] font-extrabold text-[#1a1a2e] dark:text-white tracking-tight mb-2 transition-colors duration-300">Loomy</h1>
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.25em] uppercase transition-colors duration-300">The Digital Atelier</p>
                </div>

                <div className="bg-white dark:bg-[#15151e] rounded-[16px] p-8 sm:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 transition-colors duration-300">
                    <div className="mb-8">
                        <h2 className="text-[22px] font-bold text-[#1a1a2e] dark:text-white mb-1.5 transition-colors duration-300">Welcome back</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-[14px] transition-colors duration-300">Sign in to your professional suite.</p>
                    </div>


                    <div className="flex justify-center m-auto w-full">
                        <button className="flex items-center justify-center gap-4 text-[14px] font-medium text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 rounded-[12px] px-4 py-2.5 cursor-pointer w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/30" onClick={() => loginWithGoogle()}>
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span>Continue with Google</span>
                        </button>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-100 dark:border-white/5 transition-colors duration-300"></div>
                        <span className="px-3 text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest transition-colors duration-300">or</span>
                        <div className="flex-1 border-t border-gray-100 dark:border-white/5 transition-colors duration-300"></div>
                    </div>

                    <form className="flex flex-col gap-5" action="submit" onSubmit={handleSubmitForm}>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-[#4a4a5e] dark:text-gray-400 uppercase tracking-widest transition-colors duration-300" htmlFor="email">Professional Email</label>
                            </div>
                            <input
                                id="email"
                                className="w-full px-4 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200"
                                type="text"
                                placeholder="name@atelier.com"
                                name="email"
                                onChange={handleBtn}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-[#4a4a5e] dark:text-gray-400 uppercase tracking-widest transition-colors duration-300" htmlFor="password">Password</label>
                                <button type="button" onClick={() => handleResetPassword()} className="text-[11px] font-bold text-[#6b58dc] hover:text-[#5a46c8] dark:text-[#8271eb] dark:hover:text-[#9788ed] transition-colors focus:outline-none" tabIndex={-1}>Forgot?</button>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    id="password"
                                    className="w-full pl-4 pr-16 py-2.5 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 tracking-widest"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    name="password"
                                    onChange={handleBtn}
                                />
                                <button
                                    className="absolute right-4 text-[12px] font-medium text-gray-400 hover:text-[#6b58dc] dark:hover:text-[#8271eb] focus:outline-none transition-colors"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            className="mt-3 w-full py-3 px-4 bg-[#7460ed] hover:bg-[#6250cc] dark:bg-[#6b58dc] dark:hover:bg-[#5a46c8] text-white text-[15px] font-medium rounded-[12px] shadow-[0_4px_12px_rgba(116,96,237,0.2)] hover:shadow-[0_6px_16px_rgba(116,96,237,0.3)] transform transition-all duration-200 active:scale-[0.98] outline-none focus:ring-2 focus:ring-[#7460ed]/50 focus:ring-offset-2 dark:focus:ring-offset-[#15151e] flex justify-center items-center gap-2"
                            type="submit"
                        >
                            Enter Atelier <span className="text-[16px] leading-none mb-[2px] font-light">&rarr;</span>
                        </button>
                    </form>

                    {error && (
                        <div className="mt-5 p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-[12px] text-red-500 dark:text-red-400 text-[13px] text-center font-medium animate-fadeIn">
                            {error}
                        </div>
                    )}

                    <div className="pt-8 mt-8 border-t border-gray-50 dark:border-white/5 text-center transition-colors duration-300">
                        <Link to="/register" className="text-[13px] text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                            New to the platform? <span className="font-semibold text-[#6b58dc] dark:text-[#8271eb] hover:text-[#5a46c8] dark:hover:text-[#9788ed] transition-colors ml-1">Join Loomy</span>
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-center text-[11px] font-medium text-gray-400 dark:text-gray-500 opacity-80">
                    <p className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer">All rights reserved &copy; {new Date().getFullYear()}</p>
                </div>
            </div>
        </main >
    )
}