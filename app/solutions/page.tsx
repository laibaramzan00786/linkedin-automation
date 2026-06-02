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
  LineChart,
  Clock,
  BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-zinc-200 rounded-[24px] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-8 text-left hover:bg-zinc-50 transition-colors"
      >
        <span className="font-bold text-zinc-900 text-base pr-4">{question}</span>
        <span className={`text-[#e8836a] flex-shrink-0 text-xl font-bold transition-transform duration-300 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-8 pb-8 text-zinc-500 leading-relaxed font-medium text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SolutionsPage = () => {
  const [activeSolution, setActiveSolution] = useState("sales");

  const solutions = [
    {
      id: "sales",
      label: "Sales Teams",
      icon: <Target size={22} />,
      title: "Close More Deals. Spend Less Time Prospecting on LinkedIn.",
      desc: "NexusFlow automates your entire LinkedIn sales workflow — from finding prospects to sending connection requests, follow-ups, and meeting invites. Your team focuses on closing. NexusFlow handles everything before that.",
      features: [
        "Automated LinkedIn Prospecting",
        "Multi-Step Follow-Up Sequences",
        "Smart Reply Detection",
        "Team Collision Prevention",
      ],
      statsLabel: "WHAT SALES TEAMS ACHIEVE WITH NEXUSFLOW:",
      stats: [
        { 
          label: "Average Reply Rate", 
          value: "↑ 38%", 
          sub: "vs 2–3% industry average for cold outreach",
          color: "text-[#e8836a]",
          icon: <TrendingUp className="text-[#e8836a]" />
        },
        { 
          label: "Time Saved Per Week", 
          value: "⏱ 12 Hrs", 
          sub: "reclaimed from manual LinkedIn prospecting",
          color: "text-zinc-900",
          icon: <Clock className="text-[#e8836a]" />
        },
        { 
          label: "Pipeline Growth", 
          value: "↑ 3.2x", 
          sub: "more qualified conversations per month",
          color: "text-[#e8836a]",
          icon: <BarChart3 className="text-[#e8836a]" />
        }
      ],
      cta: "Start Automating Sales"
    },
    {
      id: "agencies",
      label: "Growth Agencies",
      icon: <Building2 size={22} />,
      title: "Manage Every Client's LinkedIn Outreach From One Dashboard.",
      desc: "NexusFlow lets agencies run separate LinkedIn automation campaigns for every client — with individual analytics, separate account controls, and white-label ready reporting. Scale your agency's output without scaling your headcount.",
      features: [
        "Multi-Account Client Management",
        "Per-Client Campaign Analytics",
        "Bulk Campaign Templates",
        "Client Performance Reports",
      ],
      statsLabel: "AGENCY RESULTS WITH NEXUSFLOW:",
      stats: [
        { 
          label: "Client Capacity", 
          value: "↑ 3x", 
          sub: "more clients managed per team member",
          color: "text-[#e8836a]",
          icon: <TrendingUp className="text-[#e8836a]" />
        },
        { 
          label: "Campaign Setup", 
          value: "⏱ 80% faster", 
          sub: "than building manual outreach workflows",
          color: "text-zinc-900",
          icon: <Clock className="text-[#e8836a]" />
        },
        { 
          label: "Client Retention", 
          value: "↑ Higher", 
          sub: "when results are consistent and visible",
          color: "text-[#e8836a]",
          icon: <LineChart className="text-[#e8836a]" />
        }
      ],
      cta: "Scale Your Agency"
    },
    {
      id: "recruiters",
      label: "Recruiters & HR",
      icon: <Users size={22} />,
      title: "Source Top Talent on LinkedIn Faster Than Your Competition.",
      desc: "NexusFlow automates candidate outreach, follow-up sequences, and profile visits — so your recruitment team spends time interviewing qualified candidates, not chasing cold profiles one by one.",
      features: [
        "Automated Candidate Outreach",
        "Job Opportunity Drip Sequences",
        "Candidate Pipeline Tracking",
        "Profile Visit Automation",
      ],
      statsLabel: "RECRUITER RESULTS WITH NEXUSFLOW:",
      stats: [
        { 
          label: "Candidate Response Rate", 
          value: "↑ 2.5x", 
          sub: "more replies vs manual InMail outreach",
          color: "text-[#e8836a]",
          icon: <TrendingUp className="text-[#e8836a]" />
        },
        { 
          label: "Time to First Response", 
          value: "⏱ 48 Hrs", 
          sub: "average first candidate reply time",
          color: "text-zinc-900",
          icon: <Clock className="text-[#e8836a]" />
        },
        { 
          label: "Profiles Reached Daily", 
          value: "↑ 50+", 
          sub: "automated visits and connection requests",
          color: "text-[#e8836a]",
          icon: <BarChart3 className="text-[#e8836a]" />
        }
      ],
      cta: "Start Sourcing Faster"
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
              Solutions
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              LinkedIn Automation Built for the Way Your Team{" "}
              <span className="text-[#e8836a]">Actually Works.</span>
            </h1>

            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium">
              Whether you are a sales team closing enterprise deals, a growth agency managing multiple clients, or a recruiter sourcing top talent — NexusFlow automates your entire LinkedIn outreach workflow from first connection to booked meeting.
            </p>
          </div>
        </section>

       
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto">
         
            <div className="flex flex-wrap justify-center gap-4 mb-20">
              {solutions.map((s) => (
                <button
                  key={s.id}
                  id={s.id === "sales" ? "sales-teams" : s.id === "agencies" ? "growth-agencies" : "recruiters"}
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
                        {active?.cta}
                        <ArrowRight size={18} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="bg-zinc-50 p-12 lg:p-20 flex flex-col justify-center">
                  <div className="space-y-6 w-full max-w-md mx-auto">
                    <p className="text-[10px] font-bold text-[#e8836a] uppercase tracking-[0.4em] mb-4 text-center">
                      {active?.statsLabel}
                    </p>
                    {active?.stats.map((stat, i) => (
                      <motion.div
                        key={`${activeSolution}-stat-${i}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white border border-zinc-200 rounded-[24px] p-8 shadow-sm"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                              {stat.label}
                            </p>
                            <h3 className={`text-3xl font-bold ${stat.color}`}>
                              {stat.value}
                            </h3>
                          </div>
                          <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center flex-shrink-0">
                            {stat.icon}
                          </div>
                        </div>
                        <p className="text-xs text-zinc-400 font-medium mt-1">{stat.sub}</p>
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
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                The Smarter Way to Run <br />
                <span className="text-[#e8836a]">LinkedIn Outreach at Scale.</span>
              </h2>
              <p className="text-zinc-400 font-medium">
                NexusFlow combines intelligent prospect targeting, personalized message sequencing, and real-time performance data — so every campaign gets smarter the longer it runs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Smart Prospect Targeting",
                  desc: "NexusFlow identifies your ideal LinkedIn prospects using advanced filters — job title, industry, company size, seniority, and location. You define who matters. NexusFlow finds them automatically.",
                  icon: <Search size={28} />,
                },
                {
                  title: "Sequences That Sound Human",
                  desc: "Multi-step LinkedIn outreach sequences with dynamic personalization variables. Every message includes your prospect's name, company, and role — sent at the optimal time for maximum reply rates.",
                  icon: <Zap size={28} />,
                },
                {
                  title: "Campaigns That Learn and Improve",
                  desc: "Real-time analytics show you exactly which messages convert, which sequences underperform, and where to optimize next. Every campaign gets measurably better over time.",
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
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight mb-8">
              Start Automating Your LinkedIn Outreach in Under 5 Minutes.
            </h2>
            <p className="text-zinc-500 text-lg mb-12 font-medium max-w-xl mx-auto">
              Join hundreds of sales teams, recruiters, and agencies already running automated LinkedIn campaigns with NexusFlow. No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-14 py-6 bg-zinc-950 text-white rounded-full font-bold text-lg hover:bg-[#e8836a] transition-all shadow-2xl active:scale-95">
                Start Free Trial →
              </button>
              <button className="px-14 py-6 border border-zinc-200 rounded-full font-bold text-lg hover:bg-zinc-50 transition-all flex items-center gap-2 justify-center">
                Talk to Our Team <ChevronRight size={20}/>
              </button>
            </div>
          </div>
        </section>
 
        <section className="py-24 px-6 bg-zinc-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#feedea]"
              >
                <Zap size={12} />
                FAQ
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                Common Questions About NexusFlow
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Is NexusFlow good for agencies?",
                  a: "Yes — NexusFlow is built specifically for growth agencies managing multiple clients. You get a single dashboard to run separate LinkedIn automation campaigns for every client, with individual analytics, per-client reporting, and bulk campaign templates. Agencies using NexusFlow manage up to 3x more clients per team member without adding headcount."
                },
                {
                  q: "Can recruiters use NexusFlow?",
                  a: "Absolutely. NexusFlow automates the entire LinkedIn recruitment workflow — from candidate outreach and follow-up sequences to profile visits and pipeline tracking. Recruitment teams using NexusFlow see 2.5x more candidate replies compared to manual InMail outreach, with an average first response within 48 hours."
                },
                {
                  q: "How does NexusFlow work for sales teams?",
                  a: "NexusFlow automates your entire LinkedIn sales workflow — finding the right prospects, sending connection requests, running multi-step follow-up sequences, and detecting replies. Your sales team focuses on closing deals. NexusFlow handles everything before that. Most teams reclaim 12+ hours per week from manual LinkedIn prospecting."
                },
                {
                  q: "Is LinkedIn automation safe to use?",
                  a: "NexusFlow is built with LinkedIn's limits in mind. Our smart rate controls and human-like send timing keep your account safe while maximising outreach volume. We stay within recommended daily limits so your LinkedIn account stays in good standing."
                },
                {
                  q: "Do I need a credit card to start?",
                  a: "No. You can start your free trial without entering any payment details. Explore NexusFlow's full LinkedIn automation features and only upgrade when you're ready."
                },
              ].map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionsPage;