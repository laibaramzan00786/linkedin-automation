'use client'
import { Globe, Zap, MessageSquare, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

const BentoFeatures = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden bg-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-24 text-center lg:text-left flex flex-col lg:flex-row items-end justify-between gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[0.9] text-zinc-950">
              Engineered for <br /> 
              <span className="text-blue-600 italic">high-velocity</span> teams.
            </h2>
            <p className="text-zinc-500 text-xl font-medium leading-relaxed">
              We've combined the power of LLMs with a robust workflow engine to give you a tool that actually works.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-4"
          >
            <div className="px-8 py-4 rounded-2xl border border-zinc-200 bg-zinc-50 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              60+ Integrations
            </div>
            <div className="px-8 py-4 rounded-2xl border border-zinc-200 bg-zinc-50 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              99.9% Uptime
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 bento-card flex flex-col justify-between group overflow-hidden relative min-h-[400px]"
          >
            <div className="relative z-20">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 border border-blue-100">
                <Globe className="text-blue-600" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-zinc-950">Global Infrastructure</h3>
              <p className="text-zinc-500 max-w-md text-lg leading-relaxed">
                Deploy your automations across multiple regions with zero latency. Our edge network ensures your workflows are always responsive.
              </p>
            </div>
            
            <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
              <img 
                src="https://www.utahbusiness.com/resizer/v2/HRZ3BIAIV5DTZHUWJNARYSSRYY.jpeg?auth=a62fac30d9970b745f2b5cc95c6ff86973ea2ad8cf66ee99c159981062ba3dea" 
                className="w-full h-full object-cover rounded-3xl scale-110 group-hover:scale-100 transition-transform duration-1000" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
              <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-700" />
              <div className="absolute top-1/4 left-3/4 w-2 h-2 bg-blue-600 rounded-full animate-ping delay-1000" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bento-card flex flex-col items-center justify-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 border-none relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                <Zap className="text-white w-10 h-10" fill="currentColor" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white tracking-tight">Instant Setup</h3>
              <p className="text-blue-50 text-lg font-medium opacity-80">
                Go from zero to automated in <br /> less than 5 minutes.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-3xl rounded-full" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bento-card group"
          >
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-8 border border-purple-100">
              <MessageSquare className="text-purple-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight text-zinc-950">Smart Inbox</h3>
            <p className="text-zinc-500 text-lg leading-relaxed mb-8">
              Unified messaging across all platforms with AI-powered sentiment analysis.
            </p>
            
            <div className="space-y-3 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-zinc-200" />
                <div className="h-6 w-24 bg-zinc-200 rounded-full" />
              </div>
              <div className="flex gap-2 justify-end">
                <div className="h-6 w-32 bg-blue-100 rounded-full" />
                <div className="w-6 h-6 rounded-full bg-blue-100" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-8 bento-card grid grid-cols-1 sm:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-8 border border-emerald-100">
                <BarChart3 className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-zinc-950">Deep Intelligence</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">
                Get insights that matter. Our analytics engine predicts campaign success before you even hit send.
              </p>
            </div>
            
            <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-200 shadow-inner">
              <div className="space-y-6">
                {[
                  { label: "Conversion Rate", val: 88, color: "bg-blue-600" },
                  { label: "Engagement", val: 64, color: "bg-purple-600" },
                  { label: "AI Accuracy", val: 96, color: "bg-emerald-600" }
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                      <span>{item.label}</span>
                      <span className="text-zinc-950">{item.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-zinc-200 rounded-full overflow-hidden p-[2px]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.val}%` }}
                        transition={{ duration: 1.5, delay: i * 0.2, ease: "circOut" }}
                        className={`h-full ${item.color} rounded-full shadow-[0_0_10px_rgba(37,99,235,0.2)]`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;