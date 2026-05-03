
'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, Users, Send, CheckCircle2, MessageSquare, BarChart2,
  Pencil, Download, Copy, Trash2, Settings, Play, Check, Clock,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

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
  { id:"1", name:"Recruiters",         status:"Active",   createdAt:"1 Feb",  leads:889,  connections:321, accepted:143, visits:493, likes:160, endorse:78,  messages:115, replied:34 },
  { id:"2", name:"S&B Outreach",       status:"Finished", createdAt:"13 Feb", leads:62,   connections:60,  accepted:27,  visits:59,  likes:51,  endorse:13,  messages:23,  replied:5  },
  { id:"3", name:"Talent Acquisition", status:"Finished", createdAt:"18 Jan", leads:73,   connections:72,  accepted:38,  visits:38,  likes:35,  endorse:24,  messages:36,  replied:16 },
  { id:"4", name:"Growth Strategy",    status:"Active",   createdAt:"5 Mar",  leads:1250, connections:450, accepted:310, visits:900, likes:240, endorse:112, messages:180, replied:65 },
];

type DropdownPos = { top?: number; bottom?: number; right: number };

const ActionDropdown = ({
  isOpen, onClose, campaign, onDuplicate, onDelete, triggerRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  onDuplicate?: (c: Campaign) => void;
  onDelete?: (id: string) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<DropdownPos>({ top: 0, right: 0 });

  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const DROPDOWN_H = 180; // height of full menu
    const GAP = 6;
    const spaceBelow = window.innerHeight - r.bottom;

    if (spaceBelow < DROPDOWN_H + GAP) {
      setPos({ bottom: window.innerHeight - r.top + GAP, right: window.innerWidth - r.right });
    } else {
      // Open downward
      setPos({ top: r.bottom + GAP, right: window.innerWidth - r.right });
    }
  }, [isOpen]);

  
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.12 }}
          className="fixed w-44 rounded-xl bg-white py-1"
          style={{
            zIndex: 99999,
            boxShadow: "0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)",
            border: "1px solid #ebebeb",
            ...(pos.top !== undefined ? { top: pos.top } : { bottom: pos.bottom }),
            right: pos.right,
          }}
        >
          <Link
            href={`/dashboard/campaigns/edit/${campaign.id}`}
            onClick={onClose}
            className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-gray-50 text-gray-700 transition-colors"
          >
            <Pencil size={13} className="text-gray-400" />
            Edit Workflow
          </Link>
          <button className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-gray-50 text-gray-700 transition-colors">
            <Download size={13} className="text-gray-400" />
            Export Data
          </button>
          <button
            onClick={() => { onDuplicate?.(campaign); onClose(); }}
            className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium hover:bg-gray-50 text-gray-700 transition-colors"
          >
            <Copy size={13} className="text-gray-400" />
            Duplicate
          </button>
          <div className="h-px mx-3 my-1 bg-gray-100" />
          <button
            onClick={() => { onDelete?.(campaign.id); onClose(); }}
            className="w-full px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CampaignRow = ({
  camp, index, total, isSelected, onToggleSelect,
  onDuplicate, onDelete, openActionId, setOpenActionId,
  displayName, userAvatar, initials,
}: {
  camp: Campaign; index: number; total: number;
  isSelected: boolean; onToggleSelect: (id: string) => void;
  onDuplicate: (c: Campaign) => void; onDelete: (id: string) => void;
  openActionId: string | null; setOpenActionId: (id: string | null) => void;
  displayName: string; userAvatar?: string; initials: string;
}) => {
  const settingsBtnRef = useRef<HTMLButtonElement>(null!);
  const isOpen = openActionId === camp.id;

  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.04 }}
      style={{
        borderBottom: index < total - 1 ? "1px solid #f3f3f3" : "none",
        background: isSelected ? "#fff8f6" : "#fff",
      }}
    >
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-2">
          {camp.status === "Finished" ? (
            <div className="w-5 h-5 rounded flex items-center justify-center shrink-0"
              style={{ background: "#e8836a" }}>
              <Check size={11} color="#fff" strokeWidth={3} />
            </div>
          ) : (
            <button
              onClick={() => onToggleSelect(camp.id)}
              className="w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0"
              style={{
                borderColor: isSelected ? "#e8836a" : "#d5d5d5",
                background: isSelected ? "#e8836a" : "#fff",
              }}
            >
              {isSelected && <Check size={11} color="#fff" strokeWidth={3} />}
            </button>
          )}
          {camp.status === "Active" && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "#f5f5f5" }}>
              <Play size={11} style={{ color: "#aaa", fill: "#aaa" }} />
            </div>
          )}
        </div>
      </td>

      <td className="px-4 py-3.5">
        <p className="text-sm font-semibold leading-tight" style={{ color: "#222" }}>{camp.name}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {camp.status === "Finished" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#e3f5ec", color: "#4caf82" }}>Finished</span>
          )}
          {camp.status === "Active" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: "#fef3f0", color: "#e8836a" }}>Active</span>
          )}
          <span className="text-[11px]" style={{ color: "#aaa" }}>
            {camp.leads.toLocaleString()} prospects · {camp.createdAt}
          </span>
        </div>
      </td>

      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          {userAvatar ? (
            <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200 shrink-0">
              <img src={userAvatar} alt="" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ background: "#e8836a" }}>
              {initials}
            </div>
          )}
          <span className="text-xs font-medium truncate max-w-[120px]" style={{ color: "#555" }}>
            {displayName}
          </span>
        </div>
      </td>

      {[camp.connections, camp.accepted, camp.visits, camp.likes, camp.endorse, camp.messages, camp.replied]
        .map((val, mi) => {
          const isLink = mi === 0 || mi === 1 || mi === 5 || mi === 6;
          return (
            <td key={mi} className="px-4 py-3.5 text-center">
              {isLink ? (
                <span className="text-sm font-semibold cursor-pointer"
                  style={{ color: "#e8836a", textDecoration: "underline", textDecorationColor: "#e8836a55" }}>
                  {val}
                </span>
              ) : (
                <span className="text-sm font-medium" style={{ color: "#555" }}>{val}</span>
              )}
            </td>
          );
        })}

      <td className="px-4 py-3.5">
        <div className="flex items-center justify-center gap-1">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
            style={{ color: "#c5c5c5" }}>
            <BarChart2 size={15} />
          </button>

          <div className="relative">
            <button
              ref={settingsBtnRef}
              onClick={() => setOpenActionId(isOpen ? null : camp.id)}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-all"
              style={{ color: isOpen ? "#e8836a" : "#c5c5c5" }}
            >
              <Settings size={15} />
            </button>

            <ActionDropdown
              isOpen={isOpen}
              onClose={() => setOpenActionId(null)}
              campaign={camp}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              triggerRef={settingsBtnRef}
            />
          </div>
        </div>
      </td>
    </motion.tr>
  );
};
const CampaignsPage = () => {
  const { displayName, initials, user } = useCurrentUser();

  const [campaigns,    setCampaigns]    = useState<Campaign[]>([]);
  const [activeTab,    setActiveTab]    = useState<"active" | "drafts">("active");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
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

  const filteredCampaigns = campaigns.filter(c =>
    activeTab === "active"
      ? c.status === "Active" || c.status === "Finished"
      : c.status === "Paused"
  );

  const toggleSelect = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleDelete = (id: string) => {
    const next = campaigns.filter(c => c.id !== id);
    setCampaigns(next);
    localStorage.setItem("custom_campaigns", JSON.stringify(next));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleDuplicate = (campaign: Campaign) => {
    const dup: Campaign = {
      ...campaign,
      id: Math.random().toString(36).substring(7),
      name: `${campaign.name} (Copy)`,
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    };
    const next = [dup, ...campaigns];
    setCampaigns(next);
    localStorage.setItem("custom_campaigns", JSON.stringify(next));
  };

  const totalProspects   = campaigns.reduce((s, c) => s + c.leads, 0);
  const totalConnections = campaigns.reduce((s, c) => s + c.connections, 0);
  const totalAccepted    = campaigns.reduce((s, c) => s + c.accepted, 0);
  const totalMessages    = campaigns.reduce((s, c) => s + c.messages, 0);
  const totalReplied     = campaigns.reduce((s, c) => s + c.replied, 0);
  const activeCount      = campaigns.filter(c => c.status === "Active").length;
  const draftCount       = campaigns.filter(c => c.status === "Paused").length;

  const userAvatar = user.avatar ?? user.linkedinAvatar;

  return (
    <div className="min-h-screen"
      style={{ background: "#f0f0f0", fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      <div className="flex items-center justify-between px-5 py-2.5 border-b"
        style={{ background: "#f0f0f0", borderColor: "#ddd" }}>
        <div className="flex items-center gap-3 flex-wrap">

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border cursor-pointer hover:shadow-sm transition-all"
            style={{ background: "#fff", borderColor: "#ddd" }}>
            {userAvatar ? (
              <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                <img src={userAvatar} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ background: "#e8836a" }}>
                {initials}
              </div>
            )}
            <span className="text-xs font-semibold" style={{ color: "#333" }}>{displayName}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          <button className="px-4 py-1.5 rounded-full border text-xs font-semibold transition-all hover:bg-[#fef3f0]"
            style={{ borderColor: "#e8836a", color: "#e8836a", background: "transparent" }}>
            + Add email account
          </button>

          <span className="text-sm font-semibold" style={{ color: "#555" }}>Campaigns</span>
        </div>
      </div>

      <div className="px-5 pt-4 pb-8">

        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <button onClick={() => setActiveTab("active")}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: activeTab === "active" ? "#fff" : "transparent",
                color:      activeTab === "active" ? "#333" : "#999",
                border:     activeTab === "active" ? "1px solid #ddd" : "1px solid transparent",
                boxShadow:  activeTab === "active" ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
              }}>
              Active
              <span className="min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: "#e8836a" }}>
                {activeCount}
              </span>
            </button>

            <button onClick={() => setActiveTab("drafts")}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: activeTab === "drafts" ? "#fff" : "transparent",
                color:      activeTab === "drafts" ? "#333" : "#999",
                border:     activeTab === "drafts" ? "1px solid #ddd" : "1px solid transparent",
                boxShadow:  activeTab === "drafts" ? "0 1px 4px rgba(0,0,0,0.07)" : "none",
              }}>
              Drafts
              <span className="min-w-[20px] h-5 px-1.5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                style={{ background: "#bbb" }}>
                {draftCount}
              </span>
            </button>

            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium hover:shadow-sm transition-all"
              style={{ background: "#fff", border: "1px solid #ddd", color: "#666" }}>
              <Clock size={12} /> For all time
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold hover:shadow-sm transition-all"
              style={{ background: "#fff", border: "1px solid #ddd", color: "#666" }}>
              <Download size={13} /> Export
            </button>
            <Link href="/dashboard/campaigns/new"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white transition-all hover:shadow-md active:scale-95"
              style={{ background: "#e8836a", boxShadow: "0 2px 8px rgba(232,131,106,0.35)" }}>
              <Plus size={14} /> New campaign
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-5 rounded-2xl mb-4 overflow-hidden"
          style={{ background: "#fff", border: "1px solid #e8e8e8" }}>
          {[
            { iconEl: <Users size={18} />,                   iconBg: "#fce8e3", iconColor: "#e8836a", label: "Total prospects",  value: totalProspects   },
            { iconEl: <Send size={17} />,                    iconBg: "#fce8e3", iconColor: "#e8836a", label: "Connection sent",  value: totalConnections },
            { iconEl: <CheckCircle2 size={17} />,            iconBg: "#e3f5ec", iconColor: "#4caf82", label: "Accepted",         value: totalAccepted    },
            { iconEl: <Send size={16} strokeWidth={1.5} />,  iconBg: "#fce8e3", iconColor: "#e8836a", label: "Messages",         value: totalMessages    },
            { iconEl: <MessageSquare size={17} />,           iconBg: "#e3f5ec", iconColor: "#4caf82", label: "Replied",          value: totalReplied     },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-4"
              style={{ borderRight: i < 4 ? "1px solid #f2f2f2" : "none" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: s.iconBg, color: s.iconColor }}>
                {s.iconEl}
              </div>
              <div>
                <p className="text-xs font-medium mb-0.5" style={{ color: "#aaa" }}>
                  {s.label} <span style={{ color: "#ddd" }}>ⓘ</span>
                </p>
                <p className="text-2xl font-bold leading-none" style={{ color: "#1a1a1a" }}>
                  {s.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden"
          style={{ background: "#fff", border: "1px solid #e8e8e8" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: 860 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #f2f2f2", background: "#fcfcfc" }}>
                  <th className="px-5 py-3 text-[11px] font-semibold text-gray-400 w-24">On/Off</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400">Campaign name, Status, Created at</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400">LinkedIn account</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Connections</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Accepted</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Visits</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Likes</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Endorse</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Messages</th>
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-400 text-center">Replied</th>
                  <th className="px-4 py-3 w-20" />
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((camp, i) => (
                  <CampaignRow
                    key={camp.id}
                    camp={camp}
                    index={i}
                    total={filteredCampaigns.length}
                    isSelected={selectedIds.includes(camp.id)}
                    onToggleSelect={toggleSelect}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                    openActionId={openActionId}
                    setOpenActionId={setOpenActionId}
                    displayName={displayName}
                    userAvatar={userAvatar}
                    initials={initials}
                  />
                ))}
                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-6 py-16 text-center text-sm" style={{ color: "#aaa" }}>
                      No campaigns found.
                    </td>
                  </tr>
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