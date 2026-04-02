'use client';
import { useState, useEffect } from 'react';
import { Command, Menu, X, ChevronDown, BookOpen, HelpCircle, FileText, Code, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resourceItems = [
    { title: 'Blog', desc: 'Latest news and insights', icon: <FileText size={18} />, to: '/resources/blog' },
    { title: 'Help Center', desc: 'Guides and support', icon: <HelpCircle size={18} />, to: '/resources/help-center' },
    { title: 'Case Studies', desc: 'Success stories', icon: <BookOpen size={18} />, to: '/resources/case-studies' },
    { title: 'API Docs', desc: 'Build with NexusFlow', icon: <Code size={18} />, to: '/resources/api-docs' },
    { title: 'Community', desc: 'Join the conversation', icon: <Users size={18} />, to: '/resources/community' },
  ];

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-5xl ${isScrolled ? 'top-4' : 'top-8'}`}>
      <div className={`flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-500 ${isScrolled ? 'bg-white/80 border-zinc-200 backdrop-blur-xl shadow-xl' : 'bg-white/40 border-white/20 backdrop-blur-md'}`}>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.3)]">
            <Command className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight hidden sm:block text-zinc-950">NexusFlow</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/product" className="text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-blue-600 transition-colors">
            Product
          </Link>
          <Link href="/solutions" className="text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-blue-600 transition-colors">
            Solutions
          </Link>
          
          <div 
            className="relative"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-blue-600 transition-colors cursor-pointer">
              Resources
              <ChevronDown size={14} className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isResourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-72 bg-white border border-zinc-200 rounded-3xl p-4 shadow-2xl backdrop-blur-xl"
                >
                  <div className="grid gap-2">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.to}
                        className="flex items-start gap-4 p-3 rounded-2xl hover:bg-zinc-50 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-zinc-950">{item.title}</div>
                          <div className="text-[10px] text-zinc-500 font-medium">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/pricing" className="text-xs font-semibold uppercase tracking-widest text-zinc-500 hover:text-blue-600 transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-950 transition-colors px-4">Login</Link>
          <Link href="/signup" className="bg-zinc-950 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg">
            Start 7 Days Free Trial
          </Link>
          <button className="md:hidden text-zinc-500" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-4 bg-white border border-zinc-200 rounded-3xl p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-6">
              <Link href="/product" className="text-xl font-bold text-zinc-950" onClick={() => setIsMobileMenuOpen(false)}>Product</Link>
              <Link href="/solutions" className="text-xl font-bold text-zinc-950" onClick={() => setIsMobileMenuOpen(false)}>Solutions</Link>
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-zinc-400">Resources</div>
                <div className="grid grid-cols-1 gap-4">
                  {resourceItems.map((item) => (
                    <Link key={item.title} href={item.to} className="flex items-center gap-3 text-lg font-bold text-zinc-950">
                      <span className="text-blue-600">{item.icon}</span>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link href="/pricing" className="text-xl font-bold text-zinc-950" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
              <Link href="/signup" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-center shadow-lg shadow-blue-500/20">Get Started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;