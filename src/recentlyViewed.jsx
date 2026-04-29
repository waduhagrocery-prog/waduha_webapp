import { createContext, useContext, useEffect, useState, useCallback } from "react";

const RecentCtx = createContext(null);
const MAX = 12;

export function RecentlyViewedProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kp_recent") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("kp_recent", JSON.stringify(ids));
  }, [ids]);

  const track = useCallback((id) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((x) => x !== id)].slice(0, MAX);
      return next;
    });
  }, []);

  return (
    <RecentCtx.Provider value={{ ids, track }}>
      {children}
    </RecentCtx.Provider>
  );
}

export const useRecentlyViewed = () => useContext(RecentCtx);
