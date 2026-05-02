'use client'
import { Globe, Zap, MessageSquare, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

const BentoFeatures = () => {
  return (
    <section
      id="features"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
       
        <div className="mb-20 flex flex-col lg:flex-row items-end justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#e8836a' }}>
              Platform Features
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold tracking-tight mt-3 mb-4 leading-tight"
              style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
            >
              Engineered for{' '}
              <span style={{ color: '#e8836a', fontStyle: 'italic' }}>high-velocity</span> teams.
            </h2>
            <p className="text-lg font-medium" style={{ color: '#888' }}>
              We've combined LLMs with a robust workflow engine to give you a tool that actually works.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-3"
          >
            {['60+ Integrations', '99.9% Uptime'].map(tag => (
              <div
                key={tag}
                className="px-5 py-3 rounded-xl border text-[11px] font-semibold"
                style={{ background: '#fafafa', borderColor: '#e5e5e5', color: '#666' }}
              >
                {tag}
              </div>
            ))}
          </motion.div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
       
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-8 relative min-h-[360px] rounded-3xl border overflow-hidden group flex flex-col justify-between p-8"
            style={{ background: '#fafafa', borderColor: '#e5e5e5' }}
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border"
                style={{ background: '#fdf8f7', borderColor: '#f5d0c4' }}>
                <Globe style={{ color: '#e8836a' }} size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
                Global Infrastructure
              </h3>
              <p className="text-base leading-relaxed max-w-sm" style={{ color: '#888' }}>
                Deploy automations across multiple regions with zero latency. Our edge network keeps workflows always responsive.
              </p>
            </div>
            <div
              className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
              style={{
                background: 'radial-gradient(ellipse at bottom right, rgba(232,131,106,0.2), transparent 70%)',
              }}
            />
            <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full animate-ping z-10"
              style={{ background: '#e8836a' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 flex flex-col items-center justify-center text-center rounded-3xl p-8 relative overflow-hidden group"
            style={{ background: '#e8836a' }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-400"
              style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Zap className="text-white" size={28} fill="white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Instant Setup
            </h3>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Go from zero to automated in less than 5 minutes.
            </p>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full"
              style={{ background: 'rgba(255,255,255,0.08)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-4 rounded-3xl border p-8 flex flex-col group"
            style={{ background: '#fff', borderColor: '#e5e5e5' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border"
              style={{ background: '#fafafa', borderColor: '#e5e5e5' }}>
              <MessageSquare size={22} style={{ color: '#111' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
              Smart Inbox
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
              Unified messaging across all platforms with AI-powered sentiment analysis.
            </p>
            <div className="mt-auto space-y-2 opacity-40 group-hover:opacity-100 transition-opacity duration-400">
              <div className="flex gap-2 items-center">
                <div className="w-6 h-6 rounded-full" style={{ background: '#f0f0f0' }} />
                <div className="h-5 rounded-full" style={{ background: '#f0f0f0', width: 96 }} />
              </div>
              <div className="flex gap-2 items-center justify-end">
                <div className="h-5 rounded-full" style={{ background: '#fdf8f7', width: 112 }} />
                <div className="w-6 h-6 rounded-full" style={{ background: '#fdf8f7' }} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-8 rounded-3xl border p-8 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center"
            style={{ background: '#fff', borderColor: '#e5e5e5' }}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border"
                style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
                <BarChart3 size={22} style={{ color: '#10b981' }} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
                Deep Intelligence
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                Get insights that matter. Our analytics engine predicts campaign success before you even hit send.
              </p>
            </div>
            <div className="rounded-2xl p-6 border" style={{ background: '#fafafa', borderColor: '#e5e5e5' }}>
              <div className="space-y-5">
                {[
                  { label: 'Conversion Rate', val: 88, color: '#e8836a' },
                  { label: 'Engagement',      val: 64, color: '#111'    },
                  { label: 'AI Accuracy',     val: 96, color: '#10b981' },
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-semibold" style={{ color: '#888' }}>
                      <span>{item.label}</span>
                      <span style={{ color: '#111' }}>{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full" style={{ background: '#f0f0f0' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.val}%` }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: 'circOut' }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
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