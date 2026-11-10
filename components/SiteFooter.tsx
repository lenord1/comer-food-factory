import Link from "next/link";
import { SITE } from "@/lib/data";
import { DISH_CATEGORIES } from "@/lib/dishes";

/** 頁尾：店家名稱、地址、電話（NAP）、營業時間與主要頁面連結 */
export default function SiteFooter() {
  return (
    <footer className="border-t border-brand/10 bg-oat">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm sm:grid-cols-2 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-bold text-brand">{SITE.nameZh}</p>
          <p className="text-xs text-ink-soft">{SITE.nameEn}</p>
          <address className="mt-3 space-y-1 not-italic">
            <p>{SITE.address}</p>
            <p>
              電話：
              <a href={SITE.phoneHref} className="font-num tabular-nums hover:text-brand">
                {SITE.phoneDisplay}
              </a>
            </p>
          </address>
          <p className="mt-2 text-ink-soft">{SITE.transit.join("・")}</p>
        </div>

        <div>
          <p className="font-bold">營業時間</p>
          <p className="mt-1">{SITE.openDaysLabel}</p>
          <p className="font-num tabular-nums">
            {SITE.opens}–{SITE.closes}
          </p>
          <p className="mt-2 text-ink-soft">會議餐盒外送需前一天預約</p>
        </div>

        <nav aria-label="頁尾連結">
          <p className="font-bold">快速連結</p>
          <ul className="mt-1 space-y-1">
            <li><Link href="/menu" className="hover:text-brand">完整菜單</Link></li>
            {DISH_CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/menu#${c.id}`} className="hover:text-brand">{c.label}</Link>
              </li>
            ))}
            <li><Link href="/meeting-bento" className="hover:text-brand">台北會議餐盒訂購</Link></li>
            <li>
              <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                官方 LINE 訂餐
              </a>
            </li>
            <li>
              <a href={SITE.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                Google 地圖・評論
              </a>
            </li>
            <li>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                Instagram
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-brand/10 px-4 py-4 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} {SITE.fullName}
      </p>
    </footer>
  );
}
