import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { MessageCircle } from "lucide-react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import { STORE } from "./config.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50">
      <ScrollToTop />
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div className="text-center py-32">
              <h1 className="text-5xl font-extrabold font-display text-ink-900">404</h1>
              <p className="text-ink-500 mt-2">Page not found.</p>
            </div>
          } />
        </Routes>
      </div>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${STORE.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-5 right-5 bg-leaf-500 hover:bg-leaf-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-card z-50 transition hover:scale-105"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
