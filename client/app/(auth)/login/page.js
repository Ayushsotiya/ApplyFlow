
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { login } from "@/services/operations/auth";
import {
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await dispatch(login(data.email, data.password, router));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFB] text-[#1D1D1F]">

      {/* Desktop Left Showcase Pane */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F5F5F7] border-r border-black/[0.07] p-12 flex-col justify-between relative overflow-hidden">

        {/* Background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10">
          <Logo size="md" />
        </div>

        {/* Middle Value Proposition */}
        <div className="relative z-10 max-w-md my-auto">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] text-xs font-medium text-[#1D1D1F] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
            Apple-level craftsmanship
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1F] leading-snug mb-4">
            A quiet, distraction-free space for your career ambition.
          </h2>

          <p className="text-sm leading-relaxed text-[#86868B] mb-8">
            Manage every application, screening round, salary discussion,
            and note with the calm clarity of a native desktop tool.
          </p>

          {/* Mini preview card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-black/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

            <div className="flex items-center justify-between text-xs text-[#86868B] mb-2">
              <span className="font-medium text-[#1D1D1F]">
                Upcoming Interview
              </span>

              <span className="text-[#0071E3] font-medium">
                Tomorrow, 10:00 AM
              </span>
            </div>

            <div className="flex items-center gap-3">

              <div className="w-8 h-8 rounded-lg bg-[#635BFF] text-white flex items-center justify-center text-xs font-bold">
                S
              </div>

              <div>
                <div className="text-xs font-semibold text-[#1D1D1F]">
                  Stripe • Technical Architecture
                </div>

                <div className="text-[11px] text-[#86868B]">
                  Round 3 of 4 • 45 min
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="relative z-10 text-xs text-[#86868B] flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#86868B]" />
          <span>Local client-first encryption ready</span>
        </div>
      </div>

      {/* Right Form Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">

        <div className="w-full max-w-[420px] bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-8 sm:p-10 lg:p-0 border lg:border-none border-black/[0.07] shadow-xl lg:shadow-none">

          {/* Mobile Logo */}
          <div className="mb-8 flex justify-center lg:justify-start">
            <Logo size="md" />
          </div>

          {/* Heading */}
          <div className="mb-8 text-center lg:text-left">

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Welcome back
            </h1>

            <p className="text-sm text-[#86868B] mt-1.5">
              Sign in to continue to your job search.
            </p>

          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            {/* Email */}
            <div>

              <label
                htmlFor="email"
                className="block text-xs font-medium text-[#1D1D1F] mb-1.5"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15 transition-all duration-150"
              />

              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* Password */}
            <div>

              <div className="flex items-center justify-between mb-1.5">

                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-[#1D1D1F]"
                >
                  Password
                </label>

                <Link
                  href="/login"
                  className="text-xs text-[#0071E3] hover:underline"
                >
                  Forgot password?
                </Link>

              </div>

              <div className="relative">

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-black/[0.12] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15 transition-all duration-150"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] transition-colors focus:outline-none"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>

              </div>

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* Submit */}
            <div className="pt-2">

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={loading}
                icon={ArrowRight}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>

            </div>

          </form>

          {/* Signup */}
          <div className="mt-8 text-center text-xs text-[#86868B]">
            Don't have an account?{" "}

            <Link
              href="/signup"
              className="text-[#0071E3] font-medium hover:underline ml-1"
            >
              Create account
            </Link>
          </div>

          {/* Back */}
          <div className="mt-6 pt-6 border-t border-black/[0.06] text-center">

            <Link
              href="/"
              className="text-xs text-[#86868B] hover:text-[#1D1D1F] transition-colors"
            >
              ← Back to homepage
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

