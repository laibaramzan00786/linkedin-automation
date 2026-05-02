'use client';
import { motion } from 'motion/react';
import { Users, MessageSquare, Heart, Zap, Globe} from 'lucide-react';
import { LinkedinLogoIcon as Linkedin, GithubLogoIcon as Github, TwitterLogoIcon as Twitter } from '@phosphor-icons/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-[#e8836a]/10 selection:text-[#e8836a] font-sans overflow-x-hidden">
      <Navbar />
      
      <main className="pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf2f0] text-[#e8836a] text-[10px] font-bold uppercase tracking-widest mb-6 border border-[#feedea]"
            >
              The Nexus Collective
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-zinc-950 mb-8 tracking-tight leading-[1.1]"
            >
              Built by <span className="text-[#e8836a]">Growth Experts.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Join 50,000+ sales professionals, developers, and automation enthusiasts scaling the next generation of business.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { name: "Slack", members: "12k+", desc: "Real-time support and high-level networking.", icon: <MessageSquare size={32} />, color: "bg-[#e8836a]" },
              { name: "LinkedIn", members: "25k+", desc: "Industry news and professional tactics.", icon: <Linkedin size={32} />, color: "bg-zinc-900" },
              { name: "Twitter", members: "15k+", desc: "Quick updates and community alpha.", icon: <Twitter size={32} />, color: "bg-zinc-900" },
              { name: "GitHub", members: "5k+", desc: "Open source tools and dev protocols.", icon: <Github size={32} />, color: "bg-zinc-900" },
            ].map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-zinc-50 rounded-[40px] border border-zinc-100 hover:border-[#e8836a]/30 hover:shadow-2xl transition-all duration-500 group text-center"
              >
                <div className={`w-16 h-16 ${platform.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl transition-transform duration-500 group-hover:scale-110`}>
                  {platform.icon}
                </div>

                <h3 className="text-2xl font-bold text-zinc-950 mb-2">{platform.name}</h3>
                <div className="text-[#e8836a] text-[10px] font-black uppercase tracking-widest mb-6">{platform.members} Members</div>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium mb-10">{platform.desc}</p>

                <button className="w-full py-4 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all">
                  Join Protocol
                </button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-zinc-950 mb-10 leading-tight">
                Why join the <br />NexusFlow community?
              </h2>

              <div className="space-y-10">
                {[
                  { title: "Exclusive Alpha", desc: "Get early access to cutting-edge features before the market.", icon: <Zap size={20} /> },
                  { title: "Strategic Events", desc: "Monthly deep-dive webinars and regional networking meetups.", icon: <Globe size={20} /> },
                  { title: "Expert Hub", desc: "Instant support from our core engineering and strategy teams.", icon: <Users size={20} /> },
                ].map((item) => (
                  <div key={item.title} className="flex gap-8">
                    <div className="w-14 h-14 rounded-2xl bg-[#fdf2f0] flex items-center justify-center text-[#e8836a] shrink-0 border border-[#feedea]">
                      {item.icon}
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-zinc-950 mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-[#e8836a]/5 rounded-[48px] -rotate-3 transition-transform duration-700 group-hover:rotate-0" />

              <div className="relative bg-white p-12 rounded-[48px] border border-zinc-100 shadow-2xl">
                <div className="w-12 h-12 bg-[#fdf2f0] text-[#e8836a] rounded-xl flex items-center justify-center mb-8">
                    <Heart size={24} fill="currentColor" />
                </div>
                <p className="text-2xl font-bold text-zinc-950 mb-8 leading-tight italic grayscale hover:grayscale-0 transition-all duration-500">
                  "The NexusFlow community has been a complete game-changer for our agency's outreach roadmap. The support is unmatched."
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-black uppercase tracking-widest text-zinc-950">Alex Rivera</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Founder, Growth Protocol</div>
                  </div>

                  <div className="flex items-center gap-1 text-[#e8836a]">
                    <span className="text-xs font-black">245</span>
                    <Heart size={14} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-16 lg:p-24 bg-zinc-950 rounded-[64px] text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8836a]/10 blur-[100px] rounded-full" />
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 relative z-10 leading-tight">
              Don't miss the <br /><span className="text-[#e8836a]">conversation.</span>
            </h2>

            <p className="text-xl text-zinc-400 mb-12 font-medium relative z-10">
              Join our weekly newsletter for the latest in automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10 max-w-xl mx-auto">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:ring-4 focus:ring-[#e8836a]/20 focus:border-[#e8836a]/50 transition-all"
              />

              <button className="px-10 py-5 bg-[#e8836a] text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white hover:text-zinc-950 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CommunityPage;
