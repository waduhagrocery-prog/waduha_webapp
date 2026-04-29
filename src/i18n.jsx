import { createContext, useContext, useEffect, useState, useCallback } from "react";

const I18nCtx = createContext(null);

// Translation tables — only UI strings, NOT product names (those stay as-is).
const STRINGS = {
  // Header / nav
  shop_now: { en: "Shop Now", ar: "تسوق الآن" },
  search_placeholder: { en: 'Search for "anything"…', ar: "...ابحث عن أي شيء" },
  cart: { en: "Cart", ar: "السلة" },
  account: { en: "Account", ar: "الحساب" },
  bank_offers: { en: "Bank Offers", ar: "عروض البنك" },
  up_to: { en: "Up to {n}%", ar: "حتى {n}%" },
  hypermarket: { en: "Hypermarket", ar: "هايبرماركت" },
  deliver_to: { en: "Deliver to:", ar: ":التوصيل إلى" },
  scheduled: { en: "Scheduled", ar: "مجدول" },
  quick: { en: "Quick", ar: "سريع" },
  get_today: { en: "Get it Today", ar: "اليوم" },
  thirty_mins: { en: "30 mins", ar: "30 دقيقة" },
  all_categories: { en: "All Categories", ar: "كل الفئات" },
  grocery: { en: "Grocery", ar: "بقالة" },
  fresh_food: { en: "Fresh Food", ar: "طعام طازج" },
  electronics: { en: "Electronics", ar: "إلكترونيات" },
  home_living: { en: "Home & Living", ar: "المنزل والعيش" },
  festive: { en: "Festive", ar: "احتفالي" },
  deals: { en: "Deals", ar: "العروض" },

  // Hero
  hero_eyebrow: { en: "Now Delivering in Al Karama", ar: "نوصل الآن في الكرامة" },
  hero_title_a: { en: "Everything for your home,", ar: "كل ما يلزم لمنزلك،" },
  hero_title_b: { en: "delivered fast.", ar: "بتوصيل سريع." },
  use_code: { en: "Use Code", ar: "استخدم الكود" },
  off: { en: "OFF", ar: "خصم" },
  min_order: { en: "Min. order AED {n}", ar: "{n} حد أدنى AED" },

  // Sections
  shop_by_category: { en: "Shop by Category", ar: "تسوق حسب الفئة" },
  view_all: { en: "View All", ar: "عرض الكل" },
  trending_in_karama: { en: "Trending in Karama", ar: "الأكثر طلبًا في الكرامة" },
  most_demanded: { en: "Most Demanded Items", ar: "المنتجات الأكثر طلبًا" },
  best_sellers: { en: "Best Sellers", ar: "الأكثر مبيعًا" },
  new_arrivals: { en: "New Arrivals", ar: "وصل حديثًا" },
  todays_offers: { en: "Today's Best Offers", ar: "أفضل عروض اليوم" },
  why_loved: { en: "Why Karama Loves Us", ar: "لماذا تحبنا الكرامة" },
  free_delivery: { en: "Free Delivery", ar: "توصيل مجاني" },
  twenty_four: { en: "Open 24 Hours", ar: "مفتوح 24 ساعة" },
  fresh_daily: { en: "Fresh Daily", ar: "طازج يوميًا" },
  best_prices: { en: "Best Prices", ar: "أفضل الأسعار" },

  // Product card
  add: { en: "Add", ar: "أضف" },
  out_of_stock: { en: "Out of Stock", ar: "غير متوفر" },

  // Cart
  your_cart: { en: "Your Cart", ar: "سلة التسوق" },
  cart_empty: { en: "Your cart is empty", ar: "سلة التسوق فارغة" },
  browse_products: { en: "Browse Products", ar: "تصفح المنتجات" },
  order_details: { en: "Order Details", ar: "تفاصيل الطلب" },
  your_name: { en: "Your name", ar: "اسمك" },
  phone_number: { en: "Phone number", ar: "رقم الهاتف" },
  delivery_address: { en: "Delivery address", ar: "عنوان التوصيل" },
  notes_optional: { en: "Notes (optional)", ar: "ملاحظات (اختياري)" },
  subtotal: { en: "Subtotal", ar: "الإجمالي الفرعي" },
  delivery: { en: "Delivery", ar: "التوصيل" },
  free: { en: "FREE", ar: "مجانًا" },
  total: { en: "Total", ar: "الإجمالي" },
  place_order_whatsapp: { en: "Place Order on WhatsApp", ar: "ضع الطلب على واتساب" },

  // Misc
  coming_soon: { en: "Coming Soon", ar: "قريبًا" },
  notify_me: { en: "Notify Me", ar: "أبلغني" },
  get_directions: { en: "Get Directions", ar: "احصل على الاتجاهات" },
  view_on_map: { en: "View on map", ar: "عرض على الخريطة" },
};

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("kp_lang") || "en");

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem("kp_lang", l);
    document.documentElement.lang = l;
    document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const t = useCallback((key, vars = {}) => {
    const entry = STRINGS[key];
    if (!entry) return key;
    let s = entry[lang] || entry.en;
    Object.entries(vars).forEach(([k, v]) => {
      s = s.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    });
    return s;
  }, [lang]);

  return (
    <I18nCtx.Provider value={{ lang, setLang, t, isRTL: lang === "ar" }}>
      {children}
    </I18nCtx.Provider>
  );
}

export const useI18n = () => useContext(I18nCtx);
