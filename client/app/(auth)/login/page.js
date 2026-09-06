"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import { Eye, EyeOff, ArrowRight, CheckCircle2, Shield } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Static UI only: No auth logic or API call
  };

  return (
    <div className="min-h-screen flex bg-[#FAFAFB] text-[#1D1D1F]">
      {/* Desktop Left Showcase Pane */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F5F5F7] border-r border-black/[0.07] p-12 flex-col justify-between relative overflow-hidden">
        {/* Subtle background glow effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/60 rounded-full blur-3xl pointer-events-none" />

        {/* Top Logo */}
        <div className="relative z-10">
          <Logo size="md" />
        </div>

        {/* Middle Value Proposition Card */}
        <div className="relative z-10 max-w-md my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] text-xs font-medium text-[#1D1D1F] mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
            Apple-level craftsmanship
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1D1D1F] leading-snug mb-4">
            A quiet, distraction-free space for your career ambition.
          </h2>
          <p className="text-sm leading-relaxed text-[#86868B] mb-8">
            Manage every application, screening round, salary discussion, and note
            with the calm clarity of a native desktop tool.
          </p>

          {/* Mini preview card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-black/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="flex items-center justify-between text-xs text-[#86868B] mb-2">
              <span className="font-medium text-[#1D1D1F]">Upcoming Interview</span>
              <span className="text-[#0071E3] font-medium">Tomorrow, 10:00 AM</span>
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

        {/* Bottom Security Note */}
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

          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F]">
              Welcome back
            </h1>
            <p className="text-sm text-[#86868B] mt-1.5">
              Sign in to continue to your job search.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
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
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-black/[0.12] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15 transition-all duration-150"
              />
            </div>

            {/* Password Field */}
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-black/[0.12] bg-white text-sm text-[#1D1D1F] placeholder:text-[#86868B]/60 focus:outline-none focus:border-[#0071E3] focus:ring-4 focus:ring-[#0071E3]/15 transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#86868B] hover:text-[#1D1D1F] transition-colors focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                icon={ArrowRight}
              >
                Sign in
              </Button>
            </div>
          </form>

          {/* Bottom Prompt */}
          <div className="mt-8 text-center text-xs text-[#86868B]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#0071E3] font-medium hover:underline ml-1"
            >
              Create account
            </Link>
          </div>

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
