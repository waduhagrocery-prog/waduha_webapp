import { Link } from "react-router-dom";
import {
  ArrowRight, Truck, Zap, ShoppingBag, Star, ShieldCheck, Award, Clock,
  Apple as AppleIcon, Smartphone, Gift, Tag, Sparkles,
} from "lucide-react";
import * as Icons from "lucide-react";
import products from "../products.json";
import { CATEGORIES, COMING_SOON_CATEGORIES, STORE } from "../config.js";
import ProductCard from "../components/ProductCard.jsx";

// Hero food image (Unsplash CDN — fresh produce flatlay)
const HERO_IMG =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80";

export default function Home() {
  // Featured = first 7 products for the bento grid
  const featured = products.slice(0, 7);
  const big = featured[0];
  const small = featured.slice(1, 7);

  // Deals = products with compare_price > price; fallback to next slice
  const deals =
    products.filter((p) => p.compare_price && p.compare_price > p.price).slice(0, 6);
  const dealsRow = deals.length ? deals : products.slice(8, 14);

  // New arrivals = next slice
  const newArrivals = products.slice(14, 20);

  return (
    <main>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-coral-500/10 text-coral-700 font-semibold px-3 py-1.5 rounded-full text-xs">
              <span className="w-2 h-2 rounded-full bg-coral-500 live-dot" />
              Now Delivering in Al Karama
            </div>
            <h1 className="mt-5 text-5xl sm:text-6xl font-extrabold text-ink-900 leading-[1.05] font-display">
              Everything for your home,
              <br />
              <span className="text-coral-500">delivered fast.</span>
            </h1>
            <p className="mt-5 text-ink-500 text-base sm:text-lg max-w-md leading-relaxed">
              {STORE.name} — your neighborhood store in Al Karama. From fresh
              groceries to daily essentials, delivered to your door in minutes.
              And we're just getting started.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/products"
                className="bg-coral-500 hover:bg-coral-600 text-white font-semibold px-6 py-3 rounded-full text-sm flex items-center gap-2 shadow-soft"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="bg-white border border-ink-200 hover:border-ink-400 text-ink-900 font-semibold px-6 py-3 rounded-full text-sm"
              >
                Our Story
              </Link>
            </div>

            {/* Trust mini-cards */}
            <div className="mt-8 grid grid-cols-3 gap-2 max-w-lg">
              {[
                { icon: Truck, title: "Free Delivery", sub: "In Al Karama" },
                { icon: Zap, title: "Express", sub: "Under 30 mins" },
                { icon: ShoppingBag, title: "Also on Noon", sub: "& Amazon.ae" },
              ].map((t) => (
                <div key={t.title} className="bg-white border border-ink-200 rounded-xl p-3 flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-coral-500/10 text-coral-600 flex items-center justify-center shrink-0">
                    <t.icon size={16} />
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-bold text-ink-900">{t.title}</div>
                    <div className="text-[11px] text-ink-500">{t.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card aspect-[4/3] bg-ink-100">
              <img
                src={HERO_IMG}
                alt="Fresh groceries"
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
            </div>
            {/* Live activity card */}
            <div className="absolute bottom-5 left-5 sm:left-7 bg-white rounded-2xl shadow-card border border-ink-200 px-4 py-3 max-w-[230px]">
              <div className="flex items-center gap-2 text-xs font-semibold text-leaf-600">
                <span className="w-2 h-2 rounded-full bg-leaf-500 live-dot" />
                Live from Al Karama
              </div>
              <div className="mt-1 text-sm font-bold text-ink-900 leading-snug">
                Orders packing now —<br />delivery in 20 min
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROMO STRIP (3 banners, Lulu-style) ──────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <PromoCard
            label="Deals of the Day"
            title="Up to 30% off"
            sub="Daily essentials, refreshed every morning"
            cta="Shop Deals"
            to="/products"
            tone="coral"
            icon={Tag}
          />
          <PromoCard
            label="Free Delivery"
            title="In Al Karama"
            sub="No minimum order. Order anytime."
            cta="Order Now"
            to="/products"
            tone="leaf"
            icon={Truck}
          />
          <PromoCard
            label="New Arrivals"
            title="Fresh stock"
            sub="What's new on our shelves this week"
            cta="See New"
            to="/products"
            tone="ink"
            icon={Sparkles}
          />
        </div>
      </section>

      {/* ─── CATEGORIES ───────────────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-3xl font-extrabold text-ink-900 font-display">Shop by Category</h2>
              <p className="text-ink-500 text-sm mt-1">Everything your kitchen needs</p>
            </div>
            <Link to="/products" className="text-coral-500 hover:text-coral-600 font-semibold text-sm flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map((c) => {
              const Icon = Icons[c.icon] || ShoppingBag;
              return (
                <Link
                  key={c.key}
                  to={`/products?cat=${c.key}`}
                  className="bg-cream-100 hover:bg-white border border-transparent hover:border-ink-200 rounded-2xl p-5 text-center transition group"
                >
                  <div className={`w-12 h-12 mx-auto rounded-xl ${c.tint} flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <div className="text-sm font-semibold text-ink-900">{c.label}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── DEALS OF THE DAY ─────────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="bg-gradient-to-r from-coral-500 to-coral-600 rounded-3xl p-6 sm:p-8 text-white">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  <Tag size={12} /> Deals of the Day
                </div>
                <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold font-display">
                  Today's Best Offers
                </h2>
                <p className="text-white/85 text-sm mt-1">Refreshed every morning at 7 AM</p>
              </div>
              <Link to="/products" className="bg-white text-coral-600 hover:bg-cream-50 font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2">
                Shop All Deals <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {dealsRow.slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENTO: MOST DEMANDED ─────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-coral-500 text-xs font-bold uppercase tracking-wide mb-1">
                <Star size={12} fill="currentColor" /> Trending in Karama
              </div>
              <h2 className="text-3xl font-extrabold text-ink-900 font-display">Most Demanded Items</h2>
            </div>
            <Link to="/products" className="text-coral-500 hover:text-coral-600 font-semibold text-sm flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <div className="col-span-2 md:col-span-1 md:row-span-2">
              <ProductCard product={big} variant="big" />
            </div>
            {small.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEW ARRIVALS ─────────────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-leaf-600 text-xs font-bold uppercase tracking-wide mb-1">
                <Sparkles size={12} /> Just In
              </div>
              <h2 className="text-3xl font-extrabold text-ink-900 font-display">New Arrivals</h2>
            </div>
            <Link to="/products" className="text-coral-500 hover:text-coral-600 font-semibold text-sm flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMING SOON CATEGORIES (future expansion) ────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="bg-cream-100 rounded-3xl p-6 sm:p-10 border border-ink-200/50">
            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center gap-1.5 text-coral-500 text-xs font-bold uppercase tracking-wide mb-2">
                <Gift size={12} /> Coming Soon
              </div>
              <h2 className="text-3xl font-extrabold text-ink-900 font-display">More than groceries</h2>
              <p className="text-ink-500 text-sm mt-2">
                We're expanding {STORE.name} into your everyday store.
                Personal care, beauty, baby, electronics — all delivered with the same speed.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {COMING_SOON_CATEGORIES.map((c) => {
                const Icon = Icons[c.icon] || ShoppingBag;
                return (
                  <div key={c.key} className="bg-white border border-dashed border-ink-200 rounded-2xl p-4 text-center opacity-80 hover:opacity-100 transition">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-ink-100 text-ink-700 flex items-center justify-center mb-2">
                      <Icon size={18} />
                    </div>
                    <div className="text-xs font-semibold text-ink-900">{c.label}</div>
                    <div className="text-[10px] text-coral-500 font-bold uppercase tracking-wide mt-1">Soon</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── DARK TRUST SECTION ───────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-ink-900 text-white rounded-3xl px-6 py-12 sm:py-14">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display">Why Karama Loves Us</h2>
              <p className="text-ink-400 mt-2 text-sm sm:text-base">
                Trusted by hundreds of families in Al Karama
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Truck, title: "Local Delivery", sub: "Door-to-door in Al Karama" },
                { icon: Clock, title: "Express 30 Min", sub: "Lightning fast fulfilment" },
                { icon: ShieldCheck, title: "Fresh Guarantee", sub: "Or your money back" },
                { icon: Award, title: "Top Rated", sub: "On Noon & Amazon.ae" },
              ].map((t) => (
                <div key={t.title} className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-coral-500/15 text-coral-400 flex items-center justify-center mb-3">
                    <t.icon size={22} />
                  </div>
                  <div className="font-bold">{t.title}</div>
                  <div className="text-xs text-ink-400 mt-1">{t.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD BANNER (Lulu-style) ─────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-leaf-700 text-white rounded-3xl px-6 sm:px-10 py-10 grid md:grid-cols-2 gap-6 items-center overflow-hidden relative">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
                <Smartphone size={12} /> Coming Soon
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold font-display leading-tight">
                Get the {STORE.name} app
              </h2>
              <p className="mt-2 text-white/85 text-sm sm:text-base max-w-md">
                Faster checkout, exclusive app-only deals, and one-tap reorder.
                Mobile app launching in 2026.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <button className="bg-black hover:bg-ink-800 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
                  <AppleIcon size={20} />
                  <div className="text-left leading-tight">
                    <div className="text-[10px] opacity-80">Download on the</div>
                    <div className="font-bold">App Store</div>
                  </div>
                </button>
                <button className="bg-black hover:bg-ink-800 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm">
                  <Smartphone size={20} />
                  <div className="text-left leading-tight">
                    <div className="text-[10px] opacity-80">Get it on</div>
                    <div className="font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="hidden md:flex justify-end items-center">
              <Smartphone size={200} strokeWidth={1} className="opacity-20" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Promo card component used in the strip below the hero
function PromoCard({ label, title, sub, cta, to, tone, icon: Icon }) {
  const tones = {
    coral: "from-coral-500 to-coral-600 text-white",
    leaf:  "from-leaf-500 to-leaf-700 text-white",
    ink:   "from-ink-900 to-ink-700 text-white",
  };
  return (
    <Link
      to={to}
      className={`bg-gradient-to-br ${tones[tone]} rounded-2xl p-5 flex flex-col gap-2 hover:shadow-card transition relative overflow-hidden group`}
    >
      <div className="text-[11px] font-bold uppercase tracking-wide opacity-85">{label}</div>
      <div className="text-2xl font-extrabold font-display">{title}</div>
      <div className="text-sm opacity-85">{sub}</div>
      <div className="mt-2 inline-flex items-center gap-1 text-sm font-bold">
        {cta} <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
      </div>
      <Icon size={120} className="absolute -right-4 -bottom-4 opacity-15 group-hover:opacity-25 transition" strokeWidth={1.2} />
    </Link>
  );
}
