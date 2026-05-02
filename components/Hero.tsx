'use client'
import { ArrowRight, CheckCircle2, ChevronRight, Sparkles, Bot, Play } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden"
      style={{ background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
     
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,131,106,0.07), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
         
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-8 border"
            style={{ background: '#fdf8f7', borderColor: '#f5d0c4', color: '#e8836a' }}
          >
            <Sparkles size={12} />
            Next-Gen LinkedIn Automation
          </div>

     
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.05]"
            style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
          >
            Automate Your LinkedIn<br />
            Growth{' '}
            <span style={{ color: '#e8836a', fontStyle: 'italic' }}>Effortlessly.</span>
          </h1>

          <p className="text-lg text-zinc-500 mb-10 max-w-xl mx-auto leading-relaxed font-medium">
            NexusFlow handles the outreach complexity so you can focus on closing deals and building real relationships.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white transition-all active:scale-95"
              style={{ background: '#111', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e8836a'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#111'}
            >
              Start Building
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              className="flex items-center gap-2 text-sm font-semibold transition-all"
              style={{ color: '#888' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#111'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#888'}
            >
              View Showcase <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mt-20 max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-10 -left-10 hidden lg:flex items-center gap-3 bg-white border rounded-2xl px-4 py-3 shadow-lg z-20"
            style={{ borderColor: '#e5e5e5' }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#ecfdf5' }}>
              <CheckCircle2 size={16} style={{ color: '#10b981' }} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold" style={{ color: '#111' }}>Workflow Active</p>
              <p className="text-[10px]" style={{ color: '#aaa' }}>99.9% Success Rate</p>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-10 -right-10 hidden lg:flex items-center gap-3 bg-white border rounded-2xl px-4 py-3 shadow-lg z-20"
            style={{ borderColor: '#e5e5e5' }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: '#fdf8f7' }}>
              <Bot size={16} style={{ color: '#e8836a' }} />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold" style={{ color: '#111' }}>AI Assistant</p>
              <p className="text-[10px]" style={{ color: '#aaa' }}>Optimizing sequences…</p>
            </div>
          </motion.div>

    
          <div
            className="relative rounded-3xl border p-3 group cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.85)', borderColor: '#e5e5e5', boxShadow: '0 24px 64px rgba(0,0,0,0.07)' }}
          >
            <div className="relative overflow-hidden rounded-2xl bg-zinc-100" style={{ aspectRatio: '16/9' }}>
              <img
                src="/dashboard.png"
                alt="NexusFlow Dashboard"
                className="w-full h-full object-cover rounded-2xl"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-6 py-3.5 rounded-2xl text-white text-sm font-semibold shadow-2xl"
                  style={{ background: '#e8836a', boxShadow: '0 8px 32px rgba(232,131,106,0.35)' }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
                    <Play className="fill-white w-3.5 h-3.5" />
                  </div>
                  Try a demo now
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;