import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Lulu-style horizontal "shop by brand" strip — pure visual, links to filtered search
const BRANDS = [
  { name: "Almarai",  letter: "A", color: "bg-blue-600" },
  { name: "Nestle",   letter: "N", color: "bg-red-600" },
  { name: "Kellogg's",letter: "K", color: "bg-red-700" },
  { name: "Pepsi",    letter: "P", color: "bg-blue-700" },
  { name: "Knorr",    letter: "K", color: "bg-green-700" },
  { name: "Cadbury",  letter: "C", color: "bg-purple-700" },
  { name: "KitKat",   letter: "Kk",color: "bg-red-800" },
  { name: "Lipton",   letter: "L", color: "bg-yellow-600" },
  { name: "Lays",     letter: "L", color: "bg-yellow-500" },
  { name: "Tang",     letter: "T", color: "bg-orange-500" },
  { name: "Quaker",   letter: "Q", color: "bg-blue-800" },
  { name: "Heinz",    letter: "H", color: "bg-red-700" },
];

export default function BrandShowcase() {
  return (
    <section className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-coral-500 text-[10px] font-bold uppercase tracking-wider bg-coral-500/10 px-2 py-1 rounded-full mb-2">
              Featured Brands
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink-900 font-display">
              Shop by Brand
            </h2>
          </div>
          <Link to="/products" className="text-coral-500 hover:text-coral-600 font-semibold text-xs flex items-center gap-1">
            View All <ArrowRight size={12} />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 sm:-mx-6 px-4 sm:px-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {BRANDS.map((b) => (
            <Link
              key={b.name}
              to={`/products?q=${encodeURIComponent(b.name)}`}
              className="shrink-0 bg-white border border-ink-200 hover:border-coral-500 rounded-2xl p-4 w-32 text-center transition group"
            >
              <div className={`w-14 h-14 mx-auto rounded-xl ${b.color} text-white flex items-center justify-center font-extrabold text-xl mb-2 group-hover:scale-110 transition`}>
                {b.letter}
              </div>
              <div className="text-xs font-bold text-ink-900">{b.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
