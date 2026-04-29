import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../cart.jsx";

// Mobile-only sticky bottom bar showing cart summary when items exist.
// Hidden on /cart and /checkout to avoid duplication.
export default function StickyCartBar() {
  const { count, total } = useCart();
  const { pathname } = useLocation();

  if (count === 0) return null;
  if (pathname.startsWith("/cart") || pathname.startsWith("/order-confirmed")) return null;

  return (
    <Link
      to="/cart"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-coral-500 hover:bg-coral-600 text-white shadow-[0_-8px_30px_-8px_rgba(0,0,0,0.18)] transition"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
        <div className="bg-white/15 backdrop-blur w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative">
          <ShoppingBag size={18} />
          <span className="absolute -top-1 -right-1 bg-white text-coral-600 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border-2 border-coral-500">
            {count}
          </span>
        </div>
        <div className="flex-1 leading-tight min-w-0">
          <div className="text-[11px] opacity-85 font-semibold uppercase tracking-wider">Your Cart</div>
          <div className="font-extrabold text-sm">{count} item{count > 1 && "s"} · AED {total.toFixed(2)}</div>
        </div>
        <div className="bg-white text-coral-600 font-bold text-sm px-4 py-2 rounded-full flex items-center gap-1 shrink-0">
          View <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
