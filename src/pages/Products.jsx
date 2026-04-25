import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import products from "../products.json";
import { CATEGORIES } from "../config.js";
import ProductCard from "../components/ProductCard.jsx";

const PAGE_SIZE = 24;

export default function Products() {
  const [params, setParams] = useSearchParams();
  const cat = params.get("cat") || "all";
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const setCat = (key) => {
    if (key === "all") params.delete("cat");
    else params.set("cat", key);
    setParams(params, { replace: true });
    setPage(1);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [cat, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-brand-ink mb-2">
        All Products
      </h1>
      <p className="text-gray-600 mb-6">
        {filtered.length} item{filtered.length !== 1 && "s"}
        {cat !== "all" &&
          ` in ${CATEGORIES.find((c) => c.key === cat)?.label}`}
      </p>

      {/* Search */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-full max-w-md px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-brand-green focus:outline-none"
        />
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setCat("all")}
          className={`px-4 py-2 rounded-full text-sm font-bold transition ${
            cat === "all"
              ? "bg-brand-green text-white"
              : "bg-white border border-gray-200 text-brand-ink hover:border-brand-green"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition ${
              cat === c.key
                ? "bg-brand-green text-white"
                : "bg-white border border-gray-200 text-brand-ink hover:border-brand-green"
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {pageItems.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-6xl mb-4">🛒</div>
          <p className="font-bold">No products found.</p>
          <p className="text-sm">Try a different search or category.</p>
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
        <div className="flex justify-center gap-2 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded bg-white border border-gray-200 disabled:opacity-50 hover:border-brand-green font-bold text-sm"
          >
            ← Prev
          </button>
          <span className="px-4 py-2 font-bold text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded bg-white border border-gray-200 disabled:opacity-50 hover:border-brand-green font-bold text-sm"
          >
            Next →
          </button>
        </div>
      )}
    </main>
  );
}
