'use client';
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Target,
  Building2,
  TrendingUp,
  ArrowRight,
  Zap,
  Search,
  Check,
} from "lucide-react";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const SolutionsPage = () => {
  const [activeSolution, setActiveSolution] = useState("sales");

  const solutions = [
    {
      id: "sales",
      label: "Sales Teams",
      icon: <Target size={26} />,
      title: "Accelerate your pipeline.",
      desc: "Empower your sales team with automated outreach that feels personal and books more meetings.",
      features: [
        "Lead generation automation",
        "Meeting booking system",
        "Pipeline acceleration",
        "Team collaboration",
      ],
    },
    {
      id: "agencies",
      label: "Growth Agencies",
      icon: <Building2 size={26} />,
      title: "Scale your client results.",
      desc: "Manage multiple client campaigns from a single powerful automation dashboard.",
      features: [
        "Multi-client management",
        "White-label reporting",
        "Campaign scaling",
        "ROI tracking",
      ],
    },
    {
      id: "recruiters",
      label: "Talent Sourcing",
      icon: <Users size={26} />,
      title: "Find top talent faster.",
      desc: "Automate candidate sourcing and outreach to reach the best talent before competitors.",
      features: [
        "Candidate sourcing",
        "Automated follow-ups",
        "Talent pool building",
        "Response management",
      ],
    },
  ];

  const active = solutions.find((s) => s.id === activeSolution);

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden">
      <Navbar />

      <main>
        <section className="relative pt-40 pb-32 px-6">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-blue-100 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-purple-100 rounded-full blur-[120px] opacity-40" />
          </div>

          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 text-xs font-semibold tracking-widest uppercase mb-10 bg-white shadow-sm"
            >
              <Zap size={14} className="text-blue-600" />
              Strategic Growth Solutions
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-[110px] font-bold leading-[0.9] tracking-[-0.04em]"
            >
              Built for <br />
              <span className="text-blue-600 italic font-serif font-light">
                Every Engine.
              </span>
            </motion.h1>

            <p className="mt-10 text-xl text-slate-500 max-w-2xl mx-auto">
              NexusFlow adapts to your unique business model and helps your
              team scale outreach, engagement and revenue.
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
                  className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-sm transition-all
                  ${
                    activeSolution === s.id
                      ? "bg-slate-900 text-white shadow-xl"
                      : "bg-white border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
            </div>

           
            <div className="rounded-[48px] border border-slate-200 bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="grid lg:grid-cols-2">
            
                <div className="p-14 lg:p-24">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSolution}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-10 shadow-sm">
                        {active?.icon}
                      </div>

                      <h2 className="text-5xl font-bold mb-6 tracking-tight leading-[1.1]">
                        {active?.title}
                      </h2>

                      <p className="text-lg text-slate-500 mb-10 max-w-lg">
                        {active?.desc}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-12">
                        {active?.features.map((f, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition"
                          >
                            <div className="w-7 h-7 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                              <Check size={14} />
                            </div>

                            <span className="text-sm font-medium text-slate-700">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button className="flex items-center gap-3 px-10 py-5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg">
                        Deploy Solution
                        <ArrowRight size={20} />
                      </button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="bg-slate-50 p-16 flex items-center justify-center">
                  <div className="space-y-6 w-full max-w-sm">
                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                    >
                      <p className="text-sm text-slate-500 mb-2">
                        Meetings Booked
                      </p>
                      <h3 className="text-3xl font-bold text-slate-900">
                        +240%
                      </h3>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                    >
                      <p className="text-sm text-slate-500 mb-2">Reply Rate</p>
                      <h3 className="text-3xl font-bold text-slate-900">
                        41%
                      </h3>
                    </motion.div>

                    <motion.div
                      whileHover={{ y: -6 }}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
                    >
                      <p className="text-sm text-slate-500 mb-2">
                        Pipeline Growth
                      </p>
                      <h3 className="text-3xl font-bold text-blue-600">$1.2M</h3>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-bold">
                The NexusFlow <br />
                <span className="text-blue-600 italic font-serif font-light">
                  Protocol.
                </span>
              </h2>

              <p className="text-lg text-slate-500 mt-6 max-w-xl mx-auto">
                A surgical approach to growth refined through thousands of
                campaigns.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: "Intelligence",
                  desc: "We map your market using deep-data signals.",
                  icon: <Search />,
                },
                {
                  title: "Engagement",
                  desc: "Adaptive outreach sequences that feel human.",
                  icon: <Zap />,
                },
                {
                  title: "Optimization",
                  desc: "Real-time analytics refine your strategy.",
                  icon: <TrendingUp />,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -8 }}
                  className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm hover:shadow-xl transition"
                >
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>

                  <p className="text-slate-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="bg-slate-900 text-white rounded-[48px] p-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-8">
                Ready to <br />
                <span className="text-blue-400 italic font-serif font-light">
                  Ascend?
                </span>
              </h2>

              <p className="text-slate-300 max-w-xl mx-auto mb-12">
                Join ambitious teams already growing with NexusFlow.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="px-12 py-6 bg-white text-slate-900 rounded-full font-semibold text-lg hover:scale-105 transition">
                  Get Started Free
                </button>

                <button className="px-12 py-6 border border-white/30 rounded-full text-lg hover:bg-white/10 transition">
                  Talk to Strategy
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SolutionsPage;