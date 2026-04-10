import { useRef, useState } from "react"
import useUser from "../hooks/useUser.tsx"
import { Link } from "react-router"

interface State {
    email: string
    password: string
}

export default function Login() {
    const [state, setState] = useState<State>({ email: "", password: "" })
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setErrorMessage] = useState<string>("");
    const { login } = useUser();
    const timeout = useRef<number | null>(null);

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
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

    const handleBtn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = e;
        setState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }


    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f7f7f9] relative font-sans">
            <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 bottom-0 w-[1px] bg-white/80"></div>
                <div className="absolute left-0 right-0 h-[1px] bg-white/80"></div>
            </div>

            <div className="relative z-10 w-full max-w-[420px]">
                <div className="text-center mb-10">
                    <img src="/icon.png" alt="Loomy Icon" className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-[36px] font-extrabold text-[#1a1a2e] tracking-tight mb-2">Loomy</h1>
                    <p className="text-[10px] font-bold text-gray-500 tracking-[0.25em] uppercase">The Digital Atelier</p>
                </div>

                <div className="bg-white rounded-[16px] p-8 sm:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100">
                    <div className="mb-8">
                        <h2 className="text-[22px] font-bold text-[#1a1a2e] mb-1.5">Welcome back</h2>
                        <p className="text-gray-500 text-[14px]">Sign in to your professional suite.</p>
                    </div>

                    <form className="flex flex-col gap-6" action="submit" onSubmit={handleSubmitForm}>
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-[#4a4a5e] uppercase tracking-widest" htmlFor="email">Professional Email</label>
                            <input
                                id="email"
                                className="w-full px-4 py-3.5 bg-[#f3f4f6] border border-transparent rounded-[12px] text-gray-900 text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 focus:bg-white focus:border-[#6b58dc]/30 transition-all"
                                type="text"
                                placeholder="name@atelier.com"
                                name="email"
                                onChange={handleBtn}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-[#4a4a5e] uppercase tracking-widest" htmlFor="password">Password</label>
                                <a href="#" className="text-[11px] font-bold text-[#6b58dc] hover:text-[#5a46c8] transition-colors" tabIndex={-1}>Forgot?</a>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    id="password"
                                    className="w-full pl-4 pr-16 py-3.5 bg-[#f3f4f6] border border-transparent rounded-[12px] text-gray-900 text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/20 focus:bg-white focus:border-[#6b58dc]/30 transition-all tracking-widest"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    name="password"
                                    onChange={handleBtn}
                                />
                                <button
                                    className="absolute right-4 text-[12px] font-semibold text-gray-400 hover:text-[#6b58dc] focus:outline-none transition-colors"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            className="mt-2 w-full py-4 px-4 bg-[#7460ed] hover:bg-[#6250cc] text-white text-[15px] font-semibold rounded-[12px] shadow-sm hover:shadow-md transform transition-all active:scale-[0.98] outline-none focus:ring-2 focus:ring-[#7460ed]/50 focus:ring-offset-2 flex justify-center items-center gap-2"
                            type="submit"
                        >
                            Enter Atelier <span className="text-[16px] leading-none mb-[2px] font-light">&rarr;</span>
                        </button>
                    </form>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-[12px] text-red-500 text-[13px] text-center font-medium">
                            {error}
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                        <Link to="/register" className="text-[13px] text-gray-500 font-medium">
                            New to the platform? <span className="font-semibold text-[#6b58dc] hover:text-[#5a46c8] transition-colors ml-1">Join Loomy</span>
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-center text-[11px] font-semibold text-gray-400 flex justify-center items-center gap-4">
                    <p className="hover:text-gray-600 transition-colors">All rights reserved &copy; 2026</p>
                </div>
            </div>
        </main>
    )
}