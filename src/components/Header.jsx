import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Menu, X, User, Tag, Heart, Sparkles } from "lucide-react";
import { useCart } from "../cart.jsx";
import { useWishlist } from "../wishlist.jsx";
import { useLoyalty } from "../loyalty.jsx";
import { useI18n } from "../i18n.jsx";
import { STORE } from "../config.js";
import UtilityBar from "./UtilityBar.jsx";
import MegaMenuBar from "./MegaMenuBar.jsx";
import SearchAutocomplete from "./SearchAutocomplete.jsx";

export default function Header() {
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { points } = useLoyalty();
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SUB_NAV = [
    { label: t("all_categories"), to: "/products", highlight: true, icon: "menu" },
    { label: t("grocery"),        to: "/products?cat=fruits_vegetables" },
    { label: t("fresh_food"),     to: "/products?cat=meat_poultry" },
    { label: t("electronics"),    to: "/coming-soon?d=electronics" },
    { label: t("home_living"),    to: "/coming-soon?d=home_kitchen" },
    { label: t("festive"),        to: "/products?cat=spices_masala" },
    { label: t("deals"),          to: "/products", emphasis: "leaf" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream-50">
      <UtilityBar />

      {/* Main header */}
      <div className="border-b border-ink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.svg" alt="Waduha Grocery" className="w-12 h-12 shrink-0" />
            <div className="hidden sm:block leading-tight">
              <div className="font-extrabold text-lg text-ink-900 font-display">{STORE.name} <span className="text-leaf-600">Grocery</span></div>
              <div className="text-[10px] text-ink-500 font-semibold uppercase tracking-wider">24/7 · Karama, Dubai</div>
            </div>
          </Link>

          {/* Search w/ autocomplete (desktop+tablet) */}
          <div className="hidden sm:flex flex-1 max-w-3xl">
            <SearchAutocomplete />
          </div>

          {/* Loyalty points pill */}
          {points > 0 && (
            <Link to="/cart" className="hidden xl:flex items-center gap-1.5 bg-coral-500/10 text-coral-700 hover:bg-coral-500/20 px-3 py-2 rounded-full font-bold text-xs shrink-0">
              <Sparkles size={14} />
              <span>{points} pts</span>
            </Link>
          )}

          {/* Bank offers CTA */}
          <Link to="/products" className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-coral-500 to-coral-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-soft hover:shadow-card transition shrink-0">
            <Tag size={14} />
            <div className="leading-tight text-left">
              <div className="text-[10px] font-medium opacity-90">{t("up_to", { n: 30 })}</div>
              <div>{t("bank_offers")}</div>
            </div>
          </Link>

          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="hidden sm:flex relative w-10 h-10 rounded-full bg-white border border-ink-200 items-center justify-center text-ink-700 hover:border-coral-500 hover:text-coral-500 transition shrink-0"
          >
            <Heart size={18} fill={wishCount > 0 ? "currentColor" : "none"} className={wishCount > 0 ? "text-coral-500" : ""} />
            {wishCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-coral-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border-2 border-cream-50">
                {wishCount}
              </span>
            )}
          </Link>

          {/* Account */}
          <button className="hidden md:flex w-10 h-10 rounded-full bg-white border border-ink-200 items-center justify-center text-ink-700 hover:border-coral-500 hover:text-coral-500 transition shrink-0" aria-label="Account">
            <User size={18} />
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative bg-coral-500 hover:bg-coral-600 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-soft flex items-center gap-2 shrink-0">
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">{t("cart")}</span>
            {count > 0 && (
              <span className="bg-white text-coral-600 text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 text-ink-700 shrink-0"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile search row */}
        <div className="sm:hidden px-4 pb-3">
          <SearchAutocomplete size="compact" />
        </div>
      </div>

      {/* Sub-nav strip */}
      <div className="bg-leaf-500/[0.04] border-b border-ink-200/70">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center gap-1 overflow-x-auto py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {SUB_NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                item.highlight
                  ? "bg-ink-900 text-white hover:bg-ink-800 flex items-center gap-1.5"
                  : item.emphasis === "leaf"
                  ? "text-leaf-600 hover:text-leaf-700"
                  : "text-ink-700 hover:text-coral-500"
              }`}
            >
              {item.icon === "menu" && <Menu size={14} />}
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-200 bg-cream-50 px-4 py-3 space-y-1">
          {SUB_NAV.map((item) => (
            <Link key={item.label} to={item.to} onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-ink-700 hover:bg-white">
              {item.label}
            </Link>
          ))}
          <Link to="/wishlist" onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-ink-700 hover:bg-white">
            ❤️ {t("cart") === "السلة" ? "المفضلة" : "Wishlist"} {wishCount > 0 && `(${wishCount})`}
          </Link>
        </div>
      )}

      {/* Department mega-menu bar */}
      <MegaMenuBar />
    </header>
  );
}
