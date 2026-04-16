'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight, 
  Loader2,
  Users
} from 'lucide-react';
import { LinkedinLogoIcon,GoogleChromeLogoIcon } from '@phosphor-icons/react';
const ConnectPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useRouter();

  const handleConnect = () => {
    setIsConnecting(true);
   
    setTimeout(() => {
      navigate.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row shadow-2xl border border-zinc-100">
    
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-center space-y-12 relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest"
            >
              <LinkedinLogoIcon size={14} />
              Official Integration
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-display font-bold text-zinc-900 tracking-tight leading-[1.1]"
            >
              Connect your <br />
              <span className="text-blue-600">LinkedIn Account.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-zinc-500 max-w-lg font-medium leading-relaxed"
            >
              Sync your LinkedIn profile to start automating your outreach, managing leads, and growing your network with NexusFlow.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Safe & Secure", 
                desc: "We use advanced encryption and safety limits to protect your account." 
              },
              { 
                icon: Zap, 
                title: "Smart Automation", 
                desc: "Our AI mimics human behavior to keep your account safe." 
              },
              { 
                icon: Globe, 
                title: "Multi-Account", 
                desc: "Manage multiple LinkedIn profiles from a single dashboard." 
              },
              { 
                icon: Users, 
                title: "Lead Generation", 
                desc: "Find and connect with your ideal prospects automatically." 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex gap-4"
              >
                <div className="h-12 w-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-100">
                  <item.icon size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-zinc-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  Connect LinkedIn
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <button className="px-10 py-5 bg-zinc-50 text-zinc-900 border border-zinc-200 rounded-2xl font-bold text-sm hover:bg-zinc-100 transition-all flex items-center justify-center gap-3">
              <GoogleChromeLogoIcon size={18} />
              Install Extension
            </button>
          </motion.div>
        </motion.div>
      </div>

    
      <div className="w-full lg:w-[450px] bg-zinc-50 border-l border-zinc-100 p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
   
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] rounded-full border-[40px] border-blue-600" />
          <div className="absolute bottom-[-5%] left-[-5%] w-[200px] h-[200px] rounded-full border-[20px] border-blue-600" />
        </div>

        <div className="relative z-10 space-y-10">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-zinc-900 tracking-tight">How it works</h3>
            <p className="text-xs text-zinc-500 font-medium">Follow these simple steps to get started</p>
          </div>

          <div className="space-y-8">
            {[
              { step: "01", title: "Install NexusFlow Extension", desc: "Add our secure browser extension to your Chrome or Edge browser." },
              { step: "02", title: "Login to LinkedIn", desc: "Open LinkedIn in your browser and log in to the account you want to connect." },
              { step: "03", title: "Sync & Automate", desc: "NexusFlow will automatically detect your account and start syncing data." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 relative">
                {i !== 2 && <div className="absolute left-5 top-10 bottom-[-20px] w-px bg-zinc-200" />}
                <div className="h-10 w-10 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-xs font-black text-zinc-900 shrink-0 shadow-sm">
                  {item.step}
                </div>
                <div className="space-y-1.5 pt-1">
                  <h4 className="font-bold text-zinc-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 pt-12">
          <div className="p-6 bg-white rounded-3xl border border-zinc-200 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h5 className="text-[11px] font-black text-zinc-900 uppercase tracking-widest">Privacy First</h5>
                <p className="text-[10px] text-zinc-500 font-medium">Your data is encrypted and never shared.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-zinc-400">Trusted by 10k+ users</span>
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="h-6 w-6 rounded-full border-2 border-white bg-zinc-200" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
