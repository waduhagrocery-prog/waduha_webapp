import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search, ShoppingBag, MapPin, Menu, X } from "lucide-react";
import { useCart } from "../cart.jsx";
import { STORE } from "../config.js";

export default function Header() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLink = ({ isActive }) =>
    `text-sm font-semibold transition px-1 py-2 ${
      isActive ? "text-coral-500" : "text-ink-700 hover:text-ink-900"
    }`;

  const onSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setQ("");
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur border-b border-ink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-leaf-500 text-white flex items-center justify-center font-extrabold text-lg shadow-sm">
            W
          </div>
          <div className="leading-tight hidden sm:block">
            <div className="font-extrabold text-base text-ink-900 font-display">
              {STORE.name}
            </div>
            <div className="text-[11px] text-ink-500 flex items-center gap-1">
              <MapPin size={10} /> {STORE.location}
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 ml-6">
          <NavLink to="/" end className={navLink}>Home</NavLink>
          <NavLink to="/products" className={navLink}>Shop</NavLink>
          <NavLink to="/products" className={navLink}>Categories</NavLink>
          <NavLink to="/contact" className={navLink}>About</NavLink>
        </nav>

        <div className="flex-1" />

        {/* Search */}
        <form onSubmit={onSearch} className="hidden sm:flex items-center bg-white border border-ink-200 rounded-full px-3 py-1.5 w-56 focus-within:border-coral-500 transition">
          <Search size={14} className="text-ink-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search…"
            className="bg-transparent outline-none text-sm px-2 flex-1 min-w-0"
          />
        </form>

        {/* Cart */}
        <Link
          to="/cart"
          className="relative bg-coral-500 hover:bg-coral-600 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-sm flex items-center gap-2 shrink-0"
        >
          <ShoppingBag size={16} />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="bg-white text-coral-600 text-[11px] font-bold rounded-full min-w-[20px] h-5 px-1.5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-ink-700"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-200 bg-cream-50 px-4 py-3 space-y-3">
          <form onSubmit={onSearch} className="flex items-center bg-white border border-ink-200 rounded-full px-3 py-2">
            <Search size={14} className="text-ink-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="bg-transparent outline-none text-sm px-2 flex-1"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {[["/","Home"],["/products","Shop"],["/products","Categories"],["/contact","About"]].map(([to,label]) => (
              <NavLink key={label} to={to} end={to==="/"} onClick={()=>setMobileOpen(false)} className="px-3 py-2 rounded-lg text-sm font-semibold text-ink-700 hover:bg-white">
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
