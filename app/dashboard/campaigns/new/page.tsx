'use client';
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2, X, Trash2, Link as LinkIcon, Plus, ArrowRight,
  Clock, Zap, MousePointer2, MessageSquare, Users, ThumbsUp,
  Award, ChevronDown, Check, Info, Upload, FileText,
  AlertCircle, Download, Table2,
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

const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "audience", label: "Audience" },
  { id: "sequence", label: "Sequence" },
  { id: "review",   label: "Review"   },
  { id: "finalize", label: "Launch"   },
];

// CSV helpers 
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

// CSV Upload Zone 
const CSVUploadZone = ({
  onParsed,
}: { onParsed: (headers: string[], rows: Record<string, string>[]) => void }) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
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
        className="rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
        style={{ border: `2px dashed ${dragging ? "#e8836a" : "#e0e0e0"}`, background: dragging ? "#fef3f0" : "#f8f8f8", padding: "40px 20px" }}
      >
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: dragging ? "#e8836a" : "#fff", border: "1px solid #e5e5e5" }}>
          <Upload size={22} style={{ color: dragging ? "#fff" : "#e8836a" }} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold" style={{ color: "#333" }}>
            Drop your CSV file here, or <span style={{ color: "#e8836a" }}>browse</span>
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

//CSV Preview 
const CSVPreview = ({
  headers, rows, onClear,
}: { headers: string[]; rows: Record<string, string>[]; onClear: () => void }) => {
  const [showAll, setShowAll] = useState(false);
  const preview = showAll ? rows : rows.slice(0, 5);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#ecfdf5", color: "#10b981" }}>
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#111" }}>{rows.length.toLocaleString()} leads imported</p>
            <p className="text-xs" style={{ color: "#aaa" }}>{headers.length} columns detected</p>
          </div>
        </div>
        <button onClick={onClear} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
          style={{ background: "#fef2f2", color: "#ef4444", border: "1px solid #fecaca" }}>
          <X size={12} /> Remove file
        </button>
      </div>
      <div className="px-4 py-3 rounded-xl" style={{ background: "#fef3f0", border: "1px solid #f5c5b5" }}>
        <p className="text-xs font-semibold mb-2" style={{ color: "#e8836a" }}>Detected columns:</p>
        <div className="flex flex-wrap gap-2">
          {headers.map(h => (
            <span key={h} className="px-2 py-0.5 rounded-md text-[11px] font-medium"
              style={{ background: "#fff", border: "1px solid #f5c5b5", color: "#333" }}>{h}</span>
          ))}
        </div>
      </div>
      <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #e5e5e5" }}>
        <div className="overflow-x-auto">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#f8f8f8", borderBottom: "1px solid #e5e5e5" }}>
                <th style={{ padding: "8px 12px", textAlign: "left", color: "#888", fontWeight: 600 }}>#</th>
                {headers.slice(0, 6).map(h => (
                  <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#888", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                ))}
                {headers.length > 6 && <th style={{ padding: "8px 12px", color: "#bbb", fontWeight: 600 }}>+{headers.length - 6} more</th>}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < preview.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                  <td style={{ padding: "8px 12px", color: "#bbb" }}>{i + 1}</td>
                  {headers.slice(0, 6).map(h => (
                    <td key={h} style={{ padding: "8px 12px", color: "#333", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {row[h] || <span style={{ color: "#ddd" }}>—</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length > 5 && (
          <div style={{ borderTop: "1px solid #f0f0f0", background: "#fafafa" }}>
            <button onClick={() => setShowAll(p => !p)} className="w-full py-2.5 text-xs font-semibold" style={{ color: "#e8836a" }}>
              {showAll ? "Show less" : `Show all ${rows.length} rows`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const NewCampaignPage = () => {
  const router = useRouter();
  const [wizardStep,   setWizardStep]   = useState<WizardStep>("audience");
  const [audienceMode, setAudienceMode] = useState<AudienceMode>("url");

  const [currentUserName,  setCurrentUserName]  = useState("Loading...");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
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
    // Fallback keys
    const name  = localStorage.getItem("user_name")  || localStorage.getItem("user_email")?.split("@")[0] || "User";
    const email = localStorage.getItem("user_email") || "";
    setCurrentUserName(name);
    setCurrentUserEmail(email);
  }, []);

  // Audience fields
  const [searchUrl,    setSearchUrl]    = useState("");
  const [maxLeads,     setMaxLeads]     = useState(500);
  const [campaignName, setCampaignName] = useState("");
  const [options, setOptions] = useState({
    excludeNoPhoto: true, excludeFirstDegree: true,
    premiumOnly: false,   openProfiles: false,
  });

  // CSV state
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows,    setCsvRows]    = useState<Record<string, string>[]>([]);

  // Sequence
  const [steps, setSteps] = useState<Record<string, CampaignStep>>({
    step1: {
      id: "step1", type: "Connection request", delay: 0,
      content: "Hi {{name}}, I'd love to connect and learn more about your work at {{company}}!",
    },
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
      if (audienceMode === "url") return searchUrl.trim().length > 0;
      if (audienceMode === "csv") return csvRows.length > 0;
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
      id:        Math.random().toString(36).substring(7),
      name:      campaignName,
      status:    "Active",
      createdAt: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
      leads:     audienceMode === "csv" ? csvRows.length : maxLeads,
      connections: 0, accepted: 0, visits: 0, likes: 0, endorse: 0,
      messages: mainSequence.filter(sid =>
        steps[sid]?.type.includes("Message") || steps[sid]?.type.includes("request")
      ).length,
      replied: 0,
      audienceMode,
      searchUrl:      audienceMode === "url" ? searchUrl : "",
      csvLeads:       audienceMode === "csv" ? csvRows.map(normaliseRow) : [],
      csvHeaders,
      linkedinAccount: currentUserName,  
      linkedinEmail:   currentUserEmail, 
      flowSteps: flowStepsMap,
      flowRoot:  mainSequence,
    };

    const existing = JSON.parse(localStorage.getItem("custom_campaigns") || "[]");
    localStorage.setItem("custom_campaigns", JSON.stringify([newCampaign, ...existing]));
    router.push("/dashboard/campaigns");
  };


  return (
    <div className="flex flex-col h-screen overflow-hidden"
      style={{ background: "#f0f0f0", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      
      <header className="shrink-0 flex items-center justify-between px-6 border-b"
        style={{ height: 60, background: "#fff", borderColor: "#e5e5e5" }}>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/dashboard/campaigns")}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all hover:bg-gray-100"
            style={{ color: "#888" }}>
            <X size={18} />
          </button>
          <div className="w-px h-5" style={{ background: "#e5e5e5" }} />
          <span className="text-sm font-semibold" style={{ color: "#333" }}>
            {campaignName || "New Campaign"}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {WIZARD_STEPS.map((s, i) => {
            const status = wizardStep === s.id ? "active" : currentIdx > i ? "done" : "pending";
            return (
              <button key={s.id}
                onClick={() => { if (status === "done") setWizardStep(s.id); }}
                disabled={status === "pending"}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  background: status === "active" ? "#fef3f0" : status === "done" ? "#f5f5f5" : "transparent",
                  color:      status === "active" ? "#e8836a" : status === "done" ? "#888"    : "#bbb",
                  border:     status === "active" ? "1px solid #f5c5b5" : "1px solid transparent",
                  cursor:     status === "pending" ? "default" : "pointer",
                }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                  style={{
                    background: status === "active" ? "#e8836a" : status === "done" ? "#10b981" : "#e5e5e5",
                    color: "#fff",
                  }}>
                  {status === "done" ? <Check size={10} strokeWidth={3} /> : i + 1}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {wizardStep !== "audience" && (
            <button onClick={() => setWizardStep(orderList[currentIdx - 1])}
              className="h-9 px-4 rounded-full text-xs font-semibold"
              style={{ background: "#f5f5f5", color: "#555", border: "1px solid #e5e5e5" }}>
              Back
            </button>
          )}
          <button onClick={handleNext} disabled={!canContinue()}
            className="h-9 px-5 rounded-full text-xs font-bold flex items-center gap-2"
            style={{
              background: canContinue() ? "#e8836a" : "#f5d5cc",
              color: "#fff", cursor: canContinue() ? "pointer" : "not-allowed",
            }}>
            {wizardStep === "finalize" ? "Launch Campaign" : "Continue"}
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-hidden flex">
        <AnimatePresence mode="wait">

          {wizardStep === "audience" && (
            <motion.div key="audience"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }} className="flex-1 overflow-y-auto" style={{ background: "#f0f0f0" }}>
              <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#e8836a" }}>Step 1 of 4</p>
                  <h2 className="text-2xl font-bold" style={{ color: "#111" }}>Set up your audience</h2>
                  <p className="text-sm mt-1" style={{ color: "#888" }}>Choose how you want to import your leads.</p>
                </div>

    
                <div className="rounded-2xl p-6 space-y-3" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <h3 className="text-sm font-semibold" style={{ color: "#333" }}>LinkedIn Account</h3>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
                    <div className="flex items-center gap-3">
                      {currentUserAvatar ? (
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                          <img src={currentUserAvatar} alt="" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: "#e8836a" }}>
                          {currentUserName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold" style={{ color: "#333" }}>{currentUserName}</p>
                        {currentUserEmail && (
                          <p className="text-[11px]" style={{ color: "#aaa" }}>{currentUserEmail}</p>
                        )}
                      </div>
                    </div>
                    <ChevronDown size={16} style={{ color: "#888" }} />
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <div className="flex border-b" style={{ borderColor: "#f0f0f0" }}>
                    {[
                      { id: "url", label: "LinkedIn Search URL", icon: LinkIcon, desc: "Extract from LinkedIn search" },
                      { id: "csv", label: "Upload CSV File",     icon: Table2,   desc: "Import your own leads list"  },
                    ].map(tab => (
                      <button key={tab.id}
                        onClick={() => setAudienceMode(tab.id as AudienceMode)}
                        className="flex-1 flex items-center gap-3 px-5 py-4 text-left transition-all"
                        style={{
                          background:   audienceMode === tab.id ? "#fff" : "#f8f8f8",
                          borderBottom: audienceMode === tab.id ? "2px solid #e8836a" : "2px solid transparent",
                        }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: audienceMode === tab.id ? "#fef3f0" : "#f0f0f0", color: audienceMode === tab.id ? "#e8836a" : "#aaa" }}>
                          <tab.icon size={15} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: audienceMode === tab.id ? "#111" : "#888" }}>{tab.label}</p>
                          <p className="text-[11px]" style={{ color: "#aaa" }}>{tab.desc}</p>
                        </div>
                        {audienceMode === tab.id && (
                          <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center" style={{ background: "#e8836a" }}>
                            <Check size={11} color="#fff" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    {audienceMode === "url" && (
                      <motion.div key="url" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold" style={{ color: "#333" }}>LinkedIn Search URL</h3>
                            <p className="text-xs mt-0.5" style={{ color: "#888" }}>Paste a LinkedIn People Search or Sales Navigator URL</p>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold" style={{ background: "#fef3f0", color: "#e8836a" }}>
                            <Info size={11} /> Required
                          </div>
                        </div>
                        <div className="relative">
                          <LinkIcon size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "#bbb" }} />
                          <input value={searchUrl} onChange={e => setSearchUrl(e.target.value)}
                            placeholder="https://www.linkedin.com/search/results/people/..."
                            className="w-full h-12 pl-10 pr-4 rounded-xl text-sm font-medium focus:outline-none transition-all"
                            style={{ background: "#f8f8f8", border: searchUrl ? "1px solid #e8836a" : "1px solid #e5e5e5", color: "#333" }} />
                        </div>
                        {searchUrl && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium" style={{ background: "#ecfdf5", color: "#10b981" }}>
                            <CheckCircle2 size={13} /> URL looks valid — ready to extract leads
                          </div>
                        )}
                        <div className="pt-2 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold" style={{ color: "#333" }}>Max Prospects</p>
                              <p className="text-xs" style={{ color: "#aaa" }}>How many leads to extract</p>
                            </div>
                            <span className="text-2xl font-bold tabular-nums" style={{ color: "#e8836a" }}>{maxLeads}</span>
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
                          <div className="flex justify-between text-[11px] font-medium" style={{ color: "#bbb" }}>
                            <span>10 leads</span><span>1,000 leads</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {audienceMode === "csv" && (
                      <motion.div key="csv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 space-y-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-sm font-semibold" style={{ color: "#333" }}>Upload your leads CSV</h3>
                            <p className="text-xs mt-0.5" style={{ color: "#888" }}>Include: first_name, last_name, email, linkedin_url, company</p>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold" style={{ background: "#fef3f0", color: "#e8836a" }}>
                            <Info size={11} /> Required
                          </div>
                        </div>
                        {csvRows.length === 0 ? (
                          <CSVUploadZone onParsed={(h, r) => { setCsvHeaders(h); setCsvRows(r); }} />
                        ) : (
                          <CSVPreview headers={csvHeaders} rows={csvRows} onClear={() => { setCsvHeaders([]); setCsvRows([]); }} />
                        )}
                        {csvRows.length === 0 && (
                          <div className="rounded-xl p-4" style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
                            <p className="text-xs font-semibold mb-2" style={{ color: "#555" }}>Supported columns:</p>
                            <div className="grid grid-cols-2 gap-1">
                              {[
                                ["first_name / last_name", "Contact name"],
                                ["email", "Email address"],
                                ["linkedin_url", "LinkedIn profile URL"],
                                ["company", "Company name"],
                                ["job_title / title", "Job position"],
                                ["full_name", "Full name (alternative)"],
                              ].map(([col, desc]) => (
                                <div key={col} className="flex items-start gap-2">
                                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "#e8836a15", color: "#e8836a", marginTop: 1 }}>{col}</span>
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

            
                {audienceMode === "url" && (
                  <div className="rounded-2xl p-6 space-y-3" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                    <h3 className="text-sm font-semibold mb-1" style={{ color: "#333" }}>Filters</h3>
                    {[
                      { id: "excludeNoPhoto",     label: "Profiles with photos only",   sub: "Skip profiles without a profile picture" },
                      { id: "excludeFirstDegree", label: "Skip 1st degree connections", sub: "Only target people you're not connected with" },
                      { id: "premiumOnly",        label: "LinkedIn Premium only",        sub: "Target only premium members" },
                      { id: "openProfiles",       label: "Open profiles only",           sub: "Message without a connection request" },
                    ].map(opt => {
                      const val = options[opt.id as keyof typeof options];
                      return (
                        <div key={opt.id}
                          className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all"
                          style={{ background: val ? "#fef3f0" : "#f8f8f8", border: val ? "1px solid #f5c5b5" : "1px solid #e5e5e5" }}
                          onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}>
                          <div>
                            <p className="text-xs font-semibold" style={{ color: val ? "#e8836a" : "#555" }}>{opt.label}</p>
                            <p className="text-[11px] mt-0.5" style={{ color: "#aaa" }}>{opt.sub}</p>
                          </div>
                          <div className="w-10 h-6 rounded-full relative shrink-0 transition-all duration-300" style={{ background: val ? "#e8836a" : "#ddd" }}>
                            <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-300" style={{ left: val ? 22 : 4 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {wizardStep === "sequence" && (
            <motion.div key="sequence"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }} className="flex-1 overflow-hidden flex" style={{ background: "#f0f0f0" }}>
              <div className="w-72 shrink-0 overflow-y-auto border-r flex flex-col" style={{ background: "#fff", borderColor: "#e5e5e5" }}>
                <div className="p-5 border-b" style={{ borderColor: "#f0f0f0" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#e8836a" }}>Step 2 of 4</p>
                  <h3 className="text-base font-bold" style={{ color: "#111" }}>Build Sequence</h3>
                  <p className="text-xs mt-1" style={{ color: "#888" }}>Click an action to add it to your flow</p>
                </div>
                <div className="p-4 space-y-2">
                  {STEP_TEMPLATES.map(tmpl => {
                    const Icon = tmpl.icon;
                    return (
                      <button key={tmpl.type} onClick={() => addStep(tmpl.type)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all"
                        style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = tmpl.color; (e.currentTarget as HTMLElement).style.background = tmpl.bg; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5"; (e.currentTarget as HTMLElement).style.background = "#f8f8f8"; }}>
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: tmpl.bg, color: tmpl.color }}>
                          <Icon size={16} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-semibold truncate" style={{ color: "#333" }}>{tmpl.type}</p>
                          <p className="text-[11px] truncate" style={{ color: "#aaa" }}>{tmpl.description}</p>
                        </div>
                        <Plus size={14} className="ml-auto shrink-0" style={{ color: "#ccc" }} />
                      </button>
                    );
                  })}
                </div>
                <div className="mt-auto mx-4 mb-4 p-4 rounded-xl" style={{ background: "#fef3f0", border: "1px solid #f5c5b5" }}>
                  <p className="text-[11px] font-semibold mb-2" style={{ color: "#e8836a" }}>Sequence Summary</p>
                  <div className="space-y-1">
                    {[
                      ["Total steps",    mainSequence.length],
                      ["Total duration", mainSequence.reduce((s, sid) => s + (steps[sid]?.delay ?? 0), 0) + " days"],
                      ["Messages",       mainSequence.filter(sid => steps[sid]?.type.includes("Message") || steps[sid]?.type.includes("request")).length],
                    ].map(([label, val]) => (
                      <div key={String(label)} className="flex justify-between text-xs" style={{ color: "#888" }}>
                        <span>{label}</span>
                        <span className="font-bold" style={{ color: "#333" }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 flex flex-col items-center">
                <div className="px-5 py-2 rounded-full text-xs font-bold" style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#888" }}>
                  ▶ Workflow Start
                </div>
                {mainSequence.length === 0 && (
                  <div className="mt-8 flex flex-col items-center gap-3 text-center" style={{ color: "#bbb" }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "#fff", border: "2px dashed #e5e5e5" }}>
                      <Plus size={24} />
                    </div>
                    <p className="text-sm font-medium">Add your first action from the left panel</p>
                  </div>
                )}
                {mainSequence.map((sid, idx) => {
                  const step = steps[sid]; if (!step) return null;
                  const Icon = getStepIcon(step.type);
                  const color = getStepColor(step.type);
                  const bg = getStepBg(step.type);
                  return (
                    <div key={sid} className="w-full flex flex-col items-center" style={{ maxWidth: 560 }}>
                      <div className="flex flex-col items-center py-1">
                        <div className="w-px" style={{ height: 20, background: "#ddd" }} />
                        {idx > 0 && (
                          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold" style={{ background: "#fff", border: "1px solid #e5e5e5", color: "#888" }}>
                            <Clock size={11} /> Wait {step.delay} day{step.delay !== 1 ? "s" : ""}
                          </div>
                        )}
                        <div className="w-px" style={{ height: 20, background: "#ddd" }} />
                      </div>
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        className="w-full rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #f5f5f5" }}>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: bg, color }}>
                              <Icon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: "#111" }}>{step.type}</p>
                              <p className="text-[11px]" style={{ color: "#aaa" }}>Step {idx + 1}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#555" }}>
                              <Clock size={12} style={{ color: "#e8836a" }} />
                              {idx === 0 ? (
                                <span style={{ color: "#888" }}>Immediately</span>
                              ) : (
                                <>
                                  <span style={{ color: "#888" }}>After</span>
                                  <input type="number" min={1} max={30} value={step.delay}
                                    onChange={e => updateStep(sid, { delay: Math.max(1, parseInt(e.target.value) || 1) })}
                                    className="w-8 text-center bg-transparent focus:outline-none font-bold" style={{ color: "#e8836a" }} />
                                  <span style={{ color: "#888" }}>day(s)</span>
                                </>
                              )}
                            </div>
                            <button onClick={() => removeStep(sid)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all" style={{ color: "#ccc" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ef4444"; (e.currentTarget as HTMLElement).style.background = "#fef2f2"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#ccc"; (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                        {(step.type.includes("Message") || step.type === "Connection request") && (
                          <div className="px-5 py-4 space-y-3">
                            <textarea value={step.content} onChange={e => updateStep(sid, { content: e.target.value })}
                              placeholder="Write your personalized message here..." rows={3}
                              className="w-full px-4 py-3 rounded-xl text-sm resize-none focus:outline-none transition-all"
                              style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#333", lineHeight: 1.6 }}
                              onFocus={e => { e.target.style.borderColor = "#e8836a"; e.target.style.background = "#fff"; }}
                              onBlur={e  => { e.target.style.borderColor = "#e5e5e5"; e.target.style.background = "#f8f8f8"; }} />
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-medium" style={{ color: "#aaa" }}>Variables:</span>
                              {["{{name}}", "{{company}}", "{{industry}}", "{{title}}"].map(tag => (
                                <button key={tag} onClick={() => updateStep(sid, { content: (step.content || "") + tag })}
                                  className="px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all"
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
                  <div className="flex flex-col items-center mt-2">
                    <div className="w-px" style={{ height: 24, background: "#ddd" }} />
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
            </motion.div>
          )}

          {wizardStep === "review" && (
            <motion.div key="review"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }} className="flex-1 overflow-y-auto" style={{ background: "#f0f0f0" }}>
              <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#e8836a" }}>Step 3 of 4</p>
                  <h2 className="text-2xl font-bold" style={{ color: "#111" }}>Review your campaign</h2>
                  <p className="text-sm mt-1" style={{ color: "#888" }}>Everything looks good? Click Continue to name and launch.</p>
                </div>
                <div className="rounded-2xl p-6 space-y-3" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold" style={{ color: "#333" }}>Audience</h3>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                      style={{ background: audienceMode === "csv" ? "#ecfdf5" : "#eff6ff", color: audienceMode === "csv" ? "#10b981" : "#3b82f6" }}>
                      {audienceMode === "csv" ? "📄 CSV Import" : "🔗 LinkedIn URL"}
                    </span>
                  </div>
                  {audienceMode === "url" ? (
                    <>
                      {[
                        { label: "LinkedIn account", value: currentUserName },
                        { label: "Email",            value: currentUserEmail || "—" },
                        { label: "Max prospects",    value: maxLeads.toString() },
                        { label: "Search URL",       value: searchUrl || "—" },
                        { label: "Active filters",   value: Object.values(options).filter(Boolean).length + " enabled" },
                      ].map(row => (
                        <div key={row.label} className="flex justify-between text-sm">
                          <span style={{ color: "#888" }}>{row.label}</span>
                          <span className="font-medium max-w-[220px] truncate" style={{ color: "#333" }}>{row.value}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between text-sm"><span style={{ color: "#888" }}>Account</span><span className="font-medium" style={{ color: "#333" }}>{currentUserName}</span></div>
                      <div className="flex justify-between text-sm"><span style={{ color: "#888" }}>Total leads</span><span className="font-bold" style={{ color: "#e8836a" }}>{csvRows.length.toLocaleString()} leads</span></div>
                      <div className="flex justify-between text-sm"><span style={{ color: "#888" }}>Columns</span><span className="font-medium" style={{ color: "#333" }}>{csvHeaders.length} columns</span></div>
                    </>
                  )}
                </div>
                <div className="rounded-2xl p-6 space-y-4" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold" style={{ color: "#333" }}>Sequence ({mainSequence.length} steps)</h3>
                    <button onClick={() => setWizardStep("sequence")} className="text-xs font-semibold" style={{ color: "#e8836a" }}>Edit</button>
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 py-1.5 rounded-full text-xs font-medium self-start" style={{ background: "#f8f8f8", border: "1px solid #e5e5e5", color: "#888" }}>Start</div>
                    {mainSequence.map((sid, idx) => {
                      const step = steps[sid]; if (!step) return null;
                      const Icon = getStepIcon(step.type);
                      const color = getStepColor(step.type);
                      const bg = getStepBg(step.type);
                      return (
                        <div key={sid} className="w-full flex gap-4 mt-3 items-start">
                          <div className="flex flex-col items-center shrink-0 w-10">
                            {idx > 0 && <div className="w-px" style={{ height: 16, background: "#e5e5e5", marginBottom: 4 }} />}
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg, color }}><Icon size={16} /></div>
                          </div>
                          <div className="flex-1 pt-1">
                            <p className="text-sm font-semibold" style={{ color: "#222" }}>{step.type}</p>
                            {step.content && <p className="text-xs mt-0.5 line-clamp-1" style={{ color: "#aaa" }}>{step.content}</p>}
                            {idx > 0 && <p className="text-[11px] mt-1" style={{ color: "#e8836a" }}>+{step.delay} day{step.delay !== 1 ? "s" : ""} delay</p>}
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex items-center gap-2 mt-4 self-start px-4 py-2 rounded-xl" style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", color: "#10b981" }}>
                      <CheckCircle2 size={14} /> <span className="text-xs font-semibold">End of sequence</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {wizardStep === "finalize" && (
            <motion.div key="finalize"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.22 }} className="flex-1 overflow-y-auto" style={{ background: "#f0f0f0" }}>
              <div className="max-w-xl mx-auto px-6 py-10 space-y-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#10b981" }}>Step 4 of 4</p>
                  <h2 className="text-2xl font-bold" style={{ color: "#111" }}>Name & launch</h2>
                  <p className="text-sm mt-1" style={{ color: "#888" }}>Give your campaign a name and you're ready to go.</p>
                </div>
                <div className="rounded-2xl p-6 space-y-3" style={{ background: "#fff", border: "1px solid #e5e5e5" }}>
                  <label className="text-sm font-semibold block" style={{ color: "#333" }}>
                    Campaign Name <span style={{ color: "#e8836a" }}>*</span>
                  </label>
                  <input value={campaignName} onChange={e => setCampaignName(e.target.value)}
                    placeholder="e.g. Recruiters Q2, SaaS Founders Outreach..."
                    className="w-full h-12 px-4 rounded-xl text-sm font-medium focus:outline-none transition-all"
                    style={{ background: "#f8f8f8", border: campaignName ? "1px solid #e8836a" : "1px solid #e5e5e5", color: "#333" }}
                    onFocus={e => { e.target.style.background = "#fff"; }}
                    onBlur={e  => { e.target.style.background = "#f8f8f8"; }} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Prospects", value: (audienceMode === "csv" ? csvRows.length : maxLeads).toLocaleString(), color: "#e8836a", bg: "#fef3f0" },
                    { label: "Steps",     value: mainSequence.length,                                                   color: "#7c6ff7", bg: "#f3f2ff" },
                    { label: "Duration",  value: mainSequence.reduce((s, sid) => s + (steps[sid]?.delay ?? 0), 0) + "d", color: "#10b981", bg: "#ecfdf5" },
                  ].map(c => (
                    <div key={c.label} className="rounded-2xl p-5 text-center" style={{ background: c.bg, border: `1px solid ${c.color}22` }}>
                      <p className="text-2xl font-bold" style={{ color: c.color }}>{c.value}</p>
                      <p className="text-xs font-medium mt-1" style={{ color: "#888" }}>{c.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#f8f8f8", border: "1px solid #e5e5e5" }}>
                  {audienceMode === "csv" ? (
                    <><FileText size={15} style={{ color: "#10b981" }} />
                      <span className="text-xs font-medium" style={{ color: "#555" }}>
                        Source: <strong style={{ color: "#10b981" }}>CSV file</strong> — {csvRows.length.toLocaleString()} leads ready
                      </span></>
                  ) : (
                    <><LinkIcon size={15} style={{ color: "#3b82f6" }} />
                      <span className="text-xs font-medium" style={{ color: "#555" }}>
                        Source: <strong style={{ color: "#3b82f6" }}>LinkedIn URL</strong> — up to {maxLeads} leads
                      </span></>
                  )}
                </div>
                <button onClick={handleLaunch} disabled={!campaignName.trim()}
                  className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-sm font-bold text-white transition-all"
                  style={{
                    background: campaignName.trim() ? "#e8836a" : "#f5d5cc",
                    cursor: campaignName.trim() ? "pointer" : "not-allowed",
                    boxShadow: campaignName.trim() ? "0 8px 24px rgba(232,131,106,0.3)" : "none",
                  }}>
                  <Zap size={18} /> Launch Campaign
                </button>
                <p className="text-center text-xs" style={{ color: "#bbb" }}>
                  Your campaign will start running immediately after launch.
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      <div className="md:hidden shrink-0 flex items-center justify-between px-5 py-3 border-t"
        style={{ background: "#fff", borderColor: "#e5e5e5" }}>
        <div className="flex gap-1">
          {WIZARD_STEPS.map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full"
              style={{ background: currentIdx === i ? "#e8836a" : currentIdx > i ? "#10b981" : "#e5e5e5" }} />
          ))}
        </div>
        <button onClick={handleNext} disabled={!canContinue()}
          className="h-10 px-5 rounded-full text-xs font-bold flex items-center gap-2 text-white"
          style={{ background: canContinue() ? "#e8836a" : "#f5d5cc" }}>
          {wizardStep === "finalize" ? "Launch" : "Continue"} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default NewCampaignPage;