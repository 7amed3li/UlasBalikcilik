"use client";

import { useState } from "react";
import { UserPlus, Trash2, KeyRound } from "lucide-react";

export default function UserManagementClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("owner");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("/api/admin/manage-users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers([...users, data.user]);
      setEmail("");
      setPassword("");
      setMessage({ type: "success", text: "Kullanıcı başarıyla oluşturuldu." });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await fetch("/api/admin/manage-users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers(
        users.map((u) =>
          u.id === userId ? { ...u, user_metadata: { ...u.user_metadata, role: newRole } } : u
        )
      );
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  const handlePasswordChange = async (userId) => {
    const newPassword = prompt("Yeni şifreyi girin (en az 6 karakter):");
    if (!newPassword) return;
    if (newPassword.length < 6) {
      alert("Şifre en az 6 karakter olmalıdır!");
      return;
    }

    try {
      const res = await fetch("/api/admin/manage-users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password: newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("Şifre başarıyla güncellendi!");
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Bu kullanıcıyı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/admin/manage-users?id=${userId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Create User Form */}
        <div className="w-full md:w-1/3 bg-[#F4F1E8] p-6 rounded-2xl border border-[#B8DCD3] shadow-xs">
          <h2 className="text-lg font-black mb-4 text-[#0B2B3B] flex items-center gap-2">
            <UserPlus size={20} className="text-[#0E4F4A]" /> Yeni Kullanıcı
          </h2>

          {message.text && (
            <div
              className={`p-3 rounded-xl mb-4 text-xs font-bold ${
                message.type === "success"
                  ? "bg-[#0E4F4A]/15 text-[#0E4F4A] border border-[#0E4F4A]"
                  : "bg-[#D93829]/15 text-[#D93829] border border-[#D93829]"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-[#47626B] mb-1 uppercase tracking-wider">
                E-posta
              </label>
              <input
                type="email"
                required
                className="w-full bg-white border border-[#B8DCD3] rounded-xl px-3 py-2 text-[#18323B] focus:border-[#0E4F4A] outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#47626B] mb-1 uppercase tracking-wider">
                Şifre
              </label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full bg-white border border-[#B8DCD3] rounded-xl px-3 py-2 text-[#18323B] focus:border-[#0E4F4A] outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-[#47626B] mb-1 uppercase tracking-wider">
                Yetki
              </label>
              <select
                className="w-full bg-white border border-[#B8DCD3] rounded-xl px-3 py-2 text-[#18323B] focus:border-[#0E4F4A] outline-none text-sm"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="owner">Owner (Fiyat Yönetimi)</option>
                <option value="developer">Developer (Tam Yetki)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0E4F4A] text-white py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider hover:bg-[#0B2B3B] transition disabled:opacity-50 mt-2 cursor-pointer"
            >
              {loading ? "Oluşturuluyor..." : "Oluştur"}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="w-full md:w-2/3 bg-[#F4F1E8] rounded-2xl border border-[#B8DCD3] overflow-hidden shadow-xs">
          <div className="p-4 border-b border-[#B8DCD3]">
            <h2 className="text-lg font-black text-[#0B2B3B]">Kayıtlı Kullanıcılar</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse block md:table">
              <thead className="hidden md:table-header-group">
                <tr className="bg-[#0B2B3B] text-white border-b border-[#B8DCD3] text-xs uppercase tracking-wider">
                  <th className="p-4 font-extrabold">E-posta</th>
                  <th className="p-4 font-extrabold">Yetki</th>
                  <th className="p-4 font-extrabold text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group divide-y divide-[#B8DCD3]/60">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="block md:table-row hover:bg-white/60 transition-colors p-4 md:p-0"
                  >
                    <td className="flex justify-between md:table-cell p-2 md:p-4 items-center">
                      <span className="md:hidden text-xs font-bold text-[#47626B] uppercase">
                        E-posta
                      </span>
                      <span className="text-sm font-bold text-[#0B2B3B]">{u.email}</span>
                    </td>
                    <td className="flex justify-between md:table-cell p-2 md:p-4 items-center">
                      <span className="md:hidden text-xs font-bold text-[#47626B] uppercase">
                        Yetki
                      </span>
                      <select
                        className="bg-white border border-[#B8DCD3] rounded-lg px-2.5 py-1 text-[#0B2B3B] text-xs font-bold focus:border-[#0E4F4A] outline-none"
                        value={u.user_metadata?.role || "owner"}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      >
                        <option value="owner">Owner</option>
                        <option value="developer">Developer</option>
                      </select>
                    </td>
                    <td className="flex justify-end md:table-cell p-2 md:p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handlePasswordChange(u.id)}
                          className="text-[#0E4F4A] hover:text-[#0B2B3B] p-1.5 transition-colors cursor-pointer"
                          title="Şifreyi Değiştir"
                        >
                          <KeyRound size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(u.id)}
                          className="text-[#D93829] hover:opacity-80 p-1.5 transition-colors cursor-pointer"
                          title="Sil"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-[#47626B] text-sm font-medium">
                      Kullanıcı bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
