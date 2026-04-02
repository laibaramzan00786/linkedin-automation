'use client';
import { motion } from 'motion/react';
import { Users, MessageSquare, Twitter, Linkedin, Github, Slack, ArrowRight, Heart, Zap } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">2
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
              Join the Movement
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-zinc-950 mb-8 tracking-tight"
            >
              Built by Automation Experts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto"
            >
              Join a global community of 50,000+ sales professionals, developers, and automation enthusiasts.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { name: "Slack", members: "12k+", desc: "Real-time support and networking.", icon: <Slack size={32} />, color: "bg-[#4A154B]" },
              { name: "LinkedIn", members: "25k+", desc: "Industry news and professional tips.", icon: <Linkedin size={32} />, color: "bg-[#0077B5]" },
              { name: "Twitter", members: "15k+", desc: "Quick updates and community chats.", icon: <Twitter size={32} />, color: "bg-[#1DA1F2]" },
              { name: "GitHub", members: "5k+", desc: "Open source tools and contributions.", icon: <Github size={32} />, color: "bg-[#181717]" },
            ].map((platform, i) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 hover:border-blue-200 hover:shadow-xl transition-all group text-center"
              >
                <div className={`w-16 h-16 ${platform.color} text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-950 mb-2">{platform.name}</h3>
                <div className="text-blue-600 text-sm font-bold mb-4">{platform.members} Members</div>
                <p className="text-xs text-zinc-500 leading-relaxed mb-8">{platform.desc}</p>
                <button className="w-full py-3 bg-white border border-zinc-200 rounded-xl text-sm font-bold text-zinc-950 hover:bg-zinc-950 hover:text-white transition-all">
                  Join Now
                </button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h2 className="text-4xl font-bold text-zinc-950 mb-8 leading-tight">Why join the NexusFlow community?</h2>
              <div className="space-y-8">
                {[
                  { title: "Exclusive Events", desc: "Get access to monthly webinars, workshops, and local meetups.", icon: <Users size={20} /> },
                  { title: "Early Access", desc: "Be the first to test new features and provide direct feedback.", icon: <Zap size={20} /> },
                  { title: "Expert Support", desc: "Get help from our team and other experienced power users.", icon: <MessageSquare size={20} /> },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-zinc-950 mb-2">{item.title}</h4>
                      <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] rotate-3" />
              <div className="relative bg-white p-8 rounded-[40px] border border-zinc-100 shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-zinc-100" />
                  <div>
                    <div className="text-sm font-bold text-zinc-950">Community Spotlight</div>
                    <div className="text-xs text-zinc-500">Weekly Member Feature</div>
                  </div>
                </div>
                <p className="text-xl font-medium text-zinc-950 mb-8 italic leading-relaxed">
                  "The NexusFlow community has been a game-changer for my agency. The shared templates and strategies alone have saved us hundreds of hours."
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="https://i.pravatar.cc/150?u=alex" alt="Alex" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                    <span className="text-sm font-bold text-zinc-950">Alex Rivera</span>
                  </div>
                  <div className="flex items-center gap-1 text-red-500">
                    <Heart size={16} fill="currentColor" />
                    <span className="text-xs font-bold">245</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

       
          <div className="p-16 bg-blue-600 rounded-[40px] text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h2 className="text-4xl font-bold mb-6 relative z-10">Don't miss out on the conversation.</h2>
            <p className="text-xl text-white/80 mb-12 relative z-10">Join our weekly newsletter for community highlights and tips.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-80 px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
              />
              <button className="w-full sm:w-auto px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold hover:bg-zinc-100 transition-all shadow-xl">
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