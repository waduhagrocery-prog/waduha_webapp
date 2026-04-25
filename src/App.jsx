import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx";
import { STORE } from "./config.js";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <div className="text-center py-20">
                <h1 className="text-3xl font-extrabold">404</h1>
                <p>Page not found.</p>
              </div>
            }
          />
        </Routes>
      </div>
      <Footer />

      {/* Floating WhatsApp button */}
      <a
        href={`https://wa.me/${STORE.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Order on WhatsApp"
        className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-2xl z-50"
      >
        💬
      </a>
    </div>
  );
}
