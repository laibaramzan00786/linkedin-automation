
'use client';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Megaphone,
  BarChart3,
  Mail,
  LogOut,
  X,
  Users,
  Network,
  LayoutGrid,
  Search,
  Puzzle,
  Link2,
  BarChart3Icon,
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const mainLinks = [
    { path: "/dashboard/campaigns", icon: Megaphone, label: "Campaigns" },
    { path: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
    { path: "/dashboard/inbox", icon: Mail, label: "Inbox" },
    { path: "/dashboard/network", icon: Users, label: "My Network" },
     { path: "/dashboard/graphs", icon: BarChart3Icon, label: "My Graphs" },
  ];

  const toolLinks = [
    { path: "/dashboard/appoint", icon: LayoutGrid, label: "Appoint" },
    { path: "/dashboard/lead-finder", icon: Search, label: "Lead finder" },
    { path: "/dashboard/extension", icon: Puzzle, label: "Extension" },
    { path: "/dashboard/integrations", icon: Network, label: "Integrations" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-[50] lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 w-56 flex flex-col min-h-screen z-[60] transition-all duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "#f0f0f0",
          borderRight: "1px solid #e0e0e0",
          fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        }}
      >
        <div
          className="h-16 flex items-center justify-between px-5"
          style={{ borderBottom: "1px solid #e0e0e0" }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "#e8836a" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.9" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.6" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.6" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.9" />
              </svg>
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ color: "#222" }}>
              Nexus Flow
            </span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <X size={16} style={{ color: "#888" }} />
          </button>
        </div>
        <div className="px-5 pt-6 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "#aaa" }}>
            Linkedin Outreach
          </span>
        </div>

        
        <nav className="px-2 space-y-0.5">
          {mainLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: isActive(link.path) ? "#e8836a" : "transparent",
                color: isActive(link.path) ? "#fff" : "#555",
              }}
            >
              <div className="flex items-center gap-3">
                <link.icon size={16} />
                {link.label}
              </div>
          
            </Link>
          ))}
        </nav>

       

        <div className="p-4" style={{ borderTop: "1px solid #e0e0e0" }}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-all hover:bg-red-50"
            style={{ color: "#aaa" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e8836a")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#aaa")}
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