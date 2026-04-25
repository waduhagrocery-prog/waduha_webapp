import { Link } from "react-router-dom";
import * as Icons from "lucide-react";
import { ALL_DEPARTMENTS } from "../config.js";

export default function MegaMenuBar() {
  return (
    <div className="bg-white border-b border-ink-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div
          className="flex gap-1 overflow-x-auto py-2 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {ALL_DEPARTMENTS.map((d) => {
            const Icon = Icons[d.icon] || Icons.ShoppingBag;
            const target = d.active ? `/products?cat=${d.alias || d.key}` : "/products";
            return (
              <Link
                key={d.key}
                to={target}
                className={`group shrink-0 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  d.active
                    ? "border-ink-200 hover:border-coral-500 hover:text-coral-600 text-ink-900"
                    : "border-dashed border-ink-200 text-ink-500 hover:text-coral-500 hover:border-coral-500"
                }`}
              >
                <Icon size={14} />
                {d.label}
                {!d.active && (
                  <span className="text-[9px] uppercase tracking-wide bg-coral-500/10 text-coral-600 px-1.5 py-0.5 rounded font-bold">
                    Soon
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
