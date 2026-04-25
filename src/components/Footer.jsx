import { STORE } from "../config.js";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-brand-green text-white flex items-center justify-center font-extrabold">
              K
            </div>
            <div className="font-extrabold text-xl">{STORE.name}</div>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            {STORE.arabicName}<br />
            {STORE.address}
          </p>
          <div className="inline-block mt-3 bg-brand-yellow text-brand-dark px-3 py-1 rounded font-bold text-sm">
            {STORE.hours}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3 text-brand-yellow">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>
              📞 <a href={`tel:${STORE.phone1}`} className="hover:underline">
                {STORE.phoneDisplay1}
              </a>
            </li>
            <li>
              📞 <a href={`tel:${STORE.phone2}`} className="hover:underline">
                {STORE.phoneDisplay2}
              </a>
            </li>
            <li>
              💬 <a
                href={`https://wa.me/${STORE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                WhatsApp Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-3 text-brand-yellow">Why Us</h3>
          <ul className="space-y-2 text-sm opacity-95">
            <li>🛵 Fast & Free Delivery</li>
            <li>🕐 Open 24 Hours</li>
            <li>💰 Best Prices in Town</li>
            <li>✅ Fresh Daily Stock</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 text-center text-xs opacity-80 py-4 px-4">
        © {new Date().getFullYear()} {STORE.name}. All rights reserved.
      </div>
    </footer>
  );
}
