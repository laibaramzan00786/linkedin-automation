
// 'use client';
// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { motion, AnimatePresence } from "motion/react";
// import { 
//   Plus, 
//   Users, 
//   Send, 
//   CheckCircle2, 
//   MessageSquare, 
//   BarChart2,
//   Play,
//   Pencil,
//   Download,
//   Copy,
//   Trash2,
//   MoreVertical,
//   Activity,
//   ArrowUpRight,
//   Search,
//   Filter
// } from "lucide-react";

// type CampaignStatus = "Active" | "Paused" | "Completed" | "Finished";

// type Campaign = {
//   id: string;
//   name: string;
//   status: CampaignStatus;
//   createdAt: string;
//   leads: number;
//   connections: number;
//   accepted: number;
//   visits: number;
//   likes: number;
//   endorse: number;
//   messages: number;
//   replied: number;
// };

// const initialCampaigns: Campaign[] = [
//   { 
//     id: "1",
//     name: "Recruiters", 
//     status: "Active", 
//     createdAt: "1 Feb",
//     leads: 889, 
//     connections: 321, 
//     accepted: 143,
//     visits: 493,
//     likes: 160,
//     endorse: 78,
//     messages: 115,
//     replied: 34,
//   },
//   { 
//     id: "2",
//     name: "S&B Outreach", 
//     status: "Finished", 
//     createdAt: "13 Feb",
//     leads: 62, 
//     connections: 60, 
//     accepted: 27,
//     visits: 59,
//     likes: 51,
//     endorse: 13,
//     messages: 23,
//     replied: 5,
//   },
//   { 
//     id: "3",
//     name: "Talent Acquisition", 
//     status: "Finished", 
//     createdAt: "18 Jan",
//     leads: 73, 
//     connections: 72, 
//     accepted: 38,
//     visits: 38,
//     likes: 35,
//     endorse: 24,
//     messages: 36,
//     replied: 16,
//   },
//   { 
//     id: "4",
//     name: "Growth Strategy", 
//     status: "Active", 
//     createdAt: "5 Mar",
//     leads: 1250, 
//     connections: 450, 
//     accepted: 310,
//     visits: 900,
//     likes: 240,
//     endorse: 112,
//     messages: 180,
//     replied: 65,
//   },
// ];

// const ActionDropdown = ({ isOpen, onClose, campaign }: { isOpen: boolean; onClose: () => void; campaign: Campaign }) => {
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         onClose();
//       }
//     };
//     if (isOpen) document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen, onClose]);

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//            ref={dropdownRef}
//            initial={{ opacity: 0, scale: 0.95, y: 10 }}
//            animate={{ opacity: 1, scale: 1, y: 0 }}
//            exit={{ opacity: 0, scale: 0.95, y: 10 }}
//            className="absolute right-0 top-full mt-2 w-56 rounded-2xl shadow-2xl border bg-[var(--card)] border-[var(--border)] py-3 z-[60] overflow-hidden"
//         >
//           <div className="px-4 py-2 mb-2 border-b border-[var(--border)]">
//              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Actions</p>
//           </div>
          
//           <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
//              <Play size={14} className="text-emerald-500" />
//              Start Campaign
//           </button>
          
//           <Link href={`/dashboard/campaigns/edit/${campaign.id}`} className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
//              <Pencil size={14} className="text-[var(--muted)]" />
//              Edit Workflow
//           </Link>

//           <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
//              <Download size={14} className="text-[var(--muted)]" />
//              Export Data
//           </button>

//           <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
//              <Copy size={14} className="text-[var(--muted)]" />
//              Duplicate
//           </button>

//           <div className="h-px mx-4 my-2 bg-[var(--border)]" />

//           <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold text-rose-500 hover:bg-rose-500/10 transition-all">
//              <Trash2 size={14} />
//              Delete Permanently
//           </button>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// const CampaignsPage = () => {
//   const [activeTab, setActiveTab] = useState<"all" | "active" | "drafts">("all");
//   const [openActionId, setOpenActionId] = useState<string | null>(null);

//   const filteredCampaigns = initialCampaigns.filter(c => {
//     if (activeTab === "all") return true;
//     if (activeTab === "active") return c.status === "Active" || c.status === "Finished";
//     return c.status === "Paused";
//   });

//   return (
//     <div className="max-w-[1600px] mx-auto space-y-12">
      
    
//       <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
//         <div className="flex flex-col gap-6">
//           <motion.div 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="flex items-center gap-4"
//           >
//             <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
//               <Activity className="text-white" size={20} />
//             </div>
//             <span className="text-[11px] uppercase tracking-[0.4em] font-black text-blue-600/80">Command Center</span>
//           </motion.div>
          
//           <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-[var(--text)]">
//             Campaign <br />
//             <span className="text-[var(--muted)]">Manager<span className="text-blue-600">.</span></span>
//           </h1>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center gap-6">
//           <div className="flex p-2 bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] shadow-sm">
//              {(['all', 'active', 'drafts'] as const).map((tab) => (
//                <button
//                  key={tab}
//                  onClick={() => setActiveTab(tab)}
//                  className={`px-10 py-4 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${
//                    activeTab === tab 
//                      ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-xl" 
//                      : "text-[var(--muted)] hover:text-[var(--text)]"
//                  }`}
//                >
//                  {tab}
//                </button>
//              ))}
//           </div>

//           <Link 
//             href="/dashboard/campaigns/new"
//             className="h-16 px-12 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-[2rem] hover:bg-blue-500 transition-all flex items-center gap-4 shadow-2xl shadow-blue-600/20 group active:scale-95"
//           >
//             <Plus size={24} />
//             Create Campaign
//           </Link>
//         </div>
//       </div>


//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         {[
//           { label: "Targeting", val: "2,840", icon: Users, color: "text-blue-600", bg: "bg-blue-600/5" },
//           { label: "Outreach", val: "1,150", icon: Send, color: "text-purple-600", bg: "bg-purple-600/5" },
//           { label: "Success", val: "24.2%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-600/5" },
//           { label: "Pipeline", val: "92", icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-500/5" },
//           { label: "Revenue", val: "$12.4k", icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-500/5" },
//         ].map((kpi, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="bento-card group flex flex-col justify-between"
//           >
//             <div className={`w-12 h-12 rounded-xl scale-90 group-hover:scale-100 transition-transform ${kpi.bg} flex items-center justify-center ${kpi.color}`}>
//                <kpi.icon size={22} />
//             </div>
//             <div className="mt-8">
//                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] mb-2">{kpi.label}</p>
//                <h3 className="text-4xl font-bold tracking-tight text-[var(--text)]">{kpi.val}</h3>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       <div className="space-y-6">
//         <div className="flex items-center justify-between px-8 py-4 border-b border-[var(--border)]">
//            <div className="flex items-center gap-10">
//               <span className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Campaign Status</span>
//               <div className="flex items-center gap-1.5">
//                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
//                  <span className="text-[10px] font-bold text-[var(--text)]">Everything looking optimal today</span>
//               </div>
//            </div>
           
//            <div className="flex items-center gap-6">
//               <div className="relative">
//                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={14} />
//                  <input 
//                    type="text" 
//                    placeholder="SEARCH CAMPAIGNS..."
//                    className="bg-transparent border border-[var(--border)] pl-10 pr-6 py-2.5 rounded-full text-[10px] font-bold focus:outline-none focus:border-blue-500 transition-all w-64"
//                  />
//               </div>
//               <button className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:border-blue-500 transition-all">
//                  <Filter size={14} />
//               </button>
//            </div>
//         </div>

//         <div className="space-y-4">
//           {filteredCampaigns.map((camp, i) => (
//             <motion.div
//                key={camp.id}
//                initial={{ opacity: 0, x: -20 }}
//                animate={{ opacity: 1, x: 0 }}
//                transition={{ delay: i * 0.1 }}
//                className="group relative"
//             >
//               <div className="bento-card border-none bg-[var(--card)] hover:shadow-2xl transition-all shadow-sm">
//                 <div className="flex flex-col xl:flex-row items-center gap-12">
                   
           
//                    <div className="flex items-center gap-10 min-w-[280px]">
//                       <button className={`w-14 h-7 rounded-full relative transition-all duration-500 ${camp.status === 'Active' ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-[var(--border)]'}`}>
//                         <div className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-500 ${camp.status === 'Active' ? 'left-[30px]' : 'left-1.5'}`} />
//                       </button>

//                       <div className="flex flex-col gap-1">
//                         <h4 className="text-xl font-bold tracking-tight text-[var(--text)] group-hover:text-blue-600 transition-colors uppercase">{camp.name}</h4>
//                         <div className="flex items-center gap-3">
//                            <span className={`text-[9px] font-black uppercase tracking-widest ${camp.status === 'Active' ? 'text-blue-600' : 'text-[var(--muted)]'}`}>
//                               {camp.status}
//                            </span>
//                            <span className="w-1 h-1 rounded-full bg-[var(--border)]" />
//                            <span className="text-[9px] font-black tracking-widest text-[var(--muted)] uppercase">Created {camp.createdAt}</span>
//                         </div>
//                       </div>
//                    </div>

//                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8">
//                       {[
//                         { label: 'Connections', val: camp.connections },
//                         { label: 'Accepted', val: camp.accepted },
//                         { label: 'Visits', val: camp.visits },
//                         { label: 'Sent', val: camp.messages },
//                         { label: 'Replies', val: camp.replied, accent: true },
//                         { label: 'Conversion', val: `${((camp.accepted / camp.connections) * 100).toFixed(0)}%` }
//                       ].map((met) => (
//                         <div key={met.label} className="space-y-1">
//                            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--muted)]">{met.label}</p>
//                            <p className={`text-lg font-bold tabular-nums ${met.accent ? 'text-emerald-500' : 'text-[var(--text)]'}`}>
//                               {met.val}
//                            </p>
//                         </div>
//                       ))}
//                    </div>

//                    <div className="flex items-center gap-4">
//                       <button className="h-12 w-12 rounded-2xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:border-blue-500 hover:text-blue-500 transition-all">
//                         <BarChart2 size={18} />
//                       </button>
//                       <Link 
//                         href={`/dashboard/campaigns/edit/${camp.id}`}
//                         className="h-12 w-12 rounded-2xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:border-blue-500 hover:text-blue-500 transition-all"
//                       >
//                         <Pencil size={18} />
//                       </Link>
//                       <div className="relative">
//                         <button 
//                           onClick={() => setOpenActionId(openActionId === camp.id ? null : camp.id)}
//                           className={`h-12 w-12 rounded-2xl border border-[var(--border)] flex items-center justify-center transition-all ${openActionId === camp.id ? 'bg-[var(--text)] text-[var(--bg)]' : 'text-[var(--text)] hover:border-[var(--text)]'}`}
//                         >
//                           {openActionId === camp.id ? <Plus size={18} className="rotate-45" /> : <MoreVertical size={18} />}
//                         </button>
//                         <ActionDropdown 
//                           isOpen={openActionId === camp.id} 
//                           onClose={() => setOpenActionId(null)} 
//                           campaign={camp} 
//                         />
//                       </div>
//                    </div>

//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// };

// export default CampaignsPage;
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
  Play,
  Pencil,
  Download,
  Copy,
  Trash2,
  MoreVertical,
  Activity,
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

const ActionDropdown = ({ isOpen, onClose, campaign }: { isOpen: boolean; onClose: () => void; campaign: Campaign }) => {
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
          
          <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
             <Play size={14} className="text-emerald-500" />
             Start Campaign
          </button>
          
          <Link href={`/dashboard/campaigns/edit/${campaign.id}`} className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
             <Pencil size={14} className="text-[var(--muted)]" />
             Edit Workflow
          </Link>

          <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
             <Download size={14} className="text-[var(--muted)]" />
             Export Data
          </button>

          <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold transition-all hover:bg-blue-600/5 text-[var(--text)]">
             <Copy size={14} className="text-[var(--muted)]" />
             Duplicate
          </button>

          <div className="h-px mx-4 my-2 bg-[var(--border)]" />

          <button className="w-full px-4 py-2.5 flex items-center gap-3 text-[11px] font-bold text-rose-500 hover:bg-rose-500/10 transition-all">
             <Trash2 size={14} />
             Delete Permanently
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CampaignsPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "drafts">("all");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredCampaigns = initialCampaigns.filter(c => {
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

  return (
    <div className="flex flex-col gap-8 pb-20">
      
   
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Activity size={16} className="text-blue-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600/60">Outreach Manager</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] uppercase">Campaign Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-11 px-5 rounded-xl border border-[var(--border)] text-xs font-bold uppercase tracking-widest text-[var(--text)] hover:bg-[var(--card)] transition-all flex items-center gap-2">
            <Download size={16} />
            Export Stats
          </button>
          <Link href="/dashboard/campaigns/new" className="h-11 px-6 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95">
            <Plus size={18} />
            Create Campaign
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Targeting", val: "2,840", icon: Users, color: "text-blue-600", bg: "bg-blue-600/5" },
          { label: "Outreach", val: "1,150", icon: Send, color: "text-purple-600", bg: "bg-purple-600/5" },
          { label: "Success", val: "24.2%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-600/5" },
          { label: "Pipeline", val: "92", icon: MessageSquare, color: "text-amber-500", bg: "bg-amber-500/5" },
          { label: "Revenue", val: "$12.4k", icon: ArrowUpRight, color: "text-blue-500", bg: "bg-blue-500/5" },
        ].map((kpi, i) => (
          <div key={i} className="p-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl space-y-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
              <kpi.icon size={16} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-wider">{kpi.label}</p>
              <h3 className="text-xl font-bold text-[var(--text)]">{kpi.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
          <div className="flex p-1 bg-[var(--bg)] border border-[var(--border)] rounded-xl">
             {(['all', 'active', 'drafts'] as const).map((tab) => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${
                   activeTab === tab 
                     ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-md" 
                     : "text-[var(--muted)] hover:text-[var(--text)]"
                 }`}
               >
                 {tab}
               </button>
             ))}
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <div className="relative flex-1 sm:w-64">
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

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
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
                    <td className="pl-6 py-6">
                      <button 
                        onClick={() => toggleSelect(camp.id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedIds.includes(camp.id) ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20' : 'border-[var(--border)] bg-[var(--bg)] text-transparent group-hover:border-zinc-400'}`}
                      >
                        <CheckSquare size={12} strokeWidth={2.5} />
                      </button>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-3">
                         <button className={`w-10 h-5 rounded-full relative transition-all duration-500 ${camp.status === 'Active' ? 'bg-blue-600' : 'bg-[var(--border)]'}`}>
                           <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-500 ${camp.status === 'Active' ? 'left-[22px]' : 'left-0.5'}`} />
                         </button>
                         <span className={`text-[10px] font-black uppercase tracking-widest ${camp.status === 'Active' ? 'text-blue-600' : 'text-[var(--muted)]'}`}>
                            {camp.status}
                         </span>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-[var(--text)] uppercase tracking-tight group-hover:text-blue-600 transition-colors cursor-pointer">{camp.name}</p>
                        <p className="text-[10px] font-bold text-[var(--muted)] tracking-wider uppercase">Started {camp.createdAt}</p>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-8">
                         {[
                           { label: 'Connections', val: camp.connections },
                           { label: 'Sent', val: camp.messages },
                           { label: 'Reply', val: camp.replied, accent: true }
                         ].map(m => (
                           <div key={m.label} className="space-y-0.5">
                              <p className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest">{m.label}</p>
                              <p className={`text-xs font-black ${m.accent ? 'text-emerald-500' : 'text-[var(--text)]'}`}>{m.val}</p>
                           </div>
                         ))}
                      </div>
                    </td>
                    <td className="px-4 py-6 pr-6">
                      <div className="flex items-center justify-end gap-6">
                         <div className="flex flex-col items-end pr-6 border-r border-[var(--border)]">
                            <span className="text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest">Conversion</span>
                            <span className="text-sm font-black text-blue-600 tabular-nums">
                               {((camp.accepted / camp.connections) * 100).toFixed(0)}%
                            </span>
                         </div>
                         <div className="flex items-center gap-2">
                           <button className="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--muted)] hover:bg-blue-600/10 hover:text-blue-600 transition-all">
                              <BarChart2 size={16} />
                           </button>
                           <Link href={`/dashboard/campaigns/edit/${camp.id}`} className="h-9 w-9 rounded-xl flex items-center justify-center text-[var(--muted)] hover:bg-blue-600/10 hover:text-blue-600 transition-all">
                              <Pencil size={16} />
                           </Link>
                           <div className="relative">
                              <button 
                                onClick={() => setOpenActionId(openActionId === camp.id ? null : camp.id)}
                                className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${openActionId === camp.id ? 'bg-zinc-950 text-white' : 'text-[var(--muted)] hover:bg-[var(--bg)]'}`}
                              >
                                <MoreVertical size={16} />
                              </button>
                              <ActionDropdown 
                                isOpen={openActionId === camp.id} 
                                onClose={() => setOpenActionId(null)} 
                                campaign={camp} 
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
