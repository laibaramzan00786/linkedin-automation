'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Plus,
  Link as LinkIcon,
  Mail,
  ChevronRight,
  Trash2,
  Zap,
  Clock,
  UserPlus,
  Eye,
  UserCheck,
  ThumbsUp,
  Star,
  Minus,
  X,
  Layout,
  MousePointer2
} from "lucide-react";
import { LinkedinLogoIcon as Linkedin } from "@phosphor-icons/react";

// --- Types ---
type WizardStep = 'audience' | 'sequence' | 'review';

type StepType = 
  | "Connection request" 
  | "Message" 
  | "View profile" 
  | "Like post" 
  | "Endorse skills"
  | "Find emails"
  | "Send email"
  | "If connected"
  | "If email found"
  | "If email opened";

interface Step {
  id: string;
  type: StepType;
  delayValue: number;
  delayUnit: "day" | "hour" | "minute";
  content?: string;
  followUpContent?: string;
  autoFollowUp?: boolean;
  isOpen?: boolean;
  branches?: {
    yes: string[];
    no: string[];
  };
}

const EditCampaignPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const [wizardStep, setWizardStep] = useState<WizardStep>('audience');
  
  // Campaign State
  const [campaignName, setCampaignName] = useState("");
  const [searchUrl, setSearchUrl] = useState("");
  const [maxLeads, setMaxLeads] = useState(1000);
  
  // Options/Filters
  const [options, setOptions] = useState({
    excludeNoPhoto: true,
    excludeFirstDegree: true,
    premiumOnly: false,
    includeOtherLeads: false
  });

  // Builder States
  const [builderMode, setBuilderMode] = useState<'landing' | 'builder'>('builder');
  const [zoom, setZoom] = useState(1);
  const [isAddingStep, setIsAddingStep] = useState(false);
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const [lastFocusedField, setLastFocusedField] = useState<'content' | 'followUpContent'>('content');
  const [currentBranch, setCurrentBranch] = useState<{ parentId: string, branchType: 'main' | 'yes' | 'no' } | null>(null);

  const [steps, setSteps] = useState<Record<string, Step>>({});
  const [mainSequence, setMainSequence] = useState<string[]>([]);

  // Load Campaign Data
  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('custom_campaigns') || '[]');
    const campaign = existing.find((c: any) => c.id === id);
    if (campaign) {
      setCampaignName(campaign.name);
      setMaxLeads(campaign.leads || 1000);
      setSearchUrl(campaign.searchUrl || "");
      if (campaign.options) setOptions(campaign.options);
      
      if (campaign.steps && campaign.mainSequence) {
        setSteps(campaign.steps);
        setMainSequence(campaign.mainSequence);
      } else {
        // Fallback for demo steps if they are missing
        setSteps({
          "1": { 
            id: "1", 
            type: "View profile", 
            delayValue: 0, 
            delayUnit: "minute",
            isOpen: true
          },
          "2": { 
            id: "2", 
            type: "Connection request", 
            delayValue: 0, 
            delayUnit: "minute",
            content: "Hi {first_name}, I saw your profile and...",
            autoFollowUp: true,
            followUpContent: "Just wanted to see if you had a chance to connect!",
            isOpen: true
          }
        });
        setMainSequence(["1", "2"]);
      }
    }
  }, [id]);

 const handleSave = () => {
  const existing = JSON.parse(localStorage.getItem('custom_campaigns') || '[]');

  const updated = existing.map((c: any) => {
    if (c.id === id) {
      return {
        ...c,
        id,
        name: campaignName,
        leads: maxLeads,
        searchUrl,
        options,
        steps,
        mainSequence,

        // 👇 ye add karo (warna dashboard break hoga)
        status: c.status || "Active",
        createdAt: c.createdAt || new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short'
        }),
        connections: c.connections || 0,
        accepted: c.accepted || 0,
        messages: c.messages || 0,
        replied: c.replied || 0,
        visits: c.visits || 0,
        likes: c.likes || 0,
        endorse: c.endorse || 0,
      };
    }
    return c;
  });

  localStorage.setItem('custom_campaigns', JSON.stringify(updated));
  router.push('/dashboard/campaigns');
};

  const activeStep = editingStepId ? steps[editingStepId] : null;

  const updateStep = (stepId: string, updates: Partial<Step>) => {
    setSteps(prev => ({
      ...prev,
      [stepId]: { ...prev[stepId], ...updates }
    }));
  };

  const getIcon = (type: StepType) => {
    switch (type) {
      case "Connection request": return <UserCheck size={16} />;
      case "Message": return <Mail size={16} />;
      case "View profile": return <Eye size={16} />;
      case "Like post": return <ThumbsUp size={16} />;
      case "Endorse skills": return <Star size={16} />;
      case "If connected": return <UserCheck size={16} />;
      default: return <Zap size={16} />;
    }
  };

  const addStep = (type: StepType) => {
    const newId = Math.random().toString(36).substring(7);
    const newStep: Step = {
      id: newId,
      type,
      delayValue: 1,
      delayUnit: "day",
      isOpen: true,
      autoFollowUp: type === "Connection request"
    };
    
    if (type.includes('If')) {
      newStep.branches = { yes: [], no: [] };
    }

    setSteps(prev => ({ ...prev, [newId]: newStep }));
    
    if (currentBranch) {
      if (currentBranch.branchType === 'main') {
        setMainSequence(prev => [...prev, newId]);
      } else if (currentBranch.parentId) {
        setSteps(prev => {
          const parent = prev[currentBranch.parentId];
          if (parent.branches) {
            return {
              ...prev,
              [currentBranch.parentId]: {
                ...parent,
                branches: {
                  ...parent.branches,
                  [currentBranch.branchType]: [...parent.branches[currentBranch.branchType as 'yes' | 'no'], newId]
                }
              }
            };
          }
          return prev;
        });
      }
    } else {
       setMainSequence(prev => [...prev, newId]);
    }

    setIsAddingStep(false);
    if (type === "Connection request" || type === "Message") {
      setEditingStepId(newId);
    }
  };

  const removeStep = (stepId: string) => {
    setMainSequence(prev => prev.filter(sid => sid !== stepId));
    setSteps(prev => {
      const newSteps = { ...prev };
      delete newSteps[stepId];
      return newSteps;
    });
  };

   const FlowNode = ({ stepId, index, isFirst = false }: { stepId: string, index: number, isFirst?: boolean }) => {
    const step = steps[stepId];
    if (!step) return null;

    return (
       <div className="flex flex-col items-center w-full relative">
              {!isFirst && <div className="h-10 md:h-16 w-0.5 bg-zinc-200 dark:bg-zinc-800" />}
              
              {step.delayValue > 0 && !isFirst && (
                 <div className="my-6 px-6 py-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-xl flex items-center gap-4 animate-in fade-in zoom-in-95 duration-500 group/delay hover:scale-105 transition-all">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
                       <Clock size={18} />
                    </div>
                    <div className="flex flex-col">
                       <span className="text-[10px] font-black text-[var(--muted)] uppercase tracking-[0.15em] opacity-50">Delay Duration</span>
                       <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 bg-[var(--bg)] px-3 py-1 rounded-xl border border-[var(--border)] shadow-inner">
                             <input 
                               type="number" 
                               value={step.delayValue} 
                               className="w-8 bg-transparent text-[13px] font-bold text-blue-600 focus:outline-none text-center"
                               onChange={(e) => updateStep(stepId, { delayValue: parseInt(e.target.value) || 0 })}
                             />
                             <span className="text-[11px] font-bold text-[var(--muted)] lowercase">{step.delayUnit}{step.delayValue !== 1 ? 's' : ''}</span>
                          </div>
                       </div>
                    </div>
                 </div>
              )}
      
              {!isFirst && step.delayValue > 0 && <div className="h-10 md:h-16 w-0.5 bg-[var(--border)] opacity-50" />}
      
              <div className="w-full max-w-[92%] sm:max-w-[560px] bg-[var(--card)] border-2 border-transparent hover:border-blue-600/20 rounded-[2.5rem] shadow-2xl group/step relative overflow-hidden transition-all duration-500 hover:translate-y-[-4px]">
                 {/* Top bar indicator */}
                 <div className="h-2 w-full bg-linear-to-r from-blue-600 via-indigo-500 to-blue-400" />
                 
                 <div className="p-8 md:p-10 text-left">
                    <div className="flex items-start justify-between mb-8">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 rounded-[1.25rem] bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30">
                             {getIcon(step.type)}
                          </div>
                          <div>
                             <div className="flex items-center gap-2 mb-1">
                                <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-600/20">Step {index + 1}</span>
                             </div>
                             <h4 className="text-lg font-black uppercase tracking-tight text-[var(--text)] leading-none">{step.type}</h4>
                          </div>
                       </div>
                       <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setEditingStepId(stepId)} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--muted)] hover:bg-blue-600 hover:text-white transition-all border border-transparent hover:shadow-lg hover:shadow-blue-500/20"
                          >
                            <Plus size={22} />
                          </button>
                          <button 
                            onClick={() => removeStep(stepId)} 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--muted)] hover:bg-rose-500 hover:text-white transition-all border border-transparent hover:shadow-lg hover:shadow-rose-500/20"
                          >
                            <Trash2 size={20} />
                          </button>
                       </div>
                    </div>
                    
                    {(step.type === "Connection request" || step.type === "Message") && (
                       <div className="space-y-6">
                          <div className="p-7 bg-[var(--bg)]/40 backdrop-blur-sm rounded-[2rem] border border-[var(--border)] group/msg transition-all hover:bg-blue-600 hover:border-blue-700 hover:translate-x-1 duration-300">
                             <p className="text-[10px] font-black text-[var(--muted)] uppercase tracking-widest mb-4 opacity-50 group-hover:text-blue-100 transition-colors">
                                {step.type === "Connection request" ? "Initial Invitation" : "Direct Message Content"}
                             </p>
                             <div className="text-[15px] text-[var(--text)] font-semibold leading-relaxed line-clamp-3 group-hover:text-white transition-colors">
                                {step.content || <span className="opacity-30 italic font-medium">Add your personalized message here...</span>}
                             </div>
                          </div>
                          
                          {step.type === "Connection request" && (
                             <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between px-3">
                                   <div className="flex items-center gap-4">
                                      <button 
                                         onClick={() => updateStep(stepId, { autoFollowUp: !step.autoFollowUp })}
                                         className={`h-6 w-11 rounded-full flex items-center px-1 transition-all duration-300 ${step.autoFollowUp ? 'bg-emerald-500 justify-end' : 'bg-zinc-200 dark:bg-zinc-800 justify-start'}`}
                                      >
                                         <div className="h-4 w-4 bg-white rounded-full shadow-md" />
                                      </button>
                                      <div className="space-y-0.5">
                                         <span className="text-[11px] font-black text-[var(--text)] uppercase tracking-widest">Auto Follow-up</span>
                                         <p className="text-[10px] text-[var(--muted)] font-medium opacity-60 text-left">Send message after accept</p>
                                      </div>
                                   </div>
                                </div>
      
                                {step.autoFollowUp && (
                                   <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl space-y-3">
                                      <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest opacity-60 text-left">Follow Up Message</p>
                                      <div className="text-[13px] text-[var(--text)] font-medium leading-relaxed line-clamp-2 text-left">
                                         {step.followUpContent || <span className="opacity-40 italic text-left">Add follow up message...</span>}
                                      </div>
                                   </div>
                                )}
                             </div>
                          )}
                       </div>
                    )}
                 </div>
              </div>
      
              {step.branches && (
                <div className="w-full mt-16 md:mt-20 relative">
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 w-0.5 bg-[var(--border)]" />
                   <div className="absolute top-16 left-1/4 right-1/4 h-0.5 bg-[var(--border)]" />
                   
                   <div className="grid grid-cols-2 gap-8 sm:gap-20 md:gap-32 pt-20">
                      <div className="flex flex-col items-center relative">
                         <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-6 py-2 bg-emerald-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-emerald-500/30">Yes</div>
                         <div className="h-16 w-0.5 bg-[var(--border)] absolute -top-16" />
                         {step.branches.yes.map((sid, idx) => <FlowNode key={sid} stepId={sid} index={index + 1 + idx} />)}
                         <AddButton parentId={stepId} branchType="yes" />
                      </div>
                      <div className="flex flex-col items-center relative">
                         <div className="absolute -top-16 left-1/2 -translate-x-1/2 px-6 py-2 bg-rose-500 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-rose-500/30">No</div>
                         <div className="h-16 w-0.5 bg-[var(--border)] absolute -top-16" />
                         {step.branches.no.map((sid, idx) => <FlowNode key={sid} stepId={sid} index={index + 1 + idx} />)}
                         <AddButton parentId={stepId} branchType="no" />
                      </div>
                   </div>
                </div>
              )}
            </div>
    );
  };

   const AddButton = ({ parentId = '', branchType = 'main' as 'main' | 'yes' | 'no' }) => (
      <div className="flex flex-col items-center">
         <div className="h-12 md:h-16 w-0.5 bg-[var(--border)] opacity-30" />
         <button 
           onClick={() => {
             setCurrentBranch({ parentId, branchType });
             setIsAddingStep(true);
           }}
           className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-blue-600 bg-[var(--card)] text-blue-600 flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 z-10 group/add transition-all duration-300"
         >
            <Plus size={24} className="group-hover/add:rotate-90 transition-transform duration-300" />
         </button>
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-[var(--bg)] overflow-hidden font-sans">
      
      <header className="h-20 bg-[var(--card)]/80 backdrop-blur-xl border-b border-[var(--border)] px-4 md:px-10 flex items-center justify-between sticky top-0 z-[100]">
         <div className="flex items-center gap-4 md:gap-6 overflow-hidden mr-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
               <Linkedin size={22} />
            </div>
            <div className="space-y-0.5 min-w-0">
               <h1 className="text-sm md:text-lg font-black text-[var(--text)] uppercase tracking-tight truncate">{campaignName || "Draft Campaign"}</h1>
               <div className="flex items-center gap-2">
                  <span className="text-[8px] md:text-[9px] font-black text-blue-600 bg-blue-600/10 px-2 py-0.5 rounded-full uppercase tracking-widest">Editing</span>
                  <span className="hidden md:inline text-[9px] font-bold text-[var(--muted)] uppercase tracking-widest opacity-40">• LinkedIn Strategy</span>
               </div>
            </div>
         </div>

         <div className="hidden lg:flex items-center gap-2">
            {[
              { id: 'audience', label: 'Audience', num: 1 },
              { id: 'sequence', label: 'Sequence', num: 2 },
              { id: 'review', label: 'Launch', num: 3 },
            ].map((s, i) => {
              const status = wizardStep === s.id ? 'active' : ['audience', 'sequence', 'review'].indexOf(wizardStep) > i ? 'complete' : 'pending';
              return (
                <div key={s.id} className="flex items-center">
                   <div onClick={() => setWizardStep(s.id as WizardStep)} className="cursor-pointer flex items-center gap-3 px-4 py-2 rounded-2xl">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black border-2 transition-all ${
                         status === 'active' ? "bg-blue-600 border-blue-600 text-white" : 
                         status === 'complete' ? "bg-emerald-500 border-emerald-500 text-white" : "text-[var(--muted)] border-[var(--border)]"
                      }`}>
                         {status === 'complete' ? <CheckCircle2 size={14} /> : s.num}
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-widest ${status === 'active' ? "text-zinc-950 dark:text-white" : "text-[var(--muted)]"}`}>
                         {s.label}
                      </span>
                   </div>
                   {i < 2 && <div className="w-12 h-px bg-[var(--border)] mx-2" />}
                </div>
              );
            })}
         </div>

         <div className="flex items-center gap-3">
            <button onClick={handleSave} className="h-11 md:h-12 px-6 md:px-10 bg-blue-600 text-white text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl">
               <span>Save Changes</span> 
               <ChevronRight size={18} />
            </button>
            <button onClick={() => router.push('/dashboard/campaigns')} className="w-11 h-11 md:w-12 md:h-12 rounded-2xl border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:text-rose-500 transition-all">
               <X size={24} />
            </button>
         </div>
      </header>
      
      <main className="flex-1 overflow-hidden relative bg-[var(--bg)] flex flex-col">
         <AnimatePresence mode="wait">
            {wizardStep === 'audience' && (
              <motion.div key="audience" className="flex-1 overflow-y-auto p-6 md:p-20 flex flex-col items-center custom-scrollbar">
                 <div className="w-full max-w-4xl space-y-8">
                    <div className="bento-card bg-[var(--card)] border border-[var(--border)] rounded-[2.5rem] p-10 space-y-10">
                       <h2 className="text-xl font-bold uppercase text-[var(--text)]">Edit Audience</h2>
                       
                       <div className="space-y-4">
                          <label className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">Search Result URL</label>
                          <textarea 
                             value={searchUrl}
                             onChange={(e) => setSearchUrl(e.target.value)}
                             placeholder="https://www.linkedin.com/search/results/people/..."
                             className="w-full h-32 p-6 bg-[var(--bg)] border border-[var(--border)] rounded-2xl text-[13px] font-medium focus:outline-none focus:border-blue-500 transition-all shadow-inner resize-none font-mono"
                          />
                          <div className="flex gap-4">
                             <button className="text-[10px] font-bold text-blue-600 hover:underline flex items-center gap-2 uppercase tracking-widest">
                                Linkedin Search <LinkIcon size={12} />
                             </button>
                          </div>
                       </div>

                       <div className="space-y-6">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">Max leads:</label>
                            <div className="flex items-center gap-3">
                               <input type="text" value={maxLeads} readOnly className="w-20 h-10 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-center text-sm font-black text-blue-600" />
                               <span className="text-[10px] font-black uppercase text-[var(--muted)]">contacts</span>
                            </div>
                          </div>
                          <input type="range" min="1" max="1000" value={maxLeads} onChange={(e) => setMaxLeads(parseInt(e.target.value))} className="w-full h-2 bg-blue-600/10 rounded-full appearance-none cursor-pointer accent-blue-600" />
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { id: 'excludeNoPhoto', label: 'No Photos', active: options.excludeNoPhoto },
                            { id: 'excludeFirstDegree', label: 'No 1st Degree', active: options.excludeFirstDegree },
                            { id: 'premiumOnly', label: 'Premium Only', active: options.premiumOnly },
                            { id: 'includeOtherLeads', label: 'Shared Leads', active: options.includeOtherLeads },
                          ].map(opt => (
                             <div key={opt.id} className="flex items-center justify-between p-4 bg-[var(--bg)]/50 border border-[var(--border)] rounded-2xl">
                                <span className="text-[12px] font-semibold text-[var(--text)]">{opt.label}</span>
                                <button 
                                   onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}
                                   className={`h-5 w-9 rounded-full flex items-center px-1 transition-all ${opt.active ? 'bg-blue-600 justify-end' : 'bg-zinc-300 dark:bg-zinc-700 justify-start'}`}
                                >
                                   <div className="h-3.5 w-3.5 bg-white rounded-full shadow-sm" />
                                </button>
                             </div>
                          ))}
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}

            {wizardStep === 'sequence' && (
              <motion.div key="sequence" className="flex-1 overflow-hidden relative flex flex-col animate-in fade-in duration-500">
                  {/* Mode Selector */}
                  {builderMode === 'landing' ? (
                     <div className="flex-1 flex flex-col items-center justify-center p-12 md:p-20 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full max-w-5xl z-10">
                           <button onClick={() => setBuilderMode('builder')} className="group bento-card border-2 border-transparent hover:border-blue-600 p-10 md:p-12 text-left transition-all duration-500 bg-[var(--card)] shadow-2xl flex flex-col gap-10">
                              <div className="w-16 h-16 rounded-3xl bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500"><MousePointer2 size={32} /></div>
                              <div className="space-y-4">
                                 <h3 className="text-2xl md:text-3xl font-black uppercase text-[var(--text)] tracking-tight">Manual Design</h3>
                                 <p className="text-[var(--muted)] text-sm md:text-base opacity-70 leading-relaxed">Craft your exact sequence from scratch. Complete control over every touchpoint.</p>
                              </div>
                           </button>
                           <button className="group bento-card border-2 border-transparent hover:border-blue-600 p-10 md:p-12 text-left transition-all duration-500 bg-[var(--card)] shadow-2xl flex flex-col gap-10 opacity-60 cursor-not-allowed">
                              <div className="w-16 h-16 rounded-3xl bg-zinc-200 dark:bg-zinc-800 text-[var(--muted)] flex items-center justify-center transition-all duration-500"><Layout size={32} /></div>
                              <div className="space-y-4">
                                 <div className="flex items-center gap-3">
                                    <h3 className="text-2xl md:text-3xl font-black uppercase text-[var(--text)] tracking-tight">Templates</h3>
                                    <span className="px-2 py-0.5 rounded-full bg-zinc-200 dark:bg-zinc-800 text-[8px] font-black uppercase">Pró</span>
                                 </div>
                                 <p className="text-[var(--muted)] text-sm md:text-base opacity-70 leading-relaxed">Choose from battle-tested campaign structures. Optimized for conversion.</p>
                              </div>
                           </button>
                        </div>
                     </div>
                  ) : (
                    <div className="flex-1 flex flex-col relative min-h-0">
                        {/* Dot Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none" 
                             style={{ backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

                        <div className="absolute top-8 right-8 z-[60] bg-[var(--card)]/80 backdrop-blur-xl border-2 border-[var(--border)] rounded-[1.25rem] flex items-center shadow-2xl p-1.5 gap-1 animate-in slide-in-from-right-4">
                           <div className="px-5 py-2.5 text-[11px] font-black text-[var(--text)] border-r border-[var(--border)] uppercase tracking-widest">{Math.round(zoom * 100)}%</div>
                           <button onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))} className="w-10 h-10 flex items-center justify-center text-[var(--muted)] hover:text-blue-600 hover:bg-blue-600/5 rounded-xl transition-all"><Minus size={20} /></button>
                           <button onClick={() => setZoom(prev => Math.min(prev + 0.5, 3))} className="w-10 h-10 flex items-center justify-center text-[var(--muted)] hover:text-blue-600 hover:bg-blue-600/5 rounded-xl transition-all"><Plus size={20} /></button>
                        </div>

                        <div className="flex-1 overflow-auto relative custom-scrollbar flex flex-col min-h-0 bg-zinc-50/50 dark:bg-black/10">
                           <motion.div 
                             animate={{ scale: zoom }} 
                             transition={{ type: "spring", damping: 25, stiffness: 150 }}
                             className="relative z-10 flex flex-col items-center origin-top w-full pt-32 pb-60 px-20 text-center"
                           >
                              <div className="px-10 py-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl text-[12px] font-black uppercase tracking-[0.2em] text-[var(--text)] shadow-xl animate-in fade-in zoom-in-95 duration-700 flex items-center gap-4 group/start hover:scale-105 transition-transform">
                                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                                 Campaign Start
                              </div>
                              {mainSequence.map((stepId, index) => <FlowNode key={stepId} stepId={stepId} index={index} />)}
                              <AddButton />
                           </motion.div>
                        </div>
                    </div>
                  )}
              </motion.div>
            )}

            {wizardStep === 'review' && (
               <motion.div key="review" className="flex-1 overflow-y-auto p-20 flex flex-col items-center custom-scrollbar">
                  <div className="w-full max-w-4xl bento-card border border-[var(--border)] p-12 space-y-12 bg-[var(--card)] rounded-[2rem]">
                     <h2 className="text-3xl font-bold uppercase text-[var(--text)]">Review Changes</h2>
                     <div className="space-y-8">
                        <div className="flex items-center justify-between p-6 bg-[var(--bg)] rounded-2xl border border-[var(--border)]">
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase text-[var(--muted)]">Campaign Name</p>
                              <p className="text-lg font-bold">{campaignName}</p>
                           </div>
                           <div className="text-right space-y-1">
                              <p className="text-[10px] font-black uppercase text-[var(--muted)]">Leads</p>
                              <p className="text-lg font-bold">{maxLeads}</p>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <p className="text-[11px] font-black uppercase text-[var(--muted)]">Sequence Preview</p>
                           <div className="space-y-2">
                              {mainSequence.map((sid, idx) => (
                                 <div key={sid} className="p-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                       <span className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">{idx + 1}</span>
                                       <span className="text-sm font-bold uppercase">{steps[sid].type}</span>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </main>

      {/* --- ADD STEP DRAWER --- */}
      <AnimatePresence>
         {isAddingStep && (
            <>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddingStep(false)} className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-[100]" />
               <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[var(--card)] border-l border-[var(--border)] z-[101] flex flex-col shadow-2xl overflow-hidden">
                  <div className="h-24 border-b border-[var(--border)] px-10 flex items-center justify-between">
                     <h2 className="text-xl font-black uppercase text-[var(--text)]">Add Node</h2>
                     <button onClick={() => setIsAddingStep(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg)] transition-all"><X size={24} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                     <div className="space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] border-b border-[var(--border)] pb-2">LinkedIn</p>
                        {[
                           { type: "View profile", icon: Eye, desc: "Visit their profile" },
                           { type: "Like post", icon: ThumbsUp, desc: "Engage with content" },
                           { type: "Connection request", icon: UserPlus, desc: "Send invitation" },
                           { type: "Message", icon: Mail, desc: "Direct message" },
                        ].map(step => (
                           <button key={step.type} onClick={() => addStep(step.type as StepType)} className="w-full flex items-start gap-4 p-5 hover:bg-blue-600/5 rounded-3xl border-2 border-transparent hover:border-blue-600/10 transition-all text-left group">
                              <div className="w-12 h-12 rounded-2xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--muted)] group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0"><step.icon size={22} /></div>
                              <div className="space-y-1 pt-1">
                                 <span className="text-sm font-black text-[var(--text)] uppercase group-hover:text-blue-600 transition-colors">{step.type}</span>
                                 <p className="text-[11px] text-[var(--muted)] opacity-70 leading-tight">{step.desc}</p>
                              </div>
                           </button>
                        ))}
                     </div>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

    
      <AnimatePresence>
        {activeStep && (
          <>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingStepId(null)} className="fixed inset-0 bg-zinc-950/80 backdrop-blur-md z-[200]" />
             <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="fixed md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full max-w-4xl bg-[var(--card)] border border-[var(--border)] rounded-[3rem] z-[201] flex flex-col shadow-2xl overflow-hidden max-h-[90vh]">
                <div className="px-10 h-24 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg)]/50 shrink-0">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">{getIcon(activeStep.type)}</div>
                      <h2 className="text-xl font-black uppercase text-[var(--text)]">{activeStep.type} Editor</h2>
                   </div>
                   <button onClick={() => setEditingStepId(null)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[var(--bg)] transition-all"><X size={24} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-12 space-y-10 custom-scrollbar">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase text-[var(--muted)]">Personalize</span>
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-600/5 px-2 py-0.5 rounded-full uppercase">Inserts at cursor</span>
                      </div>
                      <div className="flex flex-wrap gap-3">
                         {['{first_name}', '{last_name}', '{company_name}', '{job_title}'].map(tag => (
                            <button 
                              key={tag} 
                              onClick={() => {
                                updateStep(activeStep.id, { [lastFocusedField]: (activeStep[lastFocusedField] || "") + tag });
                              }}
                              className="px-4 py-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[11px] font-black text-[var(--text)] hover:border-blue-600 hover:bg-blue-600/5 transition-all shadow-sm"
                            >
                               {tag}
                            </button>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-8">
                      <div className="space-y-4">
                         <div className="flex justify-between items-center">
                            <label className="text-[11px] font-black uppercase tracking-widest text-[var(--muted)]">Main Message</label>
                            <span className="text-[10px] opacity-40 font-black">{(activeStep.content?.length || 0)}/200</span>
                         </div>
                         <textarea 
                           value={activeStep.content || ""} 
                           onChange={(e) => updateStep(activeStep.id, { content: e.target.value })} 
                           onFocus={() => setLastFocusedField('content')}
                           className="w-full h-48 p-8 bg-[var(--bg)] border-2 border-[var(--border)] rounded-3xl text-sm focus:outline-none focus:border-blue-600 transition-all resize-none shadow-inner" 
                           placeholder="Type your message here..."
                         />
                      </div>

                      {activeStep.type === 'Connection request' && activeStep.autoFollowUp && (
                         <div className="space-y-4 pt-8 border-t border-[var(--border)] animate-in fade-in slide-in-from-top-4">
                            <div className="flex justify-between items-center">
                               <label className="text-[11px] font-black uppercase tracking-widest text-emerald-600">Auto Follow-up</label>
                               <span className="text-[10px] opacity-40 font-black">{(activeStep.followUpContent?.length || 0)}/8000</span>
                            </div>
                            <textarea 
                               value={activeStep.followUpContent || ""} 
                               onChange={(e) => updateStep(activeStep.id, { followUpContent: e.target.value })} 
                               onFocus={() => setLastFocusedField('followUpContent')}
                               className="w-full h-40 p-8 bg-[var(--bg)] border-2 border-[var(--border)] rounded-3xl text-sm focus:outline-none focus:border-emerald-500 transition-all resize-none shadow-inner" 
                               placeholder="Type follow-up message here..."
                            />
                         </div>
                      )}
                   </div>
                </div>

                <div className="px-10 h-24 border-t border-[var(--border)] bg-[var(--bg)]/30 flex items-center shrink-0">
                   <button onClick={() => setEditingStepId(null)} className="h-12 px-10 bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Save Content</button>
                </div>
             </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditCampaignPage;
