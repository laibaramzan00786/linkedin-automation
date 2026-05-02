
'use client';
import { motion } from 'motion/react';
import { Users, Zap, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { useTheme } from 'next-themes';

const stats = [
  { title: "Total Connections", value: "1,240", change: "+12% this week", icon: Users },
  { title: "Active Campaigns", value: "6",     change: "+2 new",          icon: Zap },
  { title: "Messages Sent",    value: "8,420", change: "+18% this week",  icon: Send },
  { title: "Replies",          value: "312",   change: "+8% this week",   icon: MessageSquare },
];

const chartData = [
  { name: "Mon", sent: 400 },
  { name: "Tue", sent: 300 },
  { name: "Wed", sent: 500 },
  { name: "Thu", sent: 280 },
  { name: "Fri", sent: 590 },
  { name: "Sat", sent: 320 },
  { name: "Sun", sent: 480 },
];

const DashboardOverview = () => {
  const { theme } = useTheme();
  const axisColor  = theme === 'dark' ? '#94a3b8' : '#9ca3af';
  const gridColor  = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="space-y-8" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#e8836a" }}>
            Overview · 2026
          </p>
          <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
            Performance Summary
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Track your outreach activity and results at a glance.
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all group active:scale-95"
          style={{ background: "#e8836a", boxShadow: "0 4px 14px rgba(232,131,106,0.35)" }}
        >
          Export Report
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl p-6 border group hover:shadow-md transition-all duration-300"
              style={{ background: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold" style={{ color: "var(--muted)" }}>
                  {item.title}
                </p>
                <div
                  className="h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-300"
                  style={{
                    background: "rgba(232,131,106,0.1)",
                    color: "#e8836a",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "#e8836a";
                    (e.currentTarget as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(232,131,106,0.1)";
                    (e.currentTarget as HTMLElement).style.color = "#e8836a";
                  }}
                >
                  <Icon size={16} />
                </div>
              </div>

              <p className="text-3xl font-bold tracking-tight" style={{ color: "var(--text)" }}>
                {item.value}
              </p>

              <p className="text-xs font-semibold mt-3" style={{ color: "#10b981" }}>
                ↑ {item.change}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div
          className="xl:col-span-2 rounded-2xl p-6 border flex flex-col"
          style={{ background: "var(--card)", borderColor: "var(--border)", height: 420 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-base font-bold" style={{ color: "var(--text)" }}>Messages Growth</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Daily outreach volume this week</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#e8836a" }} />
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>Total Sent</span>
            </div>
          </div>

          <div className="flex-1 w-full -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSentOverview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#e8836a" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#e8836a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: axisColor, fontSize: 11, fontWeight: 600 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: axisColor, fontSize: 11, fontWeight: 600 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--text)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />
                <Area
                  type="monotone"
                  dataKey="sent"
                  stroke="#e8836a"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorSentOverview)"
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="rounded-2xl p-6 border flex flex-col"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="mb-6">
            <p className="text-base font-bold" style={{ color: "var(--text)" }}>Campaign Health</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Current campaign statuses</p>
          </div>

          <div className="space-y-6 flex-1">
            {[
              { label: "Running",   value: 3, total: 6, color: "#e8836a" },
              { label: "Paused",    value: 2, total: 6, color: "#f59e0b" },
              { label: "Completed", value: 1, total: 6, color: "#10b981" },
            ].map((cam) => (
              <div key={cam.label}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: cam.color }} />
                    <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>{cam.label}</span>
                  </div>
                  <span className="text-xs font-bold" style={{ color: "var(--text)" }}>{cam.value}</span>
                </div>
                <div
                  className="h-2 w-full rounded-full overflow-hidden"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cam.value / cam.total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: cam.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-5 border-t text-center" style={{ borderColor: "var(--border)" }}>
            <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>
              6 total campaigns tracked
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;