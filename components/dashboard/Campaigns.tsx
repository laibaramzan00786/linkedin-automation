'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, Users, Send, CheckCircle2, MessageSquare, BarChart2,
  Pencil, Download, Copy, Trash2, Settings, Play, Check, Clock,
  ChevronDown, Filter, X,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

type CampaignStatus = "Active" | "Paused" | "Completed" | "Finished";

type Campaign = {
  id: string; name: string; status: CampaignStatus; createdAt: string;
  leads: number; connections: number; accepted: number; visits: number;
  likes: number; endorse: number; messages: number; replied: number;
};

const initialCampaigns: Campaign[] = [
  { id:"1", name:"Recruiters",         status:"Active",   createdAt:"1 Feb",  leads:889,  connections:321, accepted:143, visits:493, likes:160, endorse:78,  messages:115, replied:34  },
  { id:"2", name:"S&B Outreach",       status:"Finished", createdAt:"13 Feb", leads:62,   connections:60,  accepted:27,  visits:59,  likes:51,  endorse:13,  messages:23,  replied:5   },
  { id:"3", name:"Talent Acquisition", status:"Finished", createdAt:"18 Jan", leads:73,   connections:72,  accepted:38,  visits:38,  likes:35,  endorse:24,  messages:36,  replied:16  },
  { id:"4", name:"Growth Strategy",    status:"Active",   createdAt:"5 Mar",  leads:1250, connections:450, accepted:310, visits:900, likes:240, endorse:112, messages:180, replied:65  },
];

// ─── Action Dropdown ──────────────────────────────────────────────────────────
type DropdownPos = { top?: number; bottom?: number; right: number };

const ActionDropdown = ({ isOpen, onClose, campaign, onDuplicate, onDelete, triggerRef }: {
  isOpen: boolean; onClose: () => void; campaign: Campaign;
  onDuplicate?: (c: Campaign) => void; onDelete?: (id: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<DropdownPos>({ top: 0, right: 0 });

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const GAP = 6, H = 180;
    const below = window.innerHeight - r.bottom;
    if (below < H + GAP) setPos({ bottom: window.innerHeight - r.top + GAP, right: window.innerWidth - r.right });
    else                  setPos({ top: r.bottom + GAP,                      right: window.innerWidth - r.right });
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div ref={ref}
          initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
          exit={{ opacity:0, scale:0.95 }} transition={{ duration:0.12 }}
          className="fixed w-44 rounded-xl bg-white py-1"
          style={{
            zIndex: 99999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
            border: "1px solid #ebebeb",
            ...(pos.top !== undefined ? { top: pos.top } : { bottom: pos.bottom }),
            right: pos.right,
          }}
        >
          <Link href={`/dashboard/campaigns/edit/${campaign.id}`} onClick={onClose}
            className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-gray-50 text-gray-700 transition-colors">
            <Pencil size={13} className="text-gray-400"/> Edit Workflow
          </Link>
          <button className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-gray-50 text-gray-700 transition-colors">
            <Download size={13} className="text-gray-400"/> Export Data
          </button>
          <button onClick={() => { onDuplicate?.(campaign); onClose(); }}
            className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-gray-50 text-gray-700 transition-colors">
            <Copy size={13} className="text-gray-400"/> Duplicate
          </button>
          <div className="h-px mx-3 my-1 bg-gray-100"/>
          <button onClick={() => { onDelete?.(campaign.id); onClose(); }}
            className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={13}/> Delete
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Mobile Campaign Card ─────────────────────────────────────────────────────
const MobileCard = ({ camp, displayName, initials, userAvatar, onDuplicate, onDelete }: {
  camp: Campaign; displayName: string; initials: string; userAvatar?: string;
  onDuplicate: (c: Campaign) => void; onDelete: (id: string) => void;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null!);

  const statusColor = camp.status === "Active" ? { bg:"#fef3f0", color:"#e8836a" }
    : camp.status === "Finished" ? { bg:"#e3f5ec", color:"#4caf82" }
    : { bg:"#f5f5f5", color:"#888" };

  return (
    <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
      className="bg-white rounded-2xl border p-4 space-y-3" style={{ borderColor:"#e8e8e8" }}>

      {/* Top row: name + menu */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-gray-800">{camp.name}</p>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: statusColor.bg, color: statusColor.color }}>
              {camp.status}
            </span>
          </div>
          <p className="text-[11px] mt-0.5" style={{ color:"#aaa" }}>
            {camp.leads.toLocaleString()} prospects · {camp.createdAt}
          </p>
        </div>

        <div className="relative shrink-0">
          <button ref={btnRef} onClick={() => setMenuOpen(p => !p)}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
            style={{ background:"#f5f5f5", color: menuOpen ? "#e8836a" : "#aaa" }}>
            <Settings size={14}/>
          </button>
          <ActionDropdown isOpen={menuOpen} onClose={() => setMenuOpen(false)}
            campaign={camp} onDuplicate={onDuplicate} onDelete={onDelete} triggerRef={btnRef}/>
        </div>
      </div>

      {/* Account */}
      <div className="flex items-center gap-2">
        {userAvatar ? (
          <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-gray-200">
            <img src={userAvatar} alt="" className="w-full h-full object-cover"/>
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
            style={{ background:"#e8836a" }}>{initials}</div>
        )}
        <span className="text-xs font-medium truncate" style={{ color:"#555" }}>{displayName}</span>
      </div>

      {/* Stats grid 2x4 */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label:"Connections", val: camp.connections, accent: true  },
          { label:"Accepted",    val: camp.accepted,    accent: true  },
          { label:"Messages",    val: camp.messages,    accent: true  },
          { label:"Replied",     val: camp.replied,     accent: false },
          { label:"Visits",      val: camp.visits,      accent: false },
          { label:"Likes",       val: camp.likes,       accent: false },
          { label:"Endorse",     val: camp.endorse,     accent: false },
          { label:"Leads",       val: camp.leads,       accent: false },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-2 text-center" style={{ background:"#f8f8f8" }}>
            <p className="text-sm font-bold" style={{ color: s.accent ? "#e8836a" : "#555" }}>{s.val}</p>
            <p className="text-[9px] mt-0.5 leading-tight" style={{ color:"#aaa" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Link href={`/dashboard/campaigns/edit/${camp.id}`}
          className="flex-1 py-2 rounded-xl text-xs font-semibold text-center border transition-all"
          style={{ borderColor:"#e8836a", color:"#e8836a", background:"transparent" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="#fef3f0"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="transparent"}>
          Edit Workflow
        </Link>
        <button className="flex-1 py-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all"
          style={{ borderColor:"#e5e5e5", color:"#888", background:"transparent" }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="#f5f5f5"}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="transparent"}>
          <BarChart2 size={12}/> Analytics
        </button>
      </div>
    </motion.div>
  );
};

// ─── Desktop Table Row ────────────────────────────────────────────────────────
const CampaignRow = ({ camp, index, total, isSelected, onToggleSelect, onDuplicate, onDelete,
  openActionId, setOpenActionId, displayName, userAvatar, initials }: {
  camp: Campaign; index: number; total: number; isSelected: boolean;
  onToggleSelect: (id: string) => void; onDuplicate: (c: Campaign) => void;
  onDelete: (id: string) => void; openActionId: string | null;
  setOpenActionId: (id: string | null) => void; displayName: string;
  userAvatar?: string; initials: string;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null!);
  const isOpen = openActionId === camp.id;

  return (
    <motion.tr initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: index * 0.04 }}
      style={{
        borderBottom: index < total - 1 ? "1px solid #f3f3f3" : "none",
        background: isSelected ? "#fff8f6" : "#fff",
      }}>

      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          {camp.status === "Finished" ? (
            <div className="w-5 h-5 rounded flex items-center justify-center shrink-0" style={{ background:"#e8836a" }}>
              <Check size={11} color="#fff" strokeWidth={3}/>
            </div>
          ) : (
            <button onClick={() => onToggleSelect(camp.id)}
              className="w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0"
              style={{ borderColor: isSelected ? "#e8836a" : "#d5d5d5", background: isSelected ? "#e8836a" : "#fff" }}>
              {isSelected && <Check size={11} color="#fff" strokeWidth={3}/>}
            </button>
          )}
          {camp.status === "Active" && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background:"#f5f5f5" }}>
              <Play size={11} style={{ color:"#aaa", fill:"#aaa" }}/>
            </div>
          )}
        </div>
      </td>

      <td className="px-4 py-3.5">
        <p className="text-sm font-semibold leading-tight" style={{ color:"#222" }}>{camp.name}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {camp.status === "Finished" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:"#e3f5ec", color:"#4caf82" }}>Finished</span>
          )}
          {camp.status === "Active" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:"#fef3f0", color:"#e8836a" }}>Active</span>
          )}
          <span className="text-[11px]" style={{ color:"#aaa" }}>
            {camp.leads.toLocaleString()} prospects · {camp.createdAt}
          </span>
        </div>
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          {userAvatar ? (
            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0">
              <img src={userAvatar} alt="" className="w-full h-full object-cover"/>
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ background:"#e8836a" }}>{initials}</div>
          )}
          <span className="text-xs font-medium truncate max-w-[120px]" style={{ color:"#555" }}>{displayName}</span>
        </div>
      </td>

      {[camp.connections, camp.accepted, camp.visits, camp.likes, camp.endorse, camp.messages, camp.replied].map((val, mi) => {
        const isLink = mi === 0 || mi === 1 || mi === 5 || mi === 6;
        return (
          <td key={mi} className="px-4 py-3.5 text-center">
            {isLink
              ? <span className="text-sm font-semibold cursor-pointer"
                  style={{ color:"#e8836a", textDecoration:"underline", textDecorationColor:"#e8836a55" }}>{val}</span>
              : <span className="text-sm font-medium" style={{ color:"#555" }}>{val}</span>}
          </td>
        );
      })}

      <td className="px-4 py-3.5">
        <div className="flex items-center justify-center gap-1">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
            style={{ color:"#c5c5c5" }}>
            <BarChart2 size={15}/>
          </button>
          <div className="relative">
            <button ref={btnRef} onClick={() => setOpenActionId(isOpen ? null : camp.id)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
              style={{ color: isOpen ? "#e8836a" : "#c5c5c5" }}>
              <Settings size={15}/>
            </button>
            <ActionDropdown isOpen={isOpen} onClose={() => setOpenActionId(null)}
              campaign={camp} onDuplicate={onDuplicate} onDelete={onDelete} triggerRef={btnRef}/>
          </div>
        </div>
      </td>
    </motion.tr>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const CampaignsPage = () => {
  const { displayName, initials, user } = useCurrentUser();

  const [campaigns,    setCampaigns]    = useState<Campaign[]>([]);
  const [activeTab,    setActiveTab]    = useState<"active"|"drafts">("active");
  const [openActionId, setOpenActionId] = useState<string|null>(null);
  const [selectedIds,  setSelectedIds]  = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("custom_campaigns");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCampaigns(parsed.length > 0 ? parsed : initialCampaigns);
    } else {
      setCampaigns(initialCampaigns);
      localStorage.setItem("custom_campaigns", JSON.stringify(initialCampaigns));
    }
  }, []);

  const filtered = campaigns.filter(c =>
    activeTab === "active" ? (c.status === "Active" || c.status === "Finished") : c.status === "Paused"
  );

  const toggleSelect  = (id: string) => setSelectedIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

  const handleDelete = (id: string) => {
    const next = campaigns.filter(c => c.id !== id);
    setCampaigns(next);
    localStorage.setItem("custom_campaigns", JSON.stringify(next));
    setSelectedIds(p => p.filter(i => i !== id));
  };

  const handleDuplicate = (campaign: Campaign) => {
    const dup: Campaign = {
      ...campaign,
      id: Math.random().toString(36).substring(7),
      name: `${campaign.name} (Copy)`,
      createdAt: new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short" }),
    };
    const next = [dup, ...campaigns];
    setCampaigns(next);
    localStorage.setItem("custom_campaigns", JSON.stringify(next));
  };

  const totals = {
    prospects:   campaigns.reduce((s,c) => s+c.leads, 0),
    connections: campaigns.reduce((s,c) => s+c.connections, 0),
    accepted:    campaigns.reduce((s,c) => s+c.accepted, 0),
    messages:    campaigns.reduce((s,c) => s+c.messages, 0),
    replied:     campaigns.reduce((s,c) => s+c.replied, 0),
  };

  const activeCount = campaigns.filter(c => c.status === "Active").length;
  const draftCount  = campaigns.filter(c => c.status === "Paused").length;
  const userAvatar  = user.avatar ?? user.linkedinAvatar;

  const kpis = [
    { iconEl:<Users size={17}/>,              iconBg:"#fce8e3", iconColor:"#e8836a", label:"Total prospects",  value: totals.prospects   },
    { iconEl:<Send size={16}/>,               iconBg:"#fce8e3", iconColor:"#e8836a", label:"Connection sent",  value: totals.connections },
    { iconEl:<CheckCircle2 size={16}/>,       iconBg:"#e3f5ec", iconColor:"#4caf82", label:"Accepted",         value: totals.accepted    },
    { iconEl:<Send size={15} strokeWidth={1.5}/>, iconBg:"#fce8e3", iconColor:"#e8836a", label:"Messages",     value: totals.messages    },
    { iconEl:<MessageSquare size={16}/>,      iconBg:"#e3f5ec", iconColor:"#4caf82", label:"Replied",          value: totals.replied     },
  ];

  return (
    <div className="min-h-screen" style={{ background:"#f0f0f0", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── TOP BAR ── */}
      <div className="flex items-center justify-between px-4 md:px-5 py-2.5 border-b flex-wrap gap-2"
        style={{ background:"#f0f0f0", borderColor:"#ddd" }}>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Account pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:shadow-sm transition-all"
            style={{ background:"#fff", borderColor:"#ddd" }}>
            {userAvatar ? (
              <div className="w-5 h-5 rounded-full overflow-hidden shrink-0">
                <img src={userAvatar} alt="" className="w-full h-full object-cover"/>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0"
                style={{ background:"#e8836a" }}>{initials}</div>
            )}
            <span className="text-xs font-semibold" style={{ color:"#333" }}>
              <span className="hidden sm:inline">{displayName}</span>
              <span className="sm:hidden">{initials}</span>
            </span>
            <ChevronDown size={12} style={{ color:"#aaa" }}/>
          </div>

          <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all hover:bg-[#fef3f0]"
            style={{ borderColor:"#e8836a", color:"#e8836a" }}>
            + Add email
          </button>
          <span className="text-sm font-semibold" style={{ color:"#555" }}>Campaigns</span>
        </div>
      </div>

      <div className="px-4 md:px-5 pt-4 pb-8 space-y-4">

        {/* ── TABS + ACTIONS ── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            {(["active","drafts"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab ? "#fff" : "transparent",
                  color:      activeTab === tab ? "#333" : "#999",
                  border:     activeTab === tab ? "1px solid #ddd" : "1px solid transparent",
                  boxShadow:  activeTab === tab ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
                }}>
                {tab === "active" ? "Active" : "Drafts"}
                <span className="min-w-[18px] h-4 px-1 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                  style={{ background: tab === "active" ? "#e8836a" : "#bbb" }}>
                  {tab === "active" ? activeCount : draftCount}
                </span>
              </button>
            ))}
            <button className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium hover:shadow-sm transition-all"
              style={{ background:"#fff", border:"1px solid #ddd", color:"#666" }}>
              <Clock size={12}/> For all time <ChevronDown size={11} style={{ color:"#aaa" }}/>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold hover:shadow-sm transition-all"
              style={{ background:"#fff", border:"1px solid #ddd", color:"#666" }}>
              <Download size={12}/> Export
            </button>
            <Link href="/dashboard/campaigns/new"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-white transition-all hover:shadow-md active:scale-95"
              style={{ background:"#e8836a", boxShadow:"0 2px 8px rgba(232,131,106,0.35)" }}>
              <Plus size={13}/> <span className="hidden xs:inline">New campaign</span><span className="xs:hidden">New</span>
            </Link>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        {/* Mobile: 2 cols, then last card full width; md+: 5 cols */}
        <div className="grid grid-cols-2 md:hidden gap-3">
          {kpis.slice(0,4).map((s,i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3.5 rounded-2xl"
              style={{ background:"#fff", border:"1px solid #e8e8e8" }}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                style={{ background:s.iconBg, color:s.iconColor }}>{s.iconEl}</div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium leading-tight truncate" style={{ color:"#aaa" }}>{s.label}</p>
                <p className="text-lg font-bold leading-tight" style={{ color:"#1a1a1a" }}>{s.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
          {/* Last KPI full width on mobile */}
          <div className="col-span-2 flex items-center gap-3 px-4 py-3.5 rounded-2xl"
            style={{ background:"#fff", border:"1px solid #e8e8e8" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ background:kpis[4].iconBg, color:kpis[4].iconColor }}>{kpis[4].iconEl}</div>
            <div>
              <p className="text-[10px] font-medium" style={{ color:"#aaa" }}>{kpis[4].label}</p>
              <p className="text-lg font-bold" style={{ color:"#1a1a1a" }}>{kpis[4].value.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Desktop KPI row */}
        <div className="hidden md:grid md:grid-cols-5 rounded-2xl overflow-hidden"
          style={{ background:"#fff", border:"1px solid #e8e8e8" }}>
          {kpis.map((s,i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-4"
              style={{ borderRight: i < 4 ? "1px solid #f2f2f2" : "none" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background:s.iconBg, color:s.iconColor }}>{s.iconEl}</div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color:"#aaa" }}>{s.label} <span style={{ color:"#ddd" }}>ⓘ</span></p>
                <p className="text-2xl font-bold leading-none" style={{ color:"#1a1a1a" }}>{s.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE CARDS ── */}
        <div className="flex flex-col gap-3 md:hidden">
          {filtered.map(camp => (
            <MobileCard key={camp.id} camp={camp} displayName={displayName}
              initials={initials} userAvatar={userAvatar}
              onDuplicate={handleDuplicate} onDelete={handleDelete}/>
          ))}
          {filtered.length === 0 && (
            <div className="py-16 text-center text-sm bg-white rounded-2xl border" style={{ color:"#aaa", borderColor:"#e8e8e8" }}>
              No campaigns found.
            </div>
          )}
        </div>

        {/* ── DESKTOP TABLE ── */}
        <div className="hidden md:block rounded-2xl overflow-hidden" style={{ background:"#fff", border:"1px solid #e8e8e8" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth:860 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid #f2f2f2", background:"#fcfcfc" }}>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 w-24">On/Off</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400">Campaign name</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400">LinkedIn account</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Connections</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Accepted</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Visits</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Likes</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Endorse</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Messages</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Replied</th>
                  <th className="px-4 py-3 w-20"/>
                </tr>
              </thead>
              <tbody>
                {filtered.map((camp, i) => (
                  <CampaignRow key={camp.id} camp={camp} index={i} total={filtered.length}
                    isSelected={selectedIds.includes(camp.id)} onToggleSelect={toggleSelect}
                    onDuplicate={handleDuplicate} onDelete={handleDelete}
                    openActionId={openActionId} setOpenActionId={setOpenActionId}
                    displayName={displayName} userAvatar={userAvatar} initials={initials}/>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={11} className="px-6 py-16 text-center text-sm" style={{ color:"#aaa" }}>
                    No campaigns found.
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CampaignsPage;