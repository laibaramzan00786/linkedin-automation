
import Link from "next/link";
import { usePathname ,useRouter} from "next/navigation";
import { 
  Megaphone, 
  BarChart3, 
  Mail, 
  LogOut, 
  X,
  Users
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';


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
    router.push('/');
  };
  const links = [
    { path: '/dashboard/campaigns', icon: Megaphone, label: 'Campaigns' },
    { path: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/dashboard/inbox', icon: Mail, label: 'Inbox'},
    { path: '/dashboard/network', icon: Users, label: 'My Network' },
    { path: '/dashboard/graphs', icon: BarChart3, label: 'Graphs' },
  ];

  const linkClass = (path: string) =>
    `flex items-center justify-between px-6 py-3.5 text-[11px] font-bold transition-all rounded-xl mx-3 ${
      pathname === path
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        : "hover:bg-blue-600/5"
    }`;

  return (
    <>
   
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside 
        className={`fixed lg:sticky top-0 left-0 w-64 flex flex-col border-r min-h-screen z-[60] transition-all duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "var(--bg)",
          borderColor: "var(--border)",
          color: "var(--text)"
        }}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b" style={{ borderColor: "var(--border)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Megaphone size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight">Nexus Flow</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 opacity-50 hover:opacity-100 transition-opacity">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pt-8 pb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--muted)" }}>LinkedIn Outreach</span>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          {links.map((link) => (
            <Link 
              key={link.path} 
              href={link.path} 
              className={linkClass(link.path)}
              style={pathname !== link.path ? { color: "var(--muted)" } : {}}
              onClick={() => { if (window.innerWidth < 1024) onClose(); }}
            >
              <div className="flex items-center gap-3">
                <link.icon size={18} />
                {link.label}
              </div>
            
            </Link>
          ))}
        </nav>

        

        <div className="p-6 border-t" style={{ borderColor: "var(--border)" }}>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-black hover:text-red-500 transition-all rounded-xl hover:bg-rose-500/5" 
            style={{ color: "var(--muted)" }}
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
