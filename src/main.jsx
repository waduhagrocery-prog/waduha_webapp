import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./cart.jsx";
import { WishlistProvider } from "./wishlist.jsx";
import { RecentlyViewedProvider } from "./recentlyViewed.jsx";
import { LoyaltyProvider } from "./loyalty.jsx";
import { I18nProvider } from "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <I18nProvider>
        <CartProvider>
          <WishlistProvider>
            <RecentlyViewedProvider>
              <LoyaltyProvider>
                <App />
              </LoyaltyProvider>
            </RecentlyViewedProvider>
          </WishlistProvider>
        </CartProvider>
      </I18nProvider>
    </BrowserRouter>
  </StrictMode>
);
