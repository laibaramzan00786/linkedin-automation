"use client"
import React from 'react';
import {
  TrendingUp,
  Send,
  MessageSquare,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const analyticsStats = [
  {
    title: "Profile Views",
    value: "3,420",
    change: "+14%",
    icon: Users,
  },
  {
    title: "Messages Sent",
    value: "8,420",
    change: "+18%",
    icon: Send,
  },
  {
    title: "Replies",
    value: "312",
    change: "+9%",
    icon: MessageSquare,
  },
  {
    title: "Reply Rate",
    value: "3.7%",
    change: "+1.2%",
    icon: TrendingUp,
  },
];

const Analytics = () => {
  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-blue-500/60">Analytics / 2026</span>
        <h2 className="text-3xl md:text-5xl font-display uppercase tracking-tighter text-white">
          Outreach <br />
          <span className="text-zinc-600">Performance.</span>
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
              className="bg-zinc-900/50 backdrop-blur-2xl rounded-2xl p-6 md:p-8 border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_50px_rgba(37,99,235,0.1)] transition-all group"
            >
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
                  {item.title}
                </p>
                <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Icon size={16} />
                </div>
              </div>

              <h3 className="text-2xl md:text-4xl font-display uppercase tracking-tighter text-white">
                {item.value}
              </h3>

              <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-400 mt-4 inline-block">
                {item.change} this month
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-zinc-900/50 backdrop-blur-2xl rounded-2xl p-6 md:p-10 border border-white/5 h-[400px] md:h-[500px] flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 md:mb-10">
          <h3 className="text-lg md:text-xl font-display uppercase tracking-widest text-white">
            Engagement Trend
          </h3>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Replies</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-700" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">Sent</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl text-zinc-700 text-[10px] uppercase tracking-widest font-bold p-4 text-center">
          Detailed engagement charts are available in the insights tab
        </div>
      </div>
    </div>
  );
};

export default Analytics;