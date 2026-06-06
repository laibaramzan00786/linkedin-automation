
'use client';
import { useState, useRef, useEffect } from "react";
import {
  X, Search, Plus, Check, ChevronDown,
  Users, MapPin, Building2, GraduationCap,
  Globe2, Tag, UserCheck, SlidersHorizontal, Briefcase,
} from "lucide-react";

export type SectionId =
  | "connections" | "hiring" | "locations" | "company"
  | "connOf" | "followers" | "past" | "school"
  | "industry" | "lang" | "openTo" | "services" | "keywords";

export interface KWFilters {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  school: string;
}

export interface LIFilters {
  connections: string[];
  hiring: string[];
  locations: string[];
  company: string[];
  connOf: string[];
  followers: string[];
  past: string[];
  school: string[];
  industry: string[];
  lang: string[];
  openTo: string[];
  services: string[];
  keywords: KWFilters;
}

export const defaultLIFilters = (): LIFilters => ({
  connections: [], hiring: [], locations: [], company: [],
  connOf: [], followers: [], past: [], school: [],
  industry: [], lang: [], openTo: [], services: [],
  keywords: { firstName: "", lastName: "", title: "", company: "", school: "" },
});

const SECTIONS: {
  id: SectionId;
  label: string;
  icon: React.ElementType;
  opts?: string[];
  multi?: boolean;
  hasAdd?: boolean;
  addLabel?: string;       
  isKw?: boolean;
}[] = [
  {
    id: "connections", label: "Connections", icon: Users,
    opts: ["1st", "2nd", "3rd+"], multi: false,
  },
  {
    id: "locations", label: "Locations", icon: MapPin,
    opts: [
      "Pakistan", "India", "Punjab, Pakistan", "United States", "Sindh, Pakistan",
      "United Kingdom", "Canada", "Australia", "Germany", "UAE",
      "Saudi Arabia", "Bangladesh", "Sri Lanka", "Nepal", "Singapore",
      "Malaysia", "Turkey", "France", "Netherlands", "Sweden",
    ],
    multi: true, hasAdd: true, addLabel: "Add a location",
  },
  {
    id: "company", label: "Current company", icon: Building2,
    opts: [
      "LinkedIn", "Microsoft", "Confidential", "Upwork", "Amazon",
      "Google", "Meta", "Apple", "Netflix", "Uber",
      "Grab", "Careem", "Systems Limited", "10Pearls", "Arbisoft",
      "Netsol Technologies", "Techlogix", "Ignite", "Teradata", "Oracle",
    ],
    multi: true, hasAdd: true, addLabel: "Add a company",
  },
  {
    id: "connOf", label: "Connections of", icon: UserCheck,
    opts: [],
    multi: true, hasAdd: true, addLabel: "Add a connection",
  },
  {
    id: "followers", label: "Followers of", icon: UserCheck,
    opts: [],
    multi: true, hasAdd: true, addLabel: "Add a creator",
  },
  {
    id: "past", label: "Past company", icon: Building2,
    opts: [
      "Microsoft", "Amazon", "IBM", "Deloitte", "Google",
      "PwC", "KPMG", "Ernst & Young", "Accenture", "McKinsey",
      "Siemens", "Oracle", "SAP", "Cisco", "HP",
    ],
    multi: true, hasAdd: true, addLabel: "Add a company",
  },
  {
    id: "school", label: "School", icon: GraduationCap,
    opts: [
      "Karachi University", "University of the Punjab", "Iqra University",
      "Bahria University", "IoBM", "FAST NUCES", "LUMS", "IBA Karachi",
      "NED University", "COMSATS University", "Quaid-i-Azam University",
      "Air University", "University of Engineering & Technology",
      "Lahore University of Management Sciences", "Riphah International University",
    ],
    multi: true, hasAdd: true, addLabel: "Add a school",
  },
  {
    id: "industry", label: "Industry", icon: Tag,
    opts: [
      "Professional Services", "Technology, Information and Media", "Software Development",
      "Business Consulting and Services", "Financial Services", "Healthcare",
      "Education", "Manufacturing", "Retail", "Transportation & Logistics",
      "Real Estate", "Energy & Mining", "Telecommunications", "Marketing & Advertising",
    ],
    multi: true, hasAdd: true, addLabel: "Add an industry",
  },
  {
    id: "lang", label: "Profile language", icon: Globe2,
    opts: [
      "English", "Urdu", "Arabic", "Spanish", "Portuguese",
      "French", "Hindi", "Turkish", "German", "Chinese",
      "Japanese", "Korean", "Russian", "Italian",
    ],
    multi: true,
  },
  {
    id: "openTo", label: "Open to", icon: Check,
    opts: [
      "Volunteering", "Job offers", "Freelance projects",
      "Consulting", "Mentoring", "Co-founding",
    ],
    multi: true,
  },
  {
    id: "services", label: "Service categories", icon: Briefcase,
    opts: [
      "Consulting", "Coaching & Mentoring", "Operations", "HR Consulting",
      "Human Resources (HR)", "Software Development", "Digital Marketing",
      "Accounting", "Legal Services", "Design Services",
      "Writing & Editing", "Project Management", "Data Analytics", "IT Support",
    ],
    multi: true, hasAdd: true, addLabel: "Add a service",
  },
  {
    id: "keywords", label: "Keywords", icon: Search, isKw: true,
  },
];

const KW_FIELDS: { key: keyof KWFilters; label: string; placeholder: string }[] = [
  { key: "firstName", label: "First name",  placeholder: ""    },
  { key: "lastName",  label: "Last name",   placeholder: ""   },
  { key: "title",     label: "Title",       placeholder: ""    },
  { key: "company",   label: "Company",     placeholder: "" },
  { key: "school",    label: "School",      placeholder: ""   },
];

export const countSection = (filters: LIFilters, id: SectionId): number =>
  id === "keywords"
    ? Object.values(filters.keywords).filter(v => v.trim()).length
    : (filters[id] as string[]).length;

export const totalCount = (filters: LIFilters): number =>
  SECTIONS.reduce((n, s) => n + countSection(filters, s.id), 0);

const T = {
  accent:      "#e8836a",
  accentLight: "#fef3f0",
  accentBorder:"#f5c5b5",
  accentHover: "#d4714a",
  border:      "#e5e5e5",
  bg:          "#f8f8f8",
  text:        "#333",
  muted:       "#888",
  faint:       "#aaa",
};

const InlineSearchAdd = ({
  allOpts,
  selected,
  addLabel,
  onSelect,
}: {
  allOpts: string[];
  selected: string[];
  addLabel: string;
  onSelect: (val: string) => void;
}) => {
  const [active, setActive]   = useState(false);
  const [query, setQuery]     = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activate = () => {
    setActive(true);
    setTimeout(() => { inputRef.current?.focus(); setFocused(true); }, 30);
  };

  const suggestions = query.trim()
    ? allOpts.filter(o =>
        o.toLowerCase().includes(query.toLowerCase()) && !selected.includes(o)
      )
    : allOpts.filter(o => !selected.includes(o)).slice(0, 8);

  const pick = (val: string) => {
    onSelect(val);
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query.trim()) {
      const match = suggestions[0];
      if (match) pick(match);
      else { onSelect(query.trim()); setQuery(""); }
    }
    if (e.key === "Escape") { setActive(false); setQuery(""); setFocused(false); }
  };

  if (!active) {
    return (
      <button
        onClick={activate}
        style={{
          display: "flex", alignItems: "center", gap: 6,
          background: "none", border: "none", cursor: "pointer",
          color: T.accent, fontSize: 13, fontWeight: 500,
          padding: "6px 4px", borderRadius: 6,
          fontFamily: "inherit",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = T.accentHover)}
        onMouseLeave={e => (e.currentTarget.style.color = T.accent)}
      >
        <Plus size={14} /> {addLabel}
      </button>
    );
  }

  return (
    <div ref={wrapRef} style={{ position: "relative", marginTop: 6 }}>
     
      <input
        ref={inputRef}
        value={query}
        onChange={e => { setQuery(e.target.value); setFocused(true); }}
        onFocus={() => setFocused(true)}
        onKeyDown={handleKey}
        placeholder={addLabel}
        style={{
          width: "100%", height: 36, padding: "0 12px",
          border: `1.5px solid ${T.accent}`, borderRadius: 10,
          fontSize: 13, color: T.text, outline: "none",
          background: "#fff", fontFamily: "inherit",
          boxSizing: "border-box",
        }}
      />

      {focused && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "#fff", border: `1px solid ${T.border}`,
          borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
          zIndex: 10, maxHeight: 200, overflowY: "auto",
        }}>
          {suggestions.map(opt => (
            <div
              key={opt}
              onMouseDown={e => { e.preventDefault(); pick(opt); }}
              style={{
                padding: "9px 14px", fontSize: 13, cursor: "pointer",
                color: T.text, transition: "background 0.1s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T.accentLight)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
            >
              {opt}
            </div>
          ))}
          {query.trim() && !allOpts.some(o => o.toLowerCase() === query.toLowerCase()) && (
            <div
              onMouseDown={e => { e.preventDefault(); onSelect(query.trim()); setQuery(""); }}
              style={{
                padding: "9px 14px", fontSize: 13, cursor: "pointer",
                color: T.accent, fontWeight: 500,
                borderTop: `1px solid ${T.border}`,
                display: "flex", alignItems: "center", gap: 6,
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T.accentLight)}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "#fff")}
            >
              <Plus size={12} /> Add "{query.trim()}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SelectedTags = ({
  selected,
  onRemove,
}: {
  selected: string[];
  onRemove: (val: string) => void;
}) => {
  if (selected.length === 0) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
      {selected.map(val => (
        <span
          key={val}
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: T.accentLight, border: `1px solid ${T.accentBorder}`,
            borderRadius: 20, padding: "3px 10px",
            fontSize: 11, color: "#c05a3a", fontWeight: 500,
          }}
        >
          {val}
          <X size={11} style={{ cursor: "pointer", flexShrink: 0 }} onClick={() => onRemove(val)} />
        </span>
      ))}
    </div>
  );
};

const Section = ({
  sec,
  filters,
  extra,
  onChange,
  onExtraAdd,
}: {
  sec: typeof SECTIONS[0];
  filters: LIFilters;
  extra: Record<SectionId, string[]>;
  onChange: (f: LIFilters) => void;
  onExtraAdd: (id: SectionId, val: string) => void;
}) => {
  const [open, setOpen] = useState(true);

  const Icon  = sec.icon;
  const count = countSection(filters, sec.id);

  const toggle = (val: string) => {
    if (sec.id === "keywords") return;
    const arr  = filters[sec.id] as string[];
    const next = arr.includes(val)
      ? arr.filter(v => v !== val)
      : sec.multi ? [...arr, val] : [val];
    onChange({ ...filters, [sec.id]: next });
  };

  const removeSelected = (val: string) => {
    const arr = filters[sec.id] as string[];
    onChange({ ...filters, [sec.id]: arr.filter(v => v !== val) });
  };

  const handleAddNew = (val: string) => {
    onExtraAdd(sec.id, val);
    const arr = filters[sec.id] as string[];
    if (!arr.includes(val)) onChange({ ...filters, [sec.id]: [...arr, val] });
  };

  const allOpts  = [...(sec.opts ?? []), ...(extra[sec.id] ?? [])];
  const selected = sec.id !== "keywords" ? (filters[sec.id] as string[]) : [];

  const presetOpts = allOpts
  .filter(o => !selected.includes(o))
  .slice(0, 5);

  return (
    <div style={{ borderBottom: `1px solid ${T.border}` }}>

      <button
        onClick={() => setOpen(p => !p)}
        style={{
          width: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "12px 20px",
          background: "none", border: "none", cursor: "pointer",
          textAlign: "left", transition: "background 0.12s",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T.accentLight)}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: count > 0 ? T.accentLight : T.bg,
            border: `1px solid ${count > 0 ? T.accentBorder : T.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "all 0.15s",
          }}>
            <Icon size={13} style={{ color: count > 0 ? T.accent : T.muted }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, color: T.text }}>{sec.label}</span>
          {count > 0 && (
            <span style={{
              fontSize: 10, fontWeight: 700, padding: "2px 7px",
              borderRadius: 10, background: T.accent, color: "#fff",
            }}>
              {count}
            </span>
          )}
        </div>
        <ChevronDown
          size={14}
          style={{
            color: T.faint,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        />
      </button>

      {open && (
        <div style={{ padding: "2px 20px 14px 20px" }}>

          {sec.isKw ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {KW_FIELDS.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4, fontWeight: 500 }}>
                    {label}
                  </label>
                  <input
                    value={filters.keywords[key]}
                    onChange={e => onChange({ ...filters, keywords: { ...filters.keywords, [key]: e.target.value } })}
                    placeholder={placeholder}
                    style={{
                      width: "100%", height: 32, padding: "0 10px",
                      borderRadius: 8,
                      border: filters.keywords[key] ? `1.5px solid ${T.accent}` : `1px solid ${T.border}`,
                      fontSize: 12, color: T.text, outline: "none",
                      background: T.bg, fontFamily: "inherit",
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <>
              <SelectedTags selected={selected} onRemove={removeSelected} />

              {presetOpts.length > 0 && (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: sec.opts && sec.opts.length > 3 ? "1fr 1fr" : "1fr",
                  gap: "2px 8px",
                  marginBottom: sec.hasAdd ? 4 : 0,
                }}>
                  {presetOpts.map(opt => {
                    const on = selected.includes(opt);
                    return (
                      <div
                        key={opt}
                        onClick={() => toggle(opt)}
                        style={{
                          display: "flex", alignItems: "center", gap: 9,
                          padding: "7px 6px", cursor: "pointer", borderRadius: 8,
                          transition: "background 0.1s",
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T.accentLight)}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
                      >
                        <div style={{
                          width: 17, height: 17, borderRadius: 4, flexShrink: 0,
                          border: on ? "none" : `1.5px solid ${T.border}`,
                          background: on ? T.accent : "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all 0.12s",
                          boxShadow: on ? `0 1px 5px ${T.accent}44` : "none",
                        }}>
                          {on && <Check size={10} color="#fff" strokeWidth={3} />}
                        </div>
                        <span style={{
                          fontSize: 13,
                          color: on ? T.accent : T.text,
                          fontWeight: on ? 600 : 400,
                          transition: "color 0.12s",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {sec.hasAdd && (
                <InlineSearchAdd
                  allOpts={allOpts}
                  selected={selected}
                  addLabel={sec.addLabel ?? `Add a ${sec.label.toLowerCase()}`}
                  onSelect={handleAddNew}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
interface LinkedInFilterPanelProps {
  open: boolean;
  filters: LIFilters;
  onClose: () => void;
  onChange: (f: LIFilters) => void;
  onApply: (f: LIFilters) => void;
}

export const LinkedInFilterPanel = ({
  open, filters, onClose, onChange, onApply,
}: LinkedInFilterPanelProps) => {
  const [extra, setExtra] = useState<Record<SectionId, string[]>>(
    () => SECTIONS.reduce((acc, s) => ({ ...acc, [s.id]: [] }), {} as Record<SectionId, string[]>)
  );

  const addExtra = (id: SectionId, val: string) => {
    setExtra(prev => prev[id].includes(val) ? prev : { ...prev, [id]: [...prev[id], val] });
  };

  const reset = () => onChange(defaultLIFilters());
  const total = totalCount(filters);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.4)", zIndex: 400,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.25s",
        }}
      />

      <div
        style={{
          position: "fixed", top: 0, right: 0,
          height: "100vh", width: "min(480px, 100vw)",
          background: "#fff", zIndex: 401,
          display: "flex", flexDirection: "column",
          boxShadow: "-4px 0 32px rgba(0,0,0,0.1)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          fontFamily: "'DM Sans','Segoe UI',sans-serif",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", borderBottom: `1px solid ${T.border}`,
          background: "#fff", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, background: T.accentLight,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <SlidersHorizontal size={16} style={{ color: T.accent }} />
            </div>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>All filters</span>
            {total > 0 && (
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 8px",
                borderRadius: 12, background: T.accent, color: "#fff",
              }}>
                {total}
              </span>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {total > 0 && (
              <button
                onClick={reset}
                style={{
                  fontSize: 12, fontWeight: 600, color: T.accent,
                  background: "none", border: "none", cursor: "pointer",
                  padding: "4px 8px", borderRadius: 8,
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = T.accentLight)}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = "none")}
              >
                Reset all
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                width: 30, height: 30, borderRadius: "50%",
                border: `1px solid ${T.border}`, background: T.bg,
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#fef2f2"; (e.currentTarget as HTMLElement).style.borderColor = "#fca5a5"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = T.bg; (e.currentTarget as HTMLElement).style.borderColor = T.border; }}
            >
              <X size={14} color={T.muted} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", background: "#fff" }}>
          {SECTIONS.map(sec => (
            <Section
              key={sec.id}
              sec={sec}
              filters={filters}
              extra={extra}
              onChange={onChange}
              onExtraAdd={addExtra}
            />
          ))}
          <div style={{ height: 16 }} />
        </div>

        <div style={{
          padding: "14px 20px", borderTop: `1px solid ${T.border}`,
          background: "#fff", flexShrink: 0,
          display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 10,
        }}>
          <button
            onClick={reset}
            style={{
              height: 36, padding: "0 16px",
              background: "#fff", border: `1px solid ${T.border}`,
              color: T.muted, borderRadius: 8,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              transition: "all 0.15s", fontFamily: "inherit",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
          >
            Reset
          </button>
          <button
            onClick={() => { onApply(filters); onClose(); }}
            style={{
              height: 36, padding: "0 18px",
              background: T.accent, color: "#fff",
              border: "none", borderRadius: 8,
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              boxShadow: `0 2px 8px ${T.accent}33`,
              transition: "all 0.15s", whiteSpace: "nowrap",
              fontFamily: "inherit",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = T.accentHover; }}
            onMouseLeave={e => { e.currentTarget.style.background = T.accent; }}
          >
            {total > 0 ? `Show Results (${total})` : "Show Results"}
          </button>
        </div>
      </div>
    </>
  );
};

export default LinkedInFilterPanel;