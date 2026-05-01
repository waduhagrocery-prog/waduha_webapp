import { useEffect, useState } from "react";
import { X, Share, Plus, Smartphone } from "lucide-react";

const DISMISS_KEY = "kp_install_dismissed_at";
const SHOW_AFTER_DAYS = 7; // re-show after a week if dismissed

function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent) && !window.MSStream;
}

function isInsideCapacitor() {
  // Capacitor injects this on native platforms
  return Boolean(window.Capacitor?.isNativePlatform?.());
}

export default function InstallPrompt() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState(null); // "android" | "ios"
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // Don't show inside the native app or once installed
    if (isInsideCapacitor() || isStandalone()) return;

    // Honor dismissal cooldown
    const dismissedAt = parseInt(localStorage.getItem(DISMISS_KEY) || "0", 10);
    const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
    if (dismissedAt && daysSince < SHOW_AFTER_DAYS) return;

    // Android Chrome: capture the prompt event
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVariant("android");
      // Wait 8 seconds before popping (let user explore site first)
      setTimeout(() => setOpen(true), 8000);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);

    // iOS Safari: no event, show manual instructions
    if (isIOS()) {
      setVariant("ios");
      setTimeout(() => setOpen(true), 12000);
    }

    return () => window.removeEventListener("beforeinstallprompt", onBeforeInstall);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setOpen(false);
  };

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setOpen(false);
    } else {
      dismiss();
    }
  };

  if (!open || !variant) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-5 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-sm bg-white rounded-2xl shadow-card border border-ink-200 z-[60] overflow-hidden animate-in slide-in-from-bottom">
      <div className="bg-gradient-to-br from-leaf-500 to-leaf-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="" className="w-9 h-9 rounded-full bg-white" />
          <div>
            <div className="font-extrabold text-sm font-display">Get the Waduha app</div>
            <div className="text-[11px] opacity-90">Free · No download size · Faster</div>
          </div>
        </div>
        <button onClick={dismiss} aria-label="Dismiss" className="text-white/80 hover:text-white p-1">
          <X size={18} />
        </button>
      </div>

      <div className="p-4 text-sm text-ink-700">
        {variant === "android" && (
          <>
            <div className="flex items-start gap-2 mb-3">
              <Smartphone size={16} className="text-coral-500 mt-0.5 shrink-0" />
              <p>One-tap install. Adds to your home screen, opens like a real app.</p>
            </div>
            <button
              onClick={install}
              className="w-full bg-coral-500 hover:bg-coral-600 text-white font-bold text-sm py-2.5 rounded-full"
            >
              Install Waduha App
            </button>
            <button onClick={dismiss} className="w-full text-ink-500 hover:text-ink-900 text-xs py-2 mt-1">
              Maybe later
            </button>
          </>
        )}

        {variant === "ios" && (
          <>
            <p className="mb-3 text-ink-700">Add Waduha to your home screen — tap like a real app:</p>
            <ol className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="bg-leaf-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0">1</span>
                <span>Tap the <Share size={14} className="inline -mt-1 mx-0.5 text-coral-500" /> Share button below</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-leaf-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0">2</span>
                <span>Choose <Plus size={14} className="inline -mt-1 mx-0.5 text-coral-500" /><strong>Add to Home Screen</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-leaf-500 text-white w-5 h-5 rounded-full flex items-center justify-center font-bold shrink-0">3</span>
                <span>Tap <strong>Add</strong> — done!</span>
              </li>
            </ol>
            <button onClick={dismiss} className="w-full text-ink-500 hover:text-ink-900 text-xs py-2 mt-3">
              Got it, thanks
            </button>
          </>
        )}
      </div>
    </div>
  );
}
