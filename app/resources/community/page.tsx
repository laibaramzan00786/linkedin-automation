'use client';

import { motion } from 'motion/react';
import { Users, MessageSquare, ArrowRight, Heart, Zap } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub, FaSlack } from "react-icons/fa";

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">

          {/* HEADER */}
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

          {/* SOCIAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {[
              { name: "Slack", members: "12k+", desc: "Real-time support and networking.", icon: <FaSlack size={32} />, color: "bg-[#4A154B]" },
              { name: "LinkedIn", members: "25k+", desc: "Industry news and professional tips.", icon: <FaLinkedin size={32} />, color: "bg-[#0077B5]" },
              { name: "Twitter", members: "15k+", desc: "Quick updates and community chats.", icon: <FaTwitter size={32} />, color: "bg-[#1DA1F2]" },
              { name: "GitHub", members: "5k+", desc: "Open source tools and contributions.", icon: <FaGithub size={32} />, color: "bg-[#181717]" },
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

          {/* FEATURES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div>
              <h2 className="text-4xl font-bold text-zinc-950 mb-8 leading-tight">
                Why join the NexusFlow community?
              </h2>

              <div className="space-y-8">
                {[
                  { title: "Exclusive Events", desc: "Monthly webinars & meetups.", icon: <Users size={20} /> },
                  { title: "Early Access", desc: "Test new features first.", icon: <Zap size={20} /> },
                  { title: "Expert Support", desc: "Get help from experts.", icon: <MessageSquare size={20} /> },
                ].map((item) => (
                  <div key={item.title} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      {item.icon}
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-zinc-950 mb-2">{item.title}</h4>
                      <p className="text-zinc-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* TESTIMONIAL */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] rotate-3" />

              <div className="relative bg-white p-8 rounded-[40px] border shadow-2xl">
                <p className="text-xl font-medium mb-8 italic">
                  "The NexusFlow community has been a game-changer for my agency."
                </p>

                <div className="flex justify-between items-center">
                  <span className="font-bold">Alex Rivera</span>

                  <div className="flex items-center gap-1 text-red-500">
                    <Heart size={16} fill="currentColor" />
                    <span className="text-xs font-bold">245</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="p-16 bg-blue-600 rounded-[40px] text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Don't miss out on the conversation.
            </h2>

            <p className="text-xl mb-12">
              Join our weekly newsletter.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input 
                type="email"
                placeholder="Enter your email"
                className="px-6 py-4 rounded-2xl text-black"
              />

              <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold">
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