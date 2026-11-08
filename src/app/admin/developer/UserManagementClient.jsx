"use client";

import { useState } from "react";
import { UserPlus, Save, Trash2, CheckCircle, AlertCircle, KeyRound } from "lucide-react";

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

      setUsers(users.map((u) => (u.id === userId ? { ...u, user_metadata: { ...u.user_metadata, role: newRole } } : u)));
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
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Create User Form */}
        <div className="w-full md:w-1/3 bg-ink-2 p-6 rounded-xl border border-teal-dim/20">
          <h2 className="text-lg font-bold mb-4 text-cream flex items-center gap-2">
            <UserPlus size={20} className="text-gold" /> Yeni Kullanıcı
          </h2>
          
          {message.text && (
            <div className={`p-3 rounded-lg mb-4 text-sm flex items-center gap-2 ${message.type === 'success' ? 'bg-teal-dim/20 text-teal border border-teal' : 'bg-red-500/20 text-red-500 border border-red-500'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-cream-dim mb-1 uppercase tracking-widest">Email</label>
              <input
                type="email"
                required
                className="w-full bg-ink border border-teal-dim/30 rounded px-3 py-2 text-cream focus:border-gold outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-dim mb-1 uppercase tracking-widest">Şifre</label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full bg-ink border border-teal-dim/30 rounded px-3 py-2 text-cream focus:border-gold outline-none text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-cream-dim mb-1 uppercase tracking-widest">Yetki</label>
              <select
                className="w-full bg-ink border border-teal-dim/30 rounded px-3 py-2 text-cream focus:border-gold outline-none text-sm appearance-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="owner">Owner (Sadece Fiyat)</option>
                <option value="developer">Developer (Tam Yetki)</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-copper text-cream py-2 rounded text-sm font-bold uppercase tracking-widest hover:bg-copper/80 transition disabled:opacity-50 mt-2"
            >
              {loading ? "Oluşturuluyor..." : "Oluştur"}
            </button>
          </form>
        </div>

        {/* Users List */}
        <div className="w-full md:w-2/3 bg-ink-2 rounded-xl border border-teal-dim/20 overflow-hidden">
           <div className="p-4 border-b border-teal-dim/20">
              <h2 className="text-lg font-bold text-cream">Kayıtlı Kullanıcılar</h2>
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse block md:table">
               <thead className="hidden md:table-header-group">
                 <tr className="bg-ink text-cream-dim border-b border-teal-dim/20 text-xs uppercase tracking-wider">
                   <th className="p-4 font-medium">Email</th>
                   <th className="p-4 font-medium">Yetki</th>
                   <th className="p-4 font-medium text-right">İşlem</th>
                 </tr>
               </thead>
               <tbody className="block md:table-row-group divide-y divide-teal-dim/10">
                 {users.map((u) => (
                   <tr key={u.id} className="block md:table-row hover:bg-ink-2/80 transition-colors p-4 md:p-0 mb-2 md:mb-0 bg-ink-2 border border-teal-dim/20 md:border-0 rounded-lg md:rounded-none">
                     <td className="flex justify-between md:table-cell p-2 md:p-4 border-b border-teal-dim/10 md:border-0 items-center">
                       <span className="md:hidden text-xs font-bold text-cream-dim uppercase tracking-widest mt-1">Email</span>
                       <span className="text-sm font-medium text-cream">{u.email}</span>
                     </td>
                     <td className="flex justify-between md:table-cell p-2 md:p-4 border-b border-teal-dim/10 md:border-0 items-center">
                       <span className="md:hidden text-xs font-bold text-cream-dim uppercase tracking-widest mt-1">Yetki</span>
                       <select
                         className="bg-ink border border-teal-dim/30 rounded px-2 py-1 text-cream text-xs focus:border-gold outline-none"
                         value={u.user_metadata?.role || "owner"}
                         onChange={(e) => handleRoleChange(u.id, e.target.value)}
                       >
                         <option value="owner">Owner</option>
                         <option value="developer">Developer</option>
                       </select>
                     </td>
                      <td className="flex justify-end md:table-cell p-2 md:p-4 pt-4 md:pt-4 text-right">
                        <div className="flex justify-end gap-3 md:gap-2 w-full md:w-auto">
                          <button
                            onClick={() => handlePasswordChange(u.id)}
                            className="text-gold hover:text-yellow-400 p-2 md:p-1 transition-colors border md:border-0 border-gold/30 rounded md:rounded-none"
                            title="Şifreyi Değiştir"
                          >
                            <KeyRound size={18} className="md:w-4 md:h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="text-red-500 hover:text-red-400 p-2 md:p-1 transition-colors border md:border-0 border-red-500/30 rounded md:rounded-none"
                            title="Sil"
                          >
                            <Trash2 size={18} className="md:w-4 md:h-4" />
                          </button>
                        </div>
                      </td>
                   </tr>
                 ))}
                 {users.length === 0 && (
                   <tr>
                     <td colSpan="3" className="p-8 text-center text-cream-dim text-sm block md:table-cell">Kullanıcı bulunamadı.</td>
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
