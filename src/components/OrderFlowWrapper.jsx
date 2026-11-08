"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const OrderFlow = dynamic(() => import("./OrderFlow"), { ssr: false });

export default function OrderFlowWrapper() {
  const pathname = usePathname();

  const isMenuOrDish = pathname?.endsWith("/menu") || pathname?.includes("/menu/") || pathname?.includes("/dish/");

  if (!isMenuOrDish || pathname?.startsWith("/admin")) {
    return null;
  }

  return <OrderFlow />;
}
