import ButtonTheme from "@/components/ui/ButtonTheme.tsx";

export default function NavBar() {
    return (
        <>
            <div className="absolute top-6 right-6">
                <ButtonTheme />
            </div>

            <div className="relative z-10 w-full max-w-[420px]">
                <div className="text-center mb-4">
                    <img src="/icon.png" alt="Naao Icon" className="w-10 h-10 mx-auto mb-1 drop-shadow-sm" />
                    <h1 className="text-[36px] font-extrabold text-[#1a1a2e] dark:text-white tracking-tight mb-2 transition-colors duration-300">Naao</h1>
                    <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.25em] uppercase transition-colors duration-300">The Digital Atelier</p>
                </div>
            </div>
        </>
    )
}