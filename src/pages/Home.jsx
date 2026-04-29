import { Link } from "react-router-dom";
import { useMemo } from "react";
import {
  ArrowRight, Truck, Zap, ShoppingBag, Star, ShieldCheck, Award, Clock,
  Apple as AppleIcon, Smartphone, Gift, Tag, Sparkles, MapPin,
} from "lucide-react";
import * as Icons from "lucide-react";
import products from "../products.json";
import { CATEGORIES, ALL_DEPARTMENTS, STORE } from "../config.js";
import ProductCard from "../components/ProductCard.jsx";
import ProductRow from "../components/ProductRow.jsx";
import BrandShowcase from "../components/BrandShowcase.jsx";
import ComingSoonRow from "../components/ComingSoonRow.jsx";
import HeroLayout from "../components/HeroLayout.jsx";
import CategoryTileGrid from "../components/CategoryTileGrid.jsx";
import { useRecentlyViewed } from "../recentlyViewed.jsx";

// Helper: shuffle by category, with fallback
const byCat = (cat, n = 12) => products.filter((p) => p.category === cat).slice(0, n);
const byKeyword = (kw, n = 12) => {
  const re = new RegExp(kw, "i");
  return products.filter((p) => re.test(p.name)).slice(0, n);
};

export default function Home() {
  const { ids: recentIds } = useRecentlyViewed();
  const recentlyViewed = useMemo(
    () => recentIds.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [recentIds]
  );

  // Featured = top items for the bento grid
  const featured = useMemo(() => products.slice(0, 7), []);
  const big = featured[0];
  const small = featured.slice(1, 7);

  // Topical product groups
  const deals = useMemo(() =>
    products.filter((p) => p.compare_price && p.compare_price > p.price).slice(0, 12), []);
  const topDeals = deals.length ? deals : products.slice(0, 12);

  const bestSellers   = useMemo(() => products.slice(20, 32), []);
  const newArrivals   = useMemo(() => products.slice(32, 44), []);
  const beverages     = useMemo(() => byCat("beverages",      12), []);
  const snacks        = useMemo(() => byCat("snacks",         12), []);
  const spices        = useMemo(() => byCat("spices_masala",  12), []);
  const rice          = useMemo(() => byCat("rice_grains",    12), []);
  const dairy         = useMemo(() => byCat("dairy_eggs",     12), []);
  const bakery        = useMemo(() => byCat("bakery",         12), []);
  const frozen        = useMemo(() => byCat("frozen",         12), []);
  const household     = useMemo(() => byCat("household",      12), []);
  const fresh         = useMemo(() => byCat("fruits_vegetables", 12), []);
  const indianFood    = useMemo(() => {
    const a = byKeyword("masala|biryani|chapati|paratha|atta|basmati|dal", 12);
    return a.length >= 6 ? a : spices.concat(rice).slice(0, 12);
  }, [spices, rice]);
  const budgetBuys    = useMemo(() => products.filter(p => p.price < 5).slice(0, 12), []);
  const premiumPicks  = useMemo(() => [...products].sort((a,b) => b.price - a.price).slice(0, 12), []);

  return (
    <main>
      {/* ─── HERO (3-column carousel + coupons + bank offers) ─── */}
      <HeroLayout />

      {/* ─── CATEGORY TILE GRID (photo-based, Lulu-style) ─────── */}
      <CategoryTileGrid />

      {/* ─── TOP DEALS ────────────────────────────────────────── */}
      <ProductRow
        title="Top Deals"
        subtitle="Limited stock at the lowest prices"
        badge="Hot Deals"
        badgeColor="coral"
        icon="Tag"
        products={topDeals}
        viewAllTo="/products"
      />

      {/* ─── BENTO: MOST DEMANDED ─────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-coral-500 bg-coral-500/10 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full mb-2">
                <Star size={11} fill="currentColor" /> Trending in Karama
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink-900 font-display">Most Demanded Items</h2>
            </div>
            <Link to="/products" className="text-coral-500 hover:text-coral-600 font-semibold text-xs flex items-center gap-1">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="col-span-2 md:col-span-1 md:row-span-2">
              <ProductCard product={big} variant="big" />
            </div>
            {small.map((p) => <ProductCard key={p.id} product={p} variant="compact" />)}
          </div>
        </div>
      </section>

      {/* ─── BRAND SHOWCASE ───────────────────────────────────── */}
      <BrandShowcase />

      {/* ─── DEALS OF THE DAY (gradient) ──────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="bg-gradient-to-r from-coral-500 to-coral-600 rounded-3xl p-6 sm:p-8 text-white">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-5">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide">
                  <Tag size={12} /> Deals of the Day
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold font-display">Today's Best Offers</h2>
                <p className="text-white/85 text-sm mt-1">Refreshed every morning at 7 AM</p>
              </div>
              <Link to="/products" className="bg-white text-coral-600 hover:bg-cream-50 font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2">
                Shop All Deals <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {topDeals.slice(0, 6).map((p) => <ProductCard key={p.id} product={p} variant="compact" />)}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PRODUCT ROWS BY CATEGORY ─────────────────────────── */}
      <ProductRow title="Best Sellers"        subtitle="Customer favorites in Al Karama"  badge="Best Sellers" icon="Award"     products={bestSellers}  viewAllTo="/products" />
      <ProductRow title="New Arrivals"        subtitle="Just landed on our shelves"        badge="Just In"      icon="Sparkles"  badgeColor="leaf" products={newArrivals} viewAllTo="/products" />
      <ProductRow title="Indian Food Choice"  subtitle="Authentic flavors from home"       badge="Bestselling"  icon="Flame"     products={indianFood}   viewAllTo="/products?cat=spices_masala" />
      <ProductRow title="Beverages"           subtitle="Soft drinks, juices, water & more" icon="CupSoda"       products={beverages}    viewAllTo="/products?cat=beverages" />
      <ProductRow title="Snacks & Treats"     subtitle="Chips, biscuits, chocolates"       icon="Cookie"        products={snacks}       viewAllTo="/products?cat=snacks" />
      <ProductRow title="Cooking Essentials"  subtitle="Spices, masalas & sauces"          icon="Flame"         products={spices}       viewAllTo="/products?cat=spices_masala" />
      <ProductRow title="Rice & Grains"       subtitle="Pantry staples"                    icon="Wheat"         products={rice}         viewAllTo="/products?cat=rice_grains" />
      <ProductRow title="Dairy & Eggs"        subtitle="Fresh, daily deliveries"           icon="Milk"          products={dairy}        viewAllTo="/products?cat=dairy_eggs" />
      <ProductRow title="Fresh Bakery"        subtitle="Bread, pastries & rolls"           icon="Croissant"     products={bakery}       viewAllTo="/products?cat=bakery" />
      <ProductRow title="Frozen Food"         subtitle="Quick meals & ice creams"          icon="Snowflake"     products={frozen}       viewAllTo="/products?cat=frozen" />
      <ProductRow title="Cleaning & Household" subtitle="Detergents, cleaners, utility"    icon="SprayCan"      products={household}    viewAllTo="/products?cat=household" />
      <ProductRow title="Fresh Produce"       subtitle="Fruits & vegetables"               icon="Salad"         products={fresh}        viewAllTo="/products?cat=fruits_vegetables" />
      <ProductRow title="Budget Buys"         subtitle="Everything under AED 5"            badge="Save More"    icon="Tag"           products={budgetBuys}    viewAllTo="/products" />
      <ProductRow title="Premium Picks"       subtitle="Top-shelf items for special meals" badge="Premium"      icon="Award"        badgeColor="ink" products={premiumPicks} viewAllTo="/products" />

      {/* Recently viewed — only renders if user has viewed any products */}
      {recentlyViewed.length > 0 && (
        <ProductRow
          title="Recently Viewed"
          subtitle="Pick up where you left off"
          icon="Clock"
          badge="For You"
          badgeColor="ink"
          products={recentlyViewed}
          viewAllTo="/products"
        />
      )}

      {/* ─── COMING SOON DEPARTMENTS (Lulu-style placeholders) ── */}
      <ComingSoonRow
        title="Beauty & Personal Care"
        subtitle="Skincare, fragrance, grooming"
        icon="Gem"
        placeholders={[
          { name: "Premium Skincare Range",      icon: "Sparkles" },
          { name: "Designer Fragrances",         icon: "Gem" },
          { name: "Hair Care Essentials",        icon: "Sparkles" },
          { name: "Men's Grooming Kits",         icon: "Sparkles" },
          { name: "Bath & Body",                 icon: "Sparkles" },
          { name: "Oral Care",                   icon: "Sparkles" },
        ]}
      />
      <ComingSoonRow
        title="The Baby Store"
        subtitle="Diapers, formula, baby food, and more"
        icon="Baby"
        placeholders={[
          { name: "Diapers & Wipes",       icon: "Baby" },
          { name: "Baby Formula",          icon: "Milk" },
          { name: "Baby Food & Snacks",    icon: "Cookie" },
          { name: "Bath & Skincare",       icon: "Baby" },
          { name: "Strollers & Carriers",  icon: "Baby" },
          { name: "Toys for Toddlers",     icon: "Baby" },
        ]}
      />
      <ComingSoonRow
        title="Home Appliances"
        subtitle="Small appliances for every room"
        icon="WashingMachine"
        placeholders={[
          { name: "Kettles & Toasters",        icon: "Lamp" },
          { name: "Blenders & Mixers",         icon: "Lamp" },
          { name: "Microwaves & Ovens",        icon: "Lamp" },
          { name: "Vacuum Cleaners",           icon: "Lamp" },
          { name: "Air Fryers",                icon: "Lamp" },
          { name: "Coffee Makers",             icon: "CupSoda" },
        ]}
      />
      <ComingSoonRow
        title="Mobiles, Tablets & Wearables"
        subtitle="Latest gadgets coming soon"
        icon="Smartphone"
        placeholders={[
          { name: "Latest Smartphones",     icon: "Smartphone" },
          { name: "Tablets & iPads",        icon: "Smartphone" },
          { name: "Smart Watches",          icon: "Smartphone" },
          { name: "Headphones & Earbuds",   icon: "Smartphone" },
          { name: "Phone Accessories",      icon: "Smartphone" },
          { name: "Power Banks",            icon: "Zap" },
        ]}
      />
      <ComingSoonRow
        title="Toys & Games"
        subtitle="Fun for all ages"
        icon="Gamepad2"
        placeholders={[
          { name: "Building Blocks",       icon: "Gamepad2" },
          { name: "Educational Toys",      icon: "Gamepad2" },
          { name: "Board Games",           icon: "Gamepad2" },
          { name: "Outdoor Toys",          icon: "Gamepad2" },
          { name: "Soft Toys",             icon: "Gamepad2" },
          { name: "Action Figures",        icon: "Gamepad2" },
        ]}
      />
      <ComingSoonRow
        title="Sports & Fitness"
        subtitle="Gear up for an active lifestyle"
        icon="Dumbbell"
        placeholders={[
          { name: "Yoga Mats",        icon: "Dumbbell" },
          { name: "Dumbbells & Weights", icon: "Dumbbell" },
          { name: "Resistance Bands", icon: "Dumbbell" },
          { name: "Cycling Gear",     icon: "Dumbbell" },
          { name: "Running Shoes",    icon: "Dumbbell" },
          { name: "Sportswear",       icon: "Dumbbell" },
        ]}
      />

      {/* ─── DARK TRUST SECTION ───────────────────────────────── */}
      <section className="bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
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

      {/* ─── APP DOWNLOAD BANNER ──────────────────────────────── */}
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
