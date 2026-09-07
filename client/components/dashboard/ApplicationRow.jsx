"use client";

import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, ExternalLink, Trash2, CheckCircle, Clock } from "lucide-react";

export default function ApplicationRow({
  app,
  onStatusChange,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Subtle macOS status styles
  const statusStyles = {
    Applied: "bg-[#F5F5F7] text-[#555558] border-black/[0.08]",
    Screening: "bg-[#F6EEFD] text-[#6E39CB] border-[#E7D6F9]",
    Interview: "bg-[#EDF5FD] text-[#0A60C2] border-[#CFE3F9]",
    Offer: "bg-[#ECF7ED] text-[#1E722D] border-[#C8E8CC]",
    Rejected: "bg-[#FDF0EF] text-[#B3261E] border-[#F8D2D0]",
    Withdrawn: "bg-[#F4F4F5] text-[#71717A] border-[#E4E4E7]",
  };

  const currentStatusStyle = statusStyles[app.status] || statusStyles.Applied;

  return (
    <div className="group relative flex items-center justify-between p-3 rounded-xl border border-black/[0.05] bg-white hover:bg-[#F9F9FB] hover:border-black/[0.1] transition-all">
      {/* Left: Initial Avatar + Company/Role info */}
      <div className="flex items-center gap-3 min-w-0 pr-2">
        {/* Company Avatar with clean initials */}
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/5 ${
            app.avatarBg || "bg-[#1D1D1F] text-white"
          }`}
        >
          {app.initial || app.company?.[0]?.toUpperCase() || "C"}
        </div>

        {/* Company name, role & location */}
        <div className="min-w-0">
          <div className="text-xs font-semibold text-[#1D1D1F] flex items-center gap-1.5 truncate">
            <span className="truncate">{app.company}</span>
            <span className="text-[#8E8E93] font-normal shrink-0">·</span>
            <span className="text-[#555558] font-normal truncate">{app.role}</span>
          </div>

          <div className="text-[11px] text-[#8E8E93] flex items-center gap-1.5 mt-0.5 truncate">
            <span className="truncate">{app.location || "Remote"}</span>
            {app.salary && (
              <>
                <span className="text-black/20">·</span>
                <span className="font-medium text-[#1D1D1F]/80 shrink-0">
                  {app.salary}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right: Status Pill + Relative Time + 3-Dot Dropdown */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        {/* Status Pill */}
        <span
          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${currentStatusStyle}`}
        >
          {app.status}
        </span>

        {/* Updated relative time */}
        <span className="text-[11px] text-[#8E8E93] hidden md:inline-block font-mono">
          {app.updatedAt || "Just now"}
        </span>

        {/* Three dot actions dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Actions"
            className="p-1 rounded-md text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* macOS contextual menu */}
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 bg-white/95 backdrop-blur-md rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.08] p-1 z-30 text-xs text-[#1D1D1F] animate-in fade-in zoom-in-95 duration-100">
              <div className="px-2 py-1 text-[10px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                Change Status
              </div>
              {["Screening", "Interview", "Offer", "Rejected"].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => {
                    if (onStatusChange) onStatusChange(app.id, st);
                    setMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-[#F5F5F7] text-left transition-colors ${
                    app.status === st ? "font-semibold text-[#0071E3]" : ""
                  }`}
                >
                  <span>{st}</span>
                  {app.status === st && <CheckCircle className="w-3 h-3 text-[#0071E3]" />}
                </button>
              ))}

              <div className="my-1 border-t border-black/[0.06]" />

              {app.jobUrl && (
                <a
                  href={app.jobUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#F5F5F7] text-[#1D1D1F] transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93]" />
                  <span>Open Job Link</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  if (onDelete) onDelete(app.id);
                  setMenuOpen(false);
                }}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#FDF0EF] text-[#B3261E] transition-colors text-left"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Track</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
