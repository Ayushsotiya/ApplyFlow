"use client";

import { useState, useMemo, useEffect } from "react";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import HiringPipeline from "@/components/dashboard/HiringPipeline";
import RecentApplications from "@/components/dashboard/RecentApplications";
import UpcomingInterviews from "@/components/dashboard/UpcomingInterviews";
import QuickActions from "@/components/dashboard/QuickActions";
import AddApplicationModal from "@/components/dashboard/AddApplicationModal";
import SpotlightSearchModal from "@/components/dashboard/SpotlightSearchModal";
import { initialDashboardData } from "@/data/dashboardData";

export default function DashboardPage() {
  // Main Data States
  const [stats, setStats] = useState(initialDashboardData.stats);
  const [pipelineStages, setPipelineStages] = useState(initialDashboardData.pipelineStages);
  const [applications, setApplications] = useState(initialDashboardData.recentApplications);
  const [upcomingInterviews] = useState(initialDashboardData.upcomingInterviews);
  const [collections] = useState(initialDashboardData.collections);

  // UI Interactive States
  const [activeNav, setActiveNav] = useState("all");
  const [activeCollection, setActiveCollection] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All"); // All | Active | Archived
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Global ⌘K / Ctrl+K keyboard shortcut
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter applications dynamically based on active filter tabs & sidebar selection
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      // 1. Sidebar Nav Filter
      if (activeNav === "interviews" && app.status !== "Interview") {
        return false;
      }
      if (activeNav === "offers" && app.status !== "Offer") {
        return false;
      }

      // 2. Header Segmented Filter (All, Active, Archived)
      if (activeFilter === "Active") {
        return app.category === "active" && app.status !== "Rejected" && app.status !== "Withdrawn";
      }
      if (activeFilter === "Archived") {
        return app.category === "archived" || app.status === "Rejected" || app.status === "Withdrawn";
      }

      return true;
    });
  }, [applications, activeNav, activeFilter]);

  // Handle adding a new application from modal
  const handleAddApplication = (newApp) => {
    setApplications((prev) => [newApp, ...prev]);

    // Update total count stat
    setStats((prevStats) =>
      prevStats.map((st) => {
        if (st.id === "total") {
          const currentVal = parseInt(st.value, 10) || 0;
          return {
            ...st,
            value: (currentVal + 1).toString(),
            subtext: "+5 this week",
          };
        }
        if (st.id === "interviews" && newApp.status === "Interview") {
          const currentVal = parseInt(st.value, 10) || 0;
          return {
            ...st,
            value: (currentVal + 1).toString(),
          };
        }
        if (st.id === "offers" && newApp.status === "Offer") {
          const currentVal = parseInt(st.value, 10) || 0;
          return {
            ...st,
            value: (currentVal + 1).toString(),
          };
        }
        return st;
      })
    );

    // Update pipeline stage counts
    setPipelineStages((prevStages) =>
      prevStages.map((stage) => {
        if (stage.id.toLowerCase() === newApp.status.toLowerCase()) {
          return { ...stage, count: stage.count + 1 };
        }
        return stage;
      })
    );
  };

  // Handle status changes directly from 3-dot menu
  const handleStatusChange = (appId, newStatus) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            category: newStatus === "Rejected" || newStatus === "Withdrawn" ? "archived" : "active",
            updatedAt: "Just now",
          };
        }
        return app;
      })
    );
  };

  // Handle deleting an application
  const handleDeleteApplication = (appId) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  };

  // Count calculations for sidebar
  const totalAppsCount = 28 + (applications.length - 4);
  const interviewsCount = 5 + applications.filter((a) => a.status === "Interview" && !["app-1", "app-2"].includes(a.id)).length;
  const offersCount = 2 + applications.filter((a) => a.status === "Offer").length;

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex flex-col antialiased selection:bg-[#0071E3]/20">
      {/* Top Desktop Bar (macOS Window Title Bar) */}
      <DashboardTopBar
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        mobileSidebarOpen={mobileSidebarOpen}
      />

      {/* Application Body: Sidebar + Main Content Area */}
      <div className="flex-1 flex w-full relative">
        {/* Left macOS Sidebar */}
        <DashboardSidebar
          activeNav={activeNav}
          onSelectNav={(navId) => {
            setActiveNav(navId);
            setActiveCollection(null);
          }}
          applicationsCount={totalAppsCount}
          interviewsCount={interviewsCount}
          offersCount={offersCount}
          collections={collections}
          activeCollection={activeCollection}
          onSelectCollection={(colId) => {
            setActiveCollection(colId);
            setActiveNav(null);
          }}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Dashboard Canvas */}
        <main className="flex-1 min-w-0 bg-[#FBFBFD] p-5 sm:p-7 lg:p-9 overflow-x-hidden">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Dashboard Header */}
            <DashboardHeader
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              lastUpdated="12 minutes ago"
            />

            {/* Statistics: 4 compact cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {stats.map((stat) => (
                <StatsCard
                  key={stat.id}
                  label={stat.label}
                  value={stat.value}
                  subtext={stat.subtext}
                  icon={stat.icon}
                  highlight={stat.highlight}
                />
              ))}
            </div>

            {/* Hiring Pipeline Stage Progress */}
            <HiringPipeline
              stages={pipelineStages}
              totalTracks={totalAppsCount}
            />

            {/* Main Content: Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Recent Opportunities (wider, 8 cols on lg) */}
              <div className="lg:col-span-8">
                <RecentApplications
                  applications={filteredApplications}
                  totalCount={totalAppsCount}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDeleteApplication}
                />
              </div>

              {/* Right Column: Upcoming Interviews & Quick Actions (4 cols on lg) */}
              <div className="lg:col-span-4 space-y-5">
                <UpcomingInterviews interviews={upcomingInterviews} />
                <QuickActions onOpenAddModal={() => setIsAddModalOpen(true)} />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Add Application macOS Sheet Modal */}
      <AddApplicationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddApplication={handleAddApplication}
      />

      {/* Spotlight Search Modal (⌘K) */}
      <SpotlightSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        applications={applications}
        onSelectApplication={(app) => {
          // If clicked in search, highlight or filter
        }}
      />
    </div>
  );
}
