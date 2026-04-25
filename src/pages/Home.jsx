import { Link } from "react-router-dom";
import products from "../products.json";
import { CATEGORIES, STORE } from "../config.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const featured = products.slice(0, 12);

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-green to-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block bg-brand-yellow text-brand-dark font-bold px-3 py-1 rounded-full text-sm mb-4">
              🛵 Fast & Free Delivery
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
              {STORE.tagline}
            </h1>
            <p className="text-lg opacity-95 mb-6">
              500+ products · Open 24 hours · Best price in town
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="bg-brand-red hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-lg"
              >
                Shop Now →
              </Link>
              <a
                href={`https://wa.me/${STORE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-brand-green font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-brand-yellow"
              >
                💬 WhatsApp Order
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="text-[180px] leading-none drop-shadow-2xl">🛒</div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-brand-dark font-bold text-sm">
          <div>🛵 Free Delivery</div>
          <div>🕐 24 Hours Open</div>
          <div>💰 Best Prices</div>
          <div>✅ Fresh Daily</div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              to={`/products?cat=${c.key}`}
              className="bg-white border-2 border-gray-100 hover:border-brand-green rounded-xl p-4 text-center transition group"
            >
              <div className="text-4xl mb-2 group-hover:scale-110 transition">
                {c.emoji}
              </div>
              <div className="text-sm font-bold text-brand-ink group-hover:text-brand-green">
                {c.label}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-ink">
            Popular Products
          </h2>
          <Link
            to="/products"
            className="text-brand-green hover:text-brand-dark font-bold text-sm"
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-brand-red text-white">
        <div className="max-w-7xl mx-auto px-4 py-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">
            Need it fast? Order on WhatsApp!
          </h2>
          <p className="opacity-90 mb-4">
            We deliver across Karama and nearby — usually within 30 minutes.
          </p>
          <a
            href={`https://wa.me/${STORE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-white text-brand-red font-bold px-8 py-3 rounded-lg shadow-lg hover:bg-brand-yellow hover:text-brand-dark"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
