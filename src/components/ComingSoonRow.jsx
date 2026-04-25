import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import * as Icons from "lucide-react";

// A visually-similar row to ProductRow but with placeholder cards for a department that's not yet stocked.
export default function ComingSoonRow({
  title,
  subtitle,
  badge = "Coming Soon",
  icon,
  placeholders = [],   // array of { name, icon, hint }
}) {
  const HeaderIcon = icon ? Icons[icon] : null;
  return (
    <section className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        <div className="flex items-end justify-between gap-3 mb-4">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-1.5 text-coral-500 bg-coral-500/10 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-2">
              <Lock size={11} /> {badge}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink-900 font-display flex items-center gap-2 truncate">
              {HeaderIcon && <HeaderIcon size={20} className="text-coral-500" />}
              {title}
            </h2>
            {subtitle && <p className="text-ink-500 text-xs sm:text-sm mt-0.5">{subtitle}</p>}
          </div>
          <Link to="/contact" className="text-coral-500 hover:text-coral-600 font-semibold text-xs flex items-center gap-1 shrink-0">
            Get Notified <ArrowRight size={12} />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {placeholders.map((p, i) => {
            const Icon = Icons[p.icon] || Icons.ShoppingBag;
            return (
              <div key={i}
                className="shrink-0 w-[150px] sm:w-[170px] md:w-[180px] bg-white border border-dashed border-ink-200 rounded-2xl overflow-hidden flex flex-col">
                <div className="aspect-square bg-cream-100 flex items-center justify-center text-ink-400 relative">
                  <Icon size={48} strokeWidth={1.2} />
                  <span className="absolute top-2 left-2 bg-coral-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                </div>
                <div className="p-2.5">
                  <div className="text-[9px] font-semibold uppercase tracking-wide text-ink-500">
                    {title}
                  </div>
                  <div className="font-bold text-ink-900 text-xs line-clamp-2 min-h-[2.4em] leading-snug">
                    {p.name}
                  </div>
                  <div className="text-[10px] text-coral-500 font-bold uppercase tracking-wide mt-1.5">
                    Coming 2026
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
