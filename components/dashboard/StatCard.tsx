"use client"

import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  change?: string;
}

const StatCard = ({ title, value, icon, change }: StatCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 transition-all group"
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-400">
          {title}
        </p>
        {icon && (
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-50 group-hover:bg-zinc-900 group-hover:text-white transition-all">
            {icon}
          </div>
        )}
      </div>

      <h3 className="text-4xl font-display uppercase tracking-tighter text-zinc-900">
        {value}
      </h3>

      {change && (
        <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-600 mt-4 inline-block">
          {change}
        </span>
      )}
    </motion.div>
  );
};

export default StatCard;