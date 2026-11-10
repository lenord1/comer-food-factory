import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Camera,
  ChevronDown,
  ChevronRight,
  Coffee,
  Download,
  Leaf,
  MapPin,
  MessageCircle,
  Phone,
  Users,
  Utensils,
} from "lucide-react";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/data";
import { DISHES, DRINK_PAIRINGS, dishUrl, getDish } from "@/lib/dishes";

type Props = { params: Promise<{ slug: string }> };

// 只輸出預先生成的 13 個頁面，其餘網址回傳 404
export const dynamicParams = false;

export function generateStaticParams() {
  return DISHES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) return {};

  const path = `/menu/${dish.slug}`;
  return {
    title: dish.seoTitle,
    description: dish.seoDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "zh_TW",
      url: path,
      siteName: SITE.fullName,
      title: dish.seoTitle,
      description: dish.seoDescription,
      images: [{ url: "/logo.jpg", width: 891, height: 882, alt: `${SITE.nameZh} Logo` }],
    },
    twitter: {
      card: "summary",
      title: dish.seoTitle,
      description: dish.seoDescription,
      images: ["/logo.jpg"],
    },
  };
}

const card = "rounded border border-brand/15 bg-white/60 p-5";
const ctaPrimary =
  "inline-flex items-center justify-center gap-2 rounded bg-accent px-5 py-3 font-bold text-white hover:bg-accent-dark";
const ctaSecondary =
  "inline-flex items-center justify-center gap-2 rounded border border-brand px-5 py-3 font-bold text-brand hover:bg-oat";

export default async function DishPage({ params }: Props) {
  const { slug } = await params;
  const dish = getDish(slug);
  if (!dish) notFound();

  const pageUrl = dishUrl(dish.slug);
  const related = DISHES.filter((d) => d.category === dish.category && d.slug !== dish.slug);
  const isBento = dish.category === "bento";

  const answerRows: { label: string; value: string }[] = [
    {
      label: "價格",
      value: `$${dish.price}（${isBento ? "會議餐盒" : dish.categoryLabel}均一價）`,
    },
    {
      label: "取餐時段",
      value: `${dish.timeLabel}${dish.timeNote ? `（${dish.timeNote}）` : ""}`,
    },
    { label: "主打", value: dish.highlight },
    { label: "風味特色", value: dish.flavor },
    {
      label: "葷素",
      value: dish.isVegetarian
        ? `素食（菜單標示：${dish.vegetarianLabel}）`
        : `葷食，主要為${dish.proteinLabel}`,
    },
    { label: "外送規則", value: SITE.deliveryNote },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${pageUrl}#product`,
        name: dish.name,
        description: dish.description,
        // 有示意照片用示意照片；素食品項沒有照片，暫以品牌 Logo 代替。
        image: [dish.photo ? `${SITE.siteUrl}${dish.photo}` : `${SITE.siteUrl}/logo.jpg`],
        category: dish.categoryLabel,
        url: pageUrl,
        brand: { "@type": "Brand", name: SITE.nameZh },
        offers: {
          "@type": "Offer",
          url: pageUrl,
          price: String(dish.price),
          priceCurrency: "TWD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Restaurant",
            "@id": `${SITE.siteUrl}/#restaurant`,
            name: SITE.fullName,
          },
        },
        additionalProperty: [
          { "@type": "PropertyValue", name: "供應時段", value: dish.timeLabel },
          { "@type": "PropertyValue", name: "葷素類別", value: dish.isVegetarian ? "素食" : "葷食" },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: dish.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE.siteUrl },
          { "@type": "ListItem", position: 2, name: "菜單", item: `${SITE.siteUrl}/menu` },
          {
            "@type": "ListItem",
            position: 3,
            name: dish.categoryLabel,
            item: `${SITE.siteUrl}/menu#${dish.category}`,
          },
          { "@type": "ListItem", position: 4, name: dish.name, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <PageShell>
      <JsonLd data={jsonLd} />
      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* 麵包屑 */}
        <nav aria-label="麵包屑" className="text-sm text-ink-soft">
          <ol className="flex flex-wrap items-center gap-1">
            <li><Link href="/" className="hover:text-brand">首頁</Link></li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li><Link href="/menu" className="hover:text-brand">菜單</Link></li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li>
              <Link href={`/menu#${dish.category}`} className="hover:text-brand">
                {dish.categoryLabel}
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <li aria-current="page" className="font-bold text-ink">{dish.name}</li>
          </ol>
        </nav>

        {/* 標題與直接解答卡片 */}
        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_20rem]">
          <div>
            <h1 className="font-serif text-3xl font-bold leading-snug text-brand md:text-4xl">
              {dish.name}
            </h1>
            <p className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="rounded border border-brand/15 bg-oat px-2 py-0.5 font-bold">
                {dish.categoryLabel}
              </span>
              {dish.isVegetarian && (
                <span className="rounded bg-leaf-soft px-2 py-0.5 font-bold text-leaf">
                  {dish.vegetarianLabel}
                </span>
              )}
              <span className="font-num text-lg font-bold tabular-nums text-accent">
                ${dish.price}
              </span>
            </p>

            <section
              aria-labelledby="quick-answer"
              className="mt-5 rounded border border-brand/30 bg-white/70 p-5"
            >
              <h2 id="quick-answer" className="font-serif text-lg font-bold text-brand">
                重點速答
              </h2>
              <p className="mt-2 leading-relaxed">{dish.answerLead}</p>
              <dl className="mt-4 divide-y divide-brand/10 text-sm">
                {answerRows.map((r) => (
                  <div key={r.label} className="grid grid-cols-[5rem_1fr] gap-3 py-2.5">
                    <dt className="font-bold text-brand">{r.label}</dt>
                    <dd>{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* CTA */}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {isBento ? (
                <>
                  <a
                    href={SITE.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaPrimary}
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    預訂會議餐盒外送（LINE）
                  </a>
                  <a
                    href="/menu.jpg"
                    download="摳門製研所-團訂菜單.jpg"
                    className={ctaSecondary}
                  >
                    <Download className="h-5 w-5" aria-hidden="true" />
                    下載團訂菜單
                  </a>
                </>
              ) : (
                <>
                  <a
                    href={SITE.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={ctaPrimary}
                  >
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    LINE 預先點餐免排隊
                  </a>
                  <a href={SITE.phoneHref} className={ctaSecondary}>
                    <Phone className="h-5 w-5" aria-hidden="true" />
                    撥打電話 {SITE.phoneDisplay}
                  </a>
                </>
              )}
            </div>
          </div>

          {/* 餐點示意照片（取自店家 DM）；素食品項沒有照片，顯示佔位 */}
          {dish.photo ? (
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded border border-brand/15 bg-oat md:aspect-square">
                <Image
                  src={dish.photo}
                  alt={`${dish.name}示意圖`}
                  fill
                  priority
                  sizes="(min-width: 768px) 20rem, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-1.5 text-xs text-ink-soft">
                照片為同類餐點示意，實際以現場供應為準
              </figcaption>
            </figure>
          ) : (
            <div
              className="flex aspect-[4/3] items-center justify-center rounded border border-brand/15 bg-oat text-ink-soft/60 md:aspect-square"
              role="img"
              aria-label={`${dish.name}照片準備中`}
            >
              <div className="text-center text-sm">
                <Camera className="mx-auto h-8 w-8" aria-hidden="true" />
                <p className="mt-2">實拍照片準備中</p>
              </div>
            </div>
          )}
        </div>

        {/* 詳細規格 Bento Box */}
        <section aria-labelledby="specs" className="mt-10">
          <h2 id="specs" className="font-serif text-2xl font-bold text-brand">
            餐點規格
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-soft">
            {dish.description}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className={card}>
              <Utensils className="h-5 w-5 text-brand" aria-hidden="true" />
              <h3 className="mt-2 font-serif text-lg font-bold">食材特點</h3>
              <ul className="mt-2 flex flex-wrap gap-2 text-sm">
                {dish.features.map((f) => (
                  <li key={f} className="rounded border border-brand/15 bg-paper px-2 py-0.5">
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className={card}>
              <Leaf className="h-5 w-5 text-brand" aria-hidden="true" />
              <h3 className="mt-2 font-serif text-lg font-bold">葷素類別</h3>
              <p className="mt-2 text-sm">
                {dish.isVegetarian
                  ? `素食（菜單標示：${dish.vegetarianLabel}）。實際素別請訂購前向店家確認。`
                  : `葷食，主要為${dish.proteinLabel}。`}
              </p>
            </div>

            <div className={card}>
              <Users className="h-5 w-5 text-brand" aria-hidden="true" />
              <h3 className="mt-2 font-serif text-lg font-bold">適合情境</h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                {dish.suitableFor.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className={card}>
              <Coffee className="h-5 w-5 text-brand" aria-hidden="true" />
              <h3 className="mt-2 font-serif text-lg font-bold">加購方案</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {dish.addons?.map((a) => (
                  <li key={a.name} className="flex justify-between gap-3">
                    <span>{a.name}</span>
                    <span className="font-num font-bold tabular-nums text-accent">+${a.price}</span>
                  </li>
                ))}
                {DRINK_PAIRINGS.map((d) => (
                  <li key={d.name} className="flex justify-between gap-3">
                    <span>{d.name}</span>
                    <span className="font-num font-bold tabular-nums text-accent">${d.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq" className="mt-10">
          <h2 id="faq" className="font-serif text-2xl font-bold text-brand">
            {dish.name}常見問題
          </h2>
          <div className="mt-4 divide-y divide-brand/10 rounded border border-brand/15 bg-white/60">
            {dish.faqs.map((f) => (
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

        {/* 門市資訊 */}
        <section className="mt-10 rounded border border-brand/15 bg-oat p-5">
          <h2 className="font-serif text-lg font-bold text-brand">到店取餐</h2>
          <p className="mt-2 flex items-start gap-2 text-sm">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
            <span>
              {SITE.address}（{SITE.transit[0]}；{SITE.transit[1]}）
            </span>
          </p>
        </section>

        {/* 同類餐點 */}
        <section aria-labelledby="related" className="mt-10">
          <h2 id="related" className="font-serif text-2xl font-bold text-brand">
            其他{dish.categoryLabel}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {related.map((d) => (
              <li key={d.slug}>
                <Link
                  href={`/menu/${d.slug}`}
                  className="flex items-center justify-between gap-3 rounded border border-brand/15 bg-white/60 p-4 hover:bg-oat"
                >
                  <span className="font-bold">{d.name}</span>
                  <span className="font-num font-bold tabular-nums text-accent">${d.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </PageShell>
  );
}
