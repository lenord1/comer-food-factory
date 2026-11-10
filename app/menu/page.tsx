import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import { SITE } from "@/lib/data";
import { DISHES, DISH_CATEGORIES } from "@/lib/dishes";

const title = "完整菜單｜三角御結、日式炒麵、御食餐盒｜摳門製研所 雙連街55號";
const description =
  "摳門製研所完整菜單：三角御結 $70、日式炒麵 $130、御食餐盒 $150 均一價。雙連街55號、馬偕醫院旁，會議餐盒可開立收據／發票，官方 LINE 預訂。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/menu" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/menu",
    siteName: SITE.fullName,
    title,
    description,
    images: [{ url: "/logo.jpg", width: 891, height: 882, alt: `${SITE.nameZh} Logo` }],
  },
};

export default function MenuIndexPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <nav aria-label="麵包屑" className="text-sm text-ink-soft">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-brand">首頁</Link></li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="font-bold text-ink">菜單</li>
          </ol>
        </nav>

        <h1 className="mt-6 font-serif text-3xl font-bold text-brand md:text-4xl">完整菜單</h1>
        <p className="mt-2 text-sm text-ink-soft">
          點選餐點可查看價格、供應時段、葷素與常見問題。飲品價格：復刻紅茶 $30、桂花烏龍（無糖）$40、鳳梨梅釀冰茶 $50。
        </p>

        {DISH_CATEGORIES.map((cat) => (
          <section key={cat.id} id={cat.id} className="mt-10">
            <h2 className="font-serif text-2xl font-bold text-brand">{cat.label}</h2>
            <p className="mt-1 text-sm text-ink-soft">{cat.blurb}</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {DISHES.filter((d) => d.category === cat.id).map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/menu/${d.slug}`}
                    className="flex h-full items-center justify-between gap-3 rounded border border-brand/15 bg-white/60 p-4 hover:bg-oat"
                  >
                    <span>
                      <span className="block font-bold">{d.name}</span>
                      {d.vegetarianLabel && (
                        <span className="mt-1 inline-block rounded bg-leaf-soft px-1.5 py-0.5 text-[11px] font-medium text-leaf">
                          {d.vegetarianLabel}
                        </span>
                      )}
                    </span>
                    <span className="font-num font-bold tabular-nums text-accent">${d.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <a
          href={SITE.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-2 rounded bg-accent px-5 py-3 font-bold text-white hover:bg-accent-dark"
        >
          <MessageCircle className="h-5 w-5" aria-hidden="true" />
          官方 LINE 點餐
        </a>
      </main>
    </PageShell>
  );
}
