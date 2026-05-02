'use client';
import { motion } from 'motion/react';
import { ArrowRight, Quote, TrendingUp, Users, Zap } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const caseStudies = [
  {
    company: "TechScale AI",
    logo: "TS",
    title: "How TechScale AI increased their meeting rate by 300%",
    metric: "300%",
    metricLabel: "Meeting Increase",
    tags: ["SaaS", "Series B", "Sales"],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2340&auto=format&fit=crop"
  },
  {
    company: "Global Outreach",
    logo: "GO",
    title: "Scaling from 10 to 100 campaigns with a team of two",
    metric: "10x",
    metricLabel: "Efficiency Boost",
    tags: ["Agency", "Growth", "Automation"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2340&auto=format&fit=crop"
  },
  {
    company: "Nexus Creative",
    logo: "NC",
    title: "Reducing response time from 24 hours to 5 minutes",
    metric: "95%",
    metricLabel: "Faster Response",
    tags: ["Creative", "Enterprise", "Support"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2340&auto=format&fit=crop"
  }
];

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#e8836a]/10 selection:text-[#e8836a] font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6">
       
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#feedea]"
            >
              Success Protocols
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-zinc-950 mb-8 tracking-tight leading-[1.1]"
            >
              Real World <span className="text-[#e8836a]">Proof.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              See how companies across the globe are using NexusFlow to transform their sales and automation workflows.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 p-10 bg-zinc-50 rounded-[40px] border border-zinc-100">
            {[
              { label: "Total Meetings Booked", value: "1.2M+", icon: <Users className="text-[#e8836a]" size={20} /> },
              { label: "Revenue Generated", value: "$450M+", icon: <TrendingUp className="text-[#e8836a]" size={20} /> },
              { label: "Hours Saved", value: "250k+", icon: <Zap className="text-[#e8836a]" size={20} /> },
              { label: "Customer Happiness", value: "99.9%", icon: <Quote className="text-[#e8836a]" size={20} /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-zinc-950 mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-32">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-zinc-950 text-white rounded-xl flex items-center justify-center font-bold text-xs ring-4 ring-zinc-100">
                      {study.logo}
                    </div>
                    <span className="text-sm font-bold text-zinc-950 uppercase tracking-widest">{study.company}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-zinc-950 mb-8 leading-tight">
                    {study.title}
                  </h2>
                  <div className="flex gap-4 mb-12 flex-wrap">
                    {study.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="p-8 bg-[#fdf2f0] rounded-[32px] mb-12 border border-[#feedea] flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    <div className="text-6xl font-black text-[#e8836a] tracking-tighter leading-none">{study.metric}</div>
                    <div>
                        <div className="text-sm font-bold text-[#e8836a] uppercase tracking-widest mb-1">{study.metricLabel}</div>
                        <p className="text-xs text-zinc-500 font-medium tracking-wide">Achieved within 90 days of implementation</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-950 hover:gap-5 transition-all group">
                    View full case study <ArrowRight size={18} className="text-[#e8836a] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-[#e8836a]/10 rounded-[40px] translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-all duration-700" />
                    <img 
                      src={study.image} 
                      alt={study.company} 
                      className="w-full aspect-[4/3] object-cover rounded-[40px] shadow-2xl border border-zinc-100 grayscale hover:grayscale-0 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-48 text-center bg-zinc-950 rounded-[48px] p-16 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-96 h-96 bg-[#e8836a]/5 blur-[80px] rounded-full" />
            <h2 className="text-4xl font-bold text-white mb-8 relative z-10">Ready to be our next success story?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <button className="px-12 py-5 bg-[#e8836a] text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-zinc-950 transition-all shadow-xl active:scale-95">
                Get Started
              </button>
              <button className="px-12 py-5 bg-white/5 text-white border border-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
