'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import {LinkedinLogo} from '@phosphor-icons/react';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import {cn} from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface ConnectLinkedInProps {
  onConnect: () => void;
}

export default function ConnectLinkedIn({ onConnect }: ConnectLinkedInProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [step, setStep] = useState(1);
    const router = useRouter();
  const handleConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setStep(2);
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100"
      >
        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <LinkedinLogo className="text-white w-8 h-8" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              Connect your LinkedIn Profile
            </h1>
            <p className="text-slate-500 text-lg">
              To start automating your outreach, we need to sync with your LinkedIn account securely.
            </p>
          </div>

          <div className="space-y-6 mb-10">
            <FeatureItem 
              icon={<ShieldCheck className="w-5 h-5 text-blue-600" />}
              title="Secure Connection"
              description="We use enterprise-grade encryption to protect your account data."
            />
            <FeatureItem 
              icon={<Zap className="w-5 h-5 text-amber-500" />}
              title="Smart Automation"
              description="Our AI mimics human behavior to keep your account safe."
            />
            <FeatureItem 
              icon={<Users className="w-5 h-5 text-emerald-500" />}
              title="Lead Generation"
              description="Find and connect with your ideal prospects automatically."
            />
          </div>

          {step === 1 ? (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className={cn(
                "w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all flex items-center justify-center gap-3",
                isConnecting ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-lg shadow-blue-200"
              )}
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  Connect LinkedIn Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-8 flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-white w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900">Profile Connected!</h3>
                  <p className="text-emerald-700 text-sm">Successfully linked with Laiba Ramzan's profile.</p>
                </div>
              </div>
              <button
                onClick={() => {
  onConnect?.(); // optional callback
  router.push('/dashboard');
}} 
                className="w-full py-4 px-6 rounded-2xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
              >
                Go to Dashboard
              </button>
            </motion.div>
          )}
        </div>
        
        <div className="bg-slate-50 p-6 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-sm">
            By connecting, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-900">{title}</h4>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
