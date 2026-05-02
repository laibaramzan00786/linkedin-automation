
'use client';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, Cell,
} from "recharts";
import { motion } from "motion/react";
import { useTheme } from "next-themes";

const data = [
  { name: "Mon", sent: 400, replies: 24 },
  { name: "Tue", sent: 300, replies: 13 },
  { name: "Wed", sent: 200, replies: 98 },
  { name: "Thu", sent: 278, replies: 39 },
  { name: "Fri", sent: 189, replies: 48 },
  { name: "Sat", sent: 239, replies: 38 },
  { name: "Sun", sent: 349, replies: 43 },
];

const barData = [
  { name: "Campaign A", value: 400 },
  { name: "Campaign B", value: 300 },
  { name: "Campaign C", value: 200 },
  { name: "Campaign D", value: 278 },
  { name: "Campaign E", value: 189 },
];

const tooltipStyle = {
  backgroundColor: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontSize: 12,
  fontWeight: 600,
  color: "var(--text)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
};

const InsightsPage = () => {
  const { theme }  = useTheme();
  const axisColor  = theme === 'dark' ? '#94a3b8' : '#9ca3af';
  const gridColor  = theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="space-y-8" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}>


      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#e8836a" }}>
          Insights · 2026
        </p>
        <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Data Visualized</h2>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Detailed breakdowns of your outreach performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="mb-1">
            <p className="text-base font-bold" style={{ color: "var(--text)" }}>Outreach Velocity</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Messages sent per day</p>
          </div>
          <div className="h-[280px] mt-6 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#e8836a" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#e8836a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} dy={8} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} />
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "var(--text)" }} />
                <Area type="monotone" dataKey="sent" stroke="#e8836a"
                  strokeWidth={3} fill="url(#colorSent)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 border"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <div className="mb-1">
            <p className="text-base font-bold" style={{ color: "var(--text)" }}>Campaign Conversion</p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>Leads converted per campaign</p>
          </div>
          <div className="h-[280px] mt-6 -ml-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis dataKey="name" axisLine={false} tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} dy={8} />
                <YAxis axisLine={false} tickLine={false}
                  tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} />
                <Tooltip
                  cursor={{ fill: "rgba(232,131,106,0.06)" }}
                  contentStyle={tooltipStyle}
                  itemStyle={{ color: "var(--text)" }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {barData.map((_, index) => (
                    <Cell key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#e8836a" : "#c96f58"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl p-6 border"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="mb-1">
          <p className="text-base font-bold" style={{ color: "var(--text)" }}>Weekly Reply Rate</p>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>How many replies you received per day</p>
        </div>
        <div className="h-[320px] mt-6 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis dataKey="name" axisLine={false} tickLine={false}
                tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} dy={8} />
              <YAxis axisLine={false} tickLine={false}
                tick={{ fontSize: 11, fontWeight: 600, fill: axisColor }} />
              <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: "var(--text)" }} />
              <Line
                type="monotone"
                dataKey="replies"
                stroke="#e8836a"
                strokeWidth={3}
                dot={{ r: 4, fill: "#e8836a", strokeWidth: 2, stroke: "var(--card)" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
};

export default InsightsPage;