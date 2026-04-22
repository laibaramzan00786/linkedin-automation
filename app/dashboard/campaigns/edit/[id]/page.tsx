
  'use client';
import { useState } from "react";
import {useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  Save, 
  Settings, 
  Zap, 
  Mail, 
  Clock, 
  ChevronRight,
  ChevronDown,
  Plus,
  Trash2,
  CheckCircle2,
  Layout,
  FileText,
  UserPlus
} from "lucide-react";
import { LinkedinLogoIcon as Linkedin } from "@phosphor-icons/react";
type StepType = "LinkedIn Connection" | "LinkedIn Message" | "Follow-up Email";

interface Step {
  id: number;
  type: StepType;
  delay: string;
  content: string;
  isOpen: boolean;
}

const EditCampaignPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [campaignName, setCampaignName] = useState("Recruiters Outreach");
  const [wizardStep, setWizardStep] = useState(2); 
  const [steps, setSteps] = useState<Step[]>([
    { 
      id: 1, 
      type: "LinkedIn Connection", 
      delay: "Immediate", 
      content: "Looks like we have similar connections, let's connect :)",
      isOpen: true
    },
    { 
      id: 2, 
      type: "LinkedIn Message", 
      delay: "2 days later", 
      content: "Hi there!",
      isOpen: true
    },
  ]);

  const toggleStep = (id: number) => {
    setSteps(prev => prev.map(s => s.id === id ? { ...s, isOpen: !s.isOpen } : s));
  };

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
     
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 pb-8 border-b border-[var(--border)]">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.push('/dashboard/campaigns')}
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)] transition-all shadow-sm"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="space-y-1">
             <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">Live</span>
                <span className="text-[10px] font-bold text-[var(--muted)] uppercase tracking-widest">ID: {id?.slice(0, 8)}</span>
             </div>
             <input 
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="text-2xl font-bold tracking-tight text-[var(--text)] bg-transparent border-none focus:outline-none focus:ring-0 p-0 uppercase"
            />
          </div>
        </div>

    
        <div className="hidden lg:flex items-center gap-8 px-10 py-3 bg-[var(--card)] border border-[var(--border)] rounded-full">
           {[
             { step: 1, label: "Choose Audience", icon: UserPlus },
             { step: 2, label: "Set Sequence", icon: Layout },
             { step: 3, label: "Review & Publish", icon: CheckCircle2 },
           ].map((item) => (
             <div key={item.step} className="flex items-center gap-3 group cursor-pointer" onClick={() => setWizardStep(item.step)}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                  wizardStep >= item.step ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--muted)]'
                }`}>
                   {wizardStep > item.step ? <CheckCircle2 size={14} /> : item.step}
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${wizardStep === item.step ? 'text-blue-600' : 'text-[var(--muted)] group-hover:text-[var(--text)]'}`}>
                   {item.label}
                </span>
                {item.step < 3 && <div className="w-10 h-px bg-[var(--border)]" />}
             </div>
           ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="h-14 px-8 rounded-2xl border border-[var(--border)] text-[10px] font-black uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)] transition-all flex items-center gap-3">
             <Save size={16} /> Save Template
          </button>
          <button className="h-14 px-10 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20 active:scale-95">
             Continue <ChevronRight size={18} />
          </button>
        </div>
      </div>

    
      <div >
        
    
        <div className="xl:col-span-2 space-y-8">
           
           <div className="flex items-center justify-between pb-4">
              <div className="flex items-center gap-4">
                 <h2 className="text-sm font-black uppercase tracking-[0.2em] text-[var(--text)]">Flow Editor</h2>
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-4">
                 <button className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">Choose a Template</button>
                 <div className="w-px h-4 bg-[var(--border)]" />
                 <button className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] hover:text-[var(--text)]">Reset Flow</button>
              </div>
           </div>

           <div className="relative rounded-[3rem] border border-[var(--border)] bg-[var(--card)] min-h-[800px] overflow-hidden group shadow-2xl p-10 lg:p-20">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07]" 
                 style={{ 
                   backgroundImage: `radial-gradient(circle, var(--text) 1px, transparent 1px)`, 
                   backgroundSize: '30px 30px' 
                 }} 
              />
              
              <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl mx-auto">
                 <AnimatePresence mode="popLayout">
                    {steps.map((step, index) => (
                      <motion.div
                        key={step.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full flex flex-col items-center gap-12"
                      >
                         <div className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-3xl shadow-xl overflow-hidden group/step">
                            <div className="px-8 py-5 flex items-center justify-between border-b border-[var(--border)] bg-[var(--card)]/50">
                               <div className="flex items-center gap-5">
                                  <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20 shrink-0">
                                     {step.type.includes("LinkedIn") ? <Linkedin size={18} /> : <Mail size={18} />}
                                  </div>
                                  <div>
                                     <h4 className="text-xs font-black uppercase tracking-widest text-[var(--text)]">Step {index + 1} - {step.type}</h4>
                                  </div>
                               </div>
                               <div className="flex items-center gap-4">
                                  <button onClick={() => toggleStep(step.id)} className="text-[var(--muted)] hover:text-[var(--text)] transition-all">
                                     <ChevronDown size={18} className={`transition-transform duration-500 ${step.isOpen ? 'rotate-180' : ''}`} />
                                  </button>
                                  <button className="h-8 w-8 rounded-lg bg-rose-500/10 text-rose-500 opacity-0 group-hover/step:opacity-100 transition-all flex items-center justify-center hover:bg-rose-500 hover:text-white">
                                     <Trash2 size={14} />
                                  </button>
                               </div>
                            </div>

                            <AnimatePresence>
                               {step.isOpen && (
                                 <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: "auto" }}
                                    exit={{ height: 0 }}
                                    className="overflow-hidden"
                                 >
                                    <div className="p-8 space-y-6">
                                       <div className="space-y-3">
                                          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--muted)] shrink-0">Message Body</label>
                                          <div className="relative">
                                             <textarea 
                                                value={step.content}
                                                className="w-full h-32 bg-[var(--card)]/30 border border-[var(--border)] rounded-2xl p-6 text-sm font-medium focus:outline-none focus:border-blue-500 transition-all resize-none text-[var(--text)]"
                                             />
                                             <div className="absolute bottom-4 right-6 text-[9px] font-black uppercase tracking-widest text-[var(--muted)]">
                                                {step.content.length} / 8000
                                             </div>
                                          </div>
                                       </div>

                                       <div className="flex items-center justify-between">
                                          <div className="flex items-center gap-3">
                                             <button className="h-10 px-5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/10">
                                                <FileText size={14} /> Templates
                                             </button>
                                             <button className="h-10 px-5 border border-[var(--border)] text-[var(--text)] text-[10px] font-black uppercase tracking-widest rounded-xl hover:border-[var(--text)] transition-all flex items-center gap-2">
                                                <Plus size={14} /> Personalize
                                             </button>
                                          </div>
                                          
                                          <div className="flex items-center gap-3 p-1.5 bg-[var(--card)] border border-[var(--border)] rounded-xl">
                                             <div className={`w-8 h-8 rounded-lg ${step.type.includes('LinkedIn') ? 'bg-blue-600 text-white' : 'text-[var(--muted)]'} flex items-center justify-center`}>
                                                <Linkedin size={14} />
                                             </div>
                                             <div className={`w-8 h-8 rounded-lg ${step.type.includes('Email') ? 'bg-amber-500 text-white' : 'text-[var(--muted)]'} flex items-center justify-center`}>
                                                <Mail size={14} />
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </motion.div>
                               )}
                            </AnimatePresence>
                         </div>

                         {index < steps.length - 1 && (
                            <div className="flex flex-col items-center gap-2 -my-6 py-4">
                               <div className="w-px h-8 bg-blue-600/30" />
                               <div className="px-5 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-[9px] font-black uppercase tracking-widest text-blue-600">
                                  Wait {step.delay}
                               </div>
                               <div className="w-px h-8 bg-blue-600/30" />
                            </div>
                         )}
                      </motion.div>
                    ))}
                 </AnimatePresence>

                 <button className="w-full h-24 border-2 border-dashed border-[var(--border)] rounded-[2.5rem] flex items-center justify-center gap-5 text-[var(--muted)] hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/[0.02] transition-all group active:scale-[0.98]">
                    <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all shadow-sm">
                       <Plus size={24} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">Integrate next flow node</span>
                 </button>
              </div>
           </div>
        </div>

       

      </div>

    </div>
  );
};

export default EditCampaignPage;
