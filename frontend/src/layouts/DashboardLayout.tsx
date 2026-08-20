import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <Sidebar />

      <div className="ml-[80px]">
        <Header />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}