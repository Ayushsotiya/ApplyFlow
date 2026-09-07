"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import Logo from "@/components/Logo";
import {
  Layers,
  Calendar,
  CheckCircle2,
  Settings,
  LogOut,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";

export default function DashboardSidebar({
  activeNav = "all",
  onSelectNav,
  applicationsCount = 28,
  interviewsCount = 5,
  offersCount = 2,
  collections = [],
  activeCollection = null,
  onSelectCollection,
  mobileOpen = false,
  onCloseMobile,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const displayName = user?.name || user?.email?.split("@")[0] || "Ayush Sotiya";
  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const navItems = [
    {
      id: "all",
      label: "All Applications",
      count: applicationsCount,
      icon: Layers,
      href: "/dashboard",
    },
    {
      id: "interviews",
      label: "Interviews",
      count: interviewsCount,
      icon: Calendar,
      href: "/dashboard?view=interviews",
    },
    {
      id: "offers",
      label: "Offers",
      count: offersCount,
      icon: CheckCircle2,
      href: "/dashboard?view=offers",
      countHighlight: "bg-[#ECF7ED] text-[#1E722D] border-[#C8E8CC]",
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-[240px] shrink-0 bg-[#F7F7F9] border-r border-black/[0.08] flex flex-col justify-between transition-transform duration-200 ease-out md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-3.5 space-y-5 overflow-y-auto">
          {/* Top Logo & App Title */}
          <div className="px-2 pt-1 pb-1">
            <Logo size="sm" href="/dashboard" />
          </div>

          {/* Section: Tracker */}
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider px-2 mb-1">
              Tracker
            </div>
            <div className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (onSelectNav) onSelectNav(item.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-[#EAEAEA] text-[#1D1D1F] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                        : "text-[#555558] hover:bg-black/[0.04] hover:text-[#1D1D1F]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`w-3.5 h-3.5 ${
                          isActive ? "text-[#0071E3]" : "text-[#8E8E93]"
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>
                    <span
                      className={`text-[11px] font-mono px-1.5 py-0.5 rounded-md border ${
                        item.countHighlight
                          ? item.countHighlight
                          : isActive
                          ? "bg-white text-[#1D1D1F] border-black/[0.08]"
                          : "text-[#8E8E93] border-transparent"
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Collections */}
          <div className="space-y-1">
            <div className="text-[11px] font-semibold text-[#8E8E93] uppercase tracking-wider px-2 mb-1">
              Collections
            </div>
            <div className="space-y-0.5">
              {collections.map((col) => {
                const isSelected = activeCollection === col.id;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => {
                      if (onSelectCollection) onSelectCollection(col.id);
                      if (onCloseMobile) onCloseMobile();
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? "bg-[#EAEAEA] text-[#1D1D1F] font-semibold"
                        : "text-[#555558] hover:bg-black/[0.04] hover:text-[#1D1D1F]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: col.dotColor || "#0071E3" }}
                      />
                      <span className="truncate">{col.name}</span>
                    </div>
                    {col.count !== undefined && (
                      <span className="text-[10px] text-[#8E8E93] font-mono">
                        {col.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Sidebar: Settings, User Profile & iCloud Sync */}
        <div className="p-3 border-t border-black/[0.08] bg-[#F7F7F9] space-y-2">
          {/* Settings link */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs text-[#555558] hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-colors"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-3.5 h-3.5 text-[#8E8E93]" />
              <span>Settings</span>
            </div>
            <ChevronRight className="w-3 h-3 text-[#8E8E93]" />
          </button>

          {/* User Profile bar */}
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg bg-white/70 border border-black/[0.06]">
            <div className="flex items-center gap-2 min-w-0">
              {user?.profile_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.profile_image}
                  alt={displayName}
                  className="w-6 h-6 rounded-full shrink-0 object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[10px] font-medium shrink-0">
                  {userInitials}
                </div>
              )}
              <div className="truncate text-left">
                <div className="text-[11px] font-medium text-[#1D1D1F] truncate leading-tight">
                  {displayName}
                </div>
                <div className="text-[10px] text-[#8E8E93] truncate leading-tight">
                  {user?.email || "apple.developer@icloud.com"}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className="p-1 rounded text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* iCloud Sync Status */}
          <div className="flex items-center justify-between px-2 py-0.5 text-[11px] text-[#8E8E93]">
            <div className="flex items-center gap-1.5">
              <span>Syncing iCloud</span>
            </div>
            <span
              className="w-2 h-2 rounded-full bg-[#34C759] shadow-[0_0_6px_rgba(52,199,89,0.5)]"
              title="iCloud sync active and healthy"
            />
          </div>
        </div>
      </aside>
    </>
  );
}
