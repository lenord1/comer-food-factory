"use client";

import Script from "next/script";
import { useEffect } from "react";

/**
 * Google Analytics 4。在 Vercel 設定環境變數 NEXT_PUBLIC_GA_ID（例如 G-XXXXXXX）後才會啟用。
 * 另外記錄轉換點擊：
 * - line_click：點任何官方 LINE 連結
 * - phone_click：點任何電話連結
 * - menu_download：下載團訂菜單
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      const gtag = (window as unknown as { gtag?: Gtag }).gtag;
      if (!gtag) return;
      const href = link.getAttribute("href") ?? "";
      const params = {
        link_text: link.textContent?.trim().slice(0, 50),
        page_path: window.location.pathname,
      };
      if (href.includes("lin.ee")) gtag("event", "line_click", params);
      else if (href.startsWith("tel:")) gtag("event", "phone_click", params);
      else if (href.endsWith("/menu.jpg")) gtag("event", "menu_download", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GA_ID) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
}
