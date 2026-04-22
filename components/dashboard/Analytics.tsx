
"use client";

import React from "react";
import {
  TrendingUp,
  Send,
  MessageSquare,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const analyticsStats = [
  { title: "Profile Views", value: "3,420", change: "+14%", icon: Users },
  { title: "Messages Sent", value: "8,420", change: "+18%", icon: Send },
  { title: "Replies", value: "312", change: "+9%", icon: MessageSquare },
  { title: "Reply Rate", value: "3.7%", change: "+1.2%", icon: TrendingUp },
];

const Analytics = () => {
  return (
    <div className="space-y-8 md:space-y-12">

   
      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60">
          Analytics / 2026
        </span>

        <h2
          className="text-3xl md:text-5xl font-display uppercase tracking-tighter text-white"
          style={{ color: "var(--text)" }}
        >
          Outreach <br />
          <span style={{ opacity: 0.5 }}>Performance.</span>
        </h2>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {analyticsStats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-6 md:p-8 backdrop-blur-2xl border transition-all group"
              style={{
                background: "var(--card)",
                borderColor: "var(--border)",
              }}
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <p
                  className="text-[10px] uppercase tracking-[0.2em] font-bold"
                  style={{ color: "var(--text)", opacity: 0.6 }}
                >
                  {item.title}
                </p>

                <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon size={16} />
                </div>
              </div>

              <h3
                className="text-2xl md:text-4xl font-display uppercase tracking-tighter"
                style={{ color: "var(--text)" }}
              >
                {item.value}
              </h3>

              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mt-4 inline-block">
                {item.change} this month
              </span>
            </motion.div>
          );
        })}
      </div>

  
      <div
        className="rounded-2xl p-6 md:p-10 border h-[400px] md:h-[500px] flex flex-col backdrop-blur-2xl"
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex justify-between items-center mb-8">
          <h3
            className="text-lg font-display uppercase tracking-widest"
            style={{ color: "var(--text)" }}
          >
            Engagement Trend
          </h3>
        </div>

        <div
          className="flex-1 flex items-center justify-center border-2 border-dashed rounded-2xl text-[10px] uppercase tracking-widest font-bold p-4 text-center"
          style={{
            borderColor: "var(--border)",
            color: "var(--text)",
            opacity: 0.5,
          }}
        >
          Detailed engagement charts are available in the insights tab
        </div>
      </div>
    </div>
  );
};

export default Analytics;