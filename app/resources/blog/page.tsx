
'use client';
import { motion } from 'motion/react';
import { ArrowRight, Search, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: "How to Scale Your LinkedIn Outreach in 2024",
    excerpt: "Discover the latest strategies for scaling your LinkedIn outreach without compromising on personalization.",
    author: "Sarah Jenkins",
    date: "March 10, 2024",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2340&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Future of AI in Sales Automation",
    excerpt: "AI is changing the sales landscape. Learn how to leverage new tools to stay ahead of the curve.",
    author: "Peter Sutherland",
    date: "March 05, 2024",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2340&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "5 Common Mistakes in Cold Messaging",
    excerpt: "Avoid these common pitfalls that could be hurting your conversion rates and brand reputation.",
    author: "David Wilson",
    date: "February 28, 2024",
    category: "Tips",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2340&auto=format&fit=crop"
  }
];

const BlogPage = () => {
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
              Nexus Intelligence
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-zinc-950 mb-8 tracking-tight leading-[1.1]"
            >
              Insights for <span className="text-[#e8836a]">Growth.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed font-medium"
            >
              Stay updated with the latest trends in automation, sales intelligence, and high-velocity outreach strategies.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-8 border-b border-zinc-100">
            <div className="flex items-center gap-8 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
              {['All Posts', 'Strategy', 'Technology', 'Tips', 'Product Updates'].map((cat) => (
                <button key={cat} className="whitespace-nowrap text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#e8836a] transition-colors">
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-[#e8836a]/5 focus:border-[#e8836a] transition-all"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group cursor-pointer mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="overflow-hidden rounded-[32px] aspect-[16/10] border border-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
                  alt="Featured" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="px-4">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-[#e8836a] text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Featured</span>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    <Clock size={12}/> 10 Min Read
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-zinc-950 mb-6 leading-tight group-hover:text-[#e8836a] transition-colors">
                  The Ultimate Guide to Omnichannel Sales Automation
                </h2>
                <p className="text-lg text-zinc-500 mb-8 leading-relaxed font-medium">
                  Learn how to synchronize your LinkedIn and Email outreach to create a seamless experience for your prospects and close more deals using autonomous agents.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#fdf2f0] text-[#e8836a] flex items-center justify-center font-bold text-xs ring-4 ring-white">
                    SJ
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-950 uppercase tracking-widest">Sarah Jenkins</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Head of Strategy</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-[24px] aspect-[4/3] mb-6 border border-zinc-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold text-[#e8836a] uppercase tracking-widest">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-950 mb-4 group-hover:text-[#e8836a] transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm mb-6 line-clamp-2 font-medium">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-950 group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={14} className="text-[#e8836a]" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 p-12 lg:p-20 bg-zinc-950 rounded-[48px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#e8836a]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Get the latest insights delivered.</h2>
              <p className="text-zinc-400 mb-10 font-medium">Join 10,000+ sales professionals staying ahead of the industry.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white text-sm font-medium focus:outline-none focus:ring-4 focus:ring-[#e8836a]/20 focus:border-[#e8836a]/50 transition-all placeholder:text-zinc-600"
                />
                <button className="px-10 py-5 bg-[#e8836a] text-white rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-zinc-950 transition-all shadow-xl shadow-[#e8836a]/10">
                  Subscribe
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

export default BlogPage;
