import {
    Grid2X2,
    Link2,
    Settings,
    User,
} from "lucide-react";

const menuItems = [
    {
        icon: Grid2X2,
        active: true,
    }
];

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 flex h-screen w-[80px] flex-col items-center bg-[#06233b]">
            {/* Logo */}
            <div className="flex h-[80px] w-full items-center justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                    <Link2
                        size={22}
                        strokeWidth={2.2}
                        className="text-white"
                    />
                </div>
            </div>

            {/* Main menu */}
            <nav className="flex flex-1 flex-col items-center gap-3">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={index}
                            className={`flex h-12 w-12 items-center justify-center rounded-md transition ${item.active
                                    ? "bg-blue-500 text-white"
                                    : "text-slate-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <Icon size={21} strokeWidth={1.8} />
                        </button>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="mb-5 flex flex-col gap-3">
                <button className="flex h-12 w-12 items-center justify-center rounded-md text-slate-400 hover:bg-white/10 hover:text-white">
                    <User size={21} />
                </button>

                <button className="flex h-12 w-12 items-center justify-center rounded-md text-slate-400 hover:bg-white/10 hover:text-white">
                    <Settings size={21} />
                </button>
            </div>
        </aside>
    );
}