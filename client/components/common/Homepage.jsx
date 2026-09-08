import Navbar from "@/components/common/Navbar";
import Button from "@/components/common/Button";
import DashboardPreview from "@/components/DashboardPreview";
import FeatureCard from "@/components/FeatureCard";
import Logo from "@/components/common/Logo";
import Link from "next/link";
import {
    Briefcase,
    Layers,
    FileText,
    LayoutDashboard,
    ArrowRight,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
    Zap,
} from "lucide-react";

export default function Home() {
    const features = [
        {
            icon: Briefcase,
            title: "Track Applications",
            description:
                "Keep every application organized in one place. No more lost spreadsheets or messy inbox search folders.",
            badge: "Core",
        },
        {
            icon: Layers,
            title: "Application Status",
            description:
                "Easily see which opportunities are applied, interviewing, offered, or rejected at a glance with clear stage indicators.",
            badge: "Workflow",
        },
        {
            icon: FileText,
            title: "Notes & Details",
            description:
                "Keep important interview notes, salary information, recruiter contacts, and job descriptions securely together.",
            badge: "Clarity",
        },
        {
            icon: LayoutDashboard,
            title: "Simple Dashboard",
            description:
                "Get a quick, distraction-free overview of your entire job search metrics and upcoming milestones.",
            badge: "Overview",
        },
    ];

    const steps = [
        {
            number: "01",
            title: "Add your applications",
            description:
                "Quickly log company details, role specifications, compensation, and relevant links in seconds.",
            detail: "1-click quick entry",
        },
        {
            number: "02",
            title: "Track your progress",
            description:
                "Move opportunities through stages: Screening, Technical rounds, Final loops, and Offers.",
            detail: "Clean visual pipeline",
        },
        {
            number: "03",
            title: "Land your next opportunity",
            description:
                "Compare offers, negotiate with clear data, and accept the role that best fits your career goals.",
            detail: "Data-backed decisions",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#FAFAFB] selection:bg-[#0071E3]/20">
            {/* Navigation */}
            <Navbar />

            <main className="flex-1">
                {/* HERO SECTION */}
                <section className="pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-center">
                    {/* Subtle Apple-style Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-[0_1px_3px_rgba(0,0,0,0.03)] mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
                        <span className="text-xs font-medium text-[#1D1D1F]">
                            Your job search, organized.
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-[-0.035em] text-[#1D1D1F] max-w-3xl mx-auto leading-[1.08] mb-5">
                        Turn your job search into a system.
                    </h1>

                    {/* Supporting Text */}
                    <p className="text-base sm:text-lg md:text-xl text-[#86868B] max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-10 font-normal">
                        Track applications, manage opportunities, and stay organized throughout
                        your job search — all in one simple workspace.
                    </p>

                    {/* Hero Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-16 sm:mb-20">
                        <Button
                            href="/signup"
                            variant="primary"
                            size="lg"
                            className="w-full sm:w-auto px-7"
                            icon={ArrowRight}
                        >
                            Get Started
                        </Button>
                        <Button
                            href="/login"
                            variant="secondary"
                            size="lg"
                            className="w-full sm:w-auto px-7"
                        >
                            Log in
                        </Button>
                    </div>

                    {/* Static Application Window Mockup */}
                    <div className="relative max-w-5xl mx-auto">
                        {/* Subtle ambient lighting behind window */}
                        <div className="absolute -inset-4 bg-gradient-to-b from-black/[0.02] to-transparent rounded-3xl blur-2xl pointer-events-none" />
                        <DashboardPreview />
                    </div>
                </section>

                {/* FEATURES SECTION */}
                <section
                    id="features"
                    className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto scroll-mt-12"
                >
                    <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
                        <div className="text-xs font-semibold text-[#0071E3] uppercase tracking-wider mb-2">
                            Capabilities
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.025em] text-[#1D1D1F]">
                            Everything you need to stay on top of your applications.
                        </h2>
                        <p className="text-[#86868B] text-base mt-3">
                            Crafted with restraint. Every tool you need, none of the clutter you don't.
                        </p>
                    </div>

                    {/* 4 Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                        {features.map((item) => (
                            <FeatureCard
                                key={item.title}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                badge={item.badge}
                            />
                        ))}
                    </div>
                </section>

                {/* HOW IT WORKS SECTION */}
                <section
                    id="how-it-works"
                    className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-t border-black/[0.06] bg-white/60 scroll-mt-12"
                >
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
                            <div className="text-xs font-semibold text-[#86868B] uppercase tracking-wider mb-2">
                                Simple Workflow
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.025em] text-[#1D1D1F]">
                                How It Works
                            </h2>
                            <p className="text-[#86868B] text-base mt-3">
                                A streamlined three-step rhythm to maintain momentum.
                            </p>
                        </div>

                        {/* 3 Step Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                            {steps.map((step) => (
                                <div
                                    key={step.number}
                                    className="bg-white rounded-2xl p-7 border border-black/[0.07] shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:border-black/[0.12] transition-all"
                                >
                                    <div>
                                        {/* Step Number in Apple-style monospaced numeric pill */}
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#F5F5F7] border border-black/[0.04] text-sm font-semibold font-mono text-[#1D1D1F] mb-6">
                                            {step.number}
                                        </div>

                                        <h3 className="text-lg font-semibold text-[#1D1D1F] tracking-tight mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm leading-relaxed text-[#86868B]">
                                            {step.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-black/[0.05] flex items-center justify-between text-xs text-[#86868B]">
                                        <span>{step.detail}</span>
                                        <CheckCircle2 className="w-4 h-4 text-[#0071E3]" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Call to Action Card */}
                        <div className="mt-16 bg-[#1D1D1F] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.1)]">
                            {/* Subtle specular reflection */}
                            <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                                Ready to take control of your career search?
                            </h3>
                            <p className="text-[#86868B] text-sm sm:text-base max-w-xl mx-auto mb-6">
                                Join focused job seekers tracking applications with precision and calm.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Button
                                    href="/signup"
                                    variant="secondary"
                                    size="lg"
                                    className="w-full sm:w-auto px-7"
                                    icon={ArrowRight}
                                >
                                    Get Started for Free
                                </Button>
                                <Button
                                    href="/login"
                                    variant="ghost"
                                    size="lg"
                                    className="w-full sm:w-auto text-white hover:bg-white/10 hover:text-white"
                                >
                                    Sign in
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="border-t border-black/[0.06] bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Logo size="sm" />
                        <span className="text-xs text-[#86868B] pl-2 border-l border-black/[0.1]">
                            Engineered for productivity
                        </span>
                    </div>

                    <div className="flex items-center gap-6 text-xs text-[#86868B]">
                        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
                            Privacy
                        </Link>
                        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
                            Terms
                        </Link>
                        <Link href="/" className="hover:text-[#1D1D1F] transition-colors">
                            Security
                        </Link>
                        <span>© {new Date().getFullYear()} ApplyFlow</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
