"use client";

import { Search, Menu, X } from "lucide-react";

export default function DashboardTopBar({ onOpenSearch, onToggleMobileSidebar, mobileSidebarOpen }) {
  return (
    <header className="h-11 w-full bg-[#FBFBFD] border-b border-black/[0.08] px-3.5 sm:px-5 flex items-center justify-between select-none z-30 sticky top-0 backdrop-blur-md">
      {/* Left: macOS Traffic Lights + Mobile Sidebar Button */}
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1 rounded-md text-[#555558] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
        >
          {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>

        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block shadow-xs hover:opacity-80 cursor-default"
            title="Close"
          />
          <span
            className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block shadow-xs hover:opacity-80 cursor-default"
            title="Minimize"
          />
          <span
            className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block shadow-xs hover:opacity-80 cursor-default"
            title="Zoom"
          />
        </div>
      </div>

      {/* Center: Minimal Breadcrumb / Workspace label */}
      <div className="text-[12px] font-medium text-[#86868B] flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-none">
        <span className="text-[#1D1D1F]">Workspace</span>
        <span className="text-black/30">/</span>
        <span className="text-[#555558]">Active Cycle 2026</span>
      </div>

      {/* Right: Quick Search Button */}
      {/* <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenSearch}
          className="group flex items-center gap-2 px-2.5 py-1 bg-white hover:bg-[#F5F5F7] border border-black/[0.08] hover:border-black/[0.14] rounded-md text-[11px] text-[#86868B] hover:text-[#1D1D1F] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-all cursor-pointer"
        >
          <Search className="w-3.5 h-3.5 text-[#86868B] group-hover:text-[#1D1D1F] transition-colors" />
          <span className="hidden sm:inline font-normal">Search</span>
          <kbd className="text-[9px] bg-black/[0.05] text-[#555558] px-1.5 py-0.5 rounded font-mono font-medium border border-black/[0.06]">
            ⌘K
          </kbd>
        </button>
      </div> */}
    </header>
  );
}
