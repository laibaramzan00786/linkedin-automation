'use client'
import { motion } from 'motion/react';

const CTA = () => {
  return (
    <section className="py-40 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.08),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12 gradient-heading leading-[0.9]">
            Ready to elevate <br /> your <span className="text-blue-600 italic">workflow?</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16">
            <button className="group relative bg-zinc-950 text-white px-14 py-7 rounded-full font-bold text-xl uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10">Join the Waitlist</span>
            </button>
            <button className="px-14 py-7 rounded-full border border-zinc-200 bg-white font-bold text-xl uppercase tracking-widest hover:bg-zinc-50 transition-all hover:border-zinc-300 text-zinc-950">
              Contact Sales
            </button>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.4em]">Trusted by 2,000+ companies worldwide</p>
        <div className="flex gap-8  ">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROp-tVE-R6e5Uw_LRnOl1kC5MMXciei-j0VQ&s" className="h-8 w-auto" />
  <img src="https://logos-world.net/wp-content/uploads/2022/01/HubSpot-Logo.jpg" className="h-8 w-auto" />
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaAx4OMNKDO78w1GtSY9IKw8zy3RPjRMbWyg&s" className="h-8 w-auto" />
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWYFONIKNwGKdK-j0dMK8C7bMnoqz8cc-SYQ&s" className="h-8 w-auto" />
</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;