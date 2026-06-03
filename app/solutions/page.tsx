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
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-semibold text-zinc-800 pr-6 leading-snug">{question}</span>
        <span
          className="text-zinc-400 flex-shrink-0 transition-transform duration-300 text-lg font-light"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-sm text-zinc-500 leading-relaxed pb-5">{answer}</p>
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
      icon: <Target size={16} />,
      title: "Close More Deals. Spend Less Time Prospecting on LinkedIn.",
      desc: "NexusFlow automates your entire LinkedIn sales workflow — from finding prospects to sending connection requests, follow-ups, and meeting invites. Your team focuses on closing. NexusFlow handles everything before that.",
      features: [
        "Automated LinkedIn Prospecting",
        "Multi-Step Follow-Up Sequences",
        "Smart Reply Detection",
        "Team Collision Prevention",
      ],
      statsLabel: "What sales teams achieve with NexusFlow",
      stats: [
        {
          label: "Average Reply Rate",
          value: "38%",
          prefix: "↑",
          sub: "vs 2–3% industry average for cold outreach",
          icon: <TrendingUp size={16} />,
        },
        {
          label: "Time Saved Per Week",
          value: "12 hrs",
          prefix: "⏱",
          sub: "reclaimed from manual LinkedIn prospecting",
          icon: <Clock size={16} />,
        },
        {
          label: "Pipeline Growth",
          value: "3.2×",
          prefix: "↑",
          sub: "more qualified conversations per month",
          icon: <BarChart3 size={16} />,
        },
      ],
      cta: "Start Automating Sales",
    },
    {
      id: "agencies",
      label: "Growth Agencies",
      icon: <Building2 size={16} />,
      title: "Manage Every Client's LinkedIn Outreach From One Dashboard.",
      desc: "NexusFlow lets agencies run separate LinkedIn automation campaigns for every client — with individual analytics, separate account controls, and white-label ready reporting. Scale your agency's output without scaling your headcount.",
      features: [
        "Multi-Account Client Management",
        "Per-Client Campaign Analytics",
        "Bulk Campaign Templates",
        "Client Performance Reports",
      ],
      statsLabel: "Agency results with NexusFlow",
      stats: [
        {
          label: "Client Capacity",
          value: "3×",
          prefix: "↑",
          sub: "more clients managed per team member",
          icon: <TrendingUp size={16} />,
        },
        {
          label: "Campaign Setup",
          value: "80% faster",
          prefix: "⏱",
          sub: "than building manual outreach workflows",
          icon: <Clock size={16} />,
        },
        {
          label: "Client Retention",
          value: "Higher",
          prefix: "↑",
          sub: "when results are consistent and visible",
          icon: <LineChart size={16} />,
        },
      ],
      cta: "Scale Your Agency",
    },
    {
      id: "recruiters",
      label: "Recruiters & HR",
      icon: <Users size={16} />,
      title: "Source Top Talent on LinkedIn Faster Than Your Competition.",
      desc: "NexusFlow automates candidate outreach, follow-up sequences, and profile visits — so your recruitment team spends time interviewing qualified candidates, not chasing cold profiles one by one.",
      features: [
        "Automated Candidate Outreach",
        "Job Opportunity Drip Sequences",
        "Candidate Pipeline Tracking",
        "Profile Visit Automation",
      ],
      statsLabel: "Recruiter results with NexusFlow",
      stats: [
        {
          label: "Candidate Response Rate",
          value: "2.5×",
          prefix: "↑",
          sub: "more replies vs manual InMail outreach",
          icon: <TrendingUp size={16} />,
        },
        {
          label: "Time to First Response",
          value: "48 hrs",
          prefix: "⏱",
          sub: "average first candidate reply time",
          icon: <Clock size={16} />,
        },
        {
          label: "Profiles Reached Daily",
          value: "50+",
          prefix: "↑",
          sub: "automated visits and connection requests",
          icon: <BarChart3 size={16} />,
        },
      ],
      cta: "Start Sourcing Faster",
    },
  ];

  const active = solutions.find((s) => s.id === activeSolution)!;

  return (
    <div
      className="min-h-screen bg-white text-zinc-900 overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <Navbar />

      <main>
        <section className="pt-40 pb-16 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-8 border"
                style={{ background: "#fdf8f7", borderColor: "#f5d0c4", color: "#e8836a" }}
              >
                <Zap size={10} />
                Solutions
              </div>

              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-5 leading-[1.15]"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                LinkedIn Automation Built for the Way Your Team{" "}
                <span style={{ color: "#e8836a" }}>Actually Works.</span>
              </h1>

              <p className="text-base text-zinc-500 max-w-xl mx-auto leading-relaxed">
                Whether you're a sales team closing enterprise deals, a growth agency managing multiple clients, or a recruiter sourcing top talent — NexusFlow automates your entire LinkedIn outreach workflow from first connection to booked meeting.
              </p>
            </motion.div>
          </div>
        </section>

    
        <section className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {solutions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSolution(s.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all"
                  style={
                    activeSolution === s.id
                      ? { background: "#111", color: "#fff" }
                      : { background: "#f5f5f5", color: "#666", border: "1px solid #e5e5e5" }
                  }
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
            </div>
            <div
              className="rounded-3xl border overflow-hidden"
              style={{ borderColor: "#e5e5e5" }}
            >
              <div className="grid lg:grid-cols-2">

                <div className="p-10 lg:p-14">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSolution}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.35 }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 border"
                        style={{ background: "#fdf8f7", borderColor: "#f5d0c4", color: "#e8836a" }}
                      >
                        {active.icon}
                      </div>

                      <h2
                        className="text-2xl font-bold mb-4 tracking-tight text-zinc-900 leading-snug"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {active.title}
                      </h2>

                      <p className="text-sm text-zinc-500 mb-8 leading-relaxed max-w-md">
                        {active.desc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
                        {active.features.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                            style={{ background: "#f9f9f9" }}
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                              style={{ background: "#fdf8f7", border: "1px solid #f5d0c4" }}
                            >
                              <Check size={10} style={{ color: "#e8836a" }} />
                            </div>
                            <span className="text-xs font-medium text-zinc-700">{f}</span>
                          </div>
                        ))}
                      </div>

                      <button
                        className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{ background: "#111" }}
                        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#e8836a"}
                        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
                      >
                        {active.cta}
                        <ArrowRight size={15} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="p-10 lg:p-14 flex flex-col justify-center" style={{ background: "#fafafa", borderLeft: "1px solid #e5e5e5" }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: "#e8836a" }}>
                    {active.statsLabel}
                  </p>
                  <div className="space-y-3">
                    {active.stats.map((stat, i) => (
                      <motion.div
                        key={`${activeSolution}-${i}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-center justify-between rounded-2xl p-5 border"
                        style={{ background: "#fff", borderColor: "#efefef" }}
                      >
                        <div>
                          <p className="text-[11px] text-zinc-400 font-medium mb-1">{stat.label}</p>
                          <p
                            className="text-2xl font-bold"
                            style={{ color: "#111", fontFamily: "'Outfit', sans-serif" }}
                          >
                            {stat.prefix} {stat.value}
                          </p>
                          <p className="text-[11px] text-zinc-400 mt-1">{stat.sub}</p>
                        </div>
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: "#fdf8f7", color: "#e8836a" }}
                        >
                          {stat.icon}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6" style={{ background: "#111" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 max-w-xl mx-auto">
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-4 leading-snug"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                The Smarter Way to Run LinkedIn Outreach{" "}
                <span style={{ color: "#e8836a" }}>at Scale.</span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed">
                NexusFlow combines intelligent prospect targeting, personalized message sequencing, and real-time performance data — so every campaign gets smarter the longer it runs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  title: "Smart Prospect Targeting",
                  desc: "Identify your ideal LinkedIn prospects using advanced filters — job title, industry, company size, seniority, and location. You define who matters. NexusFlow finds them automatically.",
                  icon: <Search size={20} />,
                },
                {
                  title: "Sequences That Sound Human",
                  desc: "Multi-step LinkedIn outreach sequences with dynamic personalization variables. Every message includes your prospect's name, company, and role — sent at the optimal time for maximum reply rates.",
                  icon: <Zap size={20} />,
                },
                {
                  title: "Campaigns That Learn and Improve",
                  desc: "Real-time analytics show you exactly which messages convert, which sequences underperform, and where to optimize next. Every campaign gets measurably better over time.",
                  icon: <TrendingUp size={20} />,
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-8 transition-colors"
                  style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: "#e8836a", color: "#fff" }}
                  >
                    {step.icon}
                  </div>
                  <h3
                    className="text-base font-bold mb-3 text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight mb-4 leading-snug"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Start Automating Your LinkedIn Outreach in Under 5 Minutes.
            </h2>
            <p className="text-sm text-zinc-500 mb-8 leading-relaxed">
              Join hundreds of sales teams, recruiters, and agencies already running automated LinkedIn campaigns with NexusFlow. No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white transition-all"
                style={{ background: "#111" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#e8836a"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#111"}
              >
                Start Free Trial →
              </button>
              <button
                className="px-8 py-3.5 rounded-xl text-sm font-semibold border transition-all flex items-center gap-1.5 justify-center"
                style={{ borderColor: "#e5e5e5", color: "#555" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#f9f9f9"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#fff"}
              >
                Talk to Our Team <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-5 border"
                style={{ background: "#fdf8f7", borderColor: "#f5d0c4", color: "#e8836a" }}
              >
                <Zap size={10} />
                FAQ
              </div>
              <h2
                className="text-2xl font-bold text-zinc-900 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Common Questions About NexusFlow
              </h2>
            </div>

            <div className="border border-zinc-100 rounded-2xl px-6 divide-y divide-zinc-100">
              {[
                {
                  q: "Is NexusFlow good for agencies?",
                  a: "Yes — NexusFlow is built specifically for growth agencies managing multiple clients. You get a single dashboard to run separate LinkedIn automation campaigns for every client, with individual analytics, per-client reporting, and bulk campaign templates. Agencies using NexusFlow manage up to 3× more clients per team member without adding headcount.",
                },
                {
                  q: "Can recruiters use NexusFlow?",
                  a: "Absolutely. NexusFlow automates the entire LinkedIn recruitment workflow — from candidate outreach and follow-up sequences to profile visits and pipeline tracking. Recruitment teams using NexusFlow see 2.5× more candidate replies compared to manual InMail outreach, with an average first response within 48 hours.",
                },
                {
                  q: "How does NexusFlow work for sales teams?",
                  a: "NexusFlow automates your entire LinkedIn sales workflow — finding the right prospects, sending connection requests, running multi-step follow-up sequences, and detecting replies. Your sales team focuses on closing deals. NexusFlow handles everything before that. Most teams reclaim 12+ hours per week from manual LinkedIn prospecting.",
                },
                {
                  q: "Is LinkedIn automation safe to use?",
                  a: "NexusFlow is built with LinkedIn's limits in mind. Our smart rate controls and human-like send timing keep your account safe while maximising outreach volume. We stay within recommended daily limits so your LinkedIn account stays in good standing.",
                },
                {
                  q: "Do I need a credit card to start?",
                  a: "No. You can start your free trial without entering any payment details. Explore NexusFlow's full LinkedIn automation features and only upgrade when you're ready.",
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