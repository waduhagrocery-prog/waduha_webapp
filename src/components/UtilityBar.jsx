import { useState } from "react";
import { MapPin, ChevronDown, Truck, Zap, Globe } from "lucide-react";
import { STORE } from "../config.js";
import { useI18n } from "../i18n.jsx";

export default function UtilityBar() {
  const { lang, setLang, t } = useI18n();
  const [delivery, setDelivery] = useState("scheduled");

  return (
    <div className="bg-cream-100 border-b border-ink-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between gap-3 text-xs">
        {/* Left: location → maps */}
        <a
          href={STORE.mapUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 font-semibold text-ink-700 hover:text-coral-500 transition shrink-0"
        >
          <MapPin size={14} className="text-coral-500" />
          <span className="hidden sm:inline">{t("deliver_to")}</span>
          <span className="text-ink-900">{STORE.location}</span>
          <ChevronDown size={12} />
        </a>

        {/* Center: delivery toggle */}
        <div className="hidden md:flex items-center bg-white border border-ink-200 rounded-full p-0.5 gap-0.5">
          <button
            onClick={() => setDelivery("scheduled")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
              delivery === "scheduled" ? "bg-leaf-500 text-white" : "text-ink-700 hover:text-ink-900"
            }`}
          >
            <Truck size={12} />
            {t("scheduled")}
            <span className="opacity-80 font-medium">{t("get_today")}</span>
          </button>
          <button
            onClick={() => setDelivery("quick")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition ${
              delivery === "quick" ? "bg-coral-500 text-white" : "text-ink-700 hover:text-ink-900"
            }`}
          >
            <Zap size={12} />
            {t("quick")}
            <span className="opacity-80 font-medium">{t("thirty_mins")}</span>
          </button>
        </div>

        {/* Right: language toggle (functional) */}
        <div className="flex items-center gap-3 text-ink-700 shrink-0">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            aria-label="Toggle language"
            className="flex items-center gap-1 font-semibold hover:text-coral-500"
          >
            <Globe size={12} />
            {lang === "en" ? (
              <>
                <span className="font-bold text-coral-500">EN</span>
                <span className="text-ink-400">/</span>
                <span dir="rtl">العربية</span>
              </>
            ) : (
              <>
                <span dir="rtl">EN</span>
                <span className="text-ink-400">/</span>
                <span className="font-bold text-coral-500" dir="rtl">العربية</span>
              </>
            )}
          </button>
          <span className="text-base">🇦🇪</span>
        </div>
      </div>
    </div>
  );
}
