import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import * as Icons from "lucide-react";
import products from "../products.json";
import { CATEGORIES } from "../config.js";
import ProductCard from "../components/ProductCard.jsx";

const PAGE_SIZE = 24;
const SORTS = [
  { key: "popular",    label: "Popular" },
  { key: "price_asc",  label: "Price: Low to High" },
  { key: "price_desc", label: "Price: High to Low" },
  { key: "name_asc",   label: "Name A–Z" },
];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "all";
  const initialQ = params.get("q") || "";
  const [search, setSearch] = useState(initialQ);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);

  // Sync search input when URL ?q= changes (e.g. from header search)
  useEffect(() => { setSearch(initialQ); }, [initialQ]);

  const setCat = (key) => {
    if (key === "all") params.delete("cat");
    else params.set("cat", key);
    setParams(params, { replace: true });
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let out = products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
    if (sort === "price_asc")  out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") out = [...out].sort((a, b) => b.price - a.price);
    if (sort === "name_asc")   out = [...out].sort((a, b) => a.name.localeCompare(b.name));
    return out;
  }, [cat, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Title + result count */}
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-ink-900 font-display">All Products</h1>
            <p className="text-ink-500 text-sm mt-1">
              {filtered.length} item{filtered.length !== 1 && "s"}
              {cat !== "all" && ` in ${CATEGORIES.find(c=>c.key===cat)?.label}`}
              {search && ` matching "${search}"`}
            </p>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 bg-white border border-ink-200 rounded-full px-3 py-1.5">
            <SlidersHorizontal size={14} className="text-ink-500" />
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="bg-transparent text-sm font-semibold text-ink-900 outline-none cursor-pointer"
            >
              {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4 relative max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-ink-200 focus:border-coral-500 focus:outline-none text-sm"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700 p-1"
              aria-label="Clear"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCat("all")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              cat === "all"
                ? "bg-coral-500 text-white"
                : "bg-white border border-ink-200 text-ink-900 hover:border-coral-500"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((c) => {
            const Icon = Icons[c.icon] || Icons.ShoppingBag;
            const active = cat === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setCat(c.key)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition flex items-center gap-1.5 ${
                  active
                    ? "bg-coral-500 text-white"
                    : "bg-white border border-ink-200 text-ink-900 hover:border-coral-500"
                }`}
              >
                <Icon size={14} />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {pageItems.length === 0 ? (
          <div className="text-center py-20 text-ink-500">
            <Search size={48} className="mx-auto opacity-30 mb-4" />
            <p className="font-bold text-ink-900">No products found.</p>
            <p className="text-sm mt-1">Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {pageItems.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-full bg-white border border-ink-200 disabled:opacity-40 hover:border-coral-500 font-bold text-sm"
            >
              ← Prev
            </button>
            <span className="px-4 py-2 font-bold text-sm text-ink-900">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-full bg-white border border-ink-200 disabled:opacity-40 hover:border-coral-500 font-bold text-sm"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
