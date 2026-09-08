
"use client";

import { useEffect } from "react";
import {
  X,
  Building2,
  Briefcase,
  MapPin,
  Link2,
  DollarSign,
  Calendar,
  FileText,
  StickyNote,
} from "lucide-react";
import { useForm } from "react-hook-form";

export default function AddApplicationModal({
  isOpen = true,
  onClose,
  onAddApplication,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      company_name: "",
      job_title: "",
      job_type: "Onsite",
      description: "",
      job_url: "",
      location: "",
      salary: "",
      status: "Applied",
      priority: "Normal",
      note: "",
      applied_date: new Date().toISOString().split("T")[0],
    },
  });

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    const newApplication = {
      company_name: data.company_name.trim(),
      job_title: data.job_title.trim(),
      job_type: data.job_type,
      description: data.description.trim(),
      job_url: data.job_url.trim(),
      location: data.location.trim(),
      salary: data.salary.trim(),
      status: data.status,
      priority: data.priority,
      note: data.note.trim(),
      applied_date: data.applied_date,
    };

    await onAddApplication(newApplication);

    reset({
      company_name: "",
      job_title: "",
      job_type: "Onsite",
      description: "",
      job_url: "",
      location: "",
      salary: "",
      status: "Applied",
      priority: "Normal",
      note: "",
      applied_date: new Date().toISOString().split("T")[0],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-150 animate-in fade-in"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="h-12 px-5 bg-[#FAFAFC] border-b border-black/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0071E3]" />

            <h3 className="text-[13px] font-semibold text-[#1D1D1F]">
              New Job Application
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-5 space-y-4 text-xs text-[#1D1D1F]"
        >
          {/* Company + Job Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Company */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Company <span className="text-[#FF3B30]">*</span>
              </label>

              <div className="relative">
                <Building2 className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />

                <input
                  type="text"
                  placeholder="e.g. Google"
                  {...register("company_name", {
                    required: "Company is required",
                  })}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>

              {errors.company_name && (
                <p className="text-[10px] text-[#FF3B30] mt-0.5">
                  {errors.company_name.message}
                </p>
              )}
            </div>

            {/* Job Title */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Job Title <span className="text-[#FF3B30]">*</span>
              </label>

              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />

                <input
                  type="text"
                  placeholder="e.g. Software Engineer"
                  {...register("job_title", {
                    required: "Job title is required",
                  })}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>

              {errors.job_title && (
                <p className="text-[10px] text-[#FF3B30] mt-0.5">
                  {errors.job_title.message}
                </p>
              )}
            </div>
          </div>

          {/* Location + Job Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Location */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Location
              </label>

              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />

                <input
                  type="text"
                  placeholder="e.g. Bangalore"
                  {...register("location")}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
            </div>

            {/* Job Type */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Job Type
              </label>

              <select
                {...register("job_type")}
                className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
              >
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Job URL */}
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-[#555558]">
              Job Posting URL
            </label>

            <div className="relative">
              <Link2 className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />

              <input
                type="url"
                placeholder="https://..."
                {...register("job_url")}
                className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
              />
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-[#555558]">
              Salary
            </label>

            <div className="relative">
              <span className="text-[#8E8E93] absolute left-2.5 top-1.5 pointer-events-none text-sm">
                ₹
              </span>

              <input
                type="text"
                placeholder="e.g. ₹8-12 LPA / Competitive"
                {...register("salary")}
                className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-[#555558]">
              Job Description
            </label>

            <div className="relative">
              <FileText className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />

              <textarea
                rows={3}
                placeholder="Add a short description about the role..."
                {...register("description")}
                className="w-full pl-8 pr-2.5 py-2 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs resize-none"
              />
            </div>
          </div>

          {/* Status + Priority + Applied Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Status */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Status
              </label>

              <select
                {...register("status")}
                className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
              >
                <option value="Applied">Applied</option>
                <option value="Screening">Screening</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
                <option value="Withdrawn">Withdrawn</option>
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Priority
              </label>

              <select
                {...register("priority")}
                className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Applied Date */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Applied Date
              </label>

              <div className="relative">
                <Calendar className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />

                <input
                  type="date"
                  {...register("applied_date")}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
            </div>
          </div>

          {/* Note */}
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-[#555558]">
              Note
            </label>

            <div className="relative">
              <StickyNote className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />

              <textarea
                rows={2}
                placeholder="Add any notes..."
                {...register("note")}
                className="w-full pl-8 pr-2.5 py-2 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-black/[0.07] flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg border border-black/[0.1] hover:bg-black/[0.04] text-xs font-medium text-[#555558] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1.5 rounded-lg bg-[#1D1D1F] hover:bg-[#2D2D30] text-white text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/10 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

