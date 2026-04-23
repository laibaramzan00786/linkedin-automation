
'use client';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      aria-label="Toggle Theme"
      onClick={toggleTheme}
      className="relative h-10 w-[72px] rounded-full p-1 transition-all duration-500 border border-[var(--border)] overflow-hidden group shadow-sm bg-[var(--card)]"
    >
      <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'bg-blue-600/10' : 'bg-amber-500/10'} opacity-30`} />
      
      <motion.div
        initial={false}
        animate={{ x: isDark ? 32 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="relative z-10 h-8 w-8 rounded-full flex items-center justify-center shadow-md bg-[var(--bg)] border border-[var(--border)]"
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <Moon size={14} className="text-blue-400" />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sun size={14} className="text-amber-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-between px-3 pointer-events-none">
        <Sun size={12} className={`transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-0'}`} />
        <Moon size={12} className={`transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-20'}`} />
      </div>
    </button>
  );
};

export default ThemeToggle;