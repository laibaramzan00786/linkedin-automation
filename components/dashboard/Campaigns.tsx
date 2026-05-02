
  


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
  { id:"1", name:"Recruiters",        status:"Active",   createdAt:"1 Feb",  leads:889,  connections:321, accepted:143, visits:493, likes:160, endorse:78,  messages:115, replied:34 },
  { id:"2", name:"S&B Outreach",      status:"Finished", createdAt:"13 Feb", leads:62,   connections:60,  accepted:27,  visits:59,  likes:51,  endorse:13,  messages:23,  replied:5  },
  { id:"3", name:"Talent Acquisition",status:"Finished", createdAt:"18 Jan", leads:73,   connections:72,  accepted:38,  visits:38,  likes:35,  endorse:24,  messages:36,  replied:16 },
  { id:"4", name:"Growth Strategy",   status:"Active",   createdAt:"5 Mar",  leads:1250, connections:450, accepted:310, visits:900, likes:240, endorse:112, messages:180, replied:65 },
];

const ActionDropdown = ({
  isOpen, onClose, campaign, onDuplicate, onDelete,
}: {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
  onDuplicate?: (c: Campaign) => void;
  onDelete?: (id: string) => void;
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity:0, scale:0.95, y:6 }}
          animate={{ opacity:1, scale:1, y:0 }}
          exit={{ opacity:0, scale:0.95, y:6 }}
          transition={{ duration:0.15 }}
          className="absolute right-0 top-full mt-1 w-48 rounded-lg shadow-xl border bg-white border-gray-200 py-1 z-[60] overflow-hidden"
        >
          <Link
            href={`/dashboard/campaigns/edit/${campaign.id}`}
            className="w-full px-4 py-2 flex items-center gap-3 text-xs font-medium hover:bg-gray-50 text-gray-700"
          >
            <Pencil size={13} className="text-gray-400" />
            Edit Workflow
          </Link>
          <button className="w-full px-4 py-2 flex items-center gap-3 text-xs font-medium hover:bg-gray-50 text-gray-700">
            <Download size={13} className="text-gray-400" />
            Export Data
          </button>
          <button
            onClick={() => { onDuplicate?.(campaign); onClose(); }}
            className="w-full px-4 py-2 flex items-center gap-3 text-xs font-medium hover:bg-gray-50 text-gray-700"
          >
            <Copy size={13} className="text-gray-400" />
            Duplicate
          </button>
          <div className="h-px mx-3 my-1 bg-gray-100" />
          <button
            onClick={() => { onDelete?.(campaign.id); onClose(); }}
            className="w-full px-4 py-2 flex items-center gap-3 text-xs font-medium text-red-500 hover:bg-red-50"
          >
            <Trash2 size={13} />
            Delete
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CampaignsPage = () => {
 
  const { displayName, initials, user } = useCurrentUser();

  const [campaigns,    setCampaigns]    = useState<Campaign[]>([]);
  const [activeTab,    setActiveTab]    = useState<"active" | "drafts">("active");
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [selectedIds,  setSelectedIds]  = useState<string[]>([]);

  // Load campaigns
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

  const filteredCampaigns = campaigns.filter(c => {
    if (activeTab === "active") return c.status === "Active" || c.status === "Finished";
    return c.status === "Paused";
  });

  const toggleSelect = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const handleDelete = (id: string) => {
    const next = campaigns.filter(c => c.id !== id);
    setCampaigns(next);
    localStorage.setItem("custom_campaigns", JSON.stringify(next));
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  const handleDuplicate = (campaign: Campaign) => {
    const dup = {
      ...campaign,
      id: Math.random().toString(36).substring(7),
      name: `${campaign.name} (Copy)`,
      createdAt: new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short" }),
    };
    const next = [dup, ...campaigns];
    setCampaigns(next);
    localStorage.setItem("custom_campaigns", JSON.stringify(next));
  };

  const totalProspects   = campaigns.reduce((s,c) => s + c.leads, 0);
  const totalConnections = campaigns.reduce((s,c) => s + c.connections, 0);
  const totalAccepted    = campaigns.reduce((s,c) => s + c.accepted, 0);
  const totalMessages    = campaigns.reduce((s,c) => s + c.messages, 0);
  const totalReplied     = campaigns.reduce((s,c) => s + c.replied, 0);
  const activeCount      = campaigns.filter(c => c.status === "Active").length;
  const draftCount       = campaigns.filter(c => c.status === "Paused").length;

  return (
    <div className="min-h-screen" style={{ background:"#f0f0f0", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

    
      <div className="flex items-center justify-between px-6 py-3 border-b"
        style={{ background:"#f0f0f0", borderColor:"#ddd" }}>
        <div className="flex items-center gap-3">


          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium"
            style={{ background:"#fff", borderColor:"#ccc", color:"#333" }}>

            
            {user.avatar || user.linkedinAvatar ? (
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <img src={user.avatar ?? user.linkedinAvatar} alt="" className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                style={{ background:"#e8836a" }}>
                {initials}
              </div>
            )}

            <span className="text-xs font-semibold">{displayName}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>

          <button className="px-4 py-1.5 rounded-full border text-xs font-semibold"
            style={{ borderColor:"#e8836a", color:"#e8836a", background:"transparent" }}>
            + Add email account
          </button>
          <span className="text-sm font-semibold" style={{ color:"#333" }}>Campaigns</span>
        </div>
      </div>

      <div className="px-6 pt-5 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {(["active","drafts"] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all"
                style={{
                  background: activeTab === tab ? "#fff" : "transparent",
                  color:      activeTab === tab ? "#333" : "#888",
                  border:     activeTab === tab ? "1px solid #ddd" : "1px solid transparent",
                  boxShadow:  activeTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                }}>
                {tab === "active" ? "Active" : "Drafts"}
                <span className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
                  style={{ background: tab === "active" ? "#e8836a" : "#bbb", color:"#fff" }}>
                  {tab === "active" ? activeCount : draftCount}
                </span>
              </button>
            ))}
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium ml-2"
              style={{ background:"#fff", border:"1px solid #ddd", color:"#555" }}>
              <Clock size={13} />
              For all time
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
              style={{ background:"#fff", border:"1px solid #ddd", color:"#555" }}>
              <Download size={13} />
              Export
            </button>
            <Link href="/dashboard/campaigns/new"
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white"
              style={{ background:"#f86d4a" }}>
              <Plus size={14} />
              New campaign
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-5 rounded-2xl mb-4 overflow-hidden"
          style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
          {[
            { icon:<Users size={18} style={{ color:"#e8836a" }}/>,         bg:"#fce8e3", label:"Total prospects",  value:totalProspects },
            { icon:<Send size={18} style={{ color:"#e8836a" }}/>,           bg:"#fce8e3", label:"Connection sent",  value:totalConnections },
            { icon:<CheckCircle2 size={18} style={{ color:"#4caf82" }}/>,   bg:"#e3f5ec", label:"Accepted",         value:totalAccepted },
            { icon:<Send size={18} style={{ color:"#e8836a" }} strokeWidth={1.5}/>, bg:"#fce8e3", label:"Messages", value:totalMessages },
            { icon:<MessageSquare size={18} style={{ color:"#4caf82" }}/>,  bg:"#e3f5ec", label:"Replied",          value:totalReplied },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-5"
              style={{ borderRight: i < 4 ? "1px solid #eee" : "none" }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: stat.bg }}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">{stat.label} ⓘ</p>
                <p className="text-2xl font-bold" style={{ color:"#222", lineHeight:1 }}>{stat.value.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth:860 }}>
              <thead>
                <tr style={{ borderBottom:"1px solid #eee" }}>
                  <th className="px-5 py-3 text-xs font-semibold text-gray-400 w-28">On/Off</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400">Campaign name</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400">LinkedIn account</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center">Connections</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center">Accepted</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center">Visits</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center">Likes</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center">Endorse</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center">Messages</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center">Replied</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 text-center w-20"></th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((camp, i) => (
                  <motion.tr key={camp.id}
                    initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: i * 0.04 }}
                    className="group"
                    style={{
                      borderBottom: i < filteredCampaigns.length - 1 ? "1px solid #f0f0f0" : "none",
                      background: selectedIds.includes(camp.id) ? "#fff8f6" : "#fff",
                    }}>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {camp.status === "Finished" ? (
                          <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background:"#e8836a" }}>
                            <Check size={12} color="#fff" strokeWidth={3} />
                          </div>
                        ) : (
                          <button onClick={() => toggleSelect(camp.id)}
                            className="w-5 h-5 rounded border flex items-center justify-center transition-all"
                            style={{ borderColor:"#ddd", background: selectedIds.includes(camp.id) ? "#e8836a" : "#fff" }}>
                            {selectedIds.includes(camp.id) && <Check size={12} color="#fff" strokeWidth={3} />}
                          </button>
                        )}
                        {camp.status === "Active" && (
                          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background:"#f5f5f5" }}>
                            <Play size={12} style={{ color:"#888" }} />
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-gray-800">{camp.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {camp.status === "Finished" && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                            style={{ background:"#e3f5ec", color:"#4caf82" }}>Finished</span>
                        )}
                        <span className="text-[11px] text-gray-400">{camp.leads} prospects • {camp.createdAt}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        {user.avatar || user.linkedinAvatar ? (
                          <div className="w-7 h-7 rounded-full overflow-hidden bg-gray-200">
                            <img src={user.avatar ?? user.linkedinAvatar} alt="" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                            style={{ background:"#e8836a" }}>
                            {initials}
                          </div>
                        )}
                        <span className="text-xs font-medium text-gray-600">{displayName}</span>
                      </div>
                    </td>
                    {[camp.connections, camp.accepted, camp.visits, camp.likes, camp.endorse, camp.messages, camp.replied].map((val, mi) => {
                      const linked = mi === 0 || mi === 1 || mi === 5 || mi === 6;
                      return (
                        <td key={mi} className="px-4 py-4 text-center">
                          {linked
                            ? <span className="text-sm font-semibold underline cursor-pointer" style={{ color:"#e8836a", textDecorationColor:"#e8836a" }}>{val}</span>
                            : <span className="text-sm font-semibold text-gray-700">{val}</span>
                          }
                        </td>
                      );
                    })}

                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-1">
                        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color:"#bbb" }}>
                          <BarChart2 size={15} />
                        </button>
                        <div className="relative">
                          <button onClick={() => setOpenActionId(prev => prev === camp.id ? null : camp.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color:"#bbb" }}>
                            <Settings size={15} />
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
                    </td>
                  </motion.tr>
                ))}
                {filteredCampaigns.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-6 py-16 text-center text-sm text-gray-400">No campaigns found.</td>
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