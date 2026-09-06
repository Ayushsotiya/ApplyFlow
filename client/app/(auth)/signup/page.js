
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData } from '@/redux/authSlice';
import { sendOtp } from "@/services/operations/auth";
import {
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      dispatch(setSignupData(data));
      await dispatch(sendOtp(data.email, router));
    } catch (err) {
      console.error("Error sending OTP:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFB] text-[#1D1D1F]">

      {/* Desktop Left Showcase Pane */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F5F5F7] border-r border-black/[0.07] p-12 flex-col justify-between relative overflow-hidden">

        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10">
          <Logo size="md" />
        </div>

        {/* Middle Feature Highlights */}
        <div className="relative z-10 max-w-md my-auto">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] text-xs font-medium text-[#1D1D1F] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#107C41]" />
            Free for individual job seekers
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1F] leading-snug mb-4">
            Everything you need to master your search.
          </h2>

          <p className="text-sm leading-relaxed text-[#86868B] mb-8">
            Experience the peace of mind of having your interview schedules,
            notes, resumes, and follow-ups in an Apple-quality desktop
            experience.
          </p>

          {/* Value List */}
          <div className="space-y-3 bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-black/[0.06] shadow-xs">

            <div className="flex items-center gap-3 text-xs text-[#1D1D1F]">
              <span className="w-5 h-5 rounded-full bg-[#E8F8EE] text-[#107C41] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </span>
              <span>Unlimited application logging & stage tracking</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#1D1D1F]">
              <span className="w-5 h-5 rounded-full bg-[#E8F8EE] text-[#107C41] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </span>
              <span>Interview preparation notes & salary comparisons</span>
            </div>

            <div className="flex items-center gap-3 text-xs text-[#1D1D1F]">
              <span className="w-5 h-5 rounded-full bg-[#E8F8EE] text-[#107C41] flex items-center justify-center shrink-0">
                <Check className="w-3 h-3" />
              </span>
              <span>Zero clutter, zero ads, 100% focused UI</span>
            </div>

          </div>
        </div>

        {/* Bottom Note */}
        <div className="relative z-10 text-xs text-[#86868B] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#86868B]" />
          <span>Encrypted data & Apple-inspired simplicity</span>
        </div>
      </div>

      {/* Right Form Pane */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10">

        <div className="w-full max-w-[420px] bg-white lg:bg-transparent rounded-3xl lg:rounded-none p-8 sm:p-10 lg:p-0 border lg:border-none border-black/[0.07] shadow-xl lg:shadow-none">

          {/* Mobile Logo */}
          <div className="mb-8 flex justify-center lg:justify-start">
            <Logo size="md" />
          </div>

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Create your account
            </h1>

            <p className="text-sm text-[#86868B] mt-1.5">
              Start organizing your job search today.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-medium text-[#1D1D1F] mb-1.5"
              >
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Jane Doe"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15 transition-all duration-150"
              />

              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

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
                placeholder="jane@example.com"
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
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[#1D1D1F] mb-1.5"
              >
                Password
              </label>

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
                    showPassword ? "Hide password" : "Show password"
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

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-xs font-medium text-[#1D1D1F] mb-1.5"
              >
                Confirm password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-black/[0.12] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15 transition-all duration-150"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] transition-colors focus:outline-none"
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword.message}
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
                {loading ? "Sending verification code..." : "Create account"}
              </Button>
            </div>

          </form>

          {/* Terms */}
          <p className="mt-4 text-[11px] text-center text-[#86868B] leading-relaxed">
            By clicking "Create account", you agree to our{" "}
            <Link href="/" className="underline hover:text-[#1D1D1F]">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/" className="underline hover:text-[#1D1D1F]">
              Privacy Policy
            </Link>.
          </p>

          {/* Login */}
          <div className="mt-6 text-center text-xs text-[#86868B]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#0071E3] font-medium hover:underline ml-1"
            >
              Sign in
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

