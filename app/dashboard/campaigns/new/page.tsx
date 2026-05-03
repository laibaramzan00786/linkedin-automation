'use client';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, X, Trash2, Link as LinkIcon, Plus, ArrowRight,
  Clock, Zap, MousePointer2, MessageSquare, Users, ThumbsUp,
  Award, ChevronDown, Check, Info, Upload, FileText,
  AlertCircle, Download, Table2, ChevronLeft, ChevronRight,
} from "lucide-react";

type WizardStep   = "audience" | "sequence" | "review" | "finalize";
type AudienceMode = "url" | "csv";
type StepType =
  | "Connection request" | "Follow-up Message" | "LinkedIn Profile Visit"
  | "Like a post" | "Endorse a skill";
type FlowStepType =
  | "View profile" | "Connection request" | "Message"
  | "Like post" | "Endorse skills" | "If connected";

interface CampaignStep { id: string; type: StepType; delay: number; content?: string; }
interface FlowStep {
  id: string; type: FlowStepType; delay: number;
  delayUnit: "day" | "days"; immediate: boolean;
  content?: string; withdrawAfter?: number;
  isCondition?: boolean; yesChildren?: string[]; noChildren?: string[];
}
interface LeadRow {
  firstName?: string; lastName?: string; fullName?: string;
  email?: string; linkedinUrl?: string; company?: string;
  jobTitle?: string; [key: string]: string | undefined;
}

const WIZARD_TO_FLOW: Record<StepType, FlowStepType> = {
  "Connection request":     "Connection request",
  "Follow-up Message":      "Message",
  "LinkedIn Profile Visit": "View profile",
  "Like a post":            "Like post",
  "Endorse a skill":        "Endorse skills",
};

const STEP_TEMPLATES: {
  type: StepType; description: string;
  icon: React.ElementType; color: string; bg: string;
}[] = [
  { type: "Connection request",     description: "Send personalized invite",  icon: Users,         color: "#e8836a", bg: "#fef3f0" },
  { type: "Follow-up Message",      description: "Nurture with a message",    icon: MessageSquare, color: "#7c6ff7", bg: "#f3f2ff" },
  { type: "LinkedIn Profile Visit", description: "Show interest by visiting", icon: MousePointer2, color: "#3b82f6", bg: "#eff6ff" },
  { type: "Like a post",            description: "Engage with latest post",   icon: ThumbsUp,      color: "#10b981", bg: "#ecfdf5" },
  { type: "Endorse a skill",        description: "Validate their expertise",  icon: Award,         color: "#f59e0b", bg: "#fffbeb" },
];

const getStepColor = (t: StepType) => STEP_TEMPLATES.find(s => s.type === t)?.color ?? "#e8836a";
const getStepBg    = (t: StepType) => STEP_TEMPLATES.find(s => s.type === t)?.bg    ?? "#fef3f0";
const getStepIcon  = (t: StepType) => STEP_TEMPLATES.find(s => s.type === t)?.icon  ?? Users;

const WIZARD_STEPS: { id: WizardStep; label: string; short: string }[] = [
  { id: "audience", label: "Audience", short: "Audience" },
  { id: "sequence", label: "Sequence", short: "Sequence" },
  { id: "review",   label: "Review",   short: "Review"   },
  { id: "finalize", label: "Launch",   short: "Launch"   },
];

function parseCSV(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return { headers: [], rows: [] };
  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let cur = "", inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuote && line[i + 1] === '"') { cur += '"'; i++; }
        else inQuote = !inQuote;
      } else if (ch === ',' && !inQuote) { result.push(cur.trim()); cur = ""; }
      else cur += ch;
    }
    result.push(cur.trim());
    return result;
  };
  const headers = parseRow(lines[0]);
  const rows = lines.slice(1).filter(l => l.trim()).map(line => {
    const vals = parseRow(line);
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => { obj[h] = vals[i] ?? ""; });
    return obj;
  });
  return { headers, rows };
}

function normaliseRow(raw: Record<string, string>): LeadRow {
  const get = (...keys: string[]) => {
    for (const k of keys) {
      const found = Object.entries(raw).find(([h]) =>
        h.toLowerCase().replace(/[\s_]/g, "").includes(k.toLowerCase())
      );
      if (found && found[1]) return found[1];
    }
    return undefined;
  };
  return {
    firstName:   get("firstname", "first"),
    lastName:    get("lastname", "last"),
    fullName:    get("fullname", "name"),
    email:       get("email", "mail"),
    linkedinUrl: get("linkedin", "url", "profile"),
    company:     get("company", "org", "organization", "employer"),
    jobTitle:    get("title", "role", "position", "jobtitle"),
  };
}

// ── CSV Upload Zone ───────────────────────────────────────────────────────────
const CSVUploadZone = ({ onParsed }: { onParsed: (h: string[], r: Record<string, string>[]) => void }) => {
  const [dragging, setDragging] = useState(false);
  const [error,    setError]    = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError("");
    if (!file.name.endsWith(".csv") && file.type !== "text/csv") {
      setError("Please upload a .csv file"); return;
    }
    if (file.size > 5 * 1024 * 1024) { setError("File too large. Max 5MB"); return; }
    const reader = new FileReader();
    reader.onload = e => {
      const text = e.target?.result as string;
      const { headers, rows } = parseCSV(text);
      if (rows.length === 0) { setError("No data found in CSV"); return; }
      onParsed(headers, rows);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <input ref={inputRef} type="file" accept=".csv" className="hidden"
        onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); e.dataTransfer.files[0] && handleFile(e.dataTransfer.files[0]); }}
        className="rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all py-10 px-5"
        style={{
          border: `2px dashed ${dragging ? "#e8836a" : "#e0e0e0"}`,
          background: dragging ? "#fef3f0" : "#f8f8f8",
        }}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: dragging ? "#e8836a" : "#fff", border: "1px solid #e5e5e5" }}>
          <Upload size={22} style={{ color: dragging ? "#fff" : "#e8836a" }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold" style={{ color: "#333" }}>
            Drop your CSV here, or{" "}
            <span style={{ color: "#e8836a" }}>browse</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "#aaa" }}>Supports .csv files up to 5MB</p>
        </div>
      </div>
      {error && (
        <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-lg text-xs font-medium"
          style={{ background: "#fef2f2", color: "#ef4444" }}>
          <AlertCircle size={13} /> {error}
        </div>
      )}
      <button
        onClick={e => {
          e.stopPropagation();
          const csv = `first_name,last_name,email,linkedin_url,company,job_title\nJohn,Doe,john@example.com,https://linkedin.com/in/johndoe,Acme Corp,CEO\nJane,Smith,jane@example.com,https://linkedin.com/in/janesmith,Beta Inc,CTO`;
          const blob = new Blob([csv], { type: "text/csv" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a"); a.href = url; a.download = "sample_leads.csv"; a.click();
        }}
        className="flex items-center gap-2 mt-3 text-xs font-semibold"
        style={{ color: "#e8836a" }}
      >
        <Download size={13} /> Download sample CSV template
      </button>
    </div>
  );
};

// ── CSV Preview ───────────────────────────────────────────────────────────────
const CSVPreview = ({ headers, rows, onClear }: {
  headers: string[]; rows: Record<string, string>[]; onClear: () => void;
}) => {
  const [showAll, setShowAll] = useState(false);
  const preview = showAll ? rows : rows.slice(0, 4);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#ecfdf5", color: "#10b981" }}>
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#111" }}>{rows.length.toLocaleString()} leads imported</p>
            <p className="text-xs" style={{ color: "#aaa" }}>{headers.length} columns detected</p>
          </div>
        </div>
        <button onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0"
          style={{ background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca" }}>
          <X size={12} /> Remove
        </button>
      </div>

      <div className="px-3 py-2.5 rounded-xl" style={{ background: "#fef3f0", border: "1px solid #f5c5b5" }}>
        <p className="text-xs font-semibold mb-1.5" style={{ color: "#e8836a" }}>Detected columns:</p>
        <div className="flex flex-wrap gap-1.5">
          {headers.map(h => (
            <span key={h} className="px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={{ background: "#fff", border: "1px solid #f5c5b5", color: "#333" }}>{h}</span>
          ))}
        </div>
      </div>

      {/* Mobile-friendly table — show key fields only */}
      <div className="space-y-1.5">
        {preview.map((row, i) => (
          <div key={i} className="px-3 py-2.5 rounded-xl flex items-center gap-3"
            style={{ background: "#f8f8f8", border: "1px solid #efefef" }}>
            <span className="text-[10px] font-bold w-5 shrink-0" style={{ color: "#bbb" }}>{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#333" }}>
                {row[headers.find(h => h.toLowerCase().includes("name") || h.toLowerCase().includes("first")) ?? ""] || "—"}
              </p>
              <p className="text-[11px] truncate" style={{ color: "#aaa" }}>
                {row[headers.find(h => h.toLowerCase().includes("company") || h.toLowerCase().includes("email")) ?? ""] || ""}
              </p>
            </div>
          </div>
        ))}
      </div>
      {rows.length > 4 && (
        <button onClick={() => setShowAll(p => !p)}
          className="w-full py-2 text-xs font-semibold rounded-xl"
          style={{ background: "#f8f8f8", color: "#e8836a", border: "1px solid #f5c5b5" }}>
          {showAll ? "Show less" : `Show all ${rows.length} rows`}
        </button>
      )}
    </div>
  );
};

// ── Sequence Step Panel (mobile drawer + desktop sidebar) ─────────────────────
const StepPicker = ({ onAdd, onClose }: { onAdd: (t: StepType) => void; onClose?: () => void }) => (
  <div className="p-4 space-y-2">
    {STEP_TEMPLATES.map(tmpl => {
      const Icon = tmpl.icon;
      return (
        <button key={tmpl.type}
          onClick={() => { onAdd(tmpl.type); onClose?.(); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
          style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = tmpl.color; (e.currentTarget as HTMLElement).style.background = tmpl.bg; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5"; (e.currentTarget as HTMLElement).style.background = "#f8f8f8"; }}
        >
          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: tmpl.bg, color: tmpl.color }}>
            <Icon size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold truncate" style={{ color: "#333" }}>{tmpl.type}</p>
            <p className="text-[11px] truncate" style={{ color: "#aaa" }}>{tmpl.description}</p>
          </div>
          <Plus size={14} className="shrink-0" style={{ color: "#ccc" }} />
        </button>
      );
    })}
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
const NewCampaignPage = () => {
  const router = useRouter();
  const [wizardStep,   setWizardStep]   = useState<WizardStep>("audience");
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("url");
  const [showPicker,   setShowPicker]   = useState(false); // mobile step picker drawer

  const [currentUserName,   setCurrentUserName]   = useState("Loading...");
  const [currentUserEmail,  setCurrentUserEmail]  = useState("");
  const [currentUserAvatar, setCurrentUserAvatar] = useState<string | undefined>();

  useEffect(() => {
    const raw = localStorage.getItem("current_user");
    if (raw) {
      try {
        const u = JSON.parse(raw);
        const fullName = [u.firstName, u.lastName].filter(Boolean).join(" ") || u.name || u.email?.split("@")[0] || "User";
        setCurrentUserName(fullName);
        setCurrentUserEmail(u.email ?? "");
        setCurrentUserAvatar(u.avatar ?? u.image ?? undefined);
        return;
      } catch { /* fall through */ }
    }
    const name  = localStorage.getItem("user_name")  || localStorage.getItem("user_email")?.split("@")[0] || "User";
    const email = localStorage.getItem("user_email") || "";
    setCurrentUserName(name);
    setCurrentUserEmail(email);
  }, []);

  const [searchUrl,    setSearchUrl]    = useState("");
  const [maxLeads,     setMaxLeads]     = useState(500);
  const [campaignName, setCampaignName] = useState("");
  const [options, setOptions] = useState({
    excludeNoPhoto: true, excludeFirstDegree: true,
    premiumOnly: false,   openProfiles: false,
  });
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows,    setCsvRows]    = useState<Record<string, string>[]>([]);
  const [steps,       setSteps]       = useState<Record<string, CampaignStep>>({
    step1: { id: "step1", type: "Connection request", delay: 0,
      content: "Hi {{name}}, I'd love to connect and learn more about your work at {{company}}!" },
  });
  const [mainSequence, setMainSequence] = useState<string[]>(["step1"]);

  const orderList: WizardStep[] = ["audience", "sequence", "review", "finalize"];
  const currentIdx = orderList.indexOf(wizardStep);

  const addStep = (type: StepType) => {
    const id = "s" + Math.random().toString(36).substring(2, 8);
    setSteps(prev => ({
      ...prev,
      [id]: { id, type, delay: 1, content: type.includes("Message") ? "Hi {{name}}, just following up on my previous message!" : "" },
    }));
    setMainSequence(prev => [...prev, id]);
  };

  const removeStep = (id: string) => {
    setMainSequence(prev => prev.filter(s => s !== id));
    setSteps(prev => { const c = { ...prev }; delete c[id]; return c; });
  };

  const updateStep = (id: string, updates: Partial<CampaignStep>) =>
    setSteps(prev => ({ ...prev, [id]: { ...prev[id], ...updates } }));

  const canContinue = () => {
    if (wizardStep === "audience") {
      return audienceMode === "url" ? searchUrl.trim().length > 0 : csvRows.length > 0;
    }
    if (wizardStep === "sequence") return mainSequence.length > 0;
    if (wizardStep === "review")   return true;
    if (wizardStep === "finalize") return campaignName.trim().length > 0;
    return false;
  };

  const handleNext = () => {
    if (wizardStep === "audience")      setWizardStep("sequence");
    else if (wizardStep === "sequence") setWizardStep("review");
    else if (wizardStep === "review")   setWizardStep("finalize");
    else handleLaunch();
  };

  const handleLaunch = () => {
    if (!campaignName) return;
    const flowStepsMap: Record<string, FlowStep> = {};
    mainSequence.forEach(sid => {
      const s = steps[sid]; if (!s) return;
      const flowType = WIZARD_TO_FLOW[s.type];
      flowStepsMap[s.id] = {
        id: s.id, type: flowType,
        delay: s.delay ?? 0, delayUnit: s.delay === 1 ? "day" : "days",
        immediate: !s.delay || s.delay === 0,
        content: s.content ?? undefined,
        isCondition: flowType === "If connected",
        yesChildren: flowType === "If connected" ? [] : undefined,
        noChildren:  flowType === "If connected" ? [] : undefined,
      };
    });
    const newCampaign = {
      id: Math.random().toString(36).substring(7),
      name: campaignName, status: "Active",
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      leads: audienceMode === "csv" ? csvRows.length : maxLeads,
      connections: 0, accepted: 0, visits: 0, likes: 0, endorse: 0,
      messages: mainSequence.filter(sid =>
        steps[sid]?.type.includes("Message") || steps[sid]?.type.includes("request")
      ).length,
      replied: 0, audienceMode,
      searchUrl:       audienceMode === "url" ? searchUrl : "",
      csvLeads:        audienceMode === "csv" ? csvRows.map(normaliseRow) : [],
      csvHeaders, linkedinAccount: currentUserName, linkedinEmail: currentUserEmail,
      flowSteps: flowStepsMap, flowRoot: mainSequence,
    };
    const existing = JSON.parse(localStorage.getItem("custom_campaigns") || "[]");
    localStorage.setItem("custom_campaigns", JSON.stringify([newCampaign, ...existing]));
    router.push("/dashboard/campaigns");
  };

  // ── Shared section title ──────────────────────────────────────────────────
  const SectionTitle = ({ step, title, subtitle }: { step: string; title: string; subtitle: string }) => (
    <div className="mb-6">
      <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#e8836a" }}>{step}</p>
      <h2 className="text-xl sm:text-2xl font-bold" style={{ color: "#111" }}>{title}</h2>
      <p className="text-sm mt-0.5" style={{ color: "#888" }}>{subtitle}</p>
    </div>
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden"
      style={{ background: "#f0f0f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="shrink-0 flex items-center justify-between px-4 sm:px-6 border-b"
        style={{ height: 56, background: "#fff", borderColor: "#e5e5e5" }}>

        {/* Left: close + name */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button onClick={() => router.push("/dashboard/campaigns")}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all hover:bg-gray-100 shrink-0"
            style={{ color: "#888" }}>
            <X size={17} />
          </button>
          <div className="w-px h-5 shrink-0" style={{ background: "#e5e5e5" }} />
          <span className="text-sm font-semibold truncate max-w-[120px] sm:max-w-xs" style={{ color: "#333" }}>
            {campaignName || "New Campaign"}
          </span>
        </div>

        {/* Center: step pills — hidden on small screens */}
        <div className="hidden md:flex items-center gap-1">
          {WIZARD_STEPS.map((s, i) => {
            const status = wizardStep === s.id ? "active" : currentIdx > i ? "done" : "pending";
            return (
              <button key={s.id}
                onClick={() => { if (status === "done") setWizardStep(s.id); }}
                disabled={status === "pending"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: status === "active" ? "#fef3f0" : status === "done" ? "#f5f5f5" : "transparent",
                  color:      status === "active" ? "#e8836a" : status === "done" ? "#888"    : "#bbb",
                  border:     status === "active" ? "1px solid #f5c5b5" : "1px solid transparent",
                  cursor:     status === "pending" ? "default" : "pointer",
                }}>
                <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                  style={{
                    background: status === "active" ? "#e8836a" : status === "done" ? "#10b981" : "#e5e5e5",
                    color: "#fff",
                  }}>
                  {status === "done" ? <Check size={9} strokeWidth={3} /> : i + 1}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Right: back + continue */}
        <div className="flex items-center gap-2">
          {currentIdx > 0 && (
            <button onClick={() => setWizardStep(orderList[currentIdx - 1])}
              className="h-8 w-8 sm:w-auto sm:px-4 rounded-full text-xs font-semibold flex items-center justify-center"
              style={{ background: "#f5f5f5", color: "#555", border: "1px solid #e5e5e5" }}>
              <ChevronLeft size={15} className="sm:hidden" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <button onClick={handleNext} disabled={!canContinue()}
            className="h-8 px-4 rounded-full text-xs font-bold flex items-center gap-1.5"
            style={{
              background: canContinue() ? "#e8836a" : "#f5d5cc",
              color: "#fff", cursor: canContinue() ? "pointer" : "not-allowed",
            }}>
            <span className="hidden sm:inline">{wizardStep === "finalize" ? "Launch Campaign" : "Continue"}</span>
            <span className="sm:hidden">{wizardStep === "finalize" ? "Launch" : "Next"}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </header>

      {/* ── MOBILE STEP INDICATOR ── */}
      <div className="md:hidden flex items-center justify-between px-4 py-2.5 border-b"
        style={{ background: "#fff", borderColor: "#f0f0f0" }}>
        <div className="flex items-center gap-2">
          {WIZARD_STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center gap-1">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                style={{
                  background: wizardStep === s.id ? "#e8836a" : currentIdx > i ? "#10b981" : "#e5e5e5",
                  color: "#fff",
                }}>
                {currentIdx > i ? <Check size={9} strokeWidth={3} /> : i + 1}
              </div>
              {i < 3 && <div className="w-4 h-px" style={{ background: currentIdx > i ? "#10b981" : "#e5e5e5" }} />}
            </div>
          ))}
        </div>
        <span className="text-xs font-semibold" style={{ color: "#888" }}>
          Step {currentIdx + 1} of 4 — {WIZARD_STEPS[currentIdx].label}
        </span>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 overflow-hidden flex">
        <AnimatePresence mode="wait">

          {/* ════════════════ STEP 1: AUDIENCE ════════════════ */}
          {wizardStep === "audience" && (
            <motion.div key="audience"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto" style={{ background: "#f0f0f0" }}>
              <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-4">
                <SectionTitle step="Step 1 of 4" title="Set up your audience"
                  subtitle="Choose how you want to import your leads." />

                {/* LinkedIn Account */}
                <div className="rounded-2xl p-4 sm:p-6 space-y-3"
                  style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <p className="text-sm font-semibold" style={{ color: "#333" }}>LinkedIn Account</p>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
                    <div className="flex items-center gap-3">
                      {currentUserAvatar ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                          <img src={currentUserAvatar} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                          style={{ background: "#e8836a" }}>
                          {currentUserName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate" style={{ color: "#333" }}>{currentUserName}</p>
                        {currentUserEmail && (
                          <p className="text-[11px] truncate" style={{ color: "#aaa" }}>{currentUserEmail}</p>
                        )}
                      </div>
                    </div>
                    <ChevronDown size={15} className="shrink-0" style={{ color: "#888" }} />
                  </div>
                </div>

                {/* Mode Tabs + Content */}
                <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  {/* Tab headers */}
                  <div className="flex border-b" style={{ borderColor: "#f0f0f0" }}>
                    {[
                      { id: "url", label: "Search URL", icon: LinkIcon },
                      { id: "csv", label: "Upload CSV", icon: Table2 },
                    ].map(tab => (
                      <button key={tab.id}
                        onClick={() => setAudienceMode(tab.id as AudienceMode)}
                        className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-5 py-3.5 transition-all"
                        style={{
                          background:   audienceMode === tab.id ? "#fff" : "#f8f8f8",
                          borderBottom: audienceMode === tab.id ? "2px solid #e8836a" : "2px solid transparent",
                        }}>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: audienceMode === tab.id ? "#fef3f0" : "#f0f0f0", color: audienceMode === tab.id ? "#e8836a" : "#aaa" }}>
                          <tab.icon size={13} />
                        </div>
                        <span className="text-xs sm:text-sm font-semibold"
                          style={{ color: audienceMode === tab.id ? "#111" : "#888" }}>
                          {tab.label}
                        </span>
                        {audienceMode === tab.id && (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center ml-auto shrink-0"
                            style={{ background: "#e8836a" }}>
                            <Check size={9} color="#fff" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {audienceMode === "url" && (
                      <motion.div key="url" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-4 sm:p-6 space-y-4">
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "#333" }}>LinkedIn Search URL</p>
                          <p className="text-xs mt-0.5" style={{ color: "#888" }}>Paste a People Search or Sales Navigator URL</p>
                        </div>
                        <div className="relative">
                          <LinkIcon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#bbb" }} />
                          <input value={searchUrl} onChange={e => setSearchUrl(e.target.value)}
                            placeholder="https://www.linkedin.com/search/results/people/..."
                            className="w-full h-11 pl-9 pr-4 rounded-xl text-sm font-medium focus:outline-none transition-all"
                            style={{ background: "#f8f8f8", border: searchUrl ? "1px solid #e8836a" : "1px solid #e5e5e5", color: "#333" }} />
                        </div>
                        {searchUrl && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium"
                            style={{ background: "#ecfdf5", color: "#10b981" }}>
                            <CheckCircle2 size={12} /> URL looks valid — ready to extract leads
                          </div>
                        )}
                        {/* Slider */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold" style={{ color: "#333" }}>Max Prospects</p>
                              <p className="text-xs" style={{ color: "#aaa" }}>How many leads to extract</p>
                            </div>
                            <span className="text-2xl font-bold tabular-nums" style={{ color: "#e8836a" }}>{maxLeads}</span>
                          </div>
                          <input type="range" min="10" max="1000" step="10" value={maxLeads}
                            onChange={e => setMaxLeads(parseInt(e.target.value))}
                            className="w-full h-2 rounded-full cursor-pointer appearance-none"
                            style={{ accentColor: "#e8836a" }} />
                          <div className="flex justify-between text-[11px]" style={{ color: "#bbb" }}>
                            <span>10</span><span>1,000</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {audienceMode === "csv" && (
                      <motion.div key="csv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="p-4 sm:p-6 space-y-4">
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "#333" }}>Upload your leads CSV</p>
                          <p className="text-xs mt-0.5" style={{ color: "#888" }}>Include: first_name, last_name, email, linkedin_url, company</p>
                        </div>
                        {csvRows.length === 0 ? (
                          <CSVUploadZone onParsed={(h, r) => { setCsvHeaders(h); setCsvRows(r); }} />
                        ) : (
                          <CSVPreview headers={csvHeaders} rows={csvRows} onClear={() => { setCsvHeaders([]); setCsvRows([]); }} />
                        )}
                        {csvRows.length === 0 && (
                          <div className="rounded-xl p-3 sm:p-4" style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
                            <p className="text-xs font-semibold mb-2" style={{ color: "#555" }}>Supported columns:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                              {[
                                ["first_name / last_name", "Contact name"],
                                ["email", "Email address"],
                                ["linkedin_url", "LinkedIn profile URL"],
                                ["company", "Company name"],
                              ].map(([col, desc]) => (
                                <div key={col} className="flex items-start gap-2">
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded shrink-0"
                                    style={{ background: "#e8836a15", color: "#e8836a", marginTop: 1 }}>{col}</span>
                                  <span className="text-[11px]" style={{ color: "#aaa" }}>{desc}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Filters — URL mode only */}
                {audienceMode === "url" && (
                  <div className="rounded-2xl p-4 sm:p-6 space-y-3"
                    style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                    <p className="text-sm font-semibold" style={{ color: "#333" }}>Filters</p>
                    {[
                      { id: "excludeNoPhoto",     label: "Profiles with photos only",   sub: "Skip profiles without a photo" },
                      { id: "excludeFirstDegree", label: "Skip 1st degree connections", sub: "Only target unconnected people" },
                      { id: "premiumOnly",        label: "LinkedIn Premium only",        sub: "Target premium members" },
                      { id: "openProfiles",       label: "Open profiles only",           sub: "Message without a connection" },
                    ].map(opt => {
                      const val = options[opt.id as keyof typeof options];
                      return (
                        <div key={opt.id}
                          className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all"
                          style={{ background: val ? "#fef3f0" : "#f8f8f8", border: val ? "1px solid #f5c5b5" : "1px solid #e5e5e5" }}
                          onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}>
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="text-xs font-semibold" style={{ color: val ? "#e8836a" : "#555" }}>{opt.label}</p>
                            <p className="text-[11px] mt-0.5 hidden sm:block" style={{ color: "#aaa" }}>{opt.sub}</p>
                          </div>
                          <div className="w-10 h-6 rounded-full relative shrink-0 transition-all duration-300"
                            style={{ background: val ? "#e8836a" : "#ddd" }}>
                            <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300"
                              style={{ left: val ? 22 : 4 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Mobile continue */}
                <div className="sm:hidden pb-4">
                  <button onClick={handleNext} disabled={!canContinue()}
                    className="w-full h-12 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
                    style={{ background: canContinue() ? "#e8836a" : "#f5d5cc" }}>
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════ STEP 2: SEQUENCE ════════════════ */}
          {wizardStep === "sequence" && (
            <motion.div key="sequence"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-hidden flex flex-col lg:flex-row" style={{ background: "#f0f0f0" }}>

              {/* Desktop sidebar */}
              <div className="hidden lg:flex w-72 shrink-0 flex-col border-r overflow-y-auto"
                style={{ background: "#fff", borderColor: "#e5e5e5" }}>
                <div className="p-5 border-b" style={{ borderColor: "#f0f0f0" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#e8836a" }}>Step 2 of 4</p>
                  <h3 className="text-base font-bold" style={{ color: "#111" }}>Build Sequence</h3>
                  <p className="text-xs mt-1" style={{ color: "#888" }}>Click an action to add it to your flow</p>
                </div>
                <StepPicker onAdd={addStep} />
                <div className="mt-auto mx-4 mb-4 p-4 rounded-xl" style={{ background: "#fef3f0", border: "1px solid #f5c5b5" }}>
                  <p className="text-[11px] font-semibold mb-2" style={{ color: "#e8836a" }}>Sequence Summary</p>
                  {[
                    ["Total steps", mainSequence.length],
                    ["Duration", mainSequence.reduce((s, sid) => s + (steps[sid]?.delay ?? 0), 0) + " days"],
                    ["Messages", mainSequence.filter(sid => steps[sid]?.type.includes("Message") || steps[sid]?.type.includes("request")).length],
                  ].map(([label, val]) => (
                    <div key={String(label)} className="flex justify-between text-xs" style={{ color: "#888" }}>
                      <span>{label}</span>
                      <span className="font-bold" style={{ color: "#333" }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Canvas */}
              <div className="flex-1 overflow-y-auto flex flex-col">
                {/* Mobile add button */}
                <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b"
                  style={{ background: "#fff", borderColor: "#e5e5e5" }}>
                  <p className="text-sm font-semibold" style={{ color: "#333" }}>
                    {mainSequence.length} step{mainSequence.length !== 1 ? "s" : ""} added
                  </p>
                  <button onClick={() => setShowPicker(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white"
                    style={{ background: "#e8836a" }}>
                    <Plus size={13} /> Add Step
                  </button>
                </div>

                <div className="p-4 sm:p-8 flex flex-col items-center">
                  <div className="px-4 py-1.5 rounded-full text-xs font-semibold"
                    style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#888" }}>
                    ▶ Workflow Start
                  </div>

                  {mainSequence.length === 0 && (
                    <div className="mt-8 flex flex-col items-center gap-3 text-center" style={{ color: "#bbb" }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: "#fff", border: "2px dashed #e5e5e5" }}>
                        <Plus size={22} />
                      </div>
                      <p className="text-sm font-medium">
                        {window.innerWidth >= 1024 ? "Add your first action from the left panel" : "Tap \"Add Step\" above to start"}
                      </p>
                    </div>
                  )}

                  {mainSequence.map((sid, idx) => {
                    const step = steps[sid]; if (!step) return null;
                    const Icon  = getStepIcon(step.type);
                    const color = getStepColor(step.type);
                    const bg    = getStepBg(step.type);
                    return (
                      <div key={sid} className="w-full flex flex-col items-center" style={{ maxWidth: 520 }}>
                        <div className="flex flex-col items-center py-1">
                          <div className="w-px" style={{ height: 16, background: "#ddd" }} />
                          {idx > 0 && (
                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
                              style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#888" }}>
                              <Clock size={10} /> Wait {step.delay} day{step.delay !== 1 ? "s" : ""}
                            </div>
                          )}
                          <div className="w-px" style={{ height: 16, background: "#ddd" }} />
                        </div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                          className="w-full rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                          <div className="flex items-center justify-between px-4 py-3.5"
                            style={{ borderBottom: "1px solid #f5f5f5" }}>
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg, color }}>
                                <Icon size={15} />
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold truncate" style={{ color: "#111" }}>{step.type}</p>
                                <p className="text-[11px]" style={{ color: "#aaa" }}>Step {idx + 1}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {/* Delay control */}
                              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs"
                                style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#555" }}>
                                <Clock size={11} style={{ color: "#e8836a" }} />
                                {idx === 0 ? (
                                  <span style={{ color: "#888" }}>Immediately</span>
                                ) : (
                                  <>
                                    <input type="number" min={1} max={30} value={step.delay}
                                      onChange={e => updateStep(sid, { delay: Math.max(1, parseInt(e.target.value) || 1) })}
                                      className="w-7 text-center bg-transparent focus:outline-none font-bold" style={{ color: "#e8836a" }} />
                                    <span style={{ color: "#888" }}>d</span>
                                  </>
                                )}
                              </div>
                              <button onClick={() => removeStep(sid)}
                                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all" style={{ color: "#ddd" }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; (e.currentTarget as HTMLElement).style.background = "#fef2f2"; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#ddd"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Mobile delay row */}
                          {idx > 0 && (
                            <div className="sm:hidden flex items-center gap-2 px-4 py-2.5 border-b"
                              style={{ borderColor: "#f5f5f5", background: "#fafafa" }}>
                              <Clock size={11} style={{ color: "#e8836a" }} />
                              <span className="text-xs" style={{ color: "#888" }}>After</span>
                              <input type="number" min={1} max={30} value={step.delay}
                                onChange={e => updateStep(sid, { delay: Math.max(1, parseInt(e.target.value) || 1) })}
                                className="w-10 text-center bg-transparent focus:outline-none text-xs font-bold" style={{ color: "#e8836a" }} />
                              <span className="text-xs" style={{ color: "#888" }}>day(s)</span>
                            </div>
                          )}

                          {(step.type.includes("Message") || step.type === "Connection request") && (
                            <div className="px-4 py-4 space-y-3">
                              <textarea value={step.content} onChange={e => updateStep(sid, { content: e.target.value })}
                                placeholder="Write your personalized message here..." rows={3}
                                className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none transition-all"
                                style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#333", lineHeight: 1.6 }}
                                onFocus={e => { e.target.style.borderColor = "#e8836a"; e.target.style.background = "#fff"; }}
                                onBlur={e  => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#f8f8f8"; }} />
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-[11px] font-medium" style={{ color: "#aaa" }}>Variables:</span>
                                {["{{name}}", "{{company}}", "{{title}}"].map(tag => (
                                  <button key={tag} onClick={() => updateStep(sid, { content: (step.content || "") + tag })}
                                    className="px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all"
                                    style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#888" }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e8836a"; (e.currentTarget as HTMLElement).style.color = "#e8836a"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5"; (e.currentTarget as HTMLElement).style.color = "#888"; }}>
                                    {tag}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    );
                  })}

                  {mainSequence.length > 0 && (
                    <div className="flex flex-col items-center mt-2 mb-8">
                      <div className="w-px" style={{ height: 20, background: "#ddd" }} />
                      <button onClick={() => addStep("Follow-up Message")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all"
                        style={{ background: "#fff", border: "2px dashed #e5e5e5", color: "#aaa" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e8836a"; (e.currentTarget as HTMLElement).style.color = "#e8836a"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5"; (e.currentTarget as HTMLElement).style.color = "#aaa"; }}>
                        <Plus size={14} /> Add next step
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════ STEP 3: REVIEW ════════════════ */}
          {wizardStep === "review" && (
            <motion.div key="review"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto" style={{ background: "#f0f0f0" }}>
              <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-4">
                <SectionTitle step="Step 3 of 4" title="Review your campaign"
                  subtitle="Everything looks good? Click Continue to name and launch." />

                {/* Audience summary */}
                <div className="rounded-2xl p-4 sm:p-6 space-y-3"
                  style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-sm font-semibold" style={{ color: "#333" }}>Audience</p>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{ background: audienceMode === "csv" ? "#ecfdf5" : "#eff6ff", color: audienceMode === "csv" ? "#10b981" : "#3b82f6" }}>
                      {audienceMode === "csv" ? "📄 CSV Import" : "🔗 LinkedIn URL"}
                    </span>
                  </div>
                  {audienceMode === "url" ? (
                    [
                      { label: "Account",       value: currentUserName },
                      { label: "Max prospects", value: String(maxLeads) },
                      { label: "Search URL",    value: searchUrl || "—" },
                      { label: "Filters",       value: Object.values(options).filter(Boolean).length + " enabled" },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between items-start gap-4 text-sm">
                        <span className="shrink-0" style={{ color: "#888" }}>{row.label}</span>
                        <span className="font-medium text-right truncate max-w-[60%]" style={{ color: "#333" }}>{row.value}</span>
                      </div>
                    ))
                  ) : (
                    [
                      { label: "Account",     value: currentUserName },
                      { label: "Total leads", value: csvRows.length.toLocaleString() + " leads" },
                      { label: "Columns",     value: csvHeaders.length + " columns" },
                    ].map(row => (
                      <div key={row.label} className="flex justify-between text-sm">
                        <span style={{ color: "#888" }}>{row.label}</span>
                        <span className="font-semibold" style={{ color: "#333" }}>{row.value}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Sequence summary */}
                <div className="rounded-2xl p-4 sm:p-6 space-y-4"
                  style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold" style={{ color: "#333" }}>
                      Sequence ({mainSequence.length} steps)
                    </p>
                    <button onClick={() => setWizardStep("sequence")} className="text-xs font-semibold" style={{ color: "#e8836a" }}>
                      Edit
                    </button>
                  </div>
                  <div className="space-y-2">
                    {mainSequence.map((sid, idx) => {
                      const step = steps[sid]; if (!step) return null;
                      const Icon = getStepIcon(step.type);
                      const color = getStepColor(step.type);
                      const bg = getStepBg(step.type);
                      return (
                        <div key={sid} className="flex gap-3 items-start">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg, color }}>
                            <Icon size={15} />
                          </div>
                          <div className="flex-1 min-w-0 pt-0.5">
                            <p className="text-sm font-semibold" style={{ color: "#222" }}>{step.type}</p>
                            {step.content && (
                              <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#aaa" }}>{step.content}</p>
                            )}
                            {idx > 0 && (
                              <p className="text-[11px] mt-0.5" style={{ color: "#e8836a" }}>
                                +{step.delay} day{step.delay !== 1 ? "s" : ""} delay
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl w-fit"
                    style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#10b981" }}>
                    <CheckCircle2 size={13} />
                    <span className="text-xs font-semibold">End of sequence</span>
                  </div>
                </div>

                <div className="sm:hidden pb-4">
                  <button onClick={handleNext}
                    className="w-full h-12 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2"
                    style={{ background: "#e8836a" }}>
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ════════════════ STEP 4: FINALIZE ════════════════ */}
          {wizardStep === "finalize" && (
            <motion.div key="finalize"
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto" style={{ background: "#f0f0f0" }}>
              <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-4">
                <SectionTitle step="Step 4 of 4" title="Name & launch"
                  subtitle="Give your campaign a name and you're ready to go." />

                {/* Campaign name */}
                <div className="rounded-2xl p-4 sm:p-6 space-y-3"
                  style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <label className="text-sm font-semibold block" style={{ color: "#333" }}>
                    Campaign Name <span style={{ color: "#e8836a" }}>*</span>
                  </label>
                  <input value={campaignName} onChange={e => setCampaignName(e.target.value)}
                    placeholder="e.g. Recruiters Q2, SaaS Founders..."
                    className="w-full h-12 px-4 rounded-xl text-sm font-medium focus:outline-none transition-all"
                    style={{ background: "#f8f8f8", border: campaignName ? "1px solid #e8836a" : "1px solid #e5e5e5", color: "#333" }}
                    onFocus={e => { e.target.style.background = "#fff"; }}
                    onBlur={e  => { e.target.style.background = "#f8f8f8"; }} />
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Prospects", value: (audienceMode === "csv" ? csvRows.length : maxLeads).toLocaleString(), color: "#e8836a", bg: "#fef3f0" },
                    { label: "Steps",     value: String(mainSequence.length), color: "#7c6ff7", bg: "#f3f2ff" },
                    { label: "Duration",  value: mainSequence.reduce((s, sid) => s + (steps[sid]?.delay ?? 0), 0) + "d", color: "#10b981", bg: "#ecfdf5" },
                  ].map(c => (
                    <div key={c.label} className="rounded-2xl p-4 text-center"
                      style={{ background: c.bg, border: `1px solid ${c.color}22` }}>
                      <p className="text-xl sm:text-2xl font-bold" style={{ color: c.color }}>{c.value}</p>
                      <p className="text-xs font-medium mt-1" style={{ color: "#888" }}>{c.label}</p>
                    </div>
                  ))}
                </div>

                {/* Source badge */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl"
                  style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
                  {audienceMode === "csv" ? (
                    <><FileText size={14} style={{ color: "#10b981" }} />
                      <span className="text-xs font-medium" style={{ color: "#555" }}>
                        Source: <strong style={{ color: "#10b981" }}>CSV file</strong> — {csvRows.length.toLocaleString()} leads ready
                      </span></>
                  ) : (
                    <><LinkIcon size={14} style={{ color: "#3b82f6" }} />
                      <span className="text-xs font-medium" style={{ color: "#555" }}>
                        Source: <strong style={{ color: "#3b82f6" }}>LinkedIn URL</strong> — up to {maxLeads} leads
                      </span></>
                  )}
                </div>

                {/* Launch button */}
                <button onClick={handleLaunch} disabled={!campaignName.trim()}
                  className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-white transition-all"
                  style={{
                    background: campaignName.trim() ? "#e8836a" : "#f5d5cc",
                    cursor: campaignName.trim() ? "pointer" : "not-allowed",
                    boxShadow: campaignName.trim() ? "0 8px 24px rgba(232,131,106,0.3)" : "none",
                  }}>
                  <Zap size={18} /> Launch Campaign
                </button>
                <p className="text-center text-xs pb-4" style={{ color: "#bbb" }}>
                  Your campaign will start running immediately after launch.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ── MOBILE STEP PICKER DRAWER ── */}
      <AnimatePresence>
        {showPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setShowPicker(false)}
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl overflow-hidden"
              style={{ background: "#fff", maxHeight: "80vh" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "#f0f0f0" }}>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#111" }}>Add a step</p>
                  <p className="text-xs" style={{ color: "#aaa" }}>Choose an action to add to your sequence</p>
                </div>
                <button onClick={() => setShowPicker(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#f5f5f5", color: "#888" }}>
                  <X size={16} />
                </button>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 80px)" }}>
                <StepPicker onAdd={addStep} onClose={() => setShowPicker(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewCampaignPage;