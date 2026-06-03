'use client';
import { Check, X, ArrowRight, ChevronRight, Zap, Star, Cloud, Monitor, Shield, Clock } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";


export default function VsLinkedHelper() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden">
      <Navbar />
      <main>

        <section className="relative pt-44 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8836a]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-zinc-100 rounded-full blur-[80px]" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-8 border border-[#feedea]">
              Cloud vs Desktop · The Architecture Advantage · 2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
             className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-5 leading-[1.15]"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
              Linked Helper Stops When You Do.{" "}
              <span className="text-[#e8836a]">NexusFlow Never Stops.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
              Linked Helper is a desktop app tied to your local machine. Close your laptop and your campaigns die. NexusFlow is cloud-native — your outreach runs 24/7 regardless of your device, your location, or your timezone. And it starts at $5/month versus Linked Helper's $15.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-10 py-5 bg-zinc-950 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#e8836a] transition-all shadow-xl flex items-center gap-2 justify-center">
                Try NexusFlow Free <ArrowRight size={16} />
              </button>
                 <Link
                href="/compare/vs-linked-helper/difference"
                className="px-10 py-5 border border-zinc-200 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2 justify-center"
              >
                See the Difference
                <ChevronRight size={16} />
              </Link>
            </motion.div>
            <p className="text-sm text-zinc-400">✓ No credit card required &nbsp;·&nbsp; ✓ Cloud-based &nbsp;·&nbsp; ✓ No downloads ever</p>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}