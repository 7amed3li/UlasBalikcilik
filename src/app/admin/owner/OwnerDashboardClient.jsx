"use client";

import { useState } from "react";
import { Search, Save, CheckCircle, AlertCircle } from "lucide-react";
import menuTr from "@/i18n/menu/tr.json";

const recentMenuItemIds = new Set([
  "sigara_boregi",
  "gozleme_cesitleri",
  "pastirmali_yumurta",
  "simitli_yumurta",
  "kuru_dolma",
]);

export default function OwnerDashboardClient({ items }) {
  // Helper to format slugs to readable Turkish names
  const formatProductName = (slug) => {
    if (!slug) return "";
    if (menuTr?.items?.[slug]?.name) return menuTr.items[slug].name;
    const trMap = {
      'durum': 'Dürüm',
      'sis': 'Şiş',
      'cop': 'Çöp',
      'kofte': 'Köfte',
      'cigkofte': 'Çiğköfte',
      'ciger': 'Ciğer',
      'corbasi': 'Çorbası',
      'kunefe': 'Künefe',
      'kadayif': 'Kadayıf',
      'salgam': 'Şalgam',
      'ayran': 'Ayran',
      'su': 'Su',
      'kola': 'Kola'
    };
    return slug.split('_').map(word => {
      const lowerWord = word.toLowerCase();
      if (trMap[lowerWord]) return trMap[lowerWord];
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [localItems, setLocalItems] = useState(items);
  const [editingId, setEditingId] = useState(null);
  const [newPrice, setNewPrice] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const categories = Array.from(
    new Set(items.map((item) => item.categories?.name_tr || item.category_id).filter(Boolean))
  );

  const filteredItems = localItems.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    const productName = formatProductName(item.id).toLowerCase();
    const matchesSearch = !term || item.id.toLowerCase().includes(term) || productName.includes(term);
    const catName = item.categories?.name_tr || item.category_id;
    const matchesCat = categoryFilter === "all" || catName === categoryFilter;
    return matchesSearch && matchesCat;
  }).sort((a, b) => Number(recentMenuItemIds.has(b.id)) - Number(recentMenuItemIds.has(a.id)));

  const handleEdit = (item) => {
    setEditingId(item.id);
    setNewPrice(item.price.toString());
    setMessage({ type: "", text: "" });
  };

  const handleSave = async (id) => {
    setMessage({ type: "", text: "" });
    const parsedPrice = parseFloat(newPrice);

    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setMessage({ type: "error", text: "Lütfen geçerli bir fiyat girin." });
      return;
    }

    try {
      const res = await fetch("/api/admin/update-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: id, newPrice: parsedPrice }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Güncelleme başarısız.");

      // Update UI locally
      setLocalItems(
        localItems.map((item) =>
          item.id === id ? { ...item, price: parsedPrice } : item
        )
      );
      setEditingId(null);
      setMessage({ type: "success", text: "Fiyat başarıyla güncellendi!" });
      
      // Auto hide success message
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="space-y-6">
      {message.text && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-teal-dim/20 text-teal border border-teal' : 'bg-red-500/20 text-red-500 border border-red-500'}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-dim" size={18} />
          <input
            type="text"
            placeholder="Ürün Ara..."
            className="w-full pl-10 pr-4 py-2 bg-ink-2 border border-teal-dim/30 rounded-lg text-cream focus:outline-none focus:border-gold"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-ink-2 border border-teal-dim/30 rounded-lg px-4 py-2 text-cream focus:outline-none focus:border-gold appearance-none"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Tüm Kategoriler</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-ink-2 rounded-xl border border-teal-dim/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse block md:table">
            <thead className="hidden md:table-header-group">
              <tr className="bg-ink text-cream-dim border-b border-teal-dim/20 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium">Ürün</th>
                <th className="p-4 font-medium">Kategori</th>
                <th className="p-4 font-medium">Fiyat (TL)</th>
                <th className="p-4 font-medium text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group divide-y divide-teal-dim/10">
              {filteredItems.map((item) => (
                <tr key={item.id} className="block md:table-row hover:bg-ink-2/80 transition-colors group p-4 md:p-0 mb-2 md:mb-0 bg-ink-2 border border-teal-dim/20 md:border-0 rounded-lg md:rounded-none">
                  
                  {/* Ürün */}
                  <td className="flex justify-between md:table-cell p-2 md:p-4 border-b border-teal-dim/10 md:border-0">
                    <span className="md:hidden text-xs font-bold text-cream-dim uppercase tracking-widest mt-1">Ürün</span>
                    <span className="font-medium text-cream flex items-center gap-2">
                      {formatProductName(item.id)}
                      {recentMenuItemIds.has(item.id) && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-gold/15 text-gold border border-gold/30">
                          Yeni
                        </span>
                      )}
                    </span>
                  </td>
                  
                  {/* Kategori */}
                  <td className="flex justify-between md:table-cell p-2 md:p-4 border-b border-teal-dim/10 md:border-0">
                    <span className="md:hidden text-xs font-bold text-cream-dim uppercase tracking-widest mt-1">Kategori</span>
                    <span className="text-cream-dim text-sm">{item.categories?.name_tr || item.category_id}</span>
                  </td>
                  
                  {/* Fiyat */}
                  <td className="flex justify-between md:table-cell p-2 md:p-4 border-b border-teal-dim/10 md:border-0 items-center">
                    <span className="md:hidden text-xs font-bold text-cream-dim uppercase tracking-widest mt-1">Fiyat</span>
                    <div>
                      {editingId === item.id ? (
                        <input
                          type="number"
                          className="w-24 bg-ink border border-gold rounded px-2 py-1 text-cream focus:outline-none text-right md:text-left"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <span className="text-gold font-bold">{item.price} ₺</span>
                      )}
                    </div>
                  </td>
                  
                  {/* İşlem */}
                  <td className="flex justify-end md:table-cell p-2 md:p-4 pt-4 md:pt-4 text-right">
                    {editingId === item.id ? (
                      <div className="flex justify-end gap-2 w-full md:w-auto">
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs px-3 py-1.5 border border-cream-dim/30 rounded text-cream-dim hover:text-cream w-full md:w-auto"
                        >
                          İptal
                        </button>
                        <button
                          onClick={() => handleSave(item.id)}
                          className="text-xs px-3 py-1.5 bg-copper rounded text-cream flex items-center justify-center gap-1 hover:bg-copper/80 w-full md:w-auto"
                        >
                          <Save size={14} /> Kaydet
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-full md:w-auto text-xs px-4 py-2 md:py-1.5 border border-teal-dim/50 rounded text-teal hover:bg-teal/10 transition-colors"
                      >
                        Düzenle
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-cream-dim">
                    Ürün bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
