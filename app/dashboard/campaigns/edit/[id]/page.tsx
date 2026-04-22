'use client';
import { useState } from "react";
import { useParams,useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Save, 
  Play, 
  Settings, 
  Zap, 
  Mail, 
  Clock, 
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";
import { LinkedinLogoIcon } from "@phosphor-icons/react";
const EditCampaignPage = () => {
  const { id } = useParams();
  const route = useRouter();
  const [activeTab, setActiveTab] = useState("Sequence");

  // Mock campaign data
  const [campaignName, setCampaignName] = useState("Recruiters Outreach");
  
  const [steps] = useState([
    { id: 1, type: "LinkedIn Connection", delay: "Immediate", content: "Hi {{firstName}}, I saw your profile and..." },
    { id: 2, type: "LinkedIn Message", delay: "2 days later", content: "Thanks for connecting! I'd love to chat about..." },
    { id: 3, type: "Follow-up Email", delay: "5 days later", content: "Subject: Checking in\n\nHi {{firstName}}, just following up..." }
  ]);

  const tabs = ["Strategy", "Sequence", "Audience", "Settings"];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button
            onClick={() => route.back()}
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[8px] font-black uppercase tracking-widest border border-blue-500/20">Active</span>
              <span className="text-zinc-600 text-[10px] uppercase tracking-widest font-bold">Campaign ID: {id}</span>
            </div>
            <input 
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="text-3xl md:text-5xl font-display uppercase tracking-tighter text-white bg-transparent border-none focus:outline-none focus:ring-0 p-0 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="h-12 px-6 bg-white/[0.03] border border-white/5 rounded-2xl text-[10px] uppercase tracking-widest font-black text-zinc-400 hover:text-white transition-all flex items-center gap-3">
            <Save size={16} />
            Save Draft
          </button>
          <button className="h-12 px-8 bg-emerald-500 text-white text-[10px] uppercase tracking-widest font-black rounded-2xl hover:bg-emerald-600 transition-all flex items-center gap-3 shadow-xl shadow-emerald-500/20">
            <Play size={18} />
            Launch Now
          </button>
        </div>
      </div>

   
      <div className="flex border-b border-white/5">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-8 py-5 text-[10px] uppercase tracking-[0.2em] font-black transition-all ${
              activeTab === tab ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div 
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" 
              />
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
     
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence mode="popLayout">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-all"
              >
               
                {index < steps.length - 1 && (
                  <div className="absolute left-12 top-full h-10 w-px bg-white/5 group-hover:bg-blue-500/20 transition-all" />
                )}

                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-lg shadow-blue-500/5 group-hover:scale-110 transition-transform">
                      {step.type.includes("LinkedIn") ? <LinkedinLogoIcon size={24} /> : <Mail size={24} />}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Step {index + 1}</span>
                        <div className="h-1 w-1 rounded-full bg-zinc-700" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{step.type}</span>
                      </div>
                      <h4 className="text-xl font-bold text-white tracking-tight">{step.delay}</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed max-w-lg line-clamp-2">
                        {step.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="h-10 px-4 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] uppercase tracking-widest font-extrabold text-zinc-400 hover:text-white transition-all">
                      Edit Body
                    </button>
                    <button className="h-10 w-10 flex items-center justify-center bg-white/5 hover:bg-rose-500/10 rounded-xl text-zinc-500 hover:text-rose-500 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button className="w-full h-20 border-2 border-dashed border-white/5 rounded-3xl flex items-center justify-center gap-4 text-zinc-500 hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/[0.02] transition-all group">
            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all">
              <Plus size={20} />
            </div>
            <span className="text-[11px] uppercase tracking-[0.3em] font-black">Add Next Step to Sequence</span>
          </button>
        </div>

    
        <div className="space-y-8">
          <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Settings size={18} className="text-blue-500" />
                <h5 className="text-[12px] uppercase tracking-[0.2em] font-black text-white">Execution Settings</h5>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Working Days</label>
                  <div className="flex flex-wrap gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                      <button key={i} className={`h-10 w-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${i < 5 ? 'bg-blue-600 text-white' : 'bg-white/5 text-zinc-600'}`}>
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-widest font-black text-zinc-500">Send Time (EST)</label>
                  <div className="flex items-center gap-3 h-12 px-5 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-bold text-white">
                    <Clock size={16} className="text-zinc-600" style={{ color: "var(--text)" }} />
                    <span>09:30 AM - 05:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Zap size={18} className="text-emerald-500" />
                <h5 className="text-[12px] uppercase tracking-[0.2em] font-black text-white">Campaign Stats</h5>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] uppercase font-black text-zinc-600 mb-1">Prospects</p>
                  <p className="text-xl font-bold text-white">1.2k</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-[9px] uppercase font-black text-zinc-600 mb-1">Reply Rate</p>
                  <p className="text-xl font-bold text-emerald-500">12.4%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform">
              <LinkedinLogoIcon size={80} />
            </div>
            <div className="relative z-10 space-y-4">
              <h5 className="text-xl font-bold leading-tight uppercase tracking-tighter">View Master Sequence Strategy</h5>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                <span>Open Canvas</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCampaignPage;
  