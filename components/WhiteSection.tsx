'use client'
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

const WhiteSection = () => {
  const points = [
    'Dynamic personalization based on lead history',
    'Smart timing that respects timezones and holidays',
    'Human-in-the-loop approval workflows',
    "Automatic follow-ups that don't feel spammy",
  ];

  return (
    <section
      id="about"
      className="py-28 relative overflow-hidden"
      style={{ background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="absolute -inset-3 rounded-3xl -rotate-2"
              style={{ background: '#fdf8f7' }}
            />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop"
              alt="Team working"
              className="relative rounded-3xl w-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              style={{ aspectRatio: '4/3' }}
              referrerPolicy="no-referrer"
            />
            <div
              className="absolute -bottom-6 -right-6 bg-white border rounded-2xl px-6 py-4 shadow-xl hidden md:block"
              style={{ borderColor: '#e5e5e5' }}
            >
              <p className="text-3xl font-bold" style={{ color: '#e8836a', fontFamily: "'Outfit', sans-serif" }}>24/7</p>
              <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: '#aaa' }}>Monitoring</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#e8836a' }}>
              The Human Touch
            </span>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-5 leading-tight"
              style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
            >
              Automation that<br />
              feels{' '}
              <span style={{ color: '#e8836a', fontStyle: 'italic' }}>personal.</span>
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#888' }}>
              Most automation tools sound like robots. NexusFlow uses advanced NLP to ensure every interaction feels genuinely human.
            </p>
            <ul className="space-y-4">
              {points.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border"
                    style={{ background: '#fdf8f7', borderColor: '#f5d0c4' }}
                  >
                    <CheckCircle2 size={11} style={{ color: '#e8836a' }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: '#444' }}>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhiteSection;