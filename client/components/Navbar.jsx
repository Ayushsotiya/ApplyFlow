"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "./Button";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "How It Works", href: "/#how-it-works" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-black/[0.07] shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "bg-white/70 backdrop-blur-md border-b border-black/[0.05]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <Logo size="md" />
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-black/[0.02] p-1 rounded-full border border-black/[0.04]">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[13px] font-medium text-[#1D1D1F]/80 hover:text-[#1D1D1F] hover:bg-white/80 px-4 py-1.5 rounded-full transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Auth Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Button href="/login" variant="ghost" size="sm">
            Log in
          </Button>
          <Button href="/signup" variant="primary" size="sm">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button href="/signup" variant="primary" size="sm" className="text-xs px-3">
            Get Started
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-[#1D1D1F] hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-black/[0.06] bg-white/95 backdrop-blur-xl px-6 py-6 animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-[#1D1D1F] py-2.5 px-3 rounded-lg hover:bg-black/[0.03] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-black/[0.06] flex flex-col gap-2.5">
              <Button
                href="/login"
                variant="secondary"
                size="lg"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Button>
              <Button
                href="/signup"
                variant="primary"
                size="lg"
                fullWidth
                icon={ArrowRight}
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
