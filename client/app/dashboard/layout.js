"use client";

import React, { useState } from "react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import DashboardSidebar from "@/components/dashboard/SideBar";

export default function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] flex flex-col antialiased selection:bg-[#0071E3]/20">
        {/* Top Window Bar */}
        <DashboardTopBar
          onToggleMobileSidebar={() => setMobileSidebarOpen((prev) => !prev)}
          mobileSidebarOpen={mobileSidebarOpen}
        />

        {/* Main Body: Sidebar + Dynamic Page Content */}
        <div className="flex-1 flex w-full relative">
          <DashboardSidebar
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          <main className="flex-1 min-w-0 p-5 sm:p-7 lg:p-9 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </PrivateRoute>
  );
}
