'use client';

import { useState, useEffect } from "react";
import { BellDot, Search, Menu } from "lucide-react";

const Header = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const [userName, setUserName]   = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [initials, setInitials]   = useState("U");

  useEffect(() => {
    const raw = localStorage.getItem("current_user");
    if (raw) {
      try {
        const user = JSON.parse(raw);
        const first = user.firstName || "";
        const last  = user.lastName  || "";
        setUserName(`${first} ${last}`.trim());
        setUserEmail(user.email || "");
  
        const ini = `${first[0] || ""}${last[0] || ""}`.toUpperCase() || "U";
        setInitials(ini);
      } catch {
        setInitials("U");
      }
    } else {

      const name  = localStorage.getItem("user_name")  || "";
      const email = localStorage.getItem("user_email") || "";
      if (name) {
        setUserName(name);
        setUserEmail(email);
        const parts = name.trim().split(" ");
        const ini = `${parts[0]?.[0] || ""}${parts[1]?.[0] || ""}`.toUpperCase() || "U";
        setInitials(ini);
      }
    }
  }, []);

  return (
    <header
      className="h-16 border-b flex items-center justify-between px-4 md:px-6 sticky top-0 z-40"
      style={{
        background:   "#f0f0f0",
        borderColor:  "#e0e0e0",
        fontFamily:   "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 lg:hidden rounded-lg hover:bg-black/5 transition-colors"
          style={{ color: "#555" }}
        >
          <Menu size={20} />
        </button>

        <div>
          <h1
            className="text-base font-bold tracking-tight leading-tight"
            style={{ color: "#111", fontFamily: "'Outfit', 'DM Sans', sans-serif" }}
          >
            Dashboard
          </h1>
          <span
            className="text-[10px] uppercase tracking-widest font-semibold hidden sm:block"
            style={{ color: "#999" }}
          >
            Overview & Performance
          </span>
        </div>
      </div>

      <div className="hidden lg:block w-[360px]">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2"
            style={{ color: "#aaa" }}
          />
          <input
            placeholder="Search campaigns..."
            className="w-full pl-10 pr-4 py-2.5 text-xs font-medium rounded-xl outline-none transition-all placeholder:text-zinc-400"
            style={{
              background:  "#fff",
              border:      "1px solid #e0e0e0",
              color:       "#333",
              fontFamily:  "'DM Sans', sans-serif",
            }}
            onFocus={e  => { e.target.style.borderColor = "#e8836a"; }}
            onBlur={e   => { e.target.style.borderColor = "#e0e0e0"; }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2.5 rounded-xl transition-colors hover:bg-black/5"
          style={{ color: "#888" }}
        >
          <BellDot size={18} />
          <span
            className="absolute top-2 right-2 h-2 w-2 rounded-full"
            style={{ background: "#e8836a" }}
          />
        </button>

        <div className="flex items-center gap-2.5 cursor-pointer group">
          <div
            className="h-9 w-9 rounded-full flex items-center justify-center text-[11px] font-bold text-white select-none"
            style={{ background: "#e8836a" }}
            title={userName || "User"}
          >
            {initials}
          </div>
          {userName && (
            <div className="hidden xl:flex flex-col leading-tight">
              <span className="text-[14px] font-semibold" style={{ color: "#222" }}>
                {userName}
              </span>
              {userEmail && (
                <span className="text-[13px]" style={{ color: "#999" }}>
                  {userEmail.length > 24 ? userEmail.slice(0, 24) + "…" : userEmail}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;