export default function Footer() {
    return (
        <div className="mt-12 text-center text-[11px] font-medium text-gray-400 dark:text-gray-500 opacity-80 flex justify-center items-center gap-4">
            <p className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer">All rights reserved &copy; {new Date().getFullYear()}</p>
        </div>
    )
}