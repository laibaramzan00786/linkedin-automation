
'use client';
import { useState } from "react";
import { 
  Users, 
  Target, 
  Building2, 
  TrendingUp, 
  ArrowRight, 
  Zap, 
  Search, 
  Check, 
  ChevronRight,
  LineChart
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SolutionsPage = () => {
  const [activeSolution, setActiveSolution] = useState("sales");

  const solutions = [
    {
      id: "sales",
      label: "Sales Teams",
      icon: <Target size={22} />,
      title: "Accelerate your pipeline.",
      desc: "Empower your sales team with automated outreach that feels personal and books more high-quality meetings.",
      features: [
        "Lead generation automation",
        "Meeting booking system",
        "Pipeline acceleration",
        "Team collaboration",
      ],
      stats: [
        { label: "Meetings Booked", value: "+240%", color: "text-[#e8836a]" },
        { label: "Reply Rate", value: "41%", color: "text-zinc-900" },
        { label: "Pipeline Value", value: "$1.2M", color: "text-[#e8836a]" }
      ]
    },
    {
      id: "agencies",
      label: "Growth Agencies",
      icon: <Building2 size={22} />,
      title: "Scale your client results.",
      desc: "Manage multiple client campaigns from a single powerful dashboard with white-labeled reporting.",
      features: [
        "Multi-client management",
        "White-label reporting",
        "Campaign scaling",
        "ROI tracking",
      ],
      stats: [
        { label: "Managed Accounts", value: "50+", color: "text-[#e8836a]" },
        { label: "Churn Rate", value: "2%", color: "text-emerald-500" },
        { label: "Time Saved", value: "85%", color: "text-[#e8836a]" }
      ]
    },
    {
      id: "recruiters",
      label: "Talent Sourcing",
      icon: <Users size={22} />,
      title: "Find top talent faster.",
      desc: "Automate candidate sourcing and outreach to reach the best talent before your competitors do.",
      features: [
        "Candidate sourcing",
        "Automated follow-ups",
        "Talent pool building",
        "Response management",
      ],
      stats: [
        { label: "Response Rate", value: "68%", color: "text-[#e8836a]" },
        { label: "Hire Time", value: "-40%", color: "text-emerald-500" },
        { label: "Candidates", value: "10k+", color: "text-[#e8836a]" }
      ]
    },
  ];

  const active = solutions.find((s) => s.id === activeSolution);

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#e8836a]/10 selection:text-[#e8836a] font-sans overflow-x-hidden">
      <Navbar />

      <main>
        <section className="relative pt-48 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-[0%] right-[0%] w-[40%] h-[40%] bg-[#e8836a]/5 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-10 border border-[#feedea]"
            >
              <Zap size={12} />
              Scaling Solution Engines
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              Built for every <span className="text-[#e8836a]">industry.</span>
            </h1>

            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium">
              NexusFlow adapts to your unique business model and helps your team scale outreach, engagement, and revenue across any platform.
            </p>
          </div>
        </section>

        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto">
          
            <div className="flex flex-wrap justify-center gap-4 mb-20">
              {solutions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSolution(s.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all
                  ${
                    activeSolution === s.id
                      ? "bg-zinc-950 text-white shadow-2xl"
                      : "bg-zinc-50 border border-zinc-200 text-zinc-500 hover:bg-zinc-100"
                  }`}
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
            </div>

            <div className="rounded-[48px] border border-zinc-200 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="grid lg:grid-cols-2">
    
                <div className="p-12 lg:p-20">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSolution}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-[#fdf2f0] text-[#e8836a] flex items-center justify-center mb-8 border border-[#feedea]">
                        {active?.icon}
                      </div>

                      <h2 className="text-4xl font-bold mb-6 tracking-tight text-zinc-900">
                        {active?.title}
                      </h2>

                      <p className="text-lg text-zinc-500 mb-10 max-w-lg leading-relaxed font-medium">
                        {active?.desc}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-12">
                        {active?.features.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-50 border border-transparent hover:border-[#fdf2f0] transition-colors"
                          >
                            <div className="w-6 h-6 bg-[#feedea] text-[#e8836a] rounded-full flex items-center justify-center flex-shrink-0">
                              <Check size={12} />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-zinc-700">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button className="flex items-center gap-3 px-10 py-5 rounded-full bg-zinc-950 text-white font-bold text-sm uppercase tracking-widest hover:bg-[#e8836a] transition-all shadow-xl">
                        Deploy Solution
                        <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="bg-zinc-50 p-12 lg:p-20 flex flex-col justify-center">
                  <div className="space-y-6 w-full max-w-md mx-auto">
                    <p className="text-[10px] font-bold text-[#e8836a] uppercase tracking-[0.4em] mb-4 text-center">Performance Metrics</p>
                    {active?.stats.map((stat, i) => (
                      <motion.div
                        key={`${activeSolution}-stat-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-zinc-200 rounded-[24px] p-8 shadow-sm flex items-center justify-between"
                      >
                        <div>
                          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                          <h3 className={`text-4xl font-bold ${stat.color}`}>{stat.value}</h3>
                        </div>
                        <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center">
                          {i === 2 ? <LineChart className="text-[#e8836a]" /> : <TrendingUp className="text-[#e8836a]" />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 py-32 px-6 overflow-hidden relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#e8836a]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-24 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Built for speed. <br /><span className="text-[#e8836a]">Refined by data.</span></h2>
              <p className="text-zinc-400 font-medium">A surgical approach to growth, refined through thousands of successful campaigns across the globe.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Intelligence",
                  desc: "We map your industry market signals to find the leads that are ready to buy now.",
                  icon: <Search size={28} />,
                },
                {
                  title: "Engagement",
                  desc: "Sophisticated outreach sequences that maintain your personal voice at scale.",
                  icon: <Zap size={28} />,
                },
                {
                  title: "Optimization",
                  desc: "Real-time AI behavioral analytics that refine your strategy every single minute.",
                  icon: <TrendingUp size={28} />,
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-[40px] p-12 hover:bg-white/10 transition-all group"
                >
                  <div className="w-16 h-16 bg-[#e8836a] text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-[#e8836a]/20">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight mb-8">Ready to transform?</h2>
            <p className="text-zinc-500 text-lg mb-12 font-medium max-w-xl mx-auto">Join the most ambitious teams already capturing the market with NexusFlow intelligence.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-14 py-6 bg-zinc-950 text-white rounded-full font-bold text-lg hover:bg-[#e8836a] transition-all shadow-2xl active:scale-95">Start Scaling Free</button>
              <button className="px-14 py-6 border border-zinc-200 rounded-full font-bold text-lg hover:bg-zinc-50 transition-all flex items-center gap-2 justify-center">Talk to a Strategist <ChevronRight size={20}/></button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionsPage;
