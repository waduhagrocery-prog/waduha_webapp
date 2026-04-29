import { Phone, MessageCircle, MapPin, Clock, Truck, Navigation, ExternalLink } from "lucide-react";
import { STORE } from "../config.js";

export default function Contact() {
  return (
    <main className="bg-cream-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-ink-900 font-display mb-2">
          Get in Touch
        </h1>
        <p className="text-ink-500 mb-8">
          Open 24 hours — call, message, or visit us anytime.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <a
            href={`tel:${STORE.phone1}`}
            className="bg-white border border-ink-200 hover:border-coral-500 rounded-2xl p-6 group transition"
          >
            <div className="w-10 h-10 rounded-xl bg-coral-500/10 text-coral-500 flex items-center justify-center mb-3">
              <Phone size={20} />
            </div>
            <div className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Call us</div>
            <div className="text-xl font-bold text-ink-900 mt-1 group-hover:text-coral-500 transition">
              {STORE.phoneDisplay1}
            </div>
            <div className="text-sm text-ink-500 mt-0.5">{STORE.phoneDisplay2}</div>
          </a>
          <a
            href={`https://wa.me/${STORE.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="bg-leaf-500 hover:bg-leaf-600 text-white rounded-2xl p-6 group transition"
          >
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-3">
              <MessageCircle size={20} />
            </div>
            <div className="text-xs font-semibold opacity-85 uppercase tracking-wide">WhatsApp</div>
            <div className="text-xl font-bold mt-1">Chat with us now →</div>
            <div className="text-sm opacity-85 mt-0.5">Order, ask, or get a quote</div>
          </a>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-white border border-ink-200 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-leaf-500/10 text-leaf-600 flex items-center justify-center mb-3">
              <Truck size={20} />
            </div>
            <div className="font-bold text-ink-900">Free & Fast Delivery</div>
            <p className="text-sm text-ink-500 mt-1">
              Across Al Karama and nearby — usually within 30 minutes. No minimum.
            </p>
          </div>
          <div className="bg-white border border-ink-200 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-coral-500/10 text-coral-500 flex items-center justify-center mb-3">
              <Clock size={20} />
            </div>
            <div className="font-bold text-ink-900">Open 24 Hours</div>
            <p className="text-sm text-ink-500 mt-1">
              Need something at 3 AM? We're open. Just give us a call.
            </p>
          </div>
        </div>

        <div className="bg-white border border-ink-200 rounded-2xl overflow-hidden">
          <div className="p-6 pb-4">
            <div className="flex items-center gap-2 text-coral-500 text-xs font-bold uppercase tracking-wide mb-2">
              <MapPin size={14} /> Visit Us
            </div>
            <div className="text-xl font-extrabold text-ink-900 font-display mb-1">
              {STORE.name} <span className="text-ink-400 text-base font-medium">— {STORE.arabicName}</span>
            </div>
            <p className="text-ink-500 text-sm leading-relaxed">
              {STORE.fullName}
              <br />
              {STORE.address}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={STORE.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm px-4 py-2.5 rounded-full"
              >
                <Navigation size={14} />
                Get Directions
              </a>
              <a
                href={STORE.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-white border border-ink-200 hover:border-coral-500 text-ink-900 font-bold text-sm px-4 py-2.5 rounded-full"
              >
                Open in Google Maps <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Embedded map */}
          <div className="border-t border-ink-200">
            <iframe
              src={STORE.mapEmbedUrl}
              title={`${STORE.name} location`}
              loading="lazy"
              className="w-full h-72 sm:h-80 block"
              style={{ border: 0 }}
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
