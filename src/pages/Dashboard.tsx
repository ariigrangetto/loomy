import { LogOut } from "lucide-react";

export default function Dashboard() {
    return (
        <main>
            <div>
                <nav>
                    <img src="/icon.png" alt="Loomy Icon" className="w-16 h-16 mx-auto mb-4" />
                </nav>
            </div>
            <div>
                <nav>
                    <button><LogOut /></button>
                </nav>
            </div>
        </main>
    )
}