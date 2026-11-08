"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { translations, menuTranslations } from "../i18n/translations";
import SaudiRiyalIcon from "../components/SaudiRiyalIcon";
import { menuData } from "../data/menuData";
import { ULAS_CONFIG } from "../data/ulasConfig";

// Flat lookup for menuData items by id
const allMenuItems = menuData.flatMap((cat) => cat.items || []);

const AppContext = createContext();

// Hardcoded fallback (only used if no cached rates exist at all)
const HARDCODED_FALLBACK = {
  TRY: { symbol: "₺", rate: 1 },
  USD: { symbol: "$", rate: 0.02121 },
  EUR: { symbol: "€", rate: 0.01855 },
  GBP: { symbol: "£", rate: 0.01579 },
  RUB: { symbol: "₽", rate: 2.65 },
  SAR: { symbol: "ر.س", rate: 0.0795 },
};

const RATES_STORAGE_KEY = "app_last_rates";
const CART_STORAGE_KEY = "ulas_balik_cart";
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // Refresh every 5 minutes

// Load the last successfully fetched rates from localStorage
function getLastKnownRates() {
  try {
    const stored = localStorage.getItem(RATES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.rates && parsed.rates.TRY) {
        return parsed;
      }
    }
  } catch (_) {
    /* ignore parse errors */
  }
  return null;
}

// Save successful rates to localStorage
function saveRatesToStorage(rates, source, lastUpdated) {
  try {
    localStorage.setItem(
      RATES_STORAGE_KEY,
      JSON.stringify({
        rates,
        source,
        lastUpdated,
        savedAt: new Date().toISOString(),
      })
    );
  } catch (_) {
    /* ignore storage errors */
  }
}

export function AppProvider({ children }) {
  const [lang, setLang] = useState("tr");
  const [currency, setCurrency] = useState("TRY");
  const [exchangeRates, setExchangeRates] = useState(HARDCODED_FALLBACK);
  const [ratesSource, setRatesSource] = useState("fallback");
  const [ratesLastUpdated, setRatesLastUpdated] = useState(null);
  const [livePrices, setLivePrices] = useState({});
  const [pricesLoading, setPricesLoading] = useState(false);
  const [pricesError, setPricesError] = useState(null);

  // ═══════════════════════════════════════════
  // CART STATE
  // ═══════════════════════════════════════════
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartPulse, setCartPulse] = useState(false);
  const [orderStatus, setOrderStatus] = useState("idle"); // "idle" | "sent"
  const pulseTimeoutRef = useRef(null);
  const orderTimeoutRef = useRef(null);

  // ═══════════════════════════════════════════
  // EXCHANGE RATES
  // ═══════════════════════════════════════════
  const fetchRates = useCallback(async () => {
    try {
      const res = await fetch("/api/rates");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setExchangeRates(data.rates);
      setRatesSource(data.source);
      setRatesLastUpdated(data.lastUpdated);

      saveRatesToStorage(data.rates, data.source, data.lastUpdated);
    } catch (err) {
      console.warn("Failed to fetch live rates, using last known rates:", err.message);
    }
  }, []);

  useEffect(() => {
    const locales = ["tr", "en", "ar", "ru", "fa", "fr", "de", "it", "es", "zh"];
    const pathLocale = window.location.pathname.split("/")[1];
    const savedLang = localStorage.getItem("app_lang");
    const initialLang = locales.includes(pathLocale)
      ? pathLocale
      : locales.includes(savedLang)
      ? savedLang
      : "tr";
    localStorage.setItem("app_lang", initialLang);
    requestAnimationFrame(() => setLang(initialLang));

    const savedCurrency = localStorage.getItem("app_currency");
    if (savedCurrency && ["TRY", "USD", "EUR", "GBP", "RUB", "SAR"].includes(savedCurrency)) {
      requestAnimationFrame(() => setCurrency(savedCurrency));
    }

    // Load cart from localStorage
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          requestAnimationFrame(() => setCart(parsed));
        }
      }
    } catch (_) {
      /* ignore parse errors */
    }

    const lastKnown = getLastKnownRates();
    if (lastKnown) {
      requestAnimationFrame(() => {
        setExchangeRates(lastKnown.rates);
        setRatesSource(lastKnown.source + " (cached)");
        setRatesLastUpdated(lastKnown.lastUpdated);
      });
    }

    const initialFetchTimer = setTimeout(fetchRates, 0);
    const interval = setInterval(fetchRates, REFRESH_INTERVAL_MS);

    // Fetch live prices from unified API
    async function fetchPrices() {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();

        if (result.success && result.data) {
          setLivePrices(result.data);
        }
      } catch (e) {
        console.warn("Live prices fallback to menuData:", e.message);
      } finally {
        setPricesLoading(false);
      }
    }
    fetchPrices();

    return () => {
      clearTimeout(initialFetchTimer);
      clearInterval(interval);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      if (orderTimeoutRef.current) clearTimeout(orderTimeoutRef.current);
    };
  }, [fetchRates]);

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("app_currency", newCurrency);
  };

  const getLivePrice = useCallback(
    (item) => {
      if (!item) return null;
      if (livePrices[item.id] !== undefined) return livePrices[item.id];
      if (item.price !== undefined && item.price !== null) return item.price;
      const found = allMenuItems.find((m) => m.id === item.id);
      return found?.price ?? null;
    },
    [livePrices]
  );

  const convertPrice = (priceInTRY) => {
    if (priceInTRY == null) return null;
    if (currency === "TRY") {
      return Number.isInteger(Number(priceInTRY))
        ? String(priceInTRY)
        : Number(priceInTRY).toFixed(2);
    }
    const rateData = exchangeRates[currency] || HARDCODED_FALLBACK[currency];
    const { rate } = rateData;
    return (priceInTRY * rate).toFixed(2);
  };

  const getCurrencySymbol = () => {
    if (currency === "SAR") {
      return <SaudiRiyalIcon className="h-[0.9em] w-auto inline-block fill-current" />;
    }
    const rateData = exchangeRates[currency] || HARDCODED_FALLBACK[currency];
    return rateData.symbol;
  };

  // ═══════════════════════════════════════════
  // CART OPERATIONS
  // ═══════════════════════════════════════════
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (_) {
      /* ignore storage errors */
    }
  }, [cart]);

  const addToCart = useCallback(
    (item) => {
      const price = getLivePrice(item);
      if (price === null) {
        console.warn(`Cannot add ${item.id} to cart: price not available`);
        return;
      }

      setCart((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
        }
        return [...prev, { id: item.id, image: item.image, price: item.price, qty: 1 }];
      });

      setCartPulse(true);
      if (pulseTimeoutRef.current) clearTimeout(pulseTimeoutRef.current);
      pulseTimeoutRef.current = setTimeout(() => setCartPulse(false), 600);
    },
    [getLivePrice]
  );

  const removeFromCart = useCallback((itemId) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (!existing) return prev;
      if (existing.qty === 1) {
        return prev.filter((i) => i.id !== itemId);
      }
      return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i));
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (_) {
      /* ignore */
    }
  }, []);

  const getItemQuantity = useCallback(
    (itemId) => {
      return cart.find((i) => i.id === itemId)?.qty ?? 0;
    },
    [cart]
  );

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => {
    if (sum === null) return null;
    const price = getLivePrice(item);
    if (price === null) return null;
    return sum + price * item.qty;
  }, 0);

  const submitOrder = useCallback(() => {
    if (cart.length === 0) return;

    // Only dial a confirmed phone number (Maslak 1453 confirmed phone or Cihangir once confirmed)
    const targetPhone =
      ULAS_CONFIG.branches.cihangir.phoneHref || ULAS_CONFIG.branches.maslak.phoneHref;
    if (targetPhone) {
      window.location.href = targetPhone;
    }

    setOrderStatus("sent");

    if (orderTimeoutRef.current) clearTimeout(orderTimeoutRef.current);
    orderTimeoutRef.current = setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setOrderStatus("idle");
    }, 3000);
  }, [cart, clearCart]);

  const createDeepProxy = (target, fallback) => {
    return new Proxy(target || {}, {
      get(obj, prop) {
        if (prop in obj) {
          if (typeof obj[prop] === "object" && obj[prop] !== null) {
            return createDeepProxy(obj[prop], fallback?.[prop]);
          }
          return obj[prop];
        }
        return fallback?.[prop];
      },
    });
  };

  const t = createDeepProxy(translations[lang], translations["en"]);
  const menuT = createDeepProxy(menuTranslations[lang], menuTranslations["en"]);
  const isRtl = lang === "ar" || lang === "fa";

  const value = {
    lang,
    changeLang,
    t,
    menuT,
    isRtl,
    currency,
    changeCurrency,
    exchangeRates,
    ratesSource,
    ratesLastUpdated,
    getCurrencySymbol,
    getLivePrice,
    convertPrice,
    cart,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartTotal,
    cartPulse,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    submitOrder,
    orderStatus,
    pricesLoading,
    pricesError,
  };

  return (
    <AppContext.Provider value={value}>
      <div dir={isRtl ? "rtl" : "ltr"} className={isRtl ? "font-[var(--font-cairo)]" : ""}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
