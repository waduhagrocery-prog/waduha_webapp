import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../cart.jsx";
import { STORE } from "../config.js";

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
      ...items.map(
        (i) =>
          `• ${i.name} × ${i.qty} = ${(i.price * i.qty).toFixed(2)} AED`
      ),
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
      <main className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-4">🛒</div>
        <h1 className="text-3xl font-extrabold text-brand-ink mb-2">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-6">Add some groceries to get started!</p>
        <Link
          to="/products"
          className="inline-block bg-brand-green hover:bg-brand-dark text-white font-bold px-6 py-3 rounded-lg"
        >
          Browse Products
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-brand-ink mb-6">
        Your Cart ({items.length})
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((i) => (
            <div
              key={i.id}
              className="bg-white border border-gray-200 rounded-xl p-3 flex items-center gap-3"
            >
              <div className="w-16 h-16 bg-brand-gray rounded flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                {i.image_url ? (
                  <img src={i.image_url} alt="" className="w-full h-full object-cover" />
                ) : "🛒"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-brand-ink truncate">
                  {i.name}
                </div>
                <div className="text-xs text-gray-500">{i.unit}</div>
                <div className="text-brand-green font-extrabold mt-1">
                  {(i.price * i.qty).toFixed(2)} AED
                  <span className="text-xs text-gray-500 font-normal">
                    {" "}({i.price.toFixed(2)} ea)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(i.id, i.qty - 1)}
                  className="w-8 h-8 rounded bg-brand-gray hover:bg-brand-green hover:text-white font-bold"
                >
                  −
                </button>
                <span className="font-bold w-6 text-center">{i.qty}</span>
                <button
                  onClick={() => setQty(i.id, i.qty + 1)}
                  className="w-8 h-8 rounded bg-brand-gray hover:bg-brand-green hover:text-white font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => remove(i.id)}
                className="text-brand-red hover:text-red-700 text-xl"
                aria-label="Remove"
              >
                ×
              </button>
            </div>
          ))}
          <button
            onClick={clear}
            className="text-sm text-gray-500 hover:text-brand-red"
          >
            Clear cart
          </button>
        </div>

        {/* Checkout form */}
        <form
          onSubmit={placeOrder}
          className="bg-white border border-gray-200 rounded-xl p-5 h-fit lg:sticky lg:top-32 space-y-3"
        >
          <h2 className="font-extrabold text-lg text-brand-ink">
            Order Details
          </h2>
          <input
            type="text"
            required
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded focus:border-brand-green focus:outline-none"
          />
          <input
            type="tel"
            required
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded focus:border-brand-green focus:outline-none"
          />
          <textarea
            required
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded focus:border-brand-green focus:outline-none"
          />
          <textarea
            placeholder="Notes (optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border-2 border-gray-200 rounded focus:border-brand-green focus:outline-none"
          />

          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">{total.toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery</span>
              <span className="font-bold text-brand-green">FREE</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t mt-2">
              <span className="font-extrabold">Total</span>
              <span className="font-extrabold text-brand-green">
                {total.toFixed(2)} AED
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-brand-red hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow"
          >
            💬 Place Order on WhatsApp
          </button>
          <p className="text-xs text-gray-500 text-center">
            You'll be redirected to WhatsApp to confirm with the store.
          </p>
        </form>
      </div>
    </main>
  );
}
