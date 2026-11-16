import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import UserManagementClient from "./UserManagementClient";
import OwnerDashboardClient from "../owner/OwnerDashboardClient";
import { includeUnstoredNewMenuItems } from "@/lib/adminMenuItems";

export default async function DeveloperPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "developer") {
    redirect("/admin");
  }

  const { data: history, error: historyError } = await supabase
    .from("price_history")
    .select("*, items(id, categories(name_tr))")
    .order("created_at", { ascending: false })
    .limit(50);

  const { data: items, error: itemsError } = await supabase
    .from("items")
    .select("*, categories(name_tr, name_en)")
    .order("category_id");
  const adminItems = includeUnstoredNewMenuItems(items || []);

  const adminAuth = createAdminClient().auth.admin;
  const {
    data: { users },
    error: usersError,
  } = await adminAuth.listUsers();

  return (
    <div className="min-h-screen bg-[#EBF4FA] text-[#1E2D3D] font-sans">
      <nav className="bg-gradient-to-r from-[#13202E] via-[#1E2D3D] to-[#0077B6] text-white border-b border-[#C5E1F5]/30 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div>
          <h1
            className="text-xl font-black text-white tracking-wider uppercase"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Ulaş Balıkçılık — Geliştirici Paneli
          </h1>
          <p className="text-xs text-[#C5E1F5] uppercase tracking-wider font-bold">
            Tam Yetkili Yönetim
          </p>
        </div>
        <div className="flex gap-4">
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="text-xs font-extrabold uppercase tracking-wider px-4 py-2 bg-[#0088CC] hover:bg-[#006DA3] rounded-xl transition-colors text-white cursor-pointer"
            >
              Çıkış Yap
            </button>
          </form>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto p-4 sm:p-6 space-y-10">
        {usersError ? (
          <div className="text-[#0088CC] font-bold">
            Error loading users: {usersError.message}
          </div>
        ) : (
          <UserManagementClient initialUsers={users || []} />
        )}

        <section>
          <h2
            className="text-xl font-black mb-4 text-[#1E2D3D]"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Ürünler ve Fiyat Yönetimi (81 Çeşit)
          </h2>
          {itemsError ? (
            <div className="text-[#0088CC] font-bold">
              Error loading items: {itemsError.message}
            </div>
          ) : (
            <OwnerDashboardClient items={adminItems} />
          )}
        </section>

        <section>
          <h2
            className="text-xl font-black mb-4 text-[#1E2D3D]"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Fiyat Değişim Geçmişi (Son 50)
          </h2>
          {historyError ? (
            <div className="text-[#0088CC] font-bold">Error: {historyError.message}</div>
          ) : (
            <div className="bg-[#F8FBFE] rounded-2xl border border-[#C5E1F5] overflow-hidden shadow-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#1E2D3D] text-white border-b border-[#C5E1F5] text-xs uppercase tracking-wider">
                    <th className="p-4 font-extrabold">Tarih</th>
                    <th className="p-4 font-extrabold">Ürün</th>
                    <th className="p-4 font-extrabold">Eski Fiyat</th>
                    <th className="p-4 font-extrabold">Yeni Fiyat</th>
                    <th className="p-4 font-extrabold">Kullanıcı</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C5E1F5]/60">
                  {history?.map((record) => (
                    <tr key={record.id} className="hover:bg-white/60 transition-colors">
                      <td className="p-4 text-sm text-[#52667A]">
                        {new Date(record.created_at).toLocaleString("tr-TR")}
                      </td>
                      <td className="p-4 font-bold text-[#1E2D3D]">{record.item_id}</td>
                      <td className="p-4 text-[#52667A]">{record.old_price} ₺</td>
                      <td className="p-4 text-[#0077B6] font-black">{record.new_price} ₺</td>
                      <td className="p-4 text-xs text-[#52667A] font-mono">
                        {record.modified_by || "Bilinmiyor"}
                      </td>
                    </tr>
                  ))}
                  {history?.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-[#52667A] font-medium">
                        Geçmiş kaydı yok.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
