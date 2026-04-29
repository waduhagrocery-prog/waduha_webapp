import { createContext, useContext, useEffect, useState, useCallback } from "react";

const LoyaltyCtx = createContext(null);

// Earn rate: 1 point per AED spent
const POINTS_PER_AED = 1;
// Redeem rate: 100 points = 1 AED off (configurable later)
export const POINTS_TO_AED = 0.01;

export function LoyaltyProvider({ children }) {
  const [points, setPoints] = useState(() => {
    const v = parseInt(localStorage.getItem("kp_points") || "0", 10);
    return isNaN(v) ? 0 : v;
  });
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("kp_points_history") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("kp_points", String(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem("kp_points_history", JSON.stringify(history));
  }, [history]);

  const earn = useCallback((aed, note = "Order placed") => {
    const earned = Math.floor(aed * POINTS_PER_AED);
    if (earned <= 0) return 0;
    setPoints((p) => p + earned);
    setHistory((h) => [{ type: "earn", points: earned, note, at: new Date().toISOString() }, ...h].slice(0, 50));
    return earned;
  }, []);

  const redeem = useCallback((amount) => {
    if (amount > points) return false;
    setPoints((p) => p - amount);
    setHistory((h) => [{ type: "redeem", points: -amount, note: "Redeemed", at: new Date().toISOString() }, ...h].slice(0, 50));
    return true;
  }, [points]);

  return (
    <LoyaltyCtx.Provider value={{ points, history, earn, redeem }}>
      {children}
    </LoyaltyCtx.Provider>
  );
}

export const useLoyalty = () => useContext(LoyaltyCtx);
