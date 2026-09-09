"use client";

import React, { useState, useEffect } from "react";
import PrivateRoute from "@/components/auth/PrivateRoute";
import DashboardTopBar from "@/components/dashboard/DashboardTopBar";
import DashboardSidebar from "@/components/dashboard/SideBar";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '@/services/operations/jobs';

export default function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchJobs(token));
  }, []);

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
