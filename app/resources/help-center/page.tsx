'use client';
import { motion } from 'motion/react';
import { Search, Book, MessageCircle, Play, FileText, ChevronRight, HelpCircle } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const categories = [
  {
    title: "Getting Started",
    icon: <Play className="text-blue-600" size={24} />,
    articles: ["Setting up your account", "Connecting LinkedIn", "Your first campaign", "Dashboard overview"],
    count: 12
  },
  {
    title: "Campaigns",
    icon: <FileText className="text-blue-600" size={24} />,
    articles: ["Creating sequences", "A/B testing", "Personalization tags", "Scheduling"],
    count: 24
  },
  {
    title: "Integrations",
    icon: <Book className="text-blue-600" size={24} />,
    articles: ["CRM Sync", "Zapier integration", "Webhooks", "Email providers"],
    count: 8
  },
  {
    title: "Billing & Account",
    icon: <HelpCircle className="text-blue-600" size={24} />,
    articles: ["Subscription plans", "Managing team", "Invoices", "Security"],
    count: 15
  }
];

const HelpCenterPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="bg-zinc-50 py-24 mb-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-zinc-950 mb-8 tracking-tight"
            >
              How can we help you today?
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto relative"
            >
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input 
                type="text" 
                placeholder="Search for articles, guides, and more..." 
                className="w-full pl-16 pr-6 py-5 bg-white border border-zinc-200 rounded-[24px] text-lg shadow-xl shadow-zinc-200/50 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />
            </motion.div>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm font-medium text-zinc-500">
              <span>Popular:</span>
              <a href="#" className="text-blue-600 hover:underline">LinkedIn Sync</a>
              <a href="#" className="text-blue-600 hover:underline">API Keys</a>
              <a href="#" className="text-blue-600 hover:underline">Pricing</a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white border border-zinc-100 rounded-[32px] hover:border-blue-200 hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950">{cat.title}</h3>
                    <p className="text-sm text-zinc-500">{cat.count} articles</p>
                  </div>
                </div>
                <ul className="space-y-4">
                  {cat.articles.map((article) => (
                    <li key={article}>
                      <a href="#" className="flex items-center justify-between text-zinc-600 hover:text-blue-600 transition-colors group/item">
                        <span className="text-sm font-medium">{article}</span>
                        <ChevronRight size={16} className="text-zinc-300 group-hover/item:translate-x-1 transition-transform" />
                      </a>
                    </li>
                  ))}
                </ul>
                <button className="mt-8 text-sm font-bold text-blue-600 hover:gap-2 flex items-center gap-1 transition-all">
                  View all articles <ChevronRight size={14} />
                </button>
              </motion.div>
            ))}
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-zinc-950 rounded-[32px] text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Live Chat</h4>
              <p className="text-sm text-zinc-400 mb-6">Average response time: 5 mins</p>
              <button className="w-full py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all">
                Start Chat
              </button>
            </div>
            
            <div className="p-8 bg-blue-600 rounded-[32px] text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="text-white" size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Community</h4>
              <p className="text-sm text-white/70 mb-6">Get help from other users</p>
              <button className="w-full py-3 bg-white text-blue-600 rounded-xl font-bold hover:bg-zinc-100 transition-all">
                Join Forum
              </button>
            </div>

            <div className="p-8 bg-zinc-50 rounded-[32px] text-center border border-zinc-100">
              <div className="w-12 h-12 bg-zinc-200 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Book className="text-zinc-600" size={24} />
              </div>
              <h4 className="text-lg font-bold text-zinc-950 mb-2">Video Guides</h4>
              <p className="text-sm text-zinc-500 mb-6">Watch our step-by-step tutorials</p>
              <button className="w-full py-3 bg-zinc-950 text-white rounded-xl font-bold hover:bg-zinc-800 transition-all">
                Watch Now
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