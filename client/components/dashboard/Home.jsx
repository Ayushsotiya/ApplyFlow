"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import HiringPipeline from "@/components/dashboard/Pipline";
import RecentApplications from "@/components/dashboard/RecentApplications";



export default function DashboardPage() {

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsSearchModalOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);



    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <DashboardHeader />
            <HiringPipeline />

            {/* Content Columns: Recent Applications & Interviews */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8">
                    <RecentApplications />
                </div>

                <div className="lg:col-span-4 space-y-5">
                    {/* <UpcomingInterviews interviews={initialDashboardData.upcomingInterviews} /> */}
                    {/* <QuickActions onOpenAddModal={() => setIsAddModalOpen(true)} /> */}
                </div>
            </div>

            {/* <SpotlightSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        applications={applications}
      /> */}
        </div>
    );
}
