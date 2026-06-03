
'use client'
import { Link2, Zap, GitBranch, BarChart3, Eye, ShieldCheck } from 'lucide-react';
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
              What NexusFlow Does
            </span>

            <h2
              className="text-4xl md:text-6xl font-bold tracking-tight mt-3 mb-4 leading-tight"
              style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
            >
              Everything You Need to{' '}
              <span style={{ color: '#e8836a', fontStyle: 'italic' }}>Dominate</span> LinkedIn Outreach.
            </h2>

            <p className="text-lg font-medium" style={{ color: '#888' }}>
              Six powerful LinkedIn automation features. One clean dashboard. Zero manual work. Built for sales teams, recruiters, and agencies who want results — not complexity.
            </p>
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
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border"
                style={{ background: '#fdf8f7', borderColor: '#f5d0c4' }}
              >
                <Link2 style={{ color: '#e8836a' }} size={24} />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
              >
                Automated Connection Requests
              </h3>
              <p className="text-base leading-relaxed max-w-sm" style={{ color: '#888' }}>
                Send up to 50 personalized LinkedIn connection requests per day — completely on autopilot. Filter prospects by job title, industry, company size, and seniority level. Build your network while you sleep.
              </p>
            </div>
            <div
              className="absolute bottom-0 right-0 w-2/3 h-2/3 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
              style={{ background: 'radial-gradient(ellipse at bottom right, rgba(232,131,106,0.2), transparent 70%)' }}
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
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-400"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <Zap className="text-white" size={28} fill="white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Live in Under 5 Minutes
            </h3>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
              No downloads. No browser extensions. No technical setup. Connect your LinkedIn account, define your target audience, and launch your first campaign in under 5 minutes. Seriously.
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
              <GitBranch size={22} style={{ color: '#111' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
              Multi-Step Drip Campaigns
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#888' }}>
              Build intelligent outreach sequences — connect, wait, follow up, branch based on reply or no reply. NexusFlow's campaign builder automates the entire LinkedIn sales conversation from first touch to booked meeting.
            </p>
            <div className="mt-auto space-y-2 opacity-40 group-hover:opacity-100 transition-opacity duration-400">
              {['Step 1 → Connect', 'Step 2 → Wait 2 days', 'Step 3 → Follow up'].map((step) => (
                <div key={step} className="flex gap-2 items-center">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#e8836a' }} />
                  <span className="text-[11px] font-medium" style={{ color: '#666' }}>{step}</span>
                </div>
              ))}
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
                Real-Time Campaign Analytics
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
                Track connection acceptance rates, reply rates, and full campaign funnel performance — updated in real time. Know exactly which messages are working and where to optimize next.
              </p>
            </div>

            <div className="rounded-2xl p-6 border" style={{ background: '#fafafa', borderColor: '#e5e5e5' }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-5" style={{ color: '#aaa' }}>
                What Our Users Achieve
              </p>
              <div className="space-y-4">
                {[
                  { icon: '↑', label: 'Avg reply rate across all campaigns', val: '38%', color: '#e8836a' },
                  { icon: '↑', label: 'More replies vs manual outreach',     val: '3.2×', color: '#111'    },
                  { icon: '⏱', label: 'Avg time to launch first campaign',   val: '5 min', color: '#10b981'},
                  { icon: '🛡', label: 'Accounts remain restriction-free',   val: '99%',  color: '#6366f1' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-xs font-medium leading-tight" style={{ color: '#888' }}>
                      {item.icon} {item.label}
                    </span>
                    <span className="text-sm font-bold flex-shrink-0" style={{ color: item.color }}>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="md:col-span-6 rounded-3xl border p-8 flex flex-col group"
            style={{ background: '#fafafa', borderColor: '#e5e5e5' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border"
              style={{ background: '#fdf8f7', borderColor: '#f5d0c4' }}>
              <Eye size={22} style={{ color: '#e8836a' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
              Profile Visit Automation
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
              Automatically visit your target prospects' profiles before connecting — triggering curiosity and a reciprocal visit in return. A simple action that warms up cold prospects and increases connection acceptance rates by up to 40%.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-6 rounded-3xl border p-8 flex flex-col group"
            style={{ background: '#fafafa', borderColor: '#e5e5e5' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border"
              style={{ background: '#ecfdf5', borderColor: '#a7f3d0' }}>
              <ShieldCheck size={22} style={{ color: '#10b981' }} />
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
              Safe Automation — Account Protected
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: '#888' }}>
              NexusFlow operates within LinkedIn's safe activity thresholds. Smart daily limits, human-speed execution, and randomized action delays keep your account healthy and restriction-free — for the long term.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;