'use client';
import { motion } from 'motion/react';
import { ArrowRight, Quote, TrendingUp, Users, Zap } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const caseStudies = [
  {
    company: "TechScale AI",
    logo: "TS",
    title: "How TechScale AI increased their meeting rate by 300%",
    metric: "300%",
    metricLabel: "Meeting Increase",
    tags: ["SaaS", "Series B", "Sales"],
    image: "https://picsum.photos/seed/tech/800/600"
  },
  {
    company: "Global Outreach",
    logo: "GO",
    title: "Scaling from 10 to 100 campaigns with a team of two",
    metric: "10x",
    metricLabel: "Efficiency Boost",
    tags: ["Agency", "Growth", "Automation"],
    image: "https://picsum.photos/seed/global/800/600"
  },
  {
    company: "Nexus Creative",
    logo: "NC",
    title: "Reducing response time from 24 hours to 5 minutes",
    metric: "95%",
    metricLabel: "Faster Response",
    tags: ["Creative", "Enterprise", "Support"],
    image: "https://picsum.photos/seed/creative/800/600"
  }
];

const CaseStudiesPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
              Success Stories
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-zinc-950 mb-8 tracking-tight"
            >
              Real Results for Real Teams
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto"
            >
              See how companies across the globe are using NexusFlow to transform their sales and automation workflows.
            </motion.p>
          </div>

        
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 p-12 bg-zinc-50 rounded-[40px] border border-zinc-100">
            {[
              { label: "Total Meetings Booked", value: "1.2M+", icon: <Users className="text-blue-600" size={20} /> },
              { label: "Revenue Generated", value: "$450M+", icon: <TrendingUp className="text-blue-600" size={20} /> },
              { label: "Hours Saved", value: "250k+", icon: <Zap className="text-blue-600" size={20} /> },
              { label: "Customer Satisfaction", value: "99.9%", icon: <Quote className="text-blue-600" size={20} /> },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-zinc-950 mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</div>
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
                    <div className="w-10 h-10 bg-zinc-950 text-white rounded-xl flex items-center justify-center font-bold text-xs">
                      {study.logo}
                    </div>
                    <span className="text-sm font-bold text-zinc-950">{study.company}</span>
                  </div>
                  <h2 className="text-4xl font-bold text-zinc-950 mb-8 leading-tight">
                    {study.title}
                  </h2>
                  <div className="flex gap-4 mb-12">
                    {study.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="p-8 bg-blue-50 rounded-[32px] mb-12 border border-blue-100">
                    <div className="text-5xl font-bold text-blue-600 mb-2">{study.metric}</div>
                    <div className="text-sm font-bold text-blue-900/60 uppercase tracking-widest">{study.metricLabel}</div>
                  </div>
                  <button className="flex items-center gap-3 text-lg font-bold text-zinc-950 hover:gap-5 transition-all group">
                    Read the full story <ArrowRight className="text-blue-600 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
                <div className="flex-1 w-full">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-600/10 rounded-[40px] translate-x-4 translate-y-4 -z-10" />
                    <img 
                      src={study.image} 
                      alt={study.company} 
                      className="w-full h-full object-cover rounded-[40px] shadow-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        
          <div className="mt-48 text-center">
            <h2 className="text-4xl font-bold text-zinc-950 mb-8">Ready to be our next success story?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-10 py-5 bg-zinc-950 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl">
                Get Started Now
              </button>
              <button className="px-10 py-5 bg-white text-zinc-950 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all">
                Book a Demo
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