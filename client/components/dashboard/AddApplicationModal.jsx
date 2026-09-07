"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Building2, Briefcase, MapPin, Link2, DollarSign, Calendar } from "lucide-react";

export default function AddApplicationModal({ isOpen, onClose, onAddApplication }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      company: "",
      role: "",
      location: "",
      jobUrl: "",
      salaryMin: "",
      salaryMax: "",
      status: "Applied",
      priority: "Normal",
      appliedDate: new Date().toISOString().split("T")[0],
    },
  });

  // Handle ESC key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        onClose();
      }
    }
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
    // Format salary string nicely if entered
    let formattedSalary = "";
    if (data.salaryMin && data.salaryMax) {
      formattedSalary = `$${data.salaryMin}k - $${data.salaryMax}k`;
    } else if (data.salaryMin) {
      formattedSalary = `$${data.salaryMin}k+`;
    }

    const uniqueId = typeof crypto !== "undefined" && crypto.randomUUID ? `app-${crypto.randomUUID().slice(0, 8)}` : `app-${Math.random().toString(36).slice(2, 9)}`;

    const newApp = {
      id: uniqueId,
      company: data.company.trim(),
      role: data.role.trim(),
      location: data.location.trim() || "Remote",
      salary: formattedSalary || "Competitive",
      status: data.status,
      priority: data.priority,
      category: data.status === "Rejected" || data.status === "Withdrawn" ? "archived" : "active",
      updatedAt: "Just now",
      initial: data.company.trim()[0].toUpperCase(),
      avatarBg: "bg-[#1D1D1F] text-white",
      jobUrl: data.jobUrl.trim(),
      appliedDate: data.appliedDate,
    };

    onAddApplication(newApp);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-150 animate-in fade-in"
      />

      {/* Modal Window Sheet */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.15),0_1px_3px_rgba(0,0,0,0.08)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        {/* Title Bar */}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4 text-xs text-[#1D1D1F]">
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
                  placeholder="e.g. Apple, Figma"
                  {...register("company", { required: "Company is required" })}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
              {errors.company && (
                <p className="text-[10px] text-[#FF3B30] mt-0.5">{errors.company.message}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">
                Job Title <span className="text-[#FF3B30]">*</span>
              </label>
              <div className="relative">
                <Briefcase className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. UI Engineer"
                  {...register("role", { required: "Role is required" })}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
              {errors.role && (
                <p className="text-[10px] text-[#FF3B30] mt-0.5">{errors.role.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Location */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">Location</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="text"
                  placeholder="e.g. San Francisco (Remote)"
                  {...register("location")}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
            </div>

            {/* Job URL */}
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">Job Posting URL</label>
              <div className="relative">
                <Link2 className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="url"
                  placeholder="https://..."
                  {...register("jobUrl")}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
            </div>
          </div>

          {/* Salary Min & Max */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">Salary Min (k)</label>
              <div className="relative">
                <DollarSign className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="number"
                  placeholder="140"
                  {...register("salaryMin")}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">Salary Max (k)</label>
              <div className="relative">
                <DollarSign className="w-3.5 h-3.5 text-[#8E8E93] absolute left-2.5 top-2.5 pointer-events-none" />
                <input
                  type="number"
                  placeholder="180"
                  {...register("salaryMax")}
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
                />
              </div>
            </div>
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">Status</label>
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

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">Priority</label>
              <select
                {...register("priority")}
                className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-[#555558]">Applied Date</label>
              <input
                type="date"
                {...register("appliedDate")}
                className="w-full px-2.5 py-1.5 rounded-lg border border-black/[0.12] bg-[#FBFBFD] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/20 focus:border-[#0071E3] transition-all text-xs"
              />
            </div>
          </div>

          {/* Footer Actions */}
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
              className="px-4 py-1.5 rounded-lg bg-[#1D1D1F] hover:bg-[#2D2D30] text-white text-xs font-medium shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/10 transition-all active:scale-[0.98]"
            >
              Add Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
