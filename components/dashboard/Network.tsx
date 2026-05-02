
'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search, Download, Briefcase, Building2, ChevronDown,
  ChevronLeft, ChevronRight, MapPin, UserPlus, CheckCircle2,
  MoreHorizontal, Mail, Filter,
} from "lucide-react";
import { LinkedinLogoIcon as Linkedin } from "@phosphor-icons/react";

interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
}

const rawContacts: Contact[] = [
  { id:"1", name:"Hassan Raza",    title:"Senior Talent Acquisition Manager", company:"TechNova Solutions",  location:"Islamabad, Pakistan", avatar:"https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=300&auto=format&fit=crop" },
  { id:"2", name:"Ayesha Malik",   title:"HR Business Partner",               company:"InnovateX Pvt Ltd",   location:"Lahore, Pakistan",    avatar:"https://www.headshotphoto.io/images/blogs/classic-suit.png" },
  { id:"3", name:"Usman Tariq",    title:"Recruitment Specialist",            company:"AlphaByte Technologies",location:"Karachi, Pakistan",  avatar:"https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg" },
  { id:"4", name:"Fatima Noor",    title:"HR Operations Manager",             company:"CloudCore Systems",    location:"Rawalpindi, Pakistan", avatar:"https://i.pinimg.com/736x/f6/ee/13/f6ee1311d121ea0cef159ff502d21720.jpg" },
  { id:"5", name:"Ali Hamza",      title:"People & Culture Lead",             company:"NextGen Labs",         location:"Faisalabad, Pakistan", avatar:"https://market-resized.envatousercontent.com/photodune.net/EVA/TRX/b4/06/80/53/a4/v1_E11/E1139EUA.jpeg?auto=format&q=94&w=200" },
  { id:"6", name:"Zainab Sheikh",  title:"Senior HR Executive",               company:"BrightPath Solutions", location:"Multan, Pakistan",    avatar:"https://media.easy-peasy.ai/fd0c6de9-b0a0-4378-9479-d596ce64bbd4/51860b5d-8fd6-41ce-b107-6fb783ff7837_medium.webp" },
];

const NetworkPage = () => {
  const [searchTerm,        setSearchTerm]        = useState("");
  const [selectedContacts,  setSelectedContacts]  = useState<string[]>([]);
  const [activeFilter,      setActiveFilter]      = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = rawContacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFilter = (label: string) =>
    setActiveFilter(activeFilter === label ? null : label);

  const toggleSelectAll = () =>
    setSelectedContacts(selectedContacts.length === rawContacts.length ? [] : rawContacts.map(c => c.id));

  const toggleSelect = (id: string) =>
    setSelectedContacts(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );

  return (
    <div
      className="flex flex-col gap-6 pb-20"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b"
        style={{ borderColor: "var(--border)" }}>
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#e8836a" }}>
            My Network
          </p>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Network Directory</h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--muted)" }}>
            Manage and expand your professional outreach list.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="h-10 px-4 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all hover:shadow-sm"
            style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}
          >
            <Download size={14} />
            Export CSV
          </button>
          <button
            className="h-10 px-5 text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-all active:scale-95"
            style={{ background: "#e8836a", boxShadow: "0 4px 14px rgba(232,131,106,0.35)" }}
          >
            <UserPlus size={15} />
            Add Contact
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="lg:hidden w-full h-11 flex items-center justify-center gap-2 rounded-xl border text-xs font-semibold"
          style={{ background: "var(--card)", borderColor: "var(--border)", color: "var(--text)" }}
        >
          <Filter size={14} />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className={`w-full lg:w-64 shrink-0 space-y-4 ${showMobileFilters ? "block" : "hidden lg:block"}`}>

          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2" size={14}
              style={{ color: "var(--muted)" }} />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-xl pl-10 pr-4 text-sm font-medium focus:outline-none transition-all"
              style={{
                background: "var(--card)", border: "1px solid var(--border)",
                color: "var(--text)",
              }}
            />
          </div>

          <div
            className="rounded-2xl overflow-hidden divide-y"
            style={{ background: "var(--card)", border: "1px solid var(--border)" } as React.CSSProperties}
          >
            {[
              { label: "Job Title", icon: Briefcase },
              { label: "Company",   icon: Building2 },
              { label: "Location",  icon: MapPin },
            ].map((f, i) => (
              <div key={i}>
                <button
                  onClick={() => toggleFilter(f.label)}
                  className="w-full flex items-center justify-between px-4 py-3 transition-all hover:bg-[var(--bg)] text-sm font-medium"
                  style={{ color: "var(--text)" }}
                >
                  <div className="flex items-center gap-2.5">
                    <f.icon size={13} style={{ color: "var(--muted)" }} />
                    {f.label}
                  </div>
                  <ChevronDown size={13} style={{ color: "var(--muted)" }}
                    className={`transition-transform duration-200 ${activeFilter === f.label ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {activeFilter === f.label && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-3 pb-3"
                    >
                      <input
                        type="text"
                        placeholder={`Filter by ${f.label.toLowerCase()}...`}
                        autoFocus
                        className="w-full h-9 rounded-lg px-3 text-xs font-medium focus:outline-none"
                        style={{
                          background: "var(--bg)", border: "1px solid var(--border)",
                          color: "var(--text)",
                        }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div
            className="rounded-2xl p-5 space-y-2"
            style={{ background: "rgba(232,131,106,0.06)", border: "1px solid rgba(232,131,106,0.18)" }}
          >
            <p className="text-xs font-semibold" style={{ color: "#e8836a" }}>Total Network</p>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold" style={{ color: "var(--text)" }}>842</span>
              <span className="text-xs font-semibold mb-1" style={{ color: "#10b981" }}>+12% this month</span>
            </div>
          </div>
        </div>

        <div
          className="flex-1 w-full rounded-2xl overflow-hidden"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" style={{ minWidth: 640 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
                  <th className="pl-5 py-3 w-12">
                    <button
                      onClick={toggleSelectAll}
                      className="w-5 h-5 rounded border flex items-center justify-center transition-all"
                      style={{
                        background: selectedContacts.length === rawContacts.length ? "#e8836a" : "transparent",
                        borderColor: selectedContacts.length === rawContacts.length ? "#e8836a" : "var(--border)",
                        color: selectedContacts.length === rawContacts.length ? "#fff" : "transparent",
                      }}
                    >
                      <CheckCircle2 size={11} strokeWidth={3} />
                    </button>
                  </th>
                  {["Profile", "Title / Company", "Location", "Contact"].map((h, i) => (
                    <th key={h} className={`px-4 py-3 text-xs font-semibold ${i === 3 ? "text-right pr-5" : ""}`}
                      style={{ color: "var(--muted)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((contact, i) => (
                  <motion.tr
                    key={contact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    className="group transition-colors"
                    style={{
                      borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none",
                      background: selectedContacts.includes(contact.id) ? "rgba(232,131,106,0.04)" : "transparent",
                    }}
                    onMouseEnter={e => { if (!selectedContacts.includes(contact.id)) (e.currentTarget as HTMLElement).style.background = "var(--bg)"; }}
                    onMouseLeave={e => { if (!selectedContacts.includes(contact.id)) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <td className="pl-5 py-3.5">
                      <button
                        onClick={() => toggleSelect(contact.id)}
                        className="w-5 h-5 rounded border flex items-center justify-center transition-all"
                        style={{
                          background: selectedContacts.includes(contact.id) ? "#e8836a" : "transparent",
                          borderColor: selectedContacts.includes(contact.id) ? "#e8836a" : "var(--border)",
                          color: selectedContacts.includes(contact.id) ? "#fff" : "transparent",
                        }}
                      >
                        <CheckCircle2 size={11} strokeWidth={3} />
                      </button>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0"
                          style={{ border: "1px solid var(--border)" }}>
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
                      <div className="flex items-center gap-1.5">
                        <MapPin size={11} style={{ color: "#e8836a" }} className="shrink-0" />
                        <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--muted)" }}>
                          {contact.location}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 pr-5">
                      <div className="flex items-center justify-end gap-1">
                        {[
                          { icon: Mail, title: "Email" },
                          { icon: Linkedin, title: "LinkedIn" },
                          { icon: MoreHorizontal, title: "More" },
                        ].map(({ icon: Icon, title }) => (
                          <button
                            key={title}
                            title={title}
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                            style={{ color: "var(--muted)" }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.background = "rgba(232,131,106,0.1)";
                              (e.currentTarget as HTMLElement).style.color = "#e8836a";
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.background = "transparent";
                              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
                            }}
                          >
                            <Icon size={14} />
                          </button>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-sm" style={{ color: "var(--muted)" }}>
                      No contacts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            className="px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3"
            style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
          >
            <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
              <span className="font-medium">1 – 25 of 1,802 people</span>
              <div className="flex items-center gap-1 font-semibold cursor-pointer"
                style={{ color: "var(--text)" }}>
                Show 25 <ChevronDown size={12} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium mr-1" style={{ color: "var(--muted)" }}>Page 1 of 73</span>
              <button
                disabled
                className="w-8 h-8 rounded-lg border flex items-center justify-center opacity-30"
                style={{ borderColor: "var(--border)", color: "var(--muted)" }}
              >
                <ChevronLeft size={15} />
              </button>
              <button
                className="w-8 h-8 rounded-lg border flex items-center justify-center transition-all hover:shadow-sm"
                style={{ borderColor: "var(--border)", color: "var(--text)", background: "var(--card)" }}
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkPage;