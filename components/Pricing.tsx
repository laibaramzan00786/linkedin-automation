'use client';
import { Check, Zap, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Pricing = () => {
  const plans = [
    {
      name:        'Basic',
      description: 'Perfect for single-purpose outreach and beginners.',
      price:       '1,500',
      accounts:    '1 LinkedIn Account',
      features:    [
        '1 Active LinkedIn Account',
        'Lead Generation Automation',
        'Message Templates',
        'Basic Response Tracking',
        'Cloud Infrastructure',
        'Standard Support',
      ],
      icon:    Zap,
      popular: false,
    },
    {
      name:        'Standard',
      description: 'Ideal for growing sales teams and professionals.',
      price:       '2,500',
      accounts:    '2 LinkedIn Accounts',
      features:    [
        '2 Active LinkedIn Accounts',
        'Multi-Account Management',
        'Advanced Filtering',
        'Priority Sequence Queues',
        'Premium Reporting Hub',
        'Priority Human Support',
        'Everything in Basic',
      ],
      icon:    Shield,
      popular: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: '#fff', fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: '#e8836a' }}>
              Transparent Pricing
            </span>
            <h2
              className="text-4xl md:text-6xl font-bold tracking-tight mt-3 mb-4"
              style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
            >
              Simple{' '}
              <span style={{ color: '#ccc' }}>Pricing.</span>
            </h2>
            <p className="text-base max-w-lg mx-auto mb-8" style={{ color: '#888' }}>
              Choose the plan that fits your growth. Monthly billing, no long-term contracts.
            </p>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-semibold"
              style={{ background: '#fafafa', borderColor: '#e5e5e5', color: '#888' }}
            >
              Monthly Billing Cycle
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-3xl border flex flex-col transition-all duration-300"
                style={{
                  background:   plan.popular ? '#fff' : '#fafafa',
                  borderColor:  plan.popular ? '#f5d0c4' : '#e5e5e5',
                  boxShadow:    plan.popular ? '0 8px 32px rgba(232,131,106,0.1)' : 'none',
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                    style={{ background: '#e8836a', boxShadow: '0 4px 12px rgba(232,131,106,0.3)' }}
                  >
                    Most Recommended
                  </div>
                )}

                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 border transition-all"
                  style={{
                    background:  plan.popular ? '#e8836a' : '#fff',
                    borderColor: plan.popular ? '#e8836a' : '#e5e5e5',
                    color:       plan.popular ? '#fff' : '#aaa',
                    boxShadow:   plan.popular ? '0 4px 12px rgba(232,131,106,0.25)' : 'none',
                  }}
                >
                  <Icon size={22} />
                </div>

                <h3 className="text-2xl font-bold mb-1" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
                  {plan.name}
                </h3>
                <p className="text-sm mb-6" style={{ color: '#888' }}>{plan.description}</p>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold" style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}>
                    {plan.price}
                  </span>
                  <div>
                    <p className="text-xs font-bold" style={{ color: '#111' }}>PKR</p>
                    <p className="text-[10px]" style={{ color: '#aaa' }}>/ Month</p>
                  </div>
                </div>
                <div
                  className="inline-block px-3 py-1 rounded-lg text-[10px] font-semibold mb-8"
                  style={{ background: '#f5f5f5', color: '#666' }}
                >
                  {plan.accounts}
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: plan.popular ? '#fdf8f7' : '#f5f5f5', color: plan.popular ? '#e8836a' : '#aaa' }}
                      >
                        <Check size={9} strokeWidth={3} />
                      </div>
                      <span className="text-[12px] font-medium" style={{ color: '#555' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 group transition-all active:scale-95"
                  style={{
                    background:  plan.popular ? '#e8836a' : '#fff',
                    color:       plan.popular ? '#fff' : '#333',
                    border:      plan.popular ? 'none' : '1px solid #e5e5e5',
                    boxShadow:   plan.popular ? '0 4px 16px rgba(232,131,106,0.25)' : 'none',
                  }}
                >
                  Deploy {plan.name} Plan
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-8" style={{ color: '#ccc' }}>
            Secure Payments via International Standards
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-25 grayscale">
            {['Stripe', 'Visa', 'Mastercard', 'SafePay'].map(name => (
              <span key={name} className="text-lg font-bold italic" style={{ color: '#333' }}>{name}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;