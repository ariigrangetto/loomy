import { Link } from "react-router";

export default function Landing() {
    return (
        <div style={{ fontFamily: 'var(--font-body)', backgroundColor: 'var(--navy)', color: '#F7F5F0', minHeight: '100vh' }}>
            <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 3rem', borderBottom: '1px solid rgba(247,245,240,0.08)', backdropFilter: 'blur(12px)', backgroundColor: 'rgba(13,27,42,0.85)' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.02em', color: '#F7F5F0' }}>
                    naao<span style={{ color: 'var(--amber)' }}>.</span>
                </div>
                <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
                    <a href="#features" style={{ color: 'rgba(247,245,240,0.65)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}>Features</a>
                    <a href="#how-it-works" style={{ color: 'rgba(247,245,240,0.65)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}>How it works</a>
                    <Link to="/login" style={{ color: 'rgba(247,245,240,0.65)', fontSize: '0.875rem', textDecoration: 'none' }}>Sign in</Link>
                    <Link to="/register" style={{ backgroundColor: 'var(--teal)', color: '#F7F5F0', padding: '0.5rem 1.25rem', borderRadius: '0.375rem', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500, transition: 'background 0.2s' }}>Get started</Link>
                </div>
            </nav>
            <section style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, paddingTop: '80px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem 3rem 6rem 5rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(212,151,58,0.12)', border: '1px solid rgba(212,151,58,0.3)', borderRadius: '2rem', padding: '0.25rem 0.875rem', marginBottom: '2rem', width: 'fit-content' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--amber)', display: 'inline-block' }} />
                        <span style={{ color: 'var(--amber)', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>AI-powered scheduling</span>
                    </div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.75rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.1, marginBottom: '1.75rem', color: '#F7F5F0', letterSpacing: '-0.03em' }}>
                        Appointments that<br />
                        <em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>run themselves.</em>
                    </h1>
                    <p style={{ fontSize: '1.125rem', lineHeight: 1.7, color: 'rgba(247,245,240,0.6)', maxWidth: '36ch', marginBottom: '2.5rem' }}>
                        Naao brings intelligent scheduling to your practice. Manage clients, track appointments, and let AI suggest the perfect next slot.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <Link to="/register" style={{ backgroundColor: 'var(--teal)', color: '#F7F5F0', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontSize: '0.9375rem', textDecoration: 'none', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', transition: 'background 0.2s' }}>
                            Start for free
                            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </Link>
                        <a href="#how-it-works" style={{ color: 'rgba(247,245,240,0.5)', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            See how it works
                        </a>
                    </div>
                </div>

                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 4rem 6rem 2rem', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '20%', right: '-5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,92,69,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,151,58,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(247,245,240,0.1)', borderRadius: '1rem', padding: '1.75rem', width: '100%', maxWidth: '420px', backdropFilter: 'blur(8px)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'rgba(247,245,240,0.85)' }}>Today's appointments</span>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--amber)', backgroundColor: 'rgba(212,151,58,0.12)', padding: '0.2rem 0.6rem', borderRadius: '1rem' }}>Jul 7</span>
                        </div>
                        {[
                            { name: 'Sarah Mitchell', time: '09:00 AM', type: 'Highlights', status: 'completed', color: '#3D8470' },
                            { name: 'James Okafor', time: '10:30 AM', type: 'Trim', status: 'completed', color: '#3D8470' },
                            { name: 'Priya Anand', time: '12:00 PM', type: 'Shampoo and blow-dry', status: 'pending', color: '#D4973A' },
                            { name: 'Luis Fernandez', time: '02:30 PM', type: 'Haircut', status: 'pending', color: '#D4973A' },
                        ].map((appt, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.875rem', borderRadius: '0.5rem', backgroundColor: 'rgba(255,255,255,0.03)', marginBottom: '0.5rem', border: '1px solid rgba(247,245,240,0.05)' }}>
                                <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '50%', backgroundColor: `${appt.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <span style={{ color: appt.color, fontSize: '0.75rem', fontWeight: 600 }}>{appt.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ color: 'rgba(247,245,240,0.9)', fontSize: '0.8125rem', fontWeight: 500, marginBottom: '0.125rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.name}</p>
                                    <p style={{ color: 'rgba(247,245,240,0.4)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>{appt.type}</p>
                                </div>
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ color: 'rgba(247,245,240,0.6)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', marginBottom: '0.2rem' }}>{appt.time}</p>
                                    <span style={{ fontSize: '0.65rem', fontWeight: 500, color: appt.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{appt.status}</span>
                                </div>
                            </div>
                        ))}
                        <div style={{ marginTop: '1rem', padding: '0.875rem', borderRadius: '0.5rem', background: 'linear-gradient(135deg, rgba(26,92,69,0.25), rgba(26,92,69,0.1))', border: '1px solid rgba(26,92,69,0.3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                <span style={{ color: 'rgba(247,245,240,0.5)', fontSize: '0.7rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI suggestion</span>
                            </div>
                            <p style={{ color: 'rgba(247,245,240,0.8)', fontSize: '0.8rem' }}>Next available: <strong>Tomorrow, 11:00 AM</strong></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" style={{ padding: '8rem 5rem', borderTop: '1px solid rgba(247,245,240,0.08)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '5rem', alignItems: 'start' }}>
                        <div>
                            <p style={{ color: 'var(--amber)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, marginBottom: '1rem' }}>Features</p>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, lineHeight: 1.15, color: '#F7F5F0' }}>
                                Everything your practice needs
                            </h2>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {[
                                { icon: '◈', title: 'Smart scheduling', body: 'AI analyzes your patterns and suggests the best available slots, reducing gaps and no-shows.' },
                                { icon: '⊕', title: 'Client history', body: 'One-click access to full appointment history for any client, with notes and status tracking.' },
                                { icon: '⟐', title: 'Status tracking', body: 'Real-time appointment status with pending, completed, and expired states — always in control.' },
                                { icon: '◎', title: 'Expiry alerts', body: 'Automatic notifications for past appointments that need action, so nothing falls through the cracks.' },
                            ].map((f, i) => (
                                <div key={i} style={{ padding: '1.75rem', border: '1px solid rgba(247,245,240,0.08)', borderRadius: '0.75rem', transition: 'border-color 0.2s, background 0.2s' }} onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(247,245,240,0.18)'; (e.currentTarget as HTMLElement).style.background = 'rgba(247,245,240,0.03)' }} onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(247,245,240,0.08)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                                    <div style={{ fontSize: '1.5rem', color: 'var(--amber)', marginBottom: '1rem' }}>{f.icon}</div>
                                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 400, color: '#F7F5F0', marginBottom: '0.625rem' }}>{f.title}</h3>
                                    <p style={{ color: 'rgba(247,245,240,0.5)', fontSize: '0.875rem', lineHeight: 1.65 }}>{f.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" style={{ padding: '8rem 5rem', borderTop: '1px solid rgba(247,245,240,0.08)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <p style={{ color: 'var(--amber)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 500, marginBottom: '1rem', textAlign: 'center' }}>How it works</p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 300, textAlign: 'center', color: '#F7F5F0', marginBottom: '5rem' }}>Three steps to a smoother practice</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3rem' }}>
                        {[
                            { step: '01', title: 'Add your clients', body: 'Register client details and appointment types. Build a complete picture of your practice.' },
                            { step: '02', title: 'Schedule with ease', body: 'Create appointments in seconds. Naao tracks status and reminds you of upcoming sessions.' },
                            { step: '03', title: 'Let AI guide you', body: 'Get intelligent slot suggestions based on your schedule patterns and client availability.' },
                        ].map((s, i) => (
                            <div key={i} style={{ position: 'relative', paddingTop: '2rem', borderTop: '1px solid rgba(247,245,240,0.15)' }}>
                                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--amber)', letterSpacing: '0.1em', display: 'block', marginBottom: '1.25rem' }}>{s.step}</span>
                                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 400, color: '#F7F5F0', marginBottom: '0.75rem' }}>{s.title}</h3>
                                <p style={{ color: 'rgba(247,245,240,0.5)', fontSize: '0.875rem', lineHeight: 1.7 }}>{s.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '8rem 5rem', borderTop: '1px solid rgba(247,245,240,0.08)' }}>
                <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontWeight: 300, color: '#F7F5F0', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                        Ready to take back your time?
                    </h2>
                    <p style={{ color: 'rgba(247,245,240,0.5)', fontSize: '1rem', marginBottom: '2.5rem' }}>
                        Join thousands of practitioners using Naao to streamline their scheduling.
                    </p>
                    <Link to="/register" style={{ backgroundColor: 'var(--amber)', color: '#0D1B2A', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontSize: '0.9375rem', textDecoration: 'none', fontWeight: 600, display: 'inline-block', transition: 'opacity 0.2s' }}>
                        Create your free account
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ borderTop: '1px solid rgba(247,245,240,0.08)', padding: '2.5rem 5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'rgba(247,245,240,0.6)' }}>naao<span style={{ color: 'var(--amber)' }}>.</span></div>
                <p style={{ color: 'rgba(247,245,240,0.3)', fontSize: '0.8125rem' }}>© 2026 Naao. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    {['Privacy', 'Terms', 'Contact'].map(l => (
                        <a key={l} href="#" style={{ color: 'rgba(247,245,240,0.35)', fontSize: '0.8125rem', textDecoration: 'none' }}>{l}</a>
                    ))}
                </div>
            </footer>
        </div>
    )
}