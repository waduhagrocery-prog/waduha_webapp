import { Link, NavLink } from "react-router-dom";
import { useCart } from "../cart.jsx";
import { STORE } from "../config.js";

export default function Header() {
  const { count } = useCart();

  const navLink = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-semibold transition ${
      isActive
        ? "bg-white text-brand-green"
        : "text-white hover:bg-brand-dark"
    }`;

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Top yellow promo strip */}
      <div className="bg-brand-yellow text-brand-dark text-center text-xs sm:text-sm font-bold py-1.5 px-3">
        🛵 FAST & FREE DELIVERY · {STORE.hours} · Call {STORE.phoneDisplay1}
      </div>

      <div className="bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-white">
            <div className="w-10 h-10 rounded-full bg-white text-brand-green flex items-center justify-center font-extrabold text-xl shadow">
              K
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-lg sm:text-xl">{STORE.name}</div>
              <div className="text-[11px] opacity-90 hidden sm:block">
                {STORE.arabicName} · 24 Hours
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" end className={navLink}>
              Home
            </NavLink>
            <NavLink to="/products" className={navLink}>
              Products
            </NavLink>
            <NavLink to="/contact" className={navLink}>
              Contact
            </NavLink>
          </nav>

          <Link
            to="/cart"
            className="relative bg-brand-red hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md text-sm shadow"
          >
            🛒 Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-yellow text-brand-dark text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden bg-brand-dark">
        <div className="max-w-7xl mx-auto px-2 py-1 flex justify-around">
          <NavLink to="/" end className={navLink}>Home</NavLink>
          <NavLink to="/products" className={navLink}>Products</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>
        </div>
      </div>
    </header>
  );
}
