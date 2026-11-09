"use client";

import { useState } from "react";
import { Search, Save, CheckCircle, AlertCircle } from "lucide-react";
import menuTr from "@/i18n/menu/tr.json";
import { menuData } from "@/data/menuData";

const menuItemNameMap = new Map();
menuData.forEach((cat) => {
  (cat.items || []).forEach((item) => {
    if (item.id && item.name?.tr) {
      menuItemNameMap.set(item.id, item.name.tr);
    }
  });
});

export default function OwnerDashboardClient({ items }) {
  const formatProductName = (slug) => {
    if (!slug) return "";
    if (menuTr?.items?.[slug]?.name) return menuTr.items[slug].name;
    if (menuItemNameMap.has(slug)) return menuItemNameMap.get(slug);
    return slug
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
    const matchesSearch =
      !term || item.id.toLowerCase().includes(term) || productName.includes(term);
    const catName = item.categories?.name_tr || item.category_id;
    const matchesCat = categoryFilter === "all" || catName === categoryFilter;
    return matchesSearch && matchesCat;
  });

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

      setLocalItems(
        localItems.map((item) => (item.id === id ? { ...item, price: parsedPrice } : item))
      );
      setEditingId(null);
      setMessage({ type: "success", text: "Fiyat başarıyla güncellendi!" });

      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  return (
    <div className="space-y-6">
      {message.text && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 font-bold text-sm ${
            message.type === "success"
              ? "bg-[#0E4F4A]/15 text-[#0E4F4A] border border-[#0E4F4A]"
              : "bg-[#D93829]/15 text-[#D93829] border border-[#D93829]"
          }`}
        >
          {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#47626B]"
            size={18}
          />
          <input
            type="text"
            placeholder="Balık, meze veya ürün ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#F4F1E8] border border-[#B8DCD3] rounded-xl text-[#18323B] focus:outline-none focus:border-[#0E4F4A] text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-[#F4F1E8] border border-[#B8DCD3] rounded-xl px-4 py-2.5 text-[#0B2B3B] font-bold text-sm focus:outline-none focus:border-[#0E4F4A]"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Tüm Kategoriler ({localItems.length})</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#F4F1E8] rounded-2xl border border-[#B8DCD3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse block md:table">
            <thead className="hidden md:table-header-group">
              <tr className="bg-[#0B2B3B] text-white border-b border-[#B8DCD3] text-xs uppercase tracking-wider">
                <th className="p-4 font-extrabold">Ürün</th>
                <th className="p-4 font-extrabold">Kategori</th>
                <th className="p-4 font-extrabold">Fiyat (₺)</th>
                <th className="p-4 font-extrabold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group divide-y divide-[#B8DCD3]/60">
              {filteredItems.map((item) => (
                <tr
                  key={item.id}
                  className="block md:table-row hover:bg-white/60 transition-colors p-4 md:p-0 mb-2 md:mb-0"
                >
                  <td className="flex justify-between md:table-cell p-2 md:p-4">
                    <span className="md:hidden text-xs font-bold text-[#47626B] uppercase">
                      Ürün
                    </span>
                    <span className="font-bold text-[#0B2B3B]">
                      {formatProductName(item.id)}
                    </span>
                  </td>

                  <td className="flex justify-between md:table-cell p-2 md:p-4">
                    <span className="md:hidden text-xs font-bold text-[#47626B] uppercase">
                      Kategori
                    </span>
                    <span className="text-[#47626B] text-sm font-medium">
                      {item.categories?.name_tr || item.category_id}
                    </span>
                  </td>

                  <td className="flex justify-between md:table-cell p-2 md:p-4 items-center">
                    <span className="md:hidden text-xs font-bold text-[#47626B] uppercase">
                      Fiyat
                    </span>
                    <div>
                      {editingId === item.id ? (
                        <input
                          type="number"
                          className="w-28 bg-white border-2 border-[#0E4F4A] rounded-lg px-2.5 py-1 text-[#0B2B3B] font-bold focus:outline-none"
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        <span className="text-[#0E4F4A] font-black">{item.price} ₺</span>
                      )}
                    </div>
                  </td>

                  <td className="flex justify-end md:table-cell p-2 md:p-4 text-right">
                    {editingId === item.id ? (
                      <div className="flex justify-end gap-2 w-full md:w-auto">
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs px-3 py-1.5 border border-[#B8DCD3] rounded-lg text-[#47626B] font-bold hover:bg-white cursor-pointer"
                        >
                          İptal
                        </button>
                        <button
                          onClick={() => handleSave(item.id)}
                          className="text-xs px-3 py-1.5 bg-[#0E4F4A] rounded-lg text-white font-bold flex items-center justify-center gap-1 hover:bg-[#0B2B3B] cursor-pointer"
                        >
                          <Save size={14} /> Kaydet
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleEdit(item)}
                        className="w-full md:w-auto text-xs px-4 py-1.5 border border-[#0E4F4A] rounded-lg text-[#0E4F4A] font-extrabold hover:bg-[#0E4F4A] hover:text-white transition-colors cursor-pointer"
                      >
                        Düzenle
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-[#47626B] font-medium">
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
