
'use client';
import { motion } from 'motion/react';
import { Users, Zap, Send, MessageSquare, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

const stats = [
  { title: "Total Connections", value: "1,240", change: "+12% this week", icon: Users },
  { title: "Active Campaigns", value: "6", change: "+2 new", icon: Zap },
  { title: "Messages Sent", value: "8,420", change: "+18% this week", icon: Send },
  { title: "Replies", value: "312", change: "+8% this week", icon: MessageSquare },
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
  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="space-y-8 md:space-y-12">

     
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60 font-mono">
            Overview / 2026
          </span>

          <h2
            className="text-4xl md:text-6xl font-display uppercase tracking-tighter leading-tight"
            style={{ color: "var(--text)" }}
          >
            Performance <br />
            <span style={{ color: "var(--text)" }}>Summary.</span>
          </h2>
        </div>

        <button className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white text-[10px] uppercase tracking-widest font-black rounded-full hover:bg-blue-500 transition-all flex items-center justify-center gap-3 group shadow-[0_0_30px_rgba(37,99,235,0.2)] active:scale-95">
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
              className="rounded-2xl p-6 md:p-8 backdrop-blur-2xl border transition-all duration-300 group hover:shadow-xl"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <p
                  className="text-[10px] uppercase tracking-[0.2em] font-black"
                  style={{ color: "var(--muted)" }}
                >
                  {item.title}
                </p>

                <div className="h-10 w-10 flex items-center justify-center rounded-xl 
                bg-blue-500/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <Icon size={18} />
                </div>
              </div>

              <h3
                className="text-3xl md:text-5xl font-display uppercase tracking-tighter"
                style={{ color: "var(--text)" }}
              >
                {item.value}
              </h3>

              <div className="flex items-center gap-2 mt-4">
                <span className="text-[10px] uppercase tracking-widest font-black text-emerald-500">
                  {item.change}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/20 to-transparent" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">

     
        <div
          className="xl:col-span-2 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border h-[400px] md:h-[450px] flex flex-col transition-all duration-300"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <div className="flex flex-col gap-1">
              <h3
                className="text-sm md:text-lg font-display uppercase tracking-widest"
                style={{ color: "var(--text)" }}
              >
                Messages Growth
              </h3>
              <div className="w-12 h-1 bg-blue-600 rounded-full" />
            </div>
            
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: "var(--muted)" }}>Total Sent</span>
               </div>
            </div>
          </div>

          <div className="flex-1 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSentOverview" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />

                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: axisColor, fontSize: 10, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: axisColor, fontSize: 10, fontWeight: 700 }}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "16px",
                    fontSize: "10px",
                    color: "var(--text)",
                    fontWeight: "700",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    borderWidth: "1px"
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />

                <Area
                  type="monotone"
                  dataKey="sent"
                  stroke="#2563eb"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorSentOverview)"
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="backdrop-blur-2xl rounded-2xl p-6 md:p-8 border h-auto flex flex-col transition-all duration-300"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex flex-col gap-1 mb-8 md:mb-12">
            <h3
              className="text-sm md:text-lg font-display uppercase tracking-widest"
              style={{ color: "var(--text)" }}
            >
              Campaign Health
            </h3>
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
          </div>

          <div className="space-y-8">
            {[
              { label: "Running", value: 3, color: "bg-blue-600" },
              { label: "Paused", value: 2, color: "bg-amber-500" },
              { label: "Completed", value: 1, color: "bg-emerald-500" },
            ].map((cam) => (
              <div key={cam.label} className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-black">
                  <span style={{ color: "var(--muted)" }} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${cam.color} shadow-lg`} />
                    {cam.label}
                  </span>

                  <span style={{ color: "var(--text)" }}>
                    {cam.value}
                  </span>
                </div>

                <div
                  className="h-2 w-full rounded-full overflow-hidden shadow-inner"
                  style={{ background: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(cam.value / 6) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${cam.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 border-t" style={{ borderColor: "var(--border)" }}>
             <p className="text-[10px] uppercase tracking-widest font-bold text-center" style={{ color: "var(--muted)" }}>
               Keep up the great work!
             </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
