import { useState } from "react";
import { MapPin, ChevronDown, Truck, Zap, Globe } from "lucide-react";
import { STORE } from "../config.js";

// Slim top strip — Lulu-style
export default function UtilityBar() {
  const [delivery, setDelivery] = useState("scheduled");

  return (
    <div className="bg-cream-100 border-b border-ink-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3 text-xs">
        {/* Left: location (links to Google Maps) */}
        <a
          href={STORE.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 font-semibold text-ink-700 hover:text-coral-500 transition shrink-0"
        >
          <MapPin size={14} className="text-coral-500" />
          <span className="hidden sm:inline">Deliver to:</span>
          <span className="text-ink-900">{STORE.location}</span>
          <ChevronDown size={12} />
        </a>

        {/* Center: delivery options pill */}
        <div className="hidden md:flex items-center bg-white border border-ink-200 rounded-full p-0.5 gap-0.5">
          <button
            onClick={() => setDelivery("scheduled")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
              delivery === "scheduled"
                ? "bg-leaf-500 text-white"
                : "text-ink-700 hover:text-ink-900"
            }`}
          >
            <Truck size={12} />
            Scheduled
            <span className="opacity-80 font-medium">Get it Today</span>
          </button>
          <button
            onClick={() => setDelivery("quick")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
              delivery === "quick"
                ? "bg-coral-500 text-white"
                : "text-ink-700 hover:text-ink-900"
            }`}
          >
            <Zap size={12} />
            Quick
            <span className="opacity-80 font-medium">30 mins</span>
          </button>
        </div>

        {/* Right: language + flag */}
        <div className="flex items-center gap-3 text-ink-700 shrink-0">
          <button className="flex items-center gap-1 font-semibold hover:text-coral-500">
            <Globe size={12} />
            <span className="hidden sm:inline">EN</span>
            <span className="text-ink-400">/</span>
            <span dir="rtl" className="font-arabic">العربية</span>
          </button>
          <span className="text-base">🇦🇪</span>
        </div>
      </div>
    </div>
  );
}
