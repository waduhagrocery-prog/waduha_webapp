import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, X, TrendingUp, ShoppingBag } from "lucide-react";
import * as Icons from "lucide-react";
import products from "../products.json";
import { CATEGORIES, categoryLabel } from "../config.js";

// Lightweight in-memory search (fast for 1500 products).
// Returns [productHits, categoryHits].
function searchProducts(q) {
  if (!q) return [[], []];
  const lower = q.toLowerCase();
  const productHits = [];
  for (const p of products) {
    if (productHits.length >= 6) break;
    if (p.name.toLowerCase().includes(lower)) productHits.push(p);
  }
  const categoryHits = CATEGORIES.filter((c) => c.label.toLowerCase().includes(lower)).slice(0, 4);
  return [productHits, categoryHits];
}

const POPULAR = ["Tomato Ketchup", "Almarai Cheese", "Basmati Rice", "Olive Oil", "Coffee", "Chocolate"];

export default function SearchAutocomplete({ size = "default" }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const wrapRef = useRef(null);

  const [productHits, categoryHits] = useMemo(() => searchProducts(q), [q]);

  // Close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setOpen(false);
    setQ("");
  };

  const close = () => setOpen(false);

  const isCompact = size === "compact";

  return (
    <div ref={wrapRef} className="relative flex-1 max-w-3xl">
      <form onSubmit={submit} className={`flex items-center bg-white border border-ink-200 rounded-full focus-within:border-coral-500 transition shadow-soft ${isCompact ? "pl-3 pr-1 py-1" : "pl-5 pr-1.5 py-1.5"}`}>
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder='Search for "anything"…'
          className={`bg-transparent outline-none flex-1 min-w-0 placeholder-ink-400 ${isCompact ? "text-sm" : "text-sm"}`}
        />
        {q && (
          <button type="button" onClick={() => { setQ(""); setOpen(false); }} className="text-ink-400 hover:text-ink-700 p-1 mr-1" aria-label="Clear">
            <X size={14} />
          </button>
        )}
        <button type="submit" className={`bg-leaf-500 hover:bg-leaf-600 text-white rounded-full flex items-center justify-center shrink-0 ${isCompact ? "w-8 h-8" : "w-9 h-9"}`}>
          <Search size={isCompact ? 14 : 16} />
        </button>
      </form>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-card border border-ink-200 max-h-[480px] overflow-y-auto z-50">
          {!q && (
            <div className="p-4">
              <div className="flex items-center gap-1.5 text-coral-500 text-[10px] font-bold uppercase tracking-wider mb-2">
                <TrendingUp size={11} /> Popular
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR.map((term) => (
                  <button
                    key={term}
                    onClick={() => { setQ(term); navigate(`/products?q=${encodeURIComponent(term)}`); close(); }}
                    className="bg-cream-100 hover:bg-coral-500 hover:text-white text-ink-700 text-xs font-semibold px-3 py-1.5 rounded-full transition"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && categoryHits.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-500">Categories</div>
              {categoryHits.map((c) => {
                const Icon = Icons[c.icon] || ShoppingBag;
                return (
                  <Link
                    key={c.key}
                    to={`/products?cat=${c.key}`}
                    onClick={close}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cream-100"
                  >
                    <div className={`w-8 h-8 rounded-lg ${c.tint} flex items-center justify-center`}>
                      <Icon size={16} />
                    </div>
                    <div className="text-sm font-semibold text-ink-900 flex-1">{c.label}</div>
                  </Link>
                );
              })}
            </div>
          )}

          {q && productHits.length > 0 && (
            <div className="p-2 border-t border-ink-200">
              <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-ink-500">Products</div>
              {productHits.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  onClick={close}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-cream-100"
                >
                  <div className="w-10 h-10 rounded-lg bg-cream-100 overflow-hidden shrink-0">
                    {p.image_url && <img src={p.image_url} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-ink-900 truncate">{p.name}</div>
                    <div className="text-[11px] text-ink-500">{categoryLabel(p.category)}</div>
                  </div>
                  <div className="text-sm font-extrabold text-coral-500 shrink-0">AED {p.price.toFixed(2)}</div>
                </Link>
              ))}
              <button
                onClick={submit}
                className="w-full text-center mt-2 py-2 text-coral-500 hover:text-coral-600 font-bold text-sm"
              >
                See all results for "{q}" →
              </button>
            </div>
          )}

          {q && productHits.length === 0 && categoryHits.length === 0 && (
            <div className="p-6 text-center text-ink-500 text-sm">
              No results for <span className="font-bold text-ink-900">"{q}"</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
