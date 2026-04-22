
'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import { motion } from "motion/react";
import { useTheme } from "next-themes";


interface LineData {
  name: string;
  sent: number;
  replies: number;
}

interface BarData {
  name: string;
  value: number;
}


const data: LineData[] = [
  { name: "Mon", sent: 400, replies: 24 },
  { name: "Tue", sent: 300, replies: 13 },
  { name: "Wed", sent: 200, replies: 98 },
  { name: "Thu", sent: 278, replies: 39 },
  { name: "Fri", sent: 189, replies: 48 },
  { name: "Sat", sent: 239, replies: 38 },
  { name: "Sun", sent: 349, replies: 43 },
];

const barData: BarData[] = [
  { name: "Campaign A", value: 400 },
  { name: "Campaign B", value: 300 },
  { name: "Campaign C", value: 200 },
  { name: "Campaign D", value: 278 },
  { name: "Campaign E", value: 189 },
];


const InsightsPage = () => {
  const { theme } = useTheme();
  const axisColor = theme === 'dark' ? '#94a3b8' : '#64748b';
  const gridColor = theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60">
          Insights / 2026
        </span>
        <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter" style={{ color: "var(--text)" }}>
          Data <br />
          <span style={{ color: "var(--muted)" }}>Visualized.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl p-6 md:p-8 rounded-2xl border shadow-2xl transition-all duration-300"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-6 md:mb-8" style={{ color: "var(--muted)" }}>
            Outreach Velocity
          </h3>

          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: axisColor }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: axisColor }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--text)",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />
                <Area
                  type="monotone"
                  dataKey="sent"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#colorSent)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="backdrop-blur-2xl p-6 md:p-8 rounded-2xl border shadow-2xl transition-all duration-300"
          style={{ background: "var(--card)", borderColor: "var(--border)" }}
        >
          <h3 className="text-[10px] uppercase tracking-widest font-bold mb-6 md:mb-8" style={{ color: "var(--muted)" }}>
            Campaign Conversion
          </h3>

          <div className="h-[250px] md:h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: axisColor }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fontWeight: 700, fill: axisColor }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    color: "var(--text)",
                    fontSize: "10px",
                    fontWeight: "700",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                  itemStyle={{ color: "var(--text)" }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {barData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#3b82f6" : "#1d4ed8"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

  
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="backdrop-blur-2xl p-6 md:p-10 rounded-2xl border shadow-2xl transition-all duration-300"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <h3 className="text-[10px] uppercase tracking-widest font-bold mb-8 md:mb-10" style={{ color: "var(--muted)" }}>
          Weekly Reply Rate
        </h3>

        <div className="h-[300px] md:h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: axisColor }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: 700, fill: axisColor }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  color: "var(--text)",
                  fontSize: "10px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
                itemStyle={{ color: "var(--text)" }}
              />
              <Line
                type="stepAfter"
                dataKey="replies"
                stroke="#3b82f6"
                strokeWidth={4}
                dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "var(--card)" }}
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
