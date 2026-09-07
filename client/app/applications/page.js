"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import AddApplicationModal from "@/components/dashboard/AddApplicationModal";
import SpotlightSearchModal from "@/components/dashboard/SpotlightSearchModal";
import ApplicationRow from "@/components/dashboard/ApplicationRow";
import { initialDashboardData } from "@/data/dashboardData";
import { ArrowLeft, Plus, Search, Filter } from "lucide-react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(initialDashboardData.recentApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const statuses = ["All", "Applied", "Screening", "Interview", "Offer", "Rejected"];

  const filtered = applications.filter((app) => {
    if (selectedStatus !== "All" && app.status !== selectedStatus) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        (app.location && app.location.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleAddApplication = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);
  };

  const handleStatusChange = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
    );
  };

  const handleDeleteApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex flex-col antialiased">
      {/* Top Bar */}
      <DashboardTopBar
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      <div className="flex-1 flex w-full relative">
        {/* Sidebar */}
        <DashboardSidebar
          activeNav="all"
          applicationsCount={applications.length + 24}
          interviewsCount={5}
          offersCount={2}
          collections={initialDashboardData.collections}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-[#FBFBFD] p-5 sm:p-7 lg:p-9 overflow-x-hidden">
          <div className="max-w-6xl mx-auto space-y-5">
            {/* Breadcrumb & Navigation Back */}
            <div className="flex items-center justify-between pb-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#8E8E93] hover:text-[#1D1D1F] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.08]">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#1D1D1F]">
                  All Applications
                </h1>
                <p className="text-xs text-[#8E8E93] mt-0.5">
                  Complete view of all {applications.length + 24} tracked positions
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1D1D1F] hover:bg-[#2D2D30] text-white text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/10 transition-all cursor-pointer active:scale-[0.98] self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Application</span>
              </button>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Status Tabs */}
              <div className="flex items-center overflow-x-auto bg-[#EBEBED] p-0.5 rounded-lg border border-black/[0.04] text-xs font-medium text-[#555558] scrollbar-none">
                {statuses.map((status) => {
                  const isActive = selectedStatus === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setSelectedStatus(status)}
                      className={`px-3 py-1 rounded-[6px] text-xs whitespace-nowrap transition-all ${
                        isActive
                          ? "bg-white text-[#1D1D1F] font-medium shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                          : "hover:text-[#1D1D1F]"
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>

              {/* In-page quick search */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter applications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.1] bg-white text-xs text-[#1D1D1F] focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all"
                />
              </div>
            </div>

            {/* Applications List */}
            <div className="space-y-2">
              {filtered.length > 0 ? (
                filtered.map((app) => (
                  <ApplicationRow
                    key={app.id}
                    app={app}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteApplication}
                  />
                ))
              ) : (
                <div className="py-12 text-center bg-white border border-black/[0.06] rounded-xl text-xs text-[#8E8E93]">
                  {`No applications found matching "${searchQuery || selectedStatus}"`}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Application Modal */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddApplication={handleAddApplication}
      />

      {/* Spotlight Search Modal */}
      <SpotlightSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        applications={applications}
      />
    </div>
  );
}
