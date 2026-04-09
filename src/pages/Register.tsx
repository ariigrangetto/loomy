import { useRef, useState } from "react";
import useUser from "../hooks/useUser.tsx";


interface State {
    email: string
    password: string
    name: string
    lastName: string
}

export default function Register() {

    const [state, setState] = useState<State>({ email: "", password: "", name: "", lastName: "" })
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [error, setErrorMessage] = useState<string>("");
    const { register } = useUser();
    const timeout = useRef<number | null>(null);

    const handleSubmitForm = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = await register(state.email, state.name, state.password, state.lastName);
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
        <main className="min-h-screen flex items-center justify-center p-6 bg-linear-to-br from-gray-900 via-[#1a1c29] to-black relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]"></div>
                <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[60%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 sm:p-10 shadow-2xl transition-all">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Loomy</h1>
                </div>

                <form className="flex flex-col gap-6" action="submit" onSubmit={handleSubmitForm}>
                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs font-bold text-gray-300 uppercase tracking-widest ml-1" htmlFor="name">Name</label>
                        <input
                            id="name"
                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                            type="text"
                            placeholder="Enter name..."
                            name="name"
                            onChange={handleBtn}
                        />

                        <label className="text-xs font-bold text-gray-300 uppercase tracking-widest ml-1" htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                            type="text"
                            placeholder="Enter last name..."
                            name="lastName"
                            onChange={handleBtn}
                        />

                        <label className="text-xs font-bold text-gray-300 uppercase tracking-widest ml-1"
                            htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="w-full px-5 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                            type="text"
                            placeholder="name@example.com"
                            name="email"
                            onChange={handleBtn}
                        />
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <label className="text-xs font-bold text-gray-300 uppercase tracking-widest ml-1" htmlFor="password">Password</label>
                        <div className="relative flex items-center">

                            <input
                                id="password"
                                className="w-full pl-5 pr-20 py-4 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                name="password"
                                onChange={handleBtn}
                            />
                            <button
                                className="absolute right-5 text-sm font-semibold text-gray-400 hover:text-indigo-400 focus:outline-none transition-colors"
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        className="mt-2 w-full py-4 px-4 bg-white  text-[18px] hover:bg-gray-100 text-gray-900 font-semibold rounded-2xl transform transition-all active:scale-[0.98] outline-none cursor-pointer"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center text-gray-400 flex justify-center gap-2 mt-10 p-5 text-sm">Already have an account? <a href="/login" className="text-white font-bold hover:underline">Login</a></p>
                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm text-center font-semibold">
                        {error}
                    </div>
                )}
            </div>
        </main>
    )
}