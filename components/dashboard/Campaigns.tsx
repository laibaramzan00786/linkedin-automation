"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, MoreHorizontal, X } from "lucide-react";

type CampaignStatus = "Active" | "Paused" | "Completed";

type Campaign = {
  name: string;
  status: CampaignStatus;
  leads: number;
  sent: number;
  replies: number;
};

const initialCampaigns: Campaign[] = [
  {
    name: "CTO Outreach – US",
    status: "Active",
    leads: 320,
    sent: 840,
    replies: 48,
  },
  {
    name: "Startup Founders – EU",
    status: "Paused",
    leads: 210,
    sent: 560,
    replies: 21,
  },
  {
    name: "Marketing Heads – SaaS",
    status: "Completed",
    leads: 180,
    sent: 420,
    replies: 36,
  },
];

const badgeStyle: Record<CampaignStatus, string> = {
  Active: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Paused: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Completed: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const Campaigns: React.FC = () => {
  const [campaignList, setCampaignList] = useState<Campaign[]>(initialCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: "", leads: 0 });

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign: Campaign = {
      name: newCampaign.name,
      status: "Active",
      leads: Number(newCampaign.leads),
      sent: 0,
      replies: 0,
    };
    setCampaignList([campaign, ...campaignList]);
    setIsModalOpen(false);
    setNewCampaign({ name: "", leads: 0 });
  };

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60">Campaigns / 2026</span>
          <h1 className="text-3xl md:text-5xl font-display uppercase tracking-tighter text-white">
            Outreach <br />
            <span className="text-zinc-600">Campaigns.</span>
          </h1>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(37,99,235,0.2)]"
        >
          <Plus size={16} />
          New Campaign
        </button>
      </div>

   
      <div className="bg-zinc-900/50 backdrop-blur-2xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="px-6 md:px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-500">Campaign Name</th>
              <th className="px-6 md:px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-500">Status</th>
              <th className="px-6 md:px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-500">Leads</th>
              <th className="px-6 md:px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-500">Sent</th>
              <th className="px-6 md:px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-500">Replies</th>
              <th className="px-6 md:px-8 py-5 text-[10px] uppercase tracking-widest font-bold text-zinc-500"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {campaignList.map((campaign, i) => (
              <motion.tr 
                key={campaign.name + i} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 md:px-8 py-6">
                  <span className="text-xs uppercase tracking-widest font-bold text-white group-hover:text-blue-400 transition-colors">
                    {campaign.name}
                  </span>
                </td>

                <td className="px-6 md:px-8 py-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black border ${badgeStyle[campaign.status]}`}
                  >
                    {campaign.status}
                  </span>
                </td>

                <td className="px-6 md:px-8 py-6 text-xs font-bold text-zinc-500 uppercase tracking-widest">{campaign.leads}</td>
                <td className="px-6 md:px-8 py-6 text-xs font-bold text-zinc-500 uppercase tracking-widest">{campaign.sent}</td>
                <td className="px-6 md:px-8 py-6 text-xs font-bold text-zinc-500 uppercase tracking-widest">{campaign.replies}</td>
                <td className="px-6 md:px-8 py-6 text-right">
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-500 hover:text-white">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

   
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_0_100px_rgba(37,99,235,0.1)] overflow-hidden"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 md:top-8 md:right-8 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex flex-col gap-8 md:gap-10">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60">Action / New Campaign</span>
                  <h2 className="text-3xl md:text-4xl font-display uppercase tracking-tighter text-white">Create <br/><span className="text-zinc-600">Campaign.</span></h2>
                </div>

                <form onSubmit={handleCreateCampaign} className="flex flex-col gap-6 md:gap-8">
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">Campaign Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sales Outreach Q1"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                      className="bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest font-bold focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-800 text-white"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500">Target Leads</label>
                    <input 
                      type="number" 
                      placeholder="500"
                      value={newCampaign.leads || ""}
                      onChange={(e) => setNewCampaign({...newCampaign, leads: Number(e.target.value)})}
                      className="bg-transparent border-b border-white/10 py-3 text-xs uppercase tracking-widest font-bold focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-800 text-white"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="group flex items-center justify-center gap-4 w-full bg-blue-600 text-white py-4 md:py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all mt-4 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
                  >
                    Launch Campaign
                    <Plus size={16} className="group-hover:rotate-90 transition-transform duration-500" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Campaigns;