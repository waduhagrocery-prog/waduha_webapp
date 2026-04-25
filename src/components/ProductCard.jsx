import { useCart } from "../cart.jsx";
import { categoryEmoji } from "../config.js";

const badgeStyle = {
  trending: "bg-brand-red text-white",
  best_seller: "bg-brand-yellow text-brand-dark",
  new: "bg-brand-green text-white",
  express: "bg-brand-dark text-white",
  deal: "bg-brand-red text-white",
};

const badgeLabel = {
  trending: "🔥 Trending",
  best_seller: "⭐ Best Seller",
  new: "🆕 New",
  express: "⚡ Express",
  deal: "💥 Deal",
};

export default function ProductCard({ product }) {
  const { add } = useCart();
  const hasDiscount =
    product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount
    ? Math.round(
        ((product.compare_price - product.price) / product.compare_price) * 100
      )
    : 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 hover:border-brand-green hover:shadow-lg transition-all overflow-hidden flex flex-col group">
      <div className="relative aspect-square bg-brand-gray flex items-center justify-center overflow-hidden">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        ) : (
          <div className="text-6xl opacity-50">
            {categoryEmoji(product.category)}
          </div>
        )}
        {product.badge && (
          <span
            className={`absolute top-2 left-2 text-[11px] font-bold px-2 py-1 rounded ${
              badgeStyle[product.badge] || "bg-brand-green text-white"
            }`}
          >
            {badgeLabel[product.badge] || product.badge}
          </span>
        )}
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-brand-red text-white text-[11px] font-bold px-2 py-1 rounded">
            -{discountPct}%
          </span>
        )}
        {!product.in_stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-brand-ink font-bold px-3 py-1 rounded">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-semibold text-sm text-brand-ink line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        {product.unit && (
          <div className="text-xs text-gray-500 mt-0.5">{product.unit}</div>
        )}
        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <div className="leading-tight">
            <div className="text-brand-green font-extrabold text-lg">
              {product.price.toFixed(2)}
              <span className="text-xs font-normal text-gray-500"> AED</span>
            </div>
            {hasDiscount && (
              <div className="text-xs text-gray-400 line-through">
                {product.compare_price.toFixed(2)} AED
              </div>
            )}
          </div>
          <button
            onClick={() => add(product)}
            disabled={!product.in_stock}
            className="bg-brand-red hover:bg-red-700 disabled:bg-gray-300 text-white font-bold text-xs px-3 py-2 rounded-md whitespace-nowrap"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}
