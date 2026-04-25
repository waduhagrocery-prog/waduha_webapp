import { STORE } from "../config.js";

export default function Contact() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-ink mb-2">
        Get in Touch
      </h1>
      <p className="text-gray-600 mb-8">
        We're open 24 hours — call, message, or visit us anytime.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <a
          href={`tel:${STORE.phone1}`}
          className="bg-brand-green hover:bg-brand-dark text-white p-6 rounded-xl font-bold text-center"
        >
          <div className="text-4xl mb-2">📞</div>
          <div className="text-sm opacity-90">Call us</div>
          <div className="text-xl">{STORE.phoneDisplay1}</div>
        </a>
        <a
          href={`https://wa.me/${STORE.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="bg-brand-red hover:bg-red-700 text-white p-6 rounded-xl font-bold text-center"
        >
          <div className="text-4xl mb-2">💬</div>
          <div className="text-sm opacity-90">WhatsApp</div>
          <div className="text-xl">Chat Now</div>
        </a>
      </div>

      <div className="bg-brand-yellow rounded-xl p-6 mb-6">
        <h2 className="font-extrabold text-brand-dark text-xl mb-2">
          🛵 Fast & Free Delivery
        </h2>
        <p className="text-brand-dark text-sm">
          We deliver across Karama and nearby areas — usually within 30 minutes
          of your order. No minimum.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="font-extrabold text-brand-ink text-xl mb-3">
          📍 Our Store
        </h2>
        <p className="text-gray-700 leading-relaxed">
          <strong>{STORE.name}</strong> ({STORE.arabicName})
          <br />
          {STORE.address}
          <br />
          <span className="inline-block mt-2 bg-brand-green text-white px-3 py-1 rounded font-bold text-sm">
            Open 24 Hours
          </span>
        </p>
        <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
          <div>
            <span className="font-bold text-brand-green">Phone 1:</span>{" "}
            <a
              href={`tel:${STORE.phone1}`}
              className="hover:underline text-brand-ink"
            >
              {STORE.phoneDisplay1}
            </a>
          </div>
          <div>
            <span className="font-bold text-brand-green">Phone 2:</span>{" "}
            <a
              href={`tel:${STORE.phone2}`}
              className="hover:underline text-brand-ink"
            >
              {STORE.phoneDisplay2}
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
