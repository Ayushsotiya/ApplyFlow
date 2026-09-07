"use client";

import Link from "next/link";
import { Plus, ListFilter, FolderKanban, ChevronRight } from "lucide-react";

export default function QuickActions({ onOpenAddModal }) {
  const actions = [
    {
      id: "add",
      label: "Add New Application",
      icon: Plus,
      onClick: onOpenAddModal,
      isButton: true,
      highlight: true,
    },
    {
      id: "view-all",
      label: "View All Applications",
      icon: ListFilter,
      href: "/applications",
    },
    {
      id: "manage-collections",
      label: "Manage Collections",
      icon: FolderKanban,
      href: "/applications?view=collections",
    },
  ];

  return (
    <div className="bg-white border border-black/[0.07] rounded-xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="text-[13px] font-semibold text-[#1D1D1F] mb-2.5 pb-2 border-b border-black/[0.06]">
        Quick Actions
      </div>

      <div className="space-y-1">
        {actions.map((action) => {
          const Icon = action.icon;
          const content = (
            <div className="w-full flex items-center justify-between p-2 rounded-lg text-xs text-[#555558] hover:text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors cursor-pointer group">
              <div className="flex items-center gap-2.5">
                <div
                  className={`p-1 rounded-md border ${
                    action.highlight
                      ? "bg-[#1D1D1F] text-white border-black/10"
                      : "bg-[#F5F5F7] text-[#555558] border-black/[0.05]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">{action.label}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#8E8E93] group-hover:translate-x-0.5 transition-transform" />
            </div>
          );

          if (action.isButton) {
            return (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className="w-full text-left"
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={action.id} href={action.href} className="block">
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
