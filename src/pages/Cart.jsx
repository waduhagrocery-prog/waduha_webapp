import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingBag, Plus, Minus, Trash2, MessageCircle, Truck } from "lucide-react";
import * as Icons from "lucide-react";
import { useCart } from "../cart.jsx";
import { CATEGORIES, STORE } from "../config.js";

const iconFor = (catKey) => {
  const c = CATEGORIES.find((c) => c.key === catKey);
  return Icons[c?.icon] || Icons.ShoppingBag;
};

export default function Cart() {
  const { items, setQty, remove, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const buildWhatsAppMessage = () => {
    const lines = [
      `*New Order — ${STORE.name}*`,
      "",
      `*Customer:* ${name || "(not provided)"}`,
      `*Phone:* ${phone || "(not provided)"}`,
      `*Address:* ${address || "(not provided)"}`,
      "",
      "*Items:*",
      ...items.map((i) => `• ${i.name} × ${i.qty} = ${(i.price * i.qty).toFixed(2)} AED`),
      "",
      `*Total: ${total.toFixed(2)} AED*`,
      notes ? `\n*Notes:* ${notes}` : "",
    ];
    return encodeURIComponent(lines.filter(Boolean).join("\n"));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (items.length === 0) return;
    const url = `https://wa.me/${STORE.whatsapp}?text=${buildWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <main className="bg-cream-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-20 text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-coral-500/10 text-coral-500 flex items-center justify-center mb-5">
            <ShoppingBag size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl font-extrabold text-ink-900 font-display mb-2">Your cart is empty</h1>
          <p className="text-ink-500 mb-6">Add some essentials to get started!</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-coral-500 hover:bg-coral-600 text-white font-bold px-6 py-3 rounded-full"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-extrabold text-ink-900 font-display mb-1">Your Cart</h1>
        <p className="text-ink-500 text-sm mb-6">{items.length} item{items.length !== 1 && "s"}</p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((i) => {
              const Icon = iconFor(i.category);
              return (
                <div key={i.id} className="bg-white border border-ink-200 rounded-2xl p-3 sm:p-4 flex items-center gap-3">
                  <div className="w-16 h-16 bg-cream-100 rounded-xl flex items-center justify-center text-ink-400 shrink-0 overflow-hidden">
                    {i.image_url ? (
                      <img src={i.image_url} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Icon size={24} strokeWidth={1.5} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-ink-900 truncate">{i.name}</div>
                    {i.unit && <div className="text-xs text-ink-500">{i.unit}</div>}
                    <div className="text-coral-500 font-extrabold mt-1 text-base">
                      AED {(i.price * i.qty).toFixed(2)}
                      <span className="text-xs text-ink-400 font-normal"> ({i.price.toFixed(2)} ea)</span>
                    </div>
                  </div>
                  <div className="flex items-center bg-cream-100 rounded-full overflow-hidden">
                    <button onClick={() => setQty(i.id, i.qty - 1)} className="w-8 h-8 hover:bg-coral-500 hover:text-white flex items-center justify-center">
                      <Minus size={14} />
                    </button>
                    <span className="px-2 text-sm font-bold min-w-[24px] text-center">{i.qty}</span>
                    <button onClick={() => setQty(i.id, i.qty + 1)} className="w-8 h-8 hover:bg-coral-500 hover:text-white flex items-center justify-center">
                      <Plus size={14} />
                    </button>
                  </div>
                  <button onClick={() => remove(i.id)} className="text-ink-400 hover:text-coral-500 p-2" aria-label="Remove">
                    <Trash2 size={16} />
                  </button>
                </div>
              );
            })}
            <button onClick={clear} className="text-sm text-ink-500 hover:text-coral-500">
              Clear cart
            </button>
          </div>

          {/* Checkout */}
          <form onSubmit={placeOrder} className="bg-white border border-ink-200 rounded-2xl p-5 h-fit lg:sticky lg:top-24 space-y-3">
            <h2 className="font-extrabold text-lg text-ink-900 font-display">Order Details</h2>

            <input type="text" required placeholder="Your name" value={name} onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-ink-200 rounded-xl focus:border-coral-500 focus:outline-none text-sm" />
            <input type="tel" required placeholder="Phone number" value={phone} onChange={(e)=>setPhone(e.target.value)}
              className="w-full px-4 py-2.5 border border-ink-200 rounded-xl focus:border-coral-500 focus:outline-none text-sm" />
            <textarea required placeholder="Delivery address" value={address} onChange={(e)=>setAddress(e.target.value)} rows={2}
              className="w-full px-4 py-2.5 border border-ink-200 rounded-xl focus:border-coral-500 focus:outline-none text-sm resize-none" />
            <textarea placeholder="Notes (optional)" value={notes} onChange={(e)=>setNotes(e.target.value)} rows={2}
              className="w-full px-4 py-2.5 border border-ink-200 rounded-xl focus:border-coral-500 focus:outline-none text-sm resize-none" />

            <div className="border-t border-ink-200 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="text-ink-500">Subtotal</span><span className="font-bold text-ink-900">AED {total.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-ink-500 flex items-center gap-1"><Truck size={14} /> Delivery</span><span className="font-bold text-leaf-600">FREE</span></div>
              <div className="flex justify-between text-lg pt-2 border-t border-ink-200 mt-2">
                <span className="font-extrabold text-ink-900">Total</span>
                <span className="font-extrabold text-coral-500">AED {total.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" className="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 shadow-soft">
              <MessageCircle size={16} /> Place Order on WhatsApp
            </button>
            <p className="text-[11px] text-ink-500 text-center">
              You'll be redirected to WhatsApp to confirm with the store.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
