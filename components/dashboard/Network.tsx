'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  Plus, 
  Download, 
  Briefcase, 
  Building2, 
  Tag, 
  Info, 
  ChevronDown, 
  FileText,
  Send,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
    contactInfo: "No data"
  },
  {
    id: "2",
    name: "Ayesha Malik",
    title: "HR Business Partner",
    company: "InnovateX Pvt Ltd",
    website: "https://www.innovatex.com",
    location: "Lahore, Pakistan",
    avatar: "https://www.headshotphoto.io/images/blogs/classic-suit.png",
    contactInfo: "No data"
  },
  {
    id: "3",
    name: "Usman Tariq",
    title: "Recruitment Specialist",
    company: "AlphaByte Technologies",
    website: "https://www.alphabyte.io",
    location: "Karachi, Pakistan",
    avatar: "https://static.vecteezy.com/system/resources/thumbnails/005/346/410/small/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo.jpg",
    contactInfo: "No data"
  },
  {
    id: "4",
    name: "Fatima Noor",
    title: "HR Operations Manager",
    company: "CloudCore Systems",
    website: "https://www.cloudcore.io",
    location: "Rawalpindi, Pakistan",
    avatar: "https://i.pinimg.com/736x/f6/ee/13/f6ee1311d121ea0cef159ff502d21720.jpg",
    contactInfo: "No data"
  },
  {
    id: "5",
    name: "Ali Hamza",
    title: "People & Culture Lead",
    company: "NextGen Labs",
    website: "https://www.nextgenlabs.co",
    location: "Faisalabad, Pakistan",
    avatar: "https://market-resized.envatousercontent.com/photodune.net/EVA/TRX/b4/06/80/53/a4/v1_E11/E1139EUA.jpeg?auto=format&q=94&mark=https%3A%2F%2Fassets.market-storefront.envato-static.com%2Fwatermarks%2Fphoto-260724.png&opacity=0.2&cf_fit=contain&w=590&h=884&s=ade8cb2e5494eaec7be4aec07992678588d92aac7b5fa40a4c5398593972fa6a",
    contactInfo: "No data"
  },
  {
    id: "6",
    name: "Zainab Sheikh",
    title: "Senior HR Executive",
    company: "BrightPath Solutions",
    website: "https://www.brightpathsol.com",
    location: "Multan, Pakistan",
    avatar: "https://media.easy-peasy.ai/fd0c6de9-b0a0-4378-9479-d596ce64bbd4/51860b5d-8fd6-41ce-b107-6fb783ff7837_medium.webp",
    contactInfo: "No data"
  }
];

const NetworkPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>("JOB TITLE");

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
    <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-100px)] font-sans text-white">
      <div className="w-full lg:w-80 space-y-4">
        <div className="bg-[#0d0d0d] rounded-2xl shadow-2xl border border-white/5 p-6 space-y-6">
          <h2 className="text-lg font-bold text-white tracking-tight">Filters</h2>
          
      
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white placeholder:text-zinc-700"
            />
          </div>

          <div className="space-y-1">
            {[
              { label: "JOB TITLE", icon: Briefcase },
              { label: "COMPANY", icon: Building2 },
              { label: "CONTACT INFO", icon: Info },
            ].map((filter, i) => (
              <div key={i} className="border-b border-white/5 last:border-0 pb-1">
                <button 
                  onClick={() => toggleFilter(filter.label)}
                  className="w-full flex items-center justify-between py-4 text-zinc-500 hover:text-zinc-200 transition-all group/btn"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                      activeFilter === filter.label ? "bg-blue-500/10 text-blue-500" : "bg-white/5 text-zinc-600 group-hover/btn:text-zinc-400"
                    )}>
                      <filter.icon size={14} />
                    </div>
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                      activeFilter === filter.label ? "text-white" : "text-zinc-500"
                    )}>{filter.label}</span>
                  </div>
                  <ChevronDown size={16} className={cn("transition-transform duration-300", activeFilter === filter.label ? "rotate-180 text-blue-500" : "text-zinc-700")} />
                </button>
                <AnimatePresence>
                  {activeFilter === filter.label && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 pb-4 pt-1">
                        <input 
                          type="text" 
                          placeholder={`Enter ${filter.label.toLowerCase()}...`} 
                          className="w-full bg-black/40 border border-blue-500/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-800 text-white"
                          autoFocus
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 text-xs uppercase tracking-widest">
            <Search size={16} />
            Apply Filters
          </button>
        </div>
      </div>

     
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between bg-[#0d0d0d] p-4 rounded-2xl border border-white/5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2.5 bg-white/[0.03] rounded-xl border border-white/10">
              <input 
                type="checkbox" 
                checked={selectedContacts.length === rawContacts.length && rawContacts.length > 0}
                onChange={toggleSelectAll}
                className="w-4 h-4 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500/20 cursor-pointer" 
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{selectedContacts.length} selected</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20">
              Grow Network
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2">
              <Download size={14} />
              Export
            </button>
          </div>
        </div>
        <div className="bg-[#0d0d0d] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02] border-b border-white/5">
                  <th className="w-16 px-6 py-5 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedContacts.length === rawContacts.length && rawContacts.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500/20 cursor-pointer" 
                    />
                  </th>
                  <th className="w-12 px-4 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">#</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Profile</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Contact Info</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Company, Site</th>
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Location</th>
                  
                  <th className="px-6 py-5 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rawContacts.map((contact, i) => (
                  <motion.tr 
                    key={contact.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-5 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => toggleSelect(contact.id)}
                        className="w-4 h-4 rounded border-white/20 bg-transparent text-blue-500 focus:ring-blue-500/20 cursor-pointer" 
                      />
                    </td>
                    <td className="px-4 py-5 text-xs font-bold text-zinc-800 text-center">{i + 1}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/10 shadow-xl shrink-0">
                          <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-white group-hover:text-blue-500 cursor-pointer transition-colors">{contact.name}</span>
                          <span className="text-[11px] text-zinc-600 font-medium line-clamp-1">{contact.title}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-medium text-zinc-700">{contact.contactInfo}</td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-400">{contact.company}</span>
                        <span className="text-[10px] text-blue-500/60 hover:text-blue-500 hover:underline cursor-pointer truncate max-w-[150px] transition-colors">{contact.website}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-xs font-bold text-zinc-600">{contact.location}</td>
                    <td className="px-6 py-5">
                      <button className="h-9 w-9 rounded-xl bg-white/5 flex items-center justify-center text-zinc-700 hover:bg-blue-500/10 hover:text-blue-500 transition-all">
                        <Plus size={16} />
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-700 hover:text-white transition-all">
                          <FileText size={18} />
                        </button>
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-700 hover:text-white transition-all">
                          <Send size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-8 py-5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-600">People per page:</span>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 cursor-pointer hover:bg-white/10 transition-colors">
                25 <ChevronDown size={14} />
              </div>
              <span className="text-xs text-zinc-700">1 - 25 of 1,802 people</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-700">1 of 73 pages</span>
              </div>
              <div className="flex items-center gap-1">
                <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-700 transition-all border border-transparent hover:border-white/10">
                  <ChevronLeft size={20} />
                </button>
                <button className="h-10 w-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-zinc-700 transition-all border border-transparent hover:border-white/10">
                  <ChevronRight size={20} />
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
