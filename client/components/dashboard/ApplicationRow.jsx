
"use client";

import { useState, useRef, useEffect } from "react";
import {
  MoreHorizontal,
  ExternalLink,
  Trash2,
  CheckCircle,
  MapPin,
  Briefcase,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ApplicationRow({
  app,
  onStatusChange,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const menuRef = useRef(null);

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

  // Support both backend field names and older frontend field names
  const company = app.company_name || app.company || "Unknown Company";
  const role = app.job_title || app.role || "Unknown Role";
  const location = app.location || "Location not specified";
  const salary = app.salary;
  const jobType = app.job_type || "Onsite";
  const jobUrl = app.job_url || app.jobUrl;
  const status = app.status || "Applied";

  const initial =
    app.initial ||
    company.trim().charAt(0).toUpperCase() ||
    "C";

  const statusStyles = {
    Applied:
      "bg-[#F5F5F7] text-[#555558] border-black/[0.08]",

    Screening:
      "bg-[#F6EEFD] text-[#6E39CB] border-[#E7D6F9]",

    Interview:
      "bg-[#EDF5FD] text-[#0A60C2] border-[#CFE3F9]",

    Offer:
      "bg-[#ECF7ED] text-[#1E722D] border-[#C8E8CC]",

    Rejected:
      "bg-[#FDF0EF] text-[#B3261E] border-[#F8D2D0]",

    Withdrawn:
      "bg-[#F4F4F5] text-[#71717A] border-[#E4E4E7]",
  };

  const jobTypeStyles = {
    Remote:
      "bg-[#EEF7FF] text-[#0071E3] border-[#D5E9FA]",

    Hybrid:
      "bg-[#F5F1FF] text-[#6E39CB] border-[#E6DDF8]",

    Onsite:
      "bg-[#F5F5F7] text-[#555558] border-black/[0.08]",
  };

  const currentStatusStyle =
    statusStyles[status] || statusStyles.Applied;

  const currentJobTypeStyle =
    jobTypeStyles[jobType] || jobTypeStyles.Onsite;

  const statusOptions = [
    "Applied",
    "Screening",
    "Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
  ];

  return (
    <div className="group relative rounded-xl border border-black/[0.05] bg-white hover:bg-[#F9F9FB] hover:border-black/[0.1] transition-all">

      {/* MAIN ROW */}
      <div className="flex items-center justify-between gap-3 p-3">

        {/* LEFT */}
        <div className="flex items-center gap-3 min-w-0 flex-1">

          {/* Company Avatar */}
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-semibold shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.06)] border border-black/5 ${app.avatarBg || "bg-[#1D1D1F] text-white"
              }`}
          >
            {initial}
          </div>

          {/* Company / Job Information */}
          <div className="min-w-0 flex-1">

            {/* Company */}
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="text-xs font-semibold text-[#1D1D1F] truncate">
                {company}
              </span>

              <span className="text-[#B5B5B8] shrink-0">
                ·
              </span>

              <span className="text-xs text-[#555558] truncate">
                {role}
              </span>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-2 mt-1 min-w-0">

              {/* Location */}
              <div className="flex items-center gap-1 text-[10px] text-[#8E8E93] min-w-0">
                <MapPin className="w-3 h-3 shrink-0" />

                <span className="truncate max-w-[120px]">
                  {location}
                </span>
              </div>

              {/* Salary */}
              {salary && (
                <>
                  <span className="text-black/15 shrink-0">
                    ·
                  </span>

                  <span className="text-[10px] font-medium text-[#555558] truncate max-w-[120px]">
                    ₹ {salary}
                  </span>
                </>
              )}

              {/* Job Type */}
              <span
                className={`hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[9px] font-medium shrink-0 ${currentJobTypeStyle}`}
              >
                <Briefcase className="w-2.5 h-2.5" />
                {jobType}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Job Type - Mobile */}
          <span
            className={`sm:hidden hidden xs:inline-flex px-1.5 py-0.5 rounded-md border text-[9px] font-medium ${currentJobTypeStyle}`}
          >
            {jobType}
          </span>

          {/* Status */}
          <span
            className={`text-[10px] sm:text-[11px] font-medium px-2.5 py-1 rounded-full border whitespace-nowrap ${currentStatusStyle}`}
          >
            {status}
          </span>

          {/* Updated Time */}
          {app.updatedAt && (
            <span className="text-[10px] text-[#8E8E93] hidden lg:inline-block whitespace-nowrap">
              {app.updatedAt}
            </span>
          )}

          {/* EXPAND BUTTON */}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={
              expanded
                ? "Hide application details"
                : "Show application details"
            }
            className="p-1.5 rounded-md text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {/* Actions */}
          <div className="relative" ref={menuRef}>

            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Application actions"
              aria-expanded={menuOpen}
              className="p-1.5 rounded-md text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06)] border border-black/[0.08] p-1 z-30 text-xs text-[#1D1D1F] animate-in fade-in zoom-in-95 duration-100">

                {/* Status Section */}
                <div className="px-2 py-1.5 text-[9px] font-semibold text-[#8E8E93] uppercase tracking-wider">
                  Change Status
                </div>

                {statusOptions.map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={status === st}
                    onClick={() => {
                      if (onStatusChange) {
                        onStatusChange(app.id, st);
                      }

                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-left transition-colors ${status === st
                      ? "bg-[#F5F5F7] text-[#0071E3] font-semibold"
                      : "hover:bg-[#F5F5F7] text-[#555558]"
                      }`}
                  >
                    <span>{st}</span>

                    {status === st && (
                      <CheckCircle className="w-3 h-3 text-[#0071E3]" />
                    )}
                  </button>
                ))}

                <div className="my-1 border-t border-black/[0.06]" />

                {/* Open Job Link */}
                {jobUrl && (
                  <a
                    href={jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#F5F5F7] text-[#555558] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#8E8E93]" />
                    <span>Open Job Link</span>
                  </a>
                )}

                {/* Delete */}
                <button
                  type="button"
                  onClick={() => {
                    if (onDelete) {
                      onDelete(app.id);
                    }

                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-[#FDF0EF] text-[#B3261E] transition-colors text-left"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Application</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EXPANDED DETAILS */}
      {expanded && (
        <div className="border-t border-black/[0.05] px-4 py-4 bg-[#FAFAFA]">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">

            {/* Description */}
            <div className="col-span-2 md:col-span-3">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                Description
              </p>

              <p className="mt-1 text-xs leading-relaxed text-[#555558]">
                {app.description || "No description provided"}
              </p>
            </div>

            {/* Salary */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                Salary
              </p>

              <p className="mt-1 text-xs text-[#1D1D1F]">
                {salary ? `₹ ${salary}` : "Not specified"}
              </p>
            </div>

            {/* Priority */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                Priority
              </p>

              <p className="mt-1 text-xs text-[#1D1D1F] capitalize">
                {app.priority || "Not specified"}
              </p>
            </div>

            {/* Applied Date */}
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                Applied Date
              </p>

              <p className="mt-1 text-xs text-[#1D1D1F]">
                {app.applied_date
                  ? new Date(app.applied_date).toLocaleDateString()
                  : "Not specified"}
              </p>
            </div>

            {/* Note */}
            <div className="col-span-2 md:col-span-3">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                Note
              </p>

              <p className="mt-1 text-xs text-[#555558]">
                {app.note || "No notes added"}
              </p>
            </div>

            {/* Job URL */}
            <div className="col-span-2 md:col-span-3">
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[#8E8E93]">
                Job URL
              </p>

              {jobUrl ? (
                <a
                  href={jobUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-[#0071E3] hover:underline"
                >
                  Open Job Posting
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="mt-1 text-xs text-[#8E8E93]">
                  No job URL provided
                </p>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
