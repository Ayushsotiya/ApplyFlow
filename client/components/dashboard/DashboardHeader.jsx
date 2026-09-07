"use client";

import { Plus } from "lucide-react";

export default function DashboardHeader({
  activeFilter = "All",
  onFilterChange,
  onOpenAddModal,
  lastUpdated = "12 minutes ago",
}) {
  const filters = ["All", "Active", "Archived"];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/[0.08]">
      {/* Title & Metadata */}
      <div>
        <div className="flex items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
            Applications Overview
          </h1>
          <span className="text-[11px] font-medium text-[#555558] bg-[#F5F5F7] px-2.5 py-0.5 rounded-full border border-black/[0.06]">
            Active Season
          </span>
        </div>
        <p className="text-xs text-[#8E8E93] mt-1">
          Updated {lastUpdated}
        </p>
      </div>

      {/* Action Area: Filter segmented pill + Add Button */}
      <div className="flex items-center gap-2.5">
        {/* Filter Segmented Control */}
        <div className="flex items-center bg-[#EBEBED] p-0.5 rounded-lg border border-black/[0.04] text-xs font-medium text-[#555558]">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => onFilterChange && onFilterChange(filter)}
                className={`px-3 py-1 rounded-[6px] text-xs transition-all ${
                  isActive
                    ? "bg-white text-[#1D1D1F] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                    : "hover:text-[#1D1D1F]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* macOS Native Black Primary Add Button */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1D1D1F] hover:bg-[#2D2D30] active:bg-[#0A0A0A] text-white text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/10 transition-all cursor-pointer active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
