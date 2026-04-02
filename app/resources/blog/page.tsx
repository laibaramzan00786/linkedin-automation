'use client';
import { motion } from 'motion/react';
import { ArrowRight, Search } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const blogPosts = [
  {
    id: 1,
    title: "How to Scale Your LinkedIn Outreach in 2024",
    excerpt: "Discover the latest strategies for scaling your LinkedIn outreach without compromising on personalization.",
    author: "Sarah Jenkins",
    date: "March 10, 2024",
    category: "Strategy",
    image: "https://picsum.photos/seed/outreach/800/600"
  },
  {
    id: 2,
    title: "The Future of AI in Sales Automation",
    excerpt: "AI is changing the sales landscape. Learn how to leverage new tools to stay ahead of the curve.",
    author: "Michael Chen",
    date: "March 05, 2024",
    category: "Technology",
    image: "https://picsum.photos/seed/ai-sales/800/600"
  },
  {
    id: 3,
    title: "5 Common Mistakes in Cold Messaging",
    excerpt: "Avoid these common pitfalls that could be hurting your conversion rates and brand reputation.",
    author: "David Wilson",
    date: "February 28, 2024",
    category: "Tips",
    image: "https://picsum.photos/seed/mistakes/800/600"
  }
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
      
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
            >
              Our Blog
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold text-zinc-950 mb-6 tracking-tight"
            >
              Insights for Modern Teams
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-zinc-500 max-w-2xl mx-auto"
            >
              Stay updated with the latest trends in automation, sales, and productivity.
            </motion.p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pb-8 border-b border-zinc-100">
            <div className="flex items-center gap-6 overflow-x-auto pb-2 w-full md:w-auto">
              {['All Posts', 'Strategy', 'Technology', 'Tips', 'Product Updates'].map((cat) => (
                <button key={cat} className="whitespace-nowrap text-sm font-bold text-zinc-500 hover:text-blue-600 transition-colors">
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group cursor-pointer mb-24"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="overflow-hidden rounded-3xl aspect-[16/10]">
                <img 
                  src="https://picsum.photos/seed/featured/1200/800" 
                  alt="Featured" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg">Featured</span>
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">10 Min Read</span>
                </div>
                <h2 className="text-4xl font-bold text-zinc-950 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                  The Ultimate Guide to Omnichannel Sales Automation
                </h2>
                <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
                  Learn how to synchronize your LinkedIn, Email, and Twitter outreach to create a seamless experience for your prospects and close more deals.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 overflow-hidden">
                    <img src="https://i.pravatar.cc/150?u=sarah" alt="Author" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-950">Sarah Jenkins</div>
                    <div className="text-xs text-zinc-500">Head of Strategy</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {blogPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="overflow-hidden rounded-3xl aspect-[4/3] mb-6">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{post.category}</span>
                  <span className="w-1 h-1 rounded-full bg-zinc-300" />
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-950 mb-4 group-hover:text-blue-600 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-zinc-950 group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={16} className="text-blue-600" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 p-12 bg-zinc-950 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4">Get the latest insights delivered to your inbox.</h2>
              <p className="text-zinc-400 mb-8">Join 10,000+ sales professionals staying ahead of the game.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
                />
                <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
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