import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import LinkTable from "../components/LinkTable";
import { createLink, disableLink, enableLink, getLinks } from "../api/links";
import type { Link } from "../types/link";
import CreateLinkModal, { type CreateLinkRequest } from "../components/CreateLinkModal";

export default function Dashboard() {
    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const getClickStats = (links: Link[]) => {
        const now = new Date();

        const last24Hours = new Date(
            now.getTime() - 24 * 60 * 60 * 1000
        );

        const last7Days = new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000
        );

        const last30Days = new Date(
            now.getTime() - 30 * 24 * 60 * 60 * 1000
        );

        const last12Months = new Date(
            now.getTime() - 365 * 24 * 60 * 60 * 1000
        );

        return {
            last24Hours: getClicksSince(links, last24Hours),
            last7Days: getClicksSince(links, last7Days),
            last30Days: getClicksSince(links, last30Days),
            last12Months: getClicksSince(links, last12Months),
        };
    };

    const getClicksSince = (
        links: Link[],
        since: Date
    ) => {
        return links.reduce((total, link) => {
            if (!link.lastAccessedAt) {
                return total;
            }

            const lastAccessed = new Date(link.lastAccessedAt);

            if (lastAccessed >= since) {
                return total + link.clickCount;
            }

            return total;
        }, 0);
    };

    const loadLinks = async () => {
        try {
            const data = await getLinks();
            setLinks(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLinks();
    }, []);

    const handleOpenCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModalOpen(false);
    };

    const handleCreateLink = async (data: CreateLinkRequest) => {
        try {
            await createLink(data);

            await loadLinks();
        } catch (error) {
            console.error("Failed to create link:", error);
            throw error;
        }
    };

    const handleToggle = async (link: Link) => {
        try {
            if (link.isDisabled) {
                await enableLink(link.shortCode);
            } else {
                await disableLink(link.shortCode);
            }

            await loadLinks();
        } catch (error) {
            console.error("Failed to toggle link:", error);
        }
    };

    const stats = getClickStats(links);

    return (
        <DashboardLayout>
            {/* Statistics */}
            <section className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Clicks last 24 hours"
                    value={stats.last24Hours}
                    points="..."
                />

                <StatCard
                    title="Clicks last 7 days"
                    value={stats.last7Days}
                    points="..."
                />

                <StatCard
                    title="Clicks last 30 days"
                    value={stats.last30Days}
                    points="..."
                />

                <StatCard
                    title="Clicks last 12 months"
                    value={stats.last12Months}
                    points="..."
                />
            </section>

            {/* Links */}
            <section className="overflow-hidden rounded-xl bg-white shadow-sm">

                {/* Table Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Short Links
                        </h2>

                        <p className="mt-1 text-sm text-slate-400">
                            Manage your short links
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleOpenCreateModal}
                        className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-600"
                    >
                        <span className="text-lg leading-none">+</span>
                        Create Link
                    </button>
                </div>

                {/* Table */}
                {loading ? (
                    <div className="p-10 text-center text-slate-400">
                        Loading links...
                    </div>
                ) : links.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-lg text-slate-600">
                            No short links yet
                        </p>

                        <p className="mt-2 text-sm text-slate-400">
                            Create your first short link to get started.
                        </p>

                        <button
                            type="button"
                            onClick={handleOpenCreateModal}
                            className="mt-5 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
                        >
                            Create Link
                        </button>
                    </div>
                ) : (
                    <LinkTable
                        links={links}
                        onToggle={handleToggle}
                    />
                )}
            </section>

            {/* Create Modal */}
            <CreateLinkModal
                isOpen={isCreateModalOpen}
                onClose={handleCloseCreateModal}
                onSubmit={handleCreateLink}
            />
        </DashboardLayout>
    );
}