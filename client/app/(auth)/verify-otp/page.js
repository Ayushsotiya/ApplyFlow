"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Button from "@/components/Button";
import OtpInput from "@/components/OtpInput";
import { Mail, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";

export default function VerifyOtpPage() {
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState(false);

  const handleVerify = (e) => {
    if (e) e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleResend = () => {
    setResendStatus(true);
    setTimeout(() => setResendStatus(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFB] text-[#1D1D1F]">
      {/* Top minimal header */}
      <header className="px-6 py-6 border-b border-black/[0.05] bg-white/60 backdrop-blur-md flex items-center justify-between">
        <Logo size="sm" />
        <Link
          href="/login"
          className="text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] transition-colors"
        >
          Sign in instead
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[460px] bg-white rounded-3xl p-8 sm:p-10 border border-black/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.04)] text-center relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Decorative subtle header background highlight */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0071E3] to-[#38BDF8]" />

          {/* Mail Icon in Apple-style Squircle */}
          <div className="mx-auto w-14 h-14 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] flex items-center justify-center text-[#0071E3] mb-6 shadow-xs">
            <Mail className="w-6 h-6" strokeWidth={1.8} />
          </div>

          {/* Heading and Subtitle */}
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-2">
            Verify your email
          </h1>
          <p className="text-sm text-[#86868B] leading-relaxed max-w-xs mx-auto mb-6">
            Enter the 6-digit code we sent to{" "}
            <span className="font-medium text-[#1D1D1F]">your email</span>.
          </p>

          {isSuccess ? (
            <div className="py-8 space-y-4 animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-full bg-[#E8F8EE] text-[#107C41] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-[#1D1D1F]">
                Email verified successfully
              </h3>
              <p className="text-xs text-[#86868B]">
                Your account is ready. Welcome to ApplyFlow.
              </p>
              <div className="pt-2">
                <Button href="/" variant="primary" size="lg" fullWidth>
                  Enter ApplyFlow
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerify}>
              {/* 6-box OTP Input */}
              <OtpInput
                length={6}
                onComplete={(code) => {
                  setOtpValue(code);
                }}
              />

              {/* Resend Code Section */}
              <div className="mt-6 mb-6 flex items-center justify-center gap-1.5 text-xs text-[#86868B]">
                <span>Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-[#0071E3] font-medium hover:underline focus:outline-none flex items-center gap-1 cursor-pointer"
                >
                  {resendStatus ? (
                    <span className="text-[#107C41] flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" /> Sent new code
                    </span>
                  ) : (
                    "Resend code"
                  )}
                </button>
              </div>

              {/* Verify Email Action Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isVerifying}
                icon={ArrowRight}
              >
                {isVerifying ? "Verifying..." : "Verify email"}
              </Button>
            </form>
          )}

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-black/[0.06] flex items-center justify-between text-xs text-[#86868B]">
            <Link
              href="/signup"
              className="hover:text-[#1D1D1F] transition-colors"
            >
              ← Change email
            </Link>
            <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="py-6 text-center text-[11px] text-[#86868B]">
        ApplyFlow • Apple-inspired Career Management
      </footer>
    </div>
  );
}
