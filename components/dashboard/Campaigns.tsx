'use client';
import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  X, 
  Calendar, 
  Users, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Reply,
  BarChart2,
  Settings,
  ArrowRight,
} from "lucide-react";
import { LinkedinLogoIcon } from "@phosphor-icons/react";
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
  account: {
    name: string;
    avatar?: string;
  };
};

const initialCampaigns: Campaign[] = [
  { 
    id: "1",
    name: "Recruiters Outreach", 
    status: "Active", 
    createdAt: "Feb 01",
    leads: 889, 
    connections: 321, 
    accepted: 143,
    visits: 493,
    likes: 160,
    endorse: 78,
    messages: 115,
    replied: 34,
    account: { name: "Connected Account", avatar: "https://picsum.photos/seed/acc1/100/100" }
  },
  { 
    id: "2",
    name: "S&B Strategy", 
    status: "Finished", 
    createdAt: "Feb 13",
    leads: 62, 
    connections: 60, 
    accepted: 27,
    visits: 59,
    likes: 51,
    endorse: 13,
    messages: 23,
    replied: 5,
    account: { name: "Connected Account", avatar: "https://picsum.photos/seed/acc2/100/100" }
  },
  { 
    id: "3",
    name: "Talent Acquisition", 
    status: "Finished", 
    createdAt: "Jan 18",
    leads: 73, 
    connections: 72, 
    accepted: 38,
    visits: 38,
    likes: 35,
    endorse: 24,
    messages: 36,
    replied: 16,
    account: { name: "Connected Account", avatar: "https://picsum.photos/seed/acc3/100/100" }
  },
];

const badgeStyle: Record<CampaignStatus, string> = {
  Active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Completed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  Finished: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const CampaignsPage = () => {
  const [campaignList, setCampaignList] = useState<Campaign[]>(initialCampaigns);
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);
  const [activeTab, setActiveTab] = useState<"Active" | "Drafts">("Active");
  const [newCampaign, setNewCampaign] = useState({ name: "", leads: 100 });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign: Campaign = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCampaign.name,
      status: "Active",
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      leads: Number(newCampaign.leads),
      connections: 0,
      accepted: 0,
      visits: 0,
      likes: 0,
      endorse: 0,
      messages: 0,
      replied: 0,
      account: { name: "Connected Account", avatar: "https://picsum.photos/seed/new/100/100" }
    };
    setCampaignList([campaign, ...campaignList]);
    setIsCreating(false);
    setStep(1);
    setNewCampaign({ name: "", leads: 100 });
  };

  if (isCreating) {
    const steps = [
      { id: 1, label: "Create campaign" },
      { id: 2, label: "Audience" },
      { id: 3, label: "Sequence" },
      { id: 4, label: "Audience & Launch" },
    ];

    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-[calc(100vh-100px)] bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden font-sans"
      >
       
        <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-20">
          <h2 className="text-lg font-bold text-slate-800">Name your campaign and choose accounts</h2>
          
        
          <div className="hidden lg:flex items-center gap-4">
            {steps.map((s, i) => (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-2">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border ${
                    step === s.id 
                      ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200" 
                      : step > s.id 
                        ? "bg-emerald-500 border-emerald-500 text-white" 
                        : "bg-white border-slate-300 text-slate-400"
                  }`}>
                    {step > s.id ? <CheckCircle2 size={14} /> : s.id}
                  </div>
                  <span className={`text-sm font-medium ${step === s.id ? "text-blue-600" : "text-slate-400"}`}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && <ArrowRight size={16} className="text-slate-300" />}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={handleCreateCampaign}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              Save 
              <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => { setIsCreating(false); setStep(1); }}
              className="h-10 w-10 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors border border-slate-200"
            >
              <X size={20} />
            </button>
          </div>
        </div>

   
        <div className="flex-1 p-10 max-w-6xl mx-auto w-full space-y-12">
    
          <div className="space-y-4">
            <label className="text-base font-bold text-slate-800">Campaign name</label>
            <input 
              type="text" 
              placeholder="Name your campaign" 
              value={newCampaign.name} 
              onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})} 
              className="w-full bg-white border border-slate-300 rounded-lg px-5 py-3.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400" 
            />
          </div>

   
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         
            <div className="space-y-6">
              <label className="text-base font-bold text-slate-800">Select LinkedIn account</label>
              
              <button className="flex items-center gap-4 group">
               <div className="h-14 w-14 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 transition-colors">
  <span className="font-black text-4xl">in</span>
</div>
                <span className="text-blue-600 font-bold hover:underline">Add LinkedIn account</span>
              </button>

        
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50/30">
                <p className="text-sm text-slate-500 leading-relaxed text-center">
                  Please add a LinkedIn account if you want to launch a multichannel campaign. Skip this step if you are going to launch an email campaign.
                </p>
              </div>
            </div>

        
            <div className="space-y-6">
              <label className="text-base font-bold text-slate-800">Select email account to use to send emails</label>
              
              <button className="flex items-center gap-4 group">
                <div className="h-14 w-14 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 transition-colors">
 <MessageSquare size={24} />
</div>
                <span className="text-blue-600 font-bold hover:underline">Add email account</span>
              </button>

        
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50/30">
                <p className="text-sm text-slate-500 leading-relaxed text-center">
                  Please add a LinkedIn account if you want to launch a multichannel campaign. Skip this step if you are going to launch a LinkedIn campaign.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-blue-600" />
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-blue-500/60">Campaign Management</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display uppercase tracking-tighter text-white leading-none">
            Outreach <br />
            <span className="text-zinc-700">Campaigns.</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-white/[0.03] p-1 rounded-2xl border border-white/5">
            {(["Active", "Drafts"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-2.5 text-[10px] uppercase tracking-[0.2em] font-black rounded-xl transition-all ${
                  activeTab === tab 
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20" 
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="h-11 px-5 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-3 hover:text-white hover:bg-white/5 transition-all">
              <Calendar size={14} />
              Timeline
            </button>
            <button onClick={() => setIsCreating(true)} className="h-11 px-8 bg-blue-500 text-white text-[10px] uppercase tracking-widest font-black rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-3 shadow-xl shadow-blue-500/20">
              <Plus size={18} /> New Campaign
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total prospects", value: "1,024", icon: Users, color: "text-blue-500" },
          { label: "Connection sent", value: "453", icon: Send, color: "text-blue-500" },
          { label: "Accepted", value: "208", icon: CheckCircle2, color: "text-emerald-500" },
          { label: "Messages", value: "174", icon: MessageSquare, color: "text-amber-500" },
          { label: "Replied", value: "55", icon: Reply, color: "text-cyan-500" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-[0.08]">
              <stat.icon size={48} />
            </div>
            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-zinc-600 mb-4">{stat.label}</p>
            <div className="flex items-end gap-3">
              <h3 className="text-3xl font-display font-bold text-white tabular-nums leading-none">{stat.value}</h3>
              <div className={`h-1.5 w-1.5 rounded-full mb-1 ${stat.color.replace('text-', 'bg-')}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-zinc-900/30 backdrop-blur-2xl border border-white/[0.03] rounded-[2rem] overflow-hidden shadow-2xl overflow-x-auto">
        <table className="w-full text-left min-w-[1100px]">
          <thead className="bg-white/[0.02] border-b border-white/[0.03]">
            <tr>
              <th className="pl-8 pr-4 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600">Status</th>
              <th className="px-6 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600">Campaign</th>
              <th className="px-4 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 text-center">Sent</th>
              <th className="px-4 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 text-center">Accepted</th>
              <th className="px-4 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 text-center">Visits</th>
              <th className="px-4 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 text-center">Likes</th>
              <th className="px-4 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 text-center">Messages</th>
              <th className="px-4 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 text-center">Replied</th>
              <th className="pl-4 pr-8 py-6 text-[9px] uppercase tracking-[0.2em] font-black text-zinc-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {campaignList.map((campaign, i) => (
              <motion.tr 
                key={campaign.id} 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: i * 0.05 }} 
    
              >
                <td className="pl-8 pr-4 py-6">
                  <button className={`w-9 h-5 rounded-full relative transition-all duration-300 ${campaign.status === 'Active' ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)]' : 'bg-zinc-800'}`}>
                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${campaign.status === 'Active' ? 'left-[20px]' : 'left-1'}`} />
                  </button>
                </td>
                
                <td className="px-6 py-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[12px] font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                      {campaign.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${badgeStyle[campaign.status]}`}>
                        {campaign.status}
                      </span>
                      <span className="text-[9px] font-bold text-zinc-600 tabular-nums">{campaign.leads} leads</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span className="text-[9px] font-bold text-zinc-600">{campaign.createdAt}</span>
                    </div>
                  </div>
                </td>

               <td className="px-4 py-6 text-center text-[11px] font-bold text-zinc-500 tabular-nums">
  <span className="relative inline-block cursor-pointer group">
    {campaign.connections}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </span>
</td>
                <td className="px-4 py-6 text-center text-[11px] font-bold text-zinc-500 tabular-nums">
  <span className="relative inline-block cursor-pointer group">
    {campaign.accepted}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </span>
</td>
                <td className="px-4 py-6 text-center text-[11px] font-bold text-zinc-500 tabular-nums">
  <span className="relative inline-block cursor-pointer group">
    {campaign.visits}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </span>
</td>
               <td className="px-4 py-6 text-center text-[11px] font-bold text-zinc-500 tabular-nums">
  <span className="relative inline-block cursor-pointer group">
    {campaign.likes}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </span>
</td>
                <td className="px-4 py-6 text-center text-[11px] font-bold text-zinc-500 tabular-nums">
  <span className="relative inline-block cursor-pointer group">
    {campaign.messages}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </span>
</td>
        
                <td className="px-4 py-6 text-center text-[11px] font-bold text-emerald-500 tabular-nums">
  <span className="relative inline-block cursor-pointer group">
    {campaign.connections}
    <span className="absolute left-0 -bottom-1 h-[1px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
  </span>
</td>

                <td className="pl-4 pr-8 py-6">
                  <div className="flex items-center justify-end gap-2">
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-zinc-600 hover:text-white transition-all">
                      <BarChart2 size={14} />
                    </button>
                    <button className="h-8 w-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-zinc-600 hover:text-white transition-all">
                      <Settings size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsPage;
