'use client'
import { ArrowRight, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const compareTools = [
  { name: 'vs Dripify', saving: 'Save $600/yr', href: '/compare/vs-dripify' },
  { name: 'vs Linked Helper', saving: 'Save $432/yr', href: '/compare/vs-linked-helper' },
  { name: 'vs Meet Alfred', saving: 'Save $960/yr', href: '/compare/vs-meet-alfred' },
  { name: 'vs Manual Outreach', saving: 'Save 50+ hrs/mo', href: '/compare/vs-manual-outreach' },
];

const CTA = () => {
  return (
    <section
      id="cta"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,131,106,0.07), transparent)' }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#e8836a' }}>
            Get Started Today
          </span>

          <h2
            className="text-5xl md:text-7xl font-bold tracking-tight mt-4 mb-6 leading-tight"
            style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
          >
            Your Next 50 Leads Are<br />
            <span style={{ color: '#e8836a', fontStyle: 'italic' }}>Already on LinkedIn.</span>
          </h2>

          <p className="text-lg mb-4 max-w-xl mx-auto" style={{ color: '#616060' }}>
            Stop reaching them one at a time.
          </p>
          <p className="text-base mb-12 max-w-xl mx-auto" style={{ color: '#616060' }}>
            Join hundreds of sales teams, recruiters, and agencies already running automated LinkedIn campaigns with NexusFlow.{' '}
            No credit card required. Cancel anytime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link
              href="/signup"
              className="group flex items-center gap-2 px-10 py-4 rounded-2xl text-base font-semibold text-white transition-all active:scale-95"
              style={{ background: '#111', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e8836a'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#111'}
            >
              Start Free Trial
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <button
              className="px-10 py-4 rounded-2xl text-base font-semibold border transition-all"
              style={{ background: '#fff', borderColor: '#e5e5e5', color: '#333' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fafafa'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
            >
              Talk to Our Team
            </button>
          </div>

          <p className="text-xs font-medium mb-16" style={{ color: '#616060' }}>
            ✓ Free trial included &nbsp;&nbsp; ✓ Setup in 5 minutes &nbsp;&nbsp; ✓ Cancel anytime
          </p>

          <div className="flex flex-col items-center gap-3 mb-20">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#6d6d6d' }}>
              Trusted by sales teams and recruiters across 20+ countries
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-2">
              {['Sales Teams', 'Recruiters', 'Marketing Agencies', 'B2B Consultants'].map(label => (
                <span
                  key={label}
                  className="text-xs font-semibold px-4 py-1.5 rounded-full border"
                  style={{ color: '#999', borderColor: '#e5e5e5' }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        

      </div>
    </section>
  );
};

export default CTA;