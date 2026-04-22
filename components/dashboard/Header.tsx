
'use client';

import { BellDot, Search, Menu } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="h-20 backdrop-blur-xl border-b flex items-center justify-between px-4 md:px-8 sticky top-0 z-40"
      style={{
        background: "var(--bg)",
        borderColor: "var(--border)"
      }}
    >
    
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 lg:hidden transition-colors"
          style={{ color: "var(--text)" }}
        >
          <Menu size={24} />
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-bold uppercase tracking-tight leading-tight"
            style={{ color: "var(--text)" }}
          >
            Dashboard
          </h1>

          <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:inline"
            style={{ color: "var(--text)", opacity: 0.6 }}
          >
            Overview & performance
          </span>
        </div>
      </div>

      <div className="hidden lg:block w-[400px]">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text)", opacity: 0.5 }}
          />

          <input
            placeholder="Search campaigns..."
            className="w-full pl-11 pr-4 py-3 text-xs uppercase tracking-widest font-bold rounded-xl outline-none transition-all"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--text)"
            }}
          />
        </div>
      </div>

  
      <div className="flex items-center gap-4">
        <button
          className="relative p-3 rounded-xl transition-colors"
          style={{
            background: "var(--card)",
            border: "1px solid var(--border)"
          }}
        >
          <BellDot size={20} style={{ color: "var(--text)", opacity: 0.6 }} />
          
          <span className="absolute top-3 right-3 h-2 w-2 bg-blue-500 rounded-full" />
        </button>

        <ThemeToggle />

        <div className="h-10 w-10 rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-widest"
          style={{
            background: "#2563eb",
            color: "#fff"
          }}
        >
          LA
        </div>
      </div>
    </header>
  );
};

export default Header;