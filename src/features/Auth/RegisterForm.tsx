import { Eye, EyeClosedIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

interface Props {
    onHandleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    errorMessage: string;
    successfulMessage: string;
}

export const RegisterForm: React.FC<Props> = (props) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputClass = "w-full px-4 py-3 bg-white border-[1.5px] border-[var(--border)] focus:border-[var(--teal)] rounded-lg text-[var(--navy)] text-[15px] outline-none font-body transition-colors duration-200";

    return (
        <div className="min-h-screen bg-background font-body grid grid-cols-2">
            <div className="bg-(--navy) flex flex-col p-12 relative overflow-hidden">
                <div className="absolute top-[-5%] right-[-10%] w-[350px] h-[350px] rounded-full [background:radial-gradient(circle,rgba(26,92,69,0.35)_0%,transparent_70%)] pointer-events-none" />

                <Link to="/" className="font-display text-2xl text-[#F7F5F0] no-underline">
                    naao<span className="text-(--amber)">.</span>
                </Link>

                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="font-display text-4xl font-light text-[#F7F5F0] leading-[1.15] mb-5">
                        Start managing<br /><em className="text-(--amber) not-italic">smarter, today.</em>
                    </h2>
                    <p className="text-[#F7F5F0]/50 text-sm leading-[1.7] max-w-[30ch] mb-12">
                        Set up your practice profile in under 2 minutes and start scheduling instantly.
                    </p>

                    <div className="flex flex-col gap-5">
                        {[
                            { icon: '✓', text: 'AI-powered slot suggestions included' },
                            { icon: '✓', text: 'No credit card required' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-[rgba(26,92,69,0.4)] flex items-center justify-center text-(--teal) text-[10px] font-semibold border border-[rgba(26,92,69,0.5)] shrink-0">{item.icon}</span>
                                <span className="text-[#F7F5F0]/65 text-sm">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center p-12">
                <div className="w-full max-w-[400px]">
                    <h1 className="font-display text-3xl text-(--navy) mb-2">Create account</h1>
                    <p className="text-muted-foreground text-sm mb-8">
                        Already registered? <Link to="/login" className="text-(--teal) no-underline font-medium">Sign in</Link>
                    </p>

                    <form onSubmit={props.onHandleSubmit}>
                        <div className="mb-5">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white border-[1.5px] border-border rounded-lg text-(--navy) text-[15px] font-medium font-body cursor-pointer transition-all duration-200 hover:bg-(--cream) hover:border-(--teal)"
                            >
                                <img
                                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                                    alt="Google"
                                    style={{ width: '1.25rem', height: '1.25rem' }}
                                />
                                <span>Continue with Google</span>
                            </button>
                        </div>

                        <div className="flex items-center my-6">
                            <div className="flex-1 h-[1.5px] bg-border opacity-50" />
                            <span className="px-4 text-[12px] text-muted-foreground uppercase tracking-wider font-medium">or</span>
                            <div className="flex-1 h-[1.5px] bg-border opacity-50" />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Name</label>
                                <input type="text" name="name" placeholder="Dr. Sarah Mitchell" required className={inputClass} />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Lastname</label>
                                <input type="text" name="lastname" placeholder="Sunrise Clinic" required className={inputClass} />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Email address</label>
                            <input type="email" name="email" placeholder="sarah@sunriseclinic.com" required className={inputClass} />
                        </div>

                        <div className="mb-4">
                            <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Password</label>
                            <div className="relative flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Min. 8 characters"
                                    required
                                    minLength={8}
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

                        <div className="mb-8">
                            <label className="block text-[13px] font-medium text-(--navy) mb-1.5">Confirm password</label>
                            <input type="password" name="confirm-password" placeholder="••••••••" required className={inputClass} />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3.5 bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] border-none rounded-lg text-[15px] font-medium cursor-pointer font-body transition-colors duration-200"
                        >
                            Create account
                        </button>

                        <p className="text-muted-foreground text-[12px] text-center mt-5 leading-[1.6]">
                            By continuing, you agree to our <a href="#" className="text-(--teal) no-underline">Terms</a> and <a href="#" className="text-(--teal) no-underline">Privacy Policy</a>.
                        </p>
                    </form>
                </div>

                {
                    props.errorMessage && (
                        <div className="mt-5 p-3.5 bg-[#FDF2F2] border-[1.5px] border-[#FDE8E8] rounded-lg text-[#9B1C1C] text-[13px] text-center font-medium font-body w-full max-w-[400px]">
                            {props.errorMessage}
                        </div>
                    )
                }

                {
                    props.successfulMessage && (
                        <div className="mt-5 p-3.5 bg-[#EDFDF5] border-[1.5px] border-[#DEF7EC] rounded-lg text-[#03543F] text-[13px] text-center font-medium font-body w-full max-w-[400px]">
                            {props.successfulMessage}
                        </div>
                    )
                }
            </div>
        </div>
    )
}