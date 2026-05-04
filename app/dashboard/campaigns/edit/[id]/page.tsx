
'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Plus, Eye, Users, MessageSquare, ThumbsUp, Award,
  Clock, ChevronDown, Check, GitBranch, Save,
  FileText, Mail, Search, Send, ChevronLeft, ChevronRight,
  Link as LinkIcon, Trash2,
} from "lucide-react";

// Types 
type StepType =
  | "View profile" | "Connection request" | "Message"
  | "Like post"    | "Endorse skills"      | "If connected"

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

const STEP_CONFIG: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  "View profile":       { color: "#3b82f6", bg: "#eff6ff",  icon: Eye },
  "Connection request": { color: "#e8836a", bg: "#fef3f0",  icon: Users },
  "Message":            { color: "#6366f1", bg: "#eef2ff",  icon: MessageSquare },
  "Like post":          { color: "#10b981", bg: "#ecfdf5",  icon: ThumbsUp },
  "Endorse skills":     { color: "#f59e0b", bg: "#fffbeb",  icon: Award },
  "If connected":       { color: "#e8836a", bg: "#e8836a",  icon: GitBranch },

};

const ACTION_LI:   StepType[] = ["Connection request", "Message", "View profile", "Like post", "Endorse skills"];

const COND_LI:     StepType[] = ["If connected"];
const CONTACT_VARS = ["{first_name}", "{last_name}", "{job_title}", "{company_name}"];
const SENDER_VARS  = ["{my_first_name}", "{my_last_name}", "{my_job_title}", "{my_company_name}"];

const StepCard = ({ step, index, onEdit, onAddAfter, onDelete }: {
  step: FlowStep;
  index: number;
  onEdit: (id: string) => void;
  onAddAfter: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const cfg    = STEP_CONFIG[step.type] ?? STEP_CONFIG["View profile"];
  const Icon   = cfg.icon;
  const isCond = step.isCondition;

  return (
    <div className="flex flex-col items-center w-full" style={{ maxWidth: 280 }}>
      {/* Delay badge */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-2 text-xs font-medium cursor-pointer"
        style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#888" }}>
        <Clock size={12} />
        {step.immediate ? "Immediately" : (
          <>Wait for <strong style={{ color: "#333", margin: "0 3px" }}>{step.delay}</strong>{step.delayUnit}</>
        )}
        <ChevronDown size={11} />
      </div>

      {/* Card */}
      <div
        onClick={() => (step.type === "Message" || step.type === "Connection request") && onEdit(step.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full rounded-xl px-4 py-3 transition-all relative"
        style={{
          background:   isCond ? "#e8836a" : "#fff",
          border:       isCond ? "none" : "1px solid #e5e5e5",
          boxShadow:    "0 1px 4px rgba(0,0,0,0.06)",
          color:        isCond ? "#fff" : "#333",
          cursor:       (step.type === "Message" || step.type === "Connection request") ? "pointer" : "default",
        }}
      >
        {/* ✅ Delete button — only visible on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              onClick={e => { e.stopPropagation(); onDelete(step.id); }}
              style={{
                position:   "absolute",
                top:        -10,
                right:      -10,
                width:      24,
                height:     24,
                borderRadius: "50%",
                background: "#ef4444",
                color:      "#fff",
                border:     "2px solid #fff",
                display:    "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor:     "pointer",
                zIndex:     10,
                boxShadow:  "0 2px 6px rgba(239,68,68,0.4)",
              }}
            >
              <Trash2 size={11} />
            </motion.button>
          )}
        </AnimatePresence>

        <p className="text-[10px] font-semibold mb-1" style={{ color: isCond ? "rgba(255,255,255,0.75)" : "#aaa" }}>
          Step {index + 1}
        </p>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: isCond ? "rgba(255,255,255,0.2)" : cfg.bg, color: isCond ? "#fff" : cfg.color }}>
            <Icon size={14} />
          </div>
          <span className="text-sm font-semibold">{step.type}</span>
        </div>
        {step.content && <p className="text-xs mt-1.5 line-clamp-1 opacity-60">{step.content}</p>}
      </div>

      {/* Add after button */}
      {!step.isCondition && (
        <button onClick={() => onAddAfter(step.id)}
          className="mt-2 w-7 h-7 rounded-full flex items-center justify-center transition-all"
          style={{ background: "transparent", border: "2px solid #e8836a", color: "#e8836a" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#e8836a"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#e8836a"; }}>
          <Plus size={14} />
        </button>
      )}
    </div>
  );
};

const AddStepModal = ({ onSelect, onClose }: { onSelect: (t: StepType) => void; onClose: () => void }) => (
  <div className="fixed inset-0 z-[200] flex items-start justify-end"
    style={{ background: "rgba(0,0,0,0.18)" }} onClick={onClose}>
    <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
      onClick={e => e.stopPropagation()}
      style={{ width: "min(460px, 100vw)", height: "100%", overflowY: "auto", background: "#fff", borderLeft: "1px solid #e5e5e5" }}>
      <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#f0f0f0" }}>
        <h2 className="text-base font-bold" style={{ color: "#111" }}>Select a new step</h2>
        <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color: "#888" }}>
          <X size={18} />
        </button>
      </div>
      <div className="px-5 py-5 space-y-6">
        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color: "#111" }}>Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "LinkedIn", types: ACTION_LI, disabled: false },
            ].map(col => (
              <div key={col.title}>
                <p className="text-xs font-semibold mb-2" style={{ color: "#aaa" }}>{col.title}</p>
                <div className="space-y-2">
                  {col.types.map(type => {
                    const c = STEP_CONFIG[type]; const Icon = c.icon;
                    return (
                      <button key={type}
                        onClick={() => !col.disabled && onSelect(type)}
                        disabled={col.disabled}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                        style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", opacity: col.disabled ? 0.4 : 1, cursor: col.disabled ? "not-allowed" : "pointer" }}
                        onMouseEnter={e => { if (!col.disabled) { (e.currentTarget as HTMLElement).style.borderColor = "#e8836a"; (e.currentTarget as HTMLElement).style.background = "#fef3f0"; } }}
                        onMouseLeave={e => { if (!col.disabled) { (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5"; (e.currentTarget as HTMLElement).style.background = "#f8f8f8"; } }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: c.bg, color: c.color }}>
                          <Icon size={15} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: "#333" }}>{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color: "#111" }}>Conditions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "LinkedIn", types: COND_LI, disabled: false },
            ].map(col => (
              <div key={col.title}>
                <p className="text-xs font-semibold mb-2" style={{ color: "#aaa" }}>{col.title}</p>
                <div className="space-y-2">
                  {col.types.map(type => {
                    const c = STEP_CONFIG[type]; const Icon = c.icon;
                    return (
                      <button key={type}
                        onClick={() => !col.disabled && onSelect(type)}
                        disabled={col.disabled}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                        style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", opacity: col.disabled ? 0.4 : 1, cursor: col.disabled ? "not-allowed" : "pointer" }}
                        onMouseEnter={e => { if (!col.disabled) { (e.currentTarget as HTMLElement).style.borderColor = "#e8836a"; (e.currentTarget as HTMLElement).style.background = "#fef3f0"; } }}
                        onMouseLeave={e => { if (!col.disabled) { (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5"; (e.currentTarget as HTMLElement).style.background = "#f8f8f8"; } }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#fef3f0", color: "#e8836a" }}>
                          <Icon size={15} />
                        </div>
                        <span className="text-xs font-medium" style={{ color: "#333" }}>{type}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

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
    <div className="fixed inset-0 z-[200]" style={{ background: "rgba(0,0,0,0.2)" }} onClick={onClose}>
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
        onClick={e => e.stopPropagation()}
        className="absolute top-0 right-0 h-full overflow-y-auto flex flex-col"
        style={{ width: "min(720px, 100vw)", background: "#fff", borderLeft: "1px solid #e5e5e5" }}>

        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#f0f0f0" }}>
          <h2 className="text-base font-bold" style={{ color: "#111" }}>
            {isConn ? "Connection message" : "Message"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" style={{ color: "#888" }}>
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4 flex-1">
          {[
            { label: "Contact variables:", vars: CONTACT_VARS },
            { label: "Sender variables:",  vars: SENDER_VARS },
          ].map(row => (
            <div key={row.label} className="flex flex-wrap items-start gap-3">
              <span className="text-xs font-semibold pt-1 shrink-0 w-full sm:w-32" style={{ color: "#888" }}>{row.label}</span>
              <div className="flex flex-wrap gap-2">
                {row.vars.map(v => (
                  <button key={v} onClick={() => setContent(p => p + v)}
                    className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                    style={{ background: "#f0f7ff", border: "1px solid #bfdbfe", color: "#2563eb" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#dbeafe"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#f0f7ff"}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e5e5e5" }}>
            <textarea value={content}
              onChange={e => setContent(e.target.value.slice(0, maxChars))}
              placeholder="Write your message here..."
              rows={6}
              className="w-full px-5 py-4 text-sm resize-none focus:outline-none"
              style={{ color: "#333", lineHeight: 1.7 }} />
            <div className="px-4 py-2 flex items-center gap-4 border-t"
              style={{ borderColor: "#f0f0f0", background: "#fafafa" }}>
              <div className="flex items-center gap-2 text-[11px]" style={{ color: "#aaa" }}>
                <span className="w-3 h-3 rounded-sm inline-block" style={{ background: "#dbeafe" }} /> variable
                <span className="w-3 h-3 rounded-sm inline-block ml-2" style={{ background: "#fde8e3" }} /> replace
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
            <div className="rounded-xl px-5 py-4" style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "#aaa" }}>Preview</p>
              <p className="text-sm" style={{ color: "#333", lineHeight: 1.7 }}
                dangerouslySetInnerHTML={{
                  __html: content.replace(/\{[^}]+\}/g, m =>
                    `<mark style="background:#dbeafe;color:#2563eb;border-radius:3px;padding:0 2px">${m}</mark>`)
                }} />
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold"
              style={{ background: "#fef3f0", border: "1px solid #f5c5b5", color: "#e8836a" }}>
              <FileText size={13} /> Use template
            </button>
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: "#aaa" }}>Cycle contacts</span>
              {[ChevronLeft, ChevronRight].map((Icon, i) => (
                <button key={i} className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "#f5f5f5", color: "#888" }}>
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {isConn && (
            <div className="flex flex-wrap items-center gap-3 px-4 py-3 rounded-xl"
              style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
              <button onClick={() => setWithdrawEnabled(p => !p)}
                className="w-10 h-6 rounded-full relative transition-all duration-300 shrink-0"
                style={{ background: withdrawEnabled ? "#e8836a" : "#ddd" }}>
                <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                  style={{ left: withdrawEnabled ? 22 : 4 }} />
              </button>
              <span className="text-xs font-medium" style={{ color: "#555" }}>Withdraw requests after</span>
              <input type="number" min={7} max={21} value={withdrawAfter}
                onChange={e => setWithdrawAfter(parseInt(e.target.value))}
                className="w-12 text-center px-1 py-1 rounded-lg text-sm font-bold focus:outline-none"
                style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#333" }} />
              <span className="text-xs" style={{ color: "#555" }}>days</span>
              <span className="text-xs ml-auto" style={{ color: "#aaa" }}>Min 7 · Max 21</span>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t" style={{ borderColor: "#f0f0f0" }}>
          <button onClick={() => onSave(step.id, content, isConn ? withdrawAfter : undefined)}
            className="px-8 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: "#e8836a", boxShadow: "0 4px 12px rgba(232,131,106,0.3)" }}>
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const BranchColumn = ({ label, children, onAddStep, isEmpty }: {
  label: "Yes" | "No"; children: React.ReactNode; onAddStep: () => void; isEmpty: boolean;
}) => (
  <div className="flex flex-col items-center" style={{ minWidth: 220 }}>
    <div className="flex items-center gap-2 mb-3">
      <div className="h-px w-6" style={{ background: label === "Yes" ? "#e8836a" : "#e5e5e5" }} />
      <span className="text-xs font-bold px-3 py-1 rounded-full"
        style={{
          background: label === "Yes" ? "#fef3f0" : "#f5f5f5",
          color:      label === "Yes" ? "#e8836a"  : "#888",
          border:     "1px solid " + (label === "Yes" ? "#f5c5b5" : "#e5e5e5"),
        }}>
        {label}
      </span>
      <div className="h-px w-6" style={{ background: "#e5e5e5" }} />
    </div>
    {children}
    <button onClick={onAddStep}
      className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold transition-all"
      style={{ background: "transparent", border: "1px dashed #e8836a", color: "#e8836a" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fef3f0"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
      <Plus size={13} /> Add a new step
    </button>
    {isEmpty && <p className="text-xs mt-2" style={{ color: "#bbb" }}>End of sequence</p>}
  </div>
);

const EditCampaignPage = () => {
  const router = useRouter();
  const params = useParams();
  const id     = params?.id as string;

  const [campaign,     setCampaign]     = useState<Campaign | null>(null);
  const [flowSteps,    setFlowSteps]    = useState<Record<string, FlowStep>>({});
  const [rootSequence, setRootSequence] = useState<string[]>([]);
  const [saved,        setSaved]        = useState(false);
  const [addAfter,     setAddAfter]     = useState<{ id: string; branch?: "yes" | "no" } | null>(null);
  const [editingStep,  setEditingStep]  = useState<string | null>(null);
  const [showAddRoot,  setShowAddRoot]  = useState(false);

  useEffect(() => {
    const all: Campaign[] = JSON.parse(localStorage.getItem("custom_campaigns") || "[]");
    const found = all.find(c => c.id === id);
    if (!found) { router.push("/dashboard/campaigns"); return; }
    setCampaign(found);

    if (found.flowSteps && found.flowRoot && (found.flowRoot as string[]).length > 0) {
      setFlowSteps(found.flowSteps as Record<string, FlowStep>);
      setRootSequence(found.flowRoot as string[]);
      return;
    }

    const typeMap: Record<string, StepType> = {
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

    const legacySeq: string[] = Array.isArray(found.mainSequence) ? (found.mainSequence as string[]) : [];
    const legacySteps = (found.steps ?? {}) as Record<string, { id: string; type: string; delay: number; content?: string }>;
    const builtSteps: Record<string, FlowStep> = {};
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
            [`${branch}Children`]: [...(prev[afterId][`${branch}Children` as "yesChildren" | "noChildren"] ?? []), newStep.id],
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
    <div className="flex items-center justify-center h-screen" style={{ background: "#f0f0f0" }}>
      <div className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{ borderColor: "#e8836a", borderTopColor: "transparent" }} />
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
          <div className="w-px" style={{ height: 24, background: "#e8836a" }} />
          <div style={{ maxWidth: 280, width: "100%", position: "relative" }}>
            <StepCard step={step} index={index}
              onEdit={setEditingStep}
              onAddAfter={aid => setAddAfter({ id: aid })}
              onDelete={handleDeleteStep} />
          </div>
          {/* Branches — stack on mobile, side-by-side on desktop */}
          <div className="flex flex-col md:flex-row gap-6 mt-4 items-start w-full justify-center">
            <BranchColumn label="Yes" isEmpty={yesList.length === 0}
              onAddStep={() => setAddAfter({ id: sid, branch: "yes" })}>
              {yesList.map((cid, ci) => (
                <div key={cid} className="flex flex-col items-center">
                  {ci > 0 && <div className="w-px" style={{ height: 16, background: "#e5e5e5" }} />}
                  <StepCard step={flowSteps[cid]} index={index + ci + 1}
                    onEdit={setEditingStep}
                    onAddAfter={() => setAddAfter({ id: sid, branch: "yes" })}
                    onDelete={handleDeleteStep} />
                </div>
              ))}
            </BranchColumn>
            <BranchColumn label="No" isEmpty={noList.length === 0}
              onAddStep={() => setAddAfter({ id: sid, branch: "no" })}>
              {noList.map((cid, ci) => (
                <div key={cid} className="flex flex-col items-center">
                  {ci > 0 && <div className="w-px" style={{ height: 16, background: "#e5e5e5" }} />}
                  <StepCard step={flowSteps[cid]} index={index + ci + 1}
                    onEdit={setEditingStep}
                    onAddAfter={() => setAddAfter({ id: sid, branch: "no" })}
                    onDelete={handleDeleteStep} />
                </div>
              ))}
            </BranchColumn>
          </div>
        </div>
      );
    }

    return (
      <div key={sid} className="flex flex-col items-center w-full">
        {index > 0 && <div className="w-px" style={{ height: 24, background: "#e8836a" }} />}
        <StepCard step={step} index={index}
          onEdit={setEditingStep}
          onAddAfter={aid => setAddAfter({ id: aid })}
          onDelete={handleDeleteStep} />
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden"
      style={{ background: "#f0f0f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 px-5 py-3 rounded-full text-white text-sm font-semibold shadow-xl"
            style={{ background: "#10b981" }}>
            <Check size={16} /> Campaign saved!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="shrink-0 flex items-center justify-between px-4 md:px-6"
        style={{ height: 52, background: "#fff", borderBottom: "1px solid #e5e5e5" }}>
        <div className="flex items-center gap-2 overflow-hidden">
          <h2 className="text-sm md:text-base font-bold truncate max-w-[160px] md:max-w-xs" style={{ color: "#111" }}>
            {campaign.name}
          </h2>
          {campaign.searchUrl && (
            <a href={campaign.searchUrl as string} target="_blank" rel="noreferrer"
              className="hidden sm:flex items-center gap-1 text-xs font-medium truncate max-w-[200px]"
              style={{ color: "#e8836a" }}>
              <LinkIcon size={11} />
              {(campaign.searchUrl as string).slice(0, 40)}...
            </a>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleSave}
            className="flex items-center gap-1.5 px-3 md:px-5 py-2 rounded-full text-xs font-bold text-white transition-all"
            style={{ background: "#e8836a", boxShadow: "0 4px 12px rgba(232,131,106,0.25)" }}>
            <Save size={13} />
            <span className="hidden sm:inline">Apply changes</span>
            <span className="sm:hidden">Save</span>
          </button>
          <button onClick={() => router.push("/dashboard/campaigns")}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
            style={{ color: "#888" }}>
            <X size={17} />
          </button>
        </div>
      </header>

      {/* Canvas */}
      <main className="flex-1 overflow-auto relative"
        style={{
          backgroundColor: "#f5f5f5",
          backgroundImage: "radial-gradient(circle, #c8c8c8 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}>
        <div className="flex flex-col items-center py-8 px-4 md:px-6 min-h-full">

          <div className="px-5 py-2 rounded-full text-xs font-semibold mb-2"
            style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#888" }}>
            Start of sequence
          </div>

          <button onClick={() => { setAddAfter(null); setShowAddRoot(true); }}
            className="my-1 w-7 h-7 rounded-full flex items-center justify-center transition-all"
            style={{ background: "transparent", border: "2px solid #e8836a", color: "#e8836a" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#e8836a"; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#e8836a"; }}>
            <Plus size={14} />
          </button>

          {rootSequence.map((sid, i) => renderStep(sid, i))}

          {rootSequence.length === 0 && (
            <div className="mt-8 flex flex-col items-center gap-3 text-center" style={{ color: "#bbb" }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "#fff", border: "2px dashed #e5e5e5" }}>
                <Plus size={24} />
              </div>
              <p className="text-sm font-medium">Click + to add your first step</p>
            </div>
          )}

          {rootSequence.length > 0 && (
            <div className="flex flex-col items-center mt-2">
              <div className="w-px" style={{ height: 20, background: "#e5e5e5" }} />
              <button onClick={() => { setAddAfter(null); setShowAddRoot(true); }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition-all"
                style={{ background: "transparent", border: "1px dashed #e8836a", color: "#e8836a" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fef3f0"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                <Plus size={13} /> Add a new step
              </button>
              <p className="text-xs mt-3" style={{ color: "#bbb" }}>End of sequence</p>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {(showAddRoot || addAfter !== null) && (
          <AddStepModal
            onSelect={handleSelectStep}
            onClose={() => { setShowAddRoot(false); setAddAfter(null); }} />
        )}
        {editingStep && flowSteps[editingStep] && (
          <MessageModal
            step={flowSteps[editingStep]}
            onSave={handleSaveMessage}
            onClose={() => setEditingStep(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditCampaignPage;