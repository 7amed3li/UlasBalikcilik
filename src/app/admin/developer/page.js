import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { redirect } from "next/navigation";
import UserManagementClient from "./UserManagementClient";
import OwnerDashboardClient from "../owner/OwnerDashboardClient";
import { includeUnstoredNewMenuItems } from "@/lib/adminMenuItems";

export default async function DeveloperPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "developer") {
    redirect("/admin");
  }

  // Fetch price history
  const { data: history, error: historyError } = await supabase
    .from("price_history")
    .select("*, items(id, categories(name_tr))")
    .order("created_at", { ascending: false })
    .limit(50);

  // Fetch items for price editing
  const { data: items, error: itemsError } = await supabase
    .from("items")
    .select("*, categories(name_tr, name_en)")
    .order("category_id");
  const adminItems = includeUnstoredNewMenuItems(items || []);

  // Fetch all users securely on the server
  const adminAuth = createAdminClient().auth.admin;
  const { data: { users }, error: usersError } = await adminAuth.listUsers();

  return (
    <div className="min-h-screen bg-ink text-cream font-sans">
      <nav className="bg-ink-2 border-b border-teal-dim/20 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-teal tracking-widest uppercase">Geliştirici Paneli</h1>
          <p className="text-xs text-cream-dim uppercase tracking-wider">Tam Yetkili Yönetim</p>
        </div>
        <div className="flex gap-4">
          <form action="/api/auth/signout" method="POST">
            <button type="submit" className="text-sm px-4 py-2 border border-copper/50 rounded hover:bg-copper/10 transition-colors text-copper">
              Çıkış Yap
            </button>
          </form>
        </div>
      </nav>
      
      <main className="max-w-5xl mx-auto p-6 space-y-12">
        
        {/* User Management Section */}
        {usersError ? (
           <div className="text-red-500">Error loading users: {usersError.message}</div>
        ) : (
           <UserManagementClient initialUsers={users || []} />
        )}

        {/* Price Management Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-cream tracking-wide">Ürünler ve Fiyat Yönetimi</h2>
          {itemsError ? (
            <div className="text-red-500">Error loading items: {itemsError.message}</div>
          ) : (
            <OwnerDashboardClient items={adminItems} />
          )}
        </section>

        {/* Price History Section */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-cream tracking-wide">Fiyat Değişim Geçmişi (Son 50)</h2>
          {historyError ? (
            <div className="text-red-500">Error: {historyError.message}</div>
          ) : (
            <div className="bg-ink-2 rounded-xl border border-teal-dim/20 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-ink text-cream-dim border-b border-teal-dim/20 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Tarih</th>
                    <th className="p-4 font-medium">Ürün</th>
                    <th className="p-4 font-medium">Eski Fiyat</th>
                    <th className="p-4 font-medium">Yeni Fiyat</th>
                    <th className="p-4 font-medium">Yapan (User ID)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-teal-dim/10">
                  {history?.map((record) => (
                    <tr key={record.id} className="hover:bg-ink-2/80 transition-colors">
                      <td className="p-4 text-sm text-cream-dim">
                        {new Date(record.created_at).toLocaleString('tr-TR')}
                      </td>
                      <td className="p-4 font-medium text-cream">{record.item_id}</td>
                      <td className="p-4 text-cream-dim">{record.old_price} ₺</td>
                      <td className="p-4 text-gold font-bold">{record.new_price} ₺</td>
                      <td className="p-4 text-xs text-cream-dim/50 font-mono">
                        {record.modified_by || "Bilinmiyor"}
                      </td>
                    </tr>
                  ))}
                  {history?.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-cream-dim">Geçmiş kaydı yok.</td>
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
