import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import * as Icons from "lucide-react";
import ProductCard from "./ProductCard.jsx";

export default function ProductRow({
  title,
  subtitle,
  badge,        // optional small uppercase chip e.g. "Trending"
  badgeColor = "coral",
  icon,         // lucide icon name string
  products,
  viewAllTo = "/products",
  bg = "bg-cream-50",
  cardVariant = "compact",
}) {
  const scrollRef = useRef(null);
  const Icon = icon ? Icons[icon] : null;

  if (!products?.length) return null;

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  const badgeClasses = {
    coral: "text-coral-500 bg-coral-500/10",
    leaf:  "text-leaf-600 bg-leaf-500/10",
    ink:   "text-ink-700 bg-ink-100",
  }[badgeColor] || "text-coral-500 bg-coral-500/10";

  return (
    <section className={bg}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        <div className="flex items-end justify-between gap-3 mb-4">
          <div className="min-w-0">
            {badge && (
              <div className={`inline-flex items-center gap-1.5 ${badgeClasses} text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-2`}>
                {Icon && <Icon size={11} />}
                {badge}
              </div>
            )}
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink-900 font-display truncate">
              {title}
            </h2>
            {subtitle && <p className="text-ink-500 text-xs sm:text-sm mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button onClick={() => scroll(-1)} aria-label="Scroll left"
              className="hidden sm:flex w-8 h-8 rounded-full bg-white border border-ink-200 hover:border-coral-500 items-center justify-center text-ink-700 hover:text-coral-500">
              <ChevronLeft size={16} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll right"
              className="hidden sm:flex w-8 h-8 rounded-full bg-white border border-ink-200 hover:border-coral-500 items-center justify-center text-ink-700 hover:text-coral-500">
              <ChevronRight size={16} />
            </button>
            <Link to={viewAllTo} className="text-coral-500 hover:text-coral-600 font-semibold text-xs flex items-center gap-1 ml-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((p) => (
            <div key={p.id} className="snap-start shrink-0 w-[150px] sm:w-[170px] md:w-[180px]">
              <ProductCard product={p} variant={cardVariant} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
