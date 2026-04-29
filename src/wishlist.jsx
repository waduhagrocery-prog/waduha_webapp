import { createContext, useContext, useEffect, useState, useCallback } from "react";

const WishlistCtx = createContext(null);

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kp_wishlist") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("kp_wishlist", JSON.stringify(ids));
  }, [ids]);

  const toggle = useCallback((id) => {
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const has = useCallback((id) => ids.includes(id), [ids]);
  const remove = useCallback((id) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  return (
    <WishlistCtx.Provider value={{ ids, toggle, has, remove, clear, count: ids.length }}>
      {children}
    </WishlistCtx.Provider>
  );
}

export const useWishlist = () => useContext(WishlistCtx);
