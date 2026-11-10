import { MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/data";

/** 手機常駐底部轉換列（md 以上隱藏），已處理 iPhone 底部安全區 */
export default function MobileBar() {
  return (
    <div className="mobile-bar fixed inset-x-0 bottom-0 z-50 border-t border-brand/15 bg-paper md:hidden">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href={SITE.phoneHref}
          className="flex flex-col items-center justify-center rounded border border-brand bg-paper px-2 py-2 text-center text-xs font-bold text-brand"
        >
          <span className="inline-flex items-center gap-1">
            <Phone className="h-4 w-4" aria-hidden="true" />
            電話訂餐
          </span>
          <span className="font-num tabular-nums">({SITE.phoneDisplay})</span>
        </a>
        <a
          href={SITE.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center rounded bg-accent px-2 py-2 text-center text-xs font-bold text-white"
        >
          <span className="inline-flex items-center gap-1">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            官方 LINE 快速訂餐
          </span>
          <span>團訂諮詢</span>
        </a>
      </div>
    </div>
  );
}
