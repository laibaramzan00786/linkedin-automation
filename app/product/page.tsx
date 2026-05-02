
'use client';
import { 
  Shield, BarChart3, Users, MessageSquare, Globe, ArrowRight, Sparkles, Layers, Lock, 
  TrendingUp,  Play,
  Fingerprint, Radio
} from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#e8836a]/10 selection:text-[#e8836a] font-sans overflow-x-hidden">
      <Navbar />
      
      <main>
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-[0%] left-[0%] w-[30%] h-[30%] bg-[#e8836a]/5 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#feedea]">
                  <Sparkles size={12} />
                  Sales Intelligence Platform
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
                  Scale your outreach <br />
                  <span className="text-[#e8836a]">automatically.</span>
                </h1>
                
                <p className="text-lg text-zinc-500 mb-10 max-w-xl leading-relaxed font-medium">
                  NexusFlow orchestrates your entire sales pipeline with surgical precision and human-like intelligence. Stop the manual grind and start closing.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-4 bg-zinc-950 text-white rounded-full font-bold text-sm hover:bg-[#e8836a] transition-all shadow-xl shadow-zinc-200 flex items-center gap-2 group">
                    Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-8 py-4 bg-white border border-zinc-200 text-zinc-700 rounded-full font-bold text-sm hover:bg-zinc-50 transition-all flex items-center gap-2">
                    <Play size={16} fill="currentColor" /> Watch Video
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative"
              >
                <div className="relative rounded-3xl border border-zinc-200 bg-white p-2 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2340&auto=format&fit=crop" 
                    alt="Dashboard" 
                    className="rounded-2xl w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-2xl border border-zinc-100 hidden sm:block">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none mb-1">Success Rate</p>
                        <p className="text-lg font-bold text-zinc-900 leading-none">99.9%</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="py-32 bg-zinc-50/50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 tracking-tight mb-4">Powerful features for elite teams.</h2>
              <p className="text-zinc-500 font-medium">Everything you need to dominate your LinkedIn presence and drive high-quality leads.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Layers className="text-[#e8836a]" />,
                  title: "Adaptive Sequences",
                  desc: "Sequences that learn from every interaction and adjust timing automatically."
                },
                {
                  icon: <Shield className="text-[#e8836a]" />,
                  title: "Ghost Mode",
                  desc: "Advanced mimicry technology that keeps your account safe from detection."
                },
                {
                  icon: <BarChart3 className="text-[#e8836a]" />,
                  title: "Deep Intelligence",
                  desc: "Granular data on every touchpoint, from open rates to revenue attribution."
                },
                {
                  icon: <MessageSquare className="text-[#e8836a]" />,
                  title: "Unified Command",
                  desc: "Manage all your conversations across platforms in one beautiful interface."
                },
                {
                  icon: <Users className="text-[#e8836a]" />,
                  title: "Team Sync",
                  desc: "Collaborate effortlessly with teammates and prevent outreach collisions."
                },
                {
                  icon: <Globe className="text-[#e8836a]" />,
                  title: "Regional Proxies",
                  desc: "Dedicated residential IPs for every account to ensure localized organic growth."
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-zinc-200 p-10 rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[#fdf2f0] rounded-2xl flex items-center justify-center mb-8 border border-[#feedea]">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-4">{feature.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 bg-zinc-950 text-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-[#e8836a] font-bold text-[10px] uppercase tracking-[0.2em] mb-6 block">Safety & Compliance</span>
                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">Automate LinkedIn without <br className="hidden sm:block" /> worrying about bans.</h2>
                <div className="space-y-8">
                  {[
                    { icon: <Fingerprint />, title: "Human Behavior Mimicry", desc: "Our AI mimics real human typing and scrolling speeds to stay undetectable." },
                    { icon: <Radio />, title: "Smart Throttling", desc: "Automatic rate limiting based on your account age and historical activity." },
                    { icon: <Lock />, title: "Bank-Grade Encryption", desc: "All your data is protected with end-to-end encryption at all times." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e8836a] shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                        <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 p-4 rounded-[40px] backdrop-blur-sm">
                  <div className="bg-white rounded-[32px] p-8 text-zinc-900">
                    <div className="flex justify-between items-center mb-8">
                      <p className="text-sm font-bold uppercase tracking-widest text-[#e8836a]">Account Health</p>
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">100% SECURE</span>
                    </div>
                    <div className="space-y-6">
                      <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '85%' }}
                          className="h-full bg-[#e8836a]" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Actions Today</p>
                          <p className="text-2xl font-bold">42/50</p>
                        </div>
                        <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                          <p className="text-[10px] font-bold text-zinc-400 uppercase mb-1">Status</p>
                          <p className="text-2xl font-bold text-emerald-500">Active</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-8">Ready to grow?</h2>
            <p className="text-zinc-500 text-lg mb-12 font-medium">Join 2,000+ companies scaling their outreach with NexusFlow.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-12 py-5 bg-zinc-950 text-white rounded-full font-bold text-lg hover:bg-[#e8836a] transition-all shadow-xl active:scale-95">Get Started Free</button>
              <button className="px-12 py-5 border border-zinc-200 rounded-full font-bold text-lg hover:bg-zinc-50 transition-all">Talk to Sales</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
