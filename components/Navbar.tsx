
'use client';
import { useState, useEffect } from 'react';
import { Command, Menu, X, ChevronDown, BookOpen, HelpCircle, FileText, Code, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

const Navbar = () => {
  const [isScrolled,       setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen,  setIsResourcesOpen]  = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resourceItems = [
    { title: 'Blog',        desc: 'Latest news and insights',  icon: <FileText size={16} />,   to: '/resources/blog' },
    { title: 'Help Center', desc: 'Guides and support',        icon: <HelpCircle size={16} />, to: 'resources/help-center' },
    { title: 'Case Studies',desc: 'Success stories',           icon: <BookOpen size={16} />,   to: '/resources/case-studies' },
    
    { title: 'Community',   desc: 'Join the conversation',     icon: <Users size={16} />,      to: '/resources/community' },
  ];

  const navLinks = [
    { label: 'Product',   href: '/product'   },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Pricing',   href: '/pricing'   },
  ];

  return (
    <nav
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl transition-all duration-400`}
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div
        className="flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-400"
        style={{
          background:   isScrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.65)',
          borderColor:  isScrolled ? '#e5e5e5' : 'rgba(255,255,255,0.4)',
          backdropFilter: 'blur(16px)',
          boxShadow:    isScrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <Link href="/" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105"
            style={{ background: '#e8836a', boxShadow: '0 4px 12px rgba(232,131,106,0.3)' }}
          >
            <Command className="text-white w-4 h-4" />
          </div>
          <span
            className="text-base font-bold tracking-tight hidden sm:block"
            style={{ color: '#111', fontFamily: "'Outfit', sans-serif" }}
          >
            NexusFlow
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
              style={{ color: '#666' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8836a'; (e.currentTarget as HTMLElement).style.background = 'rgba(232,131,106,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#666'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              {l.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all"
              style={{ color: '#666' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#e8836a'; (e.currentTarget as HTMLElement).style.background = 'rgba(232,131,106,0.06)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#666'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              Resources
              <ChevronDown size={13} className={`transition-transform duration-200 ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isResourcesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl border p-2 shadow-xl"
                  style={{ background: '#fff', borderColor: '#e5e5e5' }}
                >
                  {resourceItems.map(item => (
                    <Link
                      key={item.title}
                      href={item.to}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fdf8f7'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                        style={{ background: '#f5f5f5', color: '#888' }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold" style={{ color: '#222' }}>{item.title}</p>
                        <p className="text-[11px]" style={{ color: '#aaa' }}>{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="hidden sm:block text-[12px] font-semibold px-4 py-2 rounded-xl transition-all"
            style={{ color: '#666' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#111'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.04)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#666'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="text-[12px] font-semibold px-5 py-2.5 rounded-xl text-white transition-all active:scale-95"
            style={{ background: '#111', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e8836a'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#111'}
          >
            Start Free
          </Link>
          <button
            className="md:hidden p-2 rounded-xl transition-all"
            style={{ color: '#555' }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="mt-2 rounded-2xl border p-4 md:hidden shadow-xl"
            style={{ background: '#fff', borderColor: '#e5e5e5' }}
          >
            <div className="flex flex-col gap-1">
              {[...navLinks, { label: 'Resources', href: '#' }].map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{ color: '#333' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fdf8f7'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                >
                  {l.label}
                </Link>
              ))}
              <div className="h-px my-1" style={{ background: '#f0f0f0' }} />
              <Link
                href="/signup"
                className="px-4 py-3 rounded-xl text-sm font-semibold text-white text-center"
                style={{ background: '#e8836a' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;