"use client"

import {
  Users,
  Zap,
  Send,
  MessageSquare,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  {
    title: "Total Connections",
    value: "1,240",
    change: "+12% this week",
    icon: Users,
  },
  {
    title: "Active Campaigns",
    value: "6",
    change: "+2 new",
    icon: Zap,
  },
  {
    title: "Messages Sent",
    value: "8,420",
    change: "+18% this week",
    icon: Send,
  },
  {
    title: "Replies",
    value: "312",
    change: "+8% this week",
    icon: MessageSquare,
  },
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

const Dashboard = () => {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60">Overview / 2026</span>
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter text-white">
            Performance <br />
            <span className="text-zinc-600">Summary.</span>
          </h2>
        </div>
        <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(37,99,235,0.2)]">
          Export Report
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(37,99,235,0.1)] transition-all group"
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
                  {item.title}
                </p>
                <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon size={16} />
                </div>
              </div>

              <h3 className="text-2xl md:text-4xl font-display uppercase tracking-tighter text-white">
                {item.value}
              </h3>

              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 mt-4 inline-block">
                {item.change}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
        <div className="xl:col-span-2 bg-zinc-900/50 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/5 h-[350px] md:h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h3 className="text-sm md:text-lg font-display uppercase tracking-widest text-white">
              Messages Growth
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Sent</span>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSentOverview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#52525b" }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: "#52525b" }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#09090b", 
                    border: "1px solid rgba(255,255,255,0.1)", 
                    borderRadius: "12px", 
                    color: "#fff",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="sent" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSentOverview)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/5 h-auto xl:h-[400px] flex flex-col">
          <h3 className="text-sm md:text-lg font-display uppercase tracking-widest text-white mb-6 md:mb-8">
            Campaign Health
          </h3>
          <div className="space-y-6">
            {[
              { label: "Running", value: 3, color: "bg-blue-500" },
              { label: "Paused", value: 2, color: "bg-amber-500" },
              { label: "Completed", value: 1, color: "bg-zinc-500" },
            ].map((cam) => (
              <div key={cam.label} className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
                  <span className="text-zinc-500 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${cam.color}`} />
                    {cam.label}
                  </span>
                  <span className="text-white">
                    {cam.value}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${cam.color} shadow-[0_0_10px_rgba(37,99,235,0.2)]`} 
                    style={{ width: `${(cam.value / 6) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;