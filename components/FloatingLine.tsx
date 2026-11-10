import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/data";

/**
 * 桌機版右下角常駐 LINE 訂餐按鈕。
 * 手機版隱藏：手機已有底部「電話／LINE」轉換列，不重複顯示。
 */
export default function FloatingLine() {
  return (
    <a
      href={SITE.lineUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-line fixed right-6 z-[60] hidden items-center gap-2 rounded bg-accent px-5 py-3 font-bold text-white hover:bg-accent-dark md:inline-flex"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      LINE 立即訂餐
    </a>
  );
}
