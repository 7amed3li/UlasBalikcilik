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
      // 1. Check strict rate limit FIRST
      const rateRes = await fetch("/api/admin/login-rate-limit", { method: "POST" });
      if (!rateRes.ok) {
        const rateData = await rateRes.json();
        setError(rateData.error || "Çok fazla istek.");
        setLoading(false);
        return;
      }

      // 2. If rate limit passed, proceed to Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      // Check role from user metadata
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
    <div className="min-h-screen bg-ink flex flex-col justify-center items-center px-4 font-sans text-cream">
      <div className="max-w-md w-full glass-card p-8 rounded-2xl border border-teal-dim/20 shadow-2xl">
        <div className="flex justify-center mb-8">
           {/* Replace with your actual logo component or image */}
           <h1 className="text-3xl font-black text-gold tracking-widest uppercase">Admin</h1>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-cream-dim mb-2 uppercase tracking-widest">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-ink-2 border border-teal-dim/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-cream-dim mb-2 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-ink-2 border border-teal-dim/30 rounded-lg px-4 py-3 text-cream focus:outline-none focus:border-gold transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-copper to-copper/80 text-cream font-bold py-3 rounded-lg hover:shadow-[0_0_20px_rgba(198,98,43,0.3)] transition-all uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
