'use client';
import { Users, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const features = [
    {
      title: "Smart Campaign Builder",
      desc: "Create automated LinkedIn outreach funnels easily.",
    },
    {
      title: "Auto Follow-Ups",
      desc: "Automatically send follow-ups to increase replies.",
    },
    {
      title: "Analytics Dashboard",
      desc: "Track connection rate, replies and performance.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="py-32 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-blue-100">
                  <Users size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">Total Users</span>
              </div>
              <h3 className="text-8xl font-display uppercase tracking-tighter text-zinc-950 leading-none">50K<span className="text-blue-600">+</span></h3>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500">Trusted by professionals worldwide</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-6 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-blue-100">
                  <CheckCircle size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">Acceptance Rate</span>
              </div>
              <h3 className="text-8xl font-display uppercase tracking-tighter text-zinc-950 leading-none">45<span className="text-blue-600">%</span></h3>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500">Average increase in connections</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-6 group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-blue-100">
                  <TrendingUp size={24} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-400">Time Saved</span>
              </div>
              <h3 className="text-8xl font-display uppercase tracking-tighter text-zinc-950 leading-none">10<span className="text-blue-600">H</span></h3>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500">Average hours saved per week</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col gap-4 mb-20 text-center">
            <span className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[10px]">Capabilities</span>
            <h2 className="text-5xl md:text-6xl font-display uppercase tracking-tighter text-zinc-950">Powerful <span className="text-zinc-400">Features.</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-zinc-50 border border-zinc-200 rounded-[32px] hover:border-blue-500/30 transition-all duration-500 group backdrop-blur-sm hover:bg-white hover:shadow-xl hover:shadow-blue-500/5"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 border border-blue-100">
                  <CheckCircle size={20} />
                </div>
                <h3 className="text-2xl font-display uppercase tracking-tight text-zinc-950 mb-4">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}