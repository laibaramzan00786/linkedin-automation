'use client';
import { motion } from 'motion/react';
import { Search, Book, MessageCircle, Play, FileText, ChevronRight, HelpCircle, ArrowRight, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const categories = [
  {
    title: "Getting Started",
    icon: <Play className="text-[#e8836a]" size={24} />,
    articles: ["Setting up your account", "Connecting LinkedIn", "Your first campaign", "Dashboard overview"],
    count: 12
  },
  {
    title: "Campaigns",
    icon: <FileText className="text-[#e8836a]" size={24} />,
    articles: ["Creating sequences", "A/B testing", "Personalization tags", "Scheduling"],
    count: 24
  },
  {
    title: "Integrations",
    icon: <Book className="text-[#e8836a]" size={24} />,
    articles: ["CRM Sync", "Zapier integration", "Webhooks", "Email providers"],
    count: 8
  },
  {
    title: "Billing & Account",
    icon: <HelpCircle className="text-[#e8836a]" size={24} />,
    articles: ["Subscription plans", "Managing team", "Invoices", "Security"],
    count: 15
  }
];

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#e8836a]/10 selection:text-[#e8836a] font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="pt-40">
        <div className="bg-zinc-50/50 py-24 mb-24 border-y border-zinc-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-10 border border-[#feedea]"
              >
                Support Hub
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-zinc-950 mb-10 tracking-tight leading-[1.1]"
            >
              How can we <span className="text-[#e8836a]">help?</span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-3xl mx-auto relative group"
            >
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#e8836a] transition-colors" size={24} />
              <input 
                type="text" 
                placeholder="Search for articles, guides, and more..." 
                className="w-full pl-20 pr-8 py-7 bg-white border border-zinc-200 rounded-[32px] text-xl shadow-2xl shadow-zinc-200/50 focus:outline-none focus:ring-8 focus:ring-[#e8836a]/5 focus:border-[#e8836a] transition-all placeholder:text-zinc-400"
              />
            </motion.div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <span className="text-zinc-400">Popular:</span>
              <a href="#" className="text-zinc-900 hover:text-[#e8836a] transition-colors">LinkedIn Sync</a>
              <a href="#" className="text-zinc-900 hover:text-[#e8836a] transition-colors">API Keys</a>
              <a href="#" className="text-zinc-900 hover:text-[#e8836a] transition-colors">Scaling Plans</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 lg:p-12 bg-white border border-zinc-100 rounded-[48px] hover:border-[#e8836a]/30 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 rounded-[20px] bg-[#fdf2f0] flex items-center justify-center group-hover:bg-[#e8836a] group-hover:text-white transition-all duration-500 border border-[#feedea]">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-950 tracking-tight">{cat.title}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#e8836a]">{cat.count} curated articles</p>
                  </div>
                </div>
                <ul className="space-y-6">
                  {cat.articles.map((article) => (
                    <li key={article}>
                      <a href="#" className="flex items-center justify-between text-zinc-600 hover:text-zinc-950 transition-colors group/item">
                        <span className="text-[13px] font-bold uppercase tracking-widest leading-none">{article}</span>
                        <ChevronRight size={16} className="text-zinc-300 group-hover/item:translate-x-2 group-hover/item:text-[#e8836a] transition-all" />
                      </a>
                    </li>
                  ))}
                </ul>
                <button className="mt-12 text-[10px] font-black uppercase tracking-widest text-[#e8836a] hover:gap-3 flex items-center gap-2 transition-all group/btn">
                  Explore full category <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-12 bg-zinc-950 rounded-[40px] text-center group">
              <div className="w-14 h-14 bg-[#e8836a]/10 border border-[#e8836a]/20 text-[#e8836a] rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-[#e8836a] group-hover:text-white transition-all duration-500">
                <MessageCircle size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Live Protocol</h4>
              <p className="text-zinc-500 text-sm mb-10 font-medium leading-relaxed">Typical response time: 5 minutes</p>
              <button className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-white hover:text-zinc-950 transition-all">
                Initiate Chat
              </button>
            </div>
            
            <div className="p-12 bg-[#e8836a] rounded-[40px] text-center group shadow-2xl shadow-[#e8836a]/20">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Community Hub</h4>
              <p className="text-white/70 text-sm mb-10 font-medium leading-relaxed">Get strategic help from veteran users</p>
              <button className="w-full py-5 bg-white text-zinc-950 rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-zinc-950 hover:text-white transition-all">
                Join Forum
              </button>
            </div>

            <div className="p-12 bg-zinc-50 rounded-[40px] text-center border border-zinc-100 group">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 border border-zinc-200 group-hover:border-[#e8836a] transition-all">
                <Book className="text-zinc-400 group-hover:text-[#e8836a] transition-colors" size={28} />
              </div>
              <h4 className="text-xl font-bold text-zinc-950 mb-2">Video Vault</h4>
              <p className="text-zinc-500 text-sm mb-10 font-medium leading-relaxed">Step-by-step masterclasses</p>
              <button className="w-full py-5 bg-zinc-950 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest hover:bg-[#e8836a] transition-all">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HelpCenterPage;
