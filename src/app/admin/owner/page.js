import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OwnerDashboardClient from "./OwnerDashboardClient";
import { includeUnstoredNewMenuItems } from "@/lib/adminMenuItems";

export default async function OwnerPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "owner") {
    redirect("/admin");
  }

  const { data: items, error: itemsError } = await supabase
    .from("items")
    .select("*, categories(name_tr, name_en)")
    .order("category_id");

  if (itemsError) {
    return <div className="p-8 text-[#0C96DF]">Error loading items: {itemsError.message}</div>;
  }

  const adminItems = includeUnstoredNewMenuItems(items || []);

  return (
    <div className="min-h-screen bg-[#E7F3F9] text-[#2E3B44] font-sans">
      <nav className="bg-gradient-to-r from-[#082A3A] via-[#06384E] to-[#104760] text-white border-b border-[#D6EBF5]/30 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div>
          <h1
            className="text-xl font-black text-white tracking-wider uppercase"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Ulaş Balıkçılık
          </h1>
          <p className="text-xs text-[#D6EBF5] uppercase tracking-wider font-bold">
            Fiyat Yönetim Paneli (Cihangir &amp; Maslak 1453)
          </p>
        </div>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="text-xs font-extrabold uppercase tracking-wider px-4 py-2 bg-[#0C96DF] hover:bg-[#104760] rounded-xl transition-colors text-white cursor-pointer"
          >
            Çıkış Yap
          </button>
        </form>
      </nav>

      <main className="max-w-5xl mx-auto p-4 sm:p-6">
        <OwnerDashboardClient items={adminItems} />
      </main>
    </div>
  );
}
