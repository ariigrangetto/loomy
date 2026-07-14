import { Outlet, } from "react-router";
import { Suspense } from "react";

export default function RootLayout() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#F0EDE6] flex flex-col items-center justify-center font-body">
                <div className="flex flex-col items-center gap-5">
                    <div className="font-display text-4xl text-(--navy) tracking-tight animate-pulse select-none">
                        naao<span className="text-(--amber)">.</span>
                    </div>
                    <div className="relative w-10 h-10">
                        <div className="absolute inset-0 rounded-full border-[3px] border-(--navy)/8"></div>
                        <div className="absolute inset-0 rounded-full border-[3px] border-t-(--teal) border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    </div>
                </div>
            </div>
        }>
            <Outlet />
        </Suspense>
    )
}