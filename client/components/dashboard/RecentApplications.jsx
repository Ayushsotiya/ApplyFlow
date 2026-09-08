"use client";

import Link from "next/link";
import ApplicationRow from "./ApplicationRow";
import { ArrowRight, Inbox } from "lucide-react";
import { fetchJobs } from '@/services/operations/jobs';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus, deleteJob } from '@/services/operations/jobs';
export default function RecentApplications() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { allJobs } = useSelector((state) => state.jobs);

  const onDelete = async (id) => {
    await dispatch(deleteJob(token, id));
  }

  const onStatusChange = async (id, newStatus) => {
    await dispatch(updateStatus(token, id, newStatus));
  }

  useEffect(() => {
    dispatch(fetchJobs(token));
  }, []);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
          Recent Opportunities
        </h2>
        <span className="text-[11px] text-[#8E8E93]">
          Sorted by recent activity
        </span>
      </div>

      {/* Applications List */}
      <div className="space-y-2">
        {allJobs.length > 0 ? (
          allJobs.map((app) => (
            <ApplicationRow key={app.id} app={app} onStatusChange={onStatusChange} onDelete={onDelete} />
          ))
        ) : (
          <div className="p-8 text-center bg-white border border-black/[0.06] rounded-xl text-xs text-[#8E8E93] space-y-1">
            <Inbox className="w-6 h-6 mx-auto text-black/20" />
            <p>No applications match the selected filter.</p>
          </div>
        )}
      </div>

      {/* Footer view summary */}
      <div className="pt-2 px-1 flex items-center justify-between text-[11px] text-[#8E8E93]">
        <span>
          Viewing {allJobs.length} of {allJobs.length} applications
        </span>
        <Link
          href="/applications"
          className="text-[#0071E3] hover:underline font-medium flex items-center gap-1 group transition-colors"
        >
          <span>View all applications</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
