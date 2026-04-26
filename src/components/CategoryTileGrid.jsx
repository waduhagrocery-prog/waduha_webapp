import { Link } from "react-router-dom";

// Lulu-style category tiles — real product cluster photography
// Each tile: rounded square, light bg, photo, label below.
// Curated Unsplash photo IDs that show clusters/products for each department.

const u = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=500&h=500&q=80`;

// Tiles in display order. Matches Lulu's grocery-first then expanding outward.
const TILES = [
  // ─ Hero offers tile (yellow tag) ─────────────────────────────────────
  { key: "top_offers",     label: "Top Offers",        photo: u("photo-1607082348824-0a96f2a4b9da"), to: "/products", featured: true },

  // ─ Active grocery (real products) ─────────────────────────────────────
  { key: "fruits_vegetables", label: "Fruits & Vegetables", photo: u("photo-1610348725531-843dff563e2c"), to: "/products?cat=fruits_vegetables" },
  { key: "dairy_eggs",     label: "Dairy, Eggs & More", photo: u("photo-1559561853-08451507cbe7"),    to: "/products?cat=dairy_eggs" },
  { key: "meat_poultry",   label: "Meat & Seafood",     photo: u("photo-1607623814075-e51df1bdc82f"),    to: "/products?cat=meat_poultry" },
  { key: "rice_grains",    label: "Rice & Pulses",      photo: u("photo-1586201375761-83865001e31c"),    to: "/products?cat=rice_grains" },
  { key: "spices_masala",  label: "Cooking & Spices",   photo: u("photo-1596040033229-a9821ebd058d"),    to: "/products?cat=spices_masala" },
  { key: "beverages",      label: "Water & Beverages",  photo: u("photo-1551024709-8f23befc6f87"),     to: "/products?cat=beverages" },
  { key: "snacks",         label: "Snacks & Chocolate", photo: u("photo-1623595119708-26b1f7500ddd"),    to: "/products?cat=snacks" },
  { key: "bakery",         label: "Bakery",             photo: u("photo-1509440159596-0249088772ff"),    to: "/products?cat=bakery" },
  { key: "frozen",         label: "Frozen Food",        photo: u("photo-1488900128323-21503983a07e"),    to: "/products?cat=frozen" },
  { key: "household",      label: "Cleaning & Laundry", photo: u("photo-1610557892470-55d9e80c0bce"),    to: "/products?cat=household" },

  // ─ Sub-clusters within active categories (drives discovery) ──────────
  { key: "breakfast",      label: "Breakfast Food",     photo: u("photo-1517593456564-83e5ba6826ae"),    to: "/products?q=cereal" },
  { key: "coffee_tea",     label: "Coffee & Tea",       photo: u("photo-1495474472287-4d71bcdd2085"),    to: "/products?q=coffee" },
  { key: "world_foods",    label: "World Foods",        photo: u("photo-1604857261428-fb56e7e4c3e6"),    to: "/products?q=biryani" },
  { key: "condiments",     label: "Condiments & Sauces",photo: u("photo-1620830103381-87c30716f02d"),    to: "/products?q=ketchup" },
  { key: "ice_cream",      label: "Ice Cream",          photo: u("photo-1488900128323-21503983a07e"),    to: "/products?cat=frozen" },
  { key: "oils_ghee",      label: "Oils & Ghee",        photo: u("photo-1474979266404-7eaacbcd87c5"),    to: "/products?q=oil" },
  { key: "speciality",     label: "Speciality Food",    photo: u("photo-1599599810769-bcde5a160d32"),    to: "/products?q=nuts" },

  // ─ Coming soon — full hypermarket departments ─────────────────────────
  { key: "personal_care",  label: "Personal Care",      photo: u("photo-1559590362-3ab5d3aaa999"),    to: "/coming-soon?d=personal_care", soon: true },
  { key: "beauty",         label: "Beauty & Fragrance", photo: u("photo-1556228720-195a672e8a03"),    to: "/coming-soon?d=beauty", soon: true },
  { key: "baby",           label: "Baby & Kids",        photo: u("photo-1607011830408-c5d4dc8d8c02"),    to: "/coming-soon?d=baby", soon: true },
  { key: "pet_care",       label: "Pet Care",           photo: u("photo-1450778869180-41d0601e046e"),    to: "/coming-soon?d=pet_care", soon: true },
  { key: "home_kitchen",   label: "Home & Kitchen",     photo: u("photo-1556909114-f6e7ad7d3136"),    to: "/coming-soon?d=home_kitchen", soon: true },
  { key: "appliances",     label: "Home Appliances",    photo: u("photo-1556910103-1c02745aae4d"),    to: "/coming-soon?d=appliances", soon: true },
  { key: "electronics",    label: "Electronics",        photo: u("photo-1593344484962-796055d4a3a4"),    to: "/coming-soon?d=electronics", soon: true },
  { key: "tv_audio",       label: "TV & Audio",         photo: u("photo-1593359677879-a4bb92f829d1"),    to: "/coming-soon?d=tv_audio", soon: true },
  { key: "mobile",         label: "Mobiles & Tablets",  photo: u("photo-1511707171634-5f897ff02aa9"),    to: "/coming-soon?d=mobile", soon: true },
  { key: "computers",      label: "Computers",          photo: u("photo-1496181133206-80ce9b88a853"),    to: "/coming-soon?d=computers", soon: true },
  { key: "gaming",         label: "Gaming",             photo: u("photo-1542751371-adc38448a05e"),    to: "/coming-soon?d=gaming", soon: true },
  { key: "toys",           label: "Toys & Games",       photo: u("photo-1558060370-d644479cb6f7"),    to: "/coming-soon?d=toys", soon: true },
  { key: "sports",         label: "Sports & Fitness",   photo: u("photo-1517649763962-0c623066013b"),    to: "/coming-soon?d=sports", soon: true },
  { key: "fashion_men",    label: "Fashion - Men",      photo: u("photo-1490481651871-ab68de25d43d"),    to: "/coming-soon?d=fashion_men", soon: true },
  { key: "fashion_women",  label: "Fashion - Women",    photo: u("photo-1581044777550-4cfa60707c03"),    to: "/coming-soon?d=fashion_women", soon: true },
  { key: "shoes_bags",     label: "Shoes & Bags",       photo: u("photo-1542291026-7eec264c27ff"),    to: "/coming-soon?d=shoes_bags", soon: true },
  { key: "watches",        label: "Watches & Jewelry",  photo: u("photo-1523275335684-37898b6baf30"),    to: "/coming-soon?d=watches", soon: true },
  { key: "books",          label: "Books & Stationery", photo: u("photo-1481627834876-b7833e8f5570"),    to: "/coming-soon?d=books", soon: true },
  { key: "home_decor",     label: "Home Furnishing",    photo: u("photo-1555041469-a586c61ea9bc"),    to: "/coming-soon?d=home_decor", soon: true },
  { key: "outdoor",        label: "Camping & Outdoor",  photo: u("photo-1504280390367-361c6d9f38f4"),    to: "/coming-soon?d=outdoor", soon: true },
  { key: "automotive",     label: "Automotive",         photo: u("photo-1503376780353-7e6692767b70"),    to: "/coming-soon?d=automotive", soon: true },
];

export default function CategoryTileGrid() {
  return (
    <section className="bg-cream-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-3">
          {TILES.map((t) => (
            <CategoryTile key={t.key} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTile({ label, photo, to, featured, soon }) {
  return (
    <Link
      to={to}
      className="group flex flex-col items-center text-center transition"
    >
      <div className="relative w-full aspect-square rounded-2xl bg-cream-100 overflow-hidden ring-1 ring-ink-200/50 group-hover:ring-coral-500 group-hover:shadow-card transition">
        {/* Featured top-offers tag */}
        {featured && (
          <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-ink-900 text-[10px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
            Top Offers
          </div>
        )}
        {/* Soon overlay */}
        {soon && (
          <div className="absolute top-2 right-2 z-10 bg-coral-500/90 backdrop-blur text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Soon
          </div>
        )}
        <img
          src={photo}
          alt={label}
          loading="lazy"
          className={`w-full h-full object-cover transition duration-500 group-hover:scale-110 ${
            soon ? "opacity-80" : ""
          }`}
        />
      </div>
      <div className="mt-2 text-xs sm:text-sm font-semibold text-ink-900 leading-tight px-1 line-clamp-2 min-h-[2.4em]">
        {label}
      </div>
    </Link>
  );
}
