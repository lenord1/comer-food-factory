import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * 全裝置右下角常駐 LINE 訂餐按鈕。
 * 手機版位置會抬高，避開底部轉換列與 iPhone 安全區（見 globals.css 的 .floating-line）。
 */
export default function FloatingLine() {
  return (
    <a
      href={SITE.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-line fixed right-4 z-[60] inline-flex items-center gap-2 rounded bg-accent px-4 py-2.5 text-sm font-bold text-white shadow-none hover:bg-accent-dark md:right-6 md:px-5 md:py-3 md:text-base"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      LINE 立即訂餐
    </a>
  );
}
