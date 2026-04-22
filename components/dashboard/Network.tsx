
'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Download, 
  Briefcase, 
  Building2, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  UserPlus,
  CheckCircle2,
  MoreHorizontal,
  Mail,
} from "lucide-react";
import {LinkedinLogoIcon as Linkedin} from "@phosphor-icons/react";
interface Contact {
  id: string;
  name: string;
  title: string;
  company: string;
  website: string;
  location: string;
  avatar: string;
  contactInfo: string;
}

const rawContacts: Contact[] = [
 {
    id: "1",
    name: "Hassan Raza",
    title: "Senior Talent Acquisition Manager",
    company: "TechNova Solutions",
    website: "https://www.technovasolutions.com",
    location: "Islamabad, Pakistan",
    avatar: "https://images.unsplash.com/photo-1615109398623-88346a601842?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww",
    contactInfo: "h@technova.com"
  },
  {
    id: "2",
    name: "Ayesha Malik",
    title: "HR Business Partner",
    company: "InnovateX Pvt Ltd",
    website: "https://www.innovatex.com",
    location: "Lahore, Pakistan",
    avatar: "https://www.headshotphoto.io/images/blogs/classic-suit.png",
    contactInfo: "ayesha@innovate.com"
  },
  {
    id: "3",
    name: "Usman Tariq",
    title: "Recruitment Specialist",
    company: "AlphaByte Technologies",
    website: "https://www.alphabyte.io",
    location: "Karachi, Pakistan",
    avatar: "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
    contactInfo: "u.tariq@alpha.io"
  },
  {
    id: "4",
    name: "Fatima Noor",
    title: "HR Operations Manager",
    company: "CloudCore Systems",
    website: "https://www.cloudcore.io",
    location: "Rawalpindi, Pakistan",
    avatar: "https://i.pinimg.com/736x/f6/ee/13/f6ee1311d121ea0cef159ff502d21720.jpg",
    contactInfo: "fatima@cloudcore.io"
  },
  {
    id: "5",
    name: "Ali Hamza",
    title: "People & Culture Lead",
    company: "NextGen Labs",
    website: "https://www.nextgenlabs.co",
    location: "Faisalabad, Pakistan",
    avatar: "https://market-resized.envatousercontent.com/photodune.net/EVA/TRX/b4/06/80/53/a4/v1_E11/E1139EUA.jpeg?auto=format&q=94&mark=https%3A%2F%2Fassets.market-storefront.envato-static.com%2Fwatermarks%2Fphoto-260724.png&opacity=0.2&cf_fit=contain&w=590&h=884&s=ade8cb2e5494eaec7be4aec07992678588d92aac7b5fa40a4c5398593972fa6a",
    contactInfo: "ali@nextgen.co"
  },
  {
    id: "6",
    name: "Zainab Sheikh",
    title: "Senior HR Executive",
    company: "BrightPath Solutions",
    website: "https://www.brightpathsol.com",
    location: "Multan, Pakistan",
    avatar: "https://media.easy-peasy.ai/fd0c6de9-b0a0-4378-9479-d596ce64bbd4/51860b5d-8fd6-41ce-b107-6fb783ff7837_medium.webp",
    contactInfo: "zainab@bright.com"
  }
];

const NetworkPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggleFilter = (label: string) => {
    setActiveFilter(activeFilter === label ? null : label);
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === rawContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(rawContacts.map(c => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(c => c !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-20">
      
      {/* 🏙️ MINIMALIST HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text)]">Network Directory</h1>
          <p className="text-sm text-[var(--muted)]">Manage and expand your professional outreach list.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-11 px-5 rounded-xl border border-[var(--border)] text-xs font-bold uppercase tracking-widest text-[var(--text)] hover:bg-[var(--card)] transition-all flex items-center gap-2">
            <Download size={16} />
            Export CSV
          </button>
          <button className="h-11 px-6 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95">
            <UserPlus size={18} />
            Add Contact
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* 🔍 COMPACT FILTER BAR */}
        <div className="w-full lg:w-72 shrink-0 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)] group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full bg-[var(--card)] border border-[var(--border)] rounded-xl pl-11 pr-4 text-xs font-medium focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden divide-y divide-[var(--border)]">
            {[
              { label: "Job Title", icon: Briefcase },
              { label: "Company", icon: Building2 },
              { label: "Location", icon: MapPin },
            ].map((filter, i) => (
              <div key={i} className="p-1">
                <button 
                  onClick={() => toggleFilter(filter.label)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[var(--bg)] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <filter.icon size={14} className="text-[var(--muted)] group-hover:text-blue-600 transition-colors" />
                    <span className="text-xs font-semibold text-[var(--text)]">{filter.label}</span>
                  </div>
                  <ChevronDown size={14} className={`text-[var(--muted)] transition-transform duration-300 ${activeFilter === filter.label ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {activeFilter === filter.label && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden px-3 pb-3"
                    >
                      <input 
                        type="text" 
                        placeholder={`Filter by ${filter.label.toLowerCase()}...`} 
                        className="w-full h-10 bg-[var(--bg)] border border-[var(--border)] rounded-lg px-4 text-xs focus:outline-none focus:border-blue-500 transition-all font-medium"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl space-y-3">
            <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Network Score</h4>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-[var(--text)]">842</span>
              <span className="text-[10px] font-bold text-emerald-500 mb-1">+12% vs last month</span>
            </div>
          </div>
        </div>

        {/* 📋 MODERN REFINED DIRECTORY */}
        <div className="flex-1 w-full bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg)]/50 border-b border-[var(--border)]">
                  <th className="w-14 pl-6 py-4">
                    <button 
                      onClick={toggleSelectAll}
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedContacts.length === rawContacts.length ? 'bg-blue-600 border-blue-600 text-white' : 'border-[var(--border)] bg-white text-transparent'}`}
                    >
                      <CheckCircle2 size={12} strokeWidth={3} />
                    </button>
                  </th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Profile</th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Title / Company</th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)]">Location</th>
                  <th className="px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--muted)] text-right pr-6">Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {rawContacts.map((contact, i) => (
                  <motion.tr 
                    key={contact.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className={`group hover:bg-[var(--bg)] transition-colors ${selectedContacts.includes(contact.id) ? 'bg-blue-600/[0.02]' : ''}`}
                  >
                    <td className="pl-6 py-4">
                      <button 
                        onClick={() => toggleSelect(contact.id)}
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedContacts.includes(contact.id) ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/20' : 'border-[var(--border)] bg-[var(--bg)] text-transparent group-hover:border-zinc-400'}`}
                      >
                        <CheckCircle2 size={12} strokeWidth={3} />
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-[var(--border)] shrink-0">
                          <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-sm font-semibold text-[var(--text)]">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-[var(--text)] line-clamp-1">{contact.title}</p>
                        <p className="text-[10px] font-bold text-blue-600 group-hover:underline cursor-pointer tracking-wider uppercase">{contact.company}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1.5 text-[var(--muted)]">
                        <MapPin size={12} className="text-rose-400" />
                        <span className="text-[11px] font-medium">{contact.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button className="h-8 w-8 rounded-lg flex items-center justify-center text-[var(--muted)] hover:bg-blue-600/10 hover:text-blue-600 transition-all" title="Email">
                          <Mail size={14} />
                        </button>
                        <button className="h-8 w-8 rounded-lg flex items-center justify-center text-[var(--muted)] hover:bg-blue-600/10 hover:text-blue-600 transition-all" title="LinkedIn">
                          <Linkedin size={14} />
                        </button>
                        <button className="h-8 w-8 rounded-lg flex items-center justify-center text-[var(--muted)] hover:bg-[var(--bg)] transition-all">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 📄 REFINED PAGINATION */}
          <div className="px-6 py-4 bg-[var(--bg)]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-[var(--muted)]">
              <span className="font-medium">1 - 25 of 1,802 people</span>
              <div className="flex items-center gap-2 font-bold text-[var(--text)] cursor-pointer hover:text-blue-600 transition-colors">
                Show 25 <ChevronDown size={14} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--muted)] font-medium mr-2">Page 1 of 73</span>
              <button className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--muted)] hover:bg-[var(--card)] transition-all disabled:opacity-30" disabled>
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 rounded-lg border border-[var(--border)] flex items-center justify-center text-[var(--text)] hover:bg-[var(--card)] transition-all shadow-sm">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default NetworkPage;
