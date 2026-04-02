'use client';
import  { useState } from 'react';
import { Check, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and solo founders.",
      price: isAnnual ? "29" : "39",
      features: [
        "Up to 1,000 leads/mo",
        "Basic Campaign Builder",
        "Email Support",
        "Standard Analytics",
        "1 Active Workflow"
      ],
      icon: Zap,
      accent: "blue"
    },
    {
      name: "Professional",
      description: "Best for growing teams and agencies.",
      price: isAnnual ? "79" : "99",
      popular: true,
      features: [
        "Up to 10,000 leads/mo",
        "Advanced AI Funnels",
        "Priority 24/7 Support",
        "Deep Intelligence Analytics",
        "Unlimited Workflows",
        "Team Collaboration"
      ],
      icon: Shield,
      accent: "blue"
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations.",
      price: "Custom",
      features: [
        "Unlimited leads",
        "Custom AI Model Training",
        "Dedicated Account Manager",
        "SSO & Advanced Security",
        "White-label options",
        "API Access"
      ],
      icon: Globe,
      accent: "zinc"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-bold uppercase tracking-[0.4em] text-[10px] mb-6 block">Investment</span>
            <h2 className="text-6xl md:text-8xl font-display uppercase tracking-tighter text-zinc-950 mb-8">
              Simple <span className="text-zinc-400">Pricing.</span>
            </h2>
            <p className="text-zinc-500 text-xl max-w-2xl mx-auto mb-12">
              Choose the plan that fits your growth velocity. No hidden fees, just pure performance.
            </p>

            <div className="flex items-center justify-center gap-4">
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${!isAnnual ? 'text-zinc-950' : 'text-zinc-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-14 h-7 bg-zinc-100 rounded-full p-1 relative border border-zinc-200"
              >
                <motion.div 
                  animate={{ x: isAnnual ? 28 : 0 }}
                  className="w-5 h-5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                />
              </button>
              <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${isAnnual ? 'text-zinc-950' : 'text-zinc-400'}`}>
                Yearly <span className="text-blue-600 ml-1">(-20%)</span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-10 rounded-[40px] border transition-all duration-500 group ${
                  plan.popular 
                    ? 'bg-white border-blue-500/30 shadow-[0_40px_80px_rgba(0,0,0,0.08)]' 
                    : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_10px_20px_rgba(37,99,235,0.3)]">
                    Most Popular
                  </div>
                )}

                <div className="flex flex-col h-full">
                  <div className="mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 border ${
                      plan.popular ? 'bg-blue-600 text-white border-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.2)]' : 'bg-white text-zinc-400 border-zinc-200 group-hover:bg-zinc-50'
                    }`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-3xl font-display uppercase tracking-tight text-zinc-950 mb-2">{plan.name}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="mb-10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-display tracking-tighter text-zinc-950">
                        {plan.price === "Custom" ? "" : "$"}
                        {plan.price}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest">/mo</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-5 mb-10">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.popular ? 'bg-blue-50 text-blue-600' : 'bg-zinc-200 text-zinc-500'
                        }`}>
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-zinc-600 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`w-full py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-3 group/btn ${
                    plan.popular 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.2)]' 
                      : 'bg-zinc-950 text-white hover:bg-zinc-900'
                  }`}>
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <p className="text-zinc-400 text-xs uppercase tracking-[0.3em] font-bold mb-8">Trusted by 50,000+ high-velocity teams</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['Stripe', 'Linear', 'Vercel', 'Supabase', 'GitHub'].map(logo => (
              <span key={logo} className="text-2xl font-display font-black tracking-tighter text-zinc-950">{logo}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;