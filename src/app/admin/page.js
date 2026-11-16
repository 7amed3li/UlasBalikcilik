"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const rateRes = await fetch("/api/admin/login-rate-limit", { method: "POST" });
      if (!rateRes.ok) {
        const rateData = await rateRes.json();
        setError(rateData.error || "Çok fazla istek.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const role = data.user.user_metadata?.role || "user";
      if (role === "owner") {
        router.push("/admin/owner");
      } else if (role === "developer") {
        router.push("/admin/developer");
      } else {
        setError("Unauthorized role");
        await supabase.auth.signOut();
      }
    } catch (err) {
      setError(err.message || "Bilinmeyen bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EBF4FA] flex flex-col justify-center items-center px-4 font-sans text-[#1E2D3D]">
      <div className="max-w-md w-full bg-[#F8FBFE] p-8 rounded-3xl border border-[#C5E1F5] shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-20 rounded-2xl bg-white p-2 border border-[#C5E1F5] shadow-xs mb-3">
            <Image
              src="/ulas-logo.jpg"
              alt="Ulaş Balıkçılık"
              fill
              unoptimized={true}
              style={{ objectFit: "contain", padding: "6px" }}
            />
          </div>
          <h1
            className="text-2xl font-black text-[#1E2D3D] tracking-wider uppercase"
            style={{ fontFamily: "var(--font-cairo)" }}
          >
            Ulaş Balıkçılık Yönetim
          </h1>
          <p className="text-xs font-bold text-[#52667A] mt-0.5">
            Fiyat &amp; Menü Yönetim Paneli
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-[#0088CC]/10 border border-[#0088CC]/40 text-[#0088CC] p-3 rounded-xl text-sm font-bold text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-extrabold text-[#1E2D3D] mb-1.5 uppercase tracking-wider">
              E-posta
            </label>
            <input
              type="email"
              required
              className="w-full bg-white border border-[#C5E1F5] rounded-xl px-4 py-3 text-[#1E2D3D] focus:outline-none focus:border-[#0077B6] transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-[#1E2D3D] mb-1.5 uppercase tracking-wider">
              Şifre
            </label>
            <input
              type="password"
              required
              className="w-full bg-white border border-[#C5E1F5] rounded-xl px-4 py-3 text-[#1E2D3D] focus:outline-none focus:border-[#0077B6] transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0077B6] hover:bg-[#1E2D3D] text-white font-extrabold py-3.5 rounded-xl shadow-md transition-all uppercase tracking-wider text-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
