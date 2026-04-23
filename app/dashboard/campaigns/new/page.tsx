
'use client';
import { useState, Fragment } from "react";
import {useRouter} from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  ArrowRight,
  Plus,
  Search,
  Link as LinkIcon,
  FileText,
  Users,
  ArrowLeft,
  Mail,
  Settings,
  ChevronRight,
  Trash2,
  Globe,
  Sparkles
} from "lucide-react";
import { LinkedinLogoIcon as Linkedin } from "@phosphor-icons/react";

type WizardStep = 'choose-audience' | 'linkedin-url' | 'set-sequence' | 'sequence-builder' | 'review';


const stepsData = [
  { id: 1, label: "Choose audience" },
  { id: 2, label: "Set Sequence" },
  { id: 3, label: "Review And Publish" },
];

const NewCampaignPage = () => {
  const router = useRouter();
  const [wizardView, setWizardView] = useState<WizardStep>('choose-audience');
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [newCampaign, setNewCampaign] = useState({ name: "", leads: 1000 });
  const [searchUrl, setSearchUrl] = useState("");
  

  const [selectedAudienceType, setSelectedAudienceType] = useState<string | null>(null);

  const handleStepBack = () => {
    switch (wizardView) {
      case 'linkedin-url': setWizardView('choose-audience'); break;
      case 'set-sequence': setWizardView('choose-audience'); break;
      case 'sequence-builder': setWizardView('set-sequence'); break;
      case 'review': setWizardView('sequence-builder'); break;
      default: router.push('/dashboard/campaigns');
    }
  };

  const handleContinue = () => {
    switch (wizardView) {
      case 'choose-audience': 
        if (selectedAudienceType === 'linkedin-url') setWizardView('linkedin-url');
        else setWizardView('set-sequence');
        break;
      case 'linkedin-url': setWizardView('set-sequence'); break;
      case 'set-sequence': setWizardView('sequence-builder'); break;
      case 'sequence-builder': setWizardView('review'); break;
      case 'review': handleLaunch(); break;
    }
  };

  const handleLaunch = () => {
    const campaign = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCampaign.name || "LinkedIn URL Campaign",
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
      account: { name: "Laiba Ramzan", avatar: "https://picsum.photos/seed/acc1/100/100" }
    };
    const existing = JSON.parse(localStorage.getItem('custom_campaigns') || '[]');
    localStorage.setItem('custom_campaigns', JSON.stringify([campaign, ...existing]));
    router.push('/dashboard/campaigns');
  };

  const getCurrentStepNumber = (): number => {
    if (wizardView === 'choose-audience' || wizardView === 'linkedin-url') return 1;
    if (wizardView === 'set-sequence' || wizardView === 'sequence-builder') return 2;
    return 3;
  };

  return (
    <div className="min-h-[80vh] space-y-8 pb-20 font-sans">
          <div 
        className="flex flex-col md:flex-row md:items-center justify-between gap-8 backdrop-blur-xl border p-8 rounded-[2rem] transition-all duration-300 shadow-sm"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-6">
          <button 
            onClick={handleStepBack}
            className="h-12 w-12 flex items-center justify-center rounded-2xl border transition-all hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: "var(--muted)", background: "var(--bg)", borderColor: "var(--border)" }}
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="flex items-center gap-4">
            {stepsData.map((s, i) => (
              <Fragment key={s.id}>
                <div className={`flex items-center gap-3 transition-all ${getCurrentStepNumber() < s.id ? 'opacity-30' : 'opacity-100'}`}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-black border transition-all ${
                    getCurrentStepNumber() === s.id 
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" 
                      : getCurrentStepNumber() > s.id 
                        ? "bg-emerald-500 border-emerald-500 text-white" 
                        : "bg-transparent border-slate-300 dark:border-white/20 text-zinc-500 dark:text-zinc-500"
                  }`}>
                    {getCurrentStepNumber() > s.id ? <CheckCircle2 size={16} /> : s.id}
                  </div>
                  <span 
                    className={`text-[10px] uppercase tracking-[0.2em] font-black hidden lg:block ${getCurrentStepNumber() === s.id ? "" : ""}`}
                    style={{ color: getCurrentStepNumber() === s.id ? "var(--text)" : "var(--muted)" }}
                  >
                    {s.label}
                  </span>
                </div>
                {i < stepsData.length - 1 && <ChevronRight size={14} className="opacity-20 hidden lg:block" style={{ color: "var(--text)" }} />}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {wizardView === 'set-sequence' && (
            <button className="h-12 px-6 bg-transparent text-[10px] uppercase tracking-widest font-black text-blue-500 hover:text-blue-400 transition-all mr-4">
              Choose a Template
            </button>
          )}
          {wizardView === 'sequence-builder' && (
             <button 
              className="h-12 px-6 border text-[10px] uppercase tracking-widest font-black rounded-2xl mr-2 transition-all hover:bg-black/5 dark:hover:bg-white/5"
              style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--muted)" }}
            >
              Save as Template
            </button>
          )}
          <button 
             onClick={() => router.push('/dashboard/campaigns')}
             className="h-12 px-6 border rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all hover:bg-black/5 dark:hover:bg-white/5"
             style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--muted)" }}
          >
            Cancel
          </button>
          <button 
            onClick={handleContinue}
            className={`h-12 px-8 rounded-2xl text-[10px] uppercase tracking-widest font-black transition-all flex items-center gap-3 shadow-xl ${
              wizardView === 'review' 
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/10" 
                : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/10"
            }`}
          >
            {wizardView === 'review' ? 'Publish Campaign' : 'Continue'}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
    
        {wizardView === 'choose-audience' && (
          <motion.div
            key="step-audience"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-12"
          >
             <div className="text-center space-y-4 pt-10">
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter" style={{ color: "var(--text)" }}>
                Define your <span style={{ color: "var(--muted)" }} className="block md:inline">audience.</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto font-medium" style={{ color: "var(--muted)" }}>Choose how you'd like to import your leads into NexusFlow.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                { id: '1st', title: "1st Degree Connections", desc: "Target your LinkedIn Connections.", icon: Users, color: "text-blue-500" },
                { id: 'integrations', title: "Linkedin Search", desc: "Find your ideal leads with our built-in LinkedIn search.", icon: Search, color: "text-purple-500" },
                { id: 'linkedin-url', title: "LinkedIn URL", desc: "Target leads from a specific search URL.", icon: LinkIcon, color: "text-blue-600", highlight: true },
             
                { id: 'company-page', title: "Company page", desc: "Target employees from target companies.", icon: FileText, color: "text-emerald-500" },
                { id: 'ads', title: "LinkedIn Ads", desc: "Capture leads from your promoted posts.", icon: Linkedin, color: "text-rose-500" },
                { id: 'newsletter', title: "LinkedIn Newsletters", desc: "Connect with newsletter subscribers.", icon: Mail, color: "text-cyan-500" },
                
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setSelectedAudienceType(opt.id);
                    if(opt.id === 'linkedin-url') setWizardView('linkedin-url');
                    else handleContinue();
                  }}
                  className={`group relative p-8 backdrop-blur-xl border rounded-[2rem] text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm ${
                    opt.highlight ? "border-blue-500/50 bg-blue-500/5 hover:border-blue-500" : "hover:border-blue-500/30"
                  }`}
                  style={{ background: "var(--card)", borderColor: opt.highlight ? undefined : "var(--border)" }}
                >
                  <div className={`h-16 w-16 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center ${opt.color} mb-8 shadow-inner transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    <opt.icon size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight" style={{ color: "var(--text)" }}>{opt.title}</h3>
                    <p className="text-sm leading-relaxed font-medium" style={{ color: "var(--muted)" }}>{opt.desc}</p>
                  </div>
                  <ArrowRight size={20} className="absolute bottom-8 right-8 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: "var(--text)" }} />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        //LINKEDIN URL CONFIG 
        {wizardView === 'linkedin-url' && (
          <motion.div
            key="step-url-config"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto space-y-10 py-10"
          >
            <div className="border rounded-[2.5rem] overflow-hidden shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
               <div className="px-10 py-6 border-b flex items-center justify-between" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <LinkIcon size={18} />
                  </div>
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: "var(--text)" }}>LinkedIn URL</h3>
                </div>
                <button onClick={() => setSearchUrl("")} className="text-[10px] uppercase tracking-widest font-black hover:text-blue-600 transition-colors" style={{ color: "var(--muted)" }}>Clear All</button>
               </div>

               <div className="p-10 space-y-10">
                 <div className="space-y-4">
                   <label className="text-[11px] uppercase tracking-widest font-black" style={{ color: "var(--muted)" }}>Paste here your LinkedIn search URL</label>
                   <textarea 
                    value={searchUrl}
                    onChange={(e) => setSearchUrl(e.target.value)}
                    className="w-full h-32 border rounded-2xl p-6 text-sm leading-relaxed focus:outline-none focus:border-blue-500/50 resize-none font-mono transition-all shadow-inner"
                    style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                   />
                   <div className="flex gap-6">
                    <button className="text-[10px] text-blue-600 font-black uppercase flex items-center gap-2 hover:underline">
                      Go to LinkedIn search <LinkIcon size={12} />
                    </button>
                    <button className="text-[10px] text-blue-600 font-black uppercase flex items-center gap-2 hover:underline">
                      Go to Sales Navigator <LinkIcon size={12} />
                    </button>
                   </div>
                 </div>

                 <div className="space-y-8">
                   <div className="flex items-center justify-between">
                     <label className="text-[11px] uppercase tracking-widest font-black" style={{ color: "var(--muted)" }}>Maximum amount of leads:</label>
                     <div className="flex items-center gap-3">
                       <input 
                         type="number" 
                         value={newCampaign.leads} 
                         onChange={(e) => setNewCampaign({...newCampaign, leads: Number(e.target.value)})}
                         className="w-20 h-10 border rounded-xl text-center font-bold text-sm focus:outline-none focus:border-blue-500 transition-all"
                         style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                        />
                        <span className="text-[10px] font-black uppercase" style={{ color: "var(--muted)" }}>contacts</span>
                     </div>
                   </div>
                   <div className="relative pt-2">
                      <input 
                        type="range" 
                        min="1" max="1000" 
                        value={newCampaign.leads}
                        onChange={(e) => setNewCampaign({...newCampaign, leads: Number(e.target.value)})}
                        className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-[8px] font-black uppercase mt-4 tracking-[0.2em]" style={{ color: "var(--muted)" }}>
                        <span>1</span>
                        <span>500</span>
                        <span>1,000</span>
                      </div>
                   </div>
                 </div>

                 <div className="space-y-4 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
                   <p className="text-[10px] uppercase tracking-widest font-black" style={{ color: "var(--muted)" }}>More options:</p>
                   <div className="flex items-center justify-between p-4 border rounded-2xl transition-colors" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                     <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center" style={{ color: "var(--muted)" }}><Users size={18} /></div>
                       <div>
                         <p className="text-xs font-bold uppercase tracking-tight" style={{ color: "var(--text)" }}>Exclude profiles without photos</p>
                         <p className="text-[9px] uppercase tracking-widest font-medium" style={{ color: "var(--muted)" }}>Filter low-quality profiles</p>
                       </div>
                     </div>
                     <div className="h-6 w-11 bg-slate-200 dark:bg-zinc-800 rounded-full cursor-not-allowed" />
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        )}

    
        {wizardView === 'set-sequence' && (
          <motion.div
            key="step-sequence-init"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center py-20 space-y-12"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter" style={{ color: "var(--text)" }}>
                How will you <span style={{ color: "var(--muted)" }}>build it?</span>
              </h2>
              <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>Choose a starting point for your automation sequence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              <button 
                onClick={() => setWizardView('sequence-builder')}
                className="group p-10 backdrop-blur-xl border rounded-[3rem] text-center space-y-8 hover:border-blue-500/50 hover:bg-blue-600/5 transition-all shadow-sm"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="h-20 w-20 rounded-[2rem] bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white" style={{ color: "var(--muted)" }}>
                  <Plus size={40} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight uppercase" style={{ color: "var(--text)" }}>Build manually</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--muted)" }}>Design your unique journey from scratch, step by step.</p>
                </div>
              </button>

              <button 
                className="group p-10 backdrop-blur-xl border rounded-[3rem] text-center space-y-8 hover:border-emerald-500/50 hover:bg-emerald-600/5 transition-all shadow-sm relative overflow-hidden"
                style={{ background: "var(--card)", borderColor: "var(--border)" }}
              >
                <div className="h-20 w-20 rounded-[2rem] bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto transition-transform group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white" style={{ color: "var(--muted)" }}>
                  <Sparkles size={40} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold tracking-tight uppercase" style={{ color: "var(--text)" }}>Template library</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--muted)" }}>Choose from pre-built battle-tested outreach flows.</p>
                </div>
                <div className="absolute top-4 right-4 bg-emerald-500 px-3 py-1 rounded-full text-[8px] font-black uppercase text-white tracking-widest">New</div>
              </button>
            </div>
          </motion.div>
        )}

   
        {wizardView === 'sequence-builder' && (
          <motion.div
            key="step-builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center py-10 min-h-[600px] relative rounded-[3rem] border bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px]"
            style={{ background: "var(--bg)", borderColor: "var(--border)" }}
          >
             <div className="flex flex-col items-center gap-8">
                <div className="px-8 py-3 bg-white dark:bg-zinc-800 border-2 border-blue-600 rounded-2xl text-slate-800 dark:text-white font-bold text-sm shadow-xl flex items-center gap-3">
                  Sequence start
                </div>

                <div className="w-px h-12 bg-blue-600/20" />

                <div 
                  className="relative"
                  onMouseEnter={() => setShowAddMenu(true)}
                  onMouseLeave={() => setShowAddMenu(false)}
                >
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform relative z-30">
                    <Plus size={20} />
                  </div>
                  
                  <AnimatePresence>
                    {showAddMenu && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 border rounded-2xl shadow-2xl overflow-hidden z-[100]"
                        style={{ background: "var(--card)", borderColor: "var(--border)" }}
                      >
                         <div className="px-5 py-4 border-b transition-colors" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-black" style={{ color: "var(--muted)" }}>LinkedIn Steps</span>
                         </div>
                         <div className="p-2 space-y-1">
                            {["Engage with Profile", "Invite to Attend Event", "Send Connection Request", "Send LinkedIn Message", "Chained LinkedIn Messages"].map((item) => (
                               <button 
                                key={item} 
                                onClick={() => setShowAddMenu(false)}
                                className="w-full px-4 py-3.5 text-left text-[12px] font-bold hover:bg-blue-600 hover:text-white rounded-xl transition-all flex items-center justify-between group"
                                style={{ color: "var(--text)" }}
                               >
                                  {item}
                                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                               </button>
                            ))}
                         </div>
                         <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1.5 w-3 h-3 border-l border-t rotate-45" style={{ background: "var(--card)", borderColor: "var(--border)" }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="w-[500px] rounded-3xl p-8 shadow-2xl space-y-6 mt-10 border transition-all" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
                   <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: "var(--border)" }}>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white"><Linkedin size={18} /></div>
                        <span className="text-sm font-bold" style={{ color: "var(--text)" }}>Step 1 - Send a connection request</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ color: "var(--muted)" }}><Trash2 size={16} /></button>
                        <button className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/5" style={{ color: "var(--muted)" }}><Settings size={16} /></button>
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <label className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--muted)" }}>Connection Request Message</label>
                         <span className="text-[10px] opacity-40" style={{ color: "var(--text)" }}>56/200</span>
                      </div>
                      <textarea 
                        className="w-full h-32 p-4 border rounded-2xl text-sm focus:outline-none focus:border-blue-500 resize-none shadow-inner"
                        style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                        defaultValue="Looks like we have similar connections, let's connect :)"
                      />
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase flex items-center gap-2 shadow-lg shadow-blue-500/20"><Globe size={14} /> Templates</button>
                        <button className="px-4 py-2 border rounded-xl text-[10px] font-black uppercase flex items-center gap-2 transition-all hover:bg-black/5 dark:hover:bg-white/5" style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}><Sparkles size={14} /> Personalize</button>
                      </div>
                   </div>

                   <div className="pt-4 border-t flex items-center gap-3" style={{ borderColor: "var(--border)" }}>
                      <div className="h-5 w-9 rounded-full flex items-center px-1 cursor-pointer transition-all bg-emerald-500 justify-end">
                        <div className="h-3 w-3 rounded-full bg-white shadow-sm" />
                      </div>
                      <span className="text-xs font-bold" style={{ color: "var(--muted)" }}>Auto follow-up with message once connected</span>
                   </div>
                </div>
             </div>
          </motion.div>
        )}

      
        {wizardView === 'review' && (
          <motion.div
            key="step-review"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto py-10"
          >
           
            <div className="border rounded-[3rem] p-10 space-y-10 h-fit shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
               <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Linkedin size={24} /></div>
                  <h3 className="text-2xl font-bold tracking-tighter uppercase" style={{ color: "var(--text)" }}>LinkedIn Campaign</h3>
               </div>

               <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-widest font-black" style={{ color: "var(--muted)" }}>Campaign Name*</label>
                    <input 
                      type="text" 
                      placeholder="Enter Campaign Name"
                      className="w-full h-14 border rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all shadow-inner"
                      style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--text)" }}
                    />
                  </div>

                  <div className="rounded-[2rem] p-8 space-y-6 shadow-sm border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20"><Search size={18} /></div>
                      <h4 className="text-sm font-bold" style={{ color: "var(--text)" }}>LinkedIn Search</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-left">
                       <div>
                         <p className="text-[9px] uppercase tracking-widest font-black mb-1" style={{ color: "var(--muted)" }}>Max Leads:</p>
                         <p className="text-xl font-bold font-mono" style={{ color: "var(--text)" }}>1000</p>
                       </div>
                       <div>
                         <p className="text-[9px] uppercase tracking-widest font-black mb-1" style={{ color: "var(--muted)" }}>Search URL:</p>
                         <button className="text-[10px] text-blue-600 font-bold hover:underline transition-all flex items-center gap-2">View Search results <LinkIcon size={12}/></button>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

       
            <div className="border rounded-[3rem] p-10 space-y-10 relative overflow-hidden shadow-sm" style={{ background: "var(--card)", borderColor: "var(--border)" }}>
               <div className="absolute inset-0 bg-[radial-gradient(var(--text)_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03]" />
               <div className="relative flex flex-col items-center gap-6">
                  <div className="px-6 py-2 border-2 border-blue-600 rounded-xl font-bold text-xs" style={{ background: "var(--card)", color: "var(--text)" }}>Sequence start</div>
                  <div className="w-px h-10 bg-blue-600/20" />
                  
                  <div className="w-full rounded-2xl p-6 shadow-xl space-y-4 border" style={{ background: "var(--bg)", borderColor: "var(--border)" }}>
                     <div className="flex items-center gap-3 border-b pb-3" style={{ borderColor: "var(--border)" }}>
                        <div className="h-6 w-6 bg-blue-600 rounded flex items-center justify-center text-white"><Linkedin size={14} /></div>
                        <span className="text-[11px] font-bold" style={{ color: "var(--text)" }}>Step 1 - LinkedIn connect</span>
                     </div>
                     <div className="space-y-4">
                        <div>
                          <p className="text-[8px] uppercase tracking-widest font-black mb-1" style={{ color: "var(--muted)" }}>Message:</p>
                          <p className="text-[11px] leading-relaxed italic" style={{ color: "var(--text)" }}>"Looks like we have similar connections, let's connect :)"</p>
                        </div>
                        <div>
                          <p className="text-[8px] uppercase tracking-widest font-black mb-1" style={{ color: "var(--muted)" }}>Follow-up Message:</p>
                          <p className="text-[11px] leading-relaxed italic" style={{ color: "var(--text)" }}>"Thanks for connecting with me."</p>
                        </div>
                     </div>
                  </div>

                  <div className="w-px h-10 bg-blue-600/20" />
                  <div className="px-6 py-2 border rounded-xl font-bold text-xs" style={{ background: "var(--bg)", borderColor: "var(--border)", color: "var(--muted)" }}>Sequence end</div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewCampaignPage;
