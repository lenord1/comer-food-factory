import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle, Phone } from "lucide-react";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import DeliveryTiers from "@/components/DeliveryTiers";
import { SITE } from "@/lib/data";

const PATH = "/guide/taipei-meeting-bento";
const title = "台北會議餐盒怎麼選？雙連站日式職人餐盒 4 款葷食｜摳門製研所";
const description =
  "雙連站、馬偕醫院旁的日式會議餐盒，4 款葷食均一價 $150，可開收據／發票。介紹每款特色、配菜、外送門檻與訂購方式。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    type: "article",
    locale: "zh_TW",
    url: PATH,
    siteName: SITE.fullName,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${SITE.nameZh} 會議餐盒` }],
  },
};

const BENTOS = [
  { name: "柚香炙燒豚御食盒", main: "炙燒豚肉，帶柚香", who: "想選口味單純、不踩雷的人", photo: "/menu/bento-yuzu-pork.jpg" },
  { name: "味噌照燒雞御食盒", main: "照燒雞肉，味噌香", who: "喜歡甘鹹、下飯口味的人", photo: "/menu/bento-miso-teriyaki-chicken.jpg" },
  { name: "檸檬蜜汁豚御食盒", main: "蜜汁豚肉，帶檸檬香氣", who: "怕膩、想要清爽感的人", photo: "/menu/bento-lemon-honey-pork.jpg" },
  { name: "七味照燒雞御食盒", main: "照燒雞肉，撒七味粉", who: "想要一點辣香、很開胃的人", photo: "/menu/bento-shichimi-chicken.jpg" },
];

const FAQ = [
  { q: "會議餐盒最少要訂幾個才能外送？", a: "只訂 $150 餐盒的話，1 公里內約 7 盒（$1,050）即可外送，距離越遠門檻越高，達門檻免運費。" },
  { q: "可以當天訂、當天送嗎？", a: "外送不接受當天預約，請前一天預約。" },
  { q: "可以指定葷素嗎？", a: "可以，訂購時告知人數與葷素數量，素食可選日式烤素排御食盒。" },
  { q: "可以開發票嗎？", a: "可以，企業行號訂購可開立收據或發票，請告知抬頭與統一編號。" },
  { q: "店在哪裡、幾點營業？", a: `${SITE.address}，${SITE.openDaysLabel} ${SITE.opens}–${SITE.closes}。` },
];

export default function Page() {
  const url = `${SITE.siteUrl}${PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: title,
        description,
        inLanguage: "zh-TW",
        mainEntityOfPage: url,
        image: `${SITE.siteUrl}/og.jpg`,
        author: { "@type": "Organization", name: SITE.fullName },
        publisher: { "@type": "Organization", name: SITE.fullName },
        datePublished: "2026-11-25",
        dateModified: "2026-11-25",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE.siteUrl },
          { "@type": "ListItem", position: 2, name: "會議餐盒", item: `${SITE.siteUrl}/meeting-bento` },
          { "@type": "ListItem", position: 3, name: "會議餐盒怎麼選", item: url },
        ],
      },
    ],
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <main className="mx-auto max-w-3xl px-4 py-8 md:py-12">
        <nav aria-label="麵包屑" className="text-sm text-ink-soft">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-brand">首頁</Link></li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li><Link href="/meeting-bento" className="hover:text-brand">會議餐盒</Link></li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="font-bold text-ink">怎麼選</li>
          </ol>
        </nav>

        <h1 className="mt-6 font-serif text-3xl font-bold leading-snug text-brand md:text-4xl">
          台北會議餐盒怎麼選？雙連站日式職人餐盒
        </h1>

        <section className="mt-6 rounded border border-brand/15 bg-white/60 p-5">
          <h2 className="font-serif text-xl font-bold text-brand">先看答案</h2>
          <p className="mt-2">
            在雙連站、馬偕醫院附近訂會議餐盒，摳門製研所的葷食餐盒有 4 款，每盒均一價 $150，可開收據或發票。外送需前一天預約，1 公里內滿 $1,000 即可外送，達門檻免運費。
          </p>
        </section>

        <h2 className="mt-10 font-serif text-2xl font-bold text-brand">4 款葷食餐盒，各有什麼特色</h2>
        <p className="mt-2">四款同價，差在主菜與風味。先問同事喜歡清爽還是濃郁，再分配口味，開會時比較不會踩雷。</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {BENTOS.map((b) => (
            <li key={b.name} className="overflow-hidden rounded border border-brand/15 bg-paper">
              <div className="relative aspect-[4/3] bg-oat">
                <Image src={b.photo} alt={`${b.name}實拍`} fill sizes="(min-width: 640px) 24rem, 100vw" className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-serif text-lg font-bold text-brand">{b.name}</h3>
                <p className="mt-1 text-sm">{b.main}</p>
                <p className="text-sm text-ink-soft">適合：{b.who}</p>
                <p className="mt-1 font-num font-bold text-accent">$150</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">素食的同仁可另選日式烤素排御食盒，同樣 $150。</p>

        <h2 className="mt-10 font-serif text-2xl font-bold text-brand">一盒裡有什麼</h2>
        <p className="mt-2">
          御食盒用分格盒裝，主菜和飯放在一區，配菜分格擺放。照片中可看到玉子燒、烤櫛瓜、高麗菜紅蘿蔔絲、玉米、白蘿蔔、豆腐、竹輪、牛蒡絲等配菜，實際以當日供應為準。
        </p>

        <h2 className="mt-10 font-serif text-2xl font-bold text-brand">對訂餐的人好：均一價、發票、外送門檻</h2>
        <p className="mt-2 mb-4">一盒均一價 $150，不用依口味算價差，金額一眼就能算；企業行號可開收據或發票。可加購桂花烏龍 $40、復刻紅茶 $30。</p>
        <DeliveryTiers />

        <h2 className="mt-10 font-serif text-2xl font-bold text-brand">常見問題</h2>
        <div className="mt-3 space-y-4">
          {FAQ.map((f) => (
            <div key={f.q}>
              <h3 className="font-bold">{f.q}</h3>
              <p className="text-sm">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href={SITE.lineUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded bg-brand px-5 py-3 font-bold text-white">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />官方 LINE 團訂
          </a>
          <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 rounded border border-brand px-5 py-3 font-bold text-brand">
            <Phone className="h-5 w-5" aria-hidden="true" />{SITE.phoneDisplay}
          </a>
          <Link href="/meeting-bento" className="inline-flex items-center justify-center rounded border border-brand/30 px-5 py-3 text-brand">看完整會議餐盒頁</Link>
        </div>
      </main>
    </PageShell>
  );
}
