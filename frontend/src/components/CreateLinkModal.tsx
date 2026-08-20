import { useState } from "react";
import { X } from "lucide-react";

interface CreateLinkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateLinkRequest) => Promise<void>;
}

export interface CreateLinkRequest {
    url: string;
    customAlias?: string;
    androidUrl?: string;
    iosUrl?: string;
}

export default function CreateLinkModal({
    isOpen,
    onClose,
    onSubmit,
}: CreateLinkModalProps) {
    const [url, setUrl] = useState("");
    const [customAlias, setCustomAlias] = useState("");
    const [androidUrl, setAndroidUrl] = useState("");
    const [iosUrl, setIosUrl] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            await onSubmit({
                url,
                customAlias: customAlias || undefined,
                androidUrl: androidUrl || undefined,
                iosUrl: iosUrl || undefined,
            });

            // Clear form
            setUrl("");
            setCustomAlias("");
            setAndroidUrl("");
            setIosUrl("");

            onClose();
        } catch (error) {
            console.error("Failed to create link:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Create Short Link
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Create a new short link
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 p-6">

                    {/* Original URL */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Original URL
                        </label>

                        <input
                            type="url"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://example.com"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Custom Alias */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Custom Alias
                            <span className="ml-1 font-normal text-slate-400">
                                (optional)
                            </span>
                        </label>

                        <input
                            type="text"
                            value={customAlias}
                            onChange={(e) => setCustomAlias(e.target.value)}
                            placeholder="my-link"
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Android URL */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            Android URL
                            <span className="ml-1 font-normal text-slate-400">
                                (optional)
                            </span>
                        </label>

                        <input
                            type="url"
                            value={androidUrl}
                            onChange={(e) => setAndroidUrl(e.target.value)}
                            placeholder="https://play.google.com/..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* iOS URL */}
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">
                            iOS URL
                            <span className="ml-1 font-normal text-slate-400">
                                (optional)
                            </span>
                        </label>

                        <input
                            type="url"
                            value={iosUrl}
                            onChange={(e) => setIosUrl(e.target.value)}
                            placeholder="https://apps.apple.com/..."
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Link"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}