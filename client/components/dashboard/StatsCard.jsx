"use client";

import { Briefcase, Calendar, CheckCircle2, TrendingUp } from "lucide-react";

const iconMap = {
  Briefcase: Briefcase,
  Calendar: Calendar,
  CheckCircle2: CheckCircle2,
  TrendingUp: TrendingUp,
};

export default function StatsCard({ label, value, subtext, icon, highlight = false }) {
  const IconComponent = iconMap[icon] || Briefcase;

  return (
    <div
      className={`bg-white border rounded-xl p-3.5 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] ${
        highlight
          ? "border-[#0071E3]/25 bg-gradient-to-b from-white to-[#F7FAFF]"
          : "border-black/[0.07] hover:border-black/[0.12]"
      }`}
    >
      <div className="flex items-center justify-between text-[#8E8E93] mb-2">
        <span className="text-[11px] font-medium tracking-tight text-[#555558]">
          {label}
        </span>
        <div
          className={`p-1 rounded-md ${
            highlight ? "bg-[#0071E3]/10 text-[#0071E3]" : "bg-black/[0.03] text-[#8E8E93]"
          }`}
        >
          <IconComponent className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="text-2xl font-bold tracking-tight text-[#1D1D1F] leading-tight">
        {value}
      </div>

      <div className="text-[11px] text-[#8E8E93] mt-1 font-normal">
        {subtext}
      </div>
    </div>
  );
}
