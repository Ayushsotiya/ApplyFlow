import Link from "next/link";

export default function Logo({ size = "md", iconOnly = false, href = "/" }) {
  const sizeClasses = {
    sm: {
      icon: "w-7 h-7 rounded-lg text-xs",
      text: "text-base",
      subtext: "text-[10px]",
    },
    md: {
      icon: "w-9 h-9 rounded-[10px] text-sm",
      text: "text-lg",
      subtext: "text-[11px]",
    },
    lg: {
      icon: "w-11 h-11 rounded-xl text-base",
      text: "text-xl",
      subtext: "text-xs",
    },
  }[size] || {
    icon: "w-9 h-9 rounded-[10px] text-sm",
    text: "text-lg",
    subtext: "text-[11px]",
  };

  const content = (
    <div className="inline-flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Apple-style squircle icon with subtle gradient and inner glow */}
      <div
        className={`${sizeClasses.icon} relative flex items-center justify-center bg-gradient-to-b from-[#1D1D1F] to-[#0A0A0A] text-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-black/10 transition-transform duration-200 group-hover:scale-[1.03] active:scale-[0.98] overflow-hidden`}
      >
        {/* Subtle glass reflection highlight */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

        {/* Minimal geometric flow symbol (representing stages / cards flowing upward) */}
        <svg
          className="w-4/7 h-4/7 relative z-10"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 16.5C4 16.5 8 13.5 12 13.5C16 13.5 20 16.5 20 16.5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          <path
            d="M4 11C4 11 8 8 12 8C16 8 20 11 20 11"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeOpacity="0.75"
          />
          <path
            d="M8 5.5L12 2.5L16 5.5"
            stroke="#0071E3"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span
            className={`${sizeClasses.text} font-semibold tracking-[-0.02em] text-[#1D1D1F] transition-colors`}
          >
            Apply<span className="text-[#0071E3]">Flow</span>
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
