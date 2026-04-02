'use client'
import { motion } from 'motion/react';
import { Command, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
              <Command className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-zinc-950">NexusFlow</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-950">Reset password</h1>
          <p className="text-zinc-500">Enter your email and we'll send you a reset link</p>
        </div>

        <div className="bg-white border border-zinc-200 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm text-zinc-950 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                required
              />
            </div>
            <button type="submit" className="w-full bg-zinc-950 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-zinc-950/10">
              Send Reset Link <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Remembered your password? <Link href="/login" className="text-blue-600 font-bold hover:underline">Back to login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;