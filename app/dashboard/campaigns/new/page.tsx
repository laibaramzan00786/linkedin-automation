
'use client';
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, X, Trash2, Link as LinkIcon, Plus, ArrowRight,
  Clock, Zap, MousePointer2, MessageSquare, Users, ThumbsUp,
  Award, ChevronDown, Check, Info, GitBranch, Eye,
  FileText, ChevronLeft, ChevronRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type WizardStep   = "audience" | "sequence" | "review" | "finalize";
type AudienceMode = "url" | "csv";

// Wizard step types (what user picks from sidebar)
type WizardStepType =
  | "Connection request" | "Follow-up Message" | "LinkedIn Profile Visit"
  | "Like a post" | "Endorse a skill" | "If connected";

// Flow step types (saved to DB)
type FlowStepType =
  | "View profile" | "Connection request" | "Message"
  | "Like post" | "Endorse skills" | "If connected";

interface FlowStep {
  id: string;
  type: FlowStepType;
  delay: number;
  delayUnit: "day" | "days";
  immediate: boolean;
  content?: string;
  withdrawAfter?: number;
  isCondition?: boolean;
  yesChildren?: string[];
  noChildren?: string[];
}

// ─── Config ───────────────────────────────────────────────────────────────────
const FLOW_CFG: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "View profile":       { color: "#3b82f6", bg: "#eff6ff",  icon: Eye          },
  "Connection request": { color: "#e8836a", bg: "#fef3f0",  icon: Users        },
  "Message":            { color: "#6366f1", bg: "#eef2ff",  icon: MessageSquare},
  "Like post":          { color: "#10b981", bg: "#ecfdf5",  icon: ThumbsUp     },
  "Endorse skills":     { color: "#f59e0b", bg: "#fffbeb",  icon: Award        },
  "If connected":       { color: "#e8836a", bg: "#e8836a",  icon: GitBranch    },
};

const WIZARD_TO_FLOW: Record<WizardStepType, FlowStepType> = {
  "Connection request":    "Connection request",
  "Follow-up Message":     "Message",
  "LinkedIn Profile Visit":"View profile",
  "Like a post":           "Like post",
  "Endorse a skill":       "Endorse skills",
  "If connected":          "If connected",
};

const SIDEBAR_STEPS: { type: WizardStepType; desc: string; icon: React.ElementType; color: string; bg: string }[] = [
  { type: "Connection request",     desc: "Send personalized invite",  icon: Users,         color: "#e8836a", bg: "#fef3f0" },
  { type: "Follow-up Message",      desc: "Nurture with a message",    icon: MessageSquare, color: "#6366f1", bg: "#eef2ff" },
  { type: "LinkedIn Profile Visit", desc: "Show interest by visiting", icon: MousePointer2, color: "#3b82f6", bg: "#eff6ff" },
  { type: "Like a post",            desc: "Engage with latest post",   icon: ThumbsUp,      color: "#10b981", bg: "#ecfdf5" },
  { type: "Endorse a skill",        desc: "Validate their expertise",  icon: Award,         color: "#f59e0b", bg: "#fffbeb" },
];

const CONDITION_STEPS: { type: WizardStepType; desc: string; icon: React.ElementType }[] = [
  { type: "If connected", desc: "Branch based on connection", icon: GitBranch },
];

const CONTACT_VARS = ["{first_name}", "{last_name}", "{job_title}", "{company_name}"];
const SENDER_VARS  = ["{my_first_name}", "{my_last_name}", "{my_job_title}", "{my_company_name}"];
const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "audience", label: "Audience" },
  { id: "sequence", label: "Sequence" },
  { id: "review",   label: "Review"   },
  { id: "finalize", label: "Launch"   },
];

// ─── Step Card (same as edit campaign) ───────────────────────────────────────
const StepCard = ({ step, index, onEdit, onAddAfter, onDelete, onDelayChange }: {
  step: FlowStep; index: number;
  onEdit: (id: string) => void;
  onAddAfter: (id: string) => void;
  onDelete: (id: string) => void;
  onDelayChange: (id: string, delay: number) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const cfg    = FLOW_CFG[step.type] ?? FLOW_CFG["View profile"];
  const Icon   = cfg.icon;
  const isCond = step.isCondition;
  const canEdit = step.type === "Message" || step.type === "Connection request";

  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth: 320 }}>
      {/* Delay badge */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-2 text-xs font-medium"
        style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#888" }}>
        <Clock size={12}/>
        {step.immediate ? (
          <span>Immediately</span>
        ) : (
          <>
            Wait for
            <input
              type="number" min={1} max={30} value={step.delay}
              onChange={e => onDelayChange(step.id, Math.max(1, parseInt(e.target.value) || 1))}
              onClick={e => e.stopPropagation()}
              className="w-7 text-center bg-transparent focus:outline-none font-bold mx-1"
              style={{ color: "#e8836a" }}
            />
            {step.delayUnit}
          </>
        )}
        <ChevronDown size={11}/>
      </div>

      {/* Card */}
      <div
        onClick={() => canEdit && onEdit(step.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full rounded-xl transition-all relative"
        style={{
          background:  isCond ? "#e8836a" : "#fff",
          border:      isCond ? "none" : "1px solid #e5e5e5",
          boxShadow:   hovered ? "0 4px 16px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.06)",
          color:       isCond ? "#fff" : "#333",
          cursor:      canEdit ? "pointer" : "default",
          padding:     "12px 16px",
        }}
      >
        {/* Delete button */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.7 }} transition={{ duration:0.12 }}
              onClick={e => { e.stopPropagation(); onDelete(step.id); }}
              style={{
                position:"absolute", top:-10, right:-10,
                width:24, height:24, borderRadius:"50%",
                background:"#ef4444", color:"#fff", border:"2px solid #fff",
                display:"flex", alignItems:"center", justifyContent:"center",
                cursor:"pointer", zIndex:10, boxShadow:"0 2px 6px rgba(239,68,68,0.4)",
              }}>
              <Trash2 size={11}/>
            </motion.button>
          )}
        </AnimatePresence>

        <p className="text-[10px] font-semibold mb-1.5"
          style={{ color: isCond ? "rgba(255,255,255,0.75)" : "#aaa" }}>
          Step {index + 1}
        </p>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: isCond ? "rgba(255,255,255,0.2)" : cfg.bg, color: isCond ? "#fff" : cfg.color }}>
            <Icon size={14}/>
          </div>
          <span className="text-sm font-semibold">{step.type}</span>
        </div>
        {step.content && (
          <p className="text-xs mt-2 line-clamp-2 leading-relaxed"
            style={{ color: isCond ? "rgba(255,255,255,0.7)" : "#aaa" }}>
            {step.content}
          </p>
        )}
      </div>

      {/* Add after */}
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

// ─── Branch Column ────────────────────────────────────────────────────────────
const BranchColumn = ({ label, children, onAddStep, isEmpty }: {
  label:"Yes"|"No"; children:React.ReactNode; onAddStep:()=>void; isEmpty:boolean;
}) => (
  <div className="flex flex-col items-center" style={{ minWidth: 240 }}>
    <div className="flex items-center gap-2 mb-3">
      <div className="h-px w-8" style={{ background: label==="Yes" ? "#e8836a" : "#e5e5e5" }}/>
      <span className="text-xs font-bold px-3 py-1 rounded-full"
        style={{
          background: label==="Yes" ? "#fef3f0" : "#f5f5f5",
          color:      label==="Yes" ? "#e8836a"  : "#888",
          border: "1px solid " + (label==="Yes" ? "#f5c5b5" : "#e5e5e5"),
        }}>
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
      <Plus size={13}/> Add step
    </button>
    {isEmpty && <p className="text-xs mt-2" style={{ color:"#bbb" }}>End of sequence</p>}
  </div>
);

// ─── Message Modal ────────────────────────────────────────────────────────────
const MessageModal = ({ step, onSave, onClose }: {
  step: FlowStep;
  onSave: (id: string, content: string, withdrawAfter?: number) => void;
  onClose: () => void;
}) => {
  const [content,         setContent]         = useState(step.content || "");
  const [withdrawAfter,   setWithdrawAfter]   = useState(step.withdrawAfter ?? 14);
  const [withdrawEnabled, setWithdrawEnabled] = useState(true);
  const isConn   = step.type === "Connection request";
  const maxChars = isConn ? 250 : 9999;
  const remaining = isConn ? maxChars - content.length : null;

  return (
    <div className="fixed inset-0 z-[300]" style={{ background:"rgba(0,0,0,0.2)" }} onClick={onClose}>
      <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:40 }}
        onClick={e => e.stopPropagation()}
        className="absolute top-0 right-0 h-full overflow-y-auto flex flex-col"
        style={{ width:"min(720px,100vw)", background:"#fff", borderLeft:"1px solid #e5e5e5" }}>

        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor:"#f0f0f0" }}>
          <h2 className="text-base font-bold" style={{ color:"#111" }}>
            {isConn ? "Connection message" : "Message"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color:"#888" }}>
            <X size={18}/>
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          {[
            { label:"Contact variables:", vars: CONTACT_VARS },
            { label:"Sender variables:",  vars: SENDER_VARS  },
          ].map(row => (
            <div key={row.label} className="flex flex-wrap items-start gap-3">
              <span className="text-xs font-semibold pt-1 shrink-0 w-full sm:w-36" style={{ color:"#888" }}>{row.label}</span>
              <div className="flex flex-wrap gap-2">
                {row.vars.map(v => (
                  <button key={v} onClick={() => setContent(p => p + v)}
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
                  {remaining}/{maxChars}
                </span>
              )}
            </div>
          </div>

          {content && (
            <div className="rounded-xl px-5 py-4" style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color:"#aaa" }}>Preview</p>
              <p className="text-sm" style={{ color:"#333", lineHeight:1.7 }}
                dangerouslySetInnerHTML={{ __html: content.replace(/\{[^}]+\}/g, m =>
                  `<mark style="background:#dbeafe;color:#2563eb;border-radius:3px;padding:0 2px">${m}</mark>`) }}/>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
              style={{ background:"#fef3f0", border:"1px solid #f5c5b5", color:"#e8836a" }}>
              <FileText size={13}/> Use template
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color:"#aaa" }}>Cycle contacts</span>
              {[ChevronLeft, ChevronRight].map((Icon, i) => (
                <button key={i} className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background:"#f5f5f5", color:"#888" }}>
                  <Icon size={14}/>
                </button>
              ))}
            </div>
          </div>

          {isConn && (
            <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl"
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
              <span className="text-xs" style={{ color:"#555" }}>days</span>
              <span className="text-xs ml-auto" style={{ color:"#aaa" }}>Min 7 · Max 21</span>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t" style={{ borderColor:"#f0f0f0" }}>
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

// ─── Main Page ────────────────────────────────────────────────────────────────
const NewCampaignPage = () => {
  const router = useRouter();
  const [wizardStep,   setWizardStep]   = useState<WizardStep>("audience");
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("url");

  // User state
  const [currentUserName,  setCurrentUserName]  = useState("User");
  const [currentUserEmail, setCurrentUserEmail] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("current_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        const fullName = [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email?.split("@")[0] || "User";
        setCurrentUserName(fullName);
        setCurrentUserEmail(u.email ?? "");
        return;
      } catch {}
    }
    const name  = localStorage.getItem("user_name")  || "User";
    const email = localStorage.getItem("user_email") || "";
    setCurrentUserName(name);
    setCurrentUserEmail(email);
  }, []);

  // Audience
  const [searchUrl,    setSearchUrl]    = useState("");
  const [maxLeads,     setMaxLeads]     = useState(500);
  const [campaignName, setCampaignName] = useState("");
  const [options, setOptions] = useState({
    excludeNoPhoto: true, excludeFirstDegree: true,
    premiumOnly: false,   openProfiles: false,
  });

  // Flow builder state (same as edit campaign)
  const [flowSteps,    setFlowSteps]    = useState<Record<string, FlowStep>>({
    step1: {
      id: "step1", type: "Connection request", delay: 0, delayUnit: "day",
      immediate: true, content: "Hi {first_name}, I'd love to connect and learn more about your work at {company_name}!",
    },
  });
  const [rootSequence, setRootSequence] = useState<string[]>(["step1"]);

  // Modal state
  const [editingStep, setEditingStep] = useState<string | null>(null);
  const [addAfter,    setAddAfter]    = useState<{ id: string; branch?: "yes"|"no" } | null>(null);
  const [showAddRoot, setShowAddRoot] = useState(false);
  const [showAddPanel,setShowAddPanel]= useState(false);

  const orderList: WizardStep[] = ["audience","sequence","review","finalize"];
  const currentIdx = orderList.indexOf(wizardStep);

  const canContinue = () => {
    if (wizardStep === "audience")  return searchUrl.trim().length > 0;
    if (wizardStep === "sequence")  return rootSequence.length > 0;
    if (wizardStep === "review")    return true;
    if (wizardStep === "finalize")  return campaignName.trim().length > 0;
    return false;
  };

  const handleNext = () => {
    if (wizardStep === "audience")      setWizardStep("sequence");
    else if (wizardStep === "sequence") setWizardStep("review");
    else if (wizardStep === "review")   setWizardStep("finalize");
    else handleLaunch();
  };

  // ─── Flow builder handlers ─────────────────────────────────────────────────
  const makeStep = (wizType: WizardStepType): FlowStep => {
    const flowType = WIZARD_TO_FLOW[wizType];
    const sid = "s" + Math.random().toString(36).substring(2, 8);
    return {
      id: sid, type: flowType,
      delay: 1, delayUnit: "day", immediate: false,
      content: (flowType === "Connection request" || flowType === "Message") ? "" : undefined,
      isCondition: flowType === "If connected",
      yesChildren: flowType === "If connected" ? [] : undefined,
      noChildren:  flowType === "If connected" ? [] : undefined,
    };
  };

  const handleSelectStep = (wizType: WizardStepType) => {
    const newStep = makeStep(wizType);
    setFlowSteps(prev => ({ ...prev, [newStep.id]: newStep }));

    if (showAddRoot || (!addAfter)) {
      setRootSequence(prev => [...prev, newStep.id]);
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
    }

    setShowAddRoot(false);
    setAddAfter(null);
    setShowAddPanel(false);

    if (newStep.type === "Connection request" || newStep.type === "Message") {
      setEditingStep(newStep.id);
    }
  };

  const openAddPanel = (afterId?: string, branch?: "yes"|"no") => {
    if (afterId) setAddAfter({ id: afterId, branch });
    else { setAddAfter(null); setShowAddRoot(true); }
    setShowAddPanel(true);
  };

  const handleDeleteStep = (sid: string) => {
    setRootSequence(prev => prev.filter(id => id !== sid));
    setFlowSteps(prev => {
      const copy = { ...prev };
      Object.keys(copy).forEach(key => {
        if (copy[key].yesChildren) copy[key] = { ...copy[key], yesChildren: copy[key].yesChildren!.filter(id => id !== sid) };
        if (copy[key].noChildren)  copy[key] = { ...copy[key], noChildren:  copy[key].noChildren!.filter(id => id !== sid) };
      });
      delete copy[sid];
      return copy;
    });
  };

  const handleSaveMessage = (sid: string, content: string, withdrawAfter?: number) => {
    setFlowSteps(prev => ({ ...prev, [sid]: { ...prev[sid], content, withdrawAfter } }));
    setEditingStep(null);
  };

  const handleDelayChange = (sid: string, delay: number) => {
    setFlowSteps(prev => ({ ...prev, [sid]: { ...prev[sid], delay, immediate: delay === 0, delayUnit: delay === 1 ? "day" : "days" } }));
  };

  // ─── Launch ────────────────────────────────────────────────────────────────
  const handleLaunch = () => {
    if (!campaignName) return;
    const newCampaign = {
      id:        Math.random().toString(36).substring(7),
      name:      campaignName,
      status:    "Active",
      createdAt: new Date().toLocaleDateString("en-GB", { day:"numeric", month:"short" }),
      leads:     maxLeads,
      connections: 0, accepted: 0, visits: 0, likes: 0, endorse: 0,
      messages: rootSequence.filter(sid => flowSteps[sid]?.type === "Message" || flowSteps[sid]?.type === "Connection request").length,
      replied: 0,
      searchUrl,
      linkedinAccount: currentUserName,
      linkedinEmail:   currentUserEmail,
      flowSteps,
      flowRoot: rootSequence,
    };
    const existing = JSON.parse(localStorage.getItem("custom_campaigns") || "[]");
    localStorage.setItem("custom_campaigns", JSON.stringify([newCampaign, ...existing]));
    router.push("/dashboard/campaigns");
  };

  // ─── Render flow step ──────────────────────────────────────────────────────
  const renderStep = (sid: string, index: number): React.ReactNode => {
    const step = flowSteps[sid];
    if (!step) return null;

    if (step.isCondition) {
      const yesList = step.yesChildren ?? [];
      const noList  = step.noChildren  ?? [];
      return (
        <div key={sid} className="flex flex-col items-center w-full">
          <div className="w-px" style={{ height:24, background:"#e8836a" }}/>
          <StepCard step={step} index={index}
            onEdit={setEditingStep}
            onAddAfter={aid => openAddPanel(aid)}
            onDelete={handleDeleteStep}
            onDelayChange={handleDelayChange}/>
          <div className="flex flex-col md:flex-row gap-6 mt-4 items-start w-full justify-center">
            <BranchColumn label="Yes" isEmpty={yesList.length===0}
              onAddStep={() => openAddPanel(sid, "yes")}>
              {yesList.map((cid,ci) => (
                <div key={cid} className="flex flex-col items-center">
                  {ci > 0 && <div className="w-px" style={{ height:16, background:"#e5e5e5" }}/>}
                  <StepCard step={flowSteps[cid]} index={index+ci+1}
                    onEdit={setEditingStep}
                    onAddAfter={() => openAddPanel(sid, "yes")}
                    onDelete={handleDeleteStep}
                    onDelayChange={handleDelayChange}/>
                </div>
              ))}
            </BranchColumn>
            <BranchColumn label="No" isEmpty={noList.length===0}
              onAddStep={() => openAddPanel(sid, "no")}>
              {noList.map((cid,ci) => (
                <div key={cid} className="flex flex-col items-center">
                  {ci > 0 && <div className="w-px" style={{ height:16, background:"#e5e5e5" }}/>}
                  <StepCard step={flowSteps[cid]} index={index+ci+1}
                    onEdit={setEditingStep}
                    onAddAfter={() => openAddPanel(sid, "no")}
                    onDelete={handleDeleteStep}
                    onDelayChange={handleDelayChange}/>
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
        <StepCard step={step} index={index}
          onEdit={setEditingStep}
          onAddAfter={aid => openAddPanel(aid)}
          onDelete={handleDeleteStep}
          onDelayChange={handleDelayChange}/>
      </div>
    );
  };

  // ─── Sequence step summary ─────────────────────────────────────────────────
  const stepCount    = rootSequence.length;
  const duration     = rootSequence.reduce((s,sid) => s + (flowSteps[sid]?.delay ?? 0), 0);
  const messageCount = rootSequence.filter(sid => flowSteps[sid]?.type === "Message" || flowSteps[sid]?.type === "Connection request").length;

  return (
    <div className="flex flex-col h-screen overflow-hidden"
      style={{ background:"#f0f0f0", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="shrink-0 flex items-center justify-between px-4 md:px-6 border-b"
        style={{ height:56, background:"#fff", borderColor:"#e5e5e5" }}>

        {/* Left: close + name */}
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => router.push("/dashboard/campaigns")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 shrink-0"
            style={{ color:"#888" }}>
            <X size={18}/>
          </button>
          <div className="w-px h-5 shrink-0" style={{ background:"#e5e5e5" }}/>
          <span className="text-sm font-semibold truncate" style={{ color:"#333" }}>
            {campaignName || "New Campaign"}
          </span>
        </div>

        {/* Center: step pills */}
        <div className="hidden md:flex items-center gap-1">
          {WIZARD_STEPS.map((s, i) => {
            const status = wizardStep === s.id ? "active" : currentIdx > i ? "done" : "pending";
            return (
              <button key={s.id}
                onClick={() => { if (status === "done") setWizardStep(s.id); }}
                disabled={status === "pending"}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: status==="active" ? "#fef3f0" : status==="done" ? "#f5f5f5" : "transparent",
                  color:      status==="active" ? "#e8836a" : status==="done" ? "#888"    : "#bbb",
                  border:     status==="active" ? "1px solid #f5c5b5" : "1px solid transparent",
                  cursor:     status==="pending" ? "default" : "pointer",
                }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    background: status==="active" ? "#e8836a" : status==="done" ? "#10b981" : "#e5e5e5",
                    color: "#fff",
                  }}>
                  {status === "done" ? <Check size={10} strokeWidth={3}/> : i+1}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Right: back + continue */}
        <div className="flex items-center gap-2">
          {wizardStep !== "audience" && (
            <button onClick={() => setWizardStep(orderList[currentIdx-1])}
              className="h-9 px-4 rounded-full text-xs font-semibold hidden sm:block"
              style={{ background:"#f5f5f5", color:"#555", border:"1px solid #e5e5e5" }}>
              Back
            </button>
          )}
          <button onClick={handleNext} disabled={!canContinue()}
            className="h-9 px-5 rounded-full text-xs font-bold flex items-center gap-2 transition-all"
            style={{
              background: canContinue() ? "#e8836a" : "#f5d5cc",
              color:"#fff", cursor: canContinue() ? "pointer" : "not-allowed",
            }}>
            {wizardStep === "finalize" ? "Launch Campaign" : "Continue"}
            <ArrowRight size={14}/>
          </button>
        </div>
      </header>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-hidden flex">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: AUDIENCE ── */}
          {wizardStep === "audience" && (
            <motion.div key="audience"
              initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
              transition={{ duration:0.22 }} className="flex-1 overflow-y-auto" style={{ background:"#f0f0f0" }}>
              <div className="max-w-3xl mx-auto px-4 md:px-6 py-8 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:"#e8836a" }}>Step 1 of 4</p>
                  <h2 className="text-xl font-bold" style={{ color:"#111" }}>Set up your audience</h2>
                  <p className="text-sm mt-1" style={{ color:"#888" }}>Define who you want to reach.</p>
                </div>

                {/* LinkedIn Account */}
                <div className="rounded-2xl p-5 space-y-3" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
                  <h3 className="text-sm font-semibold" style={{ color:"#333" }}>LinkedIn Account</h3>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ background:"#e8836a" }}>
                        {currentUserName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold" style={{ color:"#333" }}>{currentUserName}</p>
                        {currentUserEmail && <p className="text-[11px]" style={{ color:"#aaa" }}>{currentUserEmail}</p>}
                      </div>
                    </div>
                    <ChevronDown size={16} style={{ color:"#888" }}/>
                  </div>
                </div>

                {/* Search URL */}
                <div className="rounded-2xl p-5 space-y-4" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color:"#333" }}>LinkedIn Search URL</h3>
                      <p className="text-xs mt-0.5" style={{ color:"#888" }}>Paste a LinkedIn People Search or Sales Navigator URL</p>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold"
                      style={{ background:"#fef3f0", color:"#e8836a" }}>
                      <Info size={11}/> Required
                    </div>
                  </div>
                  <div className="relative">
                    <LinkIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color:"#bbb" }}/>
                    <input value={searchUrl} onChange={e => setSearchUrl(e.target.value)}
                      placeholder="https://www.linkedin.com/search/results/people/..."
                      className="w-full h-11 pl-10 pr-4 rounded-xl text-sm font-medium focus:outline-none transition-all"
                      style={{ background:"#f8f8f8", border: searchUrl ? "1px solid #e8836a" : "1px solid #e5e5e5", color:"#333" }}/>
                  </div>
                  {searchUrl && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                      style={{ background:"#ecfdf5", color:"#10b981" }}>
                      <CheckCircle2 size={13}/> URL looks valid
                    </div>
                  )}
                </div>

                {/* Volume */}
                <div className="rounded-2xl p-5 space-y-4" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold" style={{ color:"#333" }}>Max Prospects</h3>
                      <p className="text-xs" style={{ color:"#888" }}>How many leads to extract</p>
                    </div>
                    <span className="text-xl font-bold tabular-nums" style={{ color:"#e8836a" }}>{maxLeads}</span>
                  </div>
                     <input 
  type="range"
  min="10"
  max="1000"
  step="10"
  value={maxLeads}
  onChange={e => setMaxLeads(parseInt(e.target.value))}
  className="custom-range w-full"
/>
                  <div className="flex justify-between text-[11px] font-medium" style={{ color:"#bbb" }}>
                    <span>10</span><span>1,000</span>
                  </div>
                </div>

                {/* Filters */}
                <div className="rounded-2xl p-5 space-y-3" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
                  <h3 className="text-sm font-semibold mb-1" style={{ color:"#333" }}>Filters</h3>
                  {[
                    { id:"excludeNoPhoto",     label:"Profiles with photos only",   sub:"Skip profiles without a photo"     },
                    { id:"excludeFirstDegree", label:"Skip 1st degree connections", sub:"Only target non-connected people"  },
                    { id:"premiumOnly",        label:"LinkedIn Premium only",        sub:"Target only premium members"       },
                    { id:"openProfiles",       label:"Open profiles only",           sub:"Message without connection request"},
                  ].map(opt => {
                    const val = options[opt.id as keyof typeof options];
                    return (
                      <div key={opt.id}
                        className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all"
                        style={{ background: val ? "#fef3f0" : "#f8f8f8", border: val ? "1px solid #f5c5b5" : "1px solid #e5e5e5" }}
                        onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}>
                        <div>
                          <p className="text-xs font-semibold" style={{ color: val ? "#e8836a" : "#555" }}>{opt.label}</p>
                          <p className="text-[11px] mt-0.5" style={{ color:"#aaa" }}>{opt.sub}</p>
                        </div>
                        <div className="w-10 h-6 rounded-full relative shrink-0 transition-all duration-300"
                          style={{ background: val ? "#e8836a" : "#ddd" }}>
                          <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                            style={{ left: val ? 22 : 4 }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 2: SEQUENCE (flow builder) ── */}
          {wizardStep === "sequence" && (
            <motion.div key="sequence"
              initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
              transition={{ duration:0.22 }} className="flex-1 overflow-hidden flex">

              {/* Left sidebar — step palette */}
             

              {/* Right — FLOW CANVAS (same as edit campaign) */}
              <div className="flex-1 overflow-auto relative"
                style={{
                  backgroundColor:"#f5f5f5",
                  backgroundImage:"radial-gradient(circle, #c8c8c8 1px, transparent 1px)",
                  backgroundSize:"22px 22px",
                }}>
                <div className="flex flex-col items-center py-8 px-4 min-h-full">

                  <div className="px-5 py-2 rounded-full text-xs font-semibold mb-2"
                    style={{ background:"#fff", border:"1px solid #e5e5e5", color:"#888" }}>
                    ▶ Workflow Start
                  </div>

                  <button onClick={() => openAddPanel()}
                    className="my-1 w-7 h-7 rounded-full flex items-center justify-center transition-all"
                    style={{ background:"transparent", border:"2px solid #e8836a", color:"#e8836a" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#e8836a"; (e.currentTarget as HTMLElement).style.color="#fff"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; (e.currentTarget as HTMLElement).style.color="#e8836a"; }}>
                    <Plus size={14}/>
                  </button>

                  {rootSequence.length === 0 && (
                    <div className="mt-8 flex flex-col items-center gap-3 text-center" style={{ color:"#bbb" }}>
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background:"#fff", border:"2px dashed #e5e5e5" }}>
                        <Plus size={24}/>
                      </div>
                      <p className="text-sm font-medium">Click to add your first step</p>
                    </div>
                  )}

                  {rootSequence.map((sid, i) => renderStep(sid, i))}

                  {rootSequence.length > 0 && (
                    <div className="flex flex-col items-center mt-2">
                      <div className="w-px" style={{ height:20, background:"#e5e5e5" }}/>
                      <button onClick={() => openAddPanel()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all"
                        style={{ background:"transparent", border:"1px dashed #e8836a", color:"#e8836a" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="#fef3f0"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="transparent"; }}>
                        <Plus size={13}/> Add next step
                      </button>
                      <p className="text-xs mt-3" style={{ color:"#bbb" }}>End of sequence</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: REVIEW ── */}
          {wizardStep === "review" && (
            <motion.div key="review"
              initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
              transition={{ duration:0.22 }} className="flex-1 overflow-y-auto" style={{ background:"#f0f0f0" }}>
              <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:"#e8836a" }}>Step 3 of 4</p>
                  <h2 className="text-xl font-bold" style={{ color:"#111" }}>Review your campaign</h2>
                  <p className="text-sm mt-1" style={{ color:"#888" }}>Everything looks good? Continue to launch.</p>
                </div>

                <div className="rounded-2xl p-5 space-y-3" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
                  <h3 className="text-sm font-semibold" style={{ color:"#333" }}>Audience</h3>
                  {[
                    { label:"LinkedIn account", value: currentUserName },
                    { label:"Max prospects",    value: maxLeads.toString() },
                    { label:"Search URL",       value: searchUrl || "—" },
                    { label:"Active filters",   value: Object.values(options).filter(Boolean).length + " enabled" },
                  ].map(row => (
                    <div key={row.label} className="flex justify-between text-sm">
                      <span style={{ color:"#888" }}>{row.label}</span>
                      <span className="font-medium max-w-[220px] truncate" style={{ color:"#333" }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-5 space-y-4" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold" style={{ color:"#333" }}>Sequence ({stepCount} steps)</h3>
                    <button onClick={() => setWizardStep("sequence")} className="text-xs font-semibold" style={{ color:"#e8836a" }}>Edit</button>
                  </div>
                  <div className="space-y-3">
                    {rootSequence.map((sid, idx) => {
                      const step = flowSteps[sid]; if (!step) return null;
                      const cfg  = FLOW_CFG[step.type] ?? FLOW_CFG["View profile"];
                      const Icon = cfg.icon;
                      return (
                        <div key={sid} className="flex items-start gap-3 p-3 rounded-xl"
                          style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}>
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: step.isCondition ? "#fef3f0" : cfg.bg, color: step.isCondition ? "#e8836a" : cfg.color }}>
                            <Icon size={14}/>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold" style={{ color:"#222" }}>{step.type}</p>
                            {step.content && <p className="text-xs mt-0.5 line-clamp-1" style={{ color:"#aaa" }}>{step.content}</p>}
                            {!step.immediate && <p className="text-[11px] mt-1" style={{ color:"#e8836a" }}>+{step.delay} day{step.delay !== 1 ? "s" : ""} delay</p>}
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                            style={{ background:"#f0f0f0", color:"#888" }}>Step {idx+1}</span>
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl self-start"
                      style={{ background:"#ecfdf5", border:"1px solid #a7f3d0", color:"#10b981" }}>
                      <CheckCircle2 size={13}/> <span className="text-xs font-semibold">End of sequence</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── STEP 4: LAUNCH ── */}
          {wizardStep === "finalize" && (
            <motion.div key="finalize"
              initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-24 }}
              transition={{ duration:0.22 }} className="flex-1 overflow-y-auto" style={{ background:"#f0f0f0" }}>
              <div className="max-w-xl mx-auto px-4 md:px-6 py-8 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color:"#10b981" }}>Step 4 of 4</p>
                  <h2 className="text-xl font-bold" style={{ color:"#111" }}>Name & launch</h2>
                  <p className="text-sm mt-1" style={{ color:"#888" }}>Give your campaign a name and you're ready to go.</p>
                </div>

                <div className="rounded-2xl p-5 space-y-3" style={{ background:"#fff", border:"1px solid #e5e5e5" }}>
                  <label className="text-sm font-semibold block" style={{ color:"#333" }}>
                    Campaign Name <span style={{ color:"#e8836a" }}>*</span>
                  </label>
                  <input value={campaignName} onChange={e => setCampaignName(e.target.value)}
                    placeholder="e.g. Recruiters Q2, SaaS Founders Outreach..."
                    className="w-full h-11 px-4 rounded-xl text-sm font-medium focus:outline-none transition-all"
                    style={{ background:"#f8f8f8", border: campaignName ? "1px solid #e8836a" : "1px solid #e5e5e5", color:"#333" }}
                    onFocus={e => { e.target.style.background="#fff"; }}
                    onBlur={e  => { e.target.style.background="#f8f8f8"; }}/>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label:"Prospects", value: maxLeads.toLocaleString(), color:"#e8836a", bg:"#fef3f0" },
                    { label:"Steps",     value: stepCount,                 color:"#6366f1", bg:"#eef2ff" },
                    { label:"Duration",  value: duration + "d",            color:"#10b981", bg:"#ecfdf5" },
                  ].map(c => (
                    <div key={c.label} className="rounded-2xl p-4 text-center"
                      style={{ background:c.bg, border:`1px solid ${c.color}22` }}>
                      <p className="text-xl font-bold" style={{ color:c.color }}>{c.value}</p>
                      <p className="text-xs font-medium mt-1" style={{ color:"#888" }}>{c.label}</p>
                    </div>
                  ))}
                </div>

                <button onClick={handleLaunch} disabled={!campaignName.trim()}
                  className="w-full h-13 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-white transition-all"
                  style={{
                    height:52,
                    background: campaignName.trim() ? "#e8836a" : "#f5d5cc",
                    cursor: campaignName.trim() ? "pointer" : "not-allowed",
                    boxShadow: campaignName.trim() ? "0 8px 24px rgba(232,131,106,0.3)" : "none",
                  }}>
                  <Zap size={17}/> Launch Campaign
                </button>
                <p className="text-center text-xs" style={{ color:"#bbb" }}>Your campaign will start running immediately.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── MODALS ── */}
      <AnimatePresence>
        {showAddPanel && (
          <div className="fixed inset-0 z-[200] flex items-start justify-end"
            style={{ background:"rgba(0,0,0,0.18)" }}
            onClick={() => { setShowAddPanel(false); setAddAfter(null); setShowAddRoot(false); }}>
            <motion.div initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:40 }}
              onClick={e => e.stopPropagation()}
              style={{ width:"min(460px,100vw)", height:"100%", overflowY:"auto", background:"#fff", borderLeft:"1px solid #e5e5e5" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor:"#f0f0f0" }}>
                <h2 className="text-base font-bold" style={{ color:"#111" }}>Select a new step</h2>
                <button onClick={() => { setShowAddPanel(false); setAddAfter(null); setShowAddRoot(false); }}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color:"#888" }}>
                  <X size={18}/>
                </button>
              </div>
              <div className="px-5 py-5 space-y-6">
                <div>
                  <h3 className="text-sm font-bold mb-3" style={{ color:"#111" }}>Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs font-semibold mb-2" style={{ color:"#aaa" }}>LinkedIn</p>
                      <div className="space-y-2">
                        {SIDEBAR_STEPS.map(tmpl => {
                          const Icon = tmpl.icon;
                          return (
                            <button key={tmpl.type} onClick={() => handleSelectStep(tmpl.type)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                              style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#e8836a"; (e.currentTarget as HTMLElement).style.background="#fef3f0"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#e5e5e5"; (e.currentTarget as HTMLElement).style.background="#f8f8f8"; }}>
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background:tmpl.bg, color:tmpl.color }}>
                                <Icon size={15}/>
                              </div>
                              <span className="text-xs font-medium" style={{ color:"#333" }}>{tmpl.type}</span>
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
                        {CONDITION_STEPS.map(cond => {
                          const Icon = cond.icon;
                          return (
                            <button key={cond.type} onClick={() => handleSelectStep(cond.type)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                              style={{ background:"#f8f8f8", border:"1px solid #e5e5e5" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="#e8836a"; (e.currentTarget as HTMLElement).style.background="#fef3f0"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="#e5e5e5"; (e.currentTarget as HTMLElement).style.background="#f8f8f8"; }}>
                              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background:"#fef3f0", color:"#e8836a" }}>
                                <Icon size={15}/>
                              </div>
                              <div>
                                <span className="text-xs font-medium block" style={{ color:"#333" }}>{cond.type}</span>
                                <span className="text-[10px]" style={{ color:"#aaa" }}>{cond.desc}</span>
                              </div>
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
        )}

        {editingStep && flowSteps[editingStep] && (
          <MessageModal
            step={flowSteps[editingStep]}
            onSave={handleSaveMessage}
            onClose={() => setEditingStep(null)}/>
        )}
      </AnimatePresence>

      {/* Mobile bottom bar */}
      <div className="md:hidden shrink-0 flex items-center justify-between px-4 py-3 border-t"
        style={{ background:"#fff", borderColor:"#e5e5e5" }}>
        <div className="flex gap-1">
          {WIZARD_STEPS.map((_,i) => (
            <div key={i} className="w-2 h-2 rounded-full"
              style={{ background: currentIdx===i ? "#e8836a" : currentIdx>i ? "#10b981" : "#e5e5e5" }}/>
          ))}
        </div>
        <button onClick={handleNext} disabled={!canContinue()}
          className="h-9 px-5 rounded-full text-xs font-bold flex items-center gap-2 text-white"
          style={{ background: canContinue() ? "#e8836a" : "#f5d5cc" }}>
          {wizardStep === "finalize" ? "Launch" : "Continue"} <ArrowRight size={13}/>
        </button>
      </div>
    </div>
  );
};

export default NewCampaignPage;