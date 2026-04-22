
'use client';

import React from 'react';
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
      className="rounded-2xl p-8 border shadow-sm transition-all group duration-300"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)"
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: "var(--muted)" }}>
          {title}
        </p>
        {icon && (
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
            {icon}
          </div>
        )}
      </div>

      <h3 className="text-4xl font-display uppercase tracking-tighter" style={{ color: "var(--text)" }}>
        {value}
      </h3>

      {change && (
        <span className="text-[10px] uppercase tracking-widest font-black text-emerald-500 mt-4 inline-block">
          {change}
        </span>
      )}
    </motion.div>
  );
};

export default StatCard;
