"use client";

import { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, X, Building, Briefcase } from "lucide-react";

export default function SpotlightSearchModal({ isOpen, onClose, applications = [], onSelectApplication }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Trigger handled in parent
        }
      } else if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  if (!isOpen) return null;

  const filtered = applications.filter((app) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      app.company.toLowerCase().includes(q) ||
      app.role.toLowerCase().includes(q) ||
      (app.location && app.location.toLowerCase().includes(q)) ||
      app.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 select-none">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/35 backdrop-blur-xs transition-opacity duration-150 animate-in fade-in"
      />

      {/* Spotlight Window */}
      <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-2xl border border-black/10 shadow-[0_25px_60px_rgba(0,0,0,0.18),0_1px_4px_rgba(0,0,0,0.06)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input */}
        <div className="h-12 px-4 border-b border-black/[0.08] flex items-center gap-3">
          <Search className="w-4 h-4 text-[#8E8E93] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applications, roles, or status..."
            className="w-full bg-transparent border-none text-xs sm:text-sm text-[#1D1D1F] focus:outline-none placeholder:text-[#8E8E93]"
          />
          <kbd className="text-[10px] bg-black/[0.05] text-[#555558] px-1.5 py-0.5 rounded font-mono border border-black/[0.06] shrink-0">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-2">
          <div className="text-[10px] font-semibold text-[#8E8E93] uppercase tracking-wider px-2 py-1">
            Applications ({filtered.length})
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-0.5">
              {filtered.map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    if (onSelectApplication) onSelectApplication(app);
                    handleClose();
                  }}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#F5F5F7] text-left transition-colors group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-md bg-[#1D1D1F] text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
                      {app.initial || app.company[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-[#1D1D1F] truncate">
                        {app.company} · {app.role}
                      </div>
                      <div className="text-[10px] text-[#8E8E93] truncate">
                        {app.location} · {app.salary}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#F5F5F7] border border-black/[0.06] text-[#555558]">
                      {app.status}
                    </span>
                    <ArrowRight className="w-3 h-3 text-[#8E8E93] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-[#8E8E93]">
              {`No applications found matching "${query}"`}
            </div>
          )}
        </div>

        {/* Spotlight Footer */}
        <div className="px-4 py-2 bg-[#F9F9FB] border-t border-black/[0.06] flex items-center justify-between text-[10px] text-[#8E8E93]">
          <span>Navigation: Click or Search</span>
          <span>ApplyFlow Spotlight</span>
        </div>
      </div>
    </div>
  );
}
