
'use client';
import React from "react";
import { TrendingUp, Send, MessageSquare, Users } from "lucide-react";
import { motion } from "motion/react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes";

const analyticsStats = [
  { title: "Profile Views",  value: "3,420", change: "+14%", icon: Users },
  { title: "Messages Sent",  value: "8,420", change: "+18%", icon: Send },
  { title: "Replies",        value: "312",   change: "+9%",  icon: MessageSquare },
  { title: "Reply Rate",     value: "3.7%",  change: "+1.2%",icon: TrendingUp },
];

// Sample data for the engagement chart
const engagementData = [
  { name: "Week 1", views: 1200, messages: 400, replies: 28 },
  { name: "Week 2", views: 1800, messages: 620, replies: 44 },
  { name: "Week 3", views: 1400, messages: 510, replies: 36 },
  { name: "Week 4", views: 2200, messages: 780, replies: 62 },
];

const Analytics = () => {
  const { theme } = useTheme();
  const axisColor = theme === 'dark' ? '#94a3b8' : '#9ca3af';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="space-y-8" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>

      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#e8836a" }}>
          Analytics · 2026
        </p>
        <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Outreach Performance</h2>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          A summary of your LinkedIn outreach metrics this month.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsStats.map((item, i) => {
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
                  className="h-9 w-9 flex items-center justify-center rounded-xl transition-all duration-300 cursor-default"
                  style={{ background: "rgba(232,131,106,0.1)", color: "#e8836a" }}
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
                ↑ {item.change} this month
              </p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl p-6 border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-base font-bold" style={{ color: "var(--text)" }}>Engagement Trend</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              Weekly view of profile visits, messages, and replies
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { label: "Profile Views", color: "#e8836a" },
              { label: "Messages",      color: "#6366f1" },
              { label: "Replies",       color: "#10b981" },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[320px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#e8836a" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#e8836a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReplies" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#10b981" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="name" axisLine={false} tickLine={false}
                tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} dy={8} />
              <YAxis axisLine={false} tickLine={false}
                tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} />
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

              <Area type="monotone" dataKey="views" stroke="#e8836a" strokeWidth={2.5}
                fillOpacity={1} fill="url(#colorViews)" animationDuration={1200} />
              <Area type="monotone" dataKey="messages" stroke="#6366f1" strokeWidth={2.5}
                fillOpacity={1} fill="url(#colorMessages)" animationDuration={1400} />
              <Area type="monotone" dataKey="replies" stroke="#10b981" strokeWidth={2.5}
                fillOpacity={1} fill="url(#colorReplies)" animationDuration={1600} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Best Day",         value: "Friday",  sub: "Most messages sent" },
          { label: "Avg. Reply Time",  value: "4.2h",    sub: "Average response time" },
          { label: "Top Campaign",     value: "Recruiter Outreach", sub: "Highest conversion" },
          { label: "Open Rate",        value: "68%",     sub: "LinkedIn messages opened" },
        ].map((item, i) => (
          <div key={i}
            className="rounded-2xl p-5 border"
            style={{ background: "var(--card)", borderColor: "var(--border)" }}
          >
            <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>{item.label}</p>
            <p className="text-lg font-bold truncate" style={{ color: "var(--text)" }}>{item.value}</p>
            <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{item.sub}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Analytics;