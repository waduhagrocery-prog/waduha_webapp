import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import * as Icons from "lucide-react";
import { ArrowLeft, Mail, Bell, ArrowRight } from "lucide-react";

const DEPARTMENTS = {
  personal_care: { label: "Personal Care", icon: "Sparkles", desc: "Skincare, fragrance, grooming, and daily essentials. We're curating the best brands.", eta: "Q2 2026", products: ["Premium skincare", "Designer fragrance", "Hair care", "Men's grooming", "Bath & body", "Oral care"] },
  beauty:        { label: "Beauty & Fragrance", icon: "Gem", desc: "Makeup, perfumes, beauty tools — everything to look and feel your best.", eta: "Q2 2026", products: ["Lipstick & lip care", "Eye makeup", "Foundation & blush", "Nail polish", "Perfumes", "Beauty tools"] },
  baby:          { label: "Baby & Kids", icon: "Baby", desc: "Diapers, formula, baby food, toys — everything for your little ones.", eta: "Q1 2026", products: ["Diapers & wipes", "Baby formula", "Baby food", "Bath & skincare", "Strollers", "Toys"] },
  pet_care:      { label: "Pet Care", icon: "PawPrint", desc: "Food, treats, toys, and accessories for your furry family.", eta: "Q3 2026", products: ["Dog food", "Cat food", "Bird food", "Pet treats", "Pet toys", "Pet grooming"] },
  home_kitchen:  { label: "Home & Kitchen", icon: "Lamp", desc: "Cookware, dinnerware, organisation, and everything you need at home.", eta: "Q2 2026", products: ["Cookware", "Knives & utensils", "Plates & cutlery", "Storage", "Cleaning tools", "Kitchen gadgets"] },
  appliances:    { label: "Home Appliances", icon: "WashingMachine", desc: "Small and large appliances to make your home work smarter.", eta: "Q3 2026", products: ["Air fryers", "Blenders & mixers", "Coffee makers", "Vacuum cleaners", "Microwaves", "Irons"] },
  electronics:   { label: "Electronics", icon: "Smartphone", desc: "Headphones, speakers, accessories — gear you can rely on.", eta: "Q2 2026", products: ["Headphones & earbuds", "Bluetooth speakers", "Power banks", "Chargers & cables", "USB drives", "Webcams"] },
  tv_audio:      { label: "TV & Audio", icon: "Tv", desc: "Smart TVs, soundbars, home theatre — entertainment, sorted.", eta: "Q3 2026", products: ["4K Smart TVs", "OLED & QLED", "Soundbars", "Home theatre", "Streaming devices", "TV accessories"] },
  mobile:        { label: "Mobiles & Tablets", icon: "Smartphone", desc: "Latest smartphones, tablets, and accessories from top brands.", eta: "Q2 2026", products: ["Smartphones", "Tablets", "Smart watches", "Phone cases", "Screen protectors", "Chargers"] },
  computers:     { label: "Computers & Laptops", icon: "Laptop", desc: "Laptops, desktops, monitors, and everything for your workspace.", eta: "Q3 2026", products: ["Laptops", "Desktop PCs", "Monitors", "Keyboards & mice", "External drives", "Printers"] },
  gaming:        { label: "Gaming", icon: "Gamepad2", desc: "Consoles, games, accessories — for casual to hardcore gamers.", eta: "Q3 2026", products: ["PlayStation", "Xbox", "Nintendo Switch", "Controllers", "Gaming headsets", "Latest games"] },
  toys:          { label: "Toys & Games", icon: "Gamepad2", desc: "Educational toys, building blocks, board games, and more.", eta: "Q1 2026", products: ["Building blocks", "Educational toys", "Board games", "Outdoor toys", "Soft toys", "Action figures"] },
  sports:        { label: "Sports & Fitness", icon: "Dumbbell", desc: "Gear up for an active lifestyle.", eta: "Q2 2026", products: ["Yoga mats", "Dumbbells", "Resistance bands", "Bicycles", "Running shoes", "Sportswear"] },
  fashion_men:   { label: "Fashion - Men", icon: "Shirt", desc: "T-shirts, jeans, shoes — everyday fashion for men.", eta: "Q3 2026", products: ["T-shirts & polos", "Jeans & trousers", "Shirts", "Shoes & sneakers", "Belts & wallets", "Watches"] },
  fashion_women: { label: "Fashion - Women", icon: "Shirt", desc: "Dresses, abayas, tops — fashion that fits your style.", eta: "Q3 2026", products: ["Dresses", "Abayas", "Tops & blouses", "Jeans", "Heels & flats", "Bags"] },
  shoes_bags:    { label: "Shoes & Bags", icon: "Briefcase", desc: "Footwear and bags for every occasion.", eta: "Q3 2026", products: ["Sneakers", "Formal shoes", "Sandals", "Backpacks", "Handbags", "Luggage"] },
  watches:       { label: "Watches & Jewelry", icon: "Watch", desc: "Timepieces and jewelry for every style.", eta: "Q3 2026", products: ["Smart watches", "Analog watches", "Necklaces", "Earrings", "Bracelets", "Rings"] },
  books:         { label: "Books & Stationery", icon: "BookOpen", desc: "Books, school supplies, office essentials.", eta: "Q2 2026", products: ["Notebooks", "Pens & pencils", "School supplies", "Office supplies", "Books", "Art supplies"] },
  home_decor:    { label: "Home Furnishing", icon: "Sofa", desc: "Bedding, curtains, decor — make your house a home.", eta: "Q3 2026", products: ["Bedsheets", "Pillows & cushions", "Curtains", "Carpets & rugs", "Bath towels", "Wall decor"] },
  outdoor:       { label: "Camping & Outdoor", icon: "Tent", desc: "Tents, BBQ, outdoor gear — for adventures big and small.", eta: "Q4 2026", products: ["Tents", "Sleeping bags", "Camping chairs", "Coolers & flasks", "BBQ grills", "Flashlights"] },
  automotive:    { label: "Automotive", icon: "Car", desc: "Car care, accessories, tools — keep your ride spotless.", eta: "Q4 2026", products: ["Car wash", "Car care", "Phone holders", "Air fresheners", "Tools", "Tyre care"] },
};

export default function ComingSoon() {
  const [params] = useSearchParams();
  const key = params.get("d");
  const dept = DEPARTMENTS[key] || {
    label: "New Department",
    icon: "Sparkles",
    desc: "We're working on bringing this to Waduha soon.",
    eta: "2026",
    products: [],
  };
  const Icon = Icons[dept.icon] || Icons.ShoppingBag;

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Just show confirmation — no backend yet
    setSubmitted(true);
    setEmail("");
  };

  return (
    <main className="bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-1 text-ink-500 hover:text-coral-500 text-sm font-semibold mb-6">
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-br from-coral-500 to-coral-600 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-8 shadow-card">
          <div className="absolute top-4 right-4 bg-white/20 backdrop-blur rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Launching {dept.eta}
          </div>
          <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mb-5">
            <Icon size={32} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold font-display mb-3">{dept.label}</h1>
          <p className="text-white/90 text-base sm:text-lg max-w-xl leading-relaxed">{dept.desc}</p>
          <Icon size={300} className="absolute -right-12 -bottom-12 opacity-10" strokeWidth={1} />
        </div>

        {/* What to expect */}
        {dept.products.length > 0 && (
          <div className="bg-white border border-ink-200 rounded-2xl p-6 sm:p-8 mb-8">
            <div className="text-xs font-bold uppercase tracking-wider text-coral-500 mb-2">Coming to this department</div>
            <h2 className="text-2xl font-extrabold text-ink-900 font-display mb-5">What to expect</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {dept.products.map((p) => (
                <div key={p} className="bg-cream-100 rounded-xl px-4 py-3 text-sm font-semibold text-ink-900 flex items-center gap-2">
                  <ArrowRight size={14} className="text-coral-500 shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notify Me */}
        <div className="bg-ink-900 text-white rounded-2xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-coral-500/20 text-coral-400 flex items-center justify-center shrink-0">
              <Bell size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-extrabold font-display mb-1">Be the first to know</h3>
              <p className="text-ink-400 text-sm mb-4">Get an email the day {dept.label} launches in Waduha. No spam — just one notification.</p>
              {submitted ? (
                <div className="bg-leaf-500/20 border border-leaf-500/40 text-leaf-400 px-4 py-3 rounded-xl text-sm font-semibold">
                  ✓ You're on the list. We'll let you know when {dept.label} goes live.
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-full pl-4 pr-1 py-1">
                    <Mail size={14} className="text-ink-400 shrink-0" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="bg-transparent outline-none text-sm flex-1 min-w-0 px-2 text-white placeholder-ink-500"
                    />
                  </div>
                  <button type="submit" className="bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm px-6 py-2.5 rounded-full shrink-0">
                    Notify Me
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* While you wait */}
        <div className="text-center mt-8">
          <p className="text-ink-500 text-sm">While you wait — explore what's already in stock</p>
          <Link to="/products" className="inline-flex items-center gap-2 mt-2 text-coral-500 hover:text-coral-600 font-bold text-sm">
            Shop our 1,500+ grocery products <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
