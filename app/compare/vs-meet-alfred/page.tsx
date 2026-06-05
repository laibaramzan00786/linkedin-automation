'use client';
import { Check, X, ArrowRight, ChevronRight, Zap, Star, Target, Shield, DollarSign, Layers } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
export default function VsMeetAlfred() {
      const comparisonRows = [
    { feature: "Starting Price", nexus: "$5/month", alfred: "$49/month", nexusWins: true },
    { feature: "LinkedIn Automation", nexus: "Full Purpose-Built", alfred: "Full Part of Bundle", nexusWins: true },
    { feature: "LinkedIn-Only Pricing", nexus: true, alfred: false, nexusWins: true },
    { feature: "Multi-Step Drip Campaigns", nexus: true, alfred: true, nexusWins: false },
    { feature: "Smart Conditional Logic", nexus: true, alfred: true, nexusWins: false },
    { feature: "Profile Visit Automation", nexus: true, alfred: true, nexusWins: false },
    { feature: "Post Engagement Automation", nexus: true, alfred: true, nexusWins: false },
    { feature: "Setup Time", nexus: "5 minutes", alfred: "30+ minutes (multi-channel config)", nexusWins: true },
    { feature: "Interface Complexity", nexus: "Clean LinkedIn focused", alfred: "Complex 3 channel setup", nexusWins: true },
    { feature: "Free Trial No Card", nexus: true, alfred: false, nexusWins: true },
    { feature: "Campaign Analytics", nexus: "Real-time", alfred: "Real-time", nexusWins: false },
    { feature: "LinkedIn Performance Optimization", nexus: "Purpose-built algorithms", alfred: "Generalist multi-channel approach", nexusWins: true },
  ];
  
  const reasons = [
    {
      icon: <Target size={24} />,
      title: "Purpose-Built Always Beats Generalist",
      body: "Meet Alfred was designed to be a Swiss Army knife LinkedIn, Email, Twitter, all in one place. NexusFlow was built to do one thing exceptionally: LinkedIn automation. Every algorithm, every safety mechanism, every UI decision, and every feature update is focused exclusively on making your LinkedIn outreach more effective."
    },
    {
      icon: <Layers size={24} />,
      title: "The Interface Is Built for LinkedIn Professionals",
      body: "When you open Meet Alfred, you are looking at a multi-channel command center with settings for Email SMTP, Twitter API credentials, and cross-platform sequence logic. NexusFlow's interface is clean, focused, and built around the LinkedIn workflow. You can build and launch a campaign without navigating a single screen that is not relevant to your work."
    },
    {
      icon: <Shield size={24} />,
      title: "Smarter LinkedIn-Specific Safety",
      body: "Because NexusFlow is LinkedIn-only, every aspect of the safety system daily limits, action pacing, behavioral mimicry, detection avoidance is calibrated specifically for LinkedIn's platform behavior. Meet Alfred's safety layer has to balance parameters across three platforms. That generalization means LinkedIn-specific safety gets diluted."
    },
    {
      icon: <DollarSign size={24} />,
      title: "You Pay for What You Use Full Stop",
      body: "At $49/month, Meet Alfred is charging you for Email automation and Twitter automation whether you use them or not. At $9/month, NexusFlow charges you for LinkedIn automation. That is it. No bundles. No unused features. No inflated price tag."
    },
  ];
  
  const testimonials = [
    {
      quote: "I tried Meet Alfred for two months. The LinkedIn features were good but I was wading through Email and Twitter setup screens constantly to get to what I actually wanted. NexusFlow is just LinkedIn. Everything is exactly where I expect it to be. My campaign setup time dropped from 40 minutes to 7.",
      name: "Priya Sharma",
      role: "Agency Founder"
    },
    {
      quote: "Moved from Meet Alfred to NexusFlow and my LinkedIn reply rate went up 12%. I genuinely think it is because NexusFlow's pacing and safety algorithms are tuned specifically for LinkedIn. The platform-specific focus shows in the results.",
      name: "Connor Walsh",
      role: "Enterprise Sales"
    },
  ];
  const CellValue = ({ val }: { val: boolean | string }) => {
    if (val === true) return <div className="flex justify-center"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><Check size={13} className="text-[#10b981]" /></div></div>;
    if (val === false) return <div className="flex justify-center"><div className="w-6 h-6 rounded-full flex items-center justify-center"><X size={13} className="text-zinc-600" /></div></div>;
    return <span className="text-sm font-semibold text-zinc-700">{val}</span>;
  };
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <section className="relative pt-44 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8836a]/5 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-8 border border-[#feedea]">
              LinkedIn-First Wins · Focus vs Feature Bloat · 2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-5 leading-[1.15]"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
              Meet Alfred Charges You for Three Channels.{" "}
              <span className="text-[#e8836a]">You Only Need One.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
              Meet Alfred bundles LinkedIn, Email, and Twitter automation into a $49–$89/month package. If LinkedIn is your primary outreach channel as it is for the majority of B2B professionals you are paying for two channels you are not using. NexusFlow gives you a sharper, faster LinkedIn automation tool at $5–$9/month.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-10 py-5 bg-zinc-950 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#e8836a] transition-all shadow-xl flex items-center gap-2 justify-center">
                Switch to NexusFlow Start Free <ArrowRight size={16} />
              </button>
                <button
                className="px-10 py-5 border border-zinc-200 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2 justify-center"
              >
                Compare Features
                <ChevronRight size={16} />
              </button>
            </motion.div>
            <p className="text-sm text-zinc-400">✓ No credit card required &nbsp;·&nbsp; ✓ LinkedIn-only pricing &nbsp;·&nbsp; ✓ Cancel anytime</p>
          </div>
        </section>
          <div className="py-5 px-6">
                         <p className="text-center text-zinc-950  text-sm font-medium">
                            The average NexusFlow user saves{" "}
                           <span className="text-[#e8836a] font-bold">$80/month</span>{" "}
                           switching from Meet Alfred's Business plan with better LinkedIn-specific performance.
                         </p>
                       </div>
               
                       <section className="py-24 px-6">
                         <div className="max-w-4xl mx-auto">
                           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">Feature-by-Feature Comparison</h2>
                           <p className="text-zinc-500 text-center mb-14 font-medium">NexusFlow vs Meet Alfred what you actually get</p>
                           <div className="rounded-[32px] border border-zinc-200 overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)]">
                             <div className="grid grid-cols-3 bg-zinc-950 px-8 py-5">
                               <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Feature</p>
                               <p className="text-xs font-bold text-[#e8836a] uppercase tracking-widest text-center">NexusFlow</p>
                               <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Meet Alfred</p>
                             </div>
                             {comparisonRows.map((row, i) => (
                               <div key={i} className={`grid grid-cols-3 px-8 py-5 items-center border-t border-zinc-100 ${row.nexusWins ? "bg-[#fdf2f0]/30" : "bg-white"}`}>
                                 <p className="text-sm font-semibold text-zinc-700">{row.feature}</p>
                                 <div className="text-center"><CellValue val={row.nexus} /></div>
                                 <div className="text-center"><CellValue val={row.alfred} /></div>
                               </div>
                             ))}
                           </div>
                         </div>
                       </section>
               
                    
                       <section className="py-24 px-6 bg-zinc-50">
                         <div className="max-w-4xl mx-auto">
                           <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">Why NexusFlow Outperforms Meet Alfred on LinkedIn</h2>
                           <p className="text-zinc-500 text-center mb-14 font-medium">Focus beats feature bloat. Every time.</p>
                           <div className="space-y-6">
                             {reasons.map((r, i) => (
                               <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                 className="bg-white rounded-[24px] border border-zinc-200 p-8 flex gap-6 shadow-sm hover:shadow-md transition-shadow">
                                 <div className="w-12 h-12 bg-[#fdf2f0] text-[#e8836a] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#feedea]">
                                   {r.icon}
                                 </div>
                                 <div>
                                   <h3 className="text-lg font-bold mb-2 text-zinc-900">{r.title}</h3>
                                   <p className="text-zinc-500 leading-relaxed font-medium text-sm">{r.body}</p>
                                 </div>
                               </motion.div>
                             ))}
                           </div>
                         </div>
                       </section>
               
                       <section className="py-24 px-6">
                         <div className="max-w-4xl mx-auto">
                           <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight">What Users Say</h2>
                           <div className="grid md:grid-cols-2 gap-6">
                             {testimonials.map((t, i) => (
                               <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                 className="bg-zinc-50 rounded-[24px] border border-zinc-200 p-8">
                                 <div className="flex gap-1 mb-4">
                                   {[...Array(5)].map((_, s) => <Star key={s} size={14} fill="#e8836a" className="text-[#e8836a]" />)}
                                 </div>
                                 <p className="text-zinc-700 leading-relaxed mb-6 font-medium text-sm">"{t.quote}"</p>
                                 <div>
                                   <p className="font-bold text-zinc-900 text-sm">{t.name}</p>
                                   <p className="text-xs text-zinc-400 font-medium">{t.role}</p>
                                 </div>
                               </motion.div>
                             ))}
                           </div>
                         </div>
                       </section>
               
        
                       <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8836a]/10 rounded-full blur-[120px] pointer-events-none" />
                         <div className="max-w-3xl mx-auto text-center relative z-10">
                           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                             The Sharpest LinkedIn Automation Tool on the Market.{" "}
                             <span className="text-[#e8836a]">$9/Month.</span>
                           </h2>
                           <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                             <button className="px-10 py-5 bg-[#e8836a] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#d4714a] transition-all shadow-xl flex items-center gap-2 justify-center">
                               Start Free Trial <ArrowRight size={16} />
                             </button>
                             <button className="px-10 py-5 border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                               View Pricing
                             </button>
                           </div>
                           <p className="text-zinc-500 text-sm">LinkedIn-first · No channel bloat · No credit card · Cancel anytime</p>
                         </div>
                       </section>

      </main>
      <Footer />
    </div>
  );
}