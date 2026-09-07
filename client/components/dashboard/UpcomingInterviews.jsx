"use client";

import Link from "next/link";
import { Calendar, Video, ArrowRight } from "lucide-react";

export default function UpcomingInterviews({ interviews = [] }) {
  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[#1D1D1F]">
            Upcoming Interviews
          </span>
        </div>
        <Link
          href="/applications?tab=interviews"
          className="text-xs text-[#0071E3] hover:underline flex items-center gap-0.5 group font-medium"
        >
          <span>View all</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* List */}
      <div className="divide-y divide-black/[0.05]">
        {interviews.map((interview) => (
          <div
            key={interview.id}
            className="py-3 first:pt-3 last:pb-0 flex items-center justify-between gap-3 group"
          >
            <div className="min-w-0">
              <div className="text-xs font-semibold text-[#1D1D1F] flex items-center gap-1.5 truncate">
                <span className="truncate">{interview.company}</span>
                <span className="text-[#8E8E93] font-normal">·</span>
                <span className="text-[#555558] font-normal text-[11px] truncate">
                  {interview.round}
                </span>
              </div>

              <div className="text-[11px] text-[#8E8E93] flex items-center gap-1.5 mt-0.5 font-medium">
                <Calendar className="w-3 h-3 text-[#8E8E93]" />
                <span>
                  {interview.date} · {interview.time}
                </span>
              </div>
            </div>

            {/* Join button */}
            {interview.meetingUrl ? (
              <a
                href={interview.meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 px-2.5 py-1 rounded-md bg-[#0071E3]/10 hover:bg-[#0071E3]/15 text-[#0071E3] text-[11px] font-semibold flex items-center gap-1 transition-colors border border-[#0071E3]/15"
              >
                <Video className="w-3 h-3" />
                <span>Join</span>
              </a>
            ) : (
              <span className="text-[10px] text-[#8E8E93] bg-[#F5F5F7] px-2 py-0.5 rounded border border-black/[0.04]">
                In-person
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
