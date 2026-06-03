'use client';
import { ArrowRight, ChevronRight} from "lucide-react";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function VsDripify() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans overflow-x-hidden">
      <Navbar />
      <main>

        <section className="relative pt-44 pb-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8836a]/5 rounded-full blur-[120px]" />
          </div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-8 border border-[#feedea]">
              Independent Comparison · Updated 2026
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-5 leading-[1.15]"
                style={{ fontFamily: "'Outfit', sans-serif" }}>
              Finally. A LinkedIn Automation Tool That{" "}
              <span className="text-[#e8836a]">Doesn't Cost a Fortune.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed mb-10">
              Dripify charges $39–$89/month. NexusFlow delivers the same — and in key areas, better — LinkedIn automation at $5–$9/month. Smarter pricing. Cleaner interface. Faster setup. No compromises.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button className="px-10 py-5 bg-zinc-950 text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#e8836a] transition-all shadow-xl flex items-center gap-2 justify-center">
                Start Free with NexusFlow <ArrowRight size={16} />
              </button>
              <Link
  href="/compare/vs-dripify/full-comparison"
  className="px-10 py-5 border border-zinc-200 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-zinc-50 transition-all flex items-center gap-2 justify-center"
>
  See Full Comparison
  <ChevronRight size={16} />
</Link>
            </motion.div>
            <p className="text-sm text-zinc-400">✓ No credit card required &nbsp;·&nbsp; ✓ Free trial included &nbsp;·&nbsp; ✓ Cancel anytime</p>
          </div>
        </section>

        

      </main>
      <Footer />
    </div>
  );
}