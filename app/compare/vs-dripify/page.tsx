'use client';
import { ArrowRight, ChevronRight, Clock, DollarSign, Shield, Users2 , TrendingUp, Zap,Check,X,Star} from "lucide-react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function VsDripify() {
      const comparisonRows = [
    { feature: "Starting Price", nexus: "$5/month", dripify: "$39/month", nexusWins: true },
    { feature: "Free Trial  No Card", nexus: true, dripify: false, nexusWins: true },
    { feature: "Connection Request Automation", nexus: true, dripify: true, nexusWins: false },
    { feature: "Multi-Step Drip Campaigns", nexus: "All plans", dripify: "Higher tiers only", nexusWins: true },
    { feature: "Smart Conditional Logic", nexus: "All plans", dripify: "Pro plan only", nexusWins: true },
    { feature: "Profile Visit Automation", nexus: true, dripify: true, nexusWins: false },
    { feature: "Post Engagement Automation", nexus: true, dripify: true, nexusWins: false },
    { feature: "Cloud-Based No Extension", nexus: true, dripify: true, nexusWins: false },
    { feature: "Real-Time Campaign Analytics", nexus: true, dripify: true, nexusWins: false },
    { feature: "Account Safety Limits", nexus: "Smart AI-based", dripify: "Basic limits", nexusWins: true },
    { feature: "Setup Time", nexus: "Under 5 minutes", dripify: "15–20 minutes", nexusWins: true },
    { feature: "Interface Simplicity", nexus: "Built for speed", dripify: "Feature-heavy UI", nexusWins: true },
    { feature: "Pricing Transparency", nexus: "2 clean plans", dripify: "Complex tier structure", nexusWins: true },
  ];
  const reasons = [
    {
      icon: <DollarSign size={24} />,
      title: "NexusFlow Gives You More at Every Price Point",
      body: "Dripify locks its most powerful features conditional logic, advanced sequences behind higher tiers. With NexusFlow, conditional logic and multi-step drip campaigns are available from the very first plan. You get the full automation toolkit from day one, not after upgrading."
    },
    {
      icon: <Clock size={24} />,
      title: "Setup in Under 5 Minutes — Not 20",
      body: "Dripify's interface is packed with options, settings, and configurations designed for large enterprise teams. NexusFlow was designed around speed most users run their first campaign within 5 minutes of signing up."
    },
    {
      icon: <Shield size={24} />,
      title: "Smarter Account Safety",
      body: "NexusFlow's safety engine uses dynamic daily limits that adjust based on your account's age, history, and activity patterns. Dripify uses fixed limits that apply the same thresholds to a brand new account as to a 3-year-old one."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Pricing Built for Real Businesses",
      body: "Dripify's pricing was designed for funded sales teams with generous SaaS budgets. At $39–$89/month, it is an expensive commitment for individuals and growing teams. NexusFlow at $5–$9/month delivers the same LinkedIn outreach power."
    },
    {
      icon: <Zap size={24} />,
      title: "Free Trial With Zero Friction",
      body: "Dripify asks for a credit card before you can test anything. NexusFlow gives you a real free trial actual campaign credits, actual automation without touching your payment details."
    },
  ];
  const CellValue = ({ val }: { val: boolean | string }) => {
    if (val === true) return <div className="flex justify-center"><div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"><Check size={13} className="text-[#10b981]" /></div></div>;
    if (val === false) return <div className="flex justify-center"><div className="w-6 h-6 rounded-full flex items-center justify-center"><X size={13} className="text-zinc-600" /></div></div>;
    return <span className="text-sm font-semibold text-zinc-700">{val}</span>;
  };
  const testimonials = [
    {
      quote: "I switched from Dripify to NexusFlow expecting to lose features. Instead I found a cleaner interface, the same campaign results, and $50/month back in my pocket. I genuinely do not understand why I waited so long.",
      name: "James Hartley",
      role: "Business Development Manager"
    },
    {
      quote: "NexusFlow's conditional logic is actually easier to set up than Dripify's. I built a 5-step sequence with branching in 10 minutes. That took me an hour on Dripify the first time.",
      name: "Rachel Moore",
      role: "Sales Lead · B2B Tech"
    },
  ];

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
              Independent Comparison · Updated 2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-5 leading-[1.15]"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
              Finally. A LinkedIn Automation Tool That{" "}
              <span className="text-[#e8836a]">Doesn't Cost a Fortune.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
              Dripify charges $39–$89/month. NexusFlow delivers the same and in key areas, better LinkedIn automation at $5–$9/month. Smarter pricing. Cleaner interface. Faster setup. No compromises.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-10 py-5 bg-zinc-950 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#e8836a] transition-all shadow-xl flex items-center gap-2 justify-center">
                Start Free with NexusFlow <ArrowRight size={16} />
              </button>
              <button
  className="px-10 py-5 border border-zinc-200 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2 justify-center"
>
  See Full Comparison
  <ChevronRight size={16} />
</button>
            </motion.div>
            <p className="text-sm text-zinc-400">✓ No credit card required &nbsp;·&nbsp; ✓ Free trial included &nbsp;·&nbsp; ✓ Cancel anytime</p>
          </div>
        </section>
<div className="text-center mb-16">
  <p className="text-sm text-zinc-500">
     NexusFlow users save
    <span className="font-semibold text-zinc-900"> $600/year on average </span>
    after switching from Dripify.
  </p>
</div>
  
          <section className="py-19 px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">Feature-by-Feature Comparison</h2>
              <p className="text-zinc-500 text-center mb-14 font-medium">NexusFlow vs Dripify every feature that matters</p>
              <div className="rounded-[32px] border border-zinc-200 overflow-hidden shadow-[0_20px_60px_-10px_rgba(0,0,0,0.08)]">
                <div className="grid grid-cols-3 bg-zinc-950 px-8 py-5">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Feature</p>
                  <p className="text-xs font-bold text-[#e8836a] uppercase tracking-widest text-center">NexusFlow</p>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">Dripify</p>
                </div>
                {comparisonRows.map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 px-8 py-5 items-center border-t border-zinc-100 ${row.nexusWins ? "bg-[#fdf2f0]/30" : "bg-white"}`}>
                    <p className="text-sm font-semibold text-zinc-700">{row.feature}</p>
                    <div className="text-center"><CellValue val={row.nexus} /></div>
                    <div className="text-center"><CellValue val={row.dripify} /></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-24 px-6 bg-zinc-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">Why Teams Are Switching From Dripify</h2>
              <p className="text-zinc-500 text-center mb-14 font-medium">5 reasons NexusFlow wins at every price point</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 tracking-tight">What NexusFlow Users Say After Switching</h2>
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
  
          <section className="py-16 px-6 bg-zinc-50">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-zinc-500 leading-relaxed font-medium">
                Dripify is a capable tool. But capability alone does not justify paying 8x more per month for the same LinkedIn outcomes. NexusFlow matches Dripify on every core feature that matters — and beats it on price, setup speed, interface simplicity, and account safety intelligence.
              </p>
            </div>
          </section>
  
          <section className="py-32 px-6 bg-zinc-950 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e8836a]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Everything Dripify Does. At{" "}
                <span className="text-[#e8836a]">$5/Month Instead of $39.</span>
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <button className="px-10 py-5 bg-[#e8836a] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#a84a34] transition-all shadow-xl flex items-center gap-2 justify-center">
                  Start Free Trial <ArrowRight size={16} />
                </button>
                <button className="px-10 py-5 border border-white/20 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                  View Full Pricing
                </button>
              </div>
              <p className="text-zinc-500 text-sm">No credit card · Full features from day one · Cancel anytime</p>
            </div>
          </section>

      </main>
      <Footer />
    </div>
  );
}