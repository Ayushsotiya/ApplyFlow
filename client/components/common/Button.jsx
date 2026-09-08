import Link from "next/link";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  fullWidth = false,
  icon: Icon,
  iconPosition = "right",
  disabled = false,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium select-none transition-all duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3]/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.985]";

  const variants = {
    // Apple signature dark charcoal button
    primary:
      "bg-[#1D1D1F] text-white hover:bg-[#2D2D30] active:bg-[#111112] shadow-[0_1px_2px_rgba(0,0,0,0.08)] border border-black/5",
    // Apple system blue action button
    accent:
      "bg-[#0071E3] text-white hover:bg-[#0077ED] active:bg-[#0062C4] shadow-[0_1px_2px_rgba(0,113,227,0.2)] border border-[#0071E3]/20",
    // Apple secondary light card button
    secondary:
      "bg-white text-[#1D1D1F] hover:bg-[#F5F5F7] active:bg-[#EBEBED] border border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
    // Apple subtle ghost button
    ghost:
      "text-[#1D1D1F] hover:bg-black/[0.04] active:bg-black/[0.08] border border-transparent",
    // Apple outline button
    outline:
      "bg-transparent text-[#1D1D1F] border border-black/15 hover:border-black/30 hover:bg-black/[0.02]",
    // Text link
    link: "text-[#0071E3] hover:underline p-0 h-auto font-normal active:scale-100",
  };

  const sizes = {
    sm: "text-xs px-3.5 py-1.5 rounded-lg gap-1.5 h-8",
    md: "text-sm px-4 py-2 rounded-xl gap-2 h-10",
    lg: "text-[15px] px-5 py-2.5 rounded-xl gap-2.5 h-11",
  };

  const appliedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${
    variant === "link" ? "" : sizes[size] || sizes.md
  } ${fullWidth ? "w-full" : ""} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={appliedClasses} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={appliedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
