
'use client';
import { useState } from "react";
import { useRouter} from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  ChevronRight, 
  X, 
  Trash2, 
  Link as LinkIcon,
  Plus,
  ArrowRight,
  Activity,
  Clock,
  Zap,
  MousePointer2,
  MessageSquare
} from "lucide-react";
import {LinkedinLogoIcon as Linkedin} from "@phosphor-icons/react";
// --- Types ---
type WizardStep = 'audience' | 'sequence' | 'review' | 'finalize';

type StepType = 
  | "Connection request" 
  | "Follow-up Message" 
  | "LinkedIn Profile Visit" 
  | "Like a post" 
  | "Endorse a skill";

interface CampaignStep {
  id: string;
  type: StepType;
  delay: number; // days
  content?: string;
}

// --- Constants ---
const STEP_TEMPLATES: { type: StepType; description: string; icon: React.ElementType }[] = [
  { type: "Connection request", description: "Send personalized invite", icon: Plus },
  { type: "Follow-up Message", description: "Nurture with a message", icon: MessageSquare },
  { type: "LinkedIn Profile Visit", description: "Show interest by visiting", icon: MousePointer2 },
  { type: "Like a post", description: "Engage with latest post", icon: Zap },
  { type: "Endorse a skill", description: "Validate expertise", icon: CheckCircle2 },
];

const NewCampaignPage = () => {
  const router = useRouter();
  const [wizardStep, setWizardStep] = useState<WizardStep>('audience');
  
  // Campaign State
  const [searchUrl, setSearchUrl] = useState("");
  const [maxLeads, setMaxLeads] = useState(500);
  const [campaignName, setCampaignName] = useState("");
  const [options, setOptions] = useState({
    excludeNoPhoto: true,
    excludeFirstDegree: true,
    premiumOnly: false,
    includeOtherLeads: false,
  });

  // Sequence State
  const [steps, setSteps] = useState<Record<string, CampaignStep>>({
    "1": { id: "1", type: "Connection request", delay: 0, content: "Hi {{name}}, I'd love to connect and learn more about your work at {{company}}!" }
  });
  const [mainSequence, setMainSequence] = useState<string[]>(["1"]);

  // --- Handlers ---
  const addStep = (type: StepType) => {
    const id = Math.random().toString(36).substring(7);
    const newStep: CampaignStep = { 
       id, 
       type, 
       delay: 1, 
       content: type.includes("Message") ? "Hi {{name}}, just following up..." : "" 
    };
    setSteps({ ...steps, [id]: newStep });
    setMainSequence([...mainSequence, id]);
  };

  const removeStep = (id: string) => {
    const newSequence = mainSequence.filter(sid => sid !== id);
    setMainSequence(newSequence);
    const newSteps = { ...steps };
    delete newSteps[id];
    setSteps(newSteps);
  };

  const updateStep = (id: string, updates: Partial<CampaignStep>) => {
    setSteps({ ...steps, [id]: { ...steps[id], ...updates } });
  };

  const handleLaunch = () => {
    if (!campaignName) return;

    const newCampaign = {
      id: Math.random().toString(36).substring(7),
      name: campaignName,
      status: "Active",
      createdAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      leads: maxLeads,
      connections: 0,
      accepted: 0,
      visits: 0,
      likes: 0,
      endorse: 0,
      messages: mainSequence.filter(sid => steps[sid].type.includes("Message") || steps[sid].type.includes("request")).length,
      replied: 0,
    };

    const existing = JSON.parse(localStorage.getItem('custom_campaigns') || '[]');
    localStorage.setItem('custom_campaigns', JSON.stringify([newCampaign, ...existing]));
    router.push('/dashboard/campaigns');
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)] overflow-hidden font-sans">
      
      {/* Header - High-End SaaS Navbar */}
      <header className="h-20 bg-[var(--card)] border-b border-[var(--border)] px-6 md:px-10 flex items-center justify-between sticky top-0 z-[100] transition-colors">
         <div className="flex items-center gap-5 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
               <Zap size={20} fill="white" />
            </div>
            <div className="flex flex-col text-left">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-600 mb-0.5 leading-none">Campaign Builder</span>
               <h1 className="text-base font-black text-[var(--text)] uppercase tracking-tight truncate max-w-[150px] md:max-w-xs">{campaignName || " Automation"}</h1>
            </div>
         </div>

         {/* Technical Stepper */}
         <div className="hidden lg:flex items-center gap-1.5 p-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-2xl">
            {[
              { id: 'audience', label: 'Audience', num: '01' },
              { id: 'sequence', label: 'Workflow', num: '02' },
              { id: 'review', label: 'Preview', num: '03' },
              { id: 'finalize', label: 'Launch', num: '04' },
            ].map((s, i) => {
              const order = ['audience', 'sequence', 'review', 'finalize'];
              const currentIdx = order.indexOf(wizardStep);
              const status = wizardStep === s.id ? 'active' : currentIdx > i ? 'complete' : 'pending';
              return (
                <button 
                   key={s.id}
                   onClick={() => {
                      if (status === 'complete' || (status === 'pending' && i <= currentIdx)) {
                         setWizardStep(s.id as WizardStep);
                      }
                   }}
                   className={`flex items-center gap-2.5 px-4 py-2 rounded-xl transition-all duration-300 ${
                      status === 'active' ? "bg-[var(--card)] shadow-sm border border-[var(--border)]" : "opacity-40 hover:opacity-100"
                   }`}
                >
                   <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black transition-all ${
                      status === 'active' ? "bg-blue-600 text-white" : 
                      status === 'complete' ? "bg-emerald-500 text-white" : "bg-[var(--border)] text-[var(--muted)]"
                   }`}>
                      {status === 'complete' ? <CheckCircle2 size={12} /> : s.num}
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'active' ? "text-[var(--text)]" : "text-[var(--muted)]"}`}>
                      {s.label}
                   </span>
                </button>
              );
            })}
         </div>

         <div className="flex items-center gap-3">
            <button 
               onClick={() => {
                 if (wizardStep === 'audience' && searchUrl) setWizardStep('sequence');
                 else if (wizardStep === 'sequence') setWizardStep('review');
                 else if (wizardStep === 'review') setWizardStep('finalize');
                 else if (wizardStep === 'finalize' && campaignName) handleLaunch();
               }}
               disabled={(wizardStep === 'audience' && !searchUrl) || (wizardStep === 'finalize' && !campaignName)}
               className="h-10 px-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:translate-y-[-2px] hover:shadow-xl hover:shadow-blue-500/10 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:translate-y-0"
            >
               <span>{wizardStep === 'finalize' ? 'Finish & Launch' : 'Continue'}</span> 
               <ChevronRight size={16} />
            </button>
            <button 
              onClick={() => router.push('/dashboard/campaigns')} 
              className="w-10 h-10 rounded-xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:bg-rose-500 hover:text-white transition-all shadow-sm"
            >
               <X size={20} />
            </button>
         </div>
      </header>
      
      {/* Content Area */}
      <main className="flex-1 overflow-hidden relative bg-[var(--bg)] flex flex-col">
         <AnimatePresence mode="wait">
            
            {/* Phase 01: Audience Selection */}
            {wizardStep === 'audience' && (
              <motion.div
                key="audience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 overflow-y-auto p-6 md:p-16 flex flex-col items-center custom-scrollbar"
              >
                 <div className="w-full max-w-4xl space-y-10">
                   <div className="text-center space-y-2 mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 rounded-full border border-blue-600/20 mb-4">
                         <Activity size={12} className="text-blue-600" />
                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 leading-none">Target Extraction</span>
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tight text-[var(--text)]">Identify your <span className="opacity-40 italic">Ideal Leads.</span></h3>
                   </div>

                   <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
                      <div className="lg:col-span-8 space-y-6">
                         <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 space-y-6 shadow-sm">
                            <div className="flex items-center gap-3">
                               <div className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center">
                                  <LinkIcon size={16} className="text-blue-600" />
                               </div>
                               <div>
                                  <h4 className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">LinkedIn Search URL</h4>
                                  <p className="text-[15px] font-medium text-[var(--muted)] opacity-50">Paste a people search or Sales Navigator URL</p>
                               </div>
                            </div>
                            <textarea 
                               value={searchUrl}
                               onChange={(e) => setSearchUrl(e.target.value)}
                               placeholder="https://www.linkedin.com/search/results/people/..."
                               className="w-full h-32 p-5 bg-[var(--bg)] border border-[var(--border)] rounded-2xl text-[13px] font-bold focus:outline-none focus:border-blue-600 transition-all font-mono leading-relaxed resize-none shadow-sm"
                            />
                         </div>

                         <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 space-y-6 shadow-sm"> <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)] opacity-50 mb-2">Refinement Options</h4> <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {[ { id: 'excludeNoPhoto', label: 'Profiles with Photos Only', active: options.excludeNoPhoto }, { id: 'excludeFirstDegree', label: 'Skip 1st Connections', active: options.excludeFirstDegree }, ].map(opt => ( <div key={opt.id} className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group ${opt.active ? 'bg-blue-600/5 border-blue-600/20' : 'bg-[var(--bg)]/50 border-[var(--border)] opacity-60'}`} onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))} > <span className={`text-[10px] font-black uppercase tracking-widest ${opt.active ? 'text-blue-600' : 'text-[var(--text)]'}`}>{opt.label}</span> <div className={`h-5 w-10 rounded-full flex items-center px-1 transition-all ${opt.active ? 'bg-blue-600' : 'bg-zinc-200 dark:bg-zinc-700'}`}> <div className="h-3 w-3 bg-white rounded-full shadow-sm" /> </div> </div> ))} </div> </div>
                      </div>

                      <div className="lg:col-span-4 space-y-6 text-left">
                         <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 space-y-8 shadow-sm">
                            <div className="flex items-center justify-between">
                               <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">Volume Target</h4>
                               <span className="text-2xl font-black text-blue-600 tabular-nums">{maxLeads}</span>
                            </div>
                            <div className="relative pt-2">
                               <input 
                                  type="range" 
                                  min="10" 
                                  max="1000" 
                                  step="10"
                                  value={maxLeads} 
                                  onChange={(e) => setMaxLeads(parseInt(e.target.value))}
                                  className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 appearance-none cursor-pointer accent-blue-600 rounded-full"
                               />
                               <div className="flex justify-between mt-3 text-[10px] font-black uppercase tracking-widest text-[var(--muted)] opacity-30">
                                  <span >10 Leads</span>
                                  <span>1000 Leads</span>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                 </div>
              </motion.div>
            )}

            {/* Phase 02: Sequence Architecture */}
            {wizardStep === 'sequence' && (
              <motion.div
                key="sequence"
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                className="flex-1 overflow-hidden flex flex-col lg:flex-row"
              >
                {/* Left Sidebar - Action Palette */}
                <div className="w-full lg:w-96 bg-[var(--card)] border-r border-[var(--border)] flex flex-col p-8 overflow-y-auto custom-scrollbar text-left shadow-[1px_0_0_0_rgba(0,0,0,0.02)]">
                   <div className="space-y-1 mb-10">
                      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-600">Framework</span>
                      <h2 className="text-2xl font-black uppercase tracking-tight text-[var(--text)]">Design <span className="opacity-20 italic">Logic.</span></h2>
                   </div>

                   <div className="space-y-3">
                      {STEP_TEMPLATES.map((tmpl) => (
                         <button 
                            key={tmpl.type}
                            onClick={() => addStep(tmpl.type)}
                            className="w-full p-4.5 bg-[var(--bg)] border border-[var(--border)] rounded-2xl flex items-center gap-4 hover:border-blue-600/30 hover:bg-[var(--card)] transition-all group group-active:scale-95 text-left shadow-sm"
                         >
                            <div className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-zinc-400 group-hover:text-blue-600 group-hover:bg-blue-600/5 group-hover:border-blue-600/20 transition-all shadow-sm">
                               <tmpl.icon size={18} />
                            </div>
                            <div>
                               <p className="text-[11px] font-black uppercase tracking-tight text-[var(--text)] leading-none mb-1 group-hover:text-blue-600 transition-colors">{tmpl.type}</p>
                               <p className="text-[9px] font-bold text-[var(--muted)] uppercase opacity-50 tracking-wider font-mono">{tmpl.description}</p>
                            </div>
                         </button>
                      ))}
                   </div>
                </div>

                {/* Main Workspace - Sequence Flow */}
                <div className="flex-1 overflow-y-auto p-12 lg:p-20 flex flex-col items-center custom-scrollbar bg-[var(--bg)]">
                   <div className="px-6 py-2.5 bg-blue-600 font-black text-white rounded-full text-[9px] uppercase tracking-[0.2em] mb-4 shadow-xl shadow-blue-500/20">Trigger: Workflow Initiated</div>
                   
                   {mainSequence.map((sid, idx) => (
                      <div key={sid} className="w-full flex flex-col items-center">
                         <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800" />
                         <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-full max-w-xl bg-[var(--card)] border border-[var(--border)] p-6 md:p-10 space-y-8 rounded-[2.5rem] shadow-[#00000003_0px_20px_40px] relative group hover:border-blue-600/20 transition-all text-left"
                         >
                            <div className="flex items-center justify-between border-b border-[var(--border)] pb-6">
                               <div className="flex items-center gap-5">
                                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-[11px] font-black shadow-lg shadow-blue-500/20">{idx + 1}</div>
                                  <div>
                                     <h4 className="text-[12px] font-black uppercase tracking-widest text-[var(--text)] leading-none mb-1">{steps[sid].type}</h4>
                                     <p className="text-[9px] font-bold text-[var(--muted)] uppercase opacity-40 font-mono">Automated execution</p>
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[10px] font-black uppercase">
                                     <Clock size={12} className="text-blue-600" />
                                     <input 
                                        type="number" 
                                        value={steps[sid].delay} 
                                        onChange={(e) => updateStep(sid, { delay: parseInt(e.target.value) })}
                                        className="w-5 bg-transparent text-center focus:outline-none"
                                     />
                                     <span className="opacity-30">Days</span>
                                  </div>
                                  <button 
                                     onClick={() => removeStep(sid)}
                                     className="w-10 h-10 rounded-xl flex items-center justify-center text-rose-500 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-rose-500/20"
                                  >
                                     <Trash2 size={16} />
                                  </button>
                               </div>
                            </div>

                            {(steps[sid].type.includes("Message") || steps[sid].type.includes("request")) && (
                               <div className="space-y-5">
                                  <textarea 
                                     value={steps[sid].content}
                                     onChange={(e) => updateStep(sid, { content: e.target.value })}
                                     placeholder="Compose your personalized message..."
                                     className="w-full h-36 p-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl text-[14px] font-bold text-[var(--text)] focus:outline-none focus:border-blue-600 transition-all font-mono leading-relaxed resize-none shadow-inner"
                                  />
                                  <div className="flex flex-wrap gap-2.5">
                                     {['{{name}}', '{{company}}', '{{industry}}'].map(tag => (
                                        <button 
                                           key={tag}
                                           onClick={() => updateStep(sid, { content: (steps[sid].content || "") + tag })}
                                           className="px-3.5 py-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[10px] font-black text-[var(--muted)] hover:text-blue-600 hover:border-blue-600/50 hover:bg-blue-600/5 transition-all shadow-sm"
                                        >
                                           {tag}
                                        </button>
                                     ))}
                                  </div>
                               </div>
                            )}
                         </motion.div>
                      </div>
                   ))}

                   <div className="w-px h-10 bg-[var(--border)]" />
                   <button 
                     onClick={() => addStep("Like a post")}
                     className="group flex flex-col items-center gap-4 transition-all active:scale-90"
                   >
                      <div className="w-12 h-12 rounded-2xl bg-[var(--card)] border-2 border-dashed border-[var(--border)] flex items-center justify-center text-zinc-400 group-hover:border-blue-600 group-hover:text-blue-600 group-hover:bg-blue-600/5 transition-all shadow-sm">
                         <Plus size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-40 group-hover:opacity-100 transition-opacity">Extend Flow</span>
                   </button>
                </div>
              </motion.div>
            )}

            {/* Phase 03: Final Mapping */}
            {wizardStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 overflow-y-auto p-12 lg:p-20 flex flex-col items-center custom-scrollbar"
              >
                 <div className="w-full max-w-2xl space-y-12">
                   <div className="text-center space-y-2 mb-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 leading-none">Phase 03</span>
                      <h3 className="text-3xl font-black uppercase tracking-tight text-[var(--text)]">Strategic <span className="opacity-40 italic">Timeline.</span></h3>
                   </div>

                   <div className="bg-[var(--card)] border border-[var(--border)] p-12 space-y-10 rounded-[3rem] shadow-sm relative overflow-hidden text-left">
                       <div className="space-y-0 flex flex-col items-center">
                          <div className="px-6 py-2 bg-[var(--bg)] border border-[var(--border)] rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-[var(--muted)] mb-4">Start Point</div>
                          
                          {mainSequence.map((sid, idx) => (
                             <div key={sid} className="w-full flex flex-col items-center">
                                <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-800" />
                                <div className="w-full p-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl flex items-center gap-6 group hover:border-blue-600/30 transition-all cursor-default">
                                   <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-[12px] font-black shadow-lg shadow-blue-500/20">{idx + 1}</div>
                                   <div className="text-left overflow-hidden flex-1">
                                      <h4 className="text-[11px] font-black uppercase tracking-widest text-[var(--text)] mb-1">{steps[sid].type}</h4>
                                      {steps[sid].content ? (
                                        <p className="text-[11px] text-[var(--muted)] font-bold truncate opacity-50">"{steps[sid].content}"</p>
                                      ) : (
                                        <p className="text-[9px] text-[var(--muted)] uppercase font-mono opacity-40">Auto-system operation</p>
                                      )}
                                   </div>
                                   <div className="flex items-center gap-1.5 px-3 py-1 bg-[var(--card)] border border-[var(--border)] rounded-full">
                                      <Clock size={10} className="text-blue-500" />
                                      <span className="text-[9px] font-black text-blue-600 uppercase">+{steps[sid].delay}d</span>
                                   </div>
                                </div>
                             </div>
                          ))}
                          
                          <div className="w-px h-8 bg-zinc-300 dark:bg-zinc-800" />
                          <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600 mt-4">Target Reached</div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {/* Phase 04: Launch Center */}
            {wizardStep === 'finalize' && (
              <motion.div
                key="finalize"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex-1 overflow-y-auto p-12 lg:p-20 flex flex-col items-center custom-scrollbar"
              >
                 <div className="w-full max-w-2xl space-y-12">
                   <div className="text-center space-y-2 mb-8">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 leading-none">Phase 04</span>
                      <h3 className="text-3xl font-black uppercase tracking-tight text-[var(--text)]">Mission <span className="opacity-20 italic">Command.</span></h3>
                   </div>

                    <div className="bg-[var(--card)] border border-[var(--border)] p-12 space-y-10 rounded-[3rem] shadow-sm relative text-left">
                       <div className="space-y-10">
                          <div className="space-y-3">
                             <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--muted)] px-1">Campaign Branding*</label>
                             <input 
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                placeholder="e.g. Velocity Outreach Q3"
                                className="w-full h-14 px-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl text-[16px] font-black focus:outline-none focus:border-blue-600 transition-all font-mono placeholder:opacity-20 shadow-sm"
                             />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="p-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl space-y-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center"><Activity size={16} /></div>
                                   <h4 className="text-[10px] font-black text-[var(--text)] uppercase tracking-widest">Leads Flow</h4>
                                </div>
                                <div className="flex items-baseline gap-2">
                                    <p className="text-4xl font-black text-[var(--text)] tabular-nums tracking-tighter">{maxLeads}</p>
                                    <span className="text-[11px] font-black text-blue-600 uppercase">Profiles</span>
                                </div>
                             </div>

                             <div className="p-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl space-y-4">
                                <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><Linkedin size={16} fill="currentColor" /></div>
                                   <h4 className="text-[10px] font-black text-[var(--text)] uppercase tracking-widest">Targeting</h4>
                                </div>
                                <p className="text-[11px] font-bold text-emerald-600 truncate bg-emerald-500/5 px-3 py-2 rounded-xl border border-emerald-500/10">
                                   {searchUrl ? "LinkedIn Connected" : "Manual Queue"}
                                </p>
                             </div>
                          </div>
                          
                          <div className="pt-6">
                            <button 
                                onClick={handleLaunch}
                                disabled={!campaignName}
                                className="w-full h-16 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group hover:translate-y-[-4px] transition-all active:scale-95 disabled:opacity-50 disabled:translate-y-0"
                            >
                                <span className="text-[13px] font-black uppercase tracking-[0.3em]">Confirm & Deploy</span>
                                <Zap size={20} fill="white" className="group-hover:rotate-12 transition-transform" />
                            </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

         </AnimatePresence>
      </main>
      
      {/* Mobile Control Bar */}
      <footer className="lg:hidden h-20 bg-[var(--card)] border-t border-[var(--border)] px-8 flex items-center justify-between z-[100]">
         <div className="flex flex-col text-left">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[var(--muted)] opacity-50 mb-1">Current Step</span>
            <span className="text-[11px] font-black uppercase tracking-[0.1em]">Phase {wizardStep === 'audience' ? '01' : wizardStep === 'sequence' ? '02' : wizardStep === 'review' ? '03' : '04'}</span>
         </div>
         <button 
           onClick={() => {
             if (wizardStep === 'audience') setWizardStep('sequence');
             else if (wizardStep === 'sequence') setWizardStep('review');
             else if (wizardStep === 'review') setWizardStep('finalize');
             else handleLaunch();
           }}
           className="h-11 px-6 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20"
         >
            Next <ArrowRight size={16} />
         </button>
      </footer>
    </div>
  );
};

export default NewCampaignPage;  