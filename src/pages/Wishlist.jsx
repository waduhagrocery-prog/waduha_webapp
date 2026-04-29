import { Link } from "react-router-dom";
import { Heart, ArrowLeft, Trash2 } from "lucide-react";
import products from "../products.json";
import { useWishlist } from "../wishlist.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const { ids, remove, clear } = useWishlist();
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  return (
    <main className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-ink-500 hover:text-coral-500 text-sm font-semibold mb-4">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-ink-900 font-display flex items-center gap-2">
              <Heart size={28} className="text-coral-500" fill="currentColor" />
              Your Wishlist
            </h1>
            <p className="text-ink-500 text-sm mt-1">
              {items.length === 0 ? "Save items you love for later." : `${items.length} item${items.length > 1 ? "s" : ""}`}
            </p>
          </div>
          {items.length > 0 && (
            <button onClick={clear} className="text-sm text-ink-500 hover:text-coral-500 flex items-center gap-1">
              <Trash2 size={14} /> Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 bg-white border border-ink-200 rounded-2xl">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-coral-500/10 text-coral-500 flex items-center justify-center mb-4">
              <Heart size={36} strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-extrabold text-ink-900 font-display mb-2">No favorites yet</h2>
            <p className="text-ink-500 text-sm mb-5">Tap the heart on any product to save it here.</p>
            <Link to="/products" className="inline-block bg-coral-500 hover:bg-coral-600 text-white font-bold px-6 py-3 rounded-full">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
