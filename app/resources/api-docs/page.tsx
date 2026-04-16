'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Book, Zap, Shield, Cpu, ChevronRight, MessageSquare, Users, BarChart3 } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const ApiDocsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { 
      title: "Getting Started", 
      icon: <Book className="text-blue-600" size={24} />, 
      count: 12,
      desc: "New to NexusFlow? Start here to set up your account and launch your first campaign."
    },
    { 
      title: "Automation & Sequences", 
      icon: <Zap className="text-amber-500" size={24} />, 
      count: 24,
      desc: "Learn how to build high-converting multichannel sequences and automation rules."
    },
    { 
      title: "Safety & Compliance", 
      icon: <Shield className="text-emerald-500" size={24} />, 
      count: 8,
      desc: "Everything you need to know about LinkedIn safety, proxy settings, and account protection."
    },
    { 
      title: "API & Integrations", 
      icon: <Cpu className="text-purple-500" size={24} />, 
      count: 15,
      desc: "Technical documentation for our REST API, webhooks, and third-party integrations."
    },
    { 
      title: "Team Management", 
      icon: <Users className="text-indigo-500" size={24} />, 
      count: 10,
      desc: "Manage your team members, roles, and collaborative workflows effectively."
    },
    { 
      title: "Analytics & Reporting", 
      icon: <BarChart3 className="text-blue-500" size={24} />, 
      count: 18,
      desc: "Deep dive into performance metrics, lead tracking, and ROI analysis."
    }
  ];

  const popularArticles = [
    "How to connect your LinkedIn account safely",
    "Setting up your first multichannel sequence",
    "Understanding LinkedIn's weekly invitation limits",
    "How to use the Smart Inbox for lead management",
    "Best practices for A/B testing your messaging",
    "Configuring webhooks for CRM synchronization"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      
     
      <section className="pt-40 pb-20 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 tracking-tight"
          >
            How can we help you today?
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
              <Search className="text-slate-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for articles, guides, or API endpoints..."
              className="w-full pl-14 pr-6 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 flex flex-wrap justify-center gap-3"
          >
            <span className="text-sm text-slate-500">Popular:</span>
            {['Safety', 'API Keys', 'Proxy Setup', 'Billing'].map((tag) => (
              <button key={tag} className="text-sm text-blue-600 font-medium hover:underline">
                {tag}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      <main className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {cat.desc}
                </p>
                <div className="flex items-center text-blue-600 text-sm font-bold">
                  <span>{cat.count} articles</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Popular Articles</h2>
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                {popularArticles.map((article, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className={`flex items-center justify-between p-6 hover:bg-slate-50 transition-colors ${i !== popularArticles.length - 1 ? 'border-b border-slate-50' : ''}`}
                  >
                    <span className="text-slate-700 font-medium">{article}</span>
                    <ChevronRight size={18} className="text-slate-300" />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 bg-blue-600 rounded-3xl text-white shadow-lg shadow-blue-200">
                <MessageSquare className="mb-6" size={32} />
                <h3 className="text-xl font-bold mb-3">Still need help?</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  Our support team is available 24/7 to help you with any questions or technical issues.
                </p>
                <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                  Contact Support
                </button>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Join the Community</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  Connect with other NexusFlow users, share strategies, and get tips from the pros.
                </p>
                <button className="w-full py-3 border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">
                  Visit Community
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ApiDocsPage;