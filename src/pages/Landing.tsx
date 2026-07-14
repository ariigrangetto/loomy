import { Link } from "react-router";

export default function Landing() {
    return (
        <div className="font-body bg-(--navy) text-[#F7F5F0] min-h-screen">
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 border-b border-[#F7F5F0]/8 backdrop-blur-md bg-[#0D1B2A]/85">
                <div className="font-display text-2xl tracking-tight text-[#F7F5F0]">
                    naao<span className="text-(--amber)">.</span>
                </div>
                <div className="flex gap-10 items-center">
                    <a href="#features" className="text-[#F7F5F0]/65 hover:text-[#F7F5F0] text-sm no-underline transition-colors duration-200">Features</a>
                    <a href="#how-it-works" className="text-[#F7F5F0]/65 hover:text-[#F7F5F0] text-sm no-underline transition-colors duration-200">How it works</a>
                    <Link to="/login" className="text-[#F7F5F0]/65 hover:text-[#F7F5F0] text-sm no-underline transition-colors duration-200">Sign in</Link>
                    <Link
                        to="/register"
                        className="bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] px-5 py-2 rounded-md text-sm no-underline font-medium transition-colors duration-200"
                    >
                        Get started
                    </Link>
                </div>
            </nav>

            <section className="min-h-screen grid grid-cols-2 gap-0 pt-20">
                <div className="flex flex-col justify-center pl-20 pr-12 py-24">
                    <div className="inline-flex items-center gap-2 bg-[#D4973A]/12 border border-[#D4973A]/30 rounded-full px-3.5 py-1 mb-8 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-(--amber) inline-block" />
                        <span className="text-(--amber) text-[12px] font-medium tracking-wider uppercase">AI-powered scheduling</span>
                    </div>
                    <h1 className="font-display text-[clamp(2.75rem,5vw,4.5rem)] font-light leading-[1.1] mb-7 text-[#F7F5F0] tracking-tighter">
                        Appointments that<br />
                        <em className="italic text-(--amber)">run themselves.</em>
                    </h1>
                    <p className="text-[18px] leading-[1.7] text-[#F7F5F0]/60 max-w-[36ch] mb-10">
                        Naao brings intelligent scheduling to your practice. Manage clients, track appointments, and let AI suggest the perfect next slot.
                    </p>
                    <div className="flex gap-4 items-center">
                        <Link
                            to="/register"
                            className="bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] px-8 py-3.5 rounded-lg text-[15px] no-underline font-medium inline-flex items-center gap-2 transition-colors duration-200"
                        >
                            Start for free
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                        <a href="#how-it-works" className="text-[#F7F5F0]/50 hover:text-[#F7F5F0] text-sm no-underline flex items-center gap-1.5 transition-colors">
                            See how it works
                        </a>
                    </div>
                </div>

                <div className="relative flex items-center justify-center pl-8 pr-16 py-24 overflow-hidden">
                    <div
                        className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(26,92,69,0.35) 0%, transparent 70%)' }}
                    />
                    <div
                        className="absolute bottom-[10%] left-[5%] w-[250px] h-[250px] rounded-full pointer-events-none"
                        style={{ background: 'radial-gradient(circle, rgba(212,151,58,0.12) 0%, transparent 70%)' }}
                    />

                    <div className="bg-white/4 border border-[#F7F5F0]/10 rounded-2xl p-7 w-full max-w-[420px] backdrop-blur-md">
                        <div className="flex items-center justify-between mb-5">
                            <span className="font-display text-[16px] text-[#F7F5F0]/85">Today's appointments</span>
                            <span className="font-mono text-[12px] text-(--amber) bg-[#D4973A]/12 px-2.5 py-1 rounded-full">Jul 7</span>
                        </div>
                        {[
                            { name: 'Sarah Mitchell', time: '09:00 AM', type: 'Highlights', status: 'completed', color: '#3D8470', badgeClass: 'text-(--teal)' },
                            { name: 'James Okafor', time: '10:30 AM', type: 'Trim', status: 'completed', color: '#3D8470', badgeClass: 'text-(--teal)' },
                            { name: 'Priya Anand', time: '12:00 PM', type: 'Shampoo and blow-dry', status: 'pending', color: '#D4973A', badgeClass: 'text-(--amber)' },
                            { name: 'Luis Fernandez', time: '02:30 PM', type: 'Haircut', status: 'pending', color: '#D4973A', badgeClass: 'text-(--amber)' },
                        ].map((appt, i) => (
                            <div key={i} className="flex items-center gap-4 p-3.5 rounded-lg bg-white/3 mb-2 border border-[#F7F5F0]/5">
                                <div
                                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                                    style={{ backgroundColor: `${appt.color}22` }}
                                >
                                    <span style={{ color: appt.color }} className="text-[12px] font-semibold">{appt.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[#F7F5F0]/90 text-[13px] font-medium mb-0.5 truncate">{appt.name}</p>
                                    <p className="text-[#F7F5F0]/40 text-[11px] font-mono">{appt.type}</p>
                                </div>
                                <div className="text-right shrink-0">
                                    <p className="text-[#F7F5F0]/60 text-[12px] font-mono mb-1">{appt.time}</p>
                                    <span className={`text-[10px] font-medium uppercase tracking-wider ${appt.badgeClass}`}>{appt.status}</span>
                                </div>
                            </div>
                        ))}
                        <div className="mt-4 p-3.5 rounded-lg bg-linear-to-br from-[#1A5C45]/25 to-[#1A5C45]/10 border border-[#1A5C45]/30">
                            <div className="flex items-center gap-2 mb-1">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                <span className="text-[#F7F5F0]/50 text-[11px] font-medium uppercase tracking-wider">AI suggestion</span>
                            </div>
                            <p className="text-[#F7F5F0]/85 text-[13px]">Next available: <strong>Tomorrow, 11:00 AM</strong></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="px-20 py-32 border-t border-[#F7F5F0]/8">
                <div className="max-w-[1100px] mx-auto">
                    <div className="grid grid-cols-[1fr_2fr] gap-20 items-start">
                        <div>
                            <p className="text-(--amber) text-[12px] uppercase tracking-widest font-medium mb-4">Features</p>
                            <h2 className="font-display text-4xl font-light leading-[1.15] text-[#F7F5F0]">
                                Everything your practice needs
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                            {[
                                { icon: '◈', title: 'Smart scheduling', body: 'AI analyzes your patterns and suggests the best available slots, reducing gaps and no-shows.' },
                                { icon: '⊕', title: 'Client history', body: 'One-click access to full appointment history for any client, with notes and status tracking.' },
                                { icon: '⟐', title: 'Status tracking', body: 'Real-time appointment status with pending, completed, and expired states — always in control.' },
                                { icon: '◎', title: 'Expiry alerts', body: 'Automatic notifications for past appointments that need action, so nothing falls through the cracks.' },
                            ].map((f, i) => (
                                <div
                                    key={i}
                                    className="p-7 border border-[#F7F5F0]/8 rounded-xl bg-transparent hover:border-[#F7F5F0]/18 hover:bg-[#F7F5F0]/3 transition-all duration-200"
                                >
                                    <div className="text-2xl text-(--amber) mb-4">{f.icon}</div>
                                    <h3 className="font-display text-[17.5px] font-normal text-[#F7F5F0] mb-2.5">{f.title}</h3>
                                    <p className="text-[#F7F5F0]/50 text-sm leading-[1.65]">{f.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section id="how-it-works" className="px-20 py-32 border-t border-[#F7F5F0]/8">
                <div className="max-w-[1100px] mx-auto">
                    <p className="text-(--amber) text-[12px] uppercase tracking-widest font-medium mb-4 text-center">How it works</p>
                    <h2 className="font-display text-4xl font-light text-center text-[#F7F5F0] mb-20">Three steps to a smoother practice</h2>
                    <div className="grid grid-cols-3 gap-12">
                        {[
                            { step: '01', title: 'Add your clients', body: 'Register client details and appointment types. Build a complete picture of your practice.' },
                            { step: '02', title: 'Schedule with ease', body: 'Create appointments in seconds. Naao tracks status and reminds you of upcoming sessions.' },
                            { step: '03', title: 'Let AI guide you', body: 'Get intelligent slot suggestions based on your schedule patterns and client availability.' },
                        ].map((s, i) => (
                            <div key={i} className="relative pt-8 border-t border-[#F7F5F0]/15">
                                <span className="font-mono text-[12px] text-(--amber) tracking-wider block mb-5">{s.step}</span>
                                <h3 className="font-display text-[20px] font-normal text-[#F7F5F0] mb-3">{s.title}</h3>
                                <p className="text-[#F7F5F0]/50 text-sm leading-[1.7]">{s.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-20 py-32 border-t border-[#F7F5F0]/8">
                <div className="max-w-[700px] mx-auto text-center">
                    <h2 className="font-display text-[clamp(2.75rem,4vw,3.25rem)] font-light text-[#F7F5F0] mb-6 tracking-tight">
                        Ready to take back your time?
                    </h2>
                    <p className="text-[#F7F5F0]/50 text-[16px] mb-10">
                        Join thousands of practitioners using Naao to streamline their scheduling.
                    </p>
                    <Link
                        to="/register"
                        className="bg-(--amber) hover:opacity-90 text-[#0D1B2A] px-10 py-4 rounded-lg text-[15px] no-underline font-semibold inline-block transition-opacity duration-200"
                    >
                        Create your free account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-[#F7F5F0]/8 px-20 py-10 flex justify-between items-center">
                <div className="font-display text-[18px] text-[#F7F5F0]/60">naao<span className="text-(--amber)">.</span></div>
                <p className="text-[#F7F5F0]/30 text-[13px]">© 2026 Naao. All rights reserved.</p>
                <div className="flex gap-6">
                    {['Privacy', 'Terms', 'Contact'].map(l => (
                        <a key={l} href="#" className="text-[#F7F5F0]/35 hover:text-[#F7F5F0] text-[13px] no-underline transition-colors">{l}</a>
                    ))}
                </div>
            </footer>
        </div>
    )
}