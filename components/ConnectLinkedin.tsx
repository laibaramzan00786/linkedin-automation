'use client';
import { useState } from 'react';
import { motion } from 'motion/react';
import {useRouter} from "next/navigation";
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  ArrowRight, 
  Loader2,
  Command,
  CheckCircle2
} from 'lucide-react';
import { LinkedinLogo } from "@phosphor-icons/react";

const ConnectPage = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate a brief connection process then navigate
    setTimeout(() => {
      setIsConnecting(false);
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-[#e8836a]/30">
     
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#e8836a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[1000px] bg-white border border-zinc-200 rounded-[32px] shadow-sm relative z-10 flex flex-col lg:flex-row overflow-hidden"
      >
       
        <div className="flex-1 p-8 md:p-12 lg:p-16 space-y-10">
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center">
                <Command className="text-[#e8836a] w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-950">NexusFlow</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold text-zinc-950 tracking-tight leading-tight">
                Connect your <span className="text-[#e8836a]">LinkedIn</span>
              </h1>
              <p className="text-lg text-zinc-500 max-w-lg font-medium leading-relaxed">
                Sync your profile to activate AI-powered outreach and lead management.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {[
              { 
                icon: ShieldCheck, 
                title: "Safe & Secure", 
                desc: "Bank-grade encryption for your credentials." 
              },
              { 
                icon: Zap, 
                title: "Smart Sync", 
                desc: "Real-time updates across all your devices." 
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-zinc-50 flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-100">
                  <item.icon size={18} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-zinc-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-8 py-4 bg-[#e8836a] text-white rounded-xl font-semibold text-sm hover:bg-[#d8735a] transition-all flex items-center justify-center gap-2.5 group shadow-lg shadow-[#e8836a]/10 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isConnecting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LinkedinLogo size={20} weight="bold" />
                  Connect LinkedIn
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          
          </div>
        </div>

     
        <div className="w-full lg:w-[380px] bg-zinc-50 border-l border-zinc-200 p-8 md:p-12 space-y-10">
          <div className="space-y-1.5">
            <h3 className="text-lg font-bold text-zinc-950">How it works</h3>
            <p className="text-xs text-zinc-500 font-medium">Simple 3-step synchronization</p>
          </div>

          <div className="space-y-8">
            {[
              { title: "Authenticate", desc: "Link your verified LinkedIn account." },
              { title: "Configure", desc: "Set your target audience parameters." },
              { title: "Launch", desc: "Start generating leads automatically." }
            ].map((item, i) => (
              <div key={i} className="flex gap-5 relative">
                {i !== 2 && <div className="absolute left-4 top-8 bottom-[-24px] w-[2px] bg-zinc-200" />}
                <div className="h-8 w-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[11px] font-bold text-zinc-900 shrink-0 shadow-sm relative z-10">
                  {i + 1}
                </div>
                <div className="space-y-1 pt-1">
                  <h4 className="font-semibold text-zinc-900 text-sm">{item.title}</h4>
                  <p className="text-[12px] text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-white rounded-2xl border border-zinc-200 shadow-sm mt-auto">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 size={18} />
              </div>
              <div>
                <h5 className="text-[11px] font-bold text-zinc-950 uppercase tracking-wider">Enterprise Security</h5>
                <p className="text-[10px] text-zinc-500 font-medium tracking-tight">SOC2 Type II Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 text-center text-[11px] text-zinc-400 font-medium">
        Need assistance? View our <span className="text-zinc-600 underline cursor-pointer">Connection Guide</span> or <span className="text-zinc-600 underline cursor-pointer">Contact Support</span>.
      </div>
    </div>
  );
};

export default ConnectPage;
