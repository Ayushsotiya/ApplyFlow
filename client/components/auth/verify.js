"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/common/Logo";
import Button from "@/components/common/Button";
import OtpInput from "@/components/OtpInput";
import { sendOtp, signup } from "@/services/operations/auth";
import { useSelector, useDispatch } from "react-redux";
import {
    Mail,
    CheckCircle2,
    ArrowRight,
    RefreshCw,
} from "lucide-react";

export default function VerifyOtpPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [isSuccess, setIsSuccess] = useState(false);
    const [resendStatus, setResendStatus] = useState(false);

    const { signupData, loading } = useSelector((state) => state.auth);

    const {
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { otp: "" },
    });

    const otpValue = watch("otp") || "";

    useEffect(() => {
        if (!signupData) {
            router.push("/signup");
        }
    }, [signupData, router]);

    const onSubmit = async (data) => {
        try {
            const finalData = {
                ...signupData,
                name: signupData?.fullName || signupData?.name,
                otp: data.otp,
            };
            await dispatch(signup(finalData, router, () => setIsSuccess(true)));
        } catch (err) {
            console.error("Error during OTP verification:", err);
        }
    };

    const handleResend = async () => {
        if (!signupData?.email) {
            alert("No signup details found. Redirecting to signup...");
            router.push("/signup");
            return;
        }

        try {
            setResendStatus(true);
            await dispatch(sendOtp(signupData.email, router));
            setTimeout(() => setResendStatus(false), 3000);
        } catch (err) {
            setResendStatus(false);
        }
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
                    {/* Decorative header */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#0071E3] to-[#38BDF8]" />

                    {/* Mail Icon */}
                    <div className="mx-auto w-14 h-14 rounded-2xl bg-[#F5F5F7] border border-black/[0.06] flex items-center justify-center text-[#0071E3] mb-6 shadow-xs">
                        <Mail className="w-6 h-6" strokeWidth={1.8} />
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-2">
                        Verify your email
                    </h1>

                    <p className="text-sm text-[#86868B] leading-relaxed max-w-xs mx-auto mb-6">
                        Enter the 6-digit code we sent to{" "}
                        <span className="font-medium text-[#1D1D1F]">
                            {signupData?.email || "your email"}
                        </span>
                        .
                    </p>

                    {isSuccess ? (
                        /* SUCCESS STATE */
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
                                <Button
                                    href="/login"
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                >
                                    Proceed to Sign In
                                </Button>
                            </div>
                        </div>
                    ) : (
                        /* OTP FORM */
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* OTP Input */}
                            <OtpInput
                                length={6}
                                onComplete={(code) => {
                                    setValue("otp", code, {
                                        shouldValidate: true,
                                        shouldDirty: true,
                                    });
                                }}
                            />

                            {/* OTP validation */}
                            {errors.otp && (
                                <p className="text-xs text-red-500 mt-2">
                                    {errors.otp.message}
                                </p>
                            )}

                            {/* Resend */}
                            <div className="mt-6 mb-6 flex items-center justify-center gap-1.5 text-xs text-[#86868B]">
                                <span>Didn't receive the code?</span>

                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={resendStatus || loading}
                                    className="text-[#0071E3] font-medium hover:underline focus:outline-none flex items-center gap-1 cursor-pointer disabled:opacity-60"
                                >
                                    {resendStatus ? (
                                        <span className="text-[#107C41] flex items-center gap-1">
                                            <RefreshCw className="w-3 h-3 animate-spin" />
                                            Sent new code
                                        </span>
                                    ) : (
                                        "Resend code"
                                    )}
                                </button>
                            </div>

                            {/* Verify */}
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                fullWidth
                                disabled={loading || otpValue.length !== 6}
                                icon={ArrowRight}
                            >
                                {loading ? "Verifying..." : "Verify email"}
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

                        <Link
                            href="/"
                            className="hover:text-[#1D1D1F] transition-colors"
                        >
                            Return Home
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-[11px] text-[#86868B]">
                ApplyFlow • Apple-inspired Career Management
            </footer>
        </div>
    );
}
