"use client";

import { useSelector } from "react-redux";

export default function Pipeline() {
  const { dashboard } = useSelector((state) => state.jobs);

  const total = Number(dashboard?.totalApplications) || 0;

  const getCount = (status) => {
    return (
      Number(
        dashboard?.pipeline?.find(
          (item) => item.status?.toLowerCase() === status.toLowerCase()
        )?.count
      ) || 0
    );
  };

  const stages = [
    {
      id: "applied",
      count: getCount("Applied"),
    },
    {
      id: "screening",
      count: getCount("Screening"),
    },
    {
      id: "interview",
      count: getCount("Interview"),
    },
    {
      id: "offer",
      count: getCount("Offer"),
    },
    {
      id: "rejected",
      count: getCount("Rejected"),
    },
  ];

  const stageVisuals = {
    applied: {
      color: "bg-[#8E8E93]",
      dotColor: "#8E8E93",
      label: "Applied",
    },
    screening: {
      color: "bg-[#8B5CF6]",
      dotColor: "#8B5CF6",
      label: "Screening",
    },
    interview: {
      color: "bg-[#0071E3]",
      dotColor: "#0071E3",
      label: "Interview",
    },
    offer: {
      color: "bg-[#34C759]",
      dotColor: "#34C759",
      label: "Offer",
    },
    rejected: {
      color: "bg-[#FF3B30]",
      dotColor: "#FF3B30",
      label: "Rejected",
    },
  };

  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between text-xs font-medium text-[#555558] mb-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#1D1D1F]">
            Hiring Pipeline Stage
          </span>
        </div>

        <span className="text-[11px] text-[#8E8E93] font-mono">
          {total} total applications
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-black/[0.05] rounded-full overflow-hidden flex gap-[2px] p-[1px]">
        {stages.map((stage) => {
          const config = stageVisuals[stage.id];

          const percentage =
            total > 0 ? ((stage.count / total) * 100).toFixed(1) : 0;

          return (
            <div
              key={stage.id}
              className={`${config.color} h-full rounded-full transition-all duration-300`}
              style={{
                width: `${stage.count > 0 ? Math.max(percentage, 2) : 0}%`,
              }}
              title={`${config.label}: ${stage.count} (${percentage}%)`}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-xs text-[#555558] mt-3 pt-2.5 border-t border-black/[0.04]">
        {stages.map((stage) => {
          const config = stageVisuals[stage.id];

          return (
            <div
              key={stage.id}
              className="flex items-center gap-1.5"
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  backgroundColor: config.dotColor,
                }}
              />

              <span className="text-[11px] text-[#555558]">
                {config.label}{" "}
                <span className="font-semibold text-[#1D1D1F]">
                  ({stage.count})
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}