"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import DashboardPreview from "@/components/DashboardPreview";
import { LogOut, User } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // If not authenticated, redirect to login
    const localToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token && !localToken) {
      router.push("/login");
    }
  }, [token, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#1D1D1F]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-black/[0.06] px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="md" />
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#F5F5F7] border border-black/[0.05]">
              {user.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.name || "User"}
                  className="w-6 h-6 rounded-full"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-[#0071E3] text-white flex items-center justify-center text-xs font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
                </div>
              )}
              <span className="text-xs font-medium text-[#1D1D1F]">
                {user.name || user.email}
              </span>
            </div>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            icon={LogOut}
            className="text-xs"
          >
            Sign out
          </Button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Welcome back{user?.name ? `, ${user.name}` : ""}
            </h1>
            <p className="text-sm text-[#86868B] mt-1">
              Here is what's happening with your job applications today.
            </p>
          </div>
        </div>

        {/* Render Dashboard Workspace */}
        <DashboardPreview />
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-black/[0.05] text-center text-xs text-[#86868B]">
        ApplyFlow • Modern Career Application Management
      </footer>
    </div>
  );
}
