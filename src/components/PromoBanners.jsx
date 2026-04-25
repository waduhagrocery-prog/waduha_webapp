import { Link } from "react-router-dom";
import { ArrowRight, Tag, Truck, Sparkles, Gift, Zap } from "lucide-react";

// Three full-width promo banners — Lulu-style top strip
export default function PromoBanners() {
  const banners = [
    {
      to: "/products",
      eyebrow: "Up to 30% Off",
      title: "Daily Deals",
      sub: "Refreshed every morning",
      from: "from-coral-500", to: "to-coral-700",
      icon: Tag,
    },
    {
      to: "/products",
      eyebrow: "Free Delivery",
      title: "Order anytime",
      sub: "No minimum in Al Karama",
      from: "from-leaf-600", to: "to-leaf-700",
      icon: Truck,
    },
    {
      to: "/products",
      eyebrow: "New Look",
      title: "Same Great Quality",
      sub: "Fresh stock, every week",
      from: "from-ink-800", to: "to-ink-900",
      icon: Sparkles,
    },
  ];

  return (
    <section className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-3">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {banners.map((b) => (
            <Link key={b.title} to={b.to}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${b.from} ${b.to} text-white p-5 flex items-end min-h-[140px] hover:shadow-card transition`}>
              <div className="relative z-10">
                <div className="text-[11px] font-bold uppercase tracking-wider opacity-85">{b.eyebrow}</div>
                <div className="text-2xl font-extrabold font-display leading-tight">{b.title}</div>
                <div className="text-sm opacity-85 mt-1">{b.sub}</div>
                <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold bg-white/15 backdrop-blur px-3 py-1.5 rounded-full">
                  Shop Now <ArrowRight size={12} className="group-hover:translate-x-1 transition" />
                </div>
              </div>
              <b.icon size={140} className="absolute -right-6 -bottom-6 opacity-15 group-hover:opacity-25 transition" strokeWidth={1.2} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
