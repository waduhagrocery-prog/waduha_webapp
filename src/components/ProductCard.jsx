import * as Icons from "lucide-react";
import { Plus, Minus, Heart } from "lucide-react";
import { useCart } from "../cart.jsx";
import { CATEGORIES, categoryLabel } from "../config.js";

const badgeStyle = {
  trending:    "bg-coral-500 text-white",
  best_seller: "bg-ink-900 text-white",
  new:         "bg-leaf-500 text-white",
  express:     "bg-ink-900 text-white",
  deal:        "bg-coral-500 text-white",
};

const badgeLabel = {
  trending:    "Trending",
  best_seller: "★ Best Seller",
  new:         "New",
  express:     "15 Min",
  deal:        "Deal",
};

const iconFor = (catKey) => {
  const c = CATEGORIES.find((c) => c.key === catKey);
  return Icons[c?.icon] || Icons.ShoppingBag;
};

export default function ProductCard({ product, variant = "default" }) {
  const { items, add, setQty } = useCart();
  const inCart = items.find((i) => i.id === product.id);
  const Icon = iconFor(product.category);

  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  const big = variant === "big";
  const compact = variant === "compact";

  return (
    <div className={`group bg-white border border-ink-200 hover:border-coral-500 rounded-2xl overflow-hidden flex flex-col transition ${big ? "h-full" : ""}`}>
      {/* Image area */}
      <div className={`relative bg-cream-100 flex items-center justify-center overflow-hidden ${big ? "aspect-[4/5] md:aspect-auto md:flex-1 md:min-h-[280px]" : "aspect-square"}`}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-ink-200">
            <Icon size={big ? 100 : compact ? 40 : 48} strokeWidth={1.2} />
          </div>
        )}

        {/* Top-left badge */}
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-1 rounded-full ${badgeStyle[product.badge] || "bg-ink-900 text-white"}`}>
            {badgeLabel[product.badge] || product.badge}
          </span>
        )}

        {/* Top-right discount */}
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-coral-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
            -{discountPct}%
          </span>
        )}

        {/* Stock dot (live availability indicator like Lulu) */}
        <span className={`absolute ${product.badge ? "bottom-2" : "top-2"} ${product.badge ? "left-2" : "right-2"} w-2 h-2 rounded-full ${product.in_stock ? "bg-leaf-500" : "bg-ink-400"} hidden`} />

        {/* Wishlist (decorative for now) */}
        <button
          aria-label="Wishlist"
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur border border-ink-200 text-ink-700 hover:text-coral-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
          style={{ display: hasDiscount ? "none" : "" }}
          onClick={(e) => e.preventDefault()}
        >
          <Heart size={14} />
        </button>

        {!product.in_stock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-ink-900 text-white text-xs font-bold px-3 py-1 rounded-full">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className={`flex flex-col gap-1 ${compact ? "p-2.5" : "p-3 sm:p-4"}`}>
        <div className={`font-semibold uppercase tracking-wide text-ink-500 ${compact ? "text-[9px]" : "text-[10px]"}`}>
          {categoryLabel(product.category)}
        </div>
        <h3 className={`font-bold text-ink-900 leading-snug line-clamp-2 ${big ? "text-lg" : compact ? "text-xs min-h-[2.4em]" : "text-sm"}`}>
          {product.name}
        </h3>
        {product.unit && !compact && (
          <div className="text-xs text-ink-500">{product.unit}</div>
        )}

        <div className={`mt-1.5 flex items-end justify-between gap-2 ${compact ? "" : "mt-2"}`}>
          <div className="leading-tight">
            <div className={`font-extrabold text-coral-500 ${big ? "text-2xl" : compact ? "text-sm" : "text-base"}`}>
              AED {product.price.toFixed(2)}
            </div>
            {hasDiscount && (
              <div className={`text-ink-400 line-through ${compact ? "text-[10px]" : "text-xs"}`}>
                AED {product.compare_price.toFixed(2)}
              </div>
            )}
          </div>

          {inCart ? (
            <div className={`flex items-center bg-coral-500 text-white rounded-full overflow-hidden ${compact ? "scale-90 origin-right" : ""}`}>
              <button
                onClick={() => setQty(product.id, inCart.qty - 1)}
                className="w-7 h-7 hover:bg-coral-600 flex items-center justify-center"
                aria-label="Decrease"
              >
                <Minus size={12} />
              </button>
              <span className="px-1.5 text-xs font-bold min-w-[24px] text-center">{inCart.qty}</span>
              <button
                onClick={() => setQty(product.id, inCart.qty + 1)}
                className="w-7 h-7 hover:bg-coral-600 flex items-center justify-center"
                aria-label="Increase"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => add(product)}
              disabled={!product.in_stock}
              className={`bg-coral-500 hover:bg-coral-600 disabled:bg-ink-200 text-white font-bold rounded-full flex items-center gap-1 whitespace-nowrap ${compact ? "text-[10px] px-2.5 py-1.5" : "text-xs px-4 py-2"}`}
            >
              <Plus size={compact ? 12 : 14} /> Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
