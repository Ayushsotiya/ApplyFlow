"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { logout } from "@/redux/authSlice";
import {
  fetchCollections,
  createCollection,
} from "@/services/operations/collections";
import { fetchDashboard } from "@/services/operations/jobs";
import Logo from "@/components/common/Logo";
import SettingsModal from "./SettingsModal";

import {
  Layers,
  Calendar,
  CheckCircle2,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  X,
  Home
} from "lucide-react";

export default function DashboardSidebar({

  mobileOpen = false,
  onCloseMobile,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth);

  const {
    allCollections = [],
    loading: collectionsLoading,
  } = useSelector((state) => state.collections);

  const { dashboard } = useSelector((state) => state.jobs);


  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // =========================
  // React Hook Form
  // =========================

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  // =========================
  // Fetch Dashboard + Collections
  // =========================

  useEffect(() => {
    if (token) {
      dispatch(fetchCollections(token));
      dispatch(fetchDashboard(token));
    }
  }, [token, dispatch]);



  const openCreateModal = () => {
    reset();
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    if (isSubmitting) return;
    reset();
    setIsCreateModalOpen(false);
  };


  const createCollectionHandler = async (formData) => {
    try {
      if (!token) return;
      await dispatch(createCollection(token, formData.name.trim()));
      reset();
      setIsCreateModalOpen(false);
    } catch (err) {
      console.error("Error creating collection:", err);
    }
  };

  const displayTotal = dashboard?.totalApplications ?? 0;

  const displayInterviews =
    Number(
      dashboard?.pipeline?.find(
        (item) => item.status === "Interview"
      )?.count
    ) || 0;

  const displayOffers =
    Number(
      dashboard?.pipeline?.find(
        (item) => item.status === "Offer"
      )?.count
    ) || 0;


  const displayName =
    user?.name ||
    user?.email?.split("@")[0] ||
    "Ayush Sotiya";

  const userInitials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const activeNav = pathname === "/dashboard" ? "Recent" : pathname === "/dashboard/all-applications" ? "all" : pathname === "/dashboard/interviews" ?
    "interviews"
    : pathname === "/dashboard/offers"
      ? "offers"
      : null;


  const navItems = [
    {
      id: "Recent",
      label: "Recent",
      icon: Home,
      link: "/dashboard",
    },
    {
      id: "all",
      label: "All Applications",
      count: displayTotal,
      icon: Layers,
      link: "/dashboard/all-applications"
    },
    {
      id: "interviews",
      label: "Interviews",
      count: displayInterviews,
      icon: Calendar,
      link: "/dashboard/interview"
    },
    {
      id: "offers",
      label: "Offers",
      count: displayOffers,
      icon: CheckCircle2,
      countHighlight:
        "bg-[#ECF7ED] text-[#1E722D] border-[#C8E8CC]",
      link: "/dashboard/offer"
    },
  ];



  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/25 backdrop-blur-[2px] z-40 md:hidden"
        />
      )}



      {isCreateModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center
          bg-black/30 backdrop-blur-sm px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeCreateModal();
            }
          }}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white
            border border-black/[0.08]
            shadow-2xl p-5"
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}

            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-base font-semibold text-[#1D1D1F]">
                  Create Collection
                </h2>

                <p className="text-xs text-[#8E8E93] mt-1">
                  Create a collection to organize your applications.
                </p>
              </div>

              <button
                type="button"
                onClick={closeCreateModal}
                disabled={isSubmitting}
                className="p-1 rounded-md text-[#8E8E93]
                hover:bg-black/[0.05]
                hover:text-[#1D1D1F]
                transition-colors
                disabled:opacity-50"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Create Form */}

            <form
              onSubmit={handleSubmit(createCollectionHandler)}
            >
              {/* Collection Name */}

              <div>
                <label
                  htmlFor="collection-input"
                  className="block text-xs font-medium
                  text-[#555558] mb-1.5"
                >
                  Collection name
                </label>

                <input
                  id="collection-input"
                  type="text"
                  autoFocus
                  placeholder="e.g. Frontend Jobs"
                  {...register("name", {
                    required: "Collection name is required",
                    maxLength: {
                      value: 50,
                      message: "Maximum 50 characters",
                    },
                    validate: (value) =>
                      value.trim().length > 0 ||
                      "Collection name is required",
                  })}
                  className="w-full px-3 py-2.5 text-sm
                  rounded-lg
                  border border-black/[0.12]
                  bg-white
                  text-[#1D1D1F]
                  outline-none
                  placeholder:text-[#A1A1A6]
                  focus:border-[#0071E3]
                  focus:ring-2 focus:ring-[#0071E3]/10"
                />

                {errors.name && (
                  <p className="text-[11px] text-red-500 mt-1.5">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Buttons */}

              <div className="flex justify-end gap-2 mt-5">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  disabled={isSubmitting}
                  className="px-3.5 py-2 rounded-lg
                  text-xs font-medium
                  text-[#555558]
                  hover:bg-black/[0.05]
                  transition-colors
                  disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3.5 py-2 rounded-lg
                  text-xs font-medium
                  bg-[#0071E3]
                  text-white
                  hover:bg-[#0068D1]
                  transition-colors
                  disabled:opacity-50"
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      <aside
        className={`fixed md:static inset-y-0 left-0 z-40
        w-[240px] shrink-0
        bg-[#F7F7F9]
        border-r border-black/[0.08]
        flex flex-col justify-between
        transition-transform duration-200 ease-out
        md:translate-x-0
        ${mobileOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }`}
      >

        <div className="p-3.5 space-y-5 overflow-y-auto">

          {/* Logo */}

          <div className="px-2 pt-1 pb-1">
            <Logo size="sm" href="/dashboard" />
          </div>

          <div className="space-y-1">
            <div
              className="text-[11px] font-semibold
              text-[#8E8E93]
              uppercase tracking-wider
              px-2 mb-1"
            >
              Tracker
            </div>

            <div className="space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;

                const isActive =
                  activeNav === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      router.push(item.link)
                    }}
                    className={`w-full flex items-center
                    justify-between
                    px-2.5 py-1.5
                    rounded-lg
                    text-xs font-medium
                    transition-colors
                    ${isActive
                        ? "bg-[#EAEAEA] text-[#1D1D1F] font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]"
                        : "text-[#555558] hover:bg-black/[0.04] hover:text-[#1D1D1F]"
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        className={`w-3.5 h-3.5 ${isActive
                          ? "text-[#0071E3]"
                          : "text-[#8E8E93]"
                          }`}
                      />

                      <span>{item.label}</span>
                    </div>
                    {item.id == 'Recent' ? <></> :
                      <span
                        className={`text-[11px]
                      font-mono
                      px-1.5 py-0.5
                      rounded-md border
                      ${item.countHighlight
                            ? item.countHighlight
                            : isActive
                              ? "bg-white text-[#1D1D1F] border-black/[0.08]"
                              : "text-[#8E8E93] border-transparent"
                          }`}
                      >
                        {item.count}
                      </span>
                    }
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================
              Collections
          ========================================== */}

          <div className="space-y-1">

            {/* Collection Header */}

            <div
              className="flex items-center
              justify-between
              px-2 mb-1"
            >
              <div
                className="text-[11px]
                font-semibold
                text-[#8E8E93]
                uppercase tracking-wider"
              >
                Collections
              </div>

              {/* Add Collection */}

              <button
                type="button"
                onClick={openCreateModal}
                className="p-0.5
                rounded
                hover:bg-black/[0.06]
                text-[#8E8E93]
                hover:text-[#1D1D1F]"
                title="Create collection"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Collection List */}

            <div className="space-y-0.5">

              {/* Loading */}

              {collectionsLoading && (
                <div
                  className="px-2.5 py-2
                  text-[11px]
                  text-[#8E8E93]"
                >
                  Loading collections...
                </div>
              )}

              {/* Empty */}

              {!collectionsLoading &&
                allCollections.length === 0 && (
                  <div
                    className="px-2.5 py-2
                    text-[11px]
                    text-[#8E8E93]"
                  >
                    No collections yet
                  </div>
                )}

              {/* Collections */}

              {!collectionsLoading &&
                allCollections.map((collection) => {
                  const isSelected =
                    pathname === `/dashboard/collections/${collection.name}`;

                  return (
                    <button
                      key={collection.id}
                      type="button"
                      onClick={() => router.push(`/dashboard/collections/${collection.name}`)}
                      className={`w-full flex
                      items-center
                      justify-between
                      px-2.5 py-1.5
                      rounded-lg
                      text-xs
                      transition-colors
                      ${isSelected
                          ? "bg-[#EAEAEA] text-[#1D1D1F] font-semibold"
                          : "text-[#555558] hover:bg-black/[0.04] hover:text-[#1D1D1F]"
                        }`}
                    >
                      <div
                        className="flex items-center
                        gap-2 min-w-0"
                      >
                        <span
                          className="w-2 h-2
                          rounded-full
                          shrink-0"
                          style={{
                            backgroundColor:
                              collection.dotColor ||
                              collection.color ||
                              "#0071E3",
                          }}
                        />

                        <span className="truncate">
                          {collection.name}
                        </span>
                      </div>

                      {collection.count !==
                        undefined && (
                          <span
                            className="text-[10px]
                          text-[#8E8E93]
                          font-mono"
                          >
                            {collection.count}
                          </span>
                        )}
                    </button>
                  );
                })}
            </div>
          </div>
        </div>

        {/* =========================================
            Bottom Sidebar
        ========================================== */}

        <div
          className="p-3
          border-t border-black/[0.08]
          bg-[#F7F7F9]
          space-y-2"
        >

          {/* Settings */}

          <button
            type="button"
            className="w-full flex
            items-center
            justify-between
            px-2.5 py-1.5
            rounded-lg
            text-xs
            text-[#555558]
            hover:text-[#1D1D1F]
            hover:bg-black/[0.04]
            transition-colors cursor-pointer"
            onClick={() => setIsSettingsOpen(true)}
          >
            <div className="flex items-center gap-2">
              <Settings
                className="w-3.5 h-3.5
                text-[#8E8E93]"
              />

              <span>Settings</span>
            </div>

            <ChevronRight
              className="w-3 h-3
              text-[#8E8E93]"
            />
          </button>

          {/* User Profile */}

          <div
            className="flex items-center
            justify-between
            px-2 py-1.5
            rounded-lg
            bg-white/70
            border border-black/[0.06]"
          >
            <div
              className="flex items-center
              gap-2 min-w-0"
            >
              {user?.profile_image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.profile_image}
                  alt={displayName}
                  className="w-6 h-6
                  rounded-full
                  shrink-0
                  object-cover"
                />
              ) : (
                <div
                  className="w-6 h-6
                  rounded-full
                  bg-[#1D1D1F]
                  text-white
                  flex items-center
                  justify-center
                  text-[10px]
                  font-medium
                  shrink-0"
                >
                  {userInitials}
                </div>
              )}

              <div
                className="truncate
                text-left"
              >
                <div
                  className="text-[11px]
                  font-medium
                  text-[#1D1D1F]
                  truncate
                  leading-tight"
                >
                  {displayName}
                </div>

                <div
                  className="text-[10px]
                  text-[#8E8E93]
                  truncate
                  leading-tight"
                >
                  {user?.email ||
                    "apple.developer@icloud.com"}
                </div>
              </div>
            </div>

            {/* Logout */}

            <button
              type="button"
              onClick={handleLogout}
              title="Sign out"
              className="p-1
              rounded
              text-[#8E8E93]
              hover:text-[#1D1D1F]
              hover:bg-black/[0.05]
              transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside >

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}