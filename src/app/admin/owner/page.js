import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OwnerDashboardClient from "./OwnerDashboardClient";
import { includeUnstoredNewMenuItems } from "@/lib/adminMenuItems";

export default async function OwnerPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "owner") {
    redirect("/admin");
  }

  // Fetch items and categories securely on server
  const { data: items, error: itemsError } = await supabase
    .from("items")
    .select("*, categories(name_tr, name_en)")
    .order("category_id");

  if (itemsError) {
    return <div className="p-8 text-red-500">Error loading items: {itemsError.message}</div>;
  }

  const adminItems = includeUnstoredNewMenuItems(items || []);

  return (
    <div className="min-h-screen bg-ink text-cream font-sans">
      <nav className="bg-ink-2 border-b border-teal-dim/20 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-gold tracking-widest uppercase">Kardeşler Kebap</h1>
          <p className="text-xs text-cream-dim uppercase tracking-wider">Fiyat Yönetim Paneli</p>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" className="text-sm px-4 py-2 border border-copper/50 rounded hover:bg-copper/10 transition-colors text-copper">
            Çıkış Yap
          </button>
        </form>
      </nav>
      
      <main className="max-w-5xl mx-auto p-6">
        <OwnerDashboardClient items={adminItems} />
      </main>
    </div>
  );
}
