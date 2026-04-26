import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Tag } from "lucide-react";

// Big rotating banner slides — Lulu uses Galaxy/festive promotions
const SLIDES = [
  {
    eyebrow: "INDULGE IN MOMENTS",
    title: "Of Premium Quality",
    sub: "Up to 45% Off",
    sub2: "Spices & Cooking Essentials",
    cta: "Shop Now",
    to: "/products?cat=spices_masala",
    bg: "bg-gradient-to-br from-amber-50 via-orange-50 to-coral-500/10",
    accent: "text-coral-600",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "FRESH DAILY",
    title: "Hand-picked Produce",
    sub: "From Farm to Door",
    sub2: "Free Delivery in Karama",
    cta: "Shop Fresh",
    to: "/products?cat=fruits_vegetables",
    bg: "bg-gradient-to-br from-leaf-500/10 via-leaf-500/5 to-cream-100",
    accent: "text-leaf-700",
    img: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "TASTE THE TREAT",
    title: "Snacks & Chocolate",
    sub: "Up to 30% Off",
    sub2: "Brands you love, prices you'll love more",
    cta: "Shop Snacks",
    to: "/products?cat=snacks",
    bg: "bg-gradient-to-br from-yellow-50 via-amber-50 to-coral-500/10",
    accent: "text-amber-700",
    img: "https://images.unsplash.com/photo-1623595119708-26b1f7500ddd?auto=format&fit=crop&w=900&q=80",
  },
  {
    eyebrow: "REFRESH EVERYDAY",
    title: "Drinks & Beverages",
    sub: "Buy 1, Get 1 Free",
    sub2: "Selected items, this week only",
    cta: "Shop Drinks",
    to: "/products?cat=beverages",
    bg: "bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100/40",
    accent: "text-sky-700",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HeroLayout() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 grid grid-cols-12 gap-3">
        {/* LEFT — coupon stack */}
        <div className="col-span-12 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
          <CouponCard
            amount="100"
            min="Min. order AED 1000"
            code="WAD100"
            tone="leaf"
          />
          <CouponCard
            amount="250"
            min="Min. order AED 4000"
            code="WAD250"
            tone="coral"
          />
        </div>

        {/* CENTER — big rotating banner */}
        <div className="col-span-12 lg:col-span-6 relative rounded-3xl overflow-hidden min-h-[280px] md:min-h-[360px] shadow-card">
          {SLIDES.map((s, i) => (
            <Link
              key={i}
              to={s.to}
              className={`absolute inset-0 ${s.bg} transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0 pointer-events-none"
              } flex items-center`}
            >
              <div className="relative z-10 p-6 md:p-10 max-w-[55%]">
                <div className={`text-[11px] font-bold uppercase tracking-widest ${s.accent} mb-2`}>
                  {s.eyebrow}
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-ink-900 font-display leading-[1.05]">
                  {s.title}
                </h2>
                <div className={`mt-3 text-2xl md:text-3xl font-extrabold ${s.accent} font-display`}>
                  {s.sub}
                </div>
                <div className="text-sm text-ink-700 mt-1">{s.sub2}</div>
                <button className="mt-5 bg-ink-900 hover:bg-ink-800 text-white font-bold text-sm px-5 py-2.5 rounded-full inline-flex items-center gap-2">
                  {s.cta} <ArrowRight size={14} />
                </button>
              </div>
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[110%] bg-no-repeat bg-cover bg-right"
                style={{ backgroundImage: `url("${s.img}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
            </Link>
          ))}

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-ink-900" : "w-1.5 bg-ink-900/30 hover:bg-ink-900/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — bank offer stack */}
        <div className="col-span-12 lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
          <BankOfferCard
            tag="WEEKEND SAVERS"
            extra="15%"
            sub="+ Up to 7% back as Waduha points with ENBD credit cards (Sat & Sun)"
            footer="Min. AED 100 · Max cap AED 50"
            tone="amber"
          />
          <BankOfferCard
            tag="EVERYDAY"
            extra="8% Back"
            sub="As Waduha points on every order with ADCB credit cards"
            footer="No minimum"
            tone="rose"
          />
        </div>
      </div>
    </section>
  );
}

// ─── Coupon card (left side) ───────────────────────────────────────────
function CouponCard({ amount, min, code, tone }) {
  const tones = {
    leaf: "bg-gradient-to-br from-leaf-500 to-leaf-700 text-white",
    coral: "bg-gradient-to-br from-coral-500 to-coral-600 text-white",
  };
  return (
    <div className={`${tones[tone]} rounded-2xl overflow-hidden p-4 relative shadow-soft hover:shadow-card transition flex flex-col justify-between min-h-[140px]`}>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold font-display leading-none">AED{amount}</span>
          <span className="text-xs font-bold uppercase opacity-90">Off</span>
        </div>
        <div className="text-xs opacity-90 mt-1">{min}</div>
      </div>
      <div className="bg-white/20 backdrop-blur rounded-lg px-3 py-1.5 mt-3">
        <div className="text-[10px] uppercase tracking-wider opacity-80 font-semibold">Use Code</div>
        <div className="font-extrabold tracking-wider">{code}</div>
      </div>
      <Tag size={80} className="absolute -top-4 -right-4 opacity-10" strokeWidth={1.2} />
    </div>
  );
}

// ─── Bank offer card (right side) ──────────────────────────────────────
function BankOfferCard({ tag, extra, sub, footer, tone }) {
  const tones = {
    amber: "bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-50 text-ink-900 border-amber-200/60",
    rose:  "bg-gradient-to-br from-rose-100 via-pink-50 to-rose-50 text-ink-900 border-rose-200/60",
  };
  return (
    <div className={`${tones[tone]} border rounded-2xl overflow-hidden p-4 relative shadow-soft hover:shadow-card transition flex flex-col justify-between min-h-[140px]`}>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-coral-600">{tag}</div>
        <div className="mt-1">
          <span className="text-xs font-bold">Extra</span>
          <span className="text-3xl font-extrabold font-display ml-1 text-coral-600">{extra}</span>
          <span className="text-xs font-bold ml-1">{extra.includes("%") ? "" : "OFF"}</span>
        </div>
        <p className="text-[11px] mt-1.5 leading-snug">{sub}</p>
      </div>
      <div className="text-[9px] uppercase tracking-wider opacity-60 font-semibold mt-2">{footer}</div>
    </div>
  );
}
