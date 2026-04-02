"use client"

import { BellDot, Search, Menu } from "lucide-react";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  return (
    <header className="h-20 bg-zinc-950/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 lg:hidden text-zinc-400 hover:text-white transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg md:text-xl font-display uppercase tracking-tight text-white leading-tight">
            Dashboard
          </h1>
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 hidden sm:inline">
            Overview & performance
          </span>
        </div>
      </div>

      <div className="hidden lg:block w-[400px]">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />
          <input
            placeholder="Search campaigns, analytics..."
            className="w-full pl-11 pr-4 py-3 text-xs uppercase tracking-widest font-bold rounded-xl border border-white/5 bg-white/5 
            focus:bg-white/10 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-zinc-600 text-white"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
          <BellDot size={20} className="text-zinc-400" />
          <span className="absolute top-3 right-3 h-2 w-2 bg-blue-500 rounded-full border-2 border-zinc-950" />
        </button>
        
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-widest">
          LA
        </div>
      </div>
    </header>
  );
};

export default Header;