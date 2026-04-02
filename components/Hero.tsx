'use client'
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Bot,
  Play
} from 'lucide-react';
import { motion } from 'motion/react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(37,99,235,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-8 border border-blue-100">
            <Sparkles size={12} />
            Next-Gen AI Automation
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[0.9] gradient-heading">
            Automate Your LinkedIn <br /> Growth <span className="text-blue-600 italic">Effortlessly.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            NexusFlow is the elite automation layer for modern teams. We handle the complexity so you can focus on the strategy.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative bg-zinc-950 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest overflow-hidden transition-all hover:pr-14 hover:bg-zinc-900">
              <span className="relative z-10">Start Building</span>
              <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" size={18} />
            </button>
            <button className="text-sm font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors flex items-center gap-2">
              View Showcase <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>

        <div className="mt-24 relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative z-20 rounded-[40px] border border-zinc-200 bg-white/80 p-4 backdrop-blur-2xl shadow-[0_40px_100px_rgba(0,0,0,0.08)] group cursor-pointer"
          >
            <img 
              src="/dashboard.png" 
              alt="NexusFlow Interface" 
              className="rounded-[32px] w-full shadow-2xl"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center gap-3 shadow-[0_20px_40px_rgba(37,99,235,0.3)] hover:bg-blue-700 transition-all"
              >
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Play className="fill-white w-4 h-4" />
                </div>
                Try a demo now
              </motion.button>
            </div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-12 -left-12 hidden lg:block bg-white border border-zinc-200 p-6 rounded-3xl shadow-2xl z-30"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="text-emerald-500" size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">Workflow Active</p>
                <p className="text-[10px] text-zinc-500">99.9% Success Rate</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-12 -right-12 hidden lg:block bg-white border border-zinc-200 p-6 rounded-3xl shadow-2xl z-30"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Bot className="text-blue-600" size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-900">AI Assistant</p>
                <p className="text-[10px] text-zinc-500">Optimizing sequences...</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;