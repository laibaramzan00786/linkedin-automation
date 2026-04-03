'use client'
import { motion } from 'motion/react';
import { Command, ArrowRight, Mail } from 'lucide-react';
import {LinkedinLogo } from '@phosphor-icons/react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const Login = () => {
 const navigate= useRouter();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "user");
    navigate.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href ="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
              <Command className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-zinc-950">NexusFlow</span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-950">Welcome back</h1>
          <p className="text-zinc-500">Enter your credentials to access your account</p>
        </div>

        <div className="bg-white border border-zinc-200 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm text-zinc-950 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Password</label>
                <Link href="/ForgotPassword"  className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:text-blue-700">Forgot?</Link>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl px-5 py-4 text-sm text-zinc-950 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                required
              />
            </div>
            <button type="submit" className="w-full bg-zinc-950 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-zinc-950/10">
              Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
              <span className="bg-white px-4 text-zinc-400">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-2 bg-white border border-zinc-200 py-3 rounded-2xl hover:bg-zinc-50 transition-colors text-zinc-600">
                    <LinkedinLogo  size={18} className="text-blue-600" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">LinkedIn</span>
                       </button>
            <button className="flex items-center justify-center gap-2 bg-white border border-zinc-200 py-3 rounded-2xl hover:bg-zinc-50 transition-colors text-zinc-600">
              <Mail size={18} className="text-red-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Google</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-sm text-zinc-500">
          Don't have an account? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;