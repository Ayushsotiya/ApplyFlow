export default function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  actionText,
}) {
  return (
    <div className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-black/[0.07] shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-black/[0.12] transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Apple macOS style squircle icon container */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#F5F5F7] border border-black/[0.04] flex items-center justify-center text-[#1D1D1F] transition-all duration-200 group-hover:scale-105 group-hover:bg-[#EBEBED]">
            {Icon && <Icon className="w-5 h-5 text-[#1D1D1F]" strokeWidth={1.8} />}
          </div>
          {badge && (
            <span className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-1 rounded-full bg-black/[0.04] text-[#86868B]">
              {badge}
            </span>
          )}
        </div>

        {/* Feature Title & Description */}
        <h3 className="text-[17px] font-semibold text-[#1D1D1F] tracking-[-0.01em] mb-2 group-hover:text-black transition-colors">
          {title}
        </h3>
        <p className="text-[14px] leading-relaxed text-[#86868B]">
          {description}
        </p>
      </div>

      {actionText && (
        <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center justify-between text-xs font-medium text-[#1D1D1F]/70 group-hover:text-[#0071E3] transition-colors">
          <span>{actionText}</span>
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </div>
      )}
    </div>
  );
}
