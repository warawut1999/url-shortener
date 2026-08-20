import {
    Apple,
    Copy,
    ExternalLink,
    Play,
    Trash2,
} from "lucide-react";
import type { Link } from "../types/link";

interface LinkTableProps {
    links: Link[];
    onToggle: (link: Link) => Promise<void>;
}

export default function LinkTable({
    links,
    onToggle,
}: LinkTableProps) {
    const handleCopyLink = async (shortCode: string) => {
        try {
            const shortUrl = `${import.meta.env.VITE_API_URL}/${shortCode}`;

            await navigator.clipboard.writeText(shortUrl);
            alert("Link copied to clipboard!");
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    };

    const handleOpenLink = (shortCode: string) => {
        const shortUrl = `${import.meta.env.VITE_API_URL}/${shortCode}`;
        window.open(shortUrl, "_blank", "noopener,noreferrer");
    };

    const handleOpenPlatformLink = (
        isIOS: boolean,
        link: Link
    ) => {
        const platform = isIOS ? "ios" : "android";

        const shortUrl =
            `${import.meta.env.VITE_API_URL}/${link.shortCode}?platform=${platform}`;

        window.open(
            shortUrl,
            "_blank",
            "noopener,noreferrer"
        );
    };

    return (
        <div className="overflow-hidden bg-white">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b border-slate-200 text-left text-sm text-slate-600">
                            <th className="w-12 px-4 py-4">
                                <input type="checkbox" />
                            </th>

                            <th className="px-4 py-4">
                                Short
                            </th>

                            <th className="px-4 py-4">
                                Destination
                            </th>

                            <th className="px-4 py-4">
                                Clicks
                            </th>

                            <th className="px-4 py-4">
                                Status
                            </th>

                            <th className="px-4 py-4 text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {links.map((link) => (
                            <tr
                                key={link.id}
                                className="border-b border-slate-100 hover:bg-slate-50"
                            >
                                <td className="px-4 py-5">
                                    <input type="checkbox" />
                                </td>

                                <td className="px-4 py-5">
                                    <a
                                        href={link.shortCode ? `${import.meta.env.VITE_API_URL}/${link.shortCode}` : "#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-blue-500 hover:underline"
                                    >
                                        {link.shortCode}
                                    </a>
                                </td>

                                <td className="max-w-[380px] px-4 py-5">
                                    <span className="block truncate text-slate-700">
                                        {link.originalUrl}
                                    </span>
                                </td>

                                <td className="px-4 py-5 text-slate-700">
                                    {link.clickCount.toLocaleString()}
                                </td>

                                <td className="px-4 py-5">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${link.isDisabled
                                            ? "bg-red-50 text-red-500"
                                            : "bg-green-50 text-green-600"
                                            }`}
                                    >
                                        {link.isDisabled
                                            ? "Disabled"
                                            : "Active"}
                                    </span>
                                </td>

                                <td className="px-4 py-5">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            type="button"
                                            title="Copy link"
                                            onClick={() => handleCopyLink(link.shortCode)}
                                            className="text-slate-500 hover:text-blue-500"
                                        >
                                            <Copy size={17} />
                                        </button>

                                        <button
                                            type="button"
                                            title="Open link"
                                            onClick={() => handleOpenLink(link.shortCode)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <ExternalLink size={17} />
                                        </button>

                                        {/* Android */}
                                        {link.isAndroid && (
                                            <button
                                                type="button"
                                                title="Open Android link"
                                                onClick={() => handleOpenPlatformLink(false, link)}
                                                className="text-green-500 hover:text-green-600"
                                            >
                                                <Play size={17} />
                                            </button>
                                        )}

                                        {/* iOS */}
                                        {link.isIOS && (
                                            <button
                                                type="button"
                                                title="Open iOS link"
                                                onClick={() => handleOpenPlatformLink(true, link)}
                                                className="text-slate-700 hover:text-slate-900"
                                            >
                                                <Apple size={17} />
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => onToggle(link)}
                                            className={`relative h-6 w-11 rounded-full transition-colors ${link.isDisabled
                                                ? "bg-gray-300"
                                                : "bg-blue-500"
                                                }`}
                                        >
                                            <span
                                                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${link.isDisabled
                                                    ? "left-1"
                                                    : "left-6"
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
                <span className="text-sm text-slate-500">
                    {links.length} Shorts
                </span>

                <div className="flex items-center gap-2">
                    <button className="border border-slate-200 px-3 py-1.5 text-sm text-slate-400">
                        ‹
                    </button>

                    <button className="border border-blue-400 px-3 py-1.5 text-sm text-blue-500">
                        1
                    </button>

                    <button className="border border-slate-200 px-3 py-1.5 text-sm text-slate-500">
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}