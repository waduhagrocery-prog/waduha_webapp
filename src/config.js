// Store config — change these and the whole site updates.
export const STORE = {
  name: "Karama Pantry",
  tagline: "Fresh groceries, delivered fast across Dubai",
  arabicName: "بقالة الضحى",
  phone1: "+971563786754",
  phone2: "+971527283484",
  phoneDisplay1: "056 378 6754",
  phoneDisplay2: "052 728 3484",
  whatsapp: "971563786754", // for wa.me link
  address: "Waduha Grocery Store L.L.C S.O.C, Karama, Dubai, UAE",
  hours: "Open 24 Hours",
  deliveryFee: 0, // free delivery
  currency: "AED",
};

export const CATEGORIES = [
  { key: "fruits_vegetables", label: "Fruits & Vegetables", emoji: "🥬" },
  { key: "dairy_eggs", label: "Dairy & Eggs", emoji: "🥛" },
  { key: "meat_poultry", label: "Meat & Poultry", emoji: "🍗" },
  { key: "rice_grains", label: "Rice & Grains", emoji: "🌾" },
  { key: "spices_masala", label: "Spices & Masala", emoji: "🌶️" },
  { key: "beverages", label: "Beverages", emoji: "🥤" },
  { key: "snacks", label: "Snacks", emoji: "🍪" },
  { key: "household", label: "Household", emoji: "🧴" },
  { key: "frozen", label: "Frozen", emoji: "🧊" },
  { key: "bakery", label: "Bakery", emoji: "🍞" },
];

export const categoryLabel = (key) =>
  CATEGORIES.find((c) => c.key === key)?.label || key;

export const categoryEmoji = (key) =>
  CATEGORIES.find((c) => c.key === key)?.emoji || "🛒";
