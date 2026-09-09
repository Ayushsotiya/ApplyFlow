"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ApplicationRow from "@/components/dashboard/ApplicationRow";
import {
    fetchCollections,
    fetchCollectionById,
    addJobToCollection,
    removeJobFromCollection,
} from "@/services/operations/collections";
import { fetchJobs, updateStatus } from "@/services/operations/jobs";
import {
    Folder,
    Plus,
    ArrowLeft,
    Inbox,
    Search,
    X,
    Building2,
    Check,
    Loader2,
} from "lucide-react";

export default function CollectionPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const rawCollectionParam = params?.collections;
    const collectionName = decodeURIComponent(rawCollectionParam || "");

    const { token } = useSelector((state) => state.auth);
    const { allCollections, currentCollection, loading } = useSelector(
        (state) => state.collections
    );
    const { allJobs } = useSelector((state) => state.jobs);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [addingJobId, setAddingJobId] = useState(null);

    // Find collection in redux list by name or ID
    const matchedCollection = useMemo(() => {
        return allCollections.find(
            (c) =>
                c.name?.toLowerCase() === collectionName.toLowerCase() ||
                String(c.id) === collectionName
        );
    }, [allCollections, collectionName]);

    // Ensure collections and jobs are loaded
    useEffect(() => {
        if (token && allCollections.length === 0) {
            dispatch(fetchCollections(token));
        }
        if (token && allJobs.length === 0) {
            dispatch(fetchJobs(token));
        }
    }, [token, allCollections.length, allJobs.length, dispatch]);

    // Fetch full collection data by ID once matched
    useEffect(() => {
        if (token && matchedCollection?.id) {
            dispatch(fetchCollectionById(token, matchedCollection.id));
        }
    }, [token, matchedCollection?.id, dispatch]);

    const collectionJobs = currentCollection?.jobs || [];

    // Jobs that can be added (not currently in this collection)
    const existingJobIds = useMemo(() => {
        return new Set(collectionJobs.map((j) => j.id));
    }, [collectionJobs]);

    const availableJobs = useMemo(() => {
        return (allJobs || []).filter((job) => !existingJobIds.has(job.id));
    }, [allJobs, existingJobIds]);

    const filteredAvailableJobs = useMemo(() => {
        if (!searchQuery.trim()) return availableJobs;
        const q = searchQuery.toLowerCase();
        return availableJobs.filter(
            (job) =>
                job.company_name?.toLowerCase().includes(q) ||
                job.job_title?.toLowerCase().includes(q) ||
                job.location?.toLowerCase().includes(q) ||
                job.status?.toLowerCase().includes(q)
        );
    }, [availableJobs, searchQuery]);

    const handleAddJob = async (jobId) => {
        if (!matchedCollection?.id) return;
        setAddingJobId(jobId);
        try {
            await dispatch(addJobToCollection(token, matchedCollection.id, jobId));
        } finally {
            setAddingJobId(null);
        }
    };

    const handleRemoveJob = async (jobId) => {
        if (!matchedCollection?.id) return;
        await dispatch(removeJobFromCollection(token, matchedCollection.id, jobId));
    };

    const handleStatusChange = async (jobId, newStatus) => {
        await dispatch(updateStatus(token, jobId, newStatus));
        if (matchedCollection?.id) {
            dispatch(fetchCollectionById(token, matchedCollection.id));
        }
    };

    const displayName = matchedCollection?.name || collectionName || "Collection";

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Top Header Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-black/[0.06]">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#8E8E93] hover:text-[#1D1D1F] transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Dashboard</span>
                        </Link>
                        <span className="text-xs text-[#8E8E93]">/</span>
                        <span className="text-xs text-[#8E8E93]">Collections</span>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                        <div className="w-8 h-8 rounded-lg bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center">
                            <Folder className="w-4 h-4" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-[#1D1D1F] tracking-tight">
                                {displayName}
                            </h1>
                            <p className="text-[12px] text-[#8E8E93]">
                                {collectionJobs.length}{" "}
                                {collectionJobs.length === 1 ? "application" : "applications"} in
                                this collection
                            </p>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div>
                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(true)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] active:bg-[#0062C4] text-white text-xs font-medium shadow-sm transition-colors cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Add Applications</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider">
                        Collection Applications
                    </h2>
                    <span className="text-[11px] text-[#8E8E93]">
                        Sorted by recent activity
                    </span>
                </div>

                {loading && !currentCollection ? (
                    <div className="p-12 text-center bg-white border border-black/[0.06] rounded-xl text-xs text-[#8E8E93] flex flex-col items-center justify-center space-y-2">
                        <Loader2 className="w-6 h-6 animate-spin text-[#0071E3]" />
                        <p>Loading collection applications...</p>
                    </div>
                ) : collectionJobs.length > 0 ? (
                    <div className="space-y-2">
                        {collectionJobs.map((app) => (
                            <ApplicationRow
                                key={app.id}
                                app={app}
                                onStatusChange={handleStatusChange}
                                onDelete={handleRemoveJob}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-10 text-center bg-white border border-black/[0.06] rounded-xl text-xs text-[#8E8E93] space-y-3">
                        <Inbox className="w-8 h-8 mx-auto text-black/20" />
                        <div className="space-y-1">
                            <p className="font-medium text-[#1D1D1F]">
                                No applications in this collection
                            </p>
                            <p className="text-[11px] text-[#8E8E93]">
                                Organize your pipeline by adding existing job applications to this collection.
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F5F5F7] hover:bg-black/[0.06] text-[#1D1D1F] text-xs font-medium transition-colors cursor-pointer"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add an Application</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Add Application Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col max-h-[85vh]">
                        {/* Modal Header */}
                        <div className="px-5 py-4 border-b border-black/[0.06] flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-[#1D1D1F]">
                                    Add Applications to Collection
                                </h3>
                                <p className="text-xs text-[#8E8E93] mt-0.5">
                                    Select applications to add to &ldquo;{displayName}&rdquo;
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setSearchQuery("");
                                }}
                                className="p-1.5 rounded-lg text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-colors cursor-pointer"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Search Filter */}
                        <div className="p-4 border-b border-black/[0.06] bg-[#FBFBFD]">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8E93]" />
                                <input
                                    type="text"
                                    placeholder="Search by company, role, or status..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-black/[0.1] rounded-lg outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 transition-all text-[#1D1D1F] placeholder:text-[#8E8E93]"
                                />
                            </div>
                        </div>

                        {/* Applications List */}
                        <div className="p-4 overflow-y-auto space-y-2 flex-1">
                            {filteredAvailableJobs.length > 0 ? (
                                filteredAvailableJobs.map((job) => {
                                    const isAdding = addingJobId === job.id;
                                    const company = job.company_name || job.company || "Unknown Company";
                                    const role = job.job_title || job.role || "Unknown Role";
                                    const initial = company.trim().charAt(0).toUpperCase() || "C";

                                    return (
                                        <div
                                            key={job.id}
                                            className="flex items-center justify-between p-3 rounded-xl border border-black/[0.06] hover:border-black/[0.12] bg-white transition-all group"
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-8 h-8 rounded-lg bg-[#F5F5F7] border border-black/[0.06] flex items-center justify-center font-bold text-xs text-[#555558] shrink-0">
                                                    {initial}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-[#1D1D1F] truncate">
                                                        {role}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-[11px] text-[#8E8E93] truncate">
                                                        <span className="flex items-center gap-1">
                                                            <Building2 className="w-3 h-3" />
                                                            {company}
                                                        </span>
                                                        {job.status && (
                                                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F5F5F7] text-[#555558]">
                                                                {job.status}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                disabled={isAdding}
                                                onClick={() => handleAddJob(job.id)}
                                                className="ml-3 shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0071E3]/10 hover:bg-[#0071E3] text-[#0071E3] hover:text-white text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
                                            >
                                                {isAdding ? (
                                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                ) : (
                                                    <Plus className="w-3.5 h-3.5" />
                                                )}
                                                <span>Add</span>
                                            </button>
                                        </div>
                                    );
                                })
                            ) : availableJobs.length === 0 ? (
                                <div className="py-8 text-center text-xs text-[#8E8E93] space-y-1">
                                    <Check className="w-6 h-6 mx-auto text-[#34C759]" />
                                    <p className="font-medium text-[#1D1D1F]">
                                        All applications are in this collection
                                    </p>
                                    <p className="text-[11px]">
                                        You have added all your tracked applications here.
                                    </p>
                                </div>
                            ) : (
                                <div className="py-8 text-center text-xs text-[#8E8E93]">
                                    <p>No applications match &ldquo;{searchQuery}&rdquo;</p>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="px-5 py-3 border-t border-black/[0.06] bg-[#FBFBFD] flex items-center justify-between">
                            <span className="text-[11px] text-[#8E8E93]">
                                {availableJobs.length} eligible applications available
                            </span>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsAddModalOpen(false);
                                    setSearchQuery("");
                                }}
                                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#555558] hover:bg-black/[0.05] transition-colors cursor-pointer"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}