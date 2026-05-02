

'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Plus, Eye, Users, MessageSquare, ThumbsUp, Award,
  Clock, ChevronDown, Check, GitBranch, Save,
  FileText, Mail, Search, Send, ChevronLeft, ChevronRight,
  Link as LinkIcon,
} from "lucide-react";

// Types
type StepType =
  | "View profile" | "Connection request" | "Message"
  | "Like post"    | "Endorse skills"      | "If connected"
  | "Find emails"  | "Send email"          | "If email found" | "If email opened";

type DelayUnit = "day" | "days" | "hour" | "hours";

interface FlowStep {
  id: string; type: StepType; delay: number; delayUnit: DelayUnit;
  immediate: boolean; content?: string; withdrawAfter?: number;
  isCondition?: boolean; yesChildren?: string[]; noChildren?: string[];
}

interface Campaign {
  id: string; name: string; searchUrl?: string;
  flowSteps?: Record<string, FlowStep>;
  flowRoot?: string[];
  [key: string]: unknown;
}

const STEP_CONFIG: Record<string, { color:string; bg:string; icon:React.ElementType }> = {
  "View profile":       { color:"#3b82f6", bg:"#eff6ff",  icon:Eye          },
  "Connection request": { color:"#e8836a", bg:"#fef3f0",  icon:Users        },
  "Message":            { color:"#6366f1", bg:"#eef2ff",  icon:MessageSquare},
  "Like post":          { color:"#10b981", bg:"#ecfdf5",  icon:ThumbsUp     },
  "Endorse skills":     { color:"#f59e0b", bg:"#fffbeb",  icon:Award        },
  "If connected":       { color:"#e8836a", bg:"#e8836a",  icon:GitBranch    },
  "Find emails":        { color:"#888",    bg:"#f5f5f5",  icon:Search       },
  "Send email":         { color:"#888",    bg:"#f5f5f5",  icon:Send         },
  "If email found":     { color:"#888",    bg:"#f5f5f5",  icon:Mail         },
  "If email opened":    { color:"#888",    bg:"#f5f5f5",  icon:Mail         },
};

const ACTION_LI:   StepType[] = ["Connection request","Message","View profile","Like post","Endorse skills"];
const ACTION_EM:   StepType[] = ["Find emails","Send email"];
const COND_LI:     StepType[] = ["If connected"];
const COND_EM:     StepType[] = ["If email found","If email opened"];
const CONTACT_VARS = ["{first_name}","{last_name}","{job_title}","{company_name}"];
const SENDER_VARS  = ["{my_first_name}","{my_last_name}","{my_job_title}","{my_company_name}"];

const StepCard = ({ step, index, onEdit, onAddAfter }: {
  step:FlowStep; index:number;
  onEdit:(id:string)=>void; onAddAfter:(id:string)=>void;
}) => {
  const cfg   = STEP_CONFIG[step.type] ?? STEP_CONFIG["View profile"];
  const Icon  = cfg.icon;
  const isCond = step.isCondition;

  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth:280 }}>
     
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-2 text-xs font-medium cursor-pointer"
        style={{ background:"#fff", border:"1px solid #e5e5e5", color:"#888" }}>
        <Clock size={12}/>
        {step.immediate ? "Immediately" : <>Wait for <strong style={{ color:"#333",margin:"0 3px" }}>{step.delay}</strong>{step.delayUnit}</>}
        <ChevronDown size={11}/>
      </div>

   
      <div onClick={() => (step.type === "Message" || step.type === "Connection request") && onEdit(step.id)}
        className="w-full rounded-xl px-4 py-3 cursor-pointer transition-all"
        style={{ background: isCond ? "#e8836a" : "#fff", border: isCond ? "none" : "1px solid #e5e5e5",
          boxShadow:"0 1px 4px rgba(0,0,0,0.06)", color: isCond ? "#fff" : "#333" }}
        onMouseEnter={e => { if(!isCond)(e.currentTarget as HTMLElement).style.borderColor="#e8836a"; }}
        onMouseLeave={e => { if(!isCond)(e.currentTarget as HTMLElement).style.borderColor="#e5e5e5"; }}>
        <p className="text-[10px] font-semibold mb-1" style={{ color: isCond ? "rgba(255,255,255,0.75)" : "#aaa" }}>
          Step {index + 1}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: isCond ? "rgba(255,255,255,0.2)" : cfg.bg, color: isCond ? "#fff" : cfg.color }}>
            <Icon size={14}/>
          </div>
          <span className="text-sm font-semibold">{step.type}</span>
        </div>
        {step.content && <p className="text-xs mt-1.5 line-clamp-1 opacity-60">{step.content}</p>}
      </div>

   
      {!step.isCondition && (
        <button onClick={() => onAddAfter(step.id)}
          className="mt-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
          style={{ background:"transparent", border:"2px solid #e8836a", color:"#e8836a" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#e8836a"; (e.currentTarget as HTMLElement).style.color="#fff"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="#e8836a"; }}>
          <Plus size={14}/>
        </button>
      )}
    </div>
  );
};


const AddStepModal = ({ onSelect, onClose }: { onSelect:(t:StepType)=>void; onClose:()=>void }) => (
  <div className="fixed inset-0 z-[200] flex items-start justify-end"
    style={{ background:"rgba(0,0,0,0.18)" }} onClick={onClose}>
    <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:40 }}
      onClick={e => e.stopPropagation()}
      className="h-full overflow-y-auto"
      style={{ width:460, background:"#fff", borderLeft:"1px solid #e5e5e5" }}>
      <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor:"#f0f0f0" }}>
        <h2 className="text-base font-bold" style={{ color:"#111" }}>Select a new step</h2>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color:"#888" }}>
          <X size={18}/>
        </button>
      </div>
      <div className="px-6 py-5 space-y-6">
      
        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color:"#111" }}>Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color:"#aaa" }}>LinkedIn</p>
              <div className="space-y-2">
                {ACTION_LI.map(type => {
                  const cfg = STEP_CONFIG[type]; const Icon = cfg.icon;
                  return (
                    <button key={type} onClick={() => onSelect(type)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                      style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#e8836a"; (e.currentTarget as HTMLElement).style.background="#fef3f0"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#e5e5e5"; (e.currentTarget as HTMLElement).style.background="#f8f8f8"; }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background:cfg.bg, color:cfg.color }}>
                        <Icon size={15}/>
                      </div>
                      <span className="text-xs font-medium" style={{ color:"#333" }}>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color:"#aaa" }}>Email</p>
              <div className="space-y-2">
                {ACTION_EM.map(type => {
                  const cfg = STEP_CONFIG[type]; const Icon = cfg.icon;
                  return (
                    <button key={type} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left opacity-40 cursor-not-allowed"
                      style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background:cfg.bg, color:cfg.color }}>
                        <Icon size={15}/>
                      </div>
                      <span className="text-xs font-medium" style={{ color:"#333" }}>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color:"#111" }}>Conditions</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color:"#aaa" }}>LinkedIn</p>
              <div className="space-y-2">
                {COND_LI.map(type => (
                  <button key={type} onClick={() => onSelect(type)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                    style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#e8836a"; (e.currentTarget as HTMLElement).style.background="#fef3f0"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#e5e5e5"; (e.currentTarget as HTMLElement).style.background="#f8f8f8"; }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background:"#fef3f0", color:"#e8836a" }}>
                      <GitBranch size={15}/>
                    </div>
                    <span className="text-xs font-medium" style={{ color:"#333" }}>{type}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color:"#aaa" }}>Email</p>
              <div className="space-y-2">
                {COND_EM.map(type => {
                  const cfg = STEP_CONFIG[type]; const Icon = cfg.icon;
                  return (
                    <button key={type} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left opacity-40 cursor-not-allowed"
                      style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background:cfg.bg, color:cfg.color }}>
                        <Icon size={15}/>
                      </div>
                      <span className="text-xs font-medium" style={{ color:"#333" }}>{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);


const MessageModal = ({ step, onSave, onClose }: {
  step:FlowStep; onSave:(id:string,content:string,withdrawAfter?:number)=>void; onClose:()=>void;
}) => {
  const [content,         setContent]         = useState(step.content || "");
  const [withdrawAfter,   setWithdrawAfter]   = useState(step.withdrawAfter ?? 14);
  const [withdrawEnabled, setWithdrawEnabled] = useState(true);
  const isConn   = step.type === "Connection request";
  const maxChars = isConn ? 250 : 9999;
  const remaining = isConn ? maxChars - content.length : null;

  const insertVar = (v:string) => setContent(prev => prev + v);
  const highlight = (text:string) =>
    text.replace(/\{[^}]+\}/g, m => `<mark style="background:#dbeafe;color:#2563eb;border-radius:3px;padding:0 2px">${m}</mark>`);

  return (
    <div className="fixed inset-0 z-[200]" style={{ background:"rgba(0,0,0,0.2)" }} onClick={onClose}>
      <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:40 }}
        onClick={e => e.stopPropagation()}
        className="absolute top-0 right-0 h-full overflow-y-auto flex flex-col"
        style={{ width:720, background:"#fff", borderLeft:"1px solid #e5e5e5" }}>

        <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor:"#f0f0f0" }}>
          <h2 className="text-base font-bold" style={{ color:"#111" }}>
            {isConn ? "Connection message" : "Message"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color:"#888" }}>
            <X size={18}/>
          </button>
        </div>

        <div className="px-8 py-5 space-y-4 flex-1">
          {[
            { label:"Contact variables:", vars: CONTACT_VARS },
            { label:"Sender variables:",  vars: SENDER_VARS  },
          ].map(row => (
            <div key={row.label} className="flex items-start gap-4">
              <span className="text-xs font-semibold pt-1.5 shrink-0 w-32" style={{ color:"#888" }}>{row.label}</span>
              <div className="flex flex-wrap gap-2">
                {row.vars.map(v => (
                  <button key={v} onClick={() => insertVar(v)}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                    style={{ background:"#f0f7ff", border:"1px solid #bfdbfe", color:"#2563eb" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="#dbeafe"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="#f0f7ff"}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}

      
          <div className="rounded-xl overflow-hidden" style={{ border:"1px solid #e5e5e5" }}>
            <textarea value={content}
              onChange={e => setContent(e.target.value.slice(0, maxChars))}
              placeholder="Write your message here..."
              rows={6}
              className="w-full px-5 py-4 text-sm resize-none focus:outline-none"
              style={{ color:"#333", lineHeight:1.7 }}/>
            <div className="px-4 py-2 flex items-center gap-4 border-t"
              style={{ borderColor:"#f0f0f0", background:"#fafafa" }}>
              <div className="flex items-center gap-2 text-[11px]" style={{ color:"#aaa" }}>
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background:"#dbeafe" }}/> variable
                <span className="w-3 h-3 rounded-sm inline-block ml-2" style={{ background:"#fde8e3" }}/> replace
              </div>
              {remaining !== null && (
                <span className="ml-auto text-xs font-medium"
                  style={{ color: remaining < 50 ? "#ef4444" : "#aaa" }}>
                  Remaining: {remaining}/{maxChars}
                </span>
              )}
            </div>
          </div>

          {content && (
            <div className="rounded-xl px-5 py-4" style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:"#aaa" }}>Preview</p>
              <p className="text-sm" style={{ color:"#333", lineHeight:1.7 }}
                dangerouslySetInnerHTML={{ __html: highlight(content) }}/>
            </div>
          )}

          <div className="flex items-center justify-between">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
              style={{ background:"#fef3f0", border:"1px solid #f5c5b5", color:"#e8836a" }}>
              <FileText size={13}/> Use template
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color:"#aaa" }}>Cycle contacts in preview</span>
              <button className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background:"#f5f5f5", color:"#888" }}>
                <ChevronLeft size={14}/>
              </button>
              <button className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background:"#f5f5f5", color:"#888" }}>
                <ChevronRight size={14}/>
              </button>
            </div>
          </div>

        
          {isConn && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}>
              <button onClick={() => setWithdrawEnabled(p => !p)}
                className="w-10 h-6 rounded-full relative transition-all duration-300 shrink-0"
                style={{ background: withdrawEnabled ? "#e8836a" : "#ddd" }}>
                <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                  style={{ left: withdrawEnabled ? 22 : 4 }}/>
              </button>
              <span className="text-xs font-medium" style={{ color:"#555" }}>Withdraw requests after</span>
              <input type="number" min={7} max={21} value={withdrawAfter}
                onChange={e => setWithdrawAfter(parseInt(e.target.value))}
                className="w-12 text-center px-1 py-1 rounded-lg text-sm font-bold focus:outline-none"
                style={{ background:"#fff", border:"1px solid #e5e5e5", color:"#333" }}/>
              <span className="text-xs" style={{ color:"#555" }}>days (if not accepted)</span>
              <span className="text-xs ml-auto" style={{ color:"#aaa" }}>Min 7 · Max 21</span>
            </div>
          )}
        </div>

        <div className="px-8 py-5 border-t" style={{ borderColor:"#f0f0f0" }}>
          <button onClick={() => onSave(step.id, content, isConn ? withdrawAfter : undefined)}
            className="px-8 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
            style={{ background:"#e8836a", boxShadow:"0 4px 12px rgba(232,131,106,0.3)" }}>
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

 
const BranchColumn = ({ label, children, onAddStep, isEmpty }: {
  label:"Yes"|"No"; children:React.ReactNode; onAddStep:()=>void; isEmpty:boolean;
}) => (
  <div className="flex flex-col items-center" style={{ minWidth:260 }}>
    <div className="flex items-center gap-2 mb-3">
      <div className="h-px w-8" style={{ background: label==="Yes" ? "#e8836a" : "#e5e5e5" }}/>
      <span className="text-xs font-bold px-3 py-1 rounded-full"
        style={{ background: label==="Yes" ? "#fef3f0" : "#f5f5f5",
          color: label==="Yes" ? "#e8836a" : "#888",
          border: "1px solid " + (label==="Yes" ? "#f5c5b5" : "#e5e5e5") }}>
        {label}
      </span>
      <div className="h-px w-8" style={{ background:"#e5e5e5" }}/>
    </div>
    {children}
    <button onClick={onAddStep}
      className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
      style={{ background:"transparent", border:"1px dashed #e8836a", color:"#e8836a" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#fef3f0"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}>
      <Plus size={13}/> Add a new step
    </button>
    {isEmpty && <p className="text-xs mt-2" style={{ color:"#bbb" }}>End of sequence</p>}
  </div>
);

//  Main Edit Page 
const EditCampaignPage = () => {
  const router = useRouter();
  const params = useParams();
  const id     = params?.id as string;

  const [campaign,     setCampaign]     = useState<Campaign|null>(null);
  const [flowSteps,    setFlowSteps]    = useState<Record<string,FlowStep>>({});
  const [rootSequence, setRootSequence] = useState<string[]>([]);
  const [saved,        setSaved]        = useState(false);
  const [addAfter,     setAddAfter]     = useState<{id:string;branch?:"yes"|"no"}|null>(null);
  const [editingStep,  setEditingStep]  = useState<string|null>(null);
  const [showAddRoot,  setShowAddRoot]  = useState(false);


  useEffect(() => {
    const all: Campaign[] = JSON.parse(localStorage.getItem("custom_campaigns") || "[]");
    const found = all.find(c => c.id === id);
    if (!found) { router.push("/dashboard/campaigns"); return; }
    setCampaign(found);

    // Case 1 Campaign was created with the new wizard (has flowSteps + flowRoot)
    if (found.flowSteps && found.flowRoot && (found.flowRoot as string[]).length > 0) {
      setFlowSteps(found.flowSteps as Record<string,FlowStep>);
      setRootSequence(found.flowRoot as string[]);
      return;
    }

    // Case 2 Legacy campaign — convert old format to flow format
    const typeMap: Record<string,StepType> = {
      "Connection request":    "Connection request",
      "Follow-up Message":     "Message",
      "Message":               "Message",
      "LinkedIn Profile Visit":"View profile",
      "View profile":          "View profile",
      "Like a post":           "Like post",
      "Like post":             "Like post",
      "Endorse a skill":       "Endorse skills",
      "Endorse skills":        "Endorse skills",
      "If connected":          "If connected",
    };

    const legacySeq: string[]   = Array.isArray(found.mainSequence) ? (found.mainSequence as string[]) : [];
    const legacySteps            = (found.steps ?? {}) as Record<string,{ id:string; type:string; delay:number; content?:string }>;
    const builtSteps: Record<string,FlowStep> = {};
    const root: string[] = [];

    legacySeq.forEach(sid => {
      const s = legacySteps[sid];
      if (!s) return;
      const mapped: StepType = typeMap[s.type] ?? "View profile";
      builtSteps[s.id] = {
        id: s.id, type: mapped,
        delay: s.delay ?? 1, delayUnit: "day",
        immediate: (s.delay ?? 0) === 0,
        content: s.content ?? undefined,
        isCondition: mapped === "If connected",
        yesChildren: mapped === "If connected" ? [] : undefined,
        noChildren:  mapped === "If connected" ? [] : undefined,
      };
      root.push(s.id);
    });

    setFlowSteps(builtSteps);
    setRootSequence(root);
    // Also immediately persist converted steps so next open is instant
    const updated = all.map(c => c.id === id ? { ...c, flowSteps: builtSteps, flowRoot: root } : c);
    localStorage.setItem("custom_campaigns", JSON.stringify(updated));
  }, [id]);


  const makeStep = (type: StepType): FlowStep => ({
    id: "s" + Math.random().toString(36).substring(2, 8),
    type, delay: 1, delayUnit: "day", immediate: false,
    content: (type === "Connection request" || type === "Message") ? "" : undefined,
    isCondition: type === "If connected",
    yesChildren: type === "If connected" ? [] : undefined,
    noChildren:  type === "If connected" ? [] : undefined,
  });

  const handleSelectStep = (type: StepType) => {
    const newStep = makeStep(type);
    setFlowSteps(prev => ({ ...prev, [newStep.id]: newStep }));

    if (showAddRoot) {
      setRootSequence(prev => [...prev, newStep.id]);
      setShowAddRoot(false);
    } else if (addAfter) {
      const { id: afterId, branch } = addAfter;
      if (branch) {
        setFlowSteps(prev => ({
          ...prev,
          [afterId]: {
            ...prev[afterId],
            [`${branch}Children`]: [...(prev[afterId][`${branch}Children` as "yesChildren"|"noChildren"] ?? []), newStep.id],
          },
        }));
      } else {
        setRootSequence(prev => {
          const idx = prev.indexOf(afterId);
          const copy = [...prev];
          copy.splice(idx === -1 ? copy.length : idx + 1, 0, newStep.id);
          return copy;
        });
      }
      setAddAfter(null);
    }

    if (type === "Connection request" || type === "Message") setEditingStep(newStep.id);
  };

  const handleSaveMessage = (sid: string, content: string, withdrawAfter?: number) => {
    setFlowSteps(prev => ({ ...prev, [sid]: { ...prev[sid], content, withdrawAfter } }));
    setEditingStep(null);
  };

  
  const handleSave = () => {
    const all: Campaign[] = JSON.parse(localStorage.getItem("custom_campaigns") || "[]");
    const updated = all.map(c => c.id === id ? { ...c, flowSteps, flowRoot: rootSequence } : c);
    localStorage.setItem("custom_campaigns", JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => { setSaved(false); router.push("/dashboard/campaigns"); }, 1400);
  };

  if (!campaign) return (
    <div className="flex items-center justify-center h-screen" style={{ background:"#f0f0f0" }}>
      <div className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{ borderColor:"#e8836a", borderTopColor:"transparent" }}/>
    </div>
  );


  const renderStep = (sid: string, index: number): React.ReactNode => {
    const step = flowSteps[sid];
    if (!step) return null;

    if (step.isCondition) {
      const yesList = step.yesChildren ?? [];
      const noList  = step.noChildren  ?? [];
      return (
        <div key={sid} className="flex flex-col items-center w-full">
          <div className="w-px" style={{ height:24, background:"#e8836a" }}/>
          <div style={{ maxWidth:280, width:"100%" }}>
            {!step.immediate && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-2 text-xs font-medium mx-auto w-fit"
                style={{ background:"#fff", border:"1px solid #e5e5e5", color:"#888" }}>
                <Clock size={12}/> Wait for <strong style={{ margin:"0 4px" }}>{step.delay}</strong> {step.delayUnit}
                <ChevronDown size={11}/>
              </div>
            )}
            <div className="w-full rounded-xl px-4 py-3"
              style={{ background:"#e8836a", color:"#fff", boxShadow:"0 2px 8px rgba(232,131,106,0.3)" }}>
              <p className="text-[10px] font-semibold mb-1" style={{ color:"rgba(255,255,255,0.7)" }}>Step {index+1}</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background:"rgba(255,255,255,0.2)" }}>
                  <GitBranch size={14}/>
                </div>
                <span className="text-sm font-semibold">{step.type}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-12 mt-4 items-start w-full justify-center">
            <BranchColumn label="Yes" isEmpty={yesList.length===0}
              onAddStep={() => setAddAfter({ id:sid, branch:"yes" })}>
              {yesList.map((cid,ci) => (
                <div key={cid} className="flex flex-col items-center">
                  {ci > 0 && <div className="w-px" style={{ height:16, background:"#e5e5e5" }}/>}
                  <StepCard step={flowSteps[cid]} index={index+ci+1}
                    onEdit={setEditingStep} onAddAfter={() => setAddAfter({ id:sid, branch:"yes" })}/>
                </div>
              ))}
            </BranchColumn>
            <BranchColumn label="No" isEmpty={noList.length===0}
              onAddStep={() => setAddAfter({ id:sid, branch:"no" })}>
              {noList.map((cid,ci) => (
                <div key={cid} className="flex flex-col items-center">
                  {ci > 0 && <div className="w-px" style={{ height:16, background:"#e5e5e5" }}/>}
                  <StepCard step={flowSteps[cid]} index={index+ci+1}
                    onEdit={setEditingStep} onAddAfter={() => setAddAfter({ id:sid, branch:"no" })}/>
                </div>
              ))}
            </BranchColumn>
          </div>
        </div>
      );
    }

    return (
      <div key={sid} className="flex flex-col items-center w-full">
        {index > 0 && <div className="w-px" style={{ height:24, background:"#e8836a" }}/>}
        <StepCard step={step} index={index} onEdit={setEditingStep}
          onAddAfter={aid => setAddAfter({ id:aid })}/>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden"
      style={{ background:"#f0f0f0", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

     
      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity:0, y:-40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-40 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-semibold shadow-xl"
            style={{ background:"#10b981" }}>
            <Check size={16}/> Campaign saved!
          </motion.div>
        )}
      </AnimatePresence>

      <header className="shrink-0 flex items-center justify-between px-6"
        style={{ height:56, background:"#fff", borderBottom:"1px solid #e5e5e5" }}>
        <div className="flex items-center gap-3">
          <h2 className="text-base font-bold" style={{ color:"#111" }}>{campaign.name}</h2>
          {campaign.searchUrl && (
            <a href={campaign.searchUrl as string} target="_blank" rel="noreferrer"
              className="flex items-center gap-1 text-xs font-medium truncate max-w-xs"
              style={{ color:"#e8836a" }}>
              <LinkIcon size={12}/>
              {(campaign.searchUrl as string).slice(0,55)}{(campaign.searchUrl as string).length > 55 ? "..." : ""}
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white transition-all"
            style={{ background:"#e8836a", boxShadow:"0 4px 12px rgba(232,131,106,0.25)" }}>
            <Save size={14}/> Apply changes
          </button>
          <button onClick={() => router.push("/dashboard/campaigns")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
            style={{ color:"#888" }}>
            <X size={18}/>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-auto relative"
        style={{
          backgroundColor: "#f5f5f5",
          backgroundImage: "radial-gradient(circle, #c8c8c8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}>
        <div className="flex flex-col items-center py-10 px-6 min-h-full">

          <div className="px-5 py-2 rounded-full text-xs font-semibold mb-2"
            style={{ background:"#fff", border:"1px solid #e5e5e5", color:"#888" }}>
            Start of sequence
          </div>

          <button onClick={() => { setAddAfter(null); setShowAddRoot(true); }}
            className="my-1 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ background:"transparent", border:"2px solid #e8836a", color:"#e8836a" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#e8836a"; (e.currentTarget as HTMLElement).style.color="#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="#e8836a"; }}>
            <Plus size={14}/>
          </button>

          {rootSequence.map((sid, i) => renderStep(sid, i))}

          {rootSequence.length === 0 && (
            <div className="mt-8 flex flex-col items-center gap-3" style={{ color:"#bbb" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background:"#fff", border:"2px dashed #e5e5e5" }}>
                <Plus size={24}/>
              </div>
              <p className="text-sm font-medium">Click + to add your first step</p>
            </div>
          )}

          {rootSequence.length > 0 && (
            <div className="flex flex-col items-center mt-2">
              <div className="w-px" style={{ height:20, background:"#e5e5e5" }}/>
              <button onClick={() => { setAddAfter(null); setShowAddRoot(true); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background:"transparent", border:"1px dashed #e8836a", color:"#e8836a" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#fef3f0"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}>
                <Plus size={13}/> Add a new step
              </button>
              <p className="text-xs mt-3" style={{ color:"#bbb" }}>End of sequence</p>
            </div>
          )}
        </div>
      </main>

      <AnimatePresence>
        {(showAddRoot || addAfter !== null) && (
          <AddStepModal
            onSelect={handleSelectStep}
            onClose={() => { setShowAddRoot(false); setAddAfter(null); }}/>
        )}
        {editingStep && flowSteps[editingStep] && (
          <MessageModal
            step={flowSteps[editingStep]}
            onSave={handleSaveMessage}
            onClose={() => setEditingStep(null)}/>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditCampaignPage;