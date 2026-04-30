import { Link } from "react-router-dom";
import { MessageCircle, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { STORE } from "../config.js";

export default function Footer() {
  const social = [
    { glyph: "IG", label: "Instagram", href: STORE.socials.instagram, color: "bg-pink-500" },
    { glyph: "FB", label: "Facebook",  href: STORE.socials.facebook,  color: "bg-blue-600" },
    { glyph: "WA", label: "WhatsApp",  href: `https://wa.me/${STORE.whatsapp}`, color: "bg-leaf-500" },
  ];

  return (
    <footer className="bg-ink-900 text-white mt-0">
      {/* CTA strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-8 grid md:grid-cols-2 gap-6 items-end border-b border-white/10">
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-display">Join {STORE.name}</h3>
          <p className="text-ink-400 text-sm mt-1">Follow us for daily deals & fresh arrivals</p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full pl-1 pr-4 py-1 text-sm font-semibold flex items-center gap-2 transition"
            >
              <span className={`w-7 h-7 rounded-full ${s.color} text-white text-[10px] font-extrabold flex items-center justify-center`}>
                {s.glyph}
              </span>
              {s.label}
              <ArrowRight size={12} className="opacity-50" />
            </a>
          ))}
        </div>
      </div>

      {/* Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2.5 mb-3">
            <img src="/logo.svg" alt="Waduha Grocery" className="w-12 h-12 bg-white rounded-full p-0.5" />
            <div className="font-extrabold text-lg font-display">{STORE.name} <span className="text-leaf-400">Grocery</span></div>
          </Link>
          <p className="text-sm text-ink-400 leading-relaxed">
            Your neighborhood grocery store, open 24/7 in Karama. Fresh produce,
            household essentials, and everything in between — at discounted
            prices, with free home delivery.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-sm">Quick Links</h4>
          <ul className="space-y-2 text-sm text-ink-400">
            <li><Link to="/products" className="hover:text-white">Shop All</Link></li>
            <li><Link to="/contact" className="hover:text-white">About Us</Link></li>
            <li><Link to="/products?cat=fruits_vegetables" className="hover:text-white">Fresh Produce</Link></li>
            <li><Link to="/products?cat=spices_masala" className="hover:text-white">Spices & Masala</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-sm">Contact</h4>
          <ul className="space-y-2 text-sm text-ink-400">
            <li className="flex items-start gap-2">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <a href={STORE.mapUrl} target="_blank" rel="noreferrer" className="hover:text-white">
                {STORE.location}, UAE — <span className="underline">View on map</span>
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} />
              <a href={`tel:${STORE.phone1}`} className="hover:text-white">{STORE.phoneDisplay1}</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} />
              <a href={`tel:${STORE.phone2}`} className="hover:text-white">{STORE.phoneDisplay2}</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock size={14} />
              <span>{STORE.hoursShort}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-sm">Also Available On</h4>
          <ul className="space-y-2">
            <li>
              <a href="https://www.noon.com/" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-yellow-400 text-ink-900 flex items-center justify-center text-xs font-extrabold">N</span>
                  Noon
                </span>
                <ArrowRight size={14} className="opacity-50" />
              </a>
            </li>
            <li>
              <a href="https://www.amazon.ae/" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded bg-orange-400 text-ink-900 flex items-center justify-center text-xs font-extrabold">A</span>
                  Amazon.ae
                </span>
                <ArrowRight size={14} className="opacity-50" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Payment methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="text-xs text-ink-400 font-semibold uppercase tracking-wide">We Accept</div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Cash on Delivery", bg: "bg-leaf-600" },
              { label: "Visa",             bg: "bg-blue-600" },
              { label: "Mastercard",       bg: "bg-red-600" },
            ].map((p) => (
              <span key={p.label} className={`${p.bg} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md`}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 text-xs text-ink-400 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 max-w-7xl mx-auto">
        <div>© {new Date().getFullYear()} {STORE.fullName}. All rights reserved.</div>
        <div>Delivering everything to Al Karama & beyond →</div>
      </div>
    </footer>
  );
}
