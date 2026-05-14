
'use client';
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Download, Briefcase, Building2, ChevronDown,
  ChevronLeft, ChevronRight, MapPin, UserPlus, CheckCircle2,
  MoreHorizontal, Mail, Filter, X, Languages, Factory, MessageSquare,
} from "lucide-react";
import { useRouter } from 'next/navigation';
import { addOrOpenConversation } from '@/components/dashboard/inbox';

export interface Contact {
  id: string; name: string; title: string; company: string;
  location: string; avatar: string; industry: string; language: string;
}

export const rawContacts: Contact[] = [
  { id:"1",  name:"Hassan Raza",      title:"Senior Talent Acquisition Manager", company:"TechNova Solutions",    location:"Islamabad, Pakistan",  industry:"Technology",       language:"English",  avatar:"https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"2",  name:"Ayesha Malik",     title:"HR Business Partner",               company:"InnovateX Pvt Ltd",     location:"Lahore, Pakistan",     industry:"Human Resources",  language:"Urdu",     avatar:"https://www.headshotphoto.io/images/blogs/classic-suit.png" },
  { id:"3",  name:"Usman Tariq",      title:"Recruitment Specialist",            company:"AlphaByte Technologies", location:"Karachi, Pakistan",   industry:"Technology",       language:"English",  avatar:"https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" },
  { id:"4",  name:"Fatima Noor",      title:"HR Operations Manager",             company:"CloudCore Systems",     location:"Rawalpindi, Pakistan",  industry:"Cloud Computing",  language:"Urdu",     avatar:"https://i.pinimg.com/736x/f6/ee/13/f6ee1311d121ea0cef159ff502d21720.jpg" },
  { id:"5",  name:"Ali Hamza",        title:"People & Culture Lead",             company:"NextGen Labs",           location:"Faisalabad, Pakistan", industry:"Healthcare",       language:"English",  avatar:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV6UdR7RNtNQnZ1LhJMNJ5ODL8RcgggmFWRw&s" },
  { id:"6",  name:"Zainab Sheikh",    title:"Senior HR Executive",               company:"BrightPath Solutions",  location:"Multan, Pakistan",     industry:"Education",        language:"Urdu",     avatar:"https://media.easy-peasy.ai/fd0c6de9-b0a0-4378-9479-d596ce64bbd4/51860b5d-8fd6-41ce-b107-6fb783ff7837_medium.webp" },
  { id:"7",  name:"Bilal Ahmed",      title:"Software Engineer",                 company:"CodeCraft Studio",      location:"Karachi, Pakistan",    industry:"Technology",       language:"English",  avatar:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"8",  name:"Sara Qureshi",     title:"Product Manager",                   company:"Pixel Works",           location:"Lahore, Pakistan",     industry:"Technology",       language:"English",  avatar:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"9",  name:"Kamran Hussain",   title:"Marketing Director",                company:"GrowthEdge",            location:"Islamabad, Pakistan",  industry:"Marketing",        language:"Urdu",     avatar:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"10", name:"Nadia Farooq",     title:"Business Development Manager",      company:"NexBridge Consulting",  location:"Karachi, Pakistan",    industry:"Consulting",       language:"English",  avatar:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"11", name:"Tariq Mehmood",    title:"Data Scientist",                    company:"AnalyticsPro",          location:"Lahore, Pakistan",     industry:"Technology",       language:"English",  avatar:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"12", name:"Hina Baig",        title:"UX Designer",                       company:"DesignHub",             location:"Islamabad, Pakistan",  industry:"Design",           language:"Urdu",     avatar:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"13", name:"Rohail Khan",      title:"DevOps Engineer",                   company:"InfraStack",            location:"Peshawar, Pakistan",   industry:"Technology",       language:"other",    avatar:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"14", name:"Maria Siddiqui",   title:"Financial Analyst",                 company:"WealthPath Finance",    location:"Karachi, Pakistan",    industry:"Finance",          language:"English",  avatar:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"15", name:"Asad Rehman",      title:"Sales Manager",                     company:"SalesBridge",           location:"Lahore, Pakistan",     industry:"Sales",            language:"Urdu",     avatar:"https://images.unsplash.com/photo-1463453091185-61582044d556?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"16", name:"Sana Mirza",       title:"Content Strategist",                company:"ContentWave",           location:"Karachi, Pakistan",    industry:"Marketing",        language:"English",  avatar:"https://images.unsplash.com/photo-1534528741775-53994a69daeb?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"17", name:"Faisal Iqbal",     title:"Cloud Architect",                   company:"SkyStack Technologies", location:"Islamabad, Pakistan",  industry:"Cloud Computing",  language:"English",  avatar:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"18", name:"Rabia Zafar",      title:"HR Consultant",                     company:"TalentBridge",          location:"Multan, Pakistan",     industry:"Human Resources",  language:"Urdu",     avatar:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?fm=jpg&q=60&w=300&auto=format&fit=crop" },
];

const ALL_INDUSTRIES = [...new Set(rawContacts.map(c => c.industry))].sort();
const ALL_LANGUAGES  = [...new Set(rawContacts.map(c => c.language))].sort();
const ALL_LOCATIONS  = [...new Set(rawContacts.map(c => c.location.split(",")[0].trim()))].sort();
const ALL_COMPANIES  = [...new Set(rawContacts.map(c => c.company))].sort();
const ALL_TITLES     = [...new Set(rawContacts.map(c => c.title))].sort();

const SearchableFilter = ({
  label, icon: Icon, options, selected, onToggle, isOpen, onOpen,
}: {
  label: string; icon: React.ElementType; options: string[];
  selected: string[]; onToggle: (v: string) => void;
  isOpen: boolean; onOpen: () => void;
}) => {
  const [q, setQ] = useState("");
  const filtered  = options.filter(o => o.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
      <button
        onClick={onOpen}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all"
        style={{ color: "var(--text)" }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
      >
        <div className="flex items-center gap-2.5">
          <Icon size={13} style={{ color: "var(--muted)" }} />
          <span>{label}</span>
          {selected.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white"
              style={{ background: "#e8836a" }}>{selected.length}</span>
          )}
        </div>
        <ChevronDown size={13} style={{ color: "var(--muted)" }}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 space-y-2">
              <div className="relative">
                <Search size={11} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: "var(--muted)" }} />
                <input
                  type="text"
                  placeholder={`Search ${label.toLowerCase()}...`}
                  value={q}
                  onChange={e => setQ(e.target.value)}
                  autoFocus
                  className="w-full h-8 pl-7 pr-3 rounded-lg text-xs font-medium focus:outline-none"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)", color: "var(--text)" }}
                />
              </div>
              <div className="max-h-40 overflow-y-auto space-y-0.5 pr-1">
                {filtered.length === 0 ? (
                  <p className="text-xs py-2 text-center" style={{ color: "var(--muted)" }}>No results</p>
                ) : (
                  filtered.map(opt => {
                    const checked = selected.includes(opt);
                    return (
                      <button key={opt}
                        onClick={() => onToggle(opt)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-left transition-all"
                        style={{ color: "var(--text)" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                      >
                        <div className="w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all"
                          style={{
                            background:  checked ? "#e8836a" : "transparent",
                            borderColor: checked ? "#e8836a" : "var(--border)",
                          }}>
                          {checked && (
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>
                        <span className="truncate">{opt}</span>
                      </button>
                    );
                  })
                )}
              </div>
              {selected.length > 0 && (
                <button
                  onClick={() => selected.forEach(s => onToggle(s))}
                  className="text-[10px] font-semibold mt-1"
                  style={{ color: "#e8836a" }}
                >
                  Clear all ({selected.length})
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NetworkPageProps {
  onOpenInbox?: (contact: Contact) => void;
}

const NetworkPage = ({ onOpenInbox }: NetworkPageProps) => {
  const router = useRouter();
  const [nameSearch,    setNameSearch]    = useState("");
  const [selected,      setSelected]      = useState<string[]>([]);
  const [openFilter,    setOpenFilter]    = useState<string | null>(null);
  const [showFilters,   setShowFilters]   = useState(false);
  const [selTitles,    setSelTitles]    = useState<string[]>([]);
  const [selCompanies, setSelCompanies] = useState<string[]>([]);
  const [selLocations, setSelLocations] = useState<string[]>([]);
  const [selIndustries,setSelIndustries]= useState<string[]>([]);
  const [selLanguages, setSelLanguages] = useState<string[]>([]);

  const toggleMulti = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (val: string) =>
    setter(p => p.includes(val) ? p.filter(x => x !== val) : [...p, val]);

  const filtered = useMemo(() => rawContacts.filter(c => {
    if (nameSearch && !c.name.toLowerCase().includes(nameSearch.toLowerCase())) return false;
    if (selTitles.length    > 0 && !selTitles.includes(c.title))                          return false;
    if (selCompanies.length > 0 && !selCompanies.includes(c.company))                     return false;
    if (selLocations.length > 0 && !selLocations.some(l => c.location.includes(l)))       return false;
    if (selIndustries.length> 0 && !selIndustries.includes(c.industry))                   return false;
    if (selLanguages.length > 0 && !selLanguages.includes(c.language))                    return false;
    return true;
  }), [nameSearch, selTitles, selCompanies, selLocations, selIndustries, selLanguages]);

  const toggleAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map(c => c.id));
  const toggleOne = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const isSelected = (id: string) => selected.includes(id);
  const activeFilterCount = selTitles.length + selCompanies.length + selLocations.length + selIndustries.length + selLanguages.length;

  const clearAll = () => {
    setSelTitles([]); setSelCompanies([]); setSelLocations([]);
    setSelIndustries([]); setSelLanguages([]); setNameSearch("");
  };

  const filterDefs = [
    { id:"title",    label:"Job Title",         icon: Briefcase, options: ALL_TITLES,     selected: selTitles,     setter: setSelTitles     },
    { id:"company",  label:"Company",           icon: Building2, options: ALL_COMPANIES,  selected: selCompanies,  setter: setSelCompanies  },
    { id:"location", label:"Location",          icon: MapPin,    options: ALL_LOCATIONS,  selected: selLocations,  setter: setSelLocations  },
    { id:"industry", label:"Industry",          icon: Factory,   options: ALL_INDUSTRIES, selected: selIndustries, setter: setSelIndustries },
    { id:"language", label:"Profile Language",  icon: Languages, options: ALL_LANGUAGES,  selected: selLanguages,  setter: setSelLanguages  },
  ];

  const FilterPanel = () => (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={13} style={{ color: "var(--muted)" }} />
        <input type="text" placeholder="Search by name..."
          value={nameSearch} onChange={e => setNameSearch(e.target.value)}
          className="h-10 w-full rounded-xl pl-9 pr-4 text-sm font-medium focus:outline-none"
          style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--text)" }} />
      </div>
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {[...selTitles,...selCompanies,...selLocations,...selIndustries,...selLanguages].map(chip => (
            <span key={chip}
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ background: "rgba(232,131,106,0.12)", color: "#e8836a", border: "1px solid rgba(232,131,106,0.25)" }}>
              {chip}
              <button onClick={() => {
                if (selTitles.includes(chip))     setSelTitles(p=>p.filter(x=>x!==chip));
                if (selCompanies.includes(chip))  setSelCompanies(p=>p.filter(x=>x!==chip));
                if (selLocations.includes(chip))  setSelLocations(p=>p.filter(x=>x!==chip));
                if (selIndustries.includes(chip)) setSelIndustries(p=>p.filter(x=>x!==chip));
                if (selLanguages.includes(chip))  setSelLanguages(p=>p.filter(x=>x!==chip));
              }}>
                <X size={9} />
              </button>
            </span>
          ))}
          <button onClick={clearAll} className="text-[10px] font-semibold" style={{ color: "#aaa" }}>
            Clear all
          </button>
        </div>
      )}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
        {filterDefs.map(f => (
          <SearchableFilter
            key={f.id}
            label={f.label}
            icon={f.icon}
            options={f.options}
            selected={f.selected}
            onToggle={toggleMulti(f.setter)}
            isOpen={openFilter === f.id}
            onOpen={() => setOpenFilter(openFilter === f.id ? null : f.id)}
          />
        ))}
      </div>
      <div className="rounded-2xl p-4 space-y-1"
        style={{ background: "rgba(232,131,106,0.06)", border: "1px solid rgba(232,131,106,0.18)" }}>
        <p className="text-xs font-semibold" style={{ color: "#e8836a" }}>Total Network</p>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            {filtered.length}
            <span className="text-sm font-medium ml-1" style={{ color: "var(--muted)" }}>/ {rawContacts.length}</span>
          </span>
          <span className="text-xs font-semibold mb-0.5" style={{ color: "#10b981" }}>+12% this month</span>
        </div>
        {activeFilterCount > 0 && (
          <p className="text-[11px]" style={{ color: "var(--muted)" }}>
            Filtered by {activeFilterCount} criteria
          </p>
        )}
      </div>
    </div>
  );

  // Action buttons: Mail, Inbox (replaces LinkedIn), More
  const ActionButtons = ({ contact }: { contact: Contact }) => (
    <>
      {[
        { icon: Mail, title: "Email", onClick: () => {} },
        { icon: MessageSquare, title: "Message", onClick: () => {
    addOrOpenConversation(contact);
    if (onOpenInbox) {
      onOpenInbox(contact);
    } else {
      router.push('/dashboard/inbox');
    }
}},
        { icon: MoreHorizontal, title: "More", onClick: () => {} },
      ].map(({ icon: Icon, title, onClick }) => (
        <button key={title} title={title}
          onClick={onClick}
          className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
          style={{ color: "var(--muted)" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = "rgba(232,131,106,0.1)";
            (e.currentTarget as HTMLElement).style.color = "#e8836a";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = "var(--muted)";
          }}>
          <Icon size={13} />
        </button>
      ))}
    </>
  );

  return (
    <div className="flex flex-col gap-5 pb-20" style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b"
        style={{ borderColor: "var(--border)" }}>
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color: "#e8836a" }}>My Network</p>
          <h1 className="text-xl font-bold" style={{ color: "var(--text)" }}>Network Directory</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
            {filtered.length} contacts · Manage and expand your professional outreach list.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all"
            style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}>
            <Download size={13} /> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button className="h-9 px-4 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
            style={{ background: "#e8836a", boxShadow: "0 4px 12px rgba(232,131,106,0.3)" }}>
            <UserPlus size={14} /> <span className="hidden sm:inline">Add Contact</span>
          </button>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <button onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden h-10 flex items-center justify-center gap-2 rounded-xl border text-xs font-semibold"
        style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}>
        {showFilters ? <><X size={13} /> Hide Filters</> : (
          <>
            <Filter size={13} /> Show Filters
            {activeFilterCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold text-white" style={{ background: "#e8836a" }}>
                {activeFilterCount}
              </span>
            )}
          </>
        )}
      </button>

      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="lg:hidden">
            <FilterPanel />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-5 items-start">

        {/* Desktop filter sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <FilterPanel />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">

          {/* Mobile cards */}
          <div className="flex flex-col gap-3 lg:hidden">
            {filtered.map((contact, i) => (
              <motion.div key={contact.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                className="rounded-2xl p-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border" style={{ borderColor: "var(--border)" }}>
                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color: "var(--text)" }}>{contact.name}</p>
                    <p className="text-xs font-medium mt-0.5 truncate" style={{ color: "var(--muted)" }}>{contact.title}</p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color: "#e8836a" }}>{contact.company}</p>
                  </div>
                  <button onClick={() => toggleOne(contact.id)}
                    className="w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-all"
                    style={{
                      background:  isSelected(contact.id) ? "#e8836a" : "transparent",
                      borderColor: isSelected(contact.id) ? "#e8836a" : "var(--border)",
                      color:       isSelected(contact.id) ? "#fff"     : "transparent",
                    }}>
                    <CheckCircle2 size={10} strokeWidth={3} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin size={10} style={{ color: "#e8836a" }} />
                    <span className="text-[11px]" style={{ color: "var(--muted)" }}>{contact.location.split(",")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Factory size={10} style={{ color: "#e8836a" }} />
                    <span className="text-[11px]" style={{ color: "var(--muted)" }}>{contact.industry}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Languages size={10} style={{ color: "#e8836a" }} />
                    <span className="text-[11px]" style={{ color: "var(--muted)" }}>{contact.language}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {[
                    { icon: Mail, label: "Email", onClick: () => {} },
                    { icon: MessageSquare, label: "Message", onClick: () => {
    addOrOpenConversation(contact);
    if (onOpenInbox) {
      onOpenInbox(contact);
    } else {
      router.push('/dashboard/inbox');
    }
}},
                    { icon: MoreHorizontal, label: "More", onClick: () => {} }
                  ].map(({ icon: Icon, label, onClick }) => (
                    <button key={label} title={label}
                      onClick={onClick}
                      className="flex-1 h-8 rounded-lg flex items-center justify-center text-xs border transition-all"
                      style={{ borderColor: "var(--border)", color: "var(--muted)", background: "var(--bg)" }}>
                      <Icon size={13} />
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>No contacts found</p>
                <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>Try adjusting your filters</p>
                {activeFilterCount > 0 && (
                  <button onClick={clearAll} className="mt-3 text-xs font-semibold" style={{ color: "#e8836a" }}>
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" style={{ minWidth: 680 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
                    <th className="pl-5 py-3 w-10">
                      <button onClick={toggleAll}
                        className="w-5 h-5 rounded border flex items-center justify-center transition-all"
                        style={{
                          background:  selected.length === filtered.length && filtered.length > 0 ? "#e8836a" : "transparent",
                          borderColor: selected.length === filtered.length && filtered.length > 0 ? "#e8836a" : "var(--border)",
                          color:       selected.length === filtered.length && filtered.length > 0 ? "#fff"     : "transparent",
                        }}>
                        <CheckCircle2 size={10} strokeWidth={3} />
                      </button>
                    </th>
                    {["Profile", "Title / Company", "Location & Industry", "Language", "Contact"].map((h, i) => (
                      <th key={h}
                        className={`px-4 py-3 text-xs font-semibold ${i === 4 ? "text-right pr-5" : ""}`}
                        style={{ color: "var(--muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((contact, i) => (
                    <motion.tr key={contact.id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                      className="group transition-colors"
                      style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                      <td className="pl-5 py-3.5">
                        <button onClick={() => toggleOne(contact.id)}
                          className="w-5 h-5 rounded border flex items-center justify-center transition-all"
                          style={{
                            background:  isSelected(contact.id) ? "#e8836a" : "transparent",
                            borderColor: isSelected(contact.id) ? "#e8836a" : "var(--border)",
                            color:       isSelected(contact.id) ? "#fff"     : "transparent",
                          }}>
                          <CheckCircle2 size={10} strokeWidth={3} />
                        </button>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border" style={{ borderColor: "var(--border)" }}>
                            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-sm font-semibold whitespace-nowrap" style={{ color: "var(--text)" }}>
                            {contact.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-medium" style={{ color: "var(--text)" }}>{contact.title}</p>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: "#e8836a" }}>{contact.company}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1 mb-1">
                          <MapPin size={11} style={{ color: "#e8836a" }} className="shrink-0" />
                          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                            {contact.location.split(",")[0].trim()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Factory size={11} style={{ color: "var(--muted)" }} className="shrink-0" />
                          <span className="text-xs" style={{ color: "var(--muted)" }}>{contact.industry}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <Languages size={11} style={{ color: "var(--muted)" }} />
                          <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{contact.language}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 pr-5">
                        <div className="flex items-center justify-end gap-1">
                          <ActionButtons contact={contact} />
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-16 text-center">
                        <p className="text-sm font-semibold mb-1" style={{ color: "var(--text)" }}>No contacts found</p>
                        <p className="text-xs" style={{ color: "var(--muted)" }}>Try adjusting your search or filters</p>
                        {activeFilterCount > 0 && (
                          <button onClick={clearAll} className="mt-3 text-xs font-semibold" style={{ color: "#e8836a" }}>
                            Clear all filters
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2"
              style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
              <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
                <span>
                  {selected.length > 0 ? (
                    <span className="font-semibold" style={{ color: "#e8836a" }}>{selected.length} selected · </span>
                  ) : null}
                  Showing {filtered.length} of {rawContacts.length} contacts
                </span>
                <div className="flex items-center gap-1 font-semibold cursor-pointer" style={{ color: "var(--text)" }}>
                  Show 25 <ChevronDown size={12} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: "var(--muted)" }}>Page 1 of 73</span>
                <button disabled className="w-7 h-7 rounded-lg border flex items-center justify-center opacity-30"
                  style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
                  <ChevronLeft size={13} />
                </button>
                <button className="w-7 h-7 rounded-lg border flex items-center justify-center transition-all"
                  style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NetworkPage;