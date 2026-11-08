import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

// Fetch directly from supabase if configured
async function fetchPricesFromDb() {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ) {
      return [];
    }
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    const { data, error } = await supabase.from("items").select("id, price");

    if (error) {
      return [];
    }
    return data || [];
  } catch (_) {
    return [];
  }
}

export const getCurrentMenuItems = unstable_cache(
  fetchPricesFromDb,
  ["menu-prices-v2"],
  { tags: ["menu-prices"], revalidate: 60 }
);

export async function getLivePricesMap() {
  const items = await getCurrentMenuItems();
  const pricesMap = {};
  items.forEach((item) => {
    pricesMap[item.id] = item.price;
  });
  return pricesMap;
}
