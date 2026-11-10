import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, Download, MessageCircle, Phone } from "lucide-react";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import DeliveryTiers from "@/components/DeliveryTiers";
import { DELIVERY_RULE_SHORT, DELIVERY_TIERS, FAQ, SITE, SLOTS } from "@/lib/data";
import { DISHES, DRINK_PAIRINGS } from "@/lib/dishes";

const PATH = "/meeting-bento";
const title = "台北會議餐盒推薦｜$150 均一價、可開發票、前一天預約外送｜摳門製研所 雙連站";
const description =
  "雙連站、馬偕醫院旁的日式會議餐盒，5 款均一價 $150（含鍋邊素），可開收據／發票。外送需前一天預約，1 公里內滿 $1,000 即可外送，官方 LINE 團訂。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: PATH,
    siteName: SITE.fullName,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${SITE.nameZh} 會議餐盒` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

const BENTOS = DISHES.filter((d) => d.category === "bento");
const PRICE = BENTOS[0]?.price ?? 150;
const NOON = SLOTS.find((s) => s.id === "noon");

/** 門檻對應的可外送範圍說明（順序同 DELIVERY_TIERS） */
const REACH_LABEL = ["1 公里內", "3 公里內", "5 公里內", "5 公里以上皆可"];

/** 只訂餐盒時，各人數的金額與可外送距離（依外送門檻計算） */
const EXAMPLES = [7, 10, 14, 17].map((n) => {
  const total = n * PRICE;
  let reach = "未達外送門檻";
  DELIVERY_TIERS.forEach((t, i) => {
    if (total >= t.minimum) reach = REACH_LABEL[i] ?? t.range;
  });
  return { n, total, reach };
});

const STEPS = [
  { title: "前一天以前用 LINE 告知", body: "日期、送達時間、地址、人數與葷素數量。外送不接受當天預約。" },
  { title: "店家回覆確認", body: "確認送達距離、金額是否達外送門檻，以及餐盒口味分配。" },
  { title: "提供收據／發票資訊", body: "需要報帳請告知抬頭與統一編號。" },
  { title: "依約送達或到店自取", body: `午間 ${NOON?.timeLabel ?? "11:40–14:00"} 供應，自取地點：${SITE.address}。` },
];

const MEETING_FAQ = [
  {
    q: "會議餐盒最少要訂幾個才能外送？",
    a: `外送以訂購金額計算門檻。只訂 $${PRICE} 餐盒的話，1 公里內約 7 個（$${(7 * PRICE).toLocaleString("en-US")}）即可外送；距離越遠門檻越高，5 公里以上需滿 $2,500。`,
  },
  ...FAQ,
];

const card = "rounded border border-brand/15 bg-white/60 p-5";

export default function MeetingBentoPage() {
  const pageUrl = `${SITE.siteUrl}${PATH}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "zh-Hant-TW",
        about: { "@id": `${SITE.siteUrl}/#restaurant` },
      },
      {
        "@type": "MenuSection",
        name: "會議餐盒（御食餐盒）",
        url: pageUrl,
        hasMenuItem: BENTOS.map((d) => ({
          "@type": "MenuItem",
          name: d.name,
          url: `${SITE.siteUrl}/menu/${d.slug}`,
          offers: { "@type": "Offer", price: String(d.price), priceCurrency: "TWD" },
          ...(d.isVegetarian ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: MEETING_FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE.siteUrl },
          { "@type": "ListItem", position: 2, name: "會議餐盒", item: pageUrl },
        ],
      },
    ],
  };

  const answerRows = [
    { label: "價格", value: `會議餐盒均一價 $${PRICE}，5 款同價，好請款` },
    { label: "款式", value: "豚肉 2 款、雞肉 2 款、鍋邊素 1 款" },
    { label: "供應", value: `${SITE.openDaysLabel}，午間 ${NOON?.timeLabel ?? "11:40–14:00"}` },
    { label: "預約", value: DELIVERY_RULE_SHORT },
    {
      label: "外送門檻",
      value: DELIVERY_TIERS.map((t) => `${t.range}滿 $${t.minimum.toLocaleString("en-US")}`).join("、"),
    },
    { label: "報帳", value: "可開立收據／發票" },
    {
      label: "加購茶飲",
      value: DRINK_PAIRINGS.map((d) => `${d.name} $${d.price}`).join("、"),
    },
  ];

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <nav aria-label="麵包屑" className="text-sm text-ink-soft">
          <ol className="flex items-center gap-1">
            <li><Link href="/" className="hover:text-brand">首頁</Link></li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="font-bold text-ink">會議餐盒</li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_22rem]">
          <div>
            <h1 className="font-serif text-3xl font-bold leading-snug text-brand md:text-4xl">
              台北會議餐盒｜$150 均一價的日式御食餐盒
            </h1>
            <p className="mt-3 leading-relaxed">
              摳門製研所的會議餐盒 5 款均一價 ${PRICE}，含 1 款鍋邊素，可開立收據／發票。店在雙連捷運站 2
              號出口步行約 4 分鐘、馬偕紀念醫院旁。外送需前一天預約，1 公里內滿 $1,000 即可外送。
            </p>

            <section aria-labelledby="quick" className="mt-5 rounded border border-brand/30 bg-white/70 p-5">
              <h2 id="quick" className="font-serif text-lg font-bold text-brand">重點速答</h2>
              <dl className="mt-3 divide-y divide-brand/10 text-sm">
                {answerRows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[5rem_1fr] gap-3 py-2.5">
                    <dt className="font-bold text-brand">{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={SITE.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded bg-accent px-5 py-3 font-bold text-white hover:bg-accent-dark"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                LINE 預訂會議餐盒
              </a>
              <a
                href="/menu.jpg"
                download="摳門製研所-團訂菜單.jpg"
                className="inline-flex items-center justify-center gap-2 rounded border border-brand px-5 py-3 font-bold text-brand hover:bg-oat"
              >
                <Download className="h-5 w-5" aria-hidden="true" />
                下載團訂菜單
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded border border-brand px-5 py-3 font-bold text-brand hover:bg-oat"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {SITE.phoneDisplay}
              </a>
            </div>
          </div>

          <figure>
            <div className="relative aspect-[4/3] overflow-hidden rounded border border-brand/15 bg-oat">
              <Image
                src="/menu/bento.jpg"
                alt="摳門製研所御食餐盒示意圖"
                fill
                priority
                sizes="(min-width: 768px) 22rem, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-1.5 text-xs text-ink-soft">照片為示意，實際以現場供應為準</figcaption>
          </figure>
        </div>

        <section aria-labelledby="bentos" className="mt-12">
          <h2 id="bentos" className="font-serif text-2xl font-bold text-brand">5 款會議餐盒</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {BENTOS.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/menu/${d.slug}`}
                  className="flex h-full flex-col rounded border border-brand/15 bg-white/60 p-4 hover:bg-oat"
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-bold">{d.name}</span>
                    <span className="font-num font-bold tabular-nums text-accent">${d.price}</span>
                  </span>
                  <span className="mt-1 text-sm text-ink-soft">{d.flavor}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="delivery" className="mt-12">
          <h2 id="delivery" className="font-serif text-2xl font-bold text-brand">外送門檻與費用試算</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <DeliveryTiers />
            <div className={card}>
              <h3 className="font-serif text-lg font-bold text-brand">只訂餐盒時的參考</h3>
              <table className="mt-3 w-full text-sm">
                <caption className="sr-only">人數、金額與可外送距離</caption>
                <thead>
                  <tr className="border-b border-brand/15 text-left text-ink-soft">
                    <th scope="col" className="py-2 font-medium">人數</th>
                    <th scope="col" className="py-2 text-right font-medium">金額</th>
                    <th scope="col" className="py-2 text-right font-medium">可外送距離</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLES.map((e) => (
                    <tr key={e.n} className="border-b border-brand/10 last:border-0">
                      <td className="py-2 font-num tabular-nums">{e.n} 人</td>
                      <td className="py-2 text-right font-num font-bold tabular-nums text-accent">
                        ${e.total.toLocaleString("en-US")}
                      </td>
                      <td className="py-2 text-right">{e.reach}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-ink-soft">以每人 1 個 ${PRICE} 餐盒計算，實際以店家確認為準。</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="steps" className="mt-12">
          <h2 id="steps" className="font-serif text-2xl font-bold text-brand">訂購流程</h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className={card}>
                <span className="font-num text-3xl font-bold tabular-nums text-brand/40">{i + 1}</span>
                <h3 className="mt-2 font-serif text-lg font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq" className="mt-12">
          <h2 id="faq" className="font-serif text-2xl font-bold text-brand">會議餐盒常見問題</h2>
          <div className="mt-4 divide-y divide-brand/10 rounded border border-brand/15 bg-white/60">
            {MEETING_FAQ.map((f) => (
              <details key={f.q}>
                <summary className="flex cursor-pointer items-center justify-between gap-3 p-4 font-bold">
                  <span>{f.q}</span>
                  <ChevronDown
                    className="faq-chevron h-5 w-5 shrink-0 text-brand transition-transform"
                    aria-hidden="true"
                  />
                </summary>
                <p className="px-4 pb-4 text-sm leading-relaxed text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
