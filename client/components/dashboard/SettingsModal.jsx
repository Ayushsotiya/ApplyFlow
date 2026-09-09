"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  X,
  Sun,
  Moon,
  Laptop,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Check,
  Loader2,
  Shield,
  Palette,
} from "lucide-react";
import { changePassword, deleteAccount } from "@/services/operations/auth";
import toast from "react-hot-toast";

export default function SettingsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("theme");

  // Theme state
  const [theme, setTheme] = useState("system");

  // Change Password state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Delete Account state
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Read saved theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") || "system";
      setTheme(savedTheme);
    }
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Apply Theme Handler
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
    const root = document.documentElement;
    if (selectedTheme === "dark") {
      root.classList.add("dark");
    } else if (selectedTheme === "light") {
      root.classList.remove("dark");
    } else {
      // System
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    toast.success(`Theme set to ${selectedTheme}`);
  };

  // Change Password Handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setIsChangingPassword(true);
    try {
      const success = await dispatch(changePassword(token, { oldPassword, newPassword }));
      if (success) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Delete Account Handler
  const handleDeleteAccount = async () => {
    if (deleteConfirmText.trim().toUpperCase() !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }
    setIsDeletingAccount(true);
    try {
      await dispatch(deleteAccount(token, router));
      onClose();
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const navItems = [
    { id: "theme", label: "Appearance", icon: Palette },
    { id: "security", label: "Password & Security", icon: Shield },
    { id: "danger", label: "Danger Zone", icon: AlertTriangle, danger: true },
  ];

  const themeOptions = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Laptop },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-black/[0.08] overflow-hidden flex flex-col md:flex-row max-h-[85vh]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Left Navigation Sidebar */}
        <div className="w-full md:w-52 bg-[#FBFBFD] border-b md:border-b-0 md:border-r border-black/[0.06] p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-bold text-[#1D1D1F]">Settings</h2>
              <p className="text-[11px] text-[#8E8E93] mt-0.5">Preferences & account</p>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${isActive
                        ? item.danger
                          ? "bg-[#FDF0EF] text-[#B3261E] font-semibold"
                          : "bg-white text-[#0071E3] shadow-xs font-semibold border border-black/[0.04]"
                        : item.danger
                          ? "text-[#B3261E]/80 hover:bg-[#FDF0EF]/60 hover:text-[#B3261E]"
                          : "text-[#555558] hover:bg-black/[0.04] hover:text-[#1D1D1F]"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* User badge */}
          <div className="hidden md:flex items-center gap-2 pt-3 border-t border-black/[0.06]">
            <div className="w-7 h-7 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-[#1D1D1F] truncate">{user?.name || "Account"}</p>
              <p className="text-[10px] text-[#8E8E93] truncate">{user?.email || ""}</p>
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* Header */}
          <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#1D1D1F]">
              {activeTab === "theme" && "Appearance & Theme"}
              {activeTab === "security" && "Change Password"}
              {activeTab === "danger" && "Danger Zone"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-md text-[#8E8E93] hover:text-[#1D1D1F] hover:bg-black/[0.05] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">

            {/* TAB: APPEARANCE */}
            {activeTab === "theme" && (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-[#1D1D1F]">Interface Theme</p>
                  <p className="text-[11px] text-[#8E8E93] mt-0.5">Choose how ApplyFlow looks on your device.</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {themeOptions.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => handleThemeChange(id)}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all cursor-pointer ${theme === id
                          ? "border-[#0071E3] bg-[#EDF5FD] text-[#0071E3] shadow-xs font-semibold"
                          : "border-black/[0.08] hover:border-black/[0.15] bg-[#F9F9FB] text-[#555558]"
                        }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-white border border-black/[0.07] flex items-center justify-center mb-2 shadow-xs">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium">{label}</span>
                      {theme === id && <Check className="w-3.5 h-3.5 mt-1.5 text-[#0071E3]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: SECURITY */}
            {activeTab === "security" && (
              <form onSubmit={handleChangePassword} className="space-y-4">
                <p className="text-[11px] text-[#8E8E93]">
                  Ensure your account stays secure by using a strong password.
                </p>

                {[
                  { label: "Current Password", value: oldPassword, setter: setOldPassword, show: showOldPassword, toggle: () => setShowOldPassword(!showOldPassword), placeholder: "Enter your current password" },
                  { label: "New Password", value: newPassword, setter: setNewPassword, show: showNewPassword, toggle: () => setShowNewPassword(!showNewPassword), placeholder: "At least 6 characters" },
                  { label: "Confirm New Password", value: confirmPassword, setter: setConfirmPassword, show: showConfirmPassword, toggle: () => setShowConfirmPassword(!showConfirmPassword), placeholder: "Re-type your new password" },
                ].map(({ label, value, setter, show, toggle, placeholder }) => (
                  <div key={label} className="space-y-1.5">
                    <label className="block text-xs font-medium text-[#555558]">{label}</label>
                    <div className="relative">
                      <input
                        type={show ? "text" : "password"}
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-3 py-2 pr-9 text-xs bg-white border border-black/[0.1] rounded-lg outline-none focus:border-[#0071E3] focus:ring-2 focus:ring-[#0071E3]/20 transition-all text-[#1D1D1F]"
                        required
                      />
                      <button type="button" onClick={toggle} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8E93] hover:text-[#1D1D1F]">
                        {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isChangingPassword}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0071E3] hover:bg-[#0077ED] text-white text-xs font-medium transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                  >
                    {isChangingPassword ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>Update Password</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB: DANGER ZONE */}
            {activeTab === "danger" && (
              <div className="space-y-5">
                <div className="p-3.5 rounded-xl bg-[#FDF0EF] border border-[#F8D2D0] flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-[#B3261E] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-[#B3261E]">Permanent Account Deletion</h4>
                    <p className="text-[11px] text-[#B3261E]/90 leading-relaxed">
                      This action will permanently delete your account, all recorded applications, pipeline stages, and custom collections. This cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-medium text-[#1D1D1F]">
                    To confirm, type <span className="font-bold text-[#B3261E]">DELETE</span> below:
                  </label>
                  <input
                    type="text"
                    value={deleteConfirmText}
                    onChange={(e) => setDeleteConfirmText(e.target.value)}
                    placeholder="Type DELETE"
                    className="w-full px-3 py-2 text-xs bg-white border border-black/[0.1] rounded-lg outline-none focus:border-[#B3261E] focus:ring-2 focus:ring-[#B3261E]/20 transition-all text-[#1D1D1F]"
                  />
                </div>

                <button
                  type="button"
                  disabled={deleteConfirmText.trim().toUpperCase() !== "DELETE" || isDeletingAccount}
                  onClick={handleDeleteAccount}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#B3261E] hover:bg-[#9B1E17] text-white text-xs font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                >
                  {isDeletingAccount ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  <span>Delete My Account</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
