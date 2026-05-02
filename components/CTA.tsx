'use client'
import { motion } from 'motion/react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section
      id="cta"
      className="py-32 px-6 relative overflow-hidden"
      style={{ background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,131,106,0.07), transparent)' }} />

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
            Ready to elevate<br />
            your{' '}
            <span style={{ color: '#e8836a', fontStyle: 'italic' }}>workflow?</span>
          </h2>
          <p className="text-lg mb-12 max-w-lg mx-auto" style={{ color: '#888' }}>
            Join 2,000+ companies scaling their outreach with NexusFlow. No credit card required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/signup"
              className="px-10 py-4 rounded-2xl text-base font-semibold text-white transition-all active:scale-95"
              style={{ background: '#111', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e8836a'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#111'}
            >
              Join the Waitlist
            </Link>
            <button
              className="px-10 py-4 rounded-2xl text-base font-semibold border transition-all"
              style={{ background: '#fff', borderColor: '#e5e5e5', color: '#333' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fafafa'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
            >
              Contact Sales
            </button>
          </div>

          <div className="flex flex-col items-center gap-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#ccc' }}>
              Trusted by 2,000+ companies worldwide
            </p>
            <div className="flex flex-wrap justify-center gap-10 opacity-30 grayscale">
              {['HubSpot', 'Google', 'LinkedIn', 'Microsoft'].map(name => (
                <span key={name} className="text-lg font-bold tracking-tight" style={{ color: '#333' }}>
                  {name}
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