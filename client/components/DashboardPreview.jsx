"use client";

import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Building,
  MoreHorizontal,
  ChevronRight,
  Layers,
  Check,
} from "lucide-react";

export default function DashboardPreview() {
  const stats = [
    {
      label: "Total Applications",
      value: "28",
      subtext: "+4 this week",
      icon: Briefcase,
    },
    {
      label: "Interviews",
      value: "5",
      subtext: "2 scheduled soon",
      icon: Calendar,
      highlight: true,
    },
    {
      label: "Offers Received",
      value: "2",
      subtext: "Base: $165k - $185k",
      icon: CheckCircle2,
    },
    {
      label: "Response Rate",
      value: "42%",
      subtext: "Above industry avg",
      icon: TrendingUp,
    },
  ];

  const recentApplications = [
    {
      company: "Linear",
      role: "Product Designer",
      location: "Remote",
      salary: "$160k - $180k",
      status: "Offer",
      statusColor: "bg-[#E8F8EE] text-[#107C41] border-[#D1F2DD]",
      date: "2h ago",
      initial: "L",
      bgInitial: "bg-black text-white",
    },
    {
      company: "Stripe",
      role: "Frontend Engineer",
      location: "San Francisco (Remote)",
      salary: "$175k - $195k",
      status: "Interview",
      statusColor: "bg-[#EBF5FF] text-[#0071E3] border-[#CCE4FF]",
      date: "Yesterday",
      initial: "S",
      bgInitial: "bg-[#635BFF] text-white",
    },
    {
      company: "Apple",
      role: "UI Engineer — Apps & Web",
      location: "Cupertino, CA",
      salary: "$180k - $205k",
      status: "Screening",
      statusColor: "bg-[#F3E8FF] text-[#7C3AED] border-[#E9D5FF]",
      date: "3d ago",
      initial: "",
      bgInitial: "bg-[#1D1D1F] text-white",
    },
    {
      company: "Vercel",
      role: "DX Engineer",
      location: "Remote (US/EU)",
      salary: "$165k - $185k",
      status: "Applied",
      statusColor: "bg-[#F5F5F7] text-[#555558] border-black/[0.08]",
      date: "5d ago",
      initial: "▲",
      bgInitial: "bg-black text-white",
    },
  ];

  return (
    <div className="w-full relative mx-auto select-none">
      {/* Outer macOS window frame */}
      <div className="rounded-2xl sm:rounded-3xl bg-white border border-black/[0.09] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12),0_0_1px_rgba(0,0,0,0.1)] overflow-hidden">
        {/* macOS Title Bar */}
        <div className="h-11 bg-[#F9F9FB] border-b border-black/[0.07] px-4 flex items-center justify-between">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 inline-block shadow-xs" />
          </div>

          {/* Window Title & subtle breadcrumb */}
          <div className="text-[12px] font-medium text-[#86868B] flex items-center gap-1.5">
            <span className="text-[#1D1D1F]">Workspace</span>
            <span>/</span>
            <span>Active Cycle 2026</span>
          </div>

          {/* Right action icons */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white border border-black/[0.08] rounded-md text-[11px] text-[#86868B]">
              <Search className="w-3 h-3 text-[#86868B]" />
              <span>Search</span>
              <kbd className="text-[9px] bg-black/[0.05] px-1 py-0.5 rounded font-mono">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Application Body: Sidebar + Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] bg-[#FAFAFB]">
          {/* macOS Left Sidebar (Hidden on tiny screens, shown on md+) */}
          <div className="hidden md:flex md:col-span-3 lg:col-span-3 border-r border-black/[0.07] p-3.5 flex-col justify-between bg-[#F7F7F9]">
            <div className="space-y-4">
              {/* Sidebar Section 1 */}
              <div>
                <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider px-2 mb-1.5">
                  Tracker
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-[#EAEAEA] text-[#1D1D1F] text-xs font-medium cursor-default">
                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#0071E3]" />
                      <span>All Applications</span>
                    </div>
                    <span className="text-[11px] bg-white text-[#1D1D1F] px-1.5 py-0.2 rounded-md font-mono border border-black/[0.06]">
                      28
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[#555558] hover:bg-black/[0.03] text-xs font-medium cursor-default transition-colors">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#86868B]" />
                      <span>Interviews</span>
                    </div>
                    <span className="text-[11px] text-[#86868B] px-1.5 font-mono">
                      5
                    </span>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[#555558] hover:bg-black/[0.03] text-xs font-medium cursor-default transition-colors">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#107C41]" />
                      <span>Offers</span>
                    </div>
                    <span className="text-[11px] text-[#107C41] font-semibold bg-[#E8F8EE] px-1.5 py-0.2 rounded-md font-mono">
                      2
                    </span>
                  </div>
                </div>
              </div>

              {/* Sidebar Section 2 - Lists */}
              <div>
                <div className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider px-2 mb-1.5">
                  Collections
                </div>
                <div className="space-y-0.5 text-xs text-[#555558]">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-black/[0.03]">
                    <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                    <span>Top Priority</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-black/[0.03]">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Remote Startups</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-black/[0.03]">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <span>Design Engineering</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Bottom User & Sync Status */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[10px] font-semibold">
                  AF
                </div>
                <div className="text-[11px] text-[#86868B] leading-none">
                  Syncing iCloud
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            </div>
          </div>

          {/* Main Dashboard Content Area */}
          <div className="col-span-1 md:col-span-9 lg:col-span-9 p-4 sm:p-6 flex flex-col justify-between bg-white">
            <div>
              {/* Header inside workspace */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/[0.06]">
                <div>
                  <h4 className="text-lg font-semibold text-[#1D1D1F] tracking-tight flex items-center gap-2">
                    Applications Overview
                    <span className="text-xs font-normal text-[#86868B] bg-[#F5F5F7] px-2 py-0.5 rounded-full border border-black/[0.05]">
                      Active Season
                    </span>
                  </h4>
                  <p className="text-xs text-[#86868B] mt-0.5">
                    Updated 12 minutes ago from your desktop sync
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-[#F5F5F7] p-0.5 rounded-lg border border-black/[0.06] text-xs font-medium text-[#555558]">
                    <button type="button" className="px-2.5 py-1 bg-white rounded-md text-[#1D1D1F] shadow-xs">
                      All
                    </button>
                    <button type="button" className="px-2.5 py-1 hover:text-[#1D1D1F] transition-colors">
                      Active
                    </button>
                    <button type="button" className="px-2.5 py-1 hover:text-[#1D1D1F] transition-colors">
                      Archived
                    </button>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1D1D1F] text-white text-xs font-medium shadow-xs cursor-default">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </div>
                </div>
              </div>

              {/* Top 4 Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-5">
                {stats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-[#FAFAFB] border border-black/[0.06] rounded-xl p-3.5 transition-all hover:bg-white hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between text-[#86868B] mb-2">
                        <span className="text-[11px] font-medium tracking-tight">
                          {stat.label}
                        </span>
                        <Icon className="w-3.5 h-3.5 text-[#86868B]" />
                      </div>
                      <div className="text-xl font-bold tracking-tight text-[#1D1D1F]">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-[#86868B] mt-0.5 flex items-center gap-1">
                        {stat.subtext}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Minimal Pipeline Progress Indicator */}
              <div className="bg-[#F7F7F9] border border-black/[0.05] rounded-xl p-3 mb-5">
                <div className="flex items-center justify-between text-[11px] font-medium text-[#555558] mb-2">
                  <span className="flex items-center gap-1.5 text-[#1D1D1F]">
                    <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
                    <span>Hiring Pipeline Stage</span>
                  </span>
                  <span className="text-[#86868B]">28 total tracks</span>
                </div>
                {/* Visual bar */}
                <div className="h-2 w-full bg-black/[0.06] rounded-full overflow-hidden flex">
                  <div className="bg-[#0071E3] h-full w-[45%]" title="Applied (45%)" />
                  <div className="bg-[#7C3AED] h-full w-[25%]" title="Screening (25%)" />
                  <div className="bg-[#3B82F6] h-full w-[18%]" title="Interview (18%)" />
                  <div className="bg-[#107C41] h-full w-[12%]" title="Offer (12%)" />
                </div>
                {/* Legend */}
                <div className="flex items-center justify-between text-[10px] text-[#86868B] mt-2">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]" /> Applied (13)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" /> Screening (7)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" /> Interview (5)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#107C41]" /> Offer (2)
                  </span>
                </div>
              </div>

              {/* Recent Applications Table / Cards */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#86868B] uppercase tracking-wider px-1">
                  Recent Opportunities
                </div>
                <div className="space-y-1.5">
                  {recentApplications.map((app) => (
                    <div
                      key={app.company}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-black/[0.05] bg-white hover:bg-[#F9F9FB] hover:border-black/[0.1] transition-all cursor-default"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${app.bgInitial} shadow-xs`}
                        >
                          {app.initial}
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-[#1D1D1F] flex items-center gap-1.5">
                            {app.company}
                            <span className="text-[11px] font-normal text-[#86868B]">
                              • {app.role}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#86868B] flex items-center gap-2">
                            <span>{app.location}</span>
                            <span>•</span>
                            <span className="font-medium text-[#1D1D1F]/80">
                              {app.salary}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${app.statusColor}`}
                        >
                          {app.status}
                        </span>
                        <span className="text-[11px] text-[#86868B] hidden sm:inline-block font-mono">
                          {app.date}
                        </span>
                        <MoreHorizontal className="w-4 h-4 text-[#86868B] hover:text-[#1D1D1F] transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Status hint */}
            <div className="mt-4 pt-3 border-t border-black/[0.05] flex items-center justify-between text-[11px] text-[#86868B]">
              <span>Viewing 4 of 28 applications</span>
              <span className="text-[#0071E3] hover:underline cursor-pointer flex items-center gap-0.5">
                View all applications <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
