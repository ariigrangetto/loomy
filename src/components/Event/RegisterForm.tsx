import { useState } from "react";
import { Link } from "react-router";

interface Props {
    onHandleSubmit: (formData: FormData) => void;
    errorMessage: string;
    successfulMessage: string;
}

export const RegisterForm: React.FC<Props> = (props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <div className="w-full max-w-[450px] bg-white dark:bg-[#15151e] rounded-[16px] p-8 sm:p-10 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-gray-100 dark:border-white/5 transition-colors duration-300">
            <div className="mb-8">
                <h2 className="text-[22px] font-bold text-[#1a1a2e] dark:text-white mb-1.5 transition-colors duration-300">Create an account</h2>
                <p className="text-gray-500 dark:text-gray-400 text-[14px] transition-colors duration-300">Join the professional suite.</p>
            </div>

            <form className="flex flex-col gap-6" action={props.onHandleSubmit}>
                <div className="flex justify-center m-auto w-full">
                    <button className="flex items-center justify-center gap-4 text-[14px] font-medium text-gray-700 dark:text-gray-200 border border-gray-200/50 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 rounded-[12px] px-4 py-2.5 cursor-pointer w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/30">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span>Continue with Google</span>
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-[#4a4a5e] dark:text-gray-400 uppercase tracking-widest transition-colors duration-300" htmlFor="name">First Name</label>
                        <input
                            id="name"
                            className="w-full px-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 autofill:[box-shadow:0_0_0_1000px_#f3f4f6_inset] dark:autofill:[box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color: #000000] dark:autofill:[-webkit-text-fill-color:#ffffff]"
                            type="text"
                            placeholder="Enter first name"
                            name="name"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-[#4a4a5e] dark:text-gray-400 uppercase tracking-widest transition-colors duration-300" htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            className="w-full px-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 autofill:[box-shadow:0_0_0_1000px_#f3f4f6_inset] dark:autofill:[box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color: #000000] dark:autofill:[-webkit-text-fill-color:#ffffff]"
                            type="text"
                            placeholder="Enter last name"
                            name="lastname"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#4a4a5e] dark:text-gray-400 uppercase tracking-widest transition-colors duration-300" htmlFor="email">Professional Email</label>
                    <input
                        id="email"
                        className="w-full px-4 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 autofill:[box-shadow:0_0_0_1000px_#f3f4f6_inset] dark:autofill:[box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color: #000000] dark:autofill:[-webkit-text-fill-color:#ffffff]"
                        type="text"
                        placeholder="name@atelier.com"
                        name="email"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold text-[#4a4a5e] dark:text-gray-400 uppercase tracking-widest transition-colors duration-300" htmlFor="password">Password</label>
                    <div className="relative flex items-center">
                        <input
                            id="password"
                            className="w-full pl-4 pr-16 py-3 bg-[#f3f4f6] dark:bg-white/5 border border-transparent dark:border-white/5 rounded-[12px] text-gray-900 dark:text-white text-[14px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#6b58dc]/40 focus:bg-white dark:focus:bg-[#1a1a24] focus:border-[#6b58dc]/30 transition-all duration-200 tracking-widest autofill:[box-shadow:0_0_0_1000px_#f3f4f6_inset] dark:autofill:[box-shadow:0_0_0_1000px_#1f2937_inset] autofill:[-webkit-text-fill-color: #000000] dark:autofill:[-webkit-text-fill-color:#ffffff]"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            name="password"
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
                    Join Loomy <span className="text-[16px] leading-none mb-[2px] font-light">&rarr;</span>
                </button>
            </form>

            {
                props.errorMessage && (
                    <div className="mt-5 p-3.5 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-[12px] text-red-500 dark:text-red-400 text-[13px] text-center font-medium animate-fadeIn">
                        {props.errorMessage}
                    </div>
                )
            }

            {
                props.successfulMessage && (
                    <div className="mt-5 p-3.5 bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 rounded-[12px] text-green-500 dark:text-green-400 text-[13px] text-center font-medium animate-fadeIn">
                        {props.successfulMessage}
                    </div>
                )
            }

            <div className="pt-8 mt-2 border-t border-gray-50 dark:border-white/5 text-center transition-colors duration-300">
                <Link to="/login" className="text-[13px] text-gray-500 dark:text-gray-400 font-medium hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    Already have an account? <span className="font-semibold text-[#6b58dc] dark:text-[#8271eb] hover:text-[#5a46c8] dark:hover:text-[#9788ed] transition-colors ml-1">Log in</span>
                </Link>
            </div>
        </div>
    )
}