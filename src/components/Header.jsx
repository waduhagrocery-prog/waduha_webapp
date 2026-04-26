import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, ShoppingBag, Menu, X, User, Tag } from "lucide-react";
import { useCart } from "../cart.jsx";
import { STORE } from "../config.js";
import UtilityBar from "./UtilityBar.jsx";
import MegaMenuBar from "./MegaMenuBar.jsx";

const SUB_NAV = [
  { label: "All Categories", to: "/products", highlight: true, icon: "menu" },
  { label: "Grocery",        to: "/products?cat=fruits_vegetables" },
  { label: "Fresh Food",     to: "/products?cat=meat_poultry" },
  { label: "Electronics",    to: "/coming-soon?d=electronics" },
  { label: "Home & Living",  to: "/coming-soon?d=home_kitchen" },
  { label: "Festive",        to: "/products?cat=spices_masala" },
  { label: "Deals",          to: "/products", emphasis: "leaf" },
];

export default function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const onSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setQ("");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50">
      <UtilityBar />

      {/* Main header — logo + search + offers + cart */}
      <div className="border-b border-ink-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-coral-500 to-coral-600 text-white flex items-center justify-center font-extrabold text-xl shadow-soft">
              W
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="font-extrabold text-lg text-ink-900 font-display">{STORE.name}</div>
              <div className="text-[10px] text-ink-500 font-semibold uppercase tracking-wider">Hypermarket</div>
            </div>
          </Link>

          {/* Search bar — big and prominent */}
          <form onSubmit={onSearch} className="hidden sm:flex flex-1 max-w-3xl items-center bg-white border border-ink-200 rounded-full pl-5 pr-1.5 py-1.5 focus-within:border-coral-500 transition shadow-soft">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Search for "anything"…'
              className="bg-transparent outline-none text-sm flex-1 min-w-0 placeholder-ink-400"
            />
            <button type="submit" className="bg-leaf-500 hover:bg-leaf-600 text-white w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <Search size={16} />
            </button>
          </form>

          {/* Bank offers / Promo CTA */}
          <Link to="/products" className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-coral-500 to-coral-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-soft hover:shadow-card transition shrink-0">
            <Tag size={14} />
            <div className="leading-tight text-left">
              <div className="text-[10px] font-medium opacity-90">Up to 30%</div>
              <div>Bank Offers</div>
            </div>
          </Link>

          {/* Account */}
          <button className="hidden md:flex w-10 h-10 rounded-full bg-white border border-ink-200 items-center justify-center text-ink-700 hover:border-coral-500 hover:text-coral-500 transition shrink-0">
            <User size={18} />
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative bg-coral-500 hover:bg-coral-600 text-white font-semibold text-sm px-4 py-2.5 rounded-full shadow-soft flex items-center gap-2 shrink-0">
            <ShoppingBag size={16} />
            <span className="hidden sm:inline">Cart</span>
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
          <form onSubmit={onSearch} className="flex items-center bg-white border border-ink-200 rounded-full pl-4 pr-1 py-1">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search anything…"
              className="bg-transparent outline-none text-sm flex-1 min-w-0"
            />
            <button type="submit" className="bg-leaf-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
              <Search size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Sub-nav strip — Lulu-style */}
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
        <div className="md:hidden border-t border-ink-200 bg-cream-50 px-4 py-3 space-y-2">
          {SUB_NAV.map((item) => (
            <Link key={item.label} to={item.to} onClick={()=>setMobileOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-semibold text-ink-700 hover:bg-white">
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Department mega-menu bar */}
      <MegaMenuBar />
    </header>
  );
}
