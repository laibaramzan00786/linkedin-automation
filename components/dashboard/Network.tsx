'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Download, Briefcase, Building2, ChevronDown,
  ChevronLeft, ChevronRight, MapPin, UserPlus, CheckCircle2,
  MoreHorizontal, Mail, Filter, X,
} from "lucide-react";
import { LinkedinLogoIcon as Linkedin } from "@phosphor-icons/react";

interface Contact {
  id: string; name: string; title: string;
  company: string; location: string; avatar: string;
}

const rawContacts: Contact[] = [
  { id:"1", name:"Hassan Raza",   title:"Senior Talent Acquisition Manager", company:"TechNova Solutions",   location:"Islamabad, Pakistan", avatar:"https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"2", name:"Ayesha Malik",  title:"HR Business Partner",               company:"InnovateX Pvt Ltd",    location:"Lahore, Pakistan",    avatar:"https://www.headshotphoto.io/images/blogs/classic-suit.png" },
  { id:"3", name:"Usman Tariq",   title:"Recruitment Specialist",            company:"AlphaByte Technologies",location:"Karachi, Pakistan",   avatar:"https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" },
  { id:"4", name:"Fatima Noor",   title:"HR Operations Manager",             company:"CloudCore Systems",     location:"Rawalpindi, Pakistan", avatar:"https://i.pinimg.com/736x/f6/ee/13/f6ee1311d121ea0cef159ff502d21720.jpg" },
  { id:"5", name:"Ali Hamza",     title:"People & Culture Lead",             company:"NextGen Labs",          location:"Faisalabad, Pakistan", avatar:"https://market-resized.envatousercontent.com/photodune.net/EVA/TRX/b4/06/80/53/a4/v1_E11/E1139EUA.jpeg?auto=format&q=94&w=200" },
  { id:"6", name:"Zainab Sheikh", title:"Senior HR Executive",               company:"BrightPath Solutions",  location:"Multan, Pakistan",    avatar:"https://media.easy-peasy.ai/fd0c6de9-b0a0-4378-9479-d596ce64bbd4/51860b5d-8fd6-41ce-b107-6fb783ff7837_medium.webp" },
];

const NetworkPage = () => {
  const [search,         setSearch]         = useState("");
  const [selected,       setSelected]       = useState<string[]>([]);
  const [activeFilter,   setActiveFilter]   = useState<string | null>(null);
  const [showFilters,    setShowFilters]    = useState(false);

  const filtered = rawContacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAll   = () => setSelected(selected.length === rawContacts.length ? [] : rawContacts.map(c => c.id));
  const toggleOne   = (id: string) => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const isSelected  = (id: string) => selected.includes(id);

  const FilterPanel = () => (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2" size={13} style={{ color:"var(--muted)" }}/>
        <input type="text" placeholder="Search by name..."
          value={search} onChange={e => setSearch(e.target.value)}
          className="h-10 w-full rounded-xl pl-9 pr-4 text-sm font-medium focus:outline-none"
          style={{ background:"var(--card)", border:"1px solid var(--border)", color:"var(--text)" }}/>
      </div>

      {/* Filter accordion */}
      <div className="rounded-2xl overflow-hidden divide-y" style={{ background:"var(--card)", border:"1px solid var(--border)" }}>
        {[
          { label:"Job Title", icon: Briefcase },
          { label:"Company",   icon: Building2  },
          { label:"Location",  icon: MapPin     },
        ].map(f => (
          <div key={f.label}>
            <button onClick={() => setActiveFilter(activeFilter === f.label ? null : f.label)}
              className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-all hover:bg-[var(--bg)]"
              style={{ color:"var(--text)" }}>
              <div className="flex items-center gap-2.5">
                <f.icon size={13} style={{ color:"var(--muted)" }}/> {f.label}
              </div>
              <ChevronDown size={13} style={{ color:"var(--muted)" }}
                className={`transition-transform duration-200 ${activeFilter === f.label ? "rotate-180" : ""}`}/>
            </button>
            <AnimatePresence>
              {activeFilter === f.label && (
                <motion.div initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }} exit={{ height:0, opacity:0 }}
                  className="overflow-hidden px-3 pb-3">
                  <input type="text" placeholder={`Filter by ${f.label.toLowerCase()}...`} autoFocus
                    className="w-full h-9 rounded-lg px-3 text-xs font-medium focus:outline-none"
                    style={{ background:"var(--bg)", border:"1px solid var(--border)", color:"var(--text)" }}/>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="rounded-2xl p-4 space-y-1" style={{ background:"rgba(232,131,106,0.06)", border:"1px solid rgba(232,131,106,0.18)" }}>
        <p className="text-xs font-semibold" style={{ color:"#e8836a" }}>Total Network</p>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-bold" style={{ color:"var(--text)" }}>842</span>
          <span className="text-xs font-semibold mb-0.5" style={{ color:"#10b981" }}>+12% this month</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-5 pb-20" style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b" style={{ borderColor:"var(--border)" }}>
        <div>
          <p className="text-[11px] font-semibold tracking-widest uppercase mb-1" style={{ color:"#e8836a" }}>My Network</p>
          <h1 className="text-xl font-bold" style={{ color:"var(--text)" }}>Network Directory</h1>
          <p className="text-sm mt-0.5" style={{ color:"var(--muted)" }}>Manage and expand your professional outreach list.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all"
            style={{ borderColor:"var(--border)", color:"var(--text)", background:"var(--card)" }}>
            <Download size={13}/> <span className="hidden sm:inline">Export CSV</span>
          </button>
          <button className="h-9 px-4 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
            style={{ background:"#e8836a", boxShadow:"0 4px 12px rgba(232,131,106,0.3)" }}>
            <UserPlus size={14}/> <span className="hidden sm:inline">Add Contact</span>
          </button>
        </div>
      </div>

      {/* Mobile filter toggle */}
      <button onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden h-10 flex items-center justify-center gap-2 rounded-xl border text-xs font-semibold"
        style={{ background:"var(--card)", borderColor:"var(--border)", color:"var(--text)" }}>
        {showFilters ? <><X size={13}/> Hide Filters</> : <><Filter size={13}/> Show Filters</>}
      </button>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity:0, y:-8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-8 }}
            className="lg:hidden">
            <FilterPanel/>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-5 items-start">
        {/* Desktop filter sidebar */}
        <div className="hidden lg:block w-60 shrink-0">
          <FilterPanel/>
        </div>

        {/* Table / cards */}
        <div className="flex-1 min-w-0">
          {/* Mobile cards */}
          <div className="flex flex-col gap-3 lg:hidden">
            {filtered.map((contact, i) => (
              <motion.div key={contact.id}
                initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.04 }}
                className="rounded-2xl p-4" style={{ background:"var(--card)", border:"1px solid var(--border)" }}>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border" style={{ borderColor:"var(--border)" }}>
                    <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate" style={{ color:"var(--text)" }}>{contact.name}</p>
                    <p className="text-xs font-medium mt-0.5 truncate" style={{ color:"var(--muted)" }}>{contact.title}</p>
                    <p className="text-xs font-semibold mt-0.5" style={{ color:"#e8836a" }}>{contact.company}</p>
                  </div>
                  <button onClick={() => toggleOne(contact.id)}
                    className="w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: isSelected(contact.id) ? "#e8836a" : "transparent", borderColor: isSelected(contact.id) ? "#e8836a" : "var(--border)", color: isSelected(contact.id) ? "#fff" : "transparent" }}>
                    <CheckCircle2 size={10} strokeWidth={3}/>
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <MapPin size={11} style={{ color:"#e8836a" }}/>
                  <span className="text-[11px]" style={{ color:"var(--muted)" }}>{contact.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  {[{ icon: Mail, label:"Email" }, { icon: Linkedin, label:"LinkedIn" }, { icon: MoreHorizontal, label:"More" }].map(({ icon: Icon, label }) => (
                    <button key={label} title={label}
                      className="flex-1 h-8 rounded-lg flex items-center justify-center text-xs border transition-all"
                      style={{ borderColor:"var(--border)", color:"var(--muted)", background:"var(--bg)" }}>
                      <Icon size={13}/>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
            {filtered.length === 0 && (
              <div className="py-16 text-center text-sm rounded-2xl" style={{ color:"var(--muted)", background:"var(--card)", border:"1px solid var(--border)" }}>
                No contacts found.
              </div>
            )}
          </div>

          {/* Desktop table */}
          <div className="hidden lg:block rounded-2xl overflow-hidden" style={{ background:"var(--card)", border:"1px solid var(--border)" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" style={{ minWidth:560 }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid var(--border)", background:"var(--bg)" }}>
                    <th className="pl-5 py-3 w-10">
                      <button onClick={toggleAll}
                        className="w-5 h-5 rounded border flex items-center justify-center"
                        style={{
                          background: selected.length === rawContacts.length ? "#e8836a" : "transparent",
                          borderColor: selected.length === rawContacts.length ? "#e8836a" : "var(--border)",
                          color: selected.length === rawContacts.length ? "#fff" : "transparent",
                        }}>
                        <CheckCircle2 size={10} strokeWidth={3}/>
                      </button>
                    </th>
                    {["Profile","Title / Company","Location","Contact"].map((h, i) => (
                      <th key={h} className={`px-4 py-3 text-xs font-semibold ${i === 3 ? "text-right pr-5" : ""}`}
                        style={{ color:"var(--muted)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((contact, i) => (
                    <motion.tr key={contact.id}
                      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:i*0.04 }}
                      className="group transition-colors"
                      style={{ borderBottom: i < filtered.length-1 ? "1px solid var(--border)" : "none" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--bg)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}>
                      <td className="pl-5 py-3.5">
                        <button onClick={() => toggleOne(contact.id)}
                          className="w-5 h-5 rounded border flex items-center justify-center"
                          style={{
                            background: isSelected(contact.id) ? "#e8836a" : "transparent",
                            borderColor: isSelected(contact.id) ? "#e8836a" : "var(--border)",
                            color: isSelected(contact.id) ? "#fff" : "transparent",
                          }}>
                          <CheckCircle2 size={10} strokeWidth={3}/>
                        </button>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border" style={{ borderColor:"var(--border)" }}>
                            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover"/>
                          </div>
                          <span className="text-sm font-semibold" style={{ color:"var(--text)" }}>{contact.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5">
                        <p className="text-xs font-medium" style={{ color:"var(--text)" }}>{contact.title}</p>
                        <p className="text-xs font-semibold mt-0.5" style={{ color:"#e8836a" }}>{contact.company}</p>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} style={{ color:"#e8836a" }} className="shrink-0"/>
                          <span className="text-xs font-medium" style={{ color:"var(--muted)" }}>{contact.location}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 pr-5">
                        <div className="flex items-center justify-end gap-1">
                          {[{ icon: Mail, title:"Email" }, { icon: Linkedin, title:"LinkedIn" }, { icon: MoreHorizontal, title:"More" }].map(({ icon: Icon, title }) => (
                            <button key={title} title={title}
                              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                              style={{ color:"var(--muted)" }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(232,131,106,0.1)"; (e.currentTarget as HTMLElement).style.color = "#e8836a"; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}>
                              <Icon size={13}/>
                            </button>
                          ))}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={5} className="py-14 text-center text-sm" style={{ color:"var(--muted)" }}>No contacts found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2"
              style={{ borderTop:"1px solid var(--border)", background:"var(--bg)" }}>
              <div className="flex items-center gap-3 text-xs" style={{ color:"var(--muted)" }}>
                <span>1–25 of 1,802 people</span>
                <div className="flex items-center gap-1 font-semibold cursor-pointer" style={{ color:"var(--text)" }}>
                  Show 25 <ChevronDown size={12}/>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color:"var(--muted)" }}>Page 1 of 73</span>
                <button disabled className="w-7 h-7 rounded-lg border flex items-center justify-center opacity-30"
                  style={{ borderColor:"var(--border)", color:"var(--muted)" }}>
                  <ChevronLeft size={13}/>
                </button>
                <button className="w-7 h-7 rounded-lg border flex items-center justify-center"
                  style={{ borderColor:"var(--border)", color:"var(--text)", background:"var(--card)" }}>
                  <ChevronRight size={13}/>
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