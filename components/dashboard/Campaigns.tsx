
'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, 
  Users, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  BarChart2,
  Pencil,
  Download,
  Copy,
  Trash2,
  MoreVertical,
  ArrowUpRight,
  Search,
  Filter,
  CheckSquare
} from "lucide-react";

type CampaignStatus = "Active" | "Paused" | "Completed" | "Finished";

type Campaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  createdAt: string;
  leads: number;
  connections: number;
  accepted: number;
  visits: number;
  likes: number;
  endorse: number;
  messages: number;
  replied: number;
};

const initialCampaigns: Campaign[] = [
  { 
    id: "1",
    name: "Recruiters", 
    status: "Active", 
    createdAt: "1 Feb",
    leads: 889, 
    connections: 321, 
    accepted: 143,
    visits: 493,
    likes: 160,
    endorse: 78,
    messages: 115,
    replied: 34,
  },
  { 
    id: "2",
    name: "S&B Outreach", 
    status: "Finished", 
    createdAt: "13 Feb",
    leads: 62, 
    connections: 60, 
    accepted: 27,
    visits: 59,
    likes: 51,
    endorse: 13,
    messages: 23,
    replied: 5,
  },
  { 
    id: "3",
    name: "Talent Acquisition", 
    status: "Finished", 
    createdAt: "18 Jan",
    leads: 73, 
    connections: 72, 
    accepted: 38,
    visits: 38,
    likes: 35,
    endorse: 24,
    messages: 36,
    replied: 16,
  },
  { 
    id: "4",
    name: "Growth Strategy", 
    status: "Active", 
    createdAt: "5 Mar",
    leads: 1250, 
    connections: 450, 
    accepted: 310,
    visits: 900,
    likes: 240,
    endorse: 112,
    messages: 180,
    replied: 65,
  },
];

const ActionDropdown = ({ 
  isOpen, 
  onClose, 
  campaign,
  onDuplicate,
  onDelete
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  campaign: Campaign;
  onDuplicate?: (c: Campaign) => void;
  onDelete?: (id: string) => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           ref={dropdownRef}
           initial={{ opacity: 0, scale: 0.95, y: 10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 10 }}
           className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-2xl border bg-[var(--card)] border-[var(--border)] py-3 z-[60] overflow-hidden"
        >
          <div className="px-4 py-2 mb-2 border-b border-[var(--border)]">
             <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Actions</p>
          </div>
        
          
          <Link href={`/dashboard/campaigns/edit/${campaign.id}`} className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
             <Pencil size={14} className="text-[var(--muted)]" />
             Edit Workflow
          </Link>

          <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
             <Download size={14} className="text-[var(--muted)]" />
             Export Data
          </button>

          <button 
            onClick={() => {
              onDuplicate?.(campaign);
              onClose();
            }}
            className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]"
          >
             <Copy size={14} className="text-[var(--muted)]" />
             Duplicate
          </button>

          <div className="h-px mx-4 my-2 bg-[var(--border)]" />

          <button 
            onClick={() => {
              onDelete?.(campaign.id);
              onClose();
            }}
            className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold text-blue-500 hover:bg-blue-500/10 transition-all"
          >
             <Trash2 size={14} />
             Delete Permanently
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('custom_campaigns') || '[]');

  // agar kuch bhi saved nahi hai to fallback initialCampaigns
  if (stored.length === 0) {
    setCampaigns(initialCampaigns);
  } else {
    setCampaigns(stored);
  }
}, []);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "drafts">("all");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredCampaigns = campaigns.filter(c => {
    if (activeTab === "all") return true;
    if (activeTab === "active") return c.status === "Active" || c.status === "Finished";
    return c.status === "Paused";
  });

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    setSelectedIds(prev => prev.length === filteredCampaigns.length ? [] : filteredCampaigns.map(c => c.id));
  };

  const handleDelete = (id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleDuplicate = (campaign: Campaign) => {
    const newCampaign = {
      ...campaign,
      id: Math.random().toString(36).substring(7),
      name: `${campaign.name} (Copy)`,
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
    };
    setCampaigns(prev => [newCampaign, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-20 px-4 md:px-0">
      

       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
    
        <div className="flex flex-col gap-2">
         <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60">
           Outreach Manager
         </span>

        <h2
           className="text-2xl md:text-4xl font-bold uppercase tracking-tight text-[var(--text)]"
        >
          Our Campaign  <br className="hidden md:block" />
          <span style={{ opacity: 0.5 }}>Dashboard.</span>
        </h2>
      </div>
         <div className="flex items-center gap-2 md:gap-3">
           <button className="flex-1 md:flex-none h-11 px-4 md:px-5 rounded-xl border border-[var(--border)] text-[10px] md:text-xs font-bold uppercase tracking-widest text-[var(--text)] hover:bg-[var(--card)] transition-all flex items-center justify-center gap-2">
             <Download size={16} />
             <span className="hidden sm:inline">Export Stats</span>
             <span className="sm:hidden">Export</span>
           </button>
           <Link href="/dashboard/campaigns/new" className="flex-1 md:flex-none h-11 px-6 bg-blue-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95">
            <Plus size={18} />
            <span className="hidden sm:inline">Create Campaign</span>
            <span className="sm:hidden">Create</span>
          </Link>
        </div>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[
          { label: "Targeting", val: "2,840", icon: Users, color: "text-blue-600", bg: "bg-blue-600/5" },
          { label: "Outreach", val: "1,150", icon: Send, color: "text-purple-600", bg: "bg-purple-600/5" },
          { label: "Success", val: "24.2%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-600/5" },
          { label: "Pipeline", val: "92", icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-500/5" },
          { label: "Revenue", val: "$12.4k", icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-500/5" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 md:p-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl space-y-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-lg md:text-xl font-bold text-[var(--text)] tracking-tight">{kpi.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
          <div className="flex overflow-x-auto p-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl w-full lg:w-auto overflow-hidden">
             {(['all', 'active', 'drafts'] as const).map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`flex-1 lg:flex-none px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${
                   activeTab === tab 
                     ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md" 
                     : "text-[var(--muted)] hover:text-[var(--text)]"
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
             <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={14} />
                <input 
                  type="text" 
                  placeholder="SEARCH CAMPAIGNS..."
                  className="w-full h-10 bg-[var(--bg)] border border-[var(--border)] pl-10 pr-4 rounded-xl text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all uppercase"
                />
             </div>
             <button className="h-10 w-10 bg-[var(--bg)] border border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--muted)] hover:border-blue-500 transition-all">
                <Filter size={14} />
             </button>
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[900px] lg:min-w-0">
              <thead>
                <tr className="bg-[var(--bg)]/50 border-b border-[var(--border)]">
                  <th className="w-14 pl-6 py-4">
                    <button 
                      onClick={toggleSelectAll}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedIds.length === filteredCampaigns.length && filteredCampaigns.length > 0 ? 'bg-blue-600 border-blue-600 text-white' : 'border-[var(--border)] bg-white text-transparent'}`}
                    >
                      <CheckCircle2 size={12} strokeWidth={3} />
                    </button>
                  </th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Status</th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Campaign Name</th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Metrics</th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)] text-right pr-6">Performance & Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredCampaigns.map((camp, i) => (
                  <motion.tr 
                    key={camp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`group hover:bg-[var(--bg)] transition-colors ${selectedIds.includes(camp.id) ? 'bg-blue-600/[0.02]' : ''}`}
                  >
                    <td className="pl-6 py-6 text-center">
                      <button 
                        onClick={() => toggleSelect(camp.id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all mx-auto ${selectedIds.includes(camp.id) ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20' : 'border-[var(--border)] bg-[var(--bg)] text-transparent group-hover:border-zinc-400'}`}
                      >
                        <CheckSquare size={12} strokeWidth={2.5} />
                      </button>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                         <button className={`w-10 h-5 rounded-full relative transition-all duration-500 shrink-0 ${camp.status === 'Active' ? 'bg-blue-600' : 'bg-[var(--border)]'}`}>
                           <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-500 ${camp.status === 'Active' ? 'left-[22px]' : 'left-0.5'}`} />
                         </button>
                         <span className={`text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${camp.status === 'Active' ? 'text-blue-600' : 'text-[var(--muted)]'}`}>
                            {camp.status}
                         </span>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="space-y-0.5 max-w-[200px]">
                        <p className="text-sm font-bold text-[var(--text)] uppercase tracking-tight group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1">{camp.name}</p>
                        <p className="text-[10px] font-bold text-[var(--muted)] tracking-wider uppercase">Started {camp.createdAt}</p>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-6 md:gap-8">
                         {[
                           { label: 'Conn', val: camp.connections },
                           { label: 'Sent', val: camp.messages },
                           { label: 'Reply', val: camp.replied, accent: true }
                         ].map(m => (
                           <div key={m.label} className="space-y-0.5 min-w-[40px]">
                              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest">{m.label}</p>
                              <p className={`text-xs font-black ${m.accent ? 'text-emerald-500' : 'text-[var(--text)]'}`}>{m.val}</p>
                           </div>
                         ))}
                      </div>
                    </td>
                    <td className="px-4 py-6 pr-6">
                      <div className="flex items-center justify-end gap-4 md:gap-6">
                         <div className="flex flex-col items-end pr-4 md:pr-6 border-r border-[var(--border)] whitespace-nowrap">
                            <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest">Conversion</span>
                            <span className="text-sm font-black text-blue-600 tabular-nums">
                               {((camp.accepted / camp.connections) * 100).toFixed(0)}%
                            </span>
                         </div>
                         <div className="flex items-center gap-1 md:gap-2">
                           <button className="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--muted)] hover:bg-blue-600/10 hover:text-blue-600 transition-all">
                              <BarChart2 size={16} />
                           </button>
                           <Link href={`/dashboard/campaigns/edit/${camp.id}`} className="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--muted)] hover:bg-blue-600/10 hover:text-blue-600 transition-all">
                              <Pencil size={16} />
                           </Link>
                         <div className="relative" onMouseEnter={() => setOpenActionId(camp.id)} onMouseLeave={() => setOpenActionId(null)}>
                            <button 
                              className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${openActionId === camp.id ? 'bg-zinc-950 text-white' : 'text-[var(--muted)] hover:bg-[var(--bg)]'}`}
                            >
                              <MoreVertical size={16} />
                            </button>
                            <ActionDropdown 
                              isOpen={openActionId === camp.id} 
                              onClose={() => setOpenActionId(null)} 
                              campaign={camp} 
                              onDuplicate={handleDuplicate}
                              onDelete={handleDelete}
                            />
                         </div>
                         </div>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CampaignsPage;
