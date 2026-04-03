'use client';
import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, Shield, BarChart3, Users, MessageSquare, Globe, ArrowRight, Sparkles, Layers, Lock, 
  ChevronRight,  
  TrendingUp,  Play, ArrowUpRight,
  Fingerprint, Radio
} from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans overflow-x-hidden">
      <Navbar />
      
      <main>
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-40 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-40" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/50 text-slate-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-10 shadow-sm"
              >
                <Sparkles size={14} className="text-blue-500" />
                <span>The Future of Sales Intelligence</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-7xl md:text-[120px] font-bold tracking-[-0.04em] text-slate-900 mb-10 leading-[0.9] md:leading-[0.85]"
              >
                Outreach <br className="hidden md:block" />
                <span className="text-blue-600 italic font-serif font-light">Redefined.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-xl md:text-2xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-light tracking-tight"
              >
                NexusFlow orchestrates your entire sales pipeline with surgical precision and human-like intelligence.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
              >
                <button className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group">
                  Start Scaling <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-12 py-6 bg-white border border-slate-200 text-slate-700 rounded-full font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  <Play size={18} fill="currentColor" /> Watch Demo
                </button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-6xl mx-auto group"
            >
              <div className="bg-white/40 backdrop-blur-2xl rounded-[48px] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.1)] border border-white/60 p-6 relative z-10 overflow-hidden">
                <div className="rounded-[32px] overflow-hidden border border-slate-100/50 shadow-inner">
                  <img 
                    src="https://storage.googleapis.com/website-production/uploads/2019/09/linkedin-automation.png" 
                    alt="NexusFlow Ultra UI" 
                    className="w-full h-auto scale-105 group-hover:scale-100 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
           
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-64 p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-2xl z-20 hidden lg:block"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Rate</div>
                    <div className="text-xl font-bold text-slate-900">+124%</div>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-emerald-500 rounded-full" />
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 w-64 p-6 bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-2xl z-20 hidden lg:block"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Leads</div>
                    <div className="text-xl font-bold text-slate-900">12,482</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

     
        <section className="py-40 bg-white px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-24">
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[0.95] mb-6">
                  Engineered for <br />
                  <span className="text-blue-600">performance.</span>
                </h2>
                <p className="text-xl text-slate-500 font-light leading-relaxed">
                  Every pixel and line of code is optimized to give your team the ultimate edge in outreach.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400">
                  <ChevronRight size={20} className="rotate-180" />
                </div>
                <div className="w-12 h-12 rounded-full border border-slate-900 flex items-center justify-center text-slate-900">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
     
              <div className="md:col-span-8 p-12 bg-slate-50 rounded-[48px] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                <div className="relative z-10 max-w-md">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-10 shadow-xl shadow-blue-200">
                    <Layers size={32} />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Adaptive Sequences</h3>
                  <p className="text-lg text-slate-500 leading-relaxed mb-10 font-light">
                    Our AI-driven sequences learn from every interaction, automatically adjusting timing and content to maximize reply rates.
                  </p>
                  <button className="flex items-center gap-2 text-slate-900 font-bold group/btn">
                    Learn more <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </button>
                </div>
                <div className="absolute top-1/2 right-[-10%] -translate-y-1/2 w-1/2 h-full bg-white rounded-3xl border border-slate-100 shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-700 p-6">
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center px-4 gap-3">
                        <div className={`w-2 h-2 rounded-full ${i === 1 ? 'bg-blue-500' : 'bg-slate-200'}`} />
                        <div className="w-full h-2 bg-slate-100 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

             
              <div className="md:col-span-4 p-12 bg-slate-900 text-white rounded-[48px] hover:scale-[1.02] transition-all duration-500 flex flex-col justify-between group">
                <div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md text-white flex items-center justify-center mb-10">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-6 tracking-tight">Ghost Mode</h3>
                  <p className="text-slate-400 leading-relaxed font-light">
                    Advanced human-mimicry technology that makes your automation invisible to detection.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-3 text-emerald-400 text-sm font-bold uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active Protection
                </div>
              </div>

              <div className="md:col-span-4 p-12 bg-white rounded-[48px] border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-10">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Deep Analytics</h3>
                <p className="text-slate-500 leading-relaxed font-light mb-10">
                  Granular data on every touchpoint, from open rates to revenue attribution.
                </p>
                <div className="flex items-end gap-2 h-20">
                  {[40, 70, 45, 90, 60, 80].map((h, i) => (
                    <div key={i} className="flex-1 bg-purple-100 rounded-t-lg group-hover:bg-purple-500 transition-all duration-500" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>

              <div className="md:col-span-8 p-12 bg-blue-50 rounded-[48px] border border-blue-100 hover:bg-white hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-10 shadow-xl shadow-blue-200">
                      <MessageSquare size={32} />
                    </div>
                    <h3 className="text-4xl font-bold text-slate-900 mb-6 tracking-tight">Unified Command</h3>
                    <p className="text-lg text-slate-500 leading-relaxed mb-10 font-light">
                      One inbox to rule them all. Manage LinkedIn, Email, and Twitter conversations in a single, beautiful interface.
                    </p>
                    <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all">
                      Open Command Center
                    </button>
                  </div>
                  <div className="flex-1 relative">
                    <div className="bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-4 translate-x-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100" />
                        <div className="space-y-2">
                          <div className="w-32 h-3 bg-slate-200 rounded" />
                          <div className="w-24 h-2 bg-slate-100 rounded" />
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-2xl text-sm text-blue-700">
                        "I've been looking for a solution like this for months. Let's talk!"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

     
        <section className="py-40 bg-slate-50 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-8">
                  <Shield size={14} />
                  <span>LinkedIn Safety First</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-10 tracking-tight leading-tight">
                  Automate LinkedIn <br />
                  <span className="text-blue-600">without the risk.</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  {[
                    { icon: <Fingerprint />, title: "Human Mimicry", desc: "Randomized activity patterns that mirror real human behavior." },
                    { icon: <Radio />, title: "Smart Throttling", desc: "Automatic limits that stay safely within LinkedIn's thresholds." },
                    { icon: <Globe />, title: "Residential Proxies", desc: "Dedicated IPs for every account to ensure localized presence." },
                    { icon: <Lock />, title: "Cloud-Native", desc: "Runs 24/7 on secure servers. No browser extensions needed." }
                  ].map((item, i) => (
                    <div key={i} className="space-y-4">
                      <div className="text-blue-600">{React.cloneElement(item.icon as React.ReactElement,)}</div>
                      <h4 className="text-xl font-bold text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-[48px] p-8 shadow-2xl relative z-10 overflow-hidden border border-slate-100">
                  <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Users size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">Account Health</div>
                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Optimal Performance</div>
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">
                      100% SAFE
                    </div>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="flex justify-between items-end mb-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Daily Connection Limit</div>
                        <div className="text-lg font-bold text-slate-900">42 / 50</div>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '84%' }}
                          className="h-full bg-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Follow-ups</div>
                        <div className="text-2xl font-bold text-slate-900">128</div>
                      </div>
                      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">Replies</div>
                        <div className="text-2xl font-bold text-blue-600">34</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-4 border-white" />
                      ))}
                    </div>
                    <button className="text-blue-600 font-bold text-sm flex items-center gap-2">
                      View Activity <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-100 rounded-full blur-[100px] -z-10 opacity-50" />
              </div>
            </div>
          </div>
        </section>

  
        <section className="py-40 bg-white px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-16">
              <div className="flex justify-center gap-1 mb-10">
                {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="text-blue-500" size={24} fill="currentColor" />)}
              </div>
              <h2 className="text-4xl md:text-6xl font-serif italic text-slate-900 leading-tight tracking-tight mb-16">
                "NexusFlow isn't just a tool, it's a paradigm shift. We've seen a 400% increase in qualified meetings within the first month."
              </h2>
              <div className="flex items-center justify-center gap-6">
                <div className="w-20 h-20 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=modern" alt="User" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-slate-900">Marcus Thorne</div>
                  <div className="text-blue-600 font-medium tracking-widest uppercase text-xs">Head of Growth, Velocity AI</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-40 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-slate-900 rounded-[64px] p-12 md:p-32 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-blue-600 rounded-full blur-[160px] group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[150%] bg-purple-600 rounded-full blur-[160px] group-hover:scale-110 transition-transform duration-1000" />
              </div>
              
              <div className="relative z-10">
                <h2 className="text-6xl md:text-[100px] font-bold text-white mb-12 tracking-[-0.04em] leading-[0.9]">
                  Join the <br />
                  <span className="text-blue-400">new era.</span>
                </h2>
                <p className="text-xl md:text-2xl text-slate-400 mb-16 max-w-2xl mx-auto font-light">
                  Experience the power of NexusFlow today. No credit card required, just pure growth.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button className="w-full sm:w-auto px-16 py-8 bg-white text-slate-900 rounded-full font-bold text-2xl hover:scale-105 transition-all shadow-2xl">
                    Get Started Free
                  </button>
                  <button className="w-full sm:w-auto px-16 py-8 bg-transparent border border-white/20 text-white rounded-full font-bold text-2xl hover:bg-white/10 transition-all">
                    Talk to Sales
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;