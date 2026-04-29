import { Link, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { CheckCircle2, MessageCircle, Phone, Sparkles, Clock, Home, ArrowRight } from "lucide-react";
import { STORE } from "../config.js";
import { useLoyalty } from "../loyalty.jsx";

export default function OrderConfirmed() {
  const [params] = useSearchParams();
  const total = parseFloat(params.get("total") || "0");
  const earned = parseInt(params.get("points") || "0", 10);

  return (
    <main className="bg-cream-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white border border-ink-200 rounded-3xl p-6 sm:p-10 text-center shadow-card">
          <div className="w-20 h-20 mx-auto rounded-full bg-leaf-500/10 text-leaf-600 flex items-center justify-center mb-5">
            <CheckCircle2 size={48} strokeWidth={2} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink-900 font-display mb-2">
            Order Sent!
          </h1>
          <p className="text-ink-500 text-base mb-6 max-w-md mx-auto">
            Your order has been sent to {STORE.name} on WhatsApp. We'll confirm
            availability and delivery time within a few minutes.
          </p>

          {total > 0 && (
            <div className="bg-cream-100 rounded-2xl p-4 mb-6 inline-block min-w-[200px]">
              <div className="text-xs uppercase tracking-wider text-ink-500 font-semibold">Order Total</div>
              <div className="text-2xl font-extrabold text-coral-500 font-display">AED {total.toFixed(2)}</div>
            </div>
          )}

          {earned > 0 && (
            <div className="bg-coral-500/10 border border-coral-500/20 rounded-2xl p-4 mb-6 inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-coral-500 text-white flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <div className="text-xs uppercase tracking-wider text-coral-700 font-bold">You earned</div>
                <div className="text-lg font-extrabold text-ink-900">+{earned} Waduha Points</div>
              </div>
            </div>
          )}

          <div className="bg-ink-900 text-white rounded-2xl p-5 mt-6 text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-coral-400 mb-2">What happens next</div>
            <ol className="space-y-2 text-sm">
              <li className="flex gap-2"><span className="font-bold text-coral-400">1.</span> We confirm availability via WhatsApp (~5 min)</li>
              <li className="flex gap-2"><span className="font-bold text-coral-400">2.</span> We pack your order from our store in Al Karama</li>
              <li className="flex gap-2"><span className="font-bold text-coral-400">3.</span> Driver delivers in 20–30 minutes</li>
              <li className="flex gap-2"><span className="font-bold text-coral-400">4.</span> Pay on delivery — cash or card</li>
            </ol>
          </div>

          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <a
              href={`https://wa.me/${STORE.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bg-leaf-500 hover:bg-leaf-600 text-white font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2"
            >
              <MessageCircle size={14} /> Open WhatsApp
            </a>
            <a
              href={`tel:${STORE.phone1}`}
              className="bg-white border border-ink-200 hover:border-coral-500 text-ink-900 font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2"
            >
              <Phone size={14} /> Call us
            </a>
            <Link
              to="/products"
              className="bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm px-5 py-2.5 rounded-full flex items-center gap-2"
            >
              <ArrowRight size={14} /> Continue Shopping
            </Link>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-ink-500 hover:text-coral-500 text-sm font-semibold flex items-center justify-center gap-1">
            <Home size={14} /> Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
