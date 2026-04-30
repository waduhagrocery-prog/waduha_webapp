// Store config — change these and the whole site updates.
export const STORE = {
  name: "Waduha",
  fullName: "Waduha Grocery Store L.L.C S.O.C",
  tagline: "Everything for your home, delivered fast",
  taglineShort: "Everything. Delivered.",
  arabicName: "الضحى",
  location: "Karama, Dubai",
  phone1: "+971563786754",
  phone2: "+971527283484",
  phoneDisplay1: "056 378 6754",
  phoneDisplay2: "052 728 3484",
  whatsapp: "971563786754",
  address: "Behind Sangeetha Restaurant, Sheikh Hamdan Colony, Karama, Dubai, UAE",
  addressShort: "Behind Sangeetha Restaurant, Karama",
  mapUrl: "https://maps.app.goo.gl/mQLdR6azw9JaKbVj6",
  mapEmbedUrl: "https://maps.google.com/maps?q=Waduha%20Grocery%20Store%20Sheikh%20Hamdan%20Colony%20Karama%20Dubai&t=&z=17&ie=UTF8&iwloc=&output=embed",
  hours: "Open 24/7",
  hoursShort: "Open 24 Hours · 7 Days",
  deliveryFee: 0,
  currency: "AED",
  acceptedPayments: ["Cash on Delivery", "Visa", "Mastercard"],
  socials: {
    facebook:  "https://www.facebook.com/share/18YDAdqG7T/",
    instagram: "https://www.instagram.com/waduha_grocery",
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

// Active categories — products available now.
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

// Full Lulu-style department list shown in the mega menu — current + future
export const ALL_DEPARTMENTS = [
  { key: "fruits_vegetables",    label: "Fresh Produce",         icon: "Salad",      active: true },
  { key: "dairy_eggs",           label: "Dairy & Eggs",          icon: "Milk",       active: true },
  { key: "meat_poultry",         label: "Meat & Poultry",        icon: "Drumstick",  active: true },
  { key: "bakery",               label: "Bakery",                icon: "Croissant",  active: true },
  { key: "rice_grains",          label: "Rice & Grains",         icon: "Wheat",      active: true },
  { key: "spices_masala",        label: "Spices & Masala",       icon: "Flame",      active: true },
  { key: "beverages",            label: "Beverages",             icon: "CupSoda",    active: true },
  { key: "snacks",               label: "Snacks",                icon: "Cookie",     active: true },
  { key: "household",            label: "Household",             icon: "SprayCan",   active: true },
  { key: "frozen",               label: "Frozen Food",           icon: "Snowflake",  active: true },
  { key: "world_foods",          label: "World Foods",           icon: "Globe",      active: true, alias: "spices_masala" },
  { key: "indian_choice",        label: "Indian Food",           icon: "Utensils",   active: true, alias: "spices_masala" },
  { key: "personal_care",        label: "Personal Care",         icon: "Sparkles",   active: false },
  { key: "beauty",               label: "Beauty & Fragrance",    icon: "Gem",        active: false },
  { key: "baby",                 label: "Baby & Kids",           icon: "Baby",       active: false },
  { key: "pet_care",             label: "Pet Care",              icon: "PawPrint",   active: false },
  { key: "home_kitchen",         label: "Home & Kitchen",        icon: "Lamp",       active: false },
  { key: "home_appliances",      label: "Home Appliances",       icon: "WashingMachine", active: false },
  { key: "electronics",          label: "Electronics",           icon: "Smartphone", active: false },
  { key: "tv_audio",             label: "TV & Audio",            icon: "Tv",         active: false },
  { key: "toys_games",           label: "Toys & Games",          icon: "Gamepad2",   active: false },
  { key: "sports_fitness",       label: "Sports & Fitness",      icon: "Dumbbell",   active: false },
  { key: "books_stationery",     label: "Books & Stationery",    icon: "BookOpen",   active: false },
  { key: "home_furnishing",      label: "Home Furnishing",       icon: "Sofa",       active: false },
  { key: "camping_outdoor",      label: "Camping & Outdoor",     icon: "Tent",       active: false },
];

export const categoryLabel = (key) =>
  CATEGORIES.find((c) => c.key === key)?.label || key;

export const categoryIcon = (key) =>
  CATEGORIES.find((c) => c.key === key)?.icon || "ShoppingBag";

export const categoryTint = (key) =>
  CATEGORIES.find((c) => c.key === key)?.tint || "bg-ink-100 text-ink-700";
