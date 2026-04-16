
"use client"
 import Link from "next/link";
 import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Megaphone,
  BarChart3,
  LogOut,
  LineChart,
  X,
  Mail,
  Users,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useRouter();
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
      pathname === path
        ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
        : "text-zinc-500 hover:text-blue-400 hover:bg-blue-500/5"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate.push("/");
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside className={`fixed lg:sticky top-0 left-0 w-72 bg-zinc-950 text-white flex flex-col border-r border-white/5 min-h-screen z-[60] transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="h-20 flex items-center justify-between px-8 text-lg font-display uppercase tracking-widest border-b border-white/5">
          <div>
            Nexus<span className="text-blue-500 italic">Flow</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-zinc-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-8 space-y-1" onClick={() => { if (window.innerWidth < 1024) onClose(); }}>
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            <LayoutDashboard size={16} />
            Overview
          </Link>

          <Link href="/dashboard/campaigns" className={linkClass("/dashboard/campaigns")}>
            <Megaphone size={16} />
            Campaigns
          </Link>

          <Link href="/dashboard/analytics" className={linkClass("/dashboard/analytics")}>
            <BarChart3 size={16} />
            Analytics
          </Link>
             <Link href="/dashboard/inbox" className={linkClass("/dashboard/inbox")}>
               <Mail size={16} />
               Inbox
             </Link>
             <Link href="/dashboard/network" className={linkClass("/dashboard/network")}>
               <Users size={16} />
                My Network
             </Link>
          <Link href="/dashboard/graphs" className={linkClass("/dashboard/graphs")}>
            <LineChart size={16} />
            Insights
          </Link>
        </nav>

        <div className="p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 hover:text-red-400 transition-all rounded-xl hover:bg-red-500/5"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
