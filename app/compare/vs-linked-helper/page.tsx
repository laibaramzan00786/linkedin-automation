'use client';
import { Check, X, ArrowRight, ChevronRight, Zap, Star, Cloud, Monitor, Shield, Clock } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function VsLinkedHelper() {
  const comparisonRows = [
    { feature: "Architecture", nexus: "100% Cloud", helper: "Desktop App", nexusWins: true },
    { feature: "Runs 24/7 Without Your PC", nexus: true, helper: false, nexusWins: true },
    { feature: "Browser Extension Required", nexus: "None", helper: "Required", nexusWins: true },
    { feature: "LinkedIn Detection Risk", nexus: "Minimal", helper: "Elevated", nexusWins: true },
    { feature: "Setup Time", nexus: "5 minutes", helper: "30–45 minutes", nexusWins: true },
    { feature: "Starting Price", nexus: "$5/month", helper: "$15/month", nexusWins: true },
    { feature: "Full-Feature Price", nexus: "$9/month", helper: "$45/month", nexusWins: true },
    { feature: "Access From Any Device", nexus: "Any browser, anywhere", helper: "One machine only", nexusWins: true },
    { feature: "Automatic Safety Updates", nexus: "Silent, instant", helper: "Manual downloads", nexusWins: true },
    { feature: "Multi-Step Drip Campaigns", nexus: true, helper: true, nexusWins: false },
    { feature: "Conditional Logic", nexus: true, helper: true, nexusWins: false },
    { feature: "Real-Time Analytics", nexus: "Cloud dashboard", helper: "Local only", nexusWins: true },
    { feature: "Campaign Runs While Traveling", nexus: true, helper: false, nexusWins: true },
    { feature: "Campaign Runs While Sleeping", nexus: true, helper: false, nexusWins: true },
  ];
  
  const advantages = [
    {
      icon: <Cloud size={24} />,
      title: "Cloud Infrastructure vs Desktop Dependency",
      body: "NexusFlow's automation engine runs on enterprise-grade cloud servers. Your campaigns execute continuously processing connection requests, queuing messages, triggering follow-ups without any involvement from your local hardware. Linked Helper is architecturally incapable of offering this. It is bound to the machine it is installed on, by design."
    },
    {
      icon: <Shield size={24} />,
      title: "Superior Account Safety Through Cloud Isolation",
      body: "LinkedIn identifies automation tools partly by analyzing browser-level behavior patterns. Linked Helper operates inside your Chrome browser, creating exactly the kind of extension-driven behavioral signature that LinkedIn's detection systems look for. NexusFlow's automation happens entirely off-device there is no browser extension, no local footprint, and no detectable pattern at the client level."
    },
    {
      icon: <Zap size={24} />,
      title: "More Powerful at Half the Price",
      body: "At comparable feature tiers, NexusFlow's Standard plan at $9/month includes everything Linked Helper's $45/month plan offers and adds real-time cloud analytics, multi-device access, and automatic safety updates on top. The feature advantage goes to NexusFlow. The price advantage goes to NexusFlow. The architecture advantage goes to NexusFlow."
    },
    {
      icon: <Clock size={24} />,
      title: "Your Campaigns Don't Take Vacations",
      body: "A week away from your desk means a week without outreach, a week without follow-ups, a week of cold leads that needed warming. NexusFlow eliminates this entirely. Campaigns run at the same consistent pace every single day 365 days a year, whether you are working or not."
    },
  ];
  
  const testimonials = [
    {
      quote: "My laptop went in for repairs and my Linked Helper campaigns stopped for 10 days. Lost an entire pipeline cycle. Moved to NexusFlow and that problem ceased to exist. My campaigns ran through my next holiday, a power outage, and a laptop upgrade without missing a beat.",
      name: "Marcus Webb",
      role: "Head of Sales"
    },
    {
      quote: "The setup comparison is embarrassing for Linked Helper honestly. NexusFlow took 4 minutes. Linked Helper took the better part of an afternoon and three reinstalls.",
      name: "Tom Briggs",
      role: "Freelance Recruiter"
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
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-zinc-100 rounded-full blur-[80px]" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-8 border border-[#feedea]">
              Cloud vs Desktop · The Architecture Advantage · 2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-5 leading-[1.15]"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
              Linked Helper Stops When You Do.{" "}
              <span className="text-[#e8836a]">NexusFlow Never Stops.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
              Linked Helper is a desktop app tied to your local machine. Close your laptop and your campaigns die. NexusFlow is cloud-native your outreach runs 24/7 regardless of your device, your location, or your timezone. And it starts at $5/month versus Linked Helper's $15.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-10 py-5 bg-zinc-950 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#e8836a] transition-all shadow-xl flex items-center gap-2 justify-center">
                Try NexusFlow Free <ArrowRight size={16} />
              </button>
                 <button
                className="px-10 py-5 border border-zinc-200 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2 justify-center"
              >
                See the Difference
                <ChevronRight size={16} />
              </button>
            </motion.div>
            <p className="text-sm text-zinc-400">✓ No credit card required &nbsp;·&nbsp; ✓ Cloud-based &nbsp;·&nbsp; ✓ No downloads ever</p>
          </div>
        </section>
         <div className=" py-5 px-6">
                      <p className="text-center text-zinc-950 text-sm font-medium">
                        ☁️ Linked Helper requires your computer.{" "}
                        <span className="text-[#e8836a] font-bold">NexusFlow requires nothing it runs itself.</span>
                      </p>
                    </div>
                    <section className="py-22 px-6">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">Feature-by-Feature Comparison</h2>
                        <p className="text-zinc-500 text-center mb-14 font-medium">NexusFlow vs Linked Helper the full picture</p>
                        <div className="rounded-[32px] border border-zinc-200 overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)]">
                          <div className="grid grid-cols-3 bg-zinc-950 px-8 py-5">
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Feature</p>
                            <p className="text-xs font-bold text-[#e8836a] uppercase tracking-widest text-center">NexusFlow</p>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Linked Helper</p>
                          </div>
                          {comparisonRows.map((row, i) => (
                            <div key={i} className={`grid grid-cols-3 px-8 py-5 items-center border-t border-zinc-100 ${row.nexusWins ? "bg-[#fdf2f0]/30" : "bg-white"}`}>
                              <p className="text-sm font-semibold text-zinc-700">{row.feature}</p>
                              <div className="text-center"><CellValue val={row.nexus} /></div>
                              <div className="text-center"><CellValue val={row.helper} /></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
            
                    <section className="py-24 px-6 bg-zinc-50">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">The NexusFlow Advantage Explained</h2>
                        <p className="text-zinc-500 text-center mb-14 font-medium">4 structural reasons cloud beats desktop</p>
                        <div className="space-y-6">
                          {advantages.map((a, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                              className="bg-white rounded-[24px] border border-zinc-200 p-8 flex gap-6 shadow-sm hover:shadow-md transition-shadow">
                              <div className="w-12 h-12 bg-[#fdf2f0] text-[#e8836a] rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#feedea]">
                                {a.icon}
                              </div>
                              <div>
                                <h3 className="text-lg font-bold mb-2 text-zinc-900">{a.title}</h3>
                                <p className="text-zinc-500 leading-relaxed font-medium text-sm">{a.body}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </section>
            
                    <section className="py-24 px-6">
                      <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight">What Users Say After Making the Switch</h2>
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
                      Your Competitors' Campaigns Are Running Right Now.{" "}
                      <span className="text-[#e8836a]">Is Yours?</span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                      <button className="px-10 py-5 bg-[#e8836a] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#d4714a] transition-all shadow-xl flex items-center gap-2 justify-center">
                        Try NexusFlow Free <ArrowRight size={16} />
                      </button>
                      <button className="px-10 py-5 border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                        See How It Works
                      </button>
                    </div>
                    <p className="text-zinc-500 text-sm">Cloud-based · No downloads · No browser extension · $5/month</p>
                  </div>
                </section>
      </main>
      <Footer />
    </div>
  );
}