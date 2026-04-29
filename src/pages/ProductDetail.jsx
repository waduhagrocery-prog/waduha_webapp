import { useEffect, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Plus, Minus, Heart, Truck, ShieldCheck, Share2, Clock, Tag, MessageCircle,
  ShoppingBag,
} from "lucide-react";
import * as Icons from "lucide-react";
import products from "../products.json";
import { useCart } from "../cart.jsx";
import { useWishlist } from "../wishlist.jsx";
import { useRecentlyViewed } from "../recentlyViewed.jsx";
import { CATEGORIES, categoryLabel, STORE } from "../config.js";
import ProductRow from "../components/ProductRow.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, add, setQty } = useCart();
  const { has: inWishlist, toggle: toggleWish } = useWishlist();
  const { track } = useRecentlyViewed();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);
  const inCart = items.find((i) => i.id === id);

  useEffect(() => {
    if (product) {
      track(product.id);
      window.scrollTo(0, 0);
    }
  }, [product, track]);

  if (!product) {
    return (
      <main className="bg-cream-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-3xl font-extrabold text-ink-900 font-display mb-2">Product not found</h1>
          <Link to="/products" className="inline-block mt-4 bg-coral-500 hover:bg-coral-600 text-white font-bold px-6 py-3 rounded-full">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  const cat = CATEGORIES.find((c) => c.key === product.category);
  const Icon = (cat && Icons[cat.icon]) || Icons.ShoppingBag;
  const hasDiscount = product.compare_price && product.compare_price > product.price;
  const discountPct = hasDiscount ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100) : 0;

  // "You might also like" — same category, exclude current
  const related = useMemo(
    () => products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 12),
    [product]
  );

  const wished = inWishlist(product.id);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: product.name, url });
      } catch (_) {}
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const orderViaWhatsapp = () => {
    const msg = encodeURIComponent(
      `Hi ${STORE.name}, I'd like to order:\n\n*${product.name}*\nUnit: ${product.unit}\nPrice: AED ${product.price.toFixed(2)}\n\nIs this in stock?`
    );
    window.open(`https://wa.me/${STORE.whatsapp}?text=${msg}`, "_blank");
  };

  return (
    <main className="bg-cream-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-ink-500 hover:text-coral-500 text-sm font-semibold">
          <ArrowLeft size={14} /> Back
        </button>
        <nav className="text-xs text-ink-500 mt-2">
          <Link to="/" className="hover:text-coral-500">Home</Link>
          <span className="mx-1.5">/</span>
          <Link to="/products" className="hover:text-coral-500">Products</Link>
          <span className="mx-1.5">/</span>
          <Link to={`/products?cat=${product.category}`} className="hover:text-coral-500">
            {categoryLabel(product.category)}
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-ink-900 font-semibold">{product.name}</span>
        </nav>
      </div>

      {/* Main */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative">
            <div className="aspect-square bg-white rounded-3xl border border-ink-200 overflow-hidden flex items-center justify-center">
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <Icon size={120} strokeWidth={1.2} className="text-ink-300" />
              )}
              {hasDiscount && (
                <span className="absolute top-4 left-4 bg-coral-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{discountPct}% OFF
                </span>
              )}
              <button
                onClick={() => toggleWish(product.id)}
                aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-ink-200 flex items-center justify-center transition ${
                  wished ? "text-coral-500" : "text-ink-700 hover:text-coral-500"
                }`}
              >
                <Heart size={20} fill={wished ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <Link to={`/products?cat=${product.category}`} className="text-xs font-bold uppercase tracking-wider text-coral-500 hover:text-coral-600">
              {categoryLabel(product.category)}
            </Link>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-ink-900 font-display leading-tight">
              {product.name}
            </h1>
            {product.unit && (
              <div className="mt-1 text-sm text-ink-500">{product.unit}</div>
            )}

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-3">
              <div className="text-4xl font-extrabold text-coral-500 font-display">
                AED {product.price.toFixed(2)}
              </div>
              {hasDiscount && (
                <div className="text-lg text-ink-400 line-through">
                  AED {product.compare_price.toFixed(2)}
                </div>
              )}
            </div>

            {/* Stock */}
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className={`w-2 h-2 rounded-full ${product.in_stock ? "bg-leaf-500" : "bg-ink-400"}`} />
              <span className={`font-semibold ${product.in_stock ? "text-leaf-600" : "text-ink-500"}`}>
                {product.in_stock ? "In Stock — Ready to ship" : "Out of stock"}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="mt-5 text-ink-700 leading-relaxed text-base">{product.description}</p>
            )}

            {/* Add to cart / Quantity */}
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              {inCart ? (
                <div className="flex items-center bg-coral-500 text-white rounded-full overflow-hidden">
                  <button onClick={() => setQty(product.id, inCart.qty - 1)} className="w-12 h-12 hover:bg-coral-600 flex items-center justify-center" aria-label="Decrease">
                    <Minus size={16} />
                  </button>
                  <span className="px-4 text-base font-bold min-w-[40px] text-center">{inCart.qty}</span>
                  <button onClick={() => setQty(product.id, inCart.qty + 1)} className="w-12 h-12 hover:bg-coral-600 flex items-center justify-center" aria-label="Increase">
                    <Plus size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => add(product)}
                  disabled={!product.in_stock}
                  className="bg-coral-500 hover:bg-coral-600 disabled:bg-ink-200 text-white font-bold text-sm px-8 py-3.5 rounded-full flex items-center gap-2 shadow-soft"
                >
                  <ShoppingBag size={16} /> Add to Cart
                </button>
              )}
              <button onClick={orderViaWhatsapp} className="bg-leaf-500 hover:bg-leaf-600 text-white font-bold text-sm px-5 py-3.5 rounded-full flex items-center gap-2">
                <MessageCircle size={16} /> Order on WhatsApp
              </button>
              <button onClick={share} className="bg-white border border-ink-200 hover:border-coral-500 text-ink-900 font-bold text-sm px-4 py-3.5 rounded-full flex items-center gap-2">
                <Share2 size={16} /> Share
              </button>
            </div>

            {/* Trust list */}
            <div className="mt-6 grid sm:grid-cols-3 gap-2">
              {[
                { icon: Truck, t: "Free Delivery", s: "In Al Karama" },
                { icon: Clock, t: "30-min Express", s: "Same-day usually" },
                { icon: ShieldCheck, t: "Fresh Guarantee", s: "Or money back" },
              ].map((x) => (
                <div key={x.t} className="bg-white border border-ink-200 rounded-xl p-3 flex items-start gap-2">
                  <div className="w-8 h-8 rounded-lg bg-coral-500/10 text-coral-600 flex items-center justify-center shrink-0">
                    <x.icon size={16} />
                  </div>
                  <div className="leading-tight">
                    <div className="text-xs font-bold text-ink-900">{x.t}</div>
                    <div className="text-[11px] text-ink-500">{x.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <ProductRow
          title="You might also like"
          subtitle={`More from ${categoryLabel(product.category)}`}
          icon="Tag"
          products={related}
          viewAllTo={`/products?cat=${product.category}`}
        />
      )}
    </main>
  );
}
