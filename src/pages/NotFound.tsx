import { Link } from "react-router";

export default function NotFound() {

    return (
        <div className="min-h-screen bg-(--navy) flex flex-col items-center justify-center font-body text-center p-12 relative overflow-hidden">
            <div className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full [background:radial-gradient(circle,rgba(26,92,69,0.25)_0%,transparent_70%)] pointer-events-none" />
            <Link to="/" className="font-display text-2xl text-[#F7F5F0] no-underline mb-20 tracking-tight relative">
                naao<span className="text-(--amber)">.</span>
            </Link>

            <div className="relative max-w-[480px]">
                <p className="font-display text-[clamp(6rem,18vw,10rem)] font-light text-[#F7F5F0]/6 leading-none -mb-4 tracking-tighter select-none">404</p>

                <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-light text-[#F7F5F0] leading-snug mb-5 tracking-tight">
                    This page<br /><em className="text-(--amber) not-italic">doesn't exist.</em>
                </h1>

                <p className="text-[#F7F5F0]/45 text-base leading-[1.7] mb-12">
                    The page you're looking for may have been moved, deleted, or the link might be incorrect.
                </p>

                <div className="flex gap-4 justify-center flex-wrap">
                    <Link to="/" className="bg-(--teal) hover:bg-(--teal-light) text-[#F7F5F0] px-8 py-3.5 rounded-lg no-underline font-medium text-[15px] transition-colors duration-200">
                        Go home
                    </Link>
                    <Link to="/dashboard" className="bg-[#F7F5F0]/6 hover:bg-[#F7F5F0]/10 text-[#F7F5F0]/70 px-8 py-3.5 rounded-lg no-underline font-medium text-[15px] border border-[#F7F5F0]/10 transition-all duration-200">
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}