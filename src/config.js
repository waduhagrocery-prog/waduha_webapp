// Store config — change these and the whole site updates.
export const STORE = {
  name: "Waduha",
  fullName: "Waduha Grocery Store L.L.C S.O.C", // legal name, used in footer fine print
  tagline: "Everything for your home, delivered fast",
  taglineShort: "Everything. Delivered.",
  arabicName: "الضحى",
  location: "Al Karama, Dubai",
  phone1: "+971563786754",
  phone2: "+971527283484",
  phoneDisplay1: "056 378 6754",
  phoneDisplay2: "052 728 3484",
  whatsapp: "971563786754",
  address: "Al Karama, Dubai, UAE",
  hours: "Open 24 Hours",
  hoursShort: "7 AM – 12 AM, Daily",
  deliveryFee: 0,
  currency: "AED",
  socials: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/",
    facebook: "https://facebook.com/",
  },
};

// Future categories teased on the homepage ("Coming Soon" section)
export const COMING_SOON_CATEGORIES = [
  { key: "personal_care", label: "Personal Care", icon: "Sparkles" },
  { key: "baby",          label: "Baby",          icon: "Baby" },
  { key: "beauty",        label: "Beauty",        icon: "Gem" },
  { key: "pet_care",      label: "Pet Care",      icon: "PawPrint" },
  { key: "electronics",   label: "Electronics",   icon: "Smartphone" },
  { key: "home_kitchen",  label: "Home & Kitchen",icon: "Lamp" },
];

// Each category gets an icon name (lucide-react) and a soft tint for the card.
export const CATEGORIES = [
  { key: "fruits_vegetables", label: "Fruits & Vegetables", icon: "Salad",      tint: "bg-leaf-500/10 text-leaf-700" },
  { key: "dairy_eggs",        label: "Dairy & Eggs",        icon: "Milk",       tint: "bg-sun/15 text-yellow-700" },
  { key: "meat_poultry",      label: "Meat & Poultry",      icon: "Drumstick",  tint: "bg-coral-500/10 text-coral-700" },
  { key: "rice_grains",       label: "Rice & Grains",       icon: "Wheat",      tint: "bg-amber-500/10 text-amber-700" },
  { key: "spices_masala",     label: "Spices & Masala",     icon: "Flame",      tint: "bg-red-500/10 text-red-700" },
  { key: "beverages",         label: "Beverages",           icon: "CupSoda",    tint: "bg-sky-500/10 text-sky-700" },
  { key: "snacks",            label: "Snacks",              icon: "Cookie",     tint: "bg-orange-500/10 text-orange-700" },
  { key: "household",         label: "Household",           icon: "SprayCan",   tint: "bg-violet-500/10 text-violet-700" },
  { key: "frozen",            label: "Frozen",              icon: "Snowflake",  tint: "bg-cyan-500/10 text-cyan-700" },
  { key: "bakery",            label: "Bakery",              icon: "Croissant",  tint: "bg-yellow-500/10 text-yellow-700" },
];

export const categoryLabel = (key) =>
  CATEGORIES.find((c) => c.key === key)?.label || key;

export const categoryIcon = (key) =>
  CATEGORIES.find((c) => c.key === key)?.icon || "ShoppingBag";

export const categoryTint = (key) =>
  CATEGORIES.find((c) => c.key === key)?.tint || "bg-ink-100 text-ink-700";
